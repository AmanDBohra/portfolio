# Shuffle & partition optimization

**Certification:** Databricks Certified Associate Developer for Apache Spark (Databricks)
**Project 3 of 5**

> Cut runtime on a slow wide-transformation job.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-apache-spark-developer-3.svg)

## Architecture & data model
A slow wide-transformation job profiled in the Spark UI; shuffle partitions tuned, AQE enabled, output coalesced — with before/after metrics.

## Concepts covered
- **Narrow vs wide transformations** — Narrow (map/filter) need no shuffle; wide (groupBy/join) shuffle data and start new stages.
- **Shuffle & stages** — Shuffles move data across the network at stage boundaries — the main cost to manage.
- **repartition vs coalesce** — repartition = full shuffle (up/down, balanced); coalesce = no full shuffle (down only).
- **spark.sql.shuffle.partitions** — Controls post-shuffle partition count (default 200); tune for parallelism vs overhead.
- **Adaptive Query Execution (AQE)** — Re-optimizes at runtime: coalesces partitions, switches joins, handles skew.

## Implementation steps
1. Identify heavy shuffles/skew in the Spark UI (Shuffle Read/Write, straggler tasks).
2. Enable AQE; adjust spark.sql.shuffle.partitions.
3. coalesce before writing to control output files.
4. Compare stage/task durations before and after.

## Outcomes
- Reduced shuffle volume and runtime.
- Balanced partitions, fewer stragglers.
- Documented performance improvement.

## Tech stack
`Spark UI` · `AQE` · `PySpark`

## Why this project (profile relevance)
Performance diagnosis mirrors re-engineering heavy jobs for speed.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-apache-spark-developer*
