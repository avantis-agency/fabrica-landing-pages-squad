---
name: lp-orchestrator-plan
description: "Plan the landing page: awareness, section set, per-section conversion job."
---

# Planejar a landing page

## Input
- Brief do cliente (produto, público, oferta, objetivo, tom, referências).
- `data/landing-page-sections.yaml` (anatomia default).

## Steps
1. Extrair fatos. O que faltar vira `## Premissas assumidas`. Não perguntar.
2. Classificar Schwartz (unaware / problem / solution / product / most) e escrever a implicação para o hero.
3. Decidir o conjunto: vendas = 11 seções do YAML; captura / tráfego pago = sem links de nav (logo + um CTA). Registrar a decisão.
4. Para cada seção que embarca: objetivo no funil, mensagem-chave, visual, CTA.
5. Gravar `landing-page-plan.md`.

## Output
`landing-page-plan.md` (slug `landing-page-plan`) e briefs por seção.

## Acceptance Criteria
- [ ] O plano existe e lista cada seção embarcada com objetivo, mensagem e CTA quando couber
- [ ] Awareness Schwartz está nomeado com implicação
- [ ] Premissas estão num bloco rotulado; nenhum campo crítico ficou implícito
- [ ] Página de captura não leva nav de 3-4 links sem uma frase que justifique o desvio
