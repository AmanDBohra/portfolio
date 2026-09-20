# Expression building & aggregation

**Certification:** QlikView 12 Business Analyst (QVBA) (Qlik)
**Project 2 of 5**

> Create robust measures including % of total and rankings.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/qlikview-12-business-analyst-2.svg)

## Architecture & data model
Robust expressions: % of total (TOTAL), rankings (Rank/FirstSortedValue), and display control (Dual/Only).

## Concepts covered
- **Sum/Count/Avg** — Core aggregations for KPIs.
- **TOTAL qualifier** — Ignores chart dimensions for % of total.
- **Rank()** — Ranks items for top-N analysis.
- **FirstSortedValue** — Returns the value tied to the max/min of another field.
- **Only()/Dual()** — Only returns a unique value; Dual ties display text to a sort number.

## Implementation steps
1. Compute % of total with Sum(Sales)/Sum(TOTAL Sales).
2. Return top performer via FirstSortedValue(x, -weight).
3. Use Dual() so text sorts by number (months).
4. Guard blanks with If()/Only().

## Outcomes
- Accurate shares and rankings.
- Correct sorting.
- Clean handling of edge cases.

## Tech stack
`QlikView` · `Expressions`

## Why this project (profile relevance)
Expression fluency is the core of effective QlikView analysis.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/qlikview-12-business-analyst*
