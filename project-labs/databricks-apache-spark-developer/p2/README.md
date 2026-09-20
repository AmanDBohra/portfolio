# Joins, aggregations & window functions

**Certification:** Databricks Certified Associate Developer for Apache Spark (Databricks)
**Project 2 of 5**

> Produce per-distributor and per-region metrics with rankings.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-apache-spark-developer-2.svg)

## Architecture & data model
Premium fact joined to broadcast dimensions → groupBy aggregates → window rankings/lags → results written for BI. AQE assists at runtime.

## Concepts covered
- **Join types (inner/left/semi/anti)** — Choose the join by intent: keep matches (inner), keep left (left), existence (semi), non-matches (anti).
- **groupBy + agg** — Aggregate multiple metrics per group in one pass (wide transformation → shuffle).
- **Window functions (rank, lag)** — Compute rankings and period-over-period changes without collapsing rows.
- **Broadcast joins** — Replicate a small dimension to all executors to avoid shuffling the large fact.
- **Distinct counts** — countDistinct (or approx_count_distinct for scale) for unique customers/policies.

## Implementation steps
1. Broadcast small dims and join to the fact.
2. groupBy region/distributor; agg sum(premium), countDistinct(customer).
3. Rank within region via Window.partitionBy/orderBy.
4. Compute MoM change with lag() over an ordered window.

## Outcomes
- Distributor/region KPIs with rankings at scale.
- Efficient joins avoiding unnecessary shuffles.
- Period comparisons in a single job.

## Tech stack
`PySpark` · `Window` · `broadcast()`

## Why this project (profile relevance)
Distributor KPI computation at scale — a direct analog of real deliverables.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-apache-spark-developer*
