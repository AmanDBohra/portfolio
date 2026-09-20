# Governed analyst data layer

**Certification:** Databricks Certified Data Analyst Associate (Databricks)
**Project 5 of 5**

> Create reusable, secured views and gold tables for a reporting team.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-data-analyst-associate-5.svg)

## Architecture & data model
Governed views/gold tables in Unity Catalog form one source of truth; analysts query via serverless warehouses with result caching.

## Concepts covered
- **Views vs tables** — Views store logic (always current); tables store data (may go stale) — views for reusable shaping.
- **Unity Catalog (three-level namespace)** — catalog.schema.table governs analyst objects consistently.
- **Permissions (SELECT + USE)** — Grant SELECT plus USE CATALOG/SCHEMA to the analyst group.
- **Result caching** — Repeated identical queries return faster from cache.
- **Serverless performance** — Fast-starting, autoscaling compute for bursty analyst workloads.

## Implementation steps
1. Build governed views shaping data for common reports.
2. GRANT SELECT (+USE) to the analyst group.
3. Leverage result caching for repeats.
4. Document definitions as the single source of truth.

## Outcomes
- Consistent, governed data for all analysts.
- Faster repeated queries.
- Reduced metric drift across reports.

## Tech stack
`Databricks SQL` · `Unity Catalog` · `Views`

## Why this project (profile relevance)
One governed source of truth is central to consistent enterprise BI.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-data-analyst-associate*
