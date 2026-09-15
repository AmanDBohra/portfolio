---
title: "From 36 Hours to 2: BI Performance Is Usually a Design Problem"
date: 2026-02-18
tags: Business Intelligence, ETL, Performance
readingTime: 5 min
excerpt: "Early in my career I inherited a report that took 36 hours to run and hung the server every month. Everyone had accepted it. The fix wasn't a bigger server."
---

Early in my career at Icon Business Solutions, I inherited a report that took **36 hours to run**. Every month it locked the BI server, and for that window everything else queued behind it. The team had accepted this as normal — a cost of doing business.

I didn't think it was a data problem. I thought it was a design problem.

## The instinct to throw hardware at it

When an enterprise report is slow, the first instinct is almost always the same: *upgrade the server*. It's the most expensive option and, more often than not, the least effective. A monolithic job that processes sequentially will still process sequentially on faster hardware — you just pay more to wait a little less.

The real question isn't "how do we make this run faster?" It's "**why is it shaped like this at all?**"

## What actually changed

The bottleneck was a heavy transformation layer running as one sequential monthly batch. So I re-engineered it:

- Broke the monolithic transformation into **modular, parallelizable components**
- Converted the run from a **monthly batch to a daily parallel run**
- Tightened the data-quality controls feeding the pipeline

The results:

- **Runtime: 36 hours → under 2 hours** (a 94% reduction)
- **Server load reduced 85%**
- **Data accuracy improved 35%**
- The business went from month-old data to **daily** data — at minimal additional cost

No new infrastructure. Just a different way of thinking about the problem.

## The lesson that stuck

That project taught me something I've carried through every role since: **the value of analytics isn't in the dashboard — it's in the thinking behind it.** Performance problems in enterprise BI are usually design problems wearing an infrastructure costume.

Before you scale the hardware, ask whether the workload is shaped correctly. Can it be parallelized? Is it doing work that doesn't need to be redone every run? Is the frequency matched to how the business actually consumes it? Those questions are free. The server upgrade isn't.

*— Aman Bohra*
