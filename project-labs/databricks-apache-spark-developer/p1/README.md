# DataFrame transformations on large premium data

**Certification:** Databricks Certified Associate Developer for Apache Spark (Databricks)
**Project 1 of 5**

> Build a cleansing/enrichment job over a large premium dataset using the DataFrame API.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-apache-spark-developer-1.svg)

## Architecture & data model
Source (Delta/Parquet) → DataFrame read with explicit schema → chained narrow transformations → action writes the enriched output. Plan inspected via explain().

## Concepts covered
- **Transformations vs actions** — Transformations (select/filter/withColumn) are lazy and build a plan; actions (write/count) trigger execution.
- **select/filter/withColumn** — Core DataFrame operations to project, filter, and derive columns, each returning a new immutable DataFrame.
- **Column expressions (F.col, when, lit)** — Build typed column logic (e.g., conditional flags) that Catalyst can optimize.
- **Casting & date functions** — CAST/to_date/date_format normalize types and derive time attributes for analytics.
- **Immutability & lazy evaluation** — DataFrames never mutate; laziness lets Catalyst optimize the whole plan before anything runs.

## Implementation steps
1. Read with a defined StructType to avoid an inference pass.
2. Chain filter/withColumn/cast (lazy) to cleanse and enrich.
3. Add flags with when().otherwise().
4. Trigger with write/count; review the physical plan via explain().

## Outcomes
- Reusable, optimized cleansing job.
- Type-safe, well-structured output.
- Understanding of the generated plan.

## Tech stack
`PySpark DataFrame API` · `pyspark.sql.functions`

## Why this project (profile relevance)
Core Spark coding behind enterprise ETL and feature preparation.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-apache-spark-developer*
