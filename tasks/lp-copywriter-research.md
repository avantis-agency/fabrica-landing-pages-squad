---
name: lp-copywriter-research
description: "Research audience and map each shipped section to a named copy framework."
---

# Pesquisar copy

## Input
- `landing-page-plan.md`
- `data/copy-frameworks.yaml`

## Steps
1. Ler plano: produto, público, awareness, seções embarcadas.
2. Montar perfil: dores, desejos, objeções, linguagem real. Só brief + premissas.
3. Confirmar ou corrigir o awareness com implicação de copy.
4. Tabela seção → framework (do YAML) → ângulo → mensagem-chave, cobrindo 100% das seções embarcadas.
5. Gravar `copy-research.md`.

## Output
`copy-research.md` (slug `copy-research`).

## Acceptance Criteria
- [ ] Perfil tem dores, desejos, objeções e palavras concretas (não "o público quer qualidade")
- [ ] Awareness está classificado com implicação
- [ ] A tabela cobre cada seção embarcada com um framework que existe em `data/copy-frameworks.yaml`
