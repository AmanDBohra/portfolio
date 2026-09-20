# Data-quality alerting for reporting

**Certification:** Databricks Certified Data Analyst Associate (Databricks)
**Project 4 of 5**

> Notify the team when key metrics breach thresholds or data looks wrong.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-data-analyst-associate-4.svg)

## Architecture & data model
Scheduled check queries (metric thresholds, anomalies) → alert conditions → notifications to the team.

## Concepts covered
- **Alerts (condition on result)** — A scheduled query whose result is compared to a threshold to trigger notifications.
- **Scheduled queries** — Run checks on a cadence without manual effort.
- **NULLIF / safe division** — x / NULLIF(y,0) avoids divide-by-zero in ratio checks.
- **Data validation queries** — Row-count/nullness/range checks that catch data issues early.
- **Notifications** — Alerts route to email/destinations when conditions are met.

## Implementation steps
1. Write check queries (e.g., daily loss ratio, row-count anomaly).
2. Create alerts with threshold conditions.
3. Guard ratios with NULLIF.
4. Route notifications to the team.

## Outcomes
- Proactive detection of metric/data issues.
- No silent divide-by-zero failures.
- Faster response to anomalies.

## Tech stack
`Databricks SQL` · `Alerts`

## Why this project (profile relevance)
Proactive monitoring reflects the governance/quality focus of the role.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-data-analyst-associate*
