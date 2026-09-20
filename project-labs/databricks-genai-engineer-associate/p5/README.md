# Deploy & govern the assistant

**Certification:** Databricks Certified Generative AI Engineer Associate (Databricks)
**Project 5 of 5**

> Serve the assistant reliably with governance and cost control.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-genai-engineer-associate-5.svg)

## Architecture & data model
MLflow-logged chain → Model Serving endpoint (autoscaling) governed by Unity Catalog; PII masked, responses cached, requests routed by complexity; monitored in production.

## Concepts covered
- **Model Serving endpoints** — Scalable real-time REST endpoints (autoscaling) to serve the chain.
- **Foundation Model APIs** — Call hosted LLMs without managing infrastructure.
- **Unity Catalog for models** — Govern models/functions with the same permissions/lineage as data.
- **PII handling** — Mask/tokenize sensitive data before it enters prompts or logs.
- **Caching & model routing** — Cache repeats and route simple requests to cheaper models to control cost/latency.

## Implementation steps
1. Log the chain with MLflow; deploy to a Model Serving endpoint.
2. Govern models/data in Unity Catalog; mask PII before context.
3. Cache repeats; route simple requests to a cheaper model.
4. Monitor quality and cost in production.

## Outcomes
- Reliable, autoscaling assistant endpoint.
- Governed, privacy-safe deployment.
- Controlled cost and latency.

## Tech stack
`Model Serving` · `MLflow` · `Unity Catalog`

## Why this project (profile relevance)
Governed, cost-aware deployment turns GenAI into a trustworthy business tool.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-genai-engineer-associate*
