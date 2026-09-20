# DAX measures & time intelligence

**Certification:** Microsoft Power BI Data Analyst Associate (PL-300) (Microsoft)
**Project 3 of 5**

> Deliver YoY, YTD, and share-of-total metrics.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/microsoft-pl-300-3.svg)

## Architecture & data model
Base measures + CALCULATE variants + time-intelligence (YoY/YTD) built on the marked date table, refactored with VAR.

## Concepts covered
- **CALCULATE & filter context** — The core function that modifies filter context to compute segmented metrics.
- **Row vs filter context** — Row context (iterators/columns) vs filter context (slicers/visuals/CALCULATE).
- **Iterators (SUMX)** — Row-by-row computation then aggregation (e.g., Qty×Price line revenue).
- **Time intelligence (SAMEPERIODLASTYEAR, TOTALYTD)** — Period comparisons requiring a marked date table.
- **DIVIDE / VAR** — DIVIDE handles divide-by-zero; VAR improves readability/performance.

## Implementation steps
1. Write base measures, then CALCULATE variants for regions/segments.
2. Add YoY with SAMEPERIODLASTYEAR + DIVIDE.
3. Use SUMX for line-level revenue.
4. Refactor with VAR for clarity/performance.

## Outcomes
- Accurate YoY/YTD and segmented metrics.
- Safe ratios (no divide-by-zero).
- Readable, performant DAX.

## Tech stack
`DAX` · `Power BI`

## Why this project (profile relevance)
The analytical heart of executive insurance dashboards.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/microsoft-pl-300*
