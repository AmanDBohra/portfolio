# Policy-retention classifier with Feature Store + MLflow

**Certification:** Databricks Certified Machine Learning Associate (Databricks)
**Project 2 of 5**

> Predict which policyholders will lapse, using reusable, governed features.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-machine-learning-associate-2.svg)

## Architecture & data model
Feature pipeline → Feature Store table (keyed by policy) → training set via lookups → weighted classifier → MLflow model with signature.

## Concepts covered
- **Feature Store feature tables** — Delta tables of curated, keyed features reused across models and consistent at serving.
- **Feature lookups / training set** — Join features by key into a training set that packages feature lineage with the model.
- **MLflow tracking & signatures** — Log params/metrics and the model with an input/output schema for validation.
- **Classification metrics (F1/AUC)** — Evaluate imbalanced classification with F1 and PR/ROC-AUC rather than accuracy.
- **Class imbalance handling** — Use class weights or resampling so the minority (lapse) class is learned.

## Implementation steps
1. Compute and write retention features to a Feature Store table.
2. Build a training set with feature lookups.
3. Train a weighted classifier; log to MLflow with a signature.
4. Evaluate F1 / PR-AUC.

## Outcomes
- Consistent train-serve features (no skew).
- Governed, reusable feature table.
- Imbalance-aware evaluation.

## Tech stack
`Feature Store` · `MLflow` · `Spark ML / sklearn`

## Why this project (profile relevance)
Mirrors real retention/churn analytics with train-serve consistency.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-machine-learning-associate*
