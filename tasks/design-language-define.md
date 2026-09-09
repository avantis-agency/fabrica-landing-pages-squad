---
name: design-language-define
description: "Define DESIGN.md plus anti-slop for a conversion landing page before any UI."
---

# Definir a linguagem visual

Tarefa canônica de `frontend.design_language.define_fabrica` e passo `design-language` do pipeline. Método em `lib/design-intelligence/` (leia com read). Roda antes da primeira linha de UI.

## Input
* `brief` / `landing-page-plan.md`
* `brand_source` (opcional)
- `constraints` (opcional)

## Steps
1. Nomear padrões de UI com `UI-LEXICON.md` (ARIA + foco). Skip-link e CTA visíveis (2.4.11). Alvos ≥ 24 px, CTA ≥ 44 px.
2. Escolher um estilo de `VIBE-ATLAS.md` ou família de `AESTHETIC-FAMILIES.md`. Nomear, listar sinais, separar do sósia. Pesquisar tendências com data; não copiar `data/design-trends-reference.yaml` como moda vigente.
3. 3 a 5 referências de `REFERENCE-SOURCES.md`, cada uma anotada. Pelo menos uma é landing de conversão do setor, não moodboard.
4. Escrever `DESIGN.md` no formato de `DESIGN-MD.md` (tokens + oito seções). Contraste de cada par `on-*` / `*` em light e dark ≥ 4.5:1. CTA é o token de maior contraste.
5. Gate `ANTI-SLOP.md`: 6 bloqueios, 10 impressões, 6 exigências. Laudo com correção por arquivo e linha.

## Output
* `DESIGN.md` (slug `design-md`)
- Laudo anti-slop (`anti-slop-report`)

## Acceptance Criteria
* [ ] `DESIGN.md` existe, front matter válido, 8 seções
* [ ] Estilo nomeado e separado do sósia mais próximo
- [ ] Nenhum bloqueio B1-B6 em FAIL; no máximo 1 impressão digital
* [ ] Todo par de contraste declarado tem razão anotada e ≥ 4.5:1 para texto normal
- [ ] Tokens de CTA e do caminho visual headline → prova → ação estão no front matter ou em Components
