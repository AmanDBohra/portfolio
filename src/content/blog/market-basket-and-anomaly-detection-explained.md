---
title: "Market Basket Analysis & Anomaly Detection — Two Everyday Data-Science Wins"
date: 2026-09-03
tags: Explained Simply, Data Science, Analytics
readingTime: 5 min
excerpt: "Two of the most practical data-science techniques — finding what goes together, and flagging what doesn't fit — explained in plain language, with real uses."
---

Not all data science needs deep neural networks. Two of the most useful techniques are refreshingly intuitive — and I've used both to move real business numbers.

## Market basket analysis — what goes together

Market basket analysis finds **which items tend to appear together.**
*The classic: shoppers who buy bread often buy butter — so you place them side by side and both sell more.*

The engine behind it (the **Apriori** algorithm) does three simple things:

1. Treat each transaction as a "basket" of items.
2. Find **frequent itemsets** — combinations that show up often.
3. Turn them into **association rules** — "if X, then likely Y" — ranked by *lift* (how much more likely than chance).

The trick is that the technique isn't really about retail. I pointed it at **Bill-of-Materials data** in a supply chain — treating each assembly's components as a "basket" — and the patterns it surfaced helped **cut inventory costs by ~15%**. A "retail" method became a supply-chain lever. *Techniques travel; the skill is spotting which shape of problem they fit.*

→ See it run in my [market basket analysis notebook](https://github.com/AmanDBohra/portfolio/blob/main/notebooks/market_basket_analysis.ipynb).

## Anomaly detection — what doesn't fit

Anomaly detection does the opposite: it **flags the unusual cases** that deserve a human's attention.
*Like a smoke alarm — silent until something is genuinely off.*

It's especially handy because it's **unsupervised**: you don't need a labelled history of "known fraud." The model learns what "normal" looks like and scores how far each case sits from it. In insurance, that turns a mountain of claims into a **ranked review queue** — investigators start at the top instead of sampling at random.

→ My [anomaly detection notebook](https://github.com/AmanDBohra/portfolio/blob/main/notebooks/anomaly_detection_claims.ipynb) does this on synthetic claims with an Isolation Forest.

## The common thread

Both techniques share the lesson that runs through all my work: the algorithm is the easy part. The value comes from **turning its output into a decision** — a bundling strategy, a replenishment plan, a prioritized worklist. A pattern nobody acts on is just trivia.

*— Aman Bohra*
