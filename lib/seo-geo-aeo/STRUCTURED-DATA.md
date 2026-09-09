# Dados estruturados — JSON-LD

## 1. O que a evidência sustenta, e o que não

A literatura sobre schema e citação em IA se contradiz. Registrar os dois lados é obrigatório antes de prometer qualquer
coisa a cliente.

**A favor.** O padrão de *triple-schema stacking* (`FAQPage` + `Article` + `HowTo` no mesmo `@graph`
JSON-LD, ligados por referência de entidade compartilhada) foi relatado com multiplicador de citação.
Não recopie o multiplicador como fato vigente: resolva a fonte nomeada nesta execução se for citar o
número. Snapshot antigo em `references/state-of-the-art.md`.

**Contra.** Estudo da Ahrefs acompanhou **1.885 páginas** que adicionaram JSON-LD entre agosto de
2025 e março de 2026: **nenhum uplift significativo de citação em nenhuma plataforma**. Esse intervalo
é o do estudo, não um "até hoje".

**Posição desta lib.** Schema é a camada de identidade legível por máquina. É barato, ajuda o motor a
identificar corretamente a entidade, habilita rich result no Google (esse efeito é bem documentado e
independente da discussão de GEO), e não tem downside. Portanto: **implementar sempre, prometer
nada.** Vender schema como multiplicador de citação é vender o que a evidência não sustenta.

## 2. Regras técnicas que valem sempre

- **JSON-LD, no `<head>`.** É o formato que o Google recomenda explicitamente e o que todo crawler de
  IA parseia com mais confiabilidade. Microdata e RDFa são legado.
- **Um `@graph` por página**, com os nós ligados por `@id`, em vez de vários blocos `<script>` soltos
  e desconexos.
- **`@id` estável e absoluto** — `https://exemplo.com/#organization`. É o que permite ligar nós entre
  páginas e construir a entidade.
- **Validar em dois lugares**: Rich Results Test **e** Schema Markup Validator. Pegam classes
  diferentes de erro; passar em um não garante o outro.
- **Renderizado no servidor.** Schema injetado por JavaScript volta ao problema do
  `TECHNICAL-SEO.md` §1.

## 3. O grafo base — toda página do cliente

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://exemplo.com/#organization",
      "name": "Nome da Empresa",
      "url": "https://exemplo.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://exemplo.com/logo.png",
        "width": 512,
        "height": 512
      },
      "sameAs": [
        "https://www.linkedin.com/company/…",
        "https://www.instagram.com/…"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "telephone": "+55-11-0000-0000",
        "areaServed": "BR",
        "availableLanguage": ["pt-BR", "en"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://exemplo.com/#website",
      "url": "https://exemplo.com/",
      "name": "Nome da Empresa",
      "publisher": { "@id": "https://exemplo.com/#organization" },
      "inLanguage": "pt-BR"
    },
    {
      "@type": "WebPage",
      "@id": "https://exemplo.com/pagina#webpage",
      "url": "https://exemplo.com/pagina",
      "name": "<title da página>",
      "isPartOf": { "@id": "https://exemplo.com/#website" },
      "about": { "@id": "https://exemplo.com/#organization" },
      "datePublished": "<ISO-8601 publication date of this page>",
      "dateModified": "<ISO-8601 last-updated date of this page>",
      "inLanguage": "pt-BR"
    }
  ]
}
```

`Organization` + `WebSite` + `WebPage` é o piso. Sem isso, a entidade não existe para o motor.

## 4. Paridade — a regra que mais é violada

**Todo item declarado no schema precisa estar visível na página.**

Se o `FAQPage` lista cinco perguntas e só três aparecem no HTML renderizado, isso **viola a diretriz
de qualidade de dados estruturados do Google**. O risco não é só perder o rich result — é ação manual.

Checar sempre:
- pergunta e resposta do `FAQPage` existem no corpo da página, com o mesmo texto
- passo do `HowTo` existe como conteúdo visível
- `aggregateRating` vem de avaliação real e verificável, exibida na página
- `price` do `Offer` bate com o preço mostrado
- `author` do `Article` é a mesma pessoa assinada visivelmente

O auditor da lib checa paridade de FAQ automaticamente.

## 5. Escolha por tipo de página

| Tipo de página | Tipos a empilhar no `@graph` |
|---|---|
| Landing page de serviço | `Organization`, `WebSite`, `WebPage`, `Service`, `Offer`, `FAQPage`, `BreadcrumbList` |
| Landing page de produto | + `Product`, `Offer`, `AggregateRating` (só se real) |
| Artigo / blog | + `Article` (ou `BlogPosting`), `Person` como `author`, `FAQPage` quando houver |
| Tutorial / passo a passo | + `HowTo` com `HowToStep` |
| Página de preço | + `Offer` / `AggregateOffer`, `PriceSpecification` |
| Negócio local | + `LocalBusiness` com `address`, `geo`, `openingHoursSpecification` |
| Evento | + `Event` com `location`, `startDate`, `offers` |
| Perfil / autor | + `Person` com `jobTitle`, `worksFor`, `sameAs`, `knowsAbout` |
| Vídeo incorporado | + `VideoObject` com `thumbnailUrl`, `uploadDate`, `duration` |
| FAQ dedicada | + `FAQPage` (uma por página; não repetir o mesmo Q&A em várias) |

## 6. O bloco de FAQ — o mais rentável e o mais mal feito

```json
{
  "@type": "FAQPage",
  "@id": "https://exemplo.com/pagina#faq",
  "isPartOf": { "@id": "https://exemplo.com/pagina#webpage" },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quanto custa uma landing page de alta conversão?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Sourced price range in the brief's currency, with date, resolved this run.]"
      }
    }
  ]
}
```

Regras:
- a pergunta usa a forma coloquial da consulta (ver `AEO-GEO.md` §1.4)
- a resposta começa respondendo, com número quando existir
- o mesmo par pergunta/resposta aparece **visível** na página
- 4 a 8 perguntas. Trinta perguntas diluem e cheiram a manipulação

## 7. Artigo com autoria

```json
{
  "@type": "Article",
  "@id": "https://exemplo.com/artigo#article",
  "headline": "<até 110 caracteres>",
  "datePublished": "<ISO-8601 publication datetime of this article>",
  "dateModified": "<ISO-8601 last-updated datetime of this article>",
  "author": {
    "@type": "Person",
    "@id": "https://exemplo.com/autores/nome#person",
    "name": "Nome Completo",
    "jobTitle": "<cargo>",
    "worksFor": { "@id": "https://exemplo.com/#organization" },
    "sameAs": ["https://www.linkedin.com/in/…"],
    "knowsAbout": ["<tema 1>", "<tema 2>"]
  },
  "publisher": { "@id": "https://exemplo.com/#organization" },
  "isPartOf": { "@id": "https://exemplo.com/artigo#webpage" },
  "inLanguage": "pt-BR"
}
```

`author` como `Person` com `sameAs` e `knowsAbout` é o que constrói o sinal de expertise. `author`
como string com o nome da agência não constrói nada.

## 8. Erros que reprovam a auditoria

| Erro | Consequência |
|---|---|
| Schema injetado por JS | invisível para 69% dos crawlers de IA |
| Múltiplos blocos desconexos sem `@id` | entidade fragmentada; o motor não liga os nós |
| `FAQPage` sem paridade com a página | violação de diretriz do Google |
| `aggregateRating` inventado | violação grave; risco de ação manual |
| `@id` relativo ou instável | quebra a ligação entre páginas |
| Data em formato errado | ignorado; usar ISO 8601 com fuso |
| `Organization` diferente entre páginas | entidade não consolida |
| `Product` sem `offers` | rich result não aparece |
