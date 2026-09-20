# Row/column security & PII governance

**Certification:** Databricks Certified Data Engineer Professional (Databricks)
**Project 4 of 5**

> Ensure analysts only see permitted rows and masked PII on shared tables.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-data-engineer-professional-4.svg)

## Architecture & data model
Shared Gold tables governed by Unity Catalog row filters + column masks; dynamic views for legacy paths; GDPR delete flow = DELETE → CDF propagation → VACUUM after retention.

## Concepts covered
- **Unity Catalog row filters** — A function returning a boolean per row restricts which rows each user/group can query.
- **Column masks** — Functions that redact sensitive columns unless the user is in an authorized group.
- **Dynamic views** — Views using current_user()/is_account_group_member() to filter rows and mask columns without duplicating data.
- **PII handling** — Identify and mask/tokenize personal data (names, IDs) before analysts or logs see it.
- **VACUUM for compliant deletes** — After DELETE (and CDF propagation), VACUUM physically removes files past retention to satisfy erasure requests.

## Implementation steps
1. Create a row-filter function (e.g., by region) and attach to the table.
2. Add column-mask functions for PII keyed on group membership.
3. Provide a dynamic view fallback where needed.
4. Implement compliant delete: DELETE + downstream CDF removal + VACUUM.
5. Audit access and lineage in Unity Catalog.

## Outcomes
- Row/column-level security without data duplication.
- Auditable, compliant handling of PII and erasure.
- Least-privilege access across teams.

## Tech stack
`Unity Catalog` · `Dynamic views` · `Delta Lake`

## Why this project (profile relevance)
Governance and PII control are non-negotiable on regulated insurance data.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-data-engineer-professional*
