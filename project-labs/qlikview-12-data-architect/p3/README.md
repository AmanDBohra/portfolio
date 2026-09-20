# Clean data model & key handling

**Certification:** QlikView 12 Data Architect (QV12DA) (Qlik)
**Project 3 of 5**

> Eliminate synthetic keys and circular references.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/qlikview-12-data-architect-3.svg)

## Architecture & data model
A clean star/link model with composite AutoNumber keys, validated in the Table Viewer.

## Concepts covered
- **Synthetic keys** — Created when tables share 2+ fields; resolve to keep the model clean.
- **Circular references** — Association loops; break with renames or a link table.
- **JOIN vs KEEP vs CONCATENATE** — Merge columns / reduce-but-separate / union rows respectively.
- **Composite/AutoNumber keys** — Combine shared fields into one compact key.
- **Table Viewer validation** — Ctrl+T to inspect associations and spot issues.

## Implementation steps
1. Inspect the model in the Table Viewer (Ctrl+T).
2. Combine shared fields into one composite (AutoNumber) key.
3. Break loops with a link table; use KEEP to reduce without merging.
4. Confirm a clean model.

## Outcomes
- No synthetic keys/loops.
- Predictable results.
- Better performance.

## Tech stack
`QlikView` · `Load script`

## Why this project (profile relevance)
Model hygiene underpins performance and correct results.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/qlikview-12-data-architect*
