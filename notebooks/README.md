# Notebooks

Hands-on analytics notebooks that demonstrate my approach — all on **synthetic data**, no real or
confidential client information. Each is executed, so GitHub renders it with outputs and charts inline.

| Notebook | Domain | What it shows |
|---|---|---|
| [`etl_star_schema_pipeline.ipynb`](etl_star_schema_pipeline.ipynb) | Data Engineering · ETL/ELT | Raw → staging → a **dimensional star schema** in SQL, and the analytical query BI sits on. |
| [`genai_rag_analytics_assistant.ipynb`](genai_rag_analytics_assistant.ipynb) | Generative AI | A governed **RAG** pipeline (real retrieval + LLM plug-in point) that answers only from context. |
| [`anomaly_detection_claims.ipynb`](anomaly_detection_claims.ipynb) | Data Science | **Isolation Forest** surfaces unusual claims into a ranked, explainable review queue. |
| [`fraud_detection_hybrid.ipynb`](fraud_detection_hybrid.ipynb) | Data Science | **Rules + Random Forest** hybrid; measures why the combination beats either alone. |
| [`ab_test_analysis.ipynb`](ab_test_analysis.ipynb) | Analytics / Stats | **A/B test**: two-proportion z-test, uplift CI, and the statistical-vs-practical decision. |
| [`insurance_premium_forecasting.ipynb`](insurance_premium_forecasting.ipynb) | Forecasting | Forecasting **Written Premium** with a transparent trend + seasonality model and a 12-month projection with a confidence band. |
| [`policy_retention_prediction.ipynb`](policy_retention_prediction.ipynb) | A logistic-regression **churn/retention** model (ROC AUC, coefficients) turned into a ranked retention action list. |
| [`data_quality_profiling.ipynb`](data_quality_profiling.ipynb) | Profiles a messy dataset (missing, duplicates, out-of-range, inconsistent) into an **audit-ready data-quality scorecard**. |
| [`market_basket_analysis.ipynb`](market_basket_analysis.ipynb) | **Apriori** market-basket analysis → association rules; the technique behind my BOM inventory work (~15% cost reduction). |

### Run any of them yourself

```bash
pip install pandas numpy scikit-learn mlxtend matplotlib jupyter
jupyter notebook notebooks/
```

There's also a self-contained interactive dashboard demo at
https://amandbohra.github.io/portfolio/dashboard-demo.html
