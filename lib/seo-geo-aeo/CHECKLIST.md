# Checklist de visibilidade em busca — o gate

Auditoria binária. Cada item é PASS, FAIL ou N/A. Não existe "parcial". Itens marcados **[BLOQUEIO]**
reprovam a entrega sozinhos.

O auditor executável verifica automaticamente os itens marcados com `⚙`. O resto é verificação
humana ou de agente com acesso à página no ar.

```bash
bun scripts/audit-search-visibility.ts <arquivo.html | diretório | url>
bun scripts/audit-search-visibility.ts dist/ --json
```

---

## T · Técnico

| # | Item | Auto |
|---|---|---|
| T1 | **[BLOQUEIO]** O conteúdo principal está no HTML da primeira resposta do servidor, sem depender de JS | ⚙ |
| T2 | `<title>` único, 30-65 caracteres, termo principal no início | ⚙ |
| T3 | `<meta name="description">` de 100-170 caracteres | ⚙ |
| T4 | Exatamente um `<h1>`, coerente com o title | ⚙ |
| T5 | `<html lang>` declarado e correto | ⚙ |
| T6 | `<link rel="canonical">` presente e absoluta | ⚙ |
| T7 | **[BLOQUEIO]** Nenhum `noindex` em meta nem em `X-Robots-Tag` numa página que deve ranquear | ⚙ |
| T8 | `og:title`, `og:description`, `og:image`, `og:url` presentes; imagem 1200×630 | ⚙ |
| T9 | `<meta name="viewport">` presente | ⚙ |
| T10 | `robots.txt` existe, retorna 200 e aponta o sitemap | ⚙ |
| T11 | **[BLOQUEIO]** Política de crawler de IA decidida **com** o cliente e refletida no `robots.txt` | ⚙ |
| T12 | `sitemap.xml` só com URL canônica, 200 e indexável | ⚙ |
| T13 | `llms.txt` publicado conforme spec (H1 + blockquote + listas H2) | ⚙ |
| T14 | Sem cadeia de redirect com mais de 1 salto na URL de entrada | |
| T15 | `hreflang` recíproco quando multi-idioma, com `x-default` | ⚙ |

## S · Dados estruturados

| # | Item | Auto |
|---|---|---|
| S1 | JSON-LD presente no `<head>`, renderizado no servidor | ⚙ |
| S2 | O JSON parseia sem erro | ⚙ |
| S3 | Grafo base presente: `Organization` + `WebSite` + `WebPage` | ⚙ |
| S4 | Nós ligados por `@id` absoluto e estável | ⚙ |
| S5 | **[BLOQUEIO]** Paridade: todo item do schema está visível na página (FAQ, HowTo, preço, avaliação) | ⚙ |
| S6 | Datas em ISO 8601 com fuso | ⚙ |
| S7 | `author` como `Person` com `sameAs`, quando há autoria | ⚙ |
| S8 | Validado em Rich Results Test **e** Schema Markup Validator | |
| S9 | Nenhum `aggregateRating` sem avaliação real e exibida | |

## A · Extratibilidade (AEO)

| # | Item | Auto |
|---|---|---|
| A1 | Pelo menos 3 seções `<h2>` | ⚙ |
| A2 | Ao menos metade dos `<h2>` no formato de pergunta do usuário | ⚙ |
| A3 | **[BLOQUEIO]** Toda seção responde nas primeiras 1-2 frases (answer-first) | ⚙ |
| A4 | Um conceito por seção; nenhuma seção mistura definição com passo-a-passo | |
| A5 | Listas e tabelas são reais (`<ul>`, `<ol>`, `<table>`), não parágrafo disfarçado | ⚙ |
| A6 | Parágrafo com 2-4 frases; nenhum bloco com mais de ~120 palavras | ⚙ |
| A7 | Bloco de resposta direta com número acima da dobra | |
| A8 | Preço, prazo e cobertura em texto — nunca só em imagem | |

## G · Citabilidade (GEO)

| # | Item | Auto |
|---|---|---|
| G1 | Densidade factual: ao menos 1 fato verificável (número + fonte) por seção | ⚙ |
| G2 | Nenhum número sem fonte nomeada e data | |
| G3 | 1-2 citações atribuídas a especialista nomeado, com data | ⚙ |
| G4 | Autoria visível: nome completo, credencial, link para perfil | ⚙ |
| G5 | Data de publicação e de atualização visíveis | ⚙ |
| G6 | Links de saída para fonte primária | ⚙ |
| G7 | Entidade consistente entre site, perfis e schema (`sameAs`) | ⚙ |
| G8 | Nenhuma atribuição vaga do tipo "especialistas afirmam" | ⚙ |

## P · Performance

| # | Item | Auto |
|---|---|---|
| P1 | **[BLOQUEIO]** Orçamento de performance declarado por escrito | |
| P2 | Toda imagem, vídeo e iframe com dimensão ou `aspect-ratio` | ⚙ |
| P3 | Imagem do LCP sem `loading="lazy"`, com `fetchpriority="high"` | ⚙ |
| P4 | Fonte com `font-display: swap` e preload do peso do hero | ⚙ |
| P5 | Nenhum script bloqueante no `<head>` sem `defer`/`async` | ⚙ |
| P6 | Terceiros (chat, pixel, mapa) carregam depois da interação | |
| P7 | Motion via CSS nativo onde possível; biblioteca justificada no orçamento | |
| P8 | Campo (CrUX): limiares "good" vigentes em https://web.dev/articles/vitals | |

## X · Acessibilidade (interseção obrigatória)

| # | Item | Auto |
|---|---|---|
| X1 | **[BLOQUEIO]** Contraste WCAG 2.2 AA em light e dark | |
| X2 | Toda imagem informativa com `alt` significativo; decorativa com `alt=""` | ⚙ |
| X3 | Hierarquia de heading sem salto de nível | ⚙ |
| X4 | Todo controle operável por teclado com foco visível | |
| X5 | Landmark (`header`, `nav`, `main`, `footer`) presentes | ⚙ |
| X6 | `prefers-reduced-motion` respeitado | ⚙ |

A11y entra neste checklist porque desde **28 de junho de 2025** o European Accessibility Act
(Diretiva (UE) 2019/882) está em vigor. Confirme se continua em vigor. Para quem vende a consumidor
da UE, WCAG 2.1 AA é o piso legal clássico; resolva a versão vigente da EN 301 549 na ETSI nesta
execução (não retenha um número de rascunho "esperado para 2026"). O gate do Nirvana já é WCAG 2.2 AA.

---

## Veredito

```
Bloqueios:   T1 · T7 · T11 · S5 · A3 · P1 · X1
Regra:       qualquer BLOQUEIO em FAIL  →  entrega REPROVADA
Score:       (PASS / (PASS + FAIL)) × 100, excluindo N/A

≥ 90  EXEMPLAR      pronto para entregar e para defender em auditoria
75-89 SOLID         entregável, com correções listadas
60-74 WEAK          não entregar sem corrigir
< 60  FAIL          refazer a camada técnica antes de qualquer coisa
```

## Formato do laudo

```
VISIBILIDADE EM BUSCA — <artefato> — <data>

Bloqueios:  T1 PASS · T7 PASS · T11 FAIL · S5 PASS · A3 FAIL · P1 PASS · X1 PASS
Score:      71/100 (WEAK)

Correções obrigatórias:
1. T11 — robots.txt não declara política para crawler de IA. Nenhum dos 7 user-agents
   aparece. Aplicar o bloco de TECHNICAL-SEO.md §2 depois de confirmar a postura com o cliente.
2. A3 — 4 de 7 seções abrem com contexto em vez de resposta.
   `index.html:212` ("No mercado atual, cada vez mais empresas…") → começar com
   "Uma landing page de alta conversão custa [faixa com fonte e data desta execução]."

Recomendações (não bloqueiam):
3. A2 — só 2 de 7 h2 estão em forma de pergunta. Reescrever "Nossa metodologia" para
   "Como funciona o processo, passo a passo".
```

Laudo sem número de linha e sem a correção escrita não é laudo. É opinião.
