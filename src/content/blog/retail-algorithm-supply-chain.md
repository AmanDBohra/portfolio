---
title: "Applying a Retail Algorithm to a Supply-Chain Problem"
date: 2026-01-20
tags: Data Science, Supply Chain, Python
readingTime: 5 min
excerpt: "Market basket analysis is a retail technique. Point it at Bill-of-Materials data and it becomes a supply-chain lever — inventory costs down 15%."
---

Market basket analysis has a home: retail. *"Customers who bought X also bought Y."* But the underlying idea — finding items that co-occur more than chance would predict — isn't retail-specific. It's a pattern-finding tool. So at Fractal Analytics, I pointed it at a supply-chain problem instead.

## The problem

A client faced **high inventory costs and imprecise supply-chain planning.** The data lived in Bill-of-Materials (BOM) hierarchies — which components go into which assemblies. Buried in that structure were purchasing patterns nobody had made explicit.

## The approach

I applied the **Apriori algorithm** to the BOM data:

1. Treat each assembly's component set as a "basket."
2. Find **frequent itemsets** — components that repeatedly appear together.
3. Derive **association rules**, ranked by *lift*, to quantify how strongly components co-occur.
4. Translate the strongest rules into planning and replenishment recommendations.

The outcome:

- **Inventory costs reduced 15%**
- **Supply-chain accuracy improved 20%**

The win wasn't the algorithm — Apriori is decades old. The win was recognizing that a "retail" technique fit a supply-chain shape, and then **translating association rules into decisions** a planner could act on.

## Try it yourself

I put together a small, runnable notebook that demonstrates the technique end-to-end on **synthetic retail data** — from raw baskets to frequent itemsets to association rules and a visualization:

→ [Market Basket Analysis notebook on GitHub](https://github.com/AmanDBohra/portfolio/blob/main/notebooks/market_basket_analysis.ipynb)

## The takeaway

Techniques travel. A method that's conventional in one domain is often a fresh lever in another. The skill isn't knowing the algorithm — it's recognizing which shape of problem it fits, and turning its output into something the business can use.

*— Aman Bohra*
