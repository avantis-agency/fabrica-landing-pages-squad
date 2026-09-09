# Medição — o que existe e o que é estimativa disfarçada

## 1. Os três KPIs de GEO que existem

| KPI | Definição | Como medir |
|---|---|---|
| **Mention rate** | com que frequência a marca é mencionada na resposta, com ou sem link | rodar um conjunto fixo de prompts periodicamente e contar |
| **Citation rate** | com que frequência a marca é citada **com link** | mesmo conjunto, contando citação com URL |
| **Position when cited** | em que posição da resposta a citação aparece | mesmo conjunto, registrando ordem |

Método honesto para medir os três: um **prompt set fixo** de 30 a 60 consultas reais do cliente,
rodado no mesmo dia da semana, nas plataformas que importam (ChatGPT, Perplexity, Google AI
Overviews, Claude), com o resultado registrado. É amostragem, e precisa ser declarado como
amostragem.

## 2. Tráfego referido — o que dá para ver no analytics

Referrers a isolar:

```
chatgpt.com · chat.openai.com · perplexity.ai · claude.ai · copilot.microsoft.com
gemini.google.com · you.com · phind.com
```

Configurar como canal próprio no GA4 ou equivalente. Volume costuma ser baixo e qualidade alta — a
pessoa chega já informada e mais perto da decisão. Reportar as duas coisas juntas; reportar só o
volume subestima o canal.

Google AI Overviews **não** manda referrer distinto — o tráfego vem como orgânico. Não dá para separar
com honestidade.

## 3. Sinais de indexação e rastreio

- **Search Console**: impressão, clique, posição média, cobertura, Core Web Vitals de campo.
- **Log do servidor**: os únicos dados de verdade sobre crawler de IA. Filtrar por user-agent
  (`GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `Claude-SearchBot`, `PerplexityBot`) e ver frequência,
  profundidade e status de resposta.

Log de servidor responde a pergunta que nenhuma ferramenta responde: *o crawler de busca por IA está
mesmo vindo, e o que ele está pegando?*

## 4. O que NÃO dá para medir com honestidade

Listar isto para o cliente é o que separa consultoria de venda de fumaça.

| Alegação comum | Por que não se sustenta |
|---|---|
| "Volume de busca por prompt" | não existe base pública de volume de prompt; qualquer número é modelado |
| "Share of voice em resposta generativa" | depende de amostra de prompts; muda com a redação da consulta e com a sessão |
| "Atribuição de conversão de citação sem clique" | não há identificador; a pessoa pode converter direto ou por busca de marca dias depois |
| "Ranking em IA" | não existe ranking estável; a resposta varia por usuário, sessão, região e versão do modelo |
| "Garantimos citação no ChatGPT" | ninguém controla a saída de um modelo de terceiro |

O que dá para prometer com honestidade: **elevar a probabilidade** por meio dos fatores que a
pesquisa correlaciona com citação, e **medir o efeito** com o prompt set fixo ao longo do tempo.

## 5. Relatório padrão

```markdown
# Visibilidade em busca — <cliente> — <período>

## Fundação técnica
Score do auditor: <n>/100   (anterior: <n>)
Bloqueios abertos: <lista ou "nenhum">

## Busca clássica
Impressões · Cliques · Posição média · Páginas indexadas   (fonte: Search Console)

## Busca por IA
Prompt set: <n> consultas, rodado em <data>, nas plataformas <lista>
Mention rate: <n>%   (anterior: <n>%)
Citation rate: <n>%  (anterior: <n>%)
Posição média quando citado: <n>

Tráfego referido de assistentes: <sessões>, <taxa de conversão>
Rastreio por crawler de IA (log): <fetches por bot, período>

## Core Web Vitals (campo, p75)
LCP <n>s · INP <n>ms · CLS <n>

## O que mudou no período
<ações executadas>

## O que não dá para afirmar
<lista explícita das perguntas que este relatório não responde>
```

A última seção não é humildade decorativa. É o que impede o cliente de tomar decisão com base num
número que ninguém mediu.
