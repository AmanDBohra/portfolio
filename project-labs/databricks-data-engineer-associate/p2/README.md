# Incremental distributor-premium ingestion with Auto Loader

**Certification:** Databricks Certified Data Engineer Associate (Databricks)
**Project 2 of 5**

> Continuously ingest daily distributor premium extracts as they land in cloud storage, with no duplicates or full reloads.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-data-engineer-associate-2.svg)

## Architecture & data model
Distributor extracts land in cloud storage → Auto Loader stream (cloudFiles + schemaLocation) → Bronze Delta streaming table (checkpointed) → downstream Silver/Gold. A COPY INTO variant handles a smaller, known monthly file set.

## Concepts covered
- **Auto Loader (cloudFiles)** — spark.readStream.format('cloudFiles') incrementally and idempotently discovers and ingests new files as they land, tracking what's been processed so it scales to millions of files.
- **Schema evolution** — Auto Loader persists the inferred schema in schemaLocation and can add new columns automatically when the source adds fields, rather than failing the load.
- **Incremental processing** — Only new/changed data is processed each run, avoiding full reloads and cutting cost and latency.
- **Structured Streaming basics** — A continuous DataFrame computation over an unbounded input; here used in micro-batch mode to append new files to Bronze.
- **Checkpointing** — checkpointLocation records source progress and state so a restarted stream resumes exactly where it left off (exactly-once to Delta).

## Implementation steps
1. Configure spark.readStream.format('cloudFiles') with cloudFiles.format and cloudFiles.schemaLocation.
2. Set schemaEvolutionMode to add new columns; capture unmatched fields via the _rescued_data column.
3. writeStream to a Bronze Delta table with a checkpointLocation and Trigger.AvailableNow for scheduled batches.
4. Add a COPY INTO alternative demonstrating idempotent reloads of known files.
5. Validate no duplicates by re-running and confirming row counts.

## Outcomes
- Hands-off daily ingestion that never double-loads files.
- Resilient to schema drift from source systems.
- Lower reload time and cost vs full refreshes.

## Tech stack
`Auto Loader` · `Structured Streaming` · `Delta Lake` · `COPY INTO`

## Why this project (profile relevance)
Reflects distributor-performance KPI feeds where daily extracts must load reliably and incrementally.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-data-engineer-associate*
