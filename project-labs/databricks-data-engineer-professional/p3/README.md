# Large-table performance tuning

**Certification:** Databricks Certified Data Engineer Professional (Databricks)
**Project 3 of 5**

> Make a multi-billion-row premium fact fast for filtered queries and MERGE.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-data-engineer-professional-3.svg)

## Architecture & data model
A multi-billion-row premium fact tuned via OPTIMIZE+ZORDER (or liquid clustering) on policy/date/region, deletion vectors enabled, sensible partitioning — validated in the Spark UI.

## Concepts covered
- **OPTIMIZE / ZORDER** — Compacts small files and co-locates data by filter/join keys so queries skip irrelevant files.
- **Liquid clustering** — Maintains clustering on chosen keys without rigid partition directories, adapting to evolving writes.
- **Deletion vectors** — Mark changed/removed rows without rewriting whole files, greatly speeding UPDATE/DELETE/MERGE.
- **Partitioning strategy** — Partition on low-cardinality columns (e.g., date); avoid high-cardinality partitions that create tiny files.
- **File sizing / small-file problem** — Many tiny files slow reads/metadata; compaction restores healthy file sizes.

## Implementation steps
1. Diagnose small files/skew via DESCRIBE DETAIL and Spark UI shuffle metrics.
2. OPTIMIZE with ZORDER on common filter/join keys (or enable liquid clustering).
3. Enable deletion vectors for fast updates.
4. Right-size partitioning; avoid high-cardinality partition columns.
5. Benchmark query and MERGE runtimes before/after.

## Outcomes
- Large reductions in files scanned and query latency.
- Faster MERGE/UPDATE with less write amplification.
- Documented before/after performance gains.

## Tech stack
`Delta Lake` · `OPTIMIZE / ZORDER` · `Spark UI`

## Why this project (profile relevance)
Mirrors re-engineering heavy reports for performance — a career signature.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-data-engineer-professional*
