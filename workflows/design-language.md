---
name: design-language
description: "Define DESIGN.md and pass anti-slop before any UI is coded."
version: "6.0.0"
steps:
  - id: define
    agent: lp-designer
    task: design-language-define
    creates: [design-md, anti-slop-report]
    on_failure: abort
success_indicators:
  - "DESIGN.md has token front matter and eight rationale sections"
  - "anti-slop has no B1-B6 FAIL"
on_failure: abort
---

## define

Read the brief, optional `brand_source`, optional `constraints`. Open `lib/design-intelligence/` with read. Name UI patterns (ARIA + focus), pick a vibe, collect 3-5 annotated references, write DESIGN.md, run anti-slop. Conversion landing constraint: CTA contrast and the headline → proof → action eye path are tokens, not afterthoughts. Missing brand becomes a premise, never a stop. Done when DESIGN.md parses and B1-B6 are not FAIL.
