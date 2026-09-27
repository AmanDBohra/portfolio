# FMCG Retail Sales Analysis

MTech (Data Science & Engineering) dissertation: analyzing Fast-Moving
Consumer Goods (FMCG) retail transaction data with association-rule mining
and customer segmentation, surfaced through an interactive dashboard.

## Problem

Retailers accumulate transaction data but rarely turn it into decisions:
which products are actually bought together, which customers are most
valuable, and how pricing/placement should respond. This project builds that
pipeline end to end on a public retail transaction dataset (UCI "Online
Retail" style: Invoice, StockCode, Description, Quantity, InvoiceDate,
UnitPrice, CustomerID, Country).

## Architecture

```
   raw transactions (CSV)
          │
          ▼
   ┌─────────────────────┐
   │  data loading &      │   (pandas: cleaning, feature engineering,
   │  feature engineering │    Sales Revenue = Quantity * UnitPrice)
   └──────────┬───────────┘
              │
     ┌────────┴─────────┐
     ▼                   ▼
┌───────────────┐  ┌──────────────────────┐
│ market_basket │  │ customer_segmentation │
│  .py          │  │  .py                  │
│               │  │                       │
│ Apriori        │  │ RFM scoring:          │
│ (mlxtend) ->   │  │  Recency, Frequency,  │
│ frequent       │  │  Monetary -> weighted │
│ itemsets ->    │  │  score -> customer    │
│ association    │  │  tier (Top / High /   │
│ rules          │  │  Medium / Low / Lost) │
└───────┬────────┘  └──────────┬───────────┘
        │                      │
        └──────────┬───────────┘
                    ▼
            ┌───────────────┐
            │  dashboard.py  │  (Streamlit)
            │  - sales by    │
            │    country/    │
            │    month       │
            │  - top items   │
            │  - basket      │
            │    rules table │
            │  - RFM tiers   │
            └───────────────┘
```

## Techniques

- **Association rule mining**: Apriori algorithm (via `mlxtend`) to find
  frequent itemsets and derive rules scored by support, confidence, and lift.
- **Customer segmentation**: RFM (Recency, Frequency, Monetary) scoring,
  weighted `0.15*Recency + 0.28*Frequency + 0.57*Monetary`, bucketed into
  Top / High-value / Medium-value / Low-value / Lost customer tiers.
- **Dashboarding**: Streamlit for the interactive exploration layer, with
  Qlik used separately during the dissertation for an independent affinity-
  analysis cross-check of the association-rule findings.

## Repository layout

```
fmcg-retail/
├── README.md
├── requirements.txt
├── data/                    # place a retail transactions CSV here
├── market_basket.py         # Apriori frequent itemsets + rules
├── customer_segmentation.py # RFM scoring and tiering
└── dashboard.py             # Streamlit app tying it together
```

## Running it

```bash
pip install -r requirements.txt
# Place a transactions CSV (Invoice, StockCode, Description, Quantity,
# InvoiceDate, UnitPrice, CustomerID, Country) at data/retail.csv, e.g. the
# UCI "Online Retail" dataset.
streamlit run dashboard.py
```

`market_basket.py` and `customer_segmentation.py` can also be run/imported
standalone for the rule-mining and RFM steps respectively.

## Status

Re-expressed from the original dissertation's Streamlit notebook workflow
into standalone, runnable modules for this repository. The dissertation
itself additionally cross-checked results in Qlik; that step isn't
reproduced here since it depends on a licensed BI tool.
