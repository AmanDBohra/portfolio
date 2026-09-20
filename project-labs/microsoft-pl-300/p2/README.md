# Power Query ETL with query folding

**Certification:** Microsoft Power BI Data Analyst Associate (PL-300) (Microsoft)
**Project 2 of 5**

> Clean and shape multi-source data efficiently.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/microsoft-pl-300-2.svg)

## Architecture & data model
Sources → Power Query (profile, remove columns, merge/append, foldable steps) → clean tables loaded to the model.

## Concepts covered
- **Power Query (M)** — The transformation layer that cleans and shapes data as ordered steps.
- **Query folding** — Pushes steps back to the source as a native query for fast refresh.
- **Merge vs Append** — Merge joins on a key; Append unions similarly-structured queries.
- **Data profiling** — Column quality/distribution views to find issues early.
- **Remove-columns-early** — Trimming unused columns early preserves folding and shrinks the model.

## Implementation steps
1. Connect and profile sources.
2. Remove unused columns early; keep steps foldable.
3. Merge lookups and Append similar extracts.
4. Verify folding is preserved.

## Outcomes
- Fast, foldable refresh.
- Clean, conformed source data.
- Smaller model footprint.

## Tech stack
`Power Query` · `M language`

## Why this project (profile relevance)
Efficient, foldable ETL keeps enterprise datasets refreshing quickly.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/microsoft-pl-300*
