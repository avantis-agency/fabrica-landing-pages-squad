# Tech Stack — fabrica-landing-pages

## Core
| Technology | Purpose | Version |
|-----------|---------|---------|
| HTML5 | Estrutura semântica | - |
| CSS3 | Estilos e layout | - |
| JavaScript | Interatividade mínima | ES2022+ (floor; confirm the runtime this run) |

## Build & Tooling
| Tool | Purpose | Notes |
|------|---------|-------|
| Vite (optional) | Dev server | Via Bun if the brief wants a bundler |
| Bun | Scripts and build | `bun run dev` / `bun run build`. Never npm. |
| PostCSS | CSS processing | Autoprefixer, minify |

## CSS
| Option | When to Use |
|--------|-------------|
| Vanilla CSS + custom properties | Default deste squad |
| Tailwind CSS | Só se o brief nomear |

## Image Generation
| Tool | Purpose | Notes |
|------|---------|-------|
| nano-banana-pro MCP | Geração de TODAS as imagens | Resolva o id do modelo nesta execução; snapshot em `references/state-of-the-art.md` |
| Image model | Linha Pro / Nano Banana Pro para asset de landing | 1K / 2K / 4K; nunca o id `gemini-3-pro-image-preview` |

## Fonts
| Source | Notes |
|--------|-------|
| Google Fonts | CDN, font-display: swap |
| Local fonts | Se performance crítica |

## Deploy (escolher um)
| Platform | Notes |
|----------|-------|
| Vercel | Zero-config, edge |
| Netlify | Similar, forms integrados |
| GitHub Pages | Gratuito, estático |

## Não Usar
| Technology | Razão |
|-----------|-------|
| jQuery | Desnecessário para LP moderna |
| Bootstrap | Overhead para página single |
| React/Vue/Angular | Overkill para LP estática |
| CMS | Complexidade desnecessária |
