# Hyperparameter tuning with Hyperopt

**Certification:** Databricks Certified Machine Learning Associate (Databricks)
**Project 4 of 5**

> Systematically tune a model to minimize validation loss.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-machine-learning-associate-4.svg)

## Architecture & data model
Search space → objective (train+CV, return loss) → fmin (TPE) with SparkTrials → best params → MLflow.

## Concepts covered
- **Hyperopt (fmin, search space)** — Optimizes hyperparameters by minimizing an objective over a defined space.
- **hp.loguniform / hp.choice** — Log-scale sampling for rates/regularization; categorical choices for discrete options.
- **SparkTrials vs Trials** — SparkTrials parallelizes single-node trials; Trials for already-distributed Spark ML.
- **Objective (STATUS_OK, loss)** — Return {'loss', 'status'}; negate higher-is-better metrics.
- **Cross-validation** — Evaluate each trial with CV for a stable estimate.

## Implementation steps
1. Define the search space (loguniform for LR/reg).
2. Write the objective returning loss/status.
3. Run fmin with max_evals and SparkTrials.
4. Log the best params/metrics.

## Outcomes
- Systematically optimized hyperparameters.
- Parallelized, efficient search.
- Reproducible tuning record.

## Tech stack
`Hyperopt` · `MLflow` · `Spark`

## Why this project (profile relevance)
Rigorous tuning is core to delivering accurate, trustworthy models.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-machine-learning-associate*
