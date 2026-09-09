# State of the art: snapshot (refresh, do not copy into agents)

This is the **only** dated snapshot of facts that live outside this squad.
Operating prose in `agents/`, `tasks/`, `workflows/`, `config/`, `checklists/`
and `lib/` must **resolve** the live value and write it into the run output.
If a number here disagrees with the tool or vendor page this run, the live
value wins.

**Refresh:** once per quarter, or when a run's resolved value differs from a
row below. For each claim: re-run the resolve command, update `verified`,
keep the named source. Do not scatter the new numbers back into agents.

| Claim | Last verified | Resolve this run | Source |
|---|---|---|---|
| Gemini image model for landing assets (Pro / Nano Banana Pro line) | 2026-09-03: stable id `gemini-3-pro-image` (Nano Banana Pro). Vendor also lists Gemini 3.1 Flash Image (Nano Banana 2) as the general go-to; this squad's quality bar for landing assets is the Pro line. | Read the `nano-banana-pro` skill / MCP tool schema. Then https://ai.google.dev/gemini-api/docs/image-generation and https://ai.google.dev/gemini-api/docs/models/gemini-3-pro-image. Record the resolved id in the image manifesto. | Google AI for Developers, image generation page (updated 2026-09-02) |
| Dead preview id | `gemini-3-pro-image-preview` is a retired preview id (stays true) | Do not call it. | Google Cloud model page for the preview id |
| Core Web Vitals "good" thresholds (field, p75, CrUX) | 2026-09-03: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Poor: LCP > 4.0 s, INP > 500 ms, CLS > 0.25. | https://web.dev/articles/vitals and https://web.dev/articles/defining-core-web-vitals-thresholds | web.dev |
| FID retired as a Core Web Vital | 2024-03-12 (stays true) | Same vitals pages | web.dev, 2024-03-12 |
| INP field fail-rate cited in this lib | Snapshot used in older prose: "43% of sites fail the 200 ms INP threshold." Do not recopy as current. | CrUX / HTTP Archive this run if you will cite a fail-rate | CrUX, HTTP Archive |
| AI crawler user-agents this auditor checks | 2026-09-03: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-SearchBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended` (the 8 in `lib/seo-geo-aeo/scripts/audit-search-visibility.ts`) | Vendor robots docs this run: OpenAI, Anthropic, Perplexity, Google-Extended, Applebot-Extended. Add any new search-family agent the brief names. | Vendor robots / crawler docs |
| AI crawlers and JavaScript | Snapshot: Vercel + MERJ, 500M+ GPTBot fetches, no JS execution; 69% of 23 AI crawlers do not run JS. | Re-read that study or vendor crawler docs this run before stating JS behavior as current. | Vercel / MERJ GPTBot research |
| Brazil AIO / schema figures previously in FUNDAMENTALS.md | Snapshot: Google AI Overviews on ~47% of qualified BR queries in Q1 2026; "under 12% of Brazilian sites have descriptive schema" (2026 audit). Do not recopy as current. | Resolve with a named, dated source this run if you will cite BR market share | Named study, this run |
| Capture-page nav default | Unbounce, cited in Send It Rising, 2026-06-01: paid capture pages without a full top nav converted 10-15% better. | Re-read that source if the number would change the section set. | Send It Rising, 2026-06-01 · Unbounce |
| Brazil landing-page price band (teaching example only) | Snapshot: BRL 8,000-35,000 in Brazil in 2026, depending on dedicated copy, own design system and lead capture. Never ship this as a live price. | Resolve a sourced range in the page's currency this run | Named quote or brief |
| DESIGN.md spec publication | Google Labs, 2026-04-21, Apache 2.0, repo `google-labs-code/design.md`. Status at publication: alpha. | Check the repo status this run. | https://github.com/google-labs-code/design.md |
| Claude Design launch | Anthropic Labs, 2026-04-17, research preview. Launch-week: 1M users. Model at launch was Claude Opus 4.7. | Resolve the current Claude Design model from Anthropic docs this run. | Anthropic Labs |
| WCAG 2.2 AA / ISO/IEC 40500:2025 | Published standard (stays true until a successor is the gate). Contrast 4.5:1 normal text, 2.4.11, 2.5.8 (≥ 24 px, CTA 44 px). | https://www.w3.org/TR/WCAG22/ | W3C WCAG 2.2 · ISO/IEC 40500:2025 |
| European Accessibility Act | In force since 2025-06-28 (Directive (EU) 2019/882). First full calendar year of enforcement was 2026. | Confirm still in force. Resolve the current EN 301 549 version at ETSI. Do not keep an "expected 2026" draft number. | EUR-Lex · ETSI EN 301 549 |
| Layout / type / color "hot" list | Snapshot in `data/design-trends-reference.yaml` (was labeled 2025/2026). | WebSearch with a date this run. Do not copy the yaml as current fashion. | Awwwards, Lapa, Land-book, this run |

## What this squad does **not** snapshot here

- Hormozi, Ogilvy, Schwartz, Sugarman, Halbert as copy method: identity of this squad.
- Eleven-section sales anatomy and capture pages dropping outbound nav: identity. The Unbounce measurement above is the source of the default, not a second copy of the method.
- Vanilla HTML/CSS/JS, Bun never npm, Lucide, Web3Forms/Formspree, Intersection Observer: identity.
- Anti-slop B1-B6, DESIGN.md eight rationale sections, vibe atlas: identity.
- `protocol: "6.0"` and this squad's own `version`: this entity.
- Princeton GEO paper (9 tactics, 10,000 queries, +30–40% visibility, +37% quotes, +22% stats, 44.2% of citations from the first 30%): a named study. Cite the paper, do not redate it.
- Ahrefs, 1,885 pages that added JSON-LD between 2025-08 and 2026-03, no significant citation uplift: a named study with a closed date range.
- ES2022+ as a JavaScript floor: a floor. It stays true as editions climb.
- HTML5 / CSS3 as language names.

## Install when a tool is missing

Image generation and Bun live outside this directory.

- **This squad:** `nrv activate fabrica-landing-pages`. Never `bun install` / `npm install` inside this directory. Shared packages live in `~/.nirvana` via `nrv deps`.
- **nano-banana-pro down:** try Flux, then the runtime Imagine chain. Record the chain tried. Do not invent a file.
- **Bun missing:** install Bun, reopen the terminal, `nrv activate fabrica-landing-pages`, then `bun --version`.
- **Auditor script:** `bun lib/seo-geo-aeo/scripts/audit-search-visibility.ts <target>`. If Bun is missing, same install path as above.
