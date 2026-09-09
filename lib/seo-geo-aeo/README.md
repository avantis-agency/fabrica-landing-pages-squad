# lib/seo-geo-aeo

Fonte única de visibilidade em busca para TODOS os squads que entregam página, landing page, site ou
conteúdo publicável do Nirvana-OS. Squads **referenciam** estes arquivos; não os copiam.

Cobre as quatro camadas que decidem se uma página existe para quem procura:

```
SEO técnico  →  a página é rastreável, renderizável e rápida
SEO clássico →  a página ranqueia numa lista de links
AEO          →  a passagem é EXTRAÍVEL como resposta direta
GEO          →  a fonte é CITADA quando o modelo sintetiza a resposta
```

## Conteúdo

| Arquivo | O quê |
|---|---|
| `FUNDAMENTALS.md` | As 4 camadas, como se compõem, e o que a evidência nomeada sustenta de verdade |
| `TECHNICAL-SEO.md` | SSR obrigatório, matriz de crawlers de IA, robots.txt, sitemap, canonical, hreflang, metadata, llms.txt |
| `AEO-GEO.md` | Competição por chunk, estrutura answer-first, densidade factual, citação, autoria, entidade |
| `STRUCTURED-DATA.md` | JSON-LD `@graph`, stacking, tipos por tipo de página, paridade obrigatória, validação |
| `PERFORMANCE.md` | Orçamento de LCP/INP/CLS e a tensão com motion premiado |
| `MEASUREMENT.md` | Os 3 KPIs que existem e os que ninguém mede com honestidade |
| `CHECKLIST.md` | Auditoria binária — o gate |
| `CAPABILITY.yaml` | As capabilities `frontend.search_visibility.optimize_fabrica` e `.audit` |
| `scripts/audit-search-visibility.ts` | Auditor executável (Bun) — roda contra HTML ou diretório e devolve score + JSON |

## Ordem de leitura para quem vai construir

```
1. TECHNICAL-SEO.md   → decida SSR, robots, canonical ANTES da arquitetura
2. AEO-GEO.md         → escreva a copy em blocos answer-first
3. STRUCTURED-DATA.md → JSON-LD no <head>, com paridade com o que está visível
4. PERFORMANCE.md     → declare o orçamento de motion
5. CHECKLIST.md       → rode o gate
6. scripts/           → bun audit-search-visibility.ts <arquivo|dir>
```

## As três coisas que mais custam caro se ignoradas

1. **Crawler de IA não executa JavaScript.** Vercel e MERJ rastrearam 500+ milhões de fetches do
   GPTBot: zero evidência de execução de JS. Site com client-side rendering pode ranquear no Google e
   ser invisível no ChatGPT, no Claude e no Perplexity. Conteúdo que precisa ser citado **nasce no
   HTML do servidor**.
2. **A competição é por chunk, não por página.** Uma seção H2 é a unidade de recuperação. Resposta no
   começo da passagem, não no fim.
3. **INP no limiar "good" vigente limita o que dá para animar.** Confirme o número em
   https://web.dev/articles/vitals. Não cite taxa de reprovação sem resolvê-la nesta execução.
   Motion premiado é a causa mais comum de falha. Snapshot em `../../references/state-of-the-art.md`.

## Rollout

```bash
bun ../web-capabilities-inject.js --dry-run
bun ../web-capabilities-inject.js
```

## Companheira

Linguagem visual fica em `lib/design-intelligence/`. As duas se encontram na mesma página: o
DESIGN.md define como ela parece; esta lib define se ela existe para quem procura.
