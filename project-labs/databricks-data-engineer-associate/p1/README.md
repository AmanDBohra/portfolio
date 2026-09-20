# Insurance policy & claims medallion pipeline

**Certification:** Databricks Certified Data Engineer Associate (Databricks)
**Project 1 of 5**

> Build an end-to-end Bronze → Silver → Gold pipeline for policy and claims data feeding underwriting and claims dashboards.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-data-engineer-associate-1.svg)

## Architecture & data model
Landing zone (cloud storage) → Bronze Delta (raw policy & claims, +ingest metadata) → Silver Delta (validated, conformed to a policy/claim grain) → Gold Delta (star-style aggregates by product, region, period) → Databricks SQL dashboard. Unity Catalog governs all objects.

## Concepts covered
- **Medallion architecture** — A layered design where data flows Bronze (raw as-ingested) → Silver (cleaned, deduplicated, conformed) → Gold (aggregated, business-ready), so each layer has a clear contract and can be reprocessed independently.
- **Delta Lake** — Parquet files plus an ordered transaction log that adds ACID transactions, versioning/time travel, and schema enforcement — the reliable storage format for every layer here.
- **Spark SQL transformations** — CTAS, joins, and aggregations expressed in SQL to cleanse Silver and build Gold KPIs like written premium and loss ratio.
- **Managed vs external tables** — Managed tables let Databricks own the storage lifecycle (drop deletes data); external tables (LOCATION) keep files if dropped — Bronze often external over a landing zone, Gold managed.
- **Schema enforcement** — Delta rejects writes that don't match the table schema, preventing bad/mistyped data from silently corrupting downstream reports.

## Implementation steps
1. CREATE (or Auto Loader) Bronze tables; add input_file_name() and current_timestamp() columns for lineage.
2. Build Silver with CTAS: cast types, standardize dates/currency, dedupe on policy/claim keys, filter invalid rows.
3. Create conformed dimensions (product, region, distributor, date) and a claims/premium fact.
4. Aggregate Gold: SUM(written_premium), incurred/earned ratios, claim frequency grouped by product×region×month.
5. Expose Gold via SQL views for the dashboard; document definitions.

## Outcomes
- Decision-ready KPI tables (written premium, loss ratio, claim frequency) refreshed daily.
- Reprocessable layers — logic fixes rerun from Bronze without re-ingesting from source.
- Schema-enforced, deduplicated data that leadership can trust.

## Tech stack
`Delta Lake` · `Spark SQL` · `PySpark` · `Databricks SQL`

## Why this project (profile relevance)
Mirrors the international insurance analytics delivery — turning raw P&C data into decision-ready KPIs on a Lakehouse.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-data-engineer-associate*
