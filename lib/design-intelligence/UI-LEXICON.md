# Léxico de UI — nomear antes de desenhar

Baseado no NameThatUI (namethatui.com, @argofowl), que cataloga 76 elementos — 44 web e 32 macOS —
com nome canônico, símbolo de API e comportamento. As fontes de verificação declaradas pelo site
são: Apple (guias de design + símbolos SwiftUI/AppKit/UIKit), Web (specs WHATWG HTML, MDN, APIs
nativas) e acessibilidade (WAI-ARIA, APG, WCAG).

**Por que isto é a primeira etapa e não uma curiosidade:** "faz um popup" produz um `dialog` quando o
certo era `popover`. A diferença não é estética — é armadilha de foco, comportamento de dismiss,
papel ARIA e navegação por teclado. Nomear certo no brief elimina uma rodada inteira de retrabalho e
um bug de acessibilidade que só aparece na auditoria.

**Princípio de nomenclatura herdado do NameThatUI:** manter o termo **específico da plataforma** em
vez de forçar um nome universal. Quando web e macOS chamam a mesma coisa por nomes diferentes, os
dois ficam, com atribuição.

---

## Web — 44 padrões

| Padrão | Primitiva / símbolo | Papel ARIA e comportamento crítico |
|---|---|---|
| Accordion | `<details>`/`<summary>` ou button + region | `aria-expanded` no gatilho; região rotulada pelo gatilho |
| Avatar Group | lista de imagens sobrepostas | lista com rótulo; o "+3" precisa de texto acessível |
| Badge / Chip / Pill | `<span>` ou `<button>` | se remove algo, é botão com nome acessível ("remover X") |
| Bento Grid | CSS Grid com áreas nomeadas | ordem do DOM = ordem de leitura, não a visual |
| Breadcrumbs | `<nav aria-label="breadcrumb">` + `<ol>` | último item com `aria-current="page"` |
| Card | `<article>` ou `<li>` | evitar link envolvendo tudo; um alvo nomeado por card |
| Carousel | region com `aria-roledescription="carousel"` | controles de pausa obrigatórios se auto-avança |
| Combobox | `<input role="combobox">` + listbox | `aria-expanded`, `aria-controls`, `aria-activedescendant` |
| Command Palette | dialog modal + combobox | trap de foco, `Esc` fecha, devolve foco à origem |
| Date Picker | `<input type="date">` ou grid de dialog | grade é `role="grid"`; setas navegam dias |
| Divider | `<hr>` ou `role="separator"` | decorativo → `aria-hidden` |
| Drag & Drop | HTML DnD ou pointer events | **obrigatório** ter alternativa por teclado |
| Empty State | region com heading | precisa dizer o que fazer, não só que está vazio |
| Focus Ring | `:focus-visible` | nunca `outline: none` sem substituto de contraste 3:1 |
| Hamburger Menu | button + `aria-expanded` | rótulo textual, não só ícone |
| Header / Navigation Bar | `<header>` + `<nav>` | landmark; um `nav` por propósito, cada um rotulado |
| Hover Card | popover não-modal disparado por hover | precisa abrir por foco também; atraso de saída |
| Inline Alert | `role="status"` ou `role="alert"` | `alert` interrompe o leitor de tela; usar só em erro |
| Lightbox | dialog modal | trap de foco; `Esc`; devolve foco à miniatura |
| Marquee | animação CSS | respeitar `prefers-reduced-motion`; pausar no hover |
| Masonry Layout | `grid-template-rows: masonry` ou colunas | ordem do DOM diverge da visual — cuidado |
| Modal Dialog | `<dialog>` + `showModal()` | inerte o resto, trap de foco, `Esc`, devolve foco |
| Multi-select | listbox com `aria-multiselectable` | estado por opção via `aria-selected` |
| Pagination | `<nav>` + lista de links | página atual com `aria-current="page"` |
| Parallax Scrolling | `transform` em scroll | desligar em `prefers-reduced-motion`; custo de INP |
| Popover | `popover` attr / `<dialog>` não-modal | **não** trapeia foco; fecha com `Esc` e clique fora |
| Progress Indicators | `<progress>` ou `role="progressbar"` | indeterminado precisa de `aria-valuetext` |
| Resize Handle | `role="separator"` com `aria-valuenow` | operável por seta do teclado |
| Scrim | overlay atrás de modal | decorativo; o dialog é quem carrega semântica |
| Scrollspy | nav + `IntersectionObserver` | `aria-current` na seção ativa |
| Sign-in Form | `<form>` + `autocomplete` correto | `autocomplete="username"`/`"current-password"` |
| Skeleton | placeholder animado | `aria-busy="true"` no container; não anunciar o esqueleto |
| Steps | `<ol>` + `aria-current="step"` | estado concluído/atual/futuro precisa ser textual |
| Sticky Positioning | `position: sticky` | não pode cobrir o alvo de foco ao navegar por teclado |
| Switch / Checkbox / Radio | `role="switch"` / `<input>` | switch = liga/desliga imediato; checkbox = seleção |
| Tabs | tablist / tab / tabpanel | setas navegam, `Tab` sai do conjunto |
| Text Scramble | animação de texto | manter o texto final no DOM; anunciar só o final |
| Toast | `role="status"` em live region | não roubar foco; tempo suficiente ou ação de fechar |
| Toggle Group | `role="group"` de botões `aria-pressed` | diferente de tabs: não troca painel |
| Truncation | `text-overflow` / `line-clamp` | o texto completo precisa estar acessível |
| Lightbox / Modal — ver acima | | |
| Easing | `cubic-bezier()` | curva declarada no DESIGN.md, não improvisada |
| Spring Animation | física de mola (Motion) | `prefers-reduced-motion` desliga |

## macOS — 32 padrões

Relevantes quando o squad entrega app nativo, Electron, ou precisa traduzir terminologia de um brief
de designer Apple.

Insertion Caret · Pointer/Cursor · Alert · Slider · Color Well · Mac Window · Split View · Scroll
View · Search Field · Save Panel · Token Field · Combo Button · Level Indicator · Column View ·
Outline View · Menu Bar · Context Menu · Disclosure Triangle · Dock Badge · Inspector · Panel ·
Popover · Segmented Control · Sheet · Sidebar · Stepper · Toolbar · Traffic Lights · Visual Effect
Material · Menu Bar Extra.

Traduções que mais confundem:

| macOS | Web equivalente | Diferença que importa |
|---|---|---|
| Sheet | Modal Dialog ancorado à janela | Sheet pertence à janela pai, não à tela |
| Segmented Control | Toggle Group ou Tabs | depende se troca painel (tabs) ou filtra (toggle group) |
| Disclosure Triangle | Accordion / `<details>` | mesmo comportamento, nome diferente |
| Visual Effect Material | Glassmorphism / `backdrop-filter` | no macOS é material do sistema, não CSS |
| Inspector | Painel lateral de propriedades | não é sidebar de navegação |
| Token Field | Multi-select com chips | entrada de texto que vira chip |

---

## As seis confusões que mais custam caro

**1. Popover × Modal Dialog × Tooltip × Menu**

| | Trapeia foco? | Fecha com Esc? | Tem conteúdo interativo? |
|---|---|---|---|
| Tooltip | não | sim | **não** — só texto descritivo |
| Popover | não | sim | sim |
| Menu | não (mas gerencia seta) | sim | itens de comando |
| Modal Dialog | **sim** | sim | sim, e bloqueia o resto |

Escolher errado aqui é o defeito de acessibilidade mais comum em landing page gerada por agente.

**2. Tabs × Toggle Group** — tabs trocam um painel de conteúdo; toggle group altera um estado.
Se não existe painel, não são tabs.

**3. Switch × Checkbox** — switch aplica imediatamente; checkbox coleta para um submit posterior.
Switch dentro de formulário com botão "Salvar" é contradição.

**4. Toast × Inline Alert** — toast é transitório e não bloqueia; inline alert fica junto do campo ou
da seção a que se refere. Erro de validação nunca é toast.

**5. Skeleton × Spinner** — skeleton quando a forma final é previsível; spinner quando não é.
Skeleton que não parece com o conteúdo final é pior que spinner.

**6. Combobox × Select × Multi-select** — combobox tem entrada de texto que filtra; select não.
Multi-select precisa de `aria-multiselectable` e feedback de quantos itens estão marcados.

---

## Como usar no briefing

Antes de desenhar ou codar, reescrever o pedido do cliente em nomes canônicos:

```
Pedido:   "quero uma caixinha que aparece quando passa o mouse mostrando o perfil,
           com botão de seguir"
Canônico: Hover Card (não Tooltip — tem conteúdo interativo).
          Abre por hover E por foco. Não trapeia foco. Fecha com Esc e ao sair.
          Botão "Seguir" precisa ser alcançável por teclado enquanto o card está aberto.
```

```
Pedido:   "uma barra de busca tipo Spotlight que abre com Cmd+K"
Canônico: Command Palette = Modal Dialog + Combobox.
          Trapeia foco, Esc fecha, devolve foco ao elemento de origem.
          `aria-activedescendant` para o item destacado; a lista não recebe foco.
```

Três linhas de tradução por padrão. É o passo mais barato do pipeline inteiro e o que mais evita
retrabalho.

---

## Ferramentas

- **namethatui.com** — busca por descrição em linguagem natural; devolve nome, símbolo de API e um
  prompt pronto para colar no agente. Tem tabela de tradução plain-name ↔ AppKit ↔ SwiftUI.
- **localtoasted/name-that-ui** — Agent Skill não-oficial que empacota o catálogo para Claude Code e
  Codex. Instala em `~/.claude/skills/name-that-ui`. Catálogo atualizado por GitHub Action que abre
  PR (sem merge automático).
- **MCP `shadcn`** (disponível neste harness) — `search_items_in_registries`,
  `view_items_in_registries`, `get_item_examples_from_registries`, `get_add_command_for_items`,
  `get_audit_checklist`. Depois de nomear o padrão, este MCP acha a implementação real no registry em
  vez de reinventar.
