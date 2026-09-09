# Atlas de estilos visuais

Catorze estilos nomeados. Formato de cada entrada, seguindo a estrutura do Name That Vibe do
NameThatUI: **sinais** que o definem, **sósia** do qual precisa ser separado, e **brief** que um
agente de código consegue construir.

Regra de uso: escolher **um** estilo e nomeá-lo no DESIGN.md. Estilo escolhido pela metade produz
página sem identidade. Misturar dois é possível, mas então declare qual domina e qual só aparece em
um elemento.

---

## 1. Skeuomorphism

**Sinais** · material real simulado (couro, feltro, metal escovado, papel) · iluminação física
coerente com uma fonte de luz única · sombra projetada com direção · metáfora de objeto real
(interruptor, caderno, régua).

**Sósia** · Neumorphism. A diferença: skeuomorphism imita um material *específico e reconhecível*;
neumorphism imita uma superfície *contínua e sem material*, só com luz.

**Brief** · Textura em `background-image` (papel, linho, ruído). `box-shadow` com deslocamento
consistente com a luz declarada. Bevel via `inset` claro no topo e escuro embaixo. Ícone com volume,
não glifo plano. Cantos suaves (8-14px). Paleta terrosa ou de material.

**Quando** · produto nostálgico, ferramenta de música/áudio, app que quer sensação tátil.
**Quando não** · qualquer coisa que precise de densidade de informação.

---

## 2. Neumorphism

**Sinais** · botão que parece empurrado para fora do próprio fundo · duas sombras por elemento (uma
clara, uma escura, em direções opostas) · superfície contínua sem borda · contraste baixíssimo ·
paleta monocromática quase inteira.

**Sósia** · Skeuomorphism (acima) e Glassmorphism. Contra o glass: neumorphism é **opaco**, glass é
translúcido.

**Brief** · `background` idêntico ao do container. `box-shadow: 6px 6px 12px var(--shadow-dark),
-6px -6px 12px var(--shadow-light)`. Estado pressionado troca para `inset`. Raio grande (16-24px).

**Alerta de acessibilidade** · este estilo reprova B4 do gate anti-slop com facilidade. Contraste de
borda quase nulo é o defeito estrutural dele. Usar apenas em superfície decorativa; nunca em texto,
nunca em controle primário. Se o produto exige AA, escolha outro estilo.

---

## 3. Glassmorphism

**Sinais** · card translúcido sobre fundo colorido ou fotográfico · desfoque de fundo real
(`backdrop-filter`) · borda fina de luz de 1px no topo · saturação levemente elevada atrás do vidro ·
camadas empilhadas com profundidade legível.

**Sósia** · Liquid Glass (abaixo) e Windows Aero. Contra Liquid Glass: glassmorphism é uma **placa
plana**; Liquid Glass tem refração e deformação de borda.

**Brief** · `backdrop-filter: blur(16px) saturate(180%)`, `background: rgb(255 255 255 / .12)`,
`border: 1px solid rgb(255 255 255 / .22)`. Exige fundo com informação visual — sobre cinza chapado
o efeito some. Testar com `@supports (backdrop-filter: blur(1px))` e fallback opaco.

**Custo** · `backdrop-filter` é caro em GPU. Limitar a poucos elementos simultâneos ou o INP paga.

---

## 4. Liquid Glass

**Sinais** · controle com aparência de gota d'água, não de placa · tint que se adapta ao conteúdo
por baixo · refração e realce especular na borda · deformação do que está atrás nas extremidades ·
resposta de luz ao movimento.

**Sósia** · Glassmorphism. Liquid Glass tem **ótica** (refração, especular, adaptação de tint);
glassmorphism tem só desfoque.

**Brief** · camada de `backdrop-filter` + máscara com `border-radius` alto e `filter: url(#displace)`
via SVG `feDisplacementMap` para a distorção de borda. Realce especular com gradiente cônico sutil na
borda superior. Tint derivado do conteúdo (amostragem ou `color-mix` com a cor dominante da seção).

**Quando** · produto que conversa com o ecossistema Apple, overlay sobre mídia.
**Quando não** · superfície com texto denso; a distorção compete com a leitura.

---

## 5. Web Brutalism

**Sinais** · defaults do browser expostos (link azul sublinhado, `Times New Roman`) · estrutura
visível, sem esconder o HTML · sem grade sofisticada, sem alinhamento decorativo · contraste cru ·
ausência deliberada de polimento.

**Sósia** · Neobrutalism. O web brutalism **não decora**; o neobrutalism decora muito, só que com
vocabulário duro.

**Brief** · reset mínimo ou nenhum. `font-family: Times, serif` ou monoespaçada de sistema. Borda
`1px solid #000`. Zero `border-radius`. Zero sombra. Layout em fluxo de documento. A ousadia está em
não intervir.

**Quando** · portfólio de artista, manifesto, site de conferência técnica.
**Quando não** · qualquer coisa que precise converter um público não-técnico.

---

## 6. Neobrutalism

**Sinais** · blocos de cor saturada e chapada · contorno preto grosso (2-4px) · sombra dura
deslocada, sem desfoque · tipografia pesada, grotesca, muitas vezes em caixa alta · ausência total de
gradiente e de transparência.

**Sósia** · Web Brutalism (acima) e Flat Design. Contra o flat: neobrutalism tem **contorno e sombra
dura**; flat não tem nenhum dos dois.

**Brief** · `border: 3px solid #000`, `box-shadow: 6px 6px 0 #000`, `border-radius: 0` ou pequeno
fixo. Hover desloca o elemento em `translate(3px, 3px)` e reduz a sombra — a peça "afunda". Paleta de
3 cores saturadas + preto + off-white.

**Quando** · marca jovem, produto que quer parecer confiante e não corporativo.
**Quando não** · fintech, saúde, jurídico — o vocabulário lê como informal.

---

## 7. Y2K Digital Aesthetic

**Sinais** · cromo e metal iridescente · degradê holográfico (magenta → ciano) · bolha, brilho e
lens flare · tipografia técnica esticada · elemento 3D renderizado com aparência de software antigo.

**Sósia** · Frutiger Aero. Y2K é **metálico e artificial**; Frutiger Aero é **orgânico e natural**.

**Brief** · gradiente cônico ou linear multiponto para o cromo. `filter: hue-rotate()` animado para o
iridescente. Tipografia condensada com `text-shadow` duplo. Elementos 3D em WebGL ou PNG pré-renderizado
(mais barato). Fundo escuro com brilho.

---

## 8. Frutiger Aero

**Sinais** · céu azul, água, grama verde · bolhas, peixes, raios de luz · painel de vidro translúcido
com botão "aqua" · tipografia humanista limpa (Frutiger, Myriad) · otimismo tecnológico de 2004-2013.

**Sósia** · Y2K (acima) e Aqua. Contra o Aqua: Frutiger Aero é uma **cena** (natureza + tecnologia);
Aqua é um **kit de controles**.

**Brief** · fotografia de natureza saturada como fundo. Painéis com `backdrop-filter` e borda de luz.
Botão com gradiente vertical brilhante e realce superior. Paleta: `#00a6e0`, `#7ed321`, branco.

---

## 9. Flat Design

**Sinais** · cor sólida sem sombra e sem gradiente · glifo simples de traço uniforme · hierarquia por
tamanho e peso, não por profundidade · silhueta geométrica limpa · ausência total de textura.

**Sósia** · Minimalism. Flat é sobre **ausência de profundidade**; minimalism é sobre **ausência de
elemento**. Um flat pode ser cheio de cor e de conteúdo.

**Brief** · paleta de 5-6 cores chapadas. Ícone de traço uniforme (2px). Zero `box-shadow`. Separação
por espaçamento e por bloco de cor. Cuidado: sem profundidade, a affordance de clique precisa vir de
cor e de rótulo.

---

## 10. Minimalism

**Sinais** · vazio dominante · poucos elementos, cada um justificado · uma cor de acento no máximo ·
tipografia carregando toda a hierarquia · alinhamento obsessivo.

**Sósia** · Flat Design (acima) e Editorial Minimalism (ver `AESTHETIC-FAMILIES.md`).

**Brief** · escala tipográfica de razão clara (1.25 ou 1.333). Espaçamento em múltiplos rígidos de
8px. Um acento. Regra prática: se remover o elemento não muda a compreensão, remova. O risco é a
página ficar genérica — compensar com uma decisão tipográfica forte ou um detalhe único.

---

## 11. Claymorphism

**Sinais** · forma 3D fofa com aparência de massa de modelar · raio de canto exagerado · sombra
interna clara + sombra externa suave e difusa · paleta pastel de alta luminosidade · volume sem
material reconhecível.

**Sósia** · Neumorphism. Claymorphism é **colorido, saliente e fofo**; neumorphism é **monocromático
e sutil**.

**Brief** · `border-radius: 32px+`. `box-shadow: inset 0 -8px 12px rgb(0 0 0 / .08), inset 0 8px 12px
rgb(255 255 255 / .6), 0 16px 32px rgb(0 0 0 / .12)`. Pastel com saturação média. Ilustração 3D
combina.

**Quando** · produto infantil, educação, app de bem-estar.

---

## 12. Vernacular Web

**Sinais** · GIF animado brilhante · fundo em tile · contador de visitas · tipografia de sistema em
cores berrantes · organização amadora e afetuosa.

**Sósia** · Web Brutalism. O vernacular **decora com entusiasmo**; o brutalism **recusa decorar**.

**Brief** · `background-repeat` com tile. `<marquee>` (ou equivalente CSS). GIF real. Bordas em
`ridge`/`outset`. Só funciona quando a ironia é o ponto e o público entende a referência.

---

## 13. Aqua

**Sinais** · botão azul translúcido com brilho de bala · superfície com listras finas (pinstripe) ·
realce superior pronunciado · barra de progresso listrada animada · cinza-azulado de sistema.

**Sósia** · Frutiger Aero (acima) e Windows Aero. O Aqua é **Apple 2001-2007** e vive em controles.

**Brief** · gradiente vertical `#5aa9f0 → #1e6fd0` com realce branco no topo em `::before`.
`border-radius` de pílula. Pinstripe via `repeating-linear-gradient` de 1px.

---

## 14. Windows Aero

**Sinais** · moldura de janela semitransparente com desfoque · varredura reflexiva diagonal no vidro
· borda de luz fria · ícone grande e brilhante · azul-vidro dominante.

**Sósia** · Glassmorphism. Aero é **cromo de janela** (moldura, barra de título); glassmorphism é
**card de conteúdo**.

**Brief** · `backdrop-filter: blur(20px)` + `background: linear-gradient(180deg, rgb(255 255 255 /
.35), rgb(255 255 255 / .12))` + varredura com gradiente diagonal em pseudo-elemento. Sombra externa
larga e fria.

---

## Escolha rápida por intenção

| Intenção | Candidatos |
|---|---|
| Confiança institucional | Minimalism, Flat Design |
| Ousadia de marca jovem | Neobrutalism, Y2K |
| Premium / Apple-adjacente | Liquid Glass, Glassmorphism, Aqua |
| Tátil e humano | Skeuomorphism, Claymorphism |
| Autoral / manifesto | Web Brutalism, Vernacular Web |
| Nostalgia específica | Frutiger Aero, Y2K, Aqua, Windows Aero |

## O que registrar no DESIGN.md

```markdown
## Overview

Estilo: Neobrutalism.
Sinais aplicados: contorno preto 3px, sombra dura deslocada 6px, paleta de 3 saturadas + preto.
Separado de: Web Brutalism — aqui a decoração é intencional e o layout é controlado.
Por que este: a marca precisa parecer confiante e não-corporativa para um público de 20-30 anos.
```

Quatro linhas. Sem elas, o segundo componente diverge do primeiro.
