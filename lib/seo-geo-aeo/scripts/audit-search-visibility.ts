#!/usr/bin/env bun
/**
 * audit-search-visibility.ts — search-visibility auditor (SEO + AEO + GEO).
 *
 * Checks the ⚙-marked items of ../CHECKLIST.md against an HTML file, a build directory
 * or a live URL. No external dependency: regex parsing, deliberately conservative.
 *
 * Usage:
 *   bun audit-search-visibility.ts <file.html | directory | https://url>
 *   bun audit-search-visibility.ts dist/ --json
 *   bun audit-search-visibility.ts https://example.com --json > report.json
 *
 * Output: a human report in the user's language (default) or JSON (--json).
 * Exit code: 0 = pass, 1 = fail (any FAIL item, or score < 75), 2 = usage error.
 *
 * Honest limit: a regex is not an HTML parser. Items that depend on real rendering
 * (contrast, focus, field INP) are NOT checked here — they are marked manual in
 * CHECKLIST.md and remain the agent's or the human's responsibility.
 */

import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { join, resolve, basename } from "node:path";

type Status = "PASS" | "FAIL" | "NA";

type Check = {
  id: string;
  group: "T" | "S" | "A" | "G" | "P" | "X";
  title: string;
  status: Status;
  blocking: boolean;
  note: string;
};

const SEARCH_BOT_UA =
  "Mozilla/5.0 (compatible; nirvana-search-visibility-audit; +https://squads.sh)";

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

const FILLER_OPENERS =
  /^(no mercado atual|nos dias de hoje|atualmente|cada vez mais|com o avanço|vivemos (em )?um[a]? |em um mundo|nos últimos anos|é sabido que|sabemos que|in today'?s|in the current|nowadays|over the (past|last) years|it is well known)/i;

const QUESTION_OPENERS =
  /^(como|quanto|quando|onde|por que|porque|por quê|qual|quais|o que|quem|vale a pena|precisa|posso|dá para|what|how|why|when|where|which|who|is|are|does|do|can|should)\b/i;

const VAGUE_ATTRIBUTION =
  /(especialistas (afirmam|dizem|apontam)|estudos (mostram|indicam|apontam)|pesquisas (mostram|indicam)|experts say|studies show|research shows|é sabido que)/i;

// ──────────────────────────────────────────────────────────────────────
// Extração
// ──────────────────────────────────────────────────────────────────────

function stripNonContent(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
}

function visibleText(html: string): string {
  return stripNonContent(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(text: string): number {
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

function tagText(html: string, tag: string): string[] {
  const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    out.push(
      m[1]
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    );
  }
  return out;
}

function metaContent(html: string, name: string): string | null {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)\\s*=\\s*["']${name}["'][^>]*>`,
    "i",
  );
  const tag = html.match(re)?.[0];
  if (!tag) return null;
  return tag.match(/content\s*=\s*["']([^"']*)["']/i)?.[1] ?? null;
}

function linkHref(html: string, rel: string): string | null {
  const re = new RegExp(`<link[^>]+rel\\s*=\\s*["']${rel}["'][^>]*>`, "i");
  const tag = html.match(re)?.[0];
  if (!tag) return null;
  return tag.match(/href\s*=\s*["']([^"']*)["']/i)?.[1] ?? null;
}

function jsonLdBlocks(html: string): { raw: string; parsed: unknown | null }[] {
  const re =
    /<script[^>]+type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const out: { raw: string; parsed: unknown | null }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const raw = m[1].trim();
    let parsed: unknown | null = null;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }
    out.push({ raw, parsed });
  }
  return out;
}

function flattenLd(parsed: unknown): Record<string, unknown>[] {
  const nodes: Record<string, unknown>[] = [];
  const walk = (v: unknown) => {
    if (Array.isArray(v)) {
      v.forEach(walk);
      return;
    }
    if (v && typeof v === "object") {
      const obj = v as Record<string, unknown>;
      nodes.push(obj);
      if (Array.isArray(obj["@graph"])) obj["@graph"].forEach(walk);
    }
  };
  walk(parsed);
  return nodes;
}

function ldTypes(nodes: Record<string, unknown>[]): Set<string> {
  const types = new Set<string>();
  for (const n of nodes) {
    const t = n["@type"];
    if (typeof t === "string") types.add(t);
    else if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && types.add(x));
  }
  return types;
}

/** The h1-h6 heading sequence, in document order. */
function headingSequence(html: string): { level: number; text: string }[] {
  const re = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  const out: { level: number; text: string }[] = [];
  let m: RegExpExecArray | null;
  const clean = stripNonContent(html);
  while ((m = re.exec(clean))) {
    out.push({
      level: Number(m[1]),
      text: m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    });
  }
  return out;
}

/** For each h2, the text running up to the next heading of level <= 2. */
function sectionBodies(html: string): { heading: string; body: string }[] {
  const clean = stripNonContent(html);
  const parts = clean.split(/<h2\b[^>]*>/i);
  const out: { heading: string; body: string }[] = [];
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];
    const endHeading = chunk.search(/<\/h2>/i);
    if (endHeading === -1) continue;
    const heading = chunk
      .slice(0, endHeading)
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const rest = chunk.slice(endHeading + 5).split(/<h[12]\b[^>]*>/i)[0];
    out.push({ heading, body: rest });
  }
  return out;
}

/** First block of real text (paragraph, list item, cell) in an HTML fragment. */
function firstProse(bodyHtml: string): string {
  const m = bodyHtml.match(/<(p|li|td)\b[^>]*>([\s\S]*?)<\/\1>/i);
  const raw = m ? m[2] : bodyHtml;
  return raw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function isAbsoluteUrl(u: string | null): boolean {
  return !!u && /^https?:\/\//i.test(u);
}

// ──────────────────────────────────────────────────────────────────────
// Auditoria
// ──────────────────────────────────────────────────────────────────────

type SiteFiles = {
  robots?: string;
  sitemap?: string;
  llms?: string;
};

function auditHtml(html: string, files: SiteFiles, label: string): Check[] {
  const checks: Check[] = [];
  const add = (
    id: string,
    group: Check["group"],
    title: string,
    status: Status,
    blocking: boolean,
    note: string,
  ) => checks.push({ id, group, title, status, blocking, note });

  const text = visibleText(html);
  const words = wordCount(text);
  const headings = headingSequence(html);
  const h1s = headings.filter((h) => h.level === 1);
  const h2s = headings.filter((h) => h.level === 2);
  const sections = sectionBodies(html);
  const ld = jsonLdBlocks(html);
  const ldNodes = ld.flatMap((b) => (b.parsed ? flattenLd(b.parsed) : []));
  const types = ldTypes(ldNodes);

  // ── T · Técnico ────────────────────────────────────────────────────
  // T1 only fails on POSITIVE evidence of content trapped client-side: an empty
  // framework shell, or near-absent text on a page that loads a bundle. A
  // legitimately short static page (contact, thank-you) passes, with a note.
  const rootShell = /<div[^>]+id\s*=\s*["'](root|app|__next)["'][^>]*>\s*<\/div>/i.test(html);
  const hasBundle = /<script[^>]+src\s*=/i.test(html);
  const clientBound = rootShell || (words < 100 && hasBundle);
  add(
    "T1",
    "T",
    "Conteúdo no HTML do servidor (crawler de IA não roda JS)",
    clientBound ? "FAIL" : "PASS",
    true,
    rootShell
      ? "shell de SPA vazio detectado (div#root/#app/#__next sem conteúdo) — invisível para 69% dos crawlers de IA"
      : clientBound
        ? `só ${words} palavras no HTML cru numa página que carrega bundle — conteúdo provavelmente preso no cliente`
        : words < 150
          ? `${words} palavras no HTML cru (página curta — confirme que é intencional)`
          : `${words} palavras visíveis no HTML cru`,
  );

  const title = tagText(html, "title")[0] ?? "";
  add(
    "T2",
    "T",
    "<title> único, 30-65 caracteres",
    title.length >= 30 && title.length <= 65 ? "PASS" : "FAIL",
    false,
    title ? `${title.length} caracteres: "${title}"` : "ausente",
  );

  const desc = metaContent(html, "description");
  add(
    "T3",
    "T",
    "meta description 100-170 caracteres",
    desc && desc.length >= 100 && desc.length <= 170 ? "PASS" : "FAIL",
    false,
    desc ? `${desc.length} caracteres` : "ausente",
  );

  add(
    "T4",
    "T",
    "Exatamente um <h1>",
    h1s.length === 1 ? "PASS" : "FAIL",
    false,
    `${h1s.length} encontrado(s)`,
  );

  const lang = html.match(/<html[^>]+lang\s*=\s*["']([^"']+)["']/i)?.[1] ?? null;
  add("T5", "T", "<html lang> declarado", lang ? "PASS" : "FAIL", false, lang ?? "ausente");

  const canonical = linkHref(html, "canonical");
  add(
    "T6",
    "T",
    "canonical presente e absoluta",
    isAbsoluteUrl(canonical) ? "PASS" : "FAIL",
    false,
    canonical ?? "ausente",
  );

  const robotsMeta = metaContent(html, "robots") ?? "";
  add(
    "T7",
    "T",
    "Sem noindex",
    /noindex/i.test(robotsMeta) ? "FAIL" : "PASS",
    true,
    robotsMeta || "sem meta robots (ok)",
  );

  const og = ["og:title", "og:description", "og:image", "og:url"].filter(
    (p) => !metaContent(html, p),
  );
  add(
    "T8",
    "T",
    "Open Graph completo",
    og.length === 0 ? "PASS" : "FAIL",
    false,
    og.length ? `faltando: ${og.join(", ")}` : "og:title/description/image/url presentes",
  );

  add(
    "T9",
    "T",
    "meta viewport",
    metaContent(html, "viewport") ? "PASS" : "FAIL",
    false,
    metaContent(html, "viewport") ?? "ausente",
  );

  if (files.robots !== undefined) {
    add(
      "T10",
      "T",
      "robots.txt existe e aponta sitemap",
      /sitemap\s*:/i.test(files.robots) ? "PASS" : "FAIL",
      false,
      /sitemap\s*:/i.test(files.robots) ? "sitemap declarado" : "sem linha Sitemap:",
    );
    const declared = AI_CRAWLERS.filter((b) =>
      new RegExp(`user-agent\\s*:\\s*${b}\\b`, "i").test(files.robots!),
    );
    add(
      "T11",
      "T",
      "Política de crawler de IA declarada no robots.txt",
      declared.length >= 3 ? "PASS" : "FAIL",
      true,
      declared.length
        ? `declarados: ${declared.join(", ")}`
        : "nenhum dos 8 user-agents de IA aparece — decidir a postura COM o cliente (TECHNICAL-SEO.md §2)",
    );
  } else {
    add("T10", "T", "robots.txt existe e aponta sitemap", "NA", false, "não auditável neste alvo");
    add("T11", "T", "Política de crawler de IA no robots.txt", "NA", true, "não auditável neste alvo");
  }

  add(
    "T12",
    "T",
    "sitemap.xml presente",
    files.sitemap !== undefined ? "PASS" : files.robots !== undefined ? "FAIL" : "NA",
    false,
    files.sitemap !== undefined ? "encontrado" : "ausente",
  );

  if (files.llms !== undefined) {
    const okLlms = /^\s*#\s+\S/m.test(files.llms) && /^\s*>\s+\S/m.test(files.llms);
    add(
      "T13",
      "T",
      "llms.txt conforme spec (H1 + blockquote)",
      okLlms ? "PASS" : "FAIL",
      false,
      okLlms ? "H1 e blockquote presentes" : "falta H1 obrigatório ou blockquote de resumo",
    );
  } else {
    add(
      "T13",
      "T",
      "llms.txt publicado",
      files.robots !== undefined ? "FAIL" : "NA",
      false,
      "ausente — aposta barata, ver TECHNICAL-SEO.md §6",
    );
  }

  const hreflangs = (html.match(/<link[^>]+hreflang/gi) ?? []).length;
  add(
    "T15",
    "T",
    "hreflang com x-default (quando multi-idioma)",
    hreflangs === 0 ? "NA" : /hreflang\s*=\s*["']x-default["']/i.test(html) ? "PASS" : "FAIL",
    false,
    hreflangs === 0 ? "página monolíngue" : `${hreflangs} tags hreflang`,
  );

  // ── S · Dados estruturados ─────────────────────────────────────────
  add(
    "S1",
    "S",
    "JSON-LD presente",
    ld.length > 0 ? "PASS" : "FAIL",
    false,
    `${ld.length} bloco(s)`,
  );
  add(
    "S2",
    "S",
    "JSON-LD parseia sem erro",
    ld.length === 0 ? "NA" : ld.every((b) => b.parsed !== null) ? "PASS" : "FAIL",
    false,
    ld.filter((b) => b.parsed === null).length
      ? `${ld.filter((b) => b.parsed === null).length} bloco(s) com JSON inválido`
      : "ok",
  );

  const base = ["Organization", "WebSite", "WebPage"].filter((t) => !types.has(t));
  add(
    "S3",
    "S",
    "Grafo base Organization + WebSite + WebPage",
    ld.length === 0 ? "FAIL" : base.length === 0 ? "PASS" : "FAIL",
    false,
    base.length ? `faltando: ${base.join(", ")}` : "completo",
  );

  const withId = ldNodes.filter((n) => typeof n["@id"] === "string");
  const absIds = withId.filter((n) => isAbsoluteUrl(n["@id"] as string));
  add(
    "S4",
    "S",
    "@id absoluto e estável",
    ldNodes.length === 0 ? "NA" : withId.length > 0 && absIds.length === withId.length ? "PASS" : "FAIL",
    false,
    withId.length === 0
      ? "nenhum nó tem @id — os nós não se ligam"
      : `${absIds.length}/${withId.length} absolutos`,
  );

  // S5 — FAQ parity: every Question.name must appear in the visible text.
  const questions: string[] = [];
  for (const n of ldNodes) {
    if (n["@type"] === "Question" && typeof n.name === "string") questions.push(n.name);
  }
  const normalized = text.toLowerCase();
  const orphan = questions.filter(
    (q) => !normalized.includes(q.toLowerCase().slice(0, Math.min(40, q.length))),
  );
  add(
    "S5",
    "S",
    "Paridade schema ↔ conteúdo visível (FAQ)",
    questions.length === 0 ? "NA" : orphan.length === 0 ? "PASS" : "FAIL",
    true,
    questions.length === 0
      ? "sem FAQPage"
      : orphan.length
        ? `${orphan.length} pergunta(s) no schema sem correspondência visível: "${orphan[0]}"`
        : `${questions.length} pergunta(s) com paridade`,
  );

  const dates = ldNodes.flatMap((n) =>
    ["datePublished", "dateModified"].map((k) => n[k]).filter((v) => typeof v === "string"),
  ) as string[];
  add(
    "S6",
    "S",
    "Datas em ISO 8601",
    dates.length === 0 ? "NA" : dates.every((d) => /^\d{4}-\d{2}-\d{2}/.test(d)) ? "PASS" : "FAIL",
    false,
    dates.length ? `${dates.length} data(s)` : "sem data no schema",
  );

  const authorNodes = ldNodes.filter((n) => n["@type"] === "Person");
  add(
    "S7",
    "S",
    "author como Person com sameAs",
    authorNodes.length === 0 ? "NA" : authorNodes.some((n) => n.sameAs) ? "PASS" : "FAIL",
    false,
    authorNodes.length ? `${authorNodes.length} Person` : "sem Person no grafo",
  );

  // ── A · Extratibilidade ────────────────────────────────────────────
  add("A1", "A", "Pelo menos 3 seções <h2>", h2s.length >= 3 ? "PASS" : "FAIL", false, `${h2s.length} h2`);

  const qHeadings = h2s.filter((h) => h.text.includes("?") || QUESTION_OPENERS.test(h.text));
  add(
    "A2",
    "A",
    "Metade dos h2 em forma de pergunta",
    h2s.length === 0 ? "NA" : qHeadings.length * 2 >= h2s.length ? "PASS" : "FAIL",
    false,
    `${qHeadings.length}/${h2s.length} em forma de pergunta`,
  );

  const badOpeners = sections.filter((s) => {
    const p = firstProse(s.body);
    return p.length > 0 && (FILLER_OPENERS.test(p) || p.length > 420);
  });
  add(
    "A3",
    "A",
    "Answer-first: seção responde nas primeiras frases",
    sections.length === 0 ? "NA" : badOpeners.length === 0 ? "PASS" : "FAIL",
    true,
    badOpeners.length
      ? `${badOpeners.length}/${sections.length} seção(ões) abrem com contexto ou bloco longo — ex.: "${badOpeners[0].heading}"`
      : `${sections.length} seção(ões) answer-first`,
  );

  const lists = (html.match(/<(ul|ol)\b/gi) ?? []).length;
  const tables = (html.match(/<table\b/gi) ?? []).length;
  add(
    "A5",
    "A",
    "Listas e tabelas reais",
    lists + tables > 0 ? "PASS" : "FAIL",
    false,
    `${lists} lista(s), ${tables} tabela(s)`,
  );

  const paras = tagText(html, "p");
  const longParas = paras.filter((p) => wordCount(p) > 120);
  add(
    "A6",
    "A",
    "Nenhum parágrafo com mais de 120 palavras",
    paras.length === 0 ? "NA" : longParas.length === 0 ? "PASS" : "FAIL",
    false,
    longParas.length ? `${longParas.length} parágrafo(s) longo(s)` : `${paras.length} parágrafo(s) ok`,
  );

  // ── G · Citabilidade ───────────────────────────────────────────────
  const factMatches =
    text.match(/\d[\d.,]*\s*(%|R\$|US\$|USD|BRL|€|ms\b|s\b|kb\b|mb\b|x\b|mil\b|milhões?\b)/gi) ?? [];
  const density = words > 0 ? (factMatches.length / words) * 100 : 0;
  add(
    "G1",
    "G",
    "Densidade factual ≥ 0,8 fato por 100 palavras",
    words < 150 ? "NA" : density >= 0.8 ? "PASS" : "FAIL",
    false,
    `${factMatches.length} fato(s) numérico(s) em ${words} palavras (${density.toFixed(2)}/100)`,
  );

  const quotes = (html.match(/<blockquote\b/gi) ?? []).length + (html.match(/<q\b/gi) ?? []).length;
  add(
    "G3",
    "G",
    "Citação atribuída a especialista nomeado",
    quotes > 0 ? "PASS" : "FAIL",
    false,
    `${quotes} bloco(s) de citação`,
  );

  const hasAuthor =
    authorNodes.length > 0 ||
    /rel\s*=\s*["']author["']/i.test(html) ||
    !!metaContent(html, "author");
  add("G4", "G", "Autoria visível ou marcada", hasAuthor ? "PASS" : "FAIL", false, hasAuthor ? "ok" : "sem autoria");

  const hasTime = /<time\b/i.test(html) || dates.length > 0;
  add("G5", "G", "Data de publicação/atualização", hasTime ? "PASS" : "FAIL", false, hasTime ? "ok" : "ausente");

  const outbound = (html.match(/<a[^>]+href\s*=\s*["']https?:\/\/[^"']+["']/gi) ?? []).length;
  add(
    "G6",
    "G",
    "Links de saída para fonte externa",
    outbound > 0 ? "PASS" : "FAIL",
    false,
    `${outbound} link(s) externo(s)`,
  );

  add(
    "G7",
    "G",
    "Entidade com sameAs",
    ldNodes.some((n) => n.sameAs) ? "PASS" : "FAIL",
    false,
    ldNodes.some((n) => n.sameAs) ? "sameAs presente" : "nenhum sameAs — entidade não consolida",
  );

  const vague = text.match(VAGUE_ATTRIBUTION);
  add(
    "G8",
    "G",
    "Sem atribuição vaga",
    vague ? "FAIL" : "PASS",
    false,
    vague ? `encontrado: "${vague[0]}"` : "ok",
  );

  // ── P · Performance estática ───────────────────────────────────────
  const imgs = html.match(/<img\b[^>]*>/gi) ?? [];
  const imgsNoDim = imgs.filter(
    (t) => !/\bwidth\s*=/i.test(t) || !/\bheight\s*=/i.test(t),
  );
  add(
    "P2",
    "P",
    "Imagens com width e height",
    imgs.length === 0 ? "NA" : imgsNoDim.length === 0 ? "PASS" : "FAIL",
    false,
    imgs.length ? `${imgsNoDim.length}/${imgs.length} sem dimensão explícita` : "sem <img>",
  );

  const firstImg = imgs[0];
  add(
    "P3",
    "P",
    "Imagem do LCP sem lazy e com fetchpriority",
    !firstImg ? "NA" : !/loading\s*=\s*["']lazy["']/i.test(firstImg) && /fetchpriority/i.test(firstImg) ? "PASS" : "FAIL",
    false,
    firstImg
      ? /loading\s*=\s*["']lazy["']/i.test(firstImg)
        ? "primeira imagem está com loading=lazy"
        : "sem fetchpriority=high"
      : "sem <img>",
  );

  const hasFontDisplay = /font-display\s*:\s*swap/i.test(html) || /&display=swap/i.test(html);
  const hasFontPreload = /<link[^>]+rel\s*=\s*["']preload["'][^>]+as\s*=\s*["']font["']/i.test(html);
  add(
    "P4",
    "P",
    "font-display: swap e preload de fonte",
    hasFontDisplay && hasFontPreload ? "PASS" : "FAIL",
    false,
    `swap: ${hasFontDisplay ? "sim" : "não"} · preload: ${hasFontPreload ? "sim" : "não"}`,
  );

  const head = html.match(/<head\b[\s\S]*?<\/head>/i)?.[0] ?? "";
  const blocking = (head.match(/<script\b[^>]*src=[^>]*>/gi) ?? []).filter(
    (t) => !/\b(defer|async|type\s*=\s*["']module["'])/i.test(t),
  );
  add(
    "P5",
    "P",
    "Nenhum script bloqueante no <head>",
    blocking.length === 0 ? "PASS" : "FAIL",
    false,
    blocking.length ? `${blocking.length} script(s) sem defer/async` : "ok",
  );

  // ── X · Acessibilidade ─────────────────────────────────────────────
  const imgsNoAlt = imgs.filter((t) => !/\balt\s*=/i.test(t));
  add(
    "X2",
    "X",
    "Toda <img> com atributo alt",
    imgs.length === 0 ? "NA" : imgsNoAlt.length === 0 ? "PASS" : "FAIL",
    false,
    imgs.length ? `${imgsNoAlt.length}/${imgs.length} sem alt` : "sem <img>",
  );

  let jump = "";
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level - headings[i - 1].level > 1) {
      jump = `h${headings[i - 1].level} → h${headings[i].level} ("${headings[i].text.slice(0, 40)}")`;
      break;
    }
  }
  add(
    "X3",
    "X",
    "Hierarquia de heading sem salto",
    headings.length === 0 ? "NA" : jump ? "FAIL" : "PASS",
    false,
    jump || `${headings.length} heading(s) em ordem`,
  );

  const landmarks = ["header", "nav", "main", "footer"].filter(
    (t) => !new RegExp(`<${t}\\b`, "i").test(html),
  );
  add(
    "X5",
    "X",
    "Landmarks header/nav/main/footer",
    landmarks.length === 0 ? "PASS" : "FAIL",
    false,
    landmarks.length ? `faltando: ${landmarks.join(", ")}` : "completos",
  );

  add(
    "X6",
    "X",
    "prefers-reduced-motion respeitado",
    /prefers-reduced-motion/i.test(html) ? "PASS" : "FAIL",
    false,
    /prefers-reduced-motion/i.test(html) ? "ok" : "nenhuma media query encontrada",
  );

  void label;
  return checks;
}

// ──────────────────────────────────────────────────────────────────────
// Entrada
// ──────────────────────────────────────────────────────────────────────

async function loadTarget(
  target: string,
): Promise<{ html: string; files: SiteFiles; label: string }> {
  if (/^https?:\/\//i.test(target)) {
    const res = await fetch(target, { headers: { "User-Agent": SEARCH_BOT_UA } });
    const html = await res.text();
    const origin = new URL(target).origin;
    const files: SiteFiles = {};
    for (const [key, path] of [
      ["robots", "/robots.txt"],
      ["sitemap", "/sitemap.xml"],
      ["llms", "/llms.txt"],
    ] as const) {
      try {
        const r = await fetch(origin + path, { headers: { "User-Agent": SEARCH_BOT_UA } });
        if (r.ok) files[key] = await r.text();
      } catch {
        /* target without the file — carry on */
      }
    }
    return { html, files, label: target };
  }

  const abs = resolve(target);
  if (!existsSync(abs)) {
    console.error(`[audit] alvo não encontrado: ${abs}`);
    process.exit(2);
  }

  if (statSync(abs).isDirectory()) {
    const entry = ["index.html", "index.htm"].find((f) => existsSync(join(abs, f)));
    const fallback = readdirSync(abs).find((f) => f.endsWith(".html"));
    const htmlFile = entry ?? fallback;
    if (!htmlFile) {
      console.error(`[audit] nenhum .html em ${abs}`);
      process.exit(2);
    }
    const files: SiteFiles = {};
    for (const [key, name] of [
      ["robots", "robots.txt"],
      ["sitemap", "sitemap.xml"],
      ["llms", "llms.txt"],
    ] as const) {
      const p = join(abs, name);
      if (existsSync(p)) files[key] = readFileSync(p, "utf8");
    }
    // a missing robots.txt in a build directory is still auditable (it should exist).
    if (files.robots === undefined) files.robots = "";
    return { html: readFileSync(join(abs, htmlFile), "utf8"), files, label: join(abs, htmlFile) };
  }

  return { html: readFileSync(abs, "utf8"), files: {}, label: basename(abs) };
}

function verdict(score: number): string {
  if (score >= 90) return "EXEMPLAR";
  if (score >= 75) return "SOLID";
  if (score >= 60) return "WEAK";
  return "FAIL";
}

const GROUP_NAMES: Record<Check["group"], string> = {
  T: "Técnico",
  S: "Dados estruturados",
  A: "Extratibilidade (AEO)",
  G: "Citabilidade (GEO)",
  P: "Performance",
  X: "Acessibilidade",
};

async function main() {
  const args = process.argv.slice(2);
  const asJson = args.includes("--json");
  const target = args.find((a) => !a.startsWith("--"));

  if (!target) {
    console.error(
      "uso: bun audit-search-visibility.ts <arquivo.html | diretório | https://url> [--json]",
    );
    process.exit(2);
  }

  const { html, files, label } = await loadTarget(target);
  const checks = auditHtml(html, files, label);

  const scored = checks.filter((c) => c.status !== "NA");
  const passed = scored.filter((c) => c.status === "PASS").length;
  const score = scored.length ? Math.round((passed / scored.length) * 100) : 0;
  const blockingFails = checks.filter((c) => c.blocking && c.status === "FAIL");
  const approved = blockingFails.length === 0 && score >= 75;

  if (asJson) {
    console.log(
      JSON.stringify(
        {
          target: label,
          audited_at: new Date().toISOString(),
          score,
          verdict: verdict(score),
          approved,
          blocking_failures: blockingFails.map((c) => c.id),
          checks,
        },
        null,
        2,
      ),
    );
    process.exit(approved ? 0 : 1);
  }

  const icon = (s: Status) => (s === "PASS" ? "PASS" : s === "FAIL" ? "FAIL" : " n/a");

  console.log(`\nVISIBILIDADE EM BUSCA — ${label}`);
  console.log(`${new Date().toISOString().slice(0, 10)}\n`);

  for (const g of ["T", "S", "A", "G", "P", "X"] as const) {
    const group = checks.filter((c) => c.group === g);
    if (!group.length) continue;
    console.log(`${GROUP_NAMES[g]}`);
    for (const c of group) {
      const flag = c.blocking ? " [BLOQUEIO]" : "";
      console.log(`  ${icon(c.status)}  ${c.id}${flag}  ${c.title}`);
      if (c.status !== "PASS") console.log(`        └─ ${c.note}`);
    }
    console.log("");
  }

  console.log(`Score:    ${score}/100 (${verdict(score)})   ${passed}/${scored.length} itens`);
  console.log(
    `Bloqueios: ${blockingFails.length ? blockingFails.map((c) => c.id).join(", ") + " em FAIL" : "nenhum"}`,
  );
  console.log(`Veredito:  ${approved ? "APROVADO" : "REPROVADO"}\n`);

  if (!approved) {
    console.log("Correções obrigatórias:");
    let n = 1;
    for (const c of [...blockingFails, ...checks.filter((c) => c.status === "FAIL" && !c.blocking)]) {
      console.log(`  ${n++}. ${c.id} — ${c.title}: ${c.note}`);
    }
    console.log("");
  }

  console.log(
    "Não verificado aqui (manual): contraste WCAG, foco por teclado, INP/LCP de campo,\n" +
      "um-conceito-por-seção, fonte e data de cada número, validação em Rich Results Test.\n",
  );

  process.exit(approved ? 0 : 1);
}

main();
