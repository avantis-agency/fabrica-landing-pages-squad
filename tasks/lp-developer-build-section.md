---
name: lp-developer-build-section
description: "Build each shipped section as semantic HTML using tokens, real copy and generated images."
---

# Construir seções

## Input
- Scaffold
- `section-copy.md`
- `section-designs.md`
- arquivos em `assets/images/`

## Steps
1. Uma `<section id aria-labelledby>` por bloco embarcado. Headings em ordem. Alt descritivo. Form com label associado.
2. Estilo só com tokens. Grid/flex. Mobile-first.
3. Hero: `fetchpriority="high"`, sem lazy. Demais: lazy + `srcset` WebP/PNG.
4. Ícones: Lucide. Form: ≤ 3 campos, Web3Forms/Formspree.
5. `prefers-reduced-motion`. Contraste e alvo 44 px no CTA.

## Output
Markup por seção (slug `built-sections`).

## Acceptance Criteria
- [ ] Copy e imagens fiéis aos artefatos de Quill e Lens
- [ ] Zero hex/px hardcoded
- [ ] Hero eager; resto lazy
- [ ] Form com labels e ≤ 3 campos salvo brief em contrário
