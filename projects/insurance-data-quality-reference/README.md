# Data Quality and Reconciliation Checks — Reference Project

> **Reference project on synthetic data, not client work.** It illustrates a common design pattern for
> insurance data platforms. No client code, data, schemas or results are included, and no performance
> figures are claimed. Hands-on experience: Databricks, PySpark and Python. The other technologies mentioned
> (AWS services, Snowflake, dbt, Kafka/Kinesis, Jenkins, Terraform, governance tooling) reflect working
> exposure as part of the wider platform team.

## Problem

A pipeline that finishes successfully can still publish wrong data. Production support needs checks on the data
itself, plus an alert when a rate shifts sharply.

## Checks shown

- Completeness, duplicate keys, invalid amounts (missing or negative)
- Referential integrity (claims whose policy does not exist)
- Source-to-target reconciliation of row counts and amount totals
- A rate-shift alert, for example an evidence match rate moving from 5% to 80%, which should pause publication and trigger investigation

## Files

| File | What it shows |
|---|---|
| `dq_checks.py` | The checks and the monitor |
| `test_dq_checks.py` | Tests on synthetic data, including the 5% to 80% case |

## Run

```bash
pip install pandas
python dq_checks.py
python test_dq_checks.py
```
