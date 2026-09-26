# Real-time fraud scoring with Feature Store online serving

**Certification:** Databricks Certified Machine Learning Professional (Databricks)
**Project 1 of 5**

> Serve low-latency fraud predictions using point-in-time-correct, online features.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-machine-learning-professional-1.svg)

## Architecture & data model
Feature pipeline (timestamp keys) → offline Delta + online store → model packaged with Feature Store metadata → real-time Serving endpoint with auto feature lookup.

## Concepts covered
- **Feature tables (primary + timestamp keys)** — Delta feature tables keyed for lookups, with event-time keys for correctness.
- **Point-in-time lookups** — Fetch each feature as of the event time to prevent future-information leakage.
- **Online store publishing** — Push features to a low-latency store for real-time retrieval.
- **Real-time Model Serving** — A REST endpoint returning sub-second predictions.
- **Serving-time feature retrieval** — The endpoint auto-looks-up features by key, so clients send only keys/raw inputs.

## Implementation steps
1. Engineer features with timestamp keys; build a point-in-time training set.
2. Publish features to the online store.
3. Register the model with Feature Store metadata.
4. Deploy a real-time endpoint that fetches features by key.

## Outcomes
- Leakage-free, real-time predictions.
- Low-latency online features.
- Consistent train-serve features.

## Tech stack
`Feature Store` · `Model Serving` · `MLflow`

## Why this project (profile relevance)
Real-time, leakage-free serving is a hallmark of production ML for insurance/finance.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-machine-learning-professional*
