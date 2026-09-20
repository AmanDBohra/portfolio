# Set analysis for comparisons

**Certification:** Qlik Sense Business Analyst (QSBA) (Qlik)
**Project 2 of 5**

> Build YoY, % of total, and 'ignore filter' measures.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/qlik-sense-business-analyst-2.svg)

## Architecture & data model
Measures use set analysis to fix periods, exclude fields, and compute shares independent of user selections.

## Concepts covered
- **Set analysis ($ vs 1)** — $ = current selection; 1 = all records ignoring selection.
- **Modifiers (set/clear/exclude)** — <Year={2024}> sets, <Year=> clears, <Region-={'East'}> excludes.
- **Dollar-sign expansion** — $(=Max(Year)) evaluates then substitutes for dynamic measures.
- **% of total** — Divide by a set-analysis denominator that ignores/overrides selection.
- **Selection states** — Green (selected), white (possible), grey (excluded) guide analysis.

## Implementation steps
1. Fix a year with <Year={2024}> or $(=Max(Year)).
2. Compute % of total with {1}/cleared-field denominators.
3. Exclude values with -= modifiers.
4. Leverage selection-state feedback.

## Outcomes
- Robust comparison measures.
- Filter-independent KPIs.
- Clear associative feedback.

## Tech stack
`Qlik Sense` · `Set analysis`

## Why this project (profile relevance)
Set analysis powers the nuanced measures leaders ask for.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/qlik-sense-business-analyst*
