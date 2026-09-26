# Batch scoring with a registered model

**Certification:** Databricks Certified Machine Learning Associate (Databricks)
**Project 5 of 5**

> Score a large Delta table daily using the current Production model.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-machine-learning-associate-5.svg)

## Architecture & data model
Registered Production model → spark_udf → score Delta source in parallel → Gold predictions table → scheduled Job.

## Concepts covered
- **Model Registry stages** — Promote a version to Production so consumers load by stage, not version.
- **mlflow.pyfunc.spark_udf** — Wraps the model as a Spark UDF for parallel batch scoring.
- **Batch inference at scale** — Add a prediction column to a large DataFrame across the cluster.
- **Scheduled Jobs** — Automate daily scoring with retries and monitoring.
- **Delta output** — Write predictions to a governed Gold table for consumers.

## Implementation steps
1. Register and promote the model to Production.
2. Load as spark_udf; add a prediction column.
3. Write predictions to a Gold Delta table.
4. Schedule as a Databricks Job.

## Outcomes
- Automated daily predictions.
- Scalable, parallel scoring.
- Governed prediction tables.

## Tech stack
`MLflow Registry` · `Spark` · `Delta` · `Jobs`

## Why this project (profile relevance)
Operationalizing predictions into governed tables is the payoff of ML work.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-machine-learning-associate*
