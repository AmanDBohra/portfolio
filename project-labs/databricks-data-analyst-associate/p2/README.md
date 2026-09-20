# Interactive, parameterized distributor report

**Certification:** Databricks Certified Data Analyst Associate (Databricks)
**Project 2 of 5**

> Let leaders slice distributor performance by region and period.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-data-analyst-associate-2.svg)

## Architecture & data model
A parameterized query (region/date via query-based dropdowns) structured with CTEs powers several linked visuals on one dashboard.

## Concepts covered
- **Query parameters** — Inputs (region/date) that re-run the query with the chosen value for interactivity.
- **Query-based dropdowns** — Parameter choices populated from a query so options stay in sync with data.
- **CTEs** — WITH clauses that name intermediate results for readable, reusable queries.
- **Filtering (WHERE vs HAVING)** — WHERE filters rows pre-aggregation; HAVING filters aggregated groups.
- **Cross-visual interactivity** — Shared parameters drive multiple visuals from one control.

## Implementation steps
1. Add region/date parameters (query-based dropdowns).
2. Structure the query with CTEs.
3. Use HAVING to filter aggregated groups (e.g., premium > threshold).
4. Wire the parameters across multiple visuals.

## Outcomes
- One reusable, interactive report for many slices.
- Readable, maintainable SQL.
- Consistent filtering across visuals.

## Tech stack
`Databricks SQL` · `Parameters` · `CTEs`

## Why this project (profile relevance)
Self-service, parameter-driven reporting is a core BI deliverable.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-data-analyst-associate*
