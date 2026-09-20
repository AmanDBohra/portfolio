# Reliability & safety evaluation for agents

**Certification:** Databricks Certified Context Engineer Associate (Databricks)
**Project 4 of 5**

> Ensure the agent is grounded, deterministic enough, and safe.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-context-engineer-associate-4.svg)

## Architecture & data model
A scenario suite + metrics harness evaluates groundedness, correct tool use, and injection resistance before rollout; low temperature + schemas for determinism.

## Concepts covered
- **Groundedness/relevance metrics** — Measure whether answers are supported and on-topic across scenarios.
- **Determinism (temperature, schemas)** — Lower temperature and output schemas make behavior reproducible/testable.
- **Prompt-injection defense** — Separate trusted rules from untrusted content; sanitize inputs.
- **Abstention/uncertainty** — The agent asks for clarification or abstains when unsure.
- **Scenario testing** — Typical, edge, and adversarial cases with metrics reveal real robustness.

## Implementation steps
1. Build a scenario suite (typical, edge, adversarial).
2. Lower temperature; use schemas for reproducibility.
3. Test injection resistance with malicious retrieved content.
4. Verify the agent abstains/asks when unsure.

## Outcomes
- Trustworthy, testable agent behavior.
- Resistance to prompt injection.
- Calibrated uncertainty.

## Tech stack
`Evaluation harness` · `LLM` · `Python`

## Why this project (profile relevance)
Trustworthy agent behavior is essential before any business rollout.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-context-engineer-associate*
