# RFM customer segmentation in pure SQL

**Certification:** SQL (Advanced) (HackerRank)
**Project 4 of 5**

> Re-implement the dissertation's RFM (Recency, Frequency, Monetary) customer scoring as a single SQL query instead of a pandas pipeline.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/hackerrank-sql-advanced-4.svg)

## Concepts covered
- **CTEs**
- **Aggregation**
- **CASE expressions**
- **NTILE / percentile-style bucketing**

## Tech stack
`SQL` · `CTEs` · `Window functions`

## Why this project (profile relevance)
A direct SQL-only counterpart to customer_segmentation.py in the FMCG Retail Sales Analysis project — same logic, different tool.

## Run it
Open `notebook.ipynb` — it spins up an in-memory SQLite database with synthetic sample data and runs the actual SQL for this project, so it's runnable with just Python's built-in `sqlite3` module (no server setup required).

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/hackerrank-sql-advanced*
