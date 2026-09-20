# Deploy, secure & refresh in the Service

**Certification:** Microsoft Power BI Data Analyst Associate (PL-300) (Microsoft)
**Project 5 of 5**

> Publish a governed, secured, auto-refreshing report.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/microsoft-pl-300-5.svg)

## Architecture & data model
Published dataset/report with RLS roles, gateway + incremental refresh, distributed via an app and promoted through a deployment pipeline.

## Concepts covered
- **Workspaces & apps** — Publish to a workspace and distribute to consumers via an app.
- **Row-Level Security (RLS)** — Roles with DAX filters (e.g., USERPRINCIPALNAME) restrict rows per user.
- **Gateways & scheduled refresh** — On-prem gateway + schedule keep data current.
- **Incremental refresh** — Refresh only recent partitions to cut time on large tables.
- **Deployment pipelines** — Promote content across Dev/Test/Prod with rules.

## Implementation steps
1. Publish to a workspace; define RLS roles.
2. Configure gateway and scheduled/incremental refresh.
3. Distribute via an app.
4. Promote dev→test→prod with a deployment pipeline.

## Outcomes
- Governed, secured distribution.
- Timely, efficient refresh.
- Controlled release management.

## Tech stack
`Power BI Service` · `RLS` · `Gateway`

## Why this project (profile relevance)
Governed distribution and refresh mirror real enterprise rollout.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/microsoft-pl-300*
