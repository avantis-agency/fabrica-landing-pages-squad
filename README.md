# Fábrica de Landing Pages

Um time de agentes de IA que trabalha em conjunto para desenhar, escrever e construir **uma landing page de alta conversão**: planejamento, copy de resposta direta, DESIGN.md, imagens geradas, HTML semântico, visibilidade em busca e revisão SHIP/NO_SHIP.

## Seats

| Agent | Persona | Decision |
|--------|---------|----------|
| lp-orchestrator | Nova | Section set, Schwartz awareness, funnel job per block |
| lp-copywriter | Quill | Framework + angle per section, then the copy |
| lp-designer | Pixel | DESIGN.md + per-section layout that converts |
| lp-image-creator | Lens | Every image slot, generated, zero placeholders |
| lp-developer | Stack | Vanilla HTML/CSS/JS, WCAG 2.2 AA, Bun |
| lp-reviewer | Hawk | SHIP or NO_SHIP on copy, design, code, conversion |

## Capabilities

1. `marketing.full_landing_page.execute_fabrica` — the factory (workflow `full-landing-page`)
2. `frontend.design_language.define_fabrica` — DESIGN.md + anti-slop only
3. `frontend.search_visibility.optimize_fabrica` — AEO/GEO on an existing page
4. `frontend.search_visibility.audit_fabrica` — 38-item laudo

## Pipeline

Plan (awareness + section set) → copy research/write → DESIGN.md → section specs → hero + section images → scaffold → build → assemble → search visibility → review → optimize.

Sales pages default to the 11-section anatomy. Capture / paid-traffic pages drop outbound nav links.

## Defaults

- Copy: Hormozi, Ogilvy, Schwartz, Sugarman, Halbert (`data/copy-frameworks.yaml`)
- Visual: `lib/design-intelligence/` (anti-slop, vibe atlas, DESIGN.md)
- Images: nano-banana-pro (resolve the live image-model id this run; Pro / Nano Banana Pro line); Flux fallback
- Code: vanilla HTML + CSS tokens + Lucide + Web3Forms/Formspree; Bun, never npm
- Access: WCAG 2.2 AA (ISO/IEC 40500:2025)
- Vitals: current "good" LCP / INP / CLS at https://web.dev/articles/vitals (snapshot in `references/state-of-the-art.md`)
- Missing facts: `## Premissas assumidas`, then deliver

## Dispatch

```bash
nrv dispatch --auto "use squad fabrica-landing-pages: criar landing page de alta conversão para {PRODUCT}" --exec
```

## License SUL-1.0
