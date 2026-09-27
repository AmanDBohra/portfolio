"""RFM (Recency, Frequency, Monetary) customer segmentation."""
from __future__ import annotations

from datetime import timedelta

import pandas as pd

RFM_WEIGHTS = {"recency": 0.15, "frequency": 0.28, "monetary": 0.57}


def compute_rfm(df: pd.DataFrame) -> pd.DataFrame:
    snapshot_date = df["InvoiceDate"].max() + timedelta(days=1)

    rfm = df.groupby("CustomerID").agg(
        Recency=("InvoiceDate", lambda x: (snapshot_date - x.max()).days),
        Frequency=("Invoice", "nunique"),
        Monetary=("Sales Revenue", "sum"),
    )

    # Normalize each dimension to a 1-5 scale via quantiles, inverting
    # Recency so that "more recent" scores higher, matching the weighting.
    rfm["R_Score"] = pd.qcut(rfm["Recency"], 5, labels=[5, 4, 3, 2, 1]).astype(int)
    rfm["F_Score"] = pd.qcut(rfm["Frequency"].rank(method="first"), 5, labels=[1, 2, 3, 4, 5]).astype(int)
    rfm["M_Score"] = pd.qcut(rfm["Monetary"], 5, labels=[1, 2, 3, 4, 5]).astype(int)

    rfm["RFM_Score"] = (
        RFM_WEIGHTS["recency"] * rfm["R_Score"]
        + RFM_WEIGHTS["frequency"] * rfm["F_Score"]
        + RFM_WEIGHTS["monetary"] * rfm["M_Score"]
    )
    rfm["Tier"] = rfm["RFM_Score"].apply(tier_for_score)
    return rfm.reset_index()


def tier_for_score(score: float) -> str:
    if score > 4.5:
        return "Top Customer"
    if score > 4:
        return "High-Value Customer"
    if score > 3:
        return "Medium-Value Customer"
    if score > 1.6:
        return "Low-Value Customer"
    return "Lost Customer"


if __name__ == "__main__":
    from market_basket import load_transactions

    transactions = load_transactions("data/retail.csv")
    rfm = compute_rfm(transactions)
    print(rfm["Tier"].value_counts())
