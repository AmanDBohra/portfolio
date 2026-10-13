# Renewal and Premium-to-Claims Analytics — Reference Project

> **Reference project on synthetic data, not client work.** It illustrates a common design pattern for
> insurance data platforms. No client code, data, schemas or results are included, and no performance
> figures are claimed. Hands-on experience: Databricks, PySpark and Python. The other technologies mentioned
> (AWS services, Snowflake, dbt, Kafka/Kinesis, Jenkins, Terraform, governance tooling) reflect working
> exposure as part of the wider platform team.

## Problem

Business teams want renewal rates and premium-to-claims views by product. These metrics need **agreed definitions**
with the insurance business, so the definitions here are deliberately simple demo definitions.

## Files

| File | What it shows |
|---|---|
| `renewal_analytics.sql` | Portable SQL for renewal rate and paid-claims-to-premium by product |
| `run_demo.py` | Builds a tiny synthetic SQLite database and runs the SQL |
| `test_renewal.py` | Hand-checkable expected results |

## Run

```bash
python run_demo.py
python test_renewal.py
```

The SQL is written to translate directly to Snowflake and could be wrapped as dbt models.
