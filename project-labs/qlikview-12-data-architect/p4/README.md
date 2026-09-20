# Connector-less / non-standard source integration

**Certification:** QlikView 12 Data Architect (QV12DA) (Qlik)
**Project 4 of 5**

> Load data where standard connectors are limited (e.g., SAP-style extracts).

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/qlikview-12-data-architect-4.svg)

## Architecture & data model
Non-standard source extracts (e.g., SAP-style) staged to QVD, refactored with mapping/preceding loads, updated via partial reloads, scheduled daily.

## Concepts covered
- **Custom extract loads** — Build extract logic where standard connectors are limited.
- **Mapping/ApplyMap** — Normalize codes to descriptions without row duplication.
- **Data refactoring** — Reshape source structures for a clean model.
- **Binary/partial reload** — BINARY copies a model; partial reload updates parts incrementally.
- **Scheduling** — Reliable daily refresh of the extracts/app.

## Implementation steps
1. Build extract logic into QVDs (with source teams).
2. Refactor/normalize with mapping and preceding loads.
3. Use partial reloads (Add/Replace/Delete) for targeted updates.
4. Schedule reliable daily refreshes.

## Outcomes
- Data loaded despite connector limits.
- Clean, normalized model.
- Reliable refresh.

## Tech stack
`QlikView` · `QVD` · `Load script`

## Why this project (profile relevance)
Mirrors the connector-less SAP-to-BI integration on your portfolio.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/qlikview-12-data-architect*
