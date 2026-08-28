---
title: "The Model Beneath the Dashboard"
date: 2026-03-04
tags: Data Engineering, ETL, Business Intelligence
readingTime: 4 min
excerpt: "Every trustworthy dashboard sits on a boring, invisible thing: a clean, conformed data model. Here's the ETL → star-schema pattern, and why it decides whether your BI is believable."
---

Everyone looks at the dashboard. Almost nobody looks at the thing that makes it trustworthy: the **data model underneath it.** Get that right and the dashboards mostly take care of themselves. Get it wrong and no amount of visual polish will save you — different teams will still show up with different numbers.

## ETL vs. ELT — same destination

The debate is mostly about *order*. **ETL** transforms data before loading it into the warehouse; **ELT** loads raw data first and transforms it inside the warehouse (Databricks, modern SQL). Both aim at the same destination: a **clean, conformed model** everything downstream can rely on. Pick based on your tooling and data volume, not fashion.

## The star schema, in one breath

The pattern that has aged the best for analytics:

- **Fact table** — the measurements (e.g. premium amount), one row per event, with foreign keys.
- **Dimension tables** — the context (product, region, date, distributor).

Queries become simple joins and aggregations; every dashboard reads the same conformed dimensions, so a "product" or a "region" means the same thing everywhere. That consistency *is* the point.

## Why this is a governance decision, not just a technical one

If you clean and conform **once**, in the pipeline, every report agrees by construction. If each dashboard cleans its own data, you've signed up for a lifetime of reconciliation meetings. The unglamorous ETL/ELT layer is where "why don't these two numbers match?" is either solved or created.

## See it run

I built a small, runnable notebook that walks the whole path — raw operational rows → cleaned staging → a star schema in SQL → the analytical query a BI tool would sit on:

→ [ETL → Star Schema notebook on GitHub](https://github.com/AmanDBohra/portfolio/blob/main/notebooks/etl_star_schema_pipeline.ipynb)

The dashboard is the last mile. The trust is built upstream.

*— Aman Bohra*
