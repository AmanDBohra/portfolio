# Section Access & performance optimization

**Certification:** QlikView 12 Data Architect (QV12DA) (Qlik)
**Project 5 of 5**

> Secure data per user and tune memory/reload.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/qlikview-12-data-architect-5.svg)

## Architecture & data model
Section Access reduction by user/region + memory optimizations (split datetime, AutoNumber, star), tested in a copy.

## Concepts covered
- **Section Access (UPPERCASE, ADMIN)** — Row-level security matched on uppercase fields; keep a valid admin.
- **Cardinality reduction** — Split datetime and trim distinct values to save memory.
- **AutoNumber** — Compact integer keys for memory/performance.
- **Symbol tables/memory** — Qlik stores each distinct value once; low cardinality helps.
- **Testing safely** — Test security in a copy before release.

## Implementation steps
1. Add Section Access reduction by user/region; keep a valid admin.
2. Split datetime and AutoNumber keys.
3. Normalize wide facts into a star.
4. Test security in a copy.

## Outcomes
- Secured per-user data.
- Lower memory use.
- Safe release.

## Tech stack
`QlikView` · `Section Access`

## Why this project (profile relevance)
Secure, performant QlikView apps for sensitive enterprise data.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/qlikview-12-data-architect*
