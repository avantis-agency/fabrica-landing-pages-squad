# Performance — o orçamento que limita a ambição

## 1. Os limiares "good"

Medidos no **percentil 75 de usuário real** via CrUX. Não é o que o Lighthouse mostra na sua máquina.
Confirme os números vigentes em https://web.dev/articles/vitals nesta execução. Snapshot em
`references/state-of-the-art.md`.

| Métrica | Bom | Precisa melhorar | Ruim | O que mede |
|---|---|---|---|---|
| **LCP** | ≤ 2,5 s | 2,5-4,0 s | > 4,0 s | velocidade de carregamento |
| **INP** | ≤ 200 ms | 200-500 ms | > 500 ms | responsividade |
| **CLS** | ≤ 0,1 | 0,1-0,25 | > 0,25 | estabilidade visual |

**INP substituiu FID em março de 2024.** A diferença importa: FID media só o atraso antes de processar
a primeira interação; INP mede a latência completa de **todas** as interações do ciclo de vida da
página, do input até a próxima pintura.

Não cite uma taxa de reprovação de INP sem resolvê-la nesta execução (CrUX / HTTP Archive). Snapshot
antigo em `references/state-of-the-art.md`.

## 2. Peso real no ranking — sem exagero

Relevância de conteúdo continua acima. Core Web Vitals funcionam como **critério de desempate** entre
páginas de qualidade semelhante, com vantagem mensurável em nicho competitivo. São sinal confirmado
de page experience, alimentado por CrUX.

Não prometer ao cliente que performance sozinha resolve ranking. Prometer o que é verdade:
performance é requisito de conversão e desempate de ranking, e o efeito em conversão é o argumento
mais forte.

## 3. A tensão central deste orçamento

As tendências que as galerias premiam no ciclo vigente (pesquise com data) — scroll cinético, tipografia variável mapeada ao
scroll, WebGL, scrub de frame-sequence — são exatamente o que destrói INP e LCP.

Isso não é motivo para abandonar craft. É motivo para **declarar o orçamento antes de escolher a
técnica**, e para preferir a implementação barata do mesmo efeito.

### Regra de substituição

| Em vez de | Use | Ganho |
|---|---|---|
| Biblioteca de scroll (Lenis, Locomotive) | `animation-timeline: scroll()` / `view()` nativo | sem JS na thread principal, sem dependência |
| Animação em JS por frame | `@keyframes` CSS + `transform`/`opacity` | roda no compositor |
| Vídeo de fundo autoplay | poster estático + vídeo sob demanda, ou gradiente animado em CSS | LCP cai muito |
| Frame-sequence scrubbed pesada | sequência menor + `content-visibility` + decodificação assíncrona | evita travar a thread |
| Fonte web em 6 pesos | fonte variável em 1 arquivo, `font-display: swap`, `preload` do peso do hero | menos requests, menos CLS |
| `backdrop-filter` em muitos elementos | limitar a 2-3 superfícies simultâneas | GPU aguenta |
| Ícone em componente React por item de lista | sprite SVG ou CSS mask | menos nós, menos hidratação |

### Regras de INP específicas

* Nada de trabalho pesado em handler de `click`/`input`. Quebrar com `scheduler.yield()` ou
  `requestIdleCallback`.
- Evitar hidratação de página inteira. Ilha de interação, não app inteiro.
- Listener de `scroll` e `resize` sempre com `passive: true` e coalescido.
- `will-change` só onde há animação real, e removido depois.
- Terceiros (chat, pixel, mapa) carregam depois da interação ou no `requestIdleCallback` — são a
  causa mais comum de INP ruim em landing page.

### Regras de LCP

* O elemento LCP é quase sempre a imagem ou o título do hero. Identificá-lo explicitamente.
- Imagem do hero: `fetchpriority="high"`, sem `loading="lazy"`, dimensões explícitas, formato moderno
  (AVIF/WebP), servida no tamanho renderizado.
- `preconnect` para a origem de fonte e de imagem.
- CSS crítico inline; o resto adiado.
- Sem redirect na URL de entrada.

### Regras de CLS

- `width`/`height` ou `aspect-ratio` em toda imagem, vídeo, iframe e embed.
- Espaço reservado para banner de consentimento, barra de anúncio e conteúdo assíncrono.
- `font-display: swap` com `size-adjust` para reduzir o salto na troca de fonte.
- Nada de injetar elemento acima do conteúdo já pintado.

## 4. Orçamento declarado — o artefato

Todo squad que entrega página declara isto no DESIGN.md ou no relatório de entrega:

```markdown
## Orçamento de performance

Alvos (p75, CrUX):  limiares "good" vigentes em https://web.dev/articles/vitals (snapshot em references/state-of-the-art.md)
Elemento LCP:       <qual é, e por que>
Peso da página:     <KB de HTML+CSS+JS crítico>
JS na thread:       <KB, e o que é>
Motion:             <técnica escolhida, e por que ela cabe no orçamento>
Terceiros:          <quais, quando carregam>
Trade-off aceito:   <o que foi sacrificado de craft, e a decisão de quem>
```

A linha de trade-off é a mais importante. Ela transforma "o site ficou lento" numa decisão registrada
em vez de numa surpresa.

## 5. Como medir de verdade

- **Campo (o que conta):** CrUX, PageSpeed Insights (aba de dados de campo), Search Console.
  Precisa de tráfego real e leva 28 dias para consolidar.
- **Laboratório (o que dá para iterar):** Lighthouse, WebPageTest, DevTools. Rodar com CPU throttling
  4× e rede 4G lenta — o desktop do desenvolvedor mente.
- **INP em produção:** biblioteca `web-vitals` reportando ao analytics. É a única forma de pegar a
  interação real que trava.

Aviso honesto ao cliente: score 100 no Lighthouse não garante aprovação no CrUX. São medições
diferentes — laboratório sintético contra usuário real com dispositivo real.

## 6. Interação com a camada de busca por IA

Performance ruim atrapalha SEO clássico e conversão, mas **não** é o que decide citação em motor
generativo. O que decide lá é o HTML do servidor conter o conteúdo (ver `TECHNICAL-SEO.md` §1).

Ou seja: um site pesado mas com SSR correto pode ser citado. Um site leve mas client-side renderizado
não pode. As duas coisas importam por razões diferentes — não confundir os argumentos ao vender.
