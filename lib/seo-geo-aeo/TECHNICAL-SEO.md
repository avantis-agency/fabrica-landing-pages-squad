# Camada técnica — existir para o crawler

## 1. A regra que decide tudo: crawler de IA não roda JavaScript

**Evidência.** Vercel e MERJ rastrearam mais de 500 milhões de fetches do GPTBot e não encontraram
**nenhuma** evidência de execução de JavaScript. Releia esse estudo ou os docs de crawler do
fornecedor nesta execução antes de afirmar o comportamento atual. Snapshot em
`references/state-of-the-art.md`. O mesmo padrão tem sido relatado para ClaudeBot, PerplexityBot,
ExternalAgent da Meta e Bytespider.

**Consequência.** Um site React, Vue ou Angular com client-side rendering pode ranquear no Google
(que renderiza, com atraso) e ser **invisível** no ChatGPT, no Claude e no Perplexity. Fica invisível:

- todo componente renderizado no cliente
- toda descrição de produto carregada por chamada de API
- todo FAQ injetado dinamicamente
- toda tabela comparativa montada pelo framework no browser

**Regra do Nirvana:** conteúdo que precisa ser citado nasce no HTML da primeira resposta do servidor.

### Como garantir, por stack

| Stack | O que fazer |
|---|---|
| Next.js App Router | Server Components por padrão. `"use client"` só em ilha de interação. Conteúdo textual nunca dentro de client component que busca dado. |
| Next.js Pages | `getStaticProps` / `getServerSideProps`. Nada de `useEffect` + `fetch` para conteúdo indexável. |
| Nuxt | SSR ou `nuxt generate`. |
| Astro | Já é o comportamento padrão. `client:*` só onde precisa. |
| HTML estático / single-file | Já resolvido. É a razão de o formato ainda vencer em landing page. |
| SPA legado sem migração | Pré-renderização estática das rotas indexáveis na build. |

### Como verificar sem confiar em promessa

```bash
# O conteúdo está no HTML cru? Se não aparece aqui, não existe para o crawler de IA.
curl -sL https://exemplo.com/ | grep -c "frase exata do parágrafo principal"

# Simulando um crawler de busca por IA
curl -sL -A "OAI-SearchBot" https://exemplo.com/ | wc -c

# Comparar HTML cru com DOM renderizado — divergência grande = conteúdo preso no cliente
```

O auditor da lib (`scripts/audit-search-visibility.ts`) faz essa checagem.

---

## 2. Matriz de crawlers de IA

Confirme os user-agents nos docs de robots de cada fornecedor nesta execução. Snapshot da lista que
o auditor desta lib checa: `references/state-of-the-art.md`. As duas famílias abaixo são o método
(treino vs busca), não um censo permanente.

### Treino — alimentam dataset de modelo

| User-agent | Dono |
|---|---|
| `GPTBot` | OpenAI |
| `ClaudeBot`, `anthropic-ai` | Anthropic |
| `Google-Extended` | Google (treino de IA; **não** afeta o índice de busca) |
| `Applebot-Extended` | Apple Intelligence |

Rastreiam em volume, sem urgência, e respeitam robots.txt.

### Busca em tempo real — respondem a consulta ao vivo

| User-agent | Dono |
|---|---|
| `OAI-SearchBot` | OpenAI (ChatGPT Search) |
| `ChatGPT-User` | OpenAI (navegação disparada pelo usuário) |
| `Claude-SearchBot` | Anthropic |
| `PerplexityBot` | Perplexity |

Indexam continuamente. **São estes que decidem se você é citado.**

### A decisão que a separação permite

Como treino e busca são agentes distintos, dá para fazer a escolha nuançada: **ficar fora do dataset
de treino e continuar elegível a citação.**

```
# robots.txt — política padrão do Nirvana para site de cliente
# Liberar quem cita, bloquear quem só treina.

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: *
Allow: /

Sitemap: https://exemplo.com/sitemap.xml
```

**Decidir com o cliente, não por ele.** Existem três posturas legítimas:

| Postura | Configuração | Para quem |
|---|---|---|
| Máxima visibilidade | liberar tudo, treino e busca | marca que quer presença a qualquer custo |
| Citação sem treino (padrão acima) | liberar busca, bloquear treino | maioria dos clientes; protege o ativo editorial |
| Fechado | bloquear tudo de IA | conteúdo proprietário, dado sensível, licenciamento |

**Ressalva honesta:** conformidade é opt-in. A diretiva só funciona se o bot lê e honra. Alguns
crawlers historicamente ignoraram robots.txt. Quem precisa de garantia real usa bloqueio na borda
(WAF/CDN por user-agent e ASN), não robots.txt.

---

## 3. Rastreabilidade e indexação

| Item | Regra |
|---|---|
| `robots.txt` | Existe, retorna 200, não bloqueia CSS/JS necessários ao Googlebot, aponta o sitemap |
| `sitemap.xml` | Só URL canônica, 200, indexável. Sem redirect, sem 404, sem `noindex`. `lastmod` real |
| Canonical | Uma por página, absoluta, auto-referente quando não há duplicata |
| `noindex` | Nunca em página que deveria ranquear. Verificar meta **e** header `X-Robots-Tag` |
| Redirect | 301 para permanente. Sem cadeia com mais de 1 salto |
| Status | Página indexável responde 200. Soft-404 (200 com "não encontrado") é defeito |
| Paginação | Cada página com canonical própria; não canonicalizar tudo para a página 1 |
| Parâmetro de URL | UTM e filtro não geram URL indexável duplicada |

## 4. Internacionalização

Relevante para os squads que entregam em PT-BR e EN.

- `hreflang` recíproco: se A aponta B, B aponta A. Sem reciprocidade, é ignorado.
- `x-default` para a página de seleção ou o idioma-fallback.
- Código correto: `pt-BR` (não `pt-br` no atributo `lang`? — `lang="pt-BR"` está certo; o
  case é indiferente por spec, mas manter consistente).
- `<html lang="pt-BR">` em toda página. Leitor de tela e modelo usam isso.
- Tradução real, não parâmetro de query alternando strings no cliente (volta ao problema §1).

## 5. Metadata

| Elemento | Regra |
|---|---|
| `<title>` | 50-60 caracteres, único por página, termo principal no início, marca no fim |
| `<meta name="description">` | 140-160 caracteres. Não ranqueia, mas decide clique — e é frequentemente o trecho que a resposta gerada resume |
| `<h1>` | Exatamente um por página, coerente com o title |
| Open Graph | `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:type` |
| Twitter Card | `summary_large_image` com `twitter:image` |
| `og:image` | Precisa ter texto legível em miniatura. Ver `ogimage.gallery` no catálogo de referências |
| Favicon + `theme-color` | Ambos os esquemas (light e dark) |

## 6. llms.txt — a aposta barata

Spec (llmstxt.org):

- caminho `/llms.txt`, markdown
- ordem: BOM opcional → **H1 obrigatório** (nome do site) → blockquote com resumo → parágrafos e
  listas sem heading → seções delimitadas por H2 com listas de arquivo
- item de lista: `- [Título](url): nota opcional`
- uma seção H2 chamada `Optional` marca URLs descartáveis quando o contexto precisa encurtar
- recomendação adicional: servir versão markdown limpa de cada página no mesmo URL com `.md` no fim

Exemplo mínimo:

```markdown
# Nome da Empresa

> Uma frase dizendo o que a empresa faz, para quem, e onde atua.

Contexto adicional em prosa curta, sem heading.

## Páginas principais

- [Serviços](https://exemplo.com/servicos): o que é entregue, com preço e prazo
- [Casos](https://exemplo.com/casos): resultados com número e período
- [Sobre](https://exemplo.com/sobre): equipe, credenciais, endereço

## Optional

- [Blog](https://exemplo.com/blog): artigos técnicos
```

**Ceticismo devido.** Nenhum grande motor confirmou publicamente consumir `llms.txt` como sinal. O
custo de publicar é quase zero e o risco é zero — então vale fazer, como aposta barata, não como
pilar. Relato de "publiquei e três dias depois estava alimentando resposta de IA" é anedota, não
evidência controlada. Escrever o arquivo; não vender o arquivo.

Tese de arquitetura que vale como organização mental: **schema é a camada de
identidade estruturada, llms.txt é o índice de conteúdo, MCP é a interface de consulta ao vivo.** As
três juntas tornam a propriedade legível por agente.

## 7. Ordem de execução

```
1. Decidir SSR (§1) — antes de escolher framework, não depois
2. Configurar robots.txt com a postura acordada com o cliente (§2)
3. Canonical, sitemap, status (§3)
4. hreflang se multi-idioma (§4)
5. Metadata (§5)
6. llms.txt (§6)
7. Rodar scripts/audit-search-visibility.ts
```

Os passos 1 e 2 são decisões de arquitetura. Os outros são execução. Inverter a ordem custa
retrabalho de framework inteiro.
