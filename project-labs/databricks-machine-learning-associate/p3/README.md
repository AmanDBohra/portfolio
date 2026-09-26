# AutoML baseline then refine

**Certification:** Databricks Certified Machine Learning Associate (Databricks)
**Project 3 of 5**

> Rapidly produce a strong baseline for premium prediction, then improve it.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-machine-learning-associate-3.svg)

## Architecture & data model
Dataset → AutoML (target + primary metric) → leaderboard + best-model notebook → manual refinement → MLflow comparison.

## Concepts covered
- **AutoML (glass-box)** — Trains many models and generates editable notebooks, so results are inspectable and refinable.
- **Primary metric** — The objective AutoML optimizes and ranks the leaderboard by.
- **Editable best-model notebook** — The generated code for the top model, ready to refine.
- **MLflow leaderboard** — All trials logged to MLflow for comparison.
- **Feature exclusion** — Drop leaky/irrelevant columns and set the target before running.

## Implementation steps
1. Run AutoML with the target and primary metric.
2. Review the leaderboard; open the best-model notebook.
3. Refine features/hyperparameters.
4. Compare refined runs in MLflow.

## Outcomes
- A strong, explainable baseline fast.
- A clear path to refinement.
- Fully logged, reproducible trials.

## Tech stack
`Databricks AutoML` · `MLflow`

## Why this project (profile relevance)
Fast, explainable baselining is a practical way to accelerate delivery.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-machine-learning-associate*
