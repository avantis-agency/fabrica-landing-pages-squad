---
name: lp-image-creator-hero
description: "Generate the hero image with nano-banana-pro (resolve the live image model this run), 16:9 2K, no burned text."
---

# Gerar a hero image

## Input
- Image brief do hero em `section-designs.md`
- Headline em `section-copy.md`
- Paleta em `DESIGN.md`

## Steps
1. Montar prompt: assunto, estilo, paleta, área limpa para overlay, sem texto.
2. Resolver o id do modelo no schema `nano-banana-pro` e em https://ai.google.dev/gemini-api/docs/image-generation. Gerar 16:9, 2K. Fallback Flux. Não usar `gemini-3-pro-image-preview` (id morto). Gravar o id resolvido no manifesto.
3. Validar (relevância, paleta, overlay, artefato). Iterar até 3 vezes.
4. Salvar `assets/images/hero.webp` (PNG fallback) e registrar prompt + ferramenta.

## Output
Arquivo em `assets/images/hero.webp` (slug `hero-image`) + registro de prompt.

## Acceptance Criteria
- [ ] Arquivo existe, largura ≥ 1920 px, 16:9
- [ ] Sem texto, watermark ou logo queimados
- [ ] Paleta alinhada ao DESIGN.md
- [ ] Prompt e ferramenta registrados
