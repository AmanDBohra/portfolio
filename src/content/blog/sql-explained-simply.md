---
title: "SQL Explained Simply — Talking to Your Data"
date: 2026-09-08
tags: Explained Simply, SQL, Data
readingTime: 5 min
excerpt: "SQL is how you ask precise questions of data in tables. Here's the whole idea — and the handful of words that do 90% of the work — in plain English."
---

SQL (say "sequel" or "ess-cue-el") is the language for asking questions of data stored in tables. It's the single most useful skill in analytics, and the core of it fits on one page.

## The mental model

Imagine your data as neatly ruled tables — rows and columns, like a spreadsheet. SQL lets you say, precisely, *which rows and columns you want and how to summarize them.*
*It's like ordering from a huge menu by describing exactly what you want, instead of taking whatever arrives.*

## The words that do 90% of the work

- **SELECT** — which columns you want.
- **FROM** — which table.
- **WHERE** — filter to the rows you care about.
- **GROUP BY** — bucket rows together to summarize (per region, per month).
- **ORDER BY** — sort the result.
- **JOIN** — combine two tables that relate to each other.

A plain-English request — *"total premium by region for 2026, biggest first"* — maps almost word-for-word:

```sql
SELECT region, SUM(premium) AS total
FROM policies
WHERE year = 2026
GROUP BY region
ORDER BY total DESC;
```

That's genuinely most of day-to-day analytics SQL.

## JOINs — the one idea people fear (but shouldn't)

Real data lives in separate tables — one for sales, one for products, one for stores. A **JOIN** stitches them together on a shared key.
*Like matching a receipt to the store directory using the store ID.* Once you see it as "match these two lists on a common column," it stops being scary.

## Why it matters more than ever

Even in the age of AI, SQL is everywhere: dashboards run on it, data pipelines are full of it, and modern platforms like Databricks speak it natively. And when an AI writes SQL for you, you still need to **read it** to trust the answer.

I hold HackerRank SQL (Advanced) and use SQL every day — for data modeling, transformation, and the queries behind every dashboard. If you learn one technical skill in data, learn this one.

*— Aman Bohra*
