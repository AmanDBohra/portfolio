# Associative insurance data model

**Certification:** Qlik Sense Data Architect (QSDA 2024) (Qlik)
**Project 1 of 5**

> Build a clean, synthetic-key-free model for policy/claims/distributor data.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/qlik-sense-data-architect-1.svg)

## Architecture & data model
Sources loaded and validated in the model viewer; keys named deliberately; a link table connects multiple facts to shared dimensions.

## Concepts covered
- **Associative model** — Qlik links tables by identical field names; naming is effectively the data model.
- **Synthetic keys** — Auto-created when tables share 2+ fields; usually resolved to keep the model clean.
- **Circular references** — Association loops causing ambiguity; broken via renaming or a link table.
- **Star schema / link table** — A central fact + dimensions (or a link table for multi-fact) avoids synthetic keys/loops.
- **Key naming** — Deliberate key names (e.g., %CustomerKey) ensure only intended tables associate.

## Implementation steps
1. Load sources; inspect for synthetic keys/loops.
2. Rename/qualify coincidental fields; build composite keys where needed.
3. Introduce a link table for shared dimensions.
4. Validate associations in the data model viewer.

## Outcomes
- Clean, synthetic-key-free model.
- Unambiguous associations.
- Fast, correct dashboards.

## Tech stack
`Qlik Sense` · `Load script`

## Why this project (profile relevance)
Clean models underpin fast, correct Qlik dashboards you've delivered.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/qlik-sense-data-architect*
