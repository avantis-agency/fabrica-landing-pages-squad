---
name: search-visibility-optimize
description: "Make an existing landing page findable and citable without blunting the offer."
version: "6.0.0"
steps:
  - id: optimize
    agent: lp-developer
    task: search-visibility-optimize
    creates: [search-optimized-page, robots-txt, llms-txt, performance-budget]
    on_failure: abort
success_indicators:
  - "auditor score ≥ 75 with no blocking FAIL"
  - "main copy visible without JavaScript"
on_failure: abort
---

## optimize

Read `target` (HTML, dist/, URL). If there is no page, write `search-report.md` with that gap and stop; do not invent a site. Open `lib/seo-geo-aeo/` with read. Keep the conversion headline; add answer-first blocks around it. Crawler posture from the brief or premise citation-without-training. JSON-LD parity, robots, sitemap, llms.txt, LCP/INP/CLS budget. Run the auditor script.
