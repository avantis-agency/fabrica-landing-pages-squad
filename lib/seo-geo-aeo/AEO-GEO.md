# AEO e GEO — ser recortado e ser citado

Duas camadas com o mesmo insumo (o texto) e critérios diferentes. **AEO** decide se a passagem é
extraível. **GEO** decide se a fonte é escolhida. Escrever para uma sem a outra deixa metade do
resultado na mesa.

---

## Parte 1 — AEO: a competição é por chunk

### 1.1 O mecanismo

A consulta do usuário é decomposta em subconsultas. Cada subconsulta recupera chunks candidatos de
várias fontes. Os chunks são re-ranqueados e montados numa resposta única.

**O motor recupera e cita no nível da passagem, não da página.** Uma seção H2 é a unidade de
competição — não o artigo, não o domínio.

Isso muda a redação de forma concreta: uma página excelente com a resposta enterrada no parágrafo
onze perde para uma página medíocre que responde no primeiro parágrafo da seção certa.

### 1.2 Answer-first — o fator número um

O fator que mais consistentemente separa conteúdo citado de conteúdo ignorado é **se a resposta
aparece no começo da passagem ou no fim**.

Estrutura de um bloco citável:

```markdown
## Quanto custa uma landing page de alta conversão?

Uma landing page de alta conversão custa [faixa na moeda do brief, com fonte e data resolvidas nesta execução],
dependendo de copy dedicada, design system próprio e integração de captura de lead.

<segue a explicação, a variação por escopo, os exemplos e as ressalvas>
```

As duas primeiras frases são um chunk perfeito: respondem, trazem número, delimitam escopo e local.
Um modelo consegue recortar isso e citar sem precisar de mais nada. Não embarque uma faixa de preço
de mercado congelada. Snapshot antigo só em `references/state-of-the-art.md`.

Anti-padrão comum em landing page: começar a seção com contexto ("No mercado atual, cada vez mais
empresas percebem que...") e só entregar a resposta no fim. Isso reprova em AEO **e** em conversão
humana — pelo mesmo motivo.

### 1.3 Chunking semântico

Cada seção cobre exatamente **um** conceito.

| Errado | Certo |
|---|---|
| Um H2 com definição + passo-a-passo + preço | Três H2: "O que é X", "Como fazer X", "Quanto custa X" |
| Estatística enterrada dentro de narrativa longa | Estatística em frase própria, com fonte e data |
| FAQ de 15 perguntas num bloco de texto corrido | Cada pergunta como heading próprio |

Regra prática: se a seção precisa de "além disso" ou "outro ponto importante", ela tem dois conceitos
e quer virar duas seções.

### 1.4 Heading no formato da pergunta

O heading é a chave de recuperação. Escrever como a pessoa pergunta, não como a empresa fala.

| Heading corporativo | Heading recuperável |
|---|---|
| "Nossa metodologia" | "Como funciona o processo, passo a passo" |
| "Investimento" | "Quanto custa e o que está incluído" |
| "Diferenciais" | "Por que escolher X em vez de Y" |
| "Soluções" | "Que problema isso resolve" |

Em PT-BR, usar a forma coloquial da consulta. "Quanto custa" ganha de "investimento necessário".

### 1.5 Formatos que o motor recorta bem

- **Tabela de verdade** (`<table>`, não grid de divs) para comparação, preço e especificação.
- **Lista real** (`<ul>`/`<ol>`) para etapa, requisito e critério. Lista fingida com parágrafo e
  travessão não é lista.
- **Definição curta** logo abaixo do heading.
- **Negrito estratégico** no termo-chave da frase — não em frase inteira.
- **Parágrafo curto**: 2-4 frases. Bloco de 12 linhas não vira chunk, vira ruído.

### 1.6 Posição importa

**44,2% das citações de LLM vêm dos primeiros 30% do conteúdo.** A introdução é o investimento de
maior alavancagem da página inteira.

Consequência para landing page: o hero e a primeira seção carregam não só a conversão como a
citabilidade. Um bloco de resposta direta acima da dobra, com número, serve aos dois públicos.

---

## Parte 2 — GEO: ser escolhido como fonte

### 2.1 O que a pesquisa mediu

Paper GEO de Princeton: 9 táticas testadas em 10.000 consultas; otimização aumenta visibilidade em
LLM entre **30% e 40%**.

| Tática | Efeito | Mecanismo |
|---|---|---|
| Citação direta atribuída | **+37%** | o modelo usa aspas e atribuição como proxy de credibilidade |
| Fato estatístico com número | **+22%** | densidade factual sinaliza substância, não paráfrase |

### 2.2 Densidade factual

A alavanca mais forte, e a mais fácil de auditar: **quantos fatos verificáveis por 100 palavras?**

Um fato verificável tem número, data ou nome próprio, e uma fonte rastreável. "Aumentamos muito a
conversão dos clientes" não é fato. "A conversão saiu de 1,8% para 4,3% em 90 dias no e-commerce X"
é fato.

Meta operacional para página comercial: pelo menos **um fato verificável por seção**, e nenhum
número sem fonte e data.

### 2.3 Citação de especialista

Uma a duas citações por página principal, de especialista **nomeado** na categoria.

```markdown
> "Sem renderização no servidor, o conteúdo simplesmente não existe para o crawler de IA."
> — <Nome>, <cargo>, <organização>, <data>
```

Citação de fonte externa pesa mais que citação do próprio time. As duas funcionam; a externa funciona
melhor. Inventar citação é fraude e quebra o writing contract global — se não existe fonte real,
corta o bloco.

### 2.4 Pesquisa primária

Survey, benchmark, dataset de primeira mão. É o ativo mais citável que existe, porque não há
alternativa a citar você.

Para cliente de serviço, a versão barata e real: agregar dado próprio de operação. "Em N landing
pages entregues entre [data inicial] e [data final], a mediana de LCP na entrega foi X s." Isso é pesquisa primária, é
verificável internamente, e ninguém mais tem o número. Não invente N nem X.

### 2.5 Autoria e E-E-A-T

- Nome completo do autor, com credencial e link para perfil profissional.
- Data de publicação **e** de atualização, visíveis e no schema.
- Página "Sobre" com equipe, endereço físico e formas de contato reais.
- Consistência de entidade entre site, LinkedIn, registro comercial e perfis — mesmo nome, mesmo
  endereço, mesma descrição.

Nome de fantasia da agência não é autor. Post assinado por "Equipe" perde o sinal inteiro.

### 2.6 Entidade

O motor precisa entender **quem** você é antes de decidir se cita. Isso se constrói com:

- `Organization` no JSON-LD com `sameAs` apontando para os perfis oficiais (ver `STRUCTURED-DATA.md`)
- descrição idêntica nas propriedades principais
- menção em fontes de terceiros que o motor já confia

Marca sem entidade resolvida é citada como "um site" ou não é citada.

### 2.7 Seção de referências

Página comercial também pode ter. Listar as fontes primárias usadas, com link e data. Sinaliza que o
conteúdo se apoia em material autoritativo — e o modelo lê isso.

---

## Parte 3 — o bloco padrão do Nirvana

Estrutura que serve conversão humana, extração por chunk e citabilidade ao mesmo tempo. É o que os
squads de landing page devem produzir por seção.

```markdown
## <Pergunta na forma como o usuário faz>

<Resposta direta em 1-2 frases, com número quando existir.>

<Parágrafo de 2-4 frases explicando o porquê, com um fato verificável e sua fonte.>

- <item extraível>
- <item extraível>
- <item extraível>

<Quando couber: tabela de comparação ou preço.>

<Quando couber: uma citação atribuída a especialista nomeado, com data.>
```

Cinco elementos, na ordem. Uma seção que segue isso é simultaneamente um chunk citável e um bloco de
copy que converte, porque as duas coisas premiam a mesma virtude: responder antes de discursar.

## Parte 4 — anti-padrões

| Anti-padrão | Por que falha |
|---|---|
| Contexto antes da resposta | o chunk recuperado não contém a resposta |
| "Especialistas afirmam" | claim sem fonte é descartável, e o writing contract global proíbe |
| Número sem data | o modelo não sabe se ainda vale |
| FAQ no schema que não existe na página | viola a diretriz de qualidade do Google; ver `STRUCTURED-DATA.md` §4 |
| Muro de texto de 15 linhas | não vira chunk |
| Heading corporativo | não casa com nenhuma consulta real |
| Conteúdo só na imagem | crawler não lê preço dentro de PNG |
| Depoimento genérico sem nome e resultado | não é fato, não é citável, e não converte |
