# Drift monitoring & automated retraining

**Certification:** Databricks Certified Machine Learning Professional (Databricks)
**Project 4 of 5**

> Detect degradation and retrain before it hurts the business.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-machine-learning-professional-4.svg)

## Architecture & data model
Serving endpoint → inference tables + baseline → Lakehouse Monitoring (drift/quality) → alerts → automated retraining pipeline.

## Concepts covered
- **Lakehouse Monitoring (inference profile)** — Tracks model inputs/predictions (and labels) for drift/quality over time.
- **Inference tables** — Auto-log served requests/responses to Delta for monitoring and retraining data.
- **Data vs concept drift (PSI/KS/chi-square)** — Feature-distribution shift (PSI/KS/chi-square) vs the X→y relationship changing (needs labels).
- **Alert thresholds** — Turn metrics into notifications/actions when breached.
- **Retraining triggers** — Launch an automated retraining pipeline on drift/decay.

## Implementation steps
1. Enable inference tables; set a baseline table.
2. Configure monitoring metrics/thresholds (PSI/KS/chi-square).
3. Alert on breaches; backfill performance when labels arrive.
4. Trigger a tested retraining pipeline via webhook.

## Outcomes
- Early drift/decay detection.
- Auditable production logs.
- Automated, safe retraining.

## Tech stack
`Lakehouse Monitoring` · `Inference tables` · `MLflow` · `Jobs`

## Why this project (profile relevance)
Continuous monitoring/retraining keeps production models reliable.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-machine-learning-professional*
