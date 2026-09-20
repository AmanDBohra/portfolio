# CI/CD deployment with Databricks Asset Bundles

**Certification:** Databricks Certified Data Engineer Professional (Databricks)
**Project 5 of 5**

> Promote the pipeline across dev → staging → prod as tested, version-controlled code.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-data-engineer-professional-5.svg)

## Architecture & data model
Git repo with the pipeline + tests; CI runs tests on PRs; a Databricks Asset Bundle deploys jobs/pipelines to dev→staging→prod with per-target variables; monitoring/alerts in place.

## Concepts covered
- **Databricks Asset Bundles** — Declarative YAML defining jobs, DLT pipelines, and config with per-target variables for consistent deploys.
- **Multi-task job orchestration** — A dependency DAG of tasks with retries and shared clusters, deployed as code.
- **Unit/integration testing** — Unit tests on transformation functions plus integration tests on sample data, run in CI.
- **Monitoring & logging** — Alerting on failed/long runs and per-run data-quality metrics for observability.
- **Environment parameterization** — Per-target variables (catalog/paths) so one codebase runs in dev, staging, and prod.

## Implementation steps
1. Author the bundle (databricks.yml) with resources and target variables.
2. Write unit tests for transforms and an integration test on sample data.
3. Configure CI to run tests on PRs and block merges on failure.
4. Deploy the bundle per environment on merge.
5. Add alerts on run failures/duration and track quality metrics.

## Outcomes
- Repeatable, low-risk promotion across environments.
- Regressions caught before production.
- Observable, auditable deployments.

## Tech stack
`Asset Bundles` · `Git/CI` · `Databricks Jobs`

## Why this project (profile relevance)
Production-grade delivery discipline expected of a senior/lead engineer.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-data-engineer-professional*
