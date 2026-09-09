---
name: lp-reviewer-review
description: "Review copy, design, code and conversion. WCAG 2.2 and LCP/INP/CLS, never FID."
---

# Revisão da landing page

## Input
- HTML montado
- `landing-page-plan.md`
- copy, DESIGN.md, imagens

## Steps
1. Copy (25%): So What? / Who Cares?, CTA, prova verificável, tom, gramática.
2. Design (25%): hierarquia, paleta, responsivo 375/768/1440, CTA inconfundível, anti-slop residual.
3. Code (25%): HTML semântico, WCAG 2.2 AA (contraste, 2.4.11, 2.5.8), LCP/INP/CLS (nunca FID), alt, labels, skip-link. Rodar o auditor de busca se houver HTML.
4. Conversion (25%): CTA acima da dobra, CTA final, form curto, trust, garantia, thumb zone mobile.
5. Compilar issues (critical/major/minor/suggestion) com location e fix. Verdict APPROVE / NEEDS_FIXES / MAJOR_ISSUES.

## Output
`review-report.md` (slug `review-report`).

## Acceptance Criteria
- [ ] As quatro dimensões foram cobertas
- [ ] Toda issue tem severidade, location e fix
- [ ] Qualquer critical força MAJOR_ISSUES
- [ ] O relatório nomeia LCP/INP/CLS e WCAG 2.2, não FID nem WCAG 2.1
