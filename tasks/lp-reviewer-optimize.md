---
name: lp-reviewer-optimize
description: "Prioritize fixes and emit SHIP or NO_SHIP. Apply mechanical quick wins in this run."
---

# Otimizar e decidir ship

## Input
- `review-report.md`
- HTML montado

## Steps
1. Classificar issues por impacto × esforço.
2. Aplicar quick wins mecânicos neste run (alt, contraste de token, skip-link, lazy no não-hero).
3. A/B: headline, CTA, prova. Cada teste com hipótese.
4. `finalVerdict` = SHIP só com 0 critical e ≤ 2 major. Senão NO_SHIP e a lista que falta.

## Output
`optimization-plan.md` (slug `optimization-plan`) com `finalVerdict`.

## Acceptance Criteria
- [ ] Quick wins, estratégico e A/B estão separados
- [ ] Cada A/B tem hipótese
- [ ] SHIP implica 0 critical e ≤ 2 major no review atualizado
- [ ] Nenhum pedido de aprovação humana para seguir
