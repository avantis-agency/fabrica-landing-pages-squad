# Contrato anti-slop

Gate binário. Cada item abaixo é verdadeiro ou falso olhando o artefato entregue. Não existe
"parcialmente". Um `FAIL` em qualquer item de bloqueio reprova a entrega.

Origem: a skill oficial `frontend-design` da Anthropic, mais as impressões digitais que a comunidade
cataloga desde o lançamento do Claude Design. A tese é da Anthropic: sem direção explícita, o modelo
converge para a média estatística do treino, e essa média tem cara.

---

## 1. Bloqueios (FAIL automático)

| # | Regra | Como verificar |
|---|---|---|
| B1 | Nenhuma fonte da lista proibida como tipografia principal ou de corpo | `grep` por `Inter`, `Roboto`, `Arial`, `Helvetica Neue`, `system-ui`, `-apple-system`, `Segoe UI` em CSS/config de fonte |
| B2 | Nenhum gradiente roxo/violeta/índigo sobre fundo branco ou quase-branco | Inspecionar `background`, `background-image` de hero e seções; matiz 250-290 com fundo `#fff`-`#f8f8fb` |
| B3 | Emoji não é usado como ícone de interface | `grep` por emoji dentro de `<button>`, `<a>`, itens de lista de feature, cabeçalho |
| B4 | Contraste texto/fundo atende WCAG 2.2 AA (4,5:1 normal, 3:1 large) em light **e** dark | Calcular par a par a partir dos tokens; nenhum par abaixo do piso |
| B5 | O artefato declara sua direção estética por escrito | Existe `DESIGN.md` (ou seção equivalente) nomeando o estilo/família escolhida |
| B6 | Nenhum token de cor solto fora do sistema | Toda cor no CSS vem de `var(--…)` ou de token do DESIGN.md; nenhum hex literal em componente |

## 2. Impressões digitais (FAIL se duas ou mais aparecerem)

Nenhuma delas é errada isolada. Juntas, são a assinatura de saída não-dirigida.

| # | Impressão digital |
|---|---|
| F1 | Acento teal/ciano na faixa `#12d0e0`–`#1ae0f0` aplicado a todo componente |
| F2 | Grid de três colunas de features logo abaixo do hero |
| F3 | Ícones Lucide (ou um único set) usados para todo papel de UI, sem discriminação |
| F4 | Barra de acento vertical à esquerda em cards que não têm relação entre si |
| F5 | Hero centralizado com headline + subheadline + dois botões lado a lado |
| F6 | Cards com `border-radius` idêntico, sombra idêntica e padding idêntico em toda a página |
| F7 | Fundo em cor sólida sem nenhuma camada de atmosfera na página inteira |
| F8 | Seção de depoimento em três cards com avatar circular, nome, cargo, cinco estrelas |
| F9 | Space Grotesk como display — o novo default por convergência, nomeado pela própria Anthropic |
| F10 | Paleta distribuída por igual entre 4+ cores sem dominante clara |

## 3. Exigências positivas (o que precisa estar lá)

Cada uma responde a uma diretriz da skill oficial. Verificar presença, não intensidade.

### P1 — Tipografia com caráter
Par display + corpo escolhido de propósito. O DESIGN.md justifica a escolha em uma frase ligada à
marca ou ao conteúdo. Fonte variável é bem-vinda quando o design usa eixo de peso ou largura.

### P2 — Cor com dominante
Uma cor domina, um acento corta. Paleta tímida e igualmente distribuída perde para dominante +
acento afiado. Definido em CSS variables, nunca espalhado.

### P3 — Motion de alto impacto
Um page load bem orquestrado, com revelação escalonada por `animation-delay`, entrega mais do que
micro-interação espalhada. CSS puro primeiro em HTML; `Motion` no React quando disponível. Ver o
orçamento de INP em `../seo-geo-aeo/PERFORMANCE.md` — motion tem teto.

### P4 — Composição espacial não-óbvia
Pelo menos um destes, executado com intenção: assimetria, sobreposição, fluxo diagonal, elemento que
quebra o grid, densidade controlada, ou vazio generoso deliberado.

### P5 — Atmosfera no fundo
Cor sólida é o default de quem não decidiu. Alternativas legítimas: gradient mesh, textura de ruído,
padrão geométrico, transparência em camadas, sombra dramática, borda decorativa, cursor customizado,
grão. Escolher o que casa com o estilo declarado.

### P6 — Complexidade proporcional à visão
Maximalismo pede código elaborado, com animação e efeito extensos. Minimalismo pede contenção,
precisão, atenção obsessiva a espaçamento e tipografia. Minimalismo mal executado é preguiça
disfarçada; maximalismo mal executado é ruído. A elegância vem de executar a visão escolhida.

---

## 4. Regra de não-convergência

**Duas entregas seguidas não podem compartilhar a mesma direção estética.** Alternar entre claro e
escuro, entre famílias tipográficas, entre estéticas. A skill da Anthropic é explícita: nunca
convergir para escolhas comuns entre gerações.

Operacionalmente: antes de escolher o estilo, ler o `DESIGN.md` da entrega anterior do mesmo cliente
ou do mesmo squad. Se o estilo bate, escolher outro e dizer por quê.

---

## 5. Calibragem — o que o gate NÃO exige

O gate não exige que tudo seja ousado. Minimalismo refinado passa em todos os itens; maximalismo
passa em todos os itens. O eixo é **intencionalidade, não intensidade**.

O gate também não é desculpa para ilegibilidade. B4 (contraste) é inegociável e vence qualquer
argumento estético. Estilo que só funciona quebrando acessibilidade é estilo mal executado.

---

## 6. Formato do laudo

```
ANTI-SLOP GATE — <artefato> — <data>

Bloqueios:      B1 PASS · B2 PASS · B3 PASS · B4 PASS · B5 PASS · B6 FAIL
Fingerprints:   F2, F6  (2 → FAIL)
Positivas:      P1 ok · P2 ok · P3 ok · P4 ausente · P5 ok · P6 ok

VEREDITO: FAIL

Correções obrigatórias:
1. B6 — `components/Pricing.tsx:41` usa `#0f172a` literal. Trocar por `var(--color-surface-strong)`.
2. F2+F6 — a seção de features repete o grid 3-col com card idêntico. Quebrar para 2+1 assimétrico
   com um card em destaque de altura dupla.
3. P4 — nenhum elemento quebra o grid. Sugestão: sangrar a imagem do hero para além da margem direita.
```

Laudo sem número de linha e sem correção concreta não é laudo. É opinião.
