"""Association-rule mining (Apriori) over FMCG retail transactions."""
from __future__ import annotations

import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules


def load_transactions(csv_path: str) -> pd.DataFrame:
    df = pd.read_csv(csv_path, parse_dates=["InvoiceDate"])
    df = df.dropna(subset=["CustomerID", "Description"])
    df = df[df["Quantity"] > 0]
    df["Sales Revenue"] = df["Quantity"] * df["UnitPrice"]
    return df


def build_basket_matrix(df: pd.DataFrame, country: str | None = None) -> pd.DataFrame:
    """One-hot encode (Invoice x Description) -> quantity > 0."""
    subset = df if country is None else df[df["Country"] == country]
    basket = (
        subset.groupby(["Invoice", "Description"])["Quantity"]
        .sum()
        .unstack()
        .reset_index()
        .fillna(0)
        .set_index("Invoice")
    )
    return basket.applymap(lambda qty: 1 if qty > 0 else 0)


def mine_rules(
    basket: pd.DataFrame, min_support: float = 0.02, min_confidence: float = 0.3
) -> pd.DataFrame:
    frequent_itemsets = apriori(basket, min_support=min_support, use_colnames=True)
    if frequent_itemsets.empty:
        return pd.DataFrame(
            columns=["antecedents", "consequents", "support", "confidence", "lift"]
        )
    rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=min_confidence)
    return rules.sort_values("lift", ascending=False)


if __name__ == "__main__":
    transactions = load_transactions("data/retail.csv")
    basket = build_basket_matrix(transactions)
    rules = mine_rules(basket)
    print(rules.head(20).to_string(index=False))
