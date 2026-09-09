---
name: search-visibility-audit
description: "Run the 38-item search visibility gate on a finished HTML artifact."
---

# Auditar visibilidade em busca

Critérios em `lib/seo-geo-aeo/CHECKLIST.md`. Não reescreve a página.

## Input
- `artifact`: HTML, dist/ ou URL

## Steps
1. Rodar:
   ```bash
   bun lib/seo-geo-aeo/scripts/audit-search-visibility.ts <artifact>
   bun lib/seo-geo-aeo/scripts/audit-search-visibility.ts <artifact> --json
   ```
2. Completar o que o auditor marca como não verificado: contraste light/dark, foco, INP/LCP de campo, um-conceito-por-seção, fonte e data, Rich Results Test e Schema Markup Validator.
3. Laudo no formato de `CHECKLIST.md`: PASS/FAIL, score, veredito, correção com arquivo e linha.
4. Bloqueio em FAIL ⇒ veredito REPROVADO, independente do score.

## Output
Laudo markdown e JSON (slugs `search-audit-report`, `search-audit-json`).

## Acceptance Criteria
- [ ] Os 38 itens automáticos avaliados (PASS/FAIL/N/A), nenhum silenciado
- [ ] Cada FAIL tem correção com arquivo e linha
- [ ] O laudo lista o que NÃO foi verificado
