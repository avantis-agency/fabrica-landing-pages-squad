---
name: lp-image-creator-section
description: "Generate remaining section images; no photoreal fake people; zero placeholders."
---

# Gerar imagens de seção

## Input
- Image briefs em `section-designs.md`
- Estilo da hero
- `DESIGN.md`

## Steps
1. Benefits: 4:3, mesma linguagem da hero. Features: ícone 1:1 geométrico.
2. Testimonials: iniciais, marca ilustrada, ou foto real do brief. **Proibido** headshot fotorealista de pessoa inventada.
3. Mesmo gerador e paleta da hero. Zero placeholders.
4. Salvar `assets/images/<section>-<n>.webp`.

## Output
Arquivos em `assets/images/` (slug `section-images`).

## Acceptance Criteria
- [ ] Todo slot pedido no design tem arquivo real
- [ ] Ratios corretos por tipo
- [ ] Nenhuma face fotorealista inventada
- [ ] Estilo consistente com a hero
