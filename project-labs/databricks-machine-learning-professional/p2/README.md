# Model lifecycle with registry aliases, webhooks & CI/CD

**Certification:** Databricks Certified Machine Learning Professional (Databricks)
**Project 2 of 5**

> Automate promotion of models from dev to production with governance.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-machine-learning-professional-2.svg)

## Architecture & data model
Git + CI → tests + quality gates → UC model registration with aliases → webhooks trigger deploy via Asset Bundles across dev→prod.

## Concepts covered
- **Unity Catalog models** — catalog.schema.model registration governed like data assets.
- **Aliases (@champion)** — Mutable named pointers to versions; roll back by re-pointing.
- **Registry webhooks** — Trigger tests/deploys automatically on registry events.
- **Quality gates** — Automated checks (metrics/latency/fairness) required to promote.
- **Databricks Asset Bundles (CI/CD)** — Declarative, per-environment deployment of ML jobs/pipelines.

## Implementation steps
1. Register models in UC with @champion/@challenger aliases.
2. Configure webhooks to run validation on transition requests.
3. Gate promotion on thresholds.
4. Deploy pipelines with Asset Bundles per environment.

## Outcomes
- Automated, governed promotion.
- Instant alias-based rollback.
- Reproducible cross-env deploys.

## Tech stack
`Unity Catalog` · `MLflow Registry` · `Asset Bundles` · `CI`

## Why this project (profile relevance)
Governed, automated promotion reflects senior MLOps ownership.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-machine-learning-professional*
