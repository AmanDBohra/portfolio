# Personalized, governed context delivery

**Certification:** Databricks Certified Context Engineer Associate (Databricks)
**Project 5 of 5**

> Give each user correctly-scoped, privacy-safe context.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-context-engineer-associate-5.svg)

## Architecture & data model
A context builder injects entitlement-scoped user context and situational facts, masks PII, and logs traces — governed by Unity Catalog.

## Concepts covered
- **Per-user context (preferences, entitlements)** — Inject minimal, permission-scoped user info to personalize answers.
- **PII masking** — Redact/tokenize sensitive fields before they enter context or logs.
- **Access scoping** — Ensure users can't retrieve data beyond their permissions.
- **Situational context (date/locale)** — Supply facts the model can't infer, like current date or region.
- **Auditable logging** — Log step/tool traces (PII handled) for auditability and debugging.

## Implementation steps
1. Inject minimal, entitlement-scoped user context; mask PII.
2. Provide situational facts (date/region).
3. Log step/tool traces with PII handled.
4. Verify users can't see beyond their permissions.

## Outcomes
- Personalized yet privacy-safe answers.
- Access-scoped, compliant context.
- Auditable agent behavior.

## Tech stack
`Unity Catalog` · `LLM` · `Python`

## Why this project (profile relevance)
Personalization with privacy is key for enterprise-grade AI.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-context-engineer-associate*
