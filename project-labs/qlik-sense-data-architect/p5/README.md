# Section Access data security

**Certification:** Qlik Sense Data Architect (QSDA 2024) (Qlik)
**Project 5 of 5**

> Restrict each user to their permitted rows (e.g., region).

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/qlik-sense-data-architect-5.svg)

## Architecture & data model
A Section Access table maps authenticated users to permitted regions; data reduces per user; tested in a copy before release.

## Concepts covered
- **Section Access** — User-based data reduction (row-level security) defined in the script.
- **Data reduction** — Each user sees only rows matching their permitted values.
- **Reduction fields (UPPERCASE)** — Matching is case-sensitive; conventionally uppercase for reliability.
- **Admin vs user access** — ADMIN sees all; USER is reduced — always keep a valid admin.
- **Testing safely** — Test in a copy to avoid locking yourself out.

## Implementation steps
1. Build the Section Access table (user → region).
2. Use uppercase fields/values; keep a valid admin.
3. Reduce data by matching the logged-in user.
4. Test in a copy to avoid lockout.

## Outcomes
- Row-level security per user.
- Safe, reliable matching.
- No lockout risk.

## Tech stack
`Qlik Sense` · `Section Access`

## Why this project (profile relevance)
Row-level security is essential on sensitive insurance data.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/qlik-sense-data-architect*
