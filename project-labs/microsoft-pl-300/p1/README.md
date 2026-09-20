# Insurance star-schema model in Power BI

**Certification:** Microsoft Power BI Data Analyst Associate (PL-300) (Microsoft)
**Project 1 of 5**

> Build a clean semantic model for premium/claims reporting.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/microsoft-pl-300-1.svg)

## Architecture & data model
Fact (premium/claims) surrounded by date, product, region, distributor dimensions; one-to-many single-direction relationships; marked date table.

## Concepts covered
- **Star schema** — A central fact table joined to dimension tables — simplest, fastest structure for Power BI.
- **Relationships & cardinality** — One-to-many from dimensions to the fact, defined with correct cardinality.
- **Single-direction filtering** — Filters flow dimension → fact; avoids ambiguity/performance issues of bidirectional.
- **Date dimension (marked)** — A contiguous, marked date table enables correct time-intelligence.
- **Measures vs calculated columns** — Measures compute at query time (no storage); calculated columns are stored per row.

## Implementation steps
1. Model the fact and dimensions in a star.
2. Set one-to-many, single-direction relationships; mark the date table.
3. Create measures (written premium, loss ratio) rather than calculated columns.
4. Reduce cardinality (split datetime) for performance.

## Outcomes
- Fast, unambiguous model.
- Correct time-intelligence.
- Lean, performant dataset.

## Tech stack
`Power BI Desktop` · `DAX` · `Star schema`

## Why this project (profile relevance)
The modeling foundation behind the insurance KPI reports you deliver.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/microsoft-pl-300*
