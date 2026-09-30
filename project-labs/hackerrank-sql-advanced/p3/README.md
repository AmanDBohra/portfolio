# Sales ranking & running totals with window functions

**Certification:** SQL (Advanced) (HackerRank)
**Project 3 of 5**

> Produce a 'top 3 products per region' leaderboard and a running monthly revenue total, without collapsing the underlying rows.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/hackerrank-sql-advanced-3.svg)

## Concepts covered
- **ROW_NUMBER / RANK / DENSE_RANK**
- **PARTITION BY**
- **Running aggregates (frame clauses)**

## Tech stack
`SQL` · `Window functions`

## Why this project (profile relevance)
The ranking/trend logic that feeds directly into BI dashboard visuals (leaderboards, cumulative charts).

## Run it
Open `notebook.ipynb` — it spins up an in-memory SQLite database with synthetic sample data and runs the actual SQL for this project, so it's runnable with just Python's built-in `sqlite3` module (no server setup required).

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/hackerrank-sql-advanced*
