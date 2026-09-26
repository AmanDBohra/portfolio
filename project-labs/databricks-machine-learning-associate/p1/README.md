# Claim-cost regression with a Spark ML pipeline

**Certification:** Databricks Certified Machine Learning Associate (Databricks)
**Project 1 of 5**

> Predict insurance claim cost with a reproducible, leakage-free Spark ML pipeline.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-machine-learning-associate-1.svg)

## Architecture & data model
Delta training data → Spark ML Pipeline (impute → index/encode → assemble → GBT/RF regressor) → CrossValidator tuning → test evaluation → MLflow-logged model.

## Concepts covered
- **Spark ML Pipeline** — Chains preprocessing transformers and the final estimator so fit/transform apply consistently and without leakage.
- **Imputer / StringIndexer / OneHotEncoder / VectorAssembler** — Impute nulls, index+encode categoricals, and assemble all features into the single vector MLlib expects.
- **Train/test split** — randomSplit with a fixed seed creates reproducible train and held-out test sets.
- **CrossValidator** — Averages performance across k folds over a ParamGrid to select robust hyperparameters.
- **RegressionEvaluator (RMSE)** — Scores regression error in the target's units on the test set.

## Implementation steps
1. Assemble the Pipeline stages ending in the regressor.
2. randomSplit(seed) then CrossValidator + ParamGridBuilder to tune.
3. Evaluate RMSE/MAE/R² on the test set.
4. Log the run and best model to MLflow.

## Outcomes
- A reproducible, leakage-free claim-cost model.
- Tuned hyperparameters via CV.
- Tracked, comparable runs.

## Tech stack
`Spark ML (MLlib)` · `MLflow` · `Delta`

## Why this project (profile relevance)
Directly extends predictive/insurance analytics into a governed Lakehouse ML workflow.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-machine-learning-associate*
