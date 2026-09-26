# Safe rollout: shadow → canary → A/B

**Certification:** Databricks Certified Machine Learning Professional (Databricks)
**Project 3 of 5**

> Promote a challenger model to production without risk.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-machine-learning-professional-3.svg)

## Architecture & data model
Endpoint hosting champion + challenger → shadow → canary % → A/B split → significance-tested decision → alias switch.

## Concepts covered
- **Shadow deployment** — Runs the challenger on live traffic without serving its results, to compare safely.
- **Canary rollout** — Serves a small traffic slice to the challenger and ramps up if healthy.
- **A/B traffic split** — Routes portions of traffic to each model to compare business metrics.
- **Guardrail metrics** — Latency/error/fairness that must not regress even if the primary improves.
- **Statistical significance** — Ensures observed differences aren't due to chance before deciding.

## Implementation steps
1. Shadow the challenger; compare offline.
2. Canary a small % of live traffic.
3. Run an A/B split judged on the business metric with guardrails.
4. Promote by switching @champion (rollback ready).

## Outcomes
- Risk-managed model rollout.
- Evidence-based promotion.
- Instant rollback capability.

## Tech stack
`Model Serving` · `MLflow` · `Monitoring`

## Why this project (profile relevance)
Risk-managed rollout is essential for trustworthy production changes.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-machine-learning-professional*
