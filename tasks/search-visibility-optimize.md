---
name: search-visibility-optimize
description: "Make the landing page findable and citable: SSR, JSON-LD parity, robots/llms, CWV budget."
---

# Otimizar para busca — SEO + AEO + GEO

Método em `lib/seo-geo-aeo/` (leia com read). Não esvaziar o headline de conversão.

## Input
- `target`: HTML, dist/ ou brief
- `intent` (opcional)
- `crawler_policy` (opcional). Ausente = premissa **citação sem treino** (busca liberada, treino bloqueado), gravada no relatório.

## Steps
1. Sem HTML: gravar `search-report.md` com o gap e parar. Não inventar página.
2. Renderização: copy citável no HTML do servidor. `TECHNICAL-SEO.md` §1.
3. Crawler: os user-agents de IA em `TECHNICAL-SEO.md` §2 (confirme os docs do fornecedor nesta execução). Default Nirvana. Brief vence. Premissa no relatório. Nunca perguntar.
4. Blocos answer-first (`AEO-GEO.md`) ao redor do offer, não no lugar dele.
5. Densidade factual: número + fonte + data por seção quando o brief tiver fato.
6. JSON-LD `@graph` no `<head>`, Organization + WebSite + WebPage, paridade visível. `STRUCTURED-DATA.md`.
7. robots.txt, sitemap.xml (só canônica), llms.txt.
8. Orçamento LCP/INP/CLS nos limiares "good" vigentes em https://web.dev/articles/vitals (snapshot em `references/state-of-the-art.md`). Hero como LCP. `PERFORMANCE.md`.
9. `bun lib/seo-geo-aeo/scripts/audit-search-visibility.ts <alvo>`.

## Output
Página, robots.txt, sitemap.xml, llms.txt, orçamento, `search-report.md`.

## Acceptance Criteria
- [ ] Auditor score ≥ 75 e nenhum bloqueio em FAIL, ou o relatório lista os bloqueios restantes
- [ ] Copy principal visível sem JavaScript
- [ ] Todo item do schema tem correspondência visível
- [ ] `robots.txt` declara a postura; se o brief omitiu, a premissa está no `search-report.md`
