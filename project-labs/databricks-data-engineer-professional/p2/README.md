# SCD Type 2 + Change Data Feed propagation

**Certification:** Databricks Certified Data Engineer Professional (Databricks)
**Project 2 of 5**

> Maintain full history of policy/distributor dimensions and propagate only changes downstream.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-data-engineer-professional-2.svg)

## Architecture & data model
Silver dimension maintained as SCD2 via MERGE; CDF enabled. Gold consumes readChangeFeed(startingVersion) and MERGEs incrementally. Facts use temporal joins on validity ranges.

## Concepts covered
- **SCD Type 1 vs Type 2** — Type 1 overwrites (no history); Type 2 keeps every version with valid-from/to for point-in-time accuracy.
- **Change Data Feed (CDF)** — delta.enableChangeDataFeed records row-level inserts/updates/deletes so downstream reads only what changed.
- **MERGE (close + insert)** — On a change, MERGE expires the current row (end date, is_current=false) and inserts a new current row.
- **Point-in-time joins** — Facts join the dimension version valid at each event's timestamp for historically-correct reporting.
- **Incremental gold** — Reading Silver's CDF, only changed rows are MERGEd into Gold — no full recompute.

## Implementation steps
1. Enable CDF on the Silver dimension.
2. MERGE changes: close prior rows, insert new current rows (SCD2).
3. Read CDF (readChangeFeed, startingVersion) downstream.
4. MERGE only changed rows into Gold aggregates.
5. Implement point-in-time fact→dim joins on valid-from/to.

## Outcomes
- Full, auditable dimension history.
- Efficient incremental Gold updates.
- Historically-correct point-in-time reporting.

## Tech stack
`Delta Lake` · `Change Data Feed` · `MERGE`

## Why this project (profile relevance)
Point-in-time-correct reporting is essential for audited insurance analytics.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-data-engineer-professional*
