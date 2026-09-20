# QVD staging & incremental load

**Certification:** Qlik Sense Data Architect (QSDA 2024) (Qlik)
**Project 2 of 5**

> Speed reloads by staging to QVDs and loading only new/changed rows.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/qlik-sense-data-architect-2.svg)

## Architecture & data model
Sources → extract QVDs → incremental logic (max modified date variable) → concatenate + STORE back to QVD → app loads optimized QVDs.

## Concepts covered
- **QVD (optimized load)** — Qlik's binary staging format; optimized loads stream directly into memory, very fast.
- **Incremental load** — Fetch only new/changed rows and combine with the stored QVD.
- **WHERE NOT EXISTS** — Loads only keys not already present, avoiding duplicates on append.
- **STORE/LOAD** — STORE writes in-memory tables to QVD; LOAD reads them back (optimized).
- **Handling updates/deletes** — Update by taking fresh rows + WHERE NOT EXISTS; reconcile deletes against current keys.

## Implementation steps
1. Extract sources to QVDs; capture last max modified date in a variable.
2. Load newer rows; concatenate retained rows WHERE NOT EXISTS(key).
3. Reconcile deletes against current source keys.
4. Keep optimized loads (single WHERE EXISTS exception).

## Outcomes
- Fast, incremental reloads.
- No duplicates on append.
- Reduced source load.

## Tech stack
`Qlik Sense` · `QVD` · `Load script`

## Why this project (profile relevance)
Incremental QVD architecture is standard for large enterprise reloads.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/qlik-sense-data-architect*
