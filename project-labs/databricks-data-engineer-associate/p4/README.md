# Declarative quality pipeline with Delta Live Tables

**Certification:** Databricks Certified Data Engineer Associate (Databricks)
**Project 4 of 5**

> Rebuild the claims pipeline declaratively with built-in data-quality checks.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-data-engineer-associate-4.svg)

## Architecture & data model
A DLT pipeline defines bronze (streaming ingest), silver (cleaned with expectations), and gold (aggregates) as LIVE tables; violating rows route to a quarantine table. Runs triggered on a schedule.

## Concepts covered
- **Delta Live Tables** — A declarative framework where you define target tables and transformations and DLT manages orchestration, dependencies, and error handling.
- **Streaming vs live tables** — STREAMING LIVE TABLE processes data incrementally from a streaming source; LIVE TABLE is recomputed each run — choose per source and latency need.
- **Expectations (warn/drop/fail)** — CONSTRAINT ... EXPECT rules enforce data quality: track violations (warn), drop offending rows, or fail the pipeline.
- **Pipeline dependencies** — DLT infers the DAG from LIVE.<table> references, so bronze→silver→gold run in the correct order automatically.
- **Triggered vs continuous** — Triggered mode processes available data then stops (scheduled batch); continuous keeps running for low latency.

## Implementation steps
1. Declare bronze as a STREAMING LIVE TABLE reading raw claims.
2. Declare silver referencing LIVE.bronze; add expectations (drop null policy IDs, warn negative premium).
3. Route quarantined rows to a separate table for review.
4. Declare gold aggregates referencing LIVE.silver.
5. Configure the pipeline in triggered mode with a schedule.

## Outcomes
- Self-orchestrating pipeline with built-in data-quality gates.
- Quarantined bad records instead of silent corruption or full failure.
- Less orchestration code to maintain.

## Tech stack
`Delta Live Tables` · `Spark SQL / Python` · `Delta Lake`

## Why this project (profile relevance)
Embeds the maker/checker, quality-first discipline used on governed enterprise pipelines.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-data-engineer-associate*
