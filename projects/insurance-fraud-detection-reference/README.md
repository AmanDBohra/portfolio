# Insurance Fraud Review Prioritisation — Reference Project

> **Reference project on synthetic data, not client work.** It illustrates a common design pattern for
> insurance data platforms. No client code, data, schemas or results are included, and no performance
> figures are claimed. Hands-on experience: Databricks, PySpark and Python. The other technologies mentioned
> (AWS services, Snowflake, dbt, Kafka/Kinesis, Jenkins, Terraform, governance tooling) reflect working
> exposure as part of the wider platform team.

## Problem

Claims teams want earlier, explainable signals about which claims deserve a closer human look. External public
information can sometimes add context, but it can also be old, misdated, reposted or about the wrong person. So the
platform must produce **review priority with reasons**, never a verdict of fraud.

## Design principles shown here

- **Entity-match confidence is not fraud risk.** A low-confidence match adds no points; it only asks for verification.
- **Explainable by construction:** each flag carries a reason code and the rule version, giving an audit trail.
- **Pseudonymise with a keyed HMAC**, not a plain hash (plain hashes of guessable fields can be reversed by guessing).
- Weights and thresholds are **example values**, not validated fraud weights; they must be calibrated on real outcomes.
- Social or other external data must come from an approved, licensed source with a documented legal basis.

## Files

| File | What it shows |
|---|---|
| `fraud_risk_engine.py` | Rule-based review-priority scoring, match-status handling, reason codes, HMAC pseudonymisation |
| `test_fraud_risk_engine.py` | Tests, including that a low-confidence match adds zero points |
| `mart_fraud_review.sql` and `schema.yml` | An illustrative dbt incremental model and tests for an investigator-facing mart in Snowflake |

## Run

```bash
pip install pandas
python fraud_risk_engine.py
python test_fraud_risk_engine.py
```

## Where the stack fits (reference view)

Ingestion (Talend, Glue, Python) to S3 bronze/silver/gold, Databricks + PySpark for cleansing, deduplication and
feature engineering, dbt + Snowflake for the review mart, Jenkins + GitHub + Terraform for deployment, Glue Data
Catalog for metadata. The streaming path (Kafka or Kinesis) is covered in the streaming reference project.

## Limits

This is a design demonstration. A real system needs legal and privacy review, bias and false-positive evaluation, time-based
validation on reliable outcome labels, and human oversight of every decision.
