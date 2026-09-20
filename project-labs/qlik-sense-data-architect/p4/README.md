# Master calendar & performance tuning

**Certification:** Qlik Sense Data Architect (QSDA 2024) (Qlik)
**Project 4 of 5**

> Add a gap-free calendar and optimize memory/reload.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/qlik-sense-data-architect-4.svg)

## Architecture & data model
A generated master calendar + reduced-cardinality keys + precomputed flags feed lean, fast charts.

## Concepts covered
- **Master calendar generation** — A gap-free date table with Year/Quarter/Month for reliable time analysis.
- **Cardinality reduction (split datetime)** — Splitting timestamps into Date + Time cuts distinct values and memory.
- **AutoNumber keys** — Compresses composite/text keys into small integers.
- **Optimized QVD loads** — Avoid transformations on QVD reads to keep them fast.
- **Precomputed flags** — Compute flags in the script so charts don't recompute per interaction.

## Implementation steps
1. Generate a continuous date table with derived fields.
2. Split timestamps into Date + Time.
3. AutoNumber large composite keys.
4. Precompute flags in the script.

## Outcomes
- Reliable time analysis.
- Lower memory footprint.
- Faster chart rendering.

## Tech stack
`Qlik Sense` · `Load script`

## Why this project (profile relevance)
Performance and clean time analysis are hallmarks of good Qlik delivery.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/qlik-sense-data-architect*
