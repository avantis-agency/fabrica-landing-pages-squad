---
name: lp-developer-setup
description: "Scaffold vanilla HTML/CSS/JS with DESIGN.md tokens. Bun, never npm."
---

# Setup do projeto

## Input
- `landing-page-plan.md`
- `DESIGN.md`

## Steps
1. Default: vanilla HTML + CSS custom properties + JS mínimo. Só muda se o brief nomear outro stack.
2. Criar árvore: `index.html`, `src/styles/` (tokens, seções), `src/scripts/main.js`, `assets/images/`, `public/`.
3. Codificar DESIGN.md em `:root` (cor, tipo, espaço, raio, sombra, movimento).
4. `index.html` base: lang, charset, viewport, skip-link, preload de fonte com `font-display: swap`.
5. Toolchain, se houver: Bun. Scripts `bun run dev` / `bun run build`. Sem Node, npm, npx.

## Output
Árvore scaffold (slug `project-structure`).

## Acceptance Criteria
- [ ] Tokens do DESIGN.md estão em CSS custom properties
- [ ] Skip-link e meta viewport existem
- [ ] Nenhum comando npm/npx/node aparece no README do projeto gerado
- [ ] Default é vanilla; React/Next só se o brief os nomeou
