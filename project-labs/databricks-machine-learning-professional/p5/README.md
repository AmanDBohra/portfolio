# Distributed training & many-models at scale

**Certification:** Databricks Certified Machine Learning Professional (Databricks)
**Project 5 of 5**

> Train per-segment models (or a large model) efficiently across the cluster.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-machine-learning-professional-5.svg)

## Architecture & data model
Grouped data → applyInPandas per-segment training (or TorchDistributor for DL) → registered models → iterator-UDF batch scoring.

## Concepts covered
- **applyInPandas (many models)** — Trains a pandas model per group in parallel across the cluster.
- **TorchDistributor / Horovod** — Coordinates distributed deep-learning training across workers/GPUs.
- **pandas/Iterator UDFs for scoring** — Vectorized scoring that can load the model once per partition.
- **Broadcast / load-once patterns** — Avoid re-shipping/reloading the model per task.
- **Cost/performance trade-offs** — Right-size cluster/serving compute for the workload.

## Implementation steps
1. Train per-segment models with groupBy(...).applyInPandas.
2. For DL, use TorchDistributor across GPUs.
3. Score at scale with an iterator pandas UDF (load once per partition).
4. Tune compute for cost vs latency.

## Outcomes
- Efficient many-models / distributed training.
- Scalable inference.
- Controlled cost/performance.

## Tech stack
`Spark (pandas function API)` · `TorchDistributor` · `MLflow`

## Why this project (profile relevance)
Scaling training and inference is a core professional-level competency.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-machine-learning-professional*
