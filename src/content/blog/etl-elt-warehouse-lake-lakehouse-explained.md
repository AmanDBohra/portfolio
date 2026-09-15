---
title: "Where Data Lives: Warehouse, Lake & Lakehouse — Explained Simply"
date: 2026-09-10
tags: Explained Simply, Data Engineering, ETL
readingTime: 6 min
excerpt: "ETL vs ELT, data warehouse vs data lake vs lakehouse — the words sound intimidating. Here they are in plain English, with everyday analogies."
---

Every dashboard, report, and AI model sits on top of one boring, invisible thing: **where the data lives and how it got there.** The words around it — ETL, ELT, warehouse, lake, lakehouse — sound intimidating. They're not. Let me walk through them the way I'd explain them to a friend.

## First: why we move data at all

Your company's data is scattered — a sales system here, a spreadsheet there, an app somewhere else. To make sense of it, you bring it into one place and tidy it up. That "bring it together and tidy it" process has two popular recipes.

## ETL vs. ELT — same job, different order

Both move data from source systems into a central store. The only real difference is **when you clean it**.

- **ETL = Extract, Transform, Load.** You clean and reshape the data *first*, then load the finished result.
  *Like washing and chopping vegetables before you put them in the fridge.*
- **ELT = Extract, Load, Transform.** You dump the raw data in *first*, then clean it inside the powerful destination system.
  *Like putting the vegetables in the fridge as-is, and prepping them when you cook.*

ELT has become popular because modern cloud platforms (like Databricks) are powerful enough to do the cleaning at the destination — and keeping the raw copy means you can re-do things later.

## Where does it all land? Three options

**Data Warehouse** — a highly organized store of *cleaned, structured* data, built for reporting.
*A well-labeled library where every book is catalogued and easy to find.*
Great for reliable dashboards. Less flexible for messy or unusual data.

**Data Lake** — a store that holds *everything, raw* — spreadsheets, images, logs, anything.
*A big lake where everything gets poured in.*
Very flexible and cheap, but without discipline it becomes a "data swamp" nobody trusts.

**Lakehouse** — the best of both: the flexibility of a lake with the reliability of a warehouse.
*A lake with organized docks, clear signs, and a catalogue.*
This is where the industry is heading — and technologies like **Delta Lake** add the "track-changes and autosave" that make a lake dependable.

## The star schema — how warehouse data is shaped

Inside a warehouse, data is usually arranged as a **star schema**: one central *facts* table (the numbers — sales, premiums) linked to *dimension* tables (the context — product, region, date).
*Think of a shop receipt: the receipt is the fact; the store, product, and date it links to are the dimensions.* This shape makes questions fast and keeps everyone's definitions consistent.

## Why this matters (the real point)

Here's the lesson from years of doing this: **if you clean and organize data once, in the pipeline, every report agrees by construction.** If each team cleans its own copy, you sign up for endless meetings arguing about whose numbers are right.

The plumbing isn't glamorous. But get it right and the dashboards mostly take care of themselves.

*— Aman Bohra*
