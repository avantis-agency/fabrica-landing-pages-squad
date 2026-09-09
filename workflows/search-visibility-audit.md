---
name: search-visibility-audit
description: "Score a finished landing page against the 38-item search visibility gate."
version: "6.0.0"
steps:
  - id: audit
    agent: lp-reviewer
    task: search-visibility-audit
    creates: [search-audit-report, search-audit-json]
    on_failure: abort
success_indicators:
  - "all 38 automatic items scored"
  - "every FAIL has a file:line fix"
on_failure: abort
---

## audit

Read `artifact`. Run `bun lib/seo-geo-aeo/scripts/audit-search-visibility.ts` (and `--json`). Complete by hand what the script marks unverified. Laudo in the CHECKLIST.md format. A blocking FAIL makes the verdict REPROVADO regardless of score. Do not rewrite the page in this workflow.
