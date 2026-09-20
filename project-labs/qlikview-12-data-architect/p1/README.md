# Layered QVD architecture (Extract–Transform–Present)

**Certification:** QlikView 12 Data Architect (QV12DA) (Qlik)
**Project 1 of 5**

> Separate extraction, modeling, and presentation into reusable QVD layers.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/qlikview-12-data-architect-1.svg)

## Architecture & data model
Extractor QVDs (raw) → transformer QVDs (modeled) → app loads curated, optimized QVDs.

## Concepts covered
- **QVD layering** — Extract/Transform/Present QVD layers separate concerns and speed reloads.
- **Extract vs transform vs present** — Extract raw to QVD, model in transform, serve curated QVDs to the app.
- **Optimized loads** — Read QVDs without transformation to stream directly into memory.
- **Reusability** — Curated QVDs are reused across multiple apps.
- **Reload reliability** — Decoupling means source outages don't break app reloads.

## Implementation steps
1. Extract raw sources to QVDs (minimal transformation).
2. Transform/model into curated QVDs (keys, cleansing, calendar).
3. Load the app from curated QVDs.
4. Decouple so source outages don't break reloads.

## Outcomes
- Reusable, fast reloads.
- Resilient pipelines.
- Clear separation of concerns.

## Tech stack
`QlikView` · `QVD` · `Load script`

## Why this project (profile relevance)
Reflects the enterprise QlikView estates you engineered early in your career.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/qlikview-12-data-architect*
