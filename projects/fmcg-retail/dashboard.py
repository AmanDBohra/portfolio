"""Streamlit dashboard tying together sales exploration, market basket
analysis, and RFM customer segmentation for the FMCG dissertation project."""
from __future__ import annotations

import streamlit as st

from customer_segmentation import compute_rfm
from market_basket import build_basket_matrix, load_transactions, mine_rules

st.set_page_config(page_title="FMCG Retail Sales Analysis", layout="wide")
st.title("FMCG Retail Sales Analysis")

data_path = st.sidebar.text_input("Transactions CSV path", "data/retail.csv")

try:
    df = load_transactions(data_path)
except FileNotFoundError:
    st.warning(f"No data file found at `{data_path}`. Add a retail transactions CSV to continue.")
    st.stop()

st.subheader("Top 10 countries by order count")
country_orders = (
    df.groupby("Country")["Invoice"].nunique().sort_values(ascending=False).head(10)
)
st.bar_chart(country_orders)

st.subheader("Monthly sales revenue")
monthly = df.set_index("InvoiceDate").resample("M")["Sales Revenue"].sum()
st.line_chart(monthly)

st.subheader("Top products by sales revenue")
top_products = (
    df.groupby("Description")["Sales Revenue"].sum().sort_values(ascending=False).head(10)
)
st.bar_chart(top_products)

st.subheader("Market basket rules (Apriori)")
min_support = st.sidebar.slider("Min support", 0.01, 0.2, 0.02, 0.01)
min_confidence = st.sidebar.slider("Min confidence", 0.1, 0.9, 0.3, 0.05)
basket = build_basket_matrix(df)
rules = mine_rules(basket, min_support=min_support, min_confidence=min_confidence)
st.dataframe(rules.head(50))

st.subheader("Customer segmentation (RFM)")
rfm = compute_rfm(df)
st.bar_chart(rfm["Tier"].value_counts())
st.dataframe(rfm.sort_values("RFM_Score", ascending=False).head(50))
