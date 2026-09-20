# Incremental load with inserts, updates & deletes

**Certification:** QlikView 12 Data Architect (QV12DA) (Qlik)
**Project 2 of 5**

> Refresh large facts efficiently and correctly.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/qlikview-12-data-architect-2.svg)

## Architecture & data model
Capture last max date → load changed rows → retain old rows WHERE NOT EXISTS → reconcile deletes → STORE QVD.

## Concepts covered
- **Incremental load** — Load only new/changed rows and combine with the stored QVD.
- **WHERE NOT EXISTS** — Append only keys not already loaded, avoiding duplicates.
- **Delete reconciliation** — Drop rows whose keys no longer exist in the source.
- **Optimized QVD (WHERE EXISTS exception)** — A single WHERE EXISTS keeps the load optimized.
- **Peek/Max for cutoffs** — Read last max modified date to filter the source.

## Implementation steps
1. Capture last max modified date via resident Max()/Peek.
2. Load changed rows; retain old rows WHERE NOT EXISTS(key).
3. Reconcile deletes against current source keys.
4. Validate row counts vs source totals.

## Outcomes
- Efficient CRUD incremental loads.
- No duplicates.
- Validated correctness.

## Tech stack
`QlikView` · `QVD` · `Load script`

## Why this project (profile relevance)
Efficient incremental loading was key to re-engineering heavy reports.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/qlikview-12-data-architect*
