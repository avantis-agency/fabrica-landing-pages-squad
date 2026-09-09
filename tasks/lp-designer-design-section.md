---
name: lp-designer-design-section
description: "Specify layout, tokens and image briefs for every shipped section."
---

# Design de cada seção

## Input
- `DESIGN.md`
- `section-copy.md`
- `templates/section-design-brief-template.md`

## Steps
1. Para cada seção embarcada: layout desktop / tablet / mobile, hierarquia (headline → prova → CTA), tokens do DESIGN.md (sem hex solto).
2. Image brief quando o plano pede imagem: assunto, ratio, paleta, mood, área limpa no hero.
3. Contraste anotado ≥ 4.5:1. CTA ≥ 44 px. Touch 2.5.8 ≥ 24 px no restante.
4. Gravar `section-designs.md`.

## Output
`section-designs.md` (slug `section-design-specs`).

## Acceptance Criteria
- [ ] Toda seção embarcada tem spec responsiva e hierarquia
- [ ] Specs usam tokens do DESIGN.md
- [ ] Toda seção que pede imagem tem image brief
- [ ] Contraste e tamanho de alvo estão anotados
