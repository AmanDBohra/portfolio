# Evaluation harness for the assistant

**Certification:** Databricks Certified Generative AI Engineer Associate (Databricks)
**Project 4 of 5**

> Measure groundedness, relevance, and correctness before shipping.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-genai-engineer-associate-4.svg)

## Architecture & data model
A golden dataset + LLM-as-judge scoring wired through MLflow gates deployment on metric thresholds; A/B compares prompt variants.

## Concepts covered
- **RAG metric triad** — Context relevance (retrieval), groundedness (support), answer relevance (addresses the question).
- **LLM-as-a-judge** — A capable model scores responses against a rubric at scale.
- **Golden evaluation dataset** — A curated, labeled set of questions/answers/sources to benchmark quality.
- **MLflow evaluation/tracing** — Track experiments and inspect each step's inputs/outputs for debugging.
- **A/B prompt comparison** — Compare prompts/models on the same inputs with consistent metrics.

## Implementation steps
1. Build a golden set (questions, reference answers, expected sources).
2. Score context relevance, groundedness, answer relevance.
3. Track experiments in MLflow; compare two prompts/models.
4. Gate deployment on thresholds.

## Outcomes
- Objective, repeatable quality measurement.
- Regression detection before shipping.
- Evidence-based prompt/model choices.

## Tech stack
`MLflow` · `LLM-as-judge` · `Python`

## Why this project (profile relevance)
Rigorous evaluation is what separates a demo from a production assistant.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-genai-engineer-associate*
