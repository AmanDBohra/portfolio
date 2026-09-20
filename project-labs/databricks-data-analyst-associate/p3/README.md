# Window-function analytics: trends & rankings

**Certification:** Databricks Certified Data Analyst Associate (Databricks)
**Project 3 of 5**

> Show month-over-month change and top-N distributors without collapsing rows.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-data-analyst-associate-3.svg)

## Architecture & data model
Gold fact queried with window functions to produce MoM change, running totals, per-region top-N, and % of total — surfaced in a dashboard.

## Concepts covered
- **Window functions (ROW_NUMBER, RANK, LAG)** — Rank rows and compare to prior rows without collapsing them.
- **Running totals (SUM OVER)** — Cumulative sums over an ordered window for trends.
- **% of total** — value / SUM(value) OVER () gives each row's share of the whole.
- **date_trunc for periods** — Normalizes timestamps to month/week for clean grouping.
- **Top-N per group** — ROW_NUMBER partitioned by group, filtered to rn<=N.

## Implementation steps
1. Group by month via date_trunc.
2. Compute MoM change with LAG over an ordered window.
3. Rank distributors per region with ROW_NUMBER; keep rn<=5.
4. Add % of total via SUM(x) OVER ().

## Outcomes
- Trend, ranking, and contribution analytics.
- No self-joins needed for period comparisons.
- Clear top-performer views.

## Tech stack
`Databricks SQL` · `Window functions`

## Why this project (profile relevance)
Advanced SQL analytics for nuanced performance insight.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-data-analyst-associate*
