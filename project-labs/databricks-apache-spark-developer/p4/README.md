# Caching & broadcast strategy

**Certification:** Databricks Certified Associate Developer for Apache Spark (Databricks)
**Project 4 of 5**

> Speed up an iterative job that reuses a base dataset and joins small lookups.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-apache-spark-developer-4.svg)

## Architecture & data model
An iterative job caches a reused base DataFrame, broadcasts small lookups, and salts a skewed key — verified via the physical plan.

## Concepts covered
- **cache/persist storage levels** — MEMORY_ONLY vs MEMORY_AND_DISK trade recomputation for spill; choose per reuse pattern.
- **When caching helps vs hurts** — Cache datasets reused multiple times; over-caching wastes memory and causes eviction.
- **Broadcast join threshold** — Tables under spark.sql.autoBroadcastJoinThreshold auto-broadcast; broadcast() forces it.
- **Skew (salting)** — Add randomness to hot keys to spread them across partitions and relieve stragglers.
- **Predicate/column pruning** — Catalyst pushes filters and reads only needed columns to cut I/O.

## Implementation steps
1. cache() the reused base; confirm reuse across actions.
2. broadcast() small lookup tables in joins.
3. Detect a skewed key; salt it or rely on AQE skew handling.
4. Confirm pushdown/pruning in explain(); unpersist when done.

## Outcomes
- Faster iterations via avoided recomputation.
- Shuffle-free small-table joins.
- Mitigated skew and reduced I/O.

## Tech stack
`PySpark` · `cache/persist` · `broadcast()`

## Why this project (profile relevance)
Efficient large-scale processing underpins data-science and BI feeds.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-apache-spark-developer*
