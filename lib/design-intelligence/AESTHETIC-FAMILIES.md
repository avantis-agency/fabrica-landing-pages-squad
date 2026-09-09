# Famílias estéticas

Nove famílias organizadas por **caráter visual**, não por indústria. Um banco pode ser Terminal-Core
e uma ferramenta de dev pode ser Warm Editorial — a família se escolhe pelo que a marca quer que a
pessoa sinta, não pelo setor onde ela está.

Complementa o `VIBE-ATLAS.md`: o atlas nomeia **efeitos visuais** (glass, brutalism, clay); esta
lista nomeia **posturas de produto** com referências reais no ar.

---

## 1. Editorial Minimalism

**Assinatura** · neutros calmos · entrelinha generosa · grade rígida · uma cor de acento fria ·
tipografia sem serifa refinada com muito peso hierárquico.
**Referências** · Linear, Stripe, Vercel.
**Para** · produto pesado em leitura, documentação, SaaS que quer parecer inevitável.
**Tokens típicos** · fundo `#fafafa`/`#0b0b0c` · texto quase-preto/quase-branco · acento único ·
raio 6-8px · sombra quase inexistente · escala tipográfica 1.25.
**Armadilha** · vira genérico com facilidade. O que salva é a decisão tipográfica e o detalhe de
microinteração, não a paleta.

## 2. Terminal-Core

**Assinatura** · monoespaçada em tudo, inclusive corpo · acento fósforo (verde, âmbar ou ciano) sobre
quase-preto · linha de comando como metáfora · borda de 1px · densidade alta.
**Referências** · Ollama, Warp, Raycast.
**Para** · ferramenta de desenvolvedor, produto de infraestrutura, CLI com cara de produto.
**Tokens típicos** · fundo `#0a0a0a`-`#111` · texto `#d0d0d0` · acento `#00ff9c`/`#ffb000` · raio 2-4px
· `letter-spacing` levemente negativo em display.
**Armadilha** · monoespaçada em parágrafo longo cansa. Limitar corpo a 65 caracteres e subir a
entrelinha para 1.7.

## 3. Warm Editorial

**Assinatura** · terracota, creme, argila · corpo serifado · sensação de papel · ilustração desenhada
à mão · calor deliberado.
**Referências** · Claude/Anthropic, Notion.
**Para** · produto que precisa parecer humano e acessível; educação; escrita.
**Tokens típicos** · fundo `#f5f2ea` · texto `#2b2724` · acento `#c96442`/`#d4a373` · raio 8-12px ·
sombra suave e quente.
**Armadilha** · em dark mode, o creme vira lama. Definir a paleta escura de propósito, não invertendo.

## 4. Data-Dense Pro

**Assinatura** · gráfico como herói · espaçamento apertado · paleta saturada com muitas séries ·
tabela de primeira classe · números grandes.
**Referências** · ClickHouse, PostHog, MongoDB.
**Para** · dashboard, BI, observabilidade, produto analítico.
**Tokens típicos** · escala de espaçamento em 4px (não 8) · fonte tabular (`font-variant-numeric:
tabular-nums`) obrigatória · paleta categórica testada para daltonismo · raio 4px.
**Armadilha** · densidade sem hierarquia vira ruído. Definir três níveis de importância e obedecer.
Para a paleta de série, seguir a skill `dataviz`.

## 5. Cinematic Dark

**Assinatura** · gradiente de cinema · tipo superdimensionado · mídia pesada em tela cheia · vinheta ·
grão · movimento lento.
**Referências** · RunwayML, ElevenLabs, NVIDIA.
**Para** · ferramenta de criador, produto de IA generativa, lançamento.
**Tokens típicos** · fundo `#050507` · gradiente de 3 paradas · display 72-140px · `letter-spacing`
negativo · sobreposição com `mix-blend-mode`.
**Armadilha** · é o estilo que mais destrói LCP e INP. Ver o orçamento em
`../seo-geo-aeo/PERFORMANCE.md` antes de decidir por vídeo de fundo.

## 6. Playful Color

**Assinatura** · alta saturação · acento ilustrado · canto arredondado generoso · movimento elástico ·
mascote ou personagem.
**Referências** · Figma, Duolingo, Canva.
**Para** · produto de consumo, educação, onboarding, gamificação.
**Tokens típicos** · 4-6 cores saturadas com papéis definidos · raio 16-24px · easing com overshoot
(`cubic-bezier(.34,1.56,.64,1)`).
**Armadilha** · alegria sem hierarquia vira confusão. Uma cor precisa continuar significando "aja
aqui".

## 7. Glass / Soft-Futurism

**Assinatura** · desfoque fosco · translucidez em camadas · luz difusa · gradiente suave de fundo ·
sensação premium adjacente à Apple.
**Referências** · Arc Browser, Airbnb.
**Para** · produto premium, app de viagem, ferramenta pessoal.
**Tokens típicos** · ver `VIBE-ATLAS.md` §3 e §4 para os valores de `backdrop-filter`.
**Armadilha** · custo de GPU e contraste frágil. Limitar quantas superfícies de vidro coexistem.

## 8. Neon Brutalist

**Assinatura** · aresta dura · numeral gigante · um matiz saturado único · grade visível · tipografia
como estrutura.
**Referências** · The Verge, Pitchfork, PlayStation.
**Para** · mídia, cultura, lançamento de peça única, portfólio.
**Tokens típicos** · um matiz + preto + branco · raio 0 · display 120px+ · borda 2px · `mix-blend-mode:
difference` em sobreposição.
**Armadilha** · não escala para produto com muitas telas. Ótimo em landing, hostil em app.

## 9. Cult / Indie

**Assinatura** · escolha que uma Fortune 500 não faria · referência cultural específica · tipografia
de fundição pequena · assimetria autoral.
**Referências** · Criterion, A24, Granola.
**Para** · marca com ponto de vista, produto de nicho, quem prefere ser amado por poucos.
**Armadilha** · exige convicção. Executado pela metade, lê como erro em vez de escolha.

---

## Receitas de remix

Cruzar tokens de duas famílias, com uma dominando. A dominante define layout, espaçamento e
tipografia de corpo; a segunda entra em cor, detalhe ou movimento.

| Receita | O que sai |
|---|---|
| Linear × Claude | SaaS editorial com alma: grade e contenção do Linear, paleta quente e corpo serifado |
| Warp × Sentry | Dashboard de dev com calor: densidade e monoespaçada, mas com acento quente e raio maior |
| Stripe × A24 | Fintech com ousadia: rigor de grade com tipografia de pôster de cinema no hero |
| Granola × Criterion | Notas premium com gravidade: minimalismo autoral com referência editorial impressa |

Ao remixar, o DESIGN.md precisa declarar **qual domina**:

```markdown
## Overview

Família: Editorial Minimalism (dominante) × Warm Editorial (acento).
O que vem de cada: grade, escala e contenção do Editorial Minimalism; paleta terracota/creme e o
corpo serifado do Warm Editorial. Movimento fica do lado contido.
```

---

## Como escolher, em três perguntas

1. **O que a pessoa precisa sentir nos primeiros 2 segundos?** (confiança, energia, calma, poder,
   afeto) → elimina metade das famílias.
2. **Quanta informação a tela precisa carregar?** Densidade alta empurra para Data-Dense Pro ou
   Terminal-Core; densidade baixa abre para Cinematic Dark e Neon Brutalist.
3. **Qual é o orçamento de performance?** Ver `../seo-geo-aeo/PERFORMANCE.md`. Se LCP e INP são
   críticos, Cinematic Dark e Glass entram só com contenção declarada.

Registrar a resposta das três no DESIGN.md. É o que impede a próxima pessoa (ou o próximo agente) de
desfazer a decisão sem saber que existia uma.
