---
name: lp-developer-assemble
description: "Assemble header, main and footer into one document with meta, OG and dist/ build."
---

# Montar a página

## Input
- Seções construídas
- Plano (ordem)

## Steps
1. Documento: skip-link, header (ou logo+CTA), `<main>` na ordem do plano, footer.
2. Meta: title, description, canonical, OG, Twitter, favicon.
3. JSON-LD inicial Organization + WebPage (o passo search completa o `@graph`).
4. Performance: critical CSS do primeiro viewport, font preload, minify no build.
5. `bun run build` → `dist/` quando houver toolchain; senão os estáticos já são o dist.

## Output
`index.html` completo (slug `landing-page-html`) e `dist/` se aplicável.

## Acceptance Criteria
- [ ] Ordem das seções = plano
- [ ] Title, description, OG image (hero) presentes
- [ ] Hero é o LCP (img eager)
- [ ] Build não usa npm
