# Fundamentos: SEO, AEO, GEO

## 1. As siglas, sem marketing

* **SEO** — ranquear numa lista de links azuis.
* **AEO** (Answer Engine Optimization) — ser **extraível** como resposta direta: featured snippet,
  assistente de voz, caixa de resposta.
* **GEO** (Generative Engine Optimization) — ser **citado** quando o modelo sintetiza a resposta.

Honestidade que a maioria do material comercial omite: na literatura acadêmica **não havia definição de
consenso** separando GEO de AEO até o início de 2026; na prática os termos são intercambiáveis. A
própria Wikipedia registra isso. Quem vende curso finge que a fronteira é nítida. Não é.

O que **é** consenso e importa operacionalmente: as camadas se compõem, não se substituem. Página que
já ranqueia tem probabilidade maior de ser citada. SEO forte é fundação do GEO, não alternativa.

## 2. Por que a mudança é estrutural, não de moda

O motor generativo não devolve lista. Ele decompõe a consulta em subconsultas, recupera chunks
candidatos de várias fontes, re-ranqueia e monta uma resposta única. O usuário lê a resposta e, com
frequência, não clica em nada.

Três consequências que reorganizam o trabalho:

1. **A unidade de competição virou a passagem.** Não o site, não a página — a seção.
2. **Aparecer sem clique passou a ter valor.** Menção e citação são o resultado, mesmo sem sessão no
   analytics.
3. **O crawler mudou de natureza.** O bot que alimenta a resposta não roda JavaScript e tem paciência
   diferente do Googlebot.

## 3. O modelo de quatro camadas

Cada camada é pré-requisito da seguinte. Pular uma não acelera — invalida as de cima.

### Camada 1 — Técnica (existir)
A página é rastreável, o conteúdo está no HTML da primeira resposta, o crawler certo tem permissão, e
a performance não expulsa ninguém. Ver `TECHNICAL-SEO.md` e `PERFORMANCE.md`.

Falha aqui = as outras três camadas são desperdício de trabalho.

### Camada 2 — Relevância clássica (ranquear)
Intenção de busca atendida, título e heading coerentes, arquitetura de link interna, entidade clara,
canonical correto. Continua valendo tudo que sempre valeu.

### Camada 3 — Extratibilidade (ser recortado)
A passagem responde no começo, cada seção cobre um conceito só, o heading está no formato da pergunta,
a lista e a tabela são de verdade (não parágrafo disfarçado). Ver `AEO-GEO.md`.

### Camada 4 — Citabilidade (ser escolhido como fonte)
Densidade factual, estatística com fonte, citação atribuída a especialista nomeado, autoria visível,
pesquisa primária, entidade consistente entre propriedades. Ver `AEO-GEO.md`.

## 4. O que a pesquisa sustenta — e o quanto

Do paper GEO de Princeton (9 táticas testadas em 10.000 consultas): otimização aumenta visibilidade
em LLM entre **30% e 40%**, com cinco táticas respondendo pela maior parte do ganho.

Efeitos isolados mais replicados:

| Tática | Efeito relatado |
|---|---|
| Citação direta atribuída (quote com aspas e autor) | **+37%** |
| Fato estatístico com número | **+22%** |
| Conteúdo nos primeiros 30% da página | **44,2%** das citações vêm daí |

O mecanismo por trás do quote: o modelo usa aspas e atribuição como proxy de credibilidade. O
mecanismo por trás da estatística: densidade factual sinaliza conteúdo de substância em vez de
paráfrase.

**Onde a evidência é contraditória:** dados estruturados. Ver `STRUCTURED-DATA.md` §1: há relato de
multiplicador de citação com schema stacking e há estudo da Ahrefs com 1.885 páginas (agosto de 2025
a março de 2026) mostrando nenhum uplift. Não recopie o multiplicador como fato vigente. A posição
desta lib: schema é higiene barata e obrigatória, não alavanca mágica. Não prometer multiplicador que
a evidência não sustenta.

## 5. Doutrina do Nirvana

Sete regras que valem para qualquer squad que publique algo.

1. **Conteúdo que precisa ser citado nasce no HTML do servidor.** SSR não é preferência de stack.
2. **Toda seção responde antes de explicar.** Answer-first é regra de redação, não de SEO — e melhora
   a conversão humana pelo mesmo motivo.
3. **Um conceito por seção.** Definição e passo-a-passo não dividem H2.
4. **Todo número tem fonte nomeada e data.** "Especialistas afirmam" é claim descartável, e o writing
   contract global já proíbe.
5. **Schema sempre, promessa nunca.** Implementar; não vender como multiplicador.
6. **Motion tem orçamento.** INP ≤ 200 ms manda em qualquer ambição de scroll cinético.
7. **Medir só o que dá para medir.** Três KPIs existem; o resto é estimativa disfarçada de número.
   Ver `MEASUREMENT.md`.

## 6. Contexto Brasil

Não cite share de AI Overviews nem taxa de schema no Brasil sem uma fonte nomeada e datada **desta
execução**. Snapshot antigo (Q1 2026 / auditoria 2026) em `references/state-of-the-art.md`.

Leitura estratégica: a fundação técnica ainda é terreno vazio no mercado local. Fazer o básico bem
feito (SSR, schema correto, answer-first, autoria visível) coloca um cliente brasileiro à frente da
maioria dos concorrentes por um custo que é fração do que se gasta em mídia.

Nuances de conteúdo em PT-BR:

- Heading em pergunta usa a forma como a pessoa fala, não a forma como a empresa escreve
  ("quanto custa" vence "investimento necessário").
* Termo em inglês consagrado no mercado brasileiro deve aparecer junto do equivalente em português na
  primeira ocorrência — a consulta chega das duas formas.
- Autoria com nome completo, credencial e link para perfil profissional. E-E-A-T é lido em qualquer
  idioma; nome de fantasia da agência não é autor.
- Preço, prazo e cobertura geográfica explícitos e em texto — não em imagem. É o que a resposta
  gerada recorta.

[//]: # (bN6BGWNtflflo2omNGrXr3)
