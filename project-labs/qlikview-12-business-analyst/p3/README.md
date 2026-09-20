# Set analysis measures

**Certification:** QlikView 12 Business Analyst (QVBA) (Qlik)
**Project 3 of 5**

> Deliver YoY, prior-period, and filter-independent metrics.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/qlikview-12-business-analyst-3.svg)

## Architecture & data model
Period-comparison measures built with set analysis (current vs prior year), independent of user selection.

## Concepts covered
- **Set identifiers ($ vs 1)** — $ current selection; 1 all records.
- **Modifiers** — Set/clear/exclude fields inside <>.
- **Dollar-sign expansion** — $(=Max(Year)) for dynamic year measures.
- **Exclusions** — Clear specific filters while respecting others.
- **YoY growth** — (cur-prev)/prev with per-year set analysis.

## Implementation steps
1. Fix year with {$<Year={$(=Max(Year))}>}; prior with Max(Year)-1.
2. Compute (cur-prev)/prev for YoY.
3. Ignore specific filters via cleared modifiers.
4. Prefer set analysis over If() for speed.

## Outcomes
- Reliable YoY/period measures.
- Filter-independent KPIs.
- Better performance.

## Tech stack
`QlikView` · `Set analysis`

## Why this project (profile relevance)
Period comparisons are staples of executive reporting.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/qlikview-12-business-analyst*
