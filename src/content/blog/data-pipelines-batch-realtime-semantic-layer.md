---
title: "Data Pipelines, Batch vs Real-time & the Semantic Layer"
date: 2026-09-06
tags: Explained Simply, Data Engineering
readingTime: 5 min
excerpt: "The invisible plumbing of analytics — how data moves, whether it moves in batches or live, and the friendly layer that makes it usable — explained simply."
---

Behind every dashboard is plumbing most people never see. Three ideas explain almost all of it: the **pipeline**, its **timing**, and the **semantic layer** on top.

## Data pipeline — the plumbing

A **data pipeline** is the automated flow that moves data from source systems, cleans and reshapes it, and delivers it where it's used.
*Like water pipes carrying supply from the reservoir to your tap — treated and filtered along the way.*

A good pipeline runs on its own, checks its own quality, and fails loudly when something's wrong — so people aren't quietly making decisions on broken data.

## Batch vs. real-time — the timing

Pipelines run on one of two rhythms:

- **Batch** — data is processed in scheduled chunks (hourly, nightly).
  *Doing all the laundry on Sunday.*
- **Real-time (streaming)** — data is handled the moment it arrives.
  *Washing each shirt the instant you take it off.*

Real-time sounds better, but it costs more and isn't always needed. The right question is: *how fresh does this decision actually need the data to be?* A fraud alert needs seconds; a monthly premium report is perfectly happy with daily. Matching the rhythm to the decision saves a lot of money.

## The semantic layer — the translator

Raw tables have cryptic names (`prem_amt_net`, `dist_id`). The **semantic layer** is a friendly business-terms layer on top, so everyone works with the same clear definitions — "Written Premium", "Distributor" — instead of guessing at columns.
*A translator that turns database jargon into the words the business actually says.*

Its quiet superpower is **consistency**: define "Written Premium" once in the semantic layer and every dashboard means the same thing by it. That's how you end the meetings where three teams show up with three versions of the same number.

## Why it matters

Dashboards get the applause, but the pipeline decides whether they're trustworthy and fresh, and the semantic layer decides whether everyone agrees on what the numbers mean. Get these right and the visible layer mostly takes care of itself.

*If you want to see a pipeline end-to-end, my [ETL → star schema notebook](https://github.com/AmanDBohra/portfolio/blob/main/notebooks/etl_star_schema_pipeline.ipynb) walks raw data all the way to an analytical model.*

*— Aman Bohra*
