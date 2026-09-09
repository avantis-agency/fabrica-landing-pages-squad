# DESIGN.md — o formato de intercâmbio

Especificação aberta publicada pelo **Google Labs em 21 de abril de 2026** (Apache 2.0, repositório
`google-labs-code/design.md`). Descreve uma identidade visual inteira para agentes de código, dando
ao agente um entendimento persistente e estruturado do design system.

**Status:** confira o repositório nesta execução. Na publicação (21 de abril de 2026) estava alpha.
Spec, schema de token e CLI mudam. Escrever DESIGN.md continua valendo a pena porque é o que o
Claude Design importa, o que `/design-sync` movimenta e o que o Refero publica como biblioteca.

**Regra do Nirvana:** todo squad que entrega interface produz um `DESIGN.md` **antes** da primeira
linha de UI, e o entrega junto com o artefato. Sem ele, o segundo componente diverge do primeiro e
não existe base para auditar o gate anti-slop (item B5).

---

## Estrutura

Front matter YAML (tokens legíveis por máquina) + corpo markdown (racional legível por humano).

### Front matter

```yaml
---
version: alpha            # opcional
name: <string>            # OBRIGATÓRIO
description: <string>     # opcional
omitted: <string[]>       # opcional — seções deliberadamente ausentes
colors:
  <token>: <Color>
typography:
  <token>:
    fontFamily: <string>
    fontSize: <Dimension>
    fontWeight: <number>
    lineHeight: <Dimension|number>
    letterSpacing: <Dimension>
    fontFeature: <string>
    fontVariation: <string>
rounded:
  <escala>: <Dimension>
spacing:
  <escala>: <Dimension|number>
components:
  <nome>:
    <prop>: <string|referência>
---
```

**Cores** aceitam: hex (`#RGB`, `#RRGGBB`, `#RRGGBBAA`), nome CSS, `rgb()`/`rgba()`, `hsl()`/`hsla()`,
`oklch()`, `oklab()`, `color-mix()`.

**Dimensões** são string com sufixo: `px`, `em`, `rem`.

**Referências de token** vão entre chaves: `{colors.primary}`, `{typography.label-md}`. Cores,
espaçamento e raio aceitam aninhamento arbitrário, resolvido por caminho separado por ponto.

### Corpo — oito seções, nesta ordem

1. **Overview** — personalidade da marca, público, tom emocional
2. **Colors** — descrição da paleta (`primary` é obrigatória), nomenclatura semântica
3. **Typography** — estratégia de fonte e definição dos níveis (9 a 15 níveis é o típico)
4. **Layout** — modelo de grade e estratégia de ritmo de espaçamento
5. **Elevation & Depth** — método de sombra e hierarquia
6. **Shapes** — filosofia de raio de canto
7. **Components** — átomos (botão, input, chip) com variantes
8. **Do's and Don'ts** — guardrails práticos e armadilhas

### Convenção de nomes recomendada

- Cores: `primary`, `secondary`, `tertiary`, `neutral`, `surface`, `on-surface`, `error`
* Tipografia: `headline-display`, `headline-lg`, `body-md`, `label-sm`
- Espaçamento e raio: `xs`, `sm`, `md`, `lg`, `xl`, `full`, `none`

### Acessibilidade — exigência do próprio spec

O spec exige validar as escolhas de cor contra WCAG AA/AAA. O agente não só respeita a paleta: precisa
garantir que o contraste texto/fundo permaneça legível (4,5:1 para texto normal). Isso casa com o item
B4 do `ANTI-SLOP.md`.

Na prática: cada par `on-*` / `*` declarado no front matter precisa ter a razão de contraste anotada
na seção Colors do corpo. Par sem razão anotada é par não verificado.

---

## Template do Nirvana

Copiar, preencher, entregar junto do artefato.

```markdown
---
version: alpha
name: <Nome do sistema>
description: <uma frase>
colors:
  primary: "#..."
  on-primary: "#..."
  surface: "#..."
  on-surface: "#..."
  surface-muted: "#..."
  accent: "#..."
  error: "#..."
  on-error: "#..."
typography:
  headline-display:
    fontFamily: <display>
    fontSize: 72px
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: <display>
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.1
  body-md:
    fontFamily: <corpo>
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.6
  label-sm:
    fontFamily: <corpo>
    fontSize: 13px
    fontWeight: 500
    letterSpacing: 0.02em
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
rounded:
  none: 0
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    borderRadius: "{rounded.md}"
    paddingBlock: "{spacing.sm}"
    paddingInline: "{spacing.md}"
---

## Overview

Estilo: <do VIBE-ATLAS.md> · Família: <de AESTHETIC-FAMILIES.md>
Público e tom: <quem, e o que precisa sentir nos primeiros 2 segundos>
Diferenciação: <a única coisa que a pessoa vai lembrar>
Separado de: <o sósia mais próximo, e como se distingue>

## Colors

<papel de cada cor>. Contraste verificado:
- on-surface sobre surface — 12.4:1 (AA e AAA)
- on-primary sobre primary — 5.1:1 (AA)
- accent sobre surface — 3.2:1 (AA só para texto large e elemento não-textual)

Dark mode: <definida de propósito, não invertida>.

## Typography

Display <fonte> porque <razão ligada à marca>. Corpo <fonte> porque <legibilidade/tom>.
Escala: razão <1.25 / 1.333>. Medida de linha: 60-72 caracteres.

## Layout

Grade: <12 col / assimétrica / editorial>. Ritmo em múltiplos de <8px>.
Quebra deliberada de grade em: <onde e por quê>.

## Elevation & Depth

<sombra / camada / borda>. Fonte de luz declarada: <direção>.

## Shapes

<filosofia de raio; onde o raio quebra e por quê>.

## Components

<botão, input, card, chip — variantes e estados: default, hover, focus-visible, active, disabled>.

## Do's and Don'ts

Do: <3-5 regras que preservam a identidade>
Don't: <3-5 armadilhas, incluindo as fingerprints de ANTI-SLOP.md que este estilo tende a atrair>
```

---

## Como extrair um DESIGN.md do que já existe

Três caminhos, em ordem de fidelidade:

1. **Do codebase** — ler `tailwind.config`, `tokens.json`, CSS custom properties, tema do Storybook.
   É a fonte mais fiel porque é o que está no ar. Claude Design importa exatamente esses arquivos.
2. **Do site no ar** — capturar as computed styles das superfícies principais (fundo, texto, botão
   primário, card) e derivar tokens. Perde a intenção, mantém o fato. O brandcraft já faz isso com
   extração ao vivo + Refero.
3. **Da marca** — manual de marca, paleta e tipografia oficiais. Mais intencional, menos aderente ao
   produto real. Anotar a divergência quando existir.

Divergência entre o que a marca diz e o que o site faz é informação, não erro. Registrar na seção
Do's and Don'ts.

---

## Relação com o resto

- **Claude Design** importa DESIGN.md e o material de origem — ver `CLAUDE-DESIGN.md`.
- **`/design-sync`** move tokens entre o projeto de design e o repo, nos formatos CSS custom
  properties, config Tailwind, JSON de token e export para o plugin Figma Tokens.
- **Refero** publica uma biblioteca curada de DESIGN.md extraídos de sites líderes — útil como
  referência de qualidade e como ponto de partida, nunca como cópia.
- **Gate anti-slop** item B5 exige a existência deste arquivo; item B6 exige que nenhum componente
  use cor fora dos tokens aqui declarados.
