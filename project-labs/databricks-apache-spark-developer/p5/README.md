# Complex/nested data & performant IO

**Certification:** Databricks Certified Associate Developer for Apache Spark (Databricks)
**Project 5 of 5**

> Flatten nested JSON claims and write an analytics-ready Parquet/Delta table.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-apache-spark-developer-5.svg)

## Architecture & data model
Nested JSON claims → from_json + explode → flattened DataFrame → written as date-partitioned Delta/Parquet, queried via a temp view.

## Concepts covered
- **from_json / explode / struct access** — Parse JSON to structs, explode arrays to rows, and access nested fields via dot notation.
- **Higher-order handling** — Process array/map columns with built-in functions instead of slow UDFs.
- **Parquet vs CSV (schema, pushdown)** — Parquet is self-describing and columnar, enabling pushdown/pruning; CSV needs inference.
- **partitionBy on write** — Writing partitioned by date enables partition pruning on later reads.
- **Avoiding UDF overhead** — Row-at-a-time Python UDFs serialize data and block Catalyst; prefer built-ins/pandas UDFs.

## Implementation steps
1. Parse nested JSON with from_json into structs; explode arrays.
2. Access nested fields with dot notation; use built-ins over UDFs.
3. Write partitioned by date for pruning.
4. createOrReplaceTempView and query with spark.sql.

## Outcomes
- Analytics-ready table from messy nested source.
- Efficient, prunable storage layout.
- No UDF performance penalty.

## Tech stack
`PySpark` · `Parquet/Delta` · `Spark SQL`

## Why this project (profile relevance)
Handling messy, nested source data is routine in enterprise ingestion.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-apache-spark-developer*
