# Fontes de referência — catálogo operacional

URLs e produtos abaixo são um catálogo, não um censo do que está "quente". Confirme o que
está ativo nesta execução. Claims datados vivem em `references/state-of-the-art.md`.

Doutrina que vem do próprio Refero e que esta lib adota: **usar referência como contexto, não como
decoração**. Dar ao agente um DESIGN.md concreto ou uma tela real de produto no ar vale mais que dez
descrições estilísticas vagas.

Regra de coleta: **3 a 5 referências, da fonte certa para o problema certo**. Vinte referências de
categorias diferentes produzem colagem, não direção.

---

## Camada 1 — feitas para agente

Estas devolvem estrutura, não imagem bonita. São a primeira parada.

| Fonte | O que entrega | Quando usar |
|---|---|---|
| **refero.design** | 100.000+ telas reais de produtos web e iOS, organizadas por tipo de página, padrão de UX, elemento de UI, fluxo e fonte. Só produto no ar. **MCP disponível** (135.000+ telas, 10.000+ fluxos). | Quando precisa ver como produtos reais resolvem *aquele* padrão específico |
| **styles.refero.design** | 1.200+ estilos curados + **biblioteca de DESIGN.md** extraídos de sites líderes + coleções por tipo (Clean SaaS, Devtool, AI Startup, Editorial, Dark Mode) + guias de prompt de design para agente | Quando precisa de um ponto de partida de tokens, não de screenshot |
| **mobbin.com** | Telas de produção de apps com fluxo completo — onboarding, checkout, settings. **MCP disponível**. | SaaS e app complexo; a fonte de maior alavancagem para fluxo, não para estética |
| **21st.dev** | Registry aberto e comunitário de componentes, blocos e hooks compatíveis com shadcn, instaláveis pelo CLI. 119 bibliotecas indexadas. | Quando o padrão já foi nomeado e falta a implementação |
| **MCP `shadcn`** (neste harness) | `search_items_in_registries`, `view_items_in_registries`, `get_item_examples_from_registries`, `get_add_command_for_items`, `get_audit_checklist` | Consulta programática ao registry durante o build — evita reinventar componente resolvido |

---

## Camada 2 — o topo da régua de craft

Para calibrar ambição e para o juiz awwwards. Não copiar; medir contra.

Awwwards · The FWA · Godly (`godly.website`) · CSS Design Awards · siteinspire · httpster ·
MaxiBestOf (`maxibestof.one`) · Minimal Gallery · Landing Love (animação) · Site of Sites ·
Hoverstat.es (experimental) · Browsing Mode · Dead Simple Sites · The Whimsical Web ·
Dark Mode Design · dark.design

---

## Camada 3 — por seção de página

A mais subutilizada e a de maior retorno em landing page. Em vez de procurar "landing page bonita",
procurar a **seção** que está travando.

| Seção | Fonte |
|---|---|
| Hero | `supahero.io` |
| Navegação | `navbar.gallery` |
| Rodapé | `footer.design` |
| Preço | `pricingpages.design` |
| Prova social | `socialproofexamples.com` |
| Erro 404 | `404s.design` |
| Imagem de compartilhamento | `ogimage.gallery` |
| Seções e hover | `unsection.com` |
| Grade bento | `bentogrids.com` |

---

## Camada 4 — por tipo de produto

**Landing page e one-page** · One Page Love · Land-book · Landingfolio · Lapa Ninja

**SaaS e web app** · SaaSFrame · SaaS Interface · SaaSpo · Nicelydone · Webframe · Interface Index

**E-commerce** · Commerce Cream · ecomm.design · tiny blocks

**Mobile e app** · Handheld Design · Page Flows (vídeo de fluxo) · Scrnshts · iOS Icon Gallery ·
Spotted in Prod

**Interface especializada** · Auto Interfaces (automotivo) · HUDS + GUIS (HUD e UI de ficção)

---

## Camada 5 — padrão de UI e micro-interação

Collect UI · Design Vault · Details Matter (micro-interações) · Viewport UI · Recent Design ·
UX Bites (`builtformars.com/ux-bites`) · Design Spells · UI Patterns (conceitual: quando cada padrão
funciona, com raciocínio)

---

## Camada 6 — marca, tipografia, ilustração, movimento, dado

**Marca e identidade** · The Brand Identity · Mindsparkle Mag · Rebrand · BrandGuide
(`brandguidelines.net`) · Branding Style Guides · AIGA Eye on Design · Visuelle · Inspiration Grid ·
Deck.gallery

**Tipografia** · typo/graphic posters · Fontes de fundição independente para fugir dos defaults

**Logo** · Logo System · LogoLounge · Logobook · Logggos

**Ilustração e padrão** · Modern Illustration · Illustration.lol · Pattern Club · Getillustra

**Movimento** · Eyecandy (`eyecannndy.com`) · Brands in Motion · Art of the Title · Vidclue

**Dado** · Data Viz Project · SveltePlot Examples · (para paleta e forma, seguir a skill `dataviz`)

**E-mail** · Really Good Emails · Email Love · Inboxflows

**Anúncio e campanha** · Steep · Love The Work More · Adfolio

**Portfólio** · PFolios · Bestfolios · Prettyfolio · Pafolios

---

## Bibliotecas de componente — ecossistema shadcn

Confirme licença e o que ainda está publicado nesta execução.

shadcn/ui deixou de ser biblioteca e virou ecossistema. Três agrupamentos:

| Biblioteca | Licença | Força | Escolher quando |
|---|---|---|---|
| **shadcn/ui** | MIT | base neutra, acessível, copiável | sempre, como fundação |
| **Magic UI** | MIT | micro-interação e animação de marketing (animated beam, retro grid, neon gradient) | landing page e site de produto |
| **Aceternity UI** | core grátis, all-access pago | efeito visual ousado: card 3D, feixe com brilho, spotlight, botão magnético, partícula. Tailwind + Framer Motion | hero de alto impacto, peça única |
| **21st.dev** | comunitário | variedade imbatível, componente de nicho | quando ninguém mais publica aquele padrão |
| **Cult UI**, **Shadcnblocks**, **shadcn.io** | varia | blocos de página inteiros | prototipagem rápida de seção |

Alerta de convergência: usar Magic UI ou Aceternity sem edição produz páginas que se parecem entre
si — é uma nova fonte de slop. Instalar o componente e **retematizar com os tokens do DESIGN.md**
antes de usar. O gate anti-slop (F1, F6) pega exatamente isso.

---

## Tendências que as galerias premiaram no último ciclo

Contexto para calibrar, não checklist para seguir. Pesquise com data nesta execução.

- Tipografia no centro: fonte custom, manchete superdimensionada, camadas.
- **Tipografia cinética guiada por scroll** — peso e largura de fonte variável mapeados à posição do
  scroll; letras comprimem e expandem em tempo real.
- Motion como competência central: transição de página, estado de hover, sequência de carregamento,
  dataviz interativa.
- **`animation-timeline: scroll()` e `view()` nativos do CSS** — animação por scroll sem JavaScript e
  sem dependência. Mais leve que biblioteca e melhor para INP.
- Cards adesivos e componentes desenhados à mão que acompanham o scroll.
- Brutalismo tátil e "arquitetura invisível".

Tensão a administrar conscientemente: scroll cinético, WebGL e scrub de frame são exatamente o que
destrói INP e LCP. Ver `../seo-geo-aeo/PERFORMANCE.md` antes de decidir. A saída barata é CSS nativo
em vez de biblioteca de JS.

---

## Protocolo de coleta

```
1. Nomeie o padrão (UI-LEXICON.md) e o estilo (VIBE-ATLAS.md).
2. Camada 1 primeiro: Refero/Mobbin para ver como produto real resolve; MCP shadcn para
   implementação já resolvida.
3. Camada 3 se o problema é uma seção específica; camada 4 se é o tipo de produto inteiro.
4. Camada 2 só para calibrar ambição — nunca como fonte de cópia.
5. Registre no DESIGN.md: 3-5 URLs + o que exatamente cada uma resolve.
```

Referência sem anotação do que ela resolve é moodboard. Moodboard não sobrevive ao handoff.
