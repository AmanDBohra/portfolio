# Governed, scheduled delivery with Jobs + Unity Catalog

**Certification:** Databricks Certified Data Engineer Associate (Databricks)
**Project 5 of 5**

> Productionize and secure the pipeline so business users get daily, permissioned data.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-data-engineer-associate-5.svg)

## Architecture & data model
Multi-task Job on a job cluster: ingest → transform → aggregate, parameterized by widgets. Tables governed in Unity Catalog; a Databricks SQL dashboard + alert sit on Gold. Promotable across environments.

## Concepts covered
- **Databricks Jobs (tasks, dependencies, retries)** — A multi-task DAG that runs ingest→transform→aggregate in order, with retries and schedules, so delivery is automated and resilient.
- **Job vs all-purpose clusters** — Job clusters spin up for the run and terminate after (cheaper, isolated) — the right choice for scheduled pipelines vs interactive all-purpose clusters.
- **Unity Catalog (catalog.schema.table)** — A three-level namespace and central governance layer for tables, views, and permissions across workspaces.
- **GRANT/permissions** — GRANT SELECT plus USE CATALOG/USE SCHEMA gives an analyst group read access; missing traversal grants block access.
- **Dashboards & alerts** — Databricks SQL dashboards visualize Gold with scheduled refresh; alerts notify when a metric (e.g., loss ratio) breaches a threshold.

## Implementation steps
1. Define a Job with three dependent tasks sharing one job cluster; set retries.
2. Register outputs in Unity Catalog; GRANT SELECT (+USE) to the analyst group.
3. Build a SQL dashboard on Gold with a daily refresh.
4. Create an alert on a loss-ratio threshold.
5. Parameterize with widgets for environment/date.

## Outcomes
- Fully automated daily delivery with retries and alerting.
- Governed, least-privilege access for business users.
- One pipeline promotable dev→prod.

## Tech stack
`Databricks Jobs` · `Unity Catalog` · `Databricks SQL` · `Widgets`

## Why this project (profile relevance)
End-to-end ownership from pipeline to governed dashboard — exactly the delivery-lead remit.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-data-engineer-associate*
