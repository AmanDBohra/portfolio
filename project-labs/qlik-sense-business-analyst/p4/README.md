# Advanced aggregation with Aggr()

**Certification:** Qlik Sense Business Analyst (QSBA) (Qlik)
**Project 4 of 5**

> Compute per-group metrics and rankings.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/qlik-sense-business-analyst-4.svg)

## Architecture & data model
Advanced measures use Aggr/Rank/TOTAL to answer per-group and top-N questions.

## Concepts covered
- **Aggr()** — Computes an inner aggregation over a virtual dimension for nested calcs.
- **Rank()** — Ranks rows by an expression for top-N analysis.
- **Nested aggregation** — e.g., Avg(Aggr(Sum(Sales),Customer)) = average per customer.
- **TOTAL qualifier** — Ignores chart dimensions for within-group shares/totals.
- **Top-N within groups** — Aggr + Rank to rank items inside each group.

## Implementation steps
1. Average per customer with Avg(Aggr(Sum(Sales),Customer)).
2. Rank distributors within regions using Aggr + Rank.
3. Use TOTAL for within-group shares.
4. Limit charts to top-N.

## Outcomes
- Deeper performance insight.
- Correct nested calculations.
- Readable top-N views.

## Tech stack
`Qlik Sense` · `Aggr/Rank`

## Why this project (profile relevance)
Advanced calculations answer deeper performance questions.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/qlik-sense-business-analyst*
