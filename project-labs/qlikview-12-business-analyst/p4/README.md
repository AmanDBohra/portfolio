# Advanced charts: groups, running totals & trellis

**Certification:** QlikView 12 Business Analyst (QVBA) (Qlik)
**Project 4 of 5**

> Add drill-down/cyclic navigation and cumulative analysis.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/qlikview-12-business-analyst-4.svg)

## Architecture & data model
Charts with drill-down/cyclic groups, running totals (RangeSum+Above), trellis, and Aggr-based calcs.

## Concepts covered
- **Drill-down vs cyclic groups** — Hierarchy navigation vs switching unrelated dimensions.
- **Above/Below & RangeSum** — Inter-row references for running totals.
- **Dimensionality()** — Detects aggregation level in pivots for level-specific logic.
- **Trellis (small multiples)** — Repeat a chart across a dimension for comparison.
- **Aggr()** — Nested aggregation for advanced calculations.

## Implementation steps
1. Add drill-down (Year>Quarter>Month) and cyclic groups.
2. Build running totals with RangeSum(Above(...)).
3. Vary subtotal logic with Dimensionality() in pivots.
4. Use trellis for side-by-side comparison.

## Outcomes
- Rich interactive navigation.
- Cumulative analysis.
- Comparable small multiples.

## Tech stack
`QlikView` · `Charts` · `Aggr`

## Why this project (profile relevance)
Richer interactivity for deeper self-service analysis.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/qlikview-12-business-analyst*
