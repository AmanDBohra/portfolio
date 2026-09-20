# Real-time claims streaming with watermarks & exactly-once

**Certification:** Databricks Certified Data Engineer Professional (Databricks)
**Project 1 of 5**

> Process a claims event stream into Delta with late-data handling and no duplicates on restart.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-data-engineer-professional-1.svg)

## Architecture & data model
Claims event source (Kafka/files) → Structured Streaming with watermark → windowed aggregates → Delta sink via foreachBatch (idempotent), checkpointed for recovery.

## Concepts covered
- **Structured Streaming** — Processes an unbounded claims event stream as incremental micro-batches into Delta.
- **Watermarking** — withWatermark bounds how long late events are accepted so windowed state doesn't grow forever.
- **Stateful aggregations** — Windowed counts/sums keep state across batches; the watermark expires old state.
- **Checkpointing** — Persists offsets and state so the query resumes exactly-once after a restart.
- **Exactly-once / idempotency** — txnAppId/txnVersion in foreachBatch (or MERGE on a key) prevents duplicate writes on retry.

## Implementation steps
1. readStream the claims source; apply withWatermark on the event-time column.
2. Aggregate windowed metrics (claims/hour by region) in update output mode.
3. Write via foreachBatch with txnAppId/txnVersion for exactly-once.
4. Set a checkpointLocation; tune trigger and maxOffsets/FilesPerTrigger.
5. Test recovery by killing and restarting the stream.

## Outcomes
- Near-real-time operational metrics with correct late-data handling.
- Exactly-once results that survive restarts.
- Bounded, predictable state and cost.

## Tech stack
`Structured Streaming` · `Delta Lake` · `foreachBatch`

## Why this project (profile relevance)
Advanced streaming reliability for time-sensitive insurance operations reporting.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-data-engineer-professional*
