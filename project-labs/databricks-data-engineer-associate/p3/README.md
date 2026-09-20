# Slowly-refreshed dimensions with MERGE (upserts)

**Certification:** Databricks Certified Data Engineer Associate (Databricks)
**Project 3 of 5**

> Keep a distributor and product dimension current from a source that sends inserts and updates.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-data-engineer-associate-3.svg)

## Architecture & data model
Daily change extracts → staging table → MERGE into the managed dimension table (Delta) → consumed by Gold facts. History and audit come from the Delta log; OPTIMIZE/VACUUM manage files/retention.

## Concepts covered
- **MERGE INTO (upsert)** — A single atomic statement that updates matched rows and inserts new ones (and can delete), keeping a dimension current from a change feed.
- **Primary keys** — A stable business/surrogate key (e.g., distributor_id) is the MERGE match condition and guarantees one row per entity.
- **Delta transaction log** — The ordered commit log that makes MERGE atomic and enables versioning and auditability.
- **Time travel** — SELECT ... VERSION AS OF / TIMESTAMP AS OF reads a prior snapshot — useful to compare before/after a MERGE or recover from a bad load.
- **DESCRIBE HISTORY** — Lists every version with operation, timestamp, and user — the audit trail for the dimension.

## Implementation steps
1. Load the daily changes into a staging Delta table.
2. MERGE INTO dim USING staging ON dim.key = staging.key WHEN MATCHED THEN UPDATE ... WHEN NOT MATCHED THEN INSERT ...
3. Run DESCRIBE HISTORY to inspect the operation; use VERSION AS OF to diff.
4. Schedule OPTIMIZE (compaction) and VACUUM (retention) as maintenance.
5. If a bad MERGE occurs, RESTORE to the prior version.

## Outcomes
- Always-current dimensions with one row per entity, no duplicates.
- Auditable change history and one-command recovery.
- Compact, well-maintained Delta tables.

## Tech stack
`Delta Lake` · `Spark SQL` · `MERGE` · `OPTIMIZE / VACUUM`

## Why this project (profile relevance)
Upserts and auditable history are core to trustworthy reporting dimensions in insurance BI.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-data-engineer-associate*
