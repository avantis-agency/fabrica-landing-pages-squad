---
name: full-landing-page
description: "From brief to a SHIP/NO_SHIP landing page: plan, copy, DESIGN.md, images, vanilla HTML, AEO/GEO, conversion review."
version: "6.0.0"
steps:
  - id: plan
    agent: lp-orchestrator
    task: lp-orchestrator-plan
    creates: [landing-page-plan, section-briefs]
    on_failure: abort
  - id: copy-research
    agent: lp-copywriter
    task: lp-copywriter-research
    requires: [plan]
    creates: [copy-research]
    on_failure: abort
  - id: copy-write
    agent: lp-copywriter
    task: lp-copywriter-write-section
    requires: [copy-research]
    creates: [section-copy]
    on_failure: abort
  - id: design-language
    agent: lp-designer
    task: design-language-define
    requires: [plan]
    creates: [design-md, anti-slop-report]
    on_failure: abort
    parallel_safe: true
  - id: design-sections
    agent: lp-designer
    task: lp-designer-design-section
    requires: [copy-write, design-language]
    creates: [section-design-specs]
    on_failure: abort
  - id: hero-image
    agent: lp-image-creator
    task: lp-image-creator-hero
    requires: [design-sections]
    creates: [hero-image]
    on_failure: abort
    parallel_safe: true
  - id: section-images
    agent: lp-image-creator
    task: lp-image-creator-section
    requires: [design-sections]
    creates: [section-images]
    on_failure: abort
    parallel_safe: true
  - id: setup
    agent: lp-developer
    task: lp-developer-setup
    requires: [plan, design-language]
    creates: [project-structure]
    on_failure: abort
    parallel_safe: true
  - id: build-sections
    agent: lp-developer
    task: lp-developer-build-section
    requires: [setup, copy-write, design-sections, hero-image, section-images]
    creates: [built-sections]
    on_failure: abort
  - id: assemble
    agent: lp-developer
    task: lp-developer-assemble
    requires: [build-sections]
    creates: [landing-page-html]
    on_failure: abort
  - id: search
    agent: lp-developer
    task: search-visibility-optimize
    requires: [assemble]
    creates: [search-optimized-page, robots-txt, llms-txt, performance-budget]
    on_failure: continue
  - id: review
    agent: lp-reviewer
    task: lp-reviewer-review
    requires: [search]
    creates: [review-report]
    on_failure: abort
  - id: optimize
    agent: lp-reviewer
    task: lp-reviewer-optimize
    requires: [review]
    creates: [optimization-plan]
    on_failure: continue
success_indicators:
  - "landing-page-plan.md justifies every shipped section"
  - "DESIGN.md exists with tokens and anti-slop with no B1-B6 FAIL"
  - "every image slot is a generated file"
  - "index.html is semantic, mobile-first, WCAG 2.2 AA"
  - "review-report.md records SHIP or NO_SHIP"
on_failure: abort
---

## plan

Read the brief. Missing product, audience, offer, price or proof become `## Premissas assumidas`, never a questionnaire. Classify Schwartz awareness. Decide the section set from `data/landing-page-sections.yaml`: sales pages keep the 11-pack; **capture / paid-traffic pages drop nav links** (logo + one CTA at most) and record why. Each shipped section gets a funnel job, key message, visual need, CTA. Done when `landing-page-plan.md` exists. Hand it to copy-research and design-language.

## copy-research

Read the plan. Open `data/copy-frameworks.yaml`. Build the audience (pains, desires, objections, real phrases) from the brief and labeled premises, never from invented case studies. Map section → framework → angle → key message for every shipped section. Done when `copy-research.md` has that table and a Schwartz implication. Hand it to copy-write.

## copy-write

Read research + plan. Write every shipped section with the mapped framework. Hero headline ≤ 10 words, benefit not feature, So What? / Who Cares?. CTAs are verb + outcome, never Submit. Proof (names, numbers, logos) comes from the brief or is labeled premise. No photoreal fake humans. Run `checklists/copy-quality-checklist.md`. Done when `section-copy.md` covers every shipped section. Hand it to design-sections and build-sections.

## design-language

Read the plan and optional `brand_source`. Open `lib/design-intelligence/` with read (lib is not in the prompt). Dated trend search, then DESIGN.md (tokens + eight sections) and anti-slop. Conversion constraint: eye path headline → benefit → CTA; CTA contrast is a conversion choice, not decoration. Done when DESIGN.md parses and B1-B6 are not FAIL. Hand it to design-sections and setup.

## design-sections

Read DESIGN.md + section-copy. Specify layout per breakpoint, tokens only (no loose hex in the spec if a token exists), image brief per slot, contrast ≥ 4.5:1, CTA targets ≥ 44 px. Done when `section-designs.md` exists for every shipped section. Hand image briefs to hero-image and section-images.

## hero-image

Read the hero brief + headline. Generate via nano-banana-pro after resolving the live image-model id from the skill/MCP schema and https://ai.google.dev/gemini-api/docs/image-generation (16:9, 2K). Flux if that path is down. Record the resolved id. No burned text. Iterate up to 3 times. Save `assets/images/hero.webp` (PNG fallback). Done when the file is on disk and the prompt is recorded.

## section-images

Read remaining image briefs. Same generator and palette as the hero. Benefits 4:3, feature icons 1:1. Testimonials: initials, illustrated marks, or real photos from the brief. Never invent a photoreal named person. Zero placeholders. Save under `assets/images/`.

## setup

Vanilla HTML + CSS custom properties + minimal JS. Encode DESIGN.md as `:root` tokens. Scaffold `index.html` with skip-link, meta, font preload. Bun for any toolchain (`bun run dev` / `bun run build`). No npm, no Node as the prescribed runtime, no React/Next unless the brief named them. Done when the tree exists and tokens compile.

## build-sections

One `<section>` per shipped block, `aria-labelledby`, copy and images faithful to Quill and Lens. Tokens only. Mobile-first. `prefers-reduced-motion`. Hero image `fetchpriority="high"`; others lazy. Forms: Web3Forms or Formspree, labels wired, ≤ 3 fields unless the brief needs more. Lucide for icons.

## assemble

Header (or logo+CTA only) + `<main>` in plan order + footer. Title, description, canonical, Open Graph, Twitter, JSON-LD stub that search will complete. Critical CSS for the first viewport. Build to `dist/` with Bun. Hero is LCP.

## search

Open `lib/seo-geo-aeo/` with read. SSR copy (this page is already HTML). Crawler posture: brief wins; else premise **citation-without-training**. Answer-first blocks without blunting the headline. JSON-LD `@graph` with visible parity. robots.txt, sitemap.xml, llms.txt. Budget LCP/INP/CLS at the current "good" thresholds on https://web.dev/articles/vitals (snapshot in `references/state-of-the-art.md`). Run `bun lib/seo-geo-aeo/scripts/audit-search-visibility.ts`.

## review

Four dimensions every time: copy, design, code, conversion. Issues with severity, location, fix. Run the search auditor if search left a score. WCAG 2.2 AA including 2.4.11 and 2.5.8. Core Web Vitals are LCP / INP / CLS, never FID. Verdict APPROVE / NEEDS_FIXES / MAJOR_ISSUES.

## optimize

Prioritize by impact × effort. A/B hypotheses for headline, CTA, proof. `finalVerdict` is SHIP only with 0 critical and ≤ 2 major; otherwise NO_SHIP and a fix list. Apply blocking fixes in this same run when they are mechanical (alt, contrast, skip-link). Do not wait for a human.
