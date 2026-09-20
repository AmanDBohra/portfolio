# Insurance KPI dashboard in Databricks SQL

**Certification:** Databricks Certified Data Analyst Associate (Databricks)
**Project 1 of 5**

> Build an executive claims/premium dashboard on Gold Lakehouse tables.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-data-analyst-associate-1.svg)

## Architecture & data model
Gold Lakehouse tables → saved SQL queries → visualizations → a dashboard on a serverless SQL warehouse with daily refresh.

## Concepts covered
- **SQL warehouses** — The compute that runs Databricks SQL; serverless starts fast and autoscales for interactive dashboards.
- **Queries (joins, aggregations)** — SQL over Gold tables to compute premium, loss ratio, and claim frequency.
- **Visualizations** — Charts attached to queries (counter, line, bar) chosen to fit each metric.
- **Dashboards** — Assemble visualizations into one view with scheduled refresh.
- **Counter/KPI vs line vs bar** — Counter for headline numbers, line for trends, bar for category comparison.

## Implementation steps
1. Write queries for premium, loss ratio, and claim frequency by period/region.
2. Add a counter (headline), line (trend), and bars (by region).
3. Assemble into a dashboard; set a serverless warehouse.
4. Schedule a daily refresh.

## Outcomes
- Executive KPI dashboard refreshed daily.
- Right visual per metric for fast reading.
- Low-cost, fast serverless compute.

## Tech stack
`Databricks SQL` · `SQL warehouse` · `Dashboards`

## Why this project (profile relevance)
Directly mirrors insurance KPI reporting delivered to leadership.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-data-analyst-associate*
