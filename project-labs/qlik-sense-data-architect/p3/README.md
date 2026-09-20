# Transformations: joins, mapping & crosstables

**Certification:** Qlik Sense Data Architect (QSDA 2024) (Qlik)
**Project 3 of 5**

> Shape messy source data into an analytics-ready model.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/qlik-sense-data-architect-3.svg)

## Architecture & data model
Messy sources shaped via ApplyMap, preceding loads, crosstable, subfield, and IntervalMatch into an analytics-ready model.

## Concepts covered
- **JOIN vs CONCATENATE vs KEEP** — JOIN merges columns (can multiply rows); CONCATENATE unions rows; KEEP reduces but keeps tables separate.
- **ApplyMap (mapping load)** — Key-based single-value lookup that never duplicates rows — often better than JOIN.
- **Preceding load** — Transform a load's output in one pass without a resident second pass.
- **Crosstable/Generic load** — Crosstable pivots wide data to long; Generic turns attribute rows into columns.
- **Subfield/IntervalMatch** — Subfield splits delimited values; IntervalMatch maps values to ranges.

## Implementation steps
1. Use ApplyMap for single-value lookups (no duplication).
2. Concatenate multi-source facts with a source flag; JOIN only where safe.
3. Pivot wide data with CROSSTABLE; split multi-values with Subfield.
4. Bucket ranges (age bands) with IntervalMatch.

## Outcomes
- Clean model from imperfect sources.
- No accidental row explosion.
- Reusable transform patterns.

## Tech stack
`Qlik Sense` · `Load script`

## Why this project (profile relevance)
Robust transformation patterns for real, imperfect source systems.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/qlik-sense-data-architect*
