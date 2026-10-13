"""
Illustrative bronze -> silver claims pipeline (PySpark).

REFERENCE EXAMPLE on synthetic data. This is NOT client code. It shows the
pattern: standardise types, keep the latest version of each claim, and route
invalid rows to a quarantine set instead of silently dropping them.

Run locally:  python claims_silver_pipeline.py
On Databricks, replace the synthetic DataFrame with spark.read on the bronze
path and write the two outputs to silver/ and quarantine/ locations.
"""
from pyspark.sql import SparkSession, functions as F
from pyspark.sql.window import Window


def build_synthetic_bronze(spark):
    rows = [
        # claim_id, claim_amount, claim_status, updated_at
        ("C-1001", "2500.50", " registered ", "2026-01-05 09:00:00"),
        ("C-1001", "2500.50", "settled",      "2026-01-20 15:30:00"),  # newer version
        ("C-1002", "800.00",  "pending",      "2026-01-06 11:10:00"),
        ("C-1003", None,      "pending",      "2026-01-07 08:45:00"),  # missing amount
        ("C-1004", "-50.00",  "registered",   "2026-01-08 10:00:00"),  # negative amount
        (None,     "300.00",  "registered",   "2026-01-09 12:00:00"),  # missing id
        ("C-1005", "1200.00", "SETTLED",      "2026-01-10 14:20:00"),
    ]
    return spark.createDataFrame(
        rows, ["claim_id", "claim_amount", "claim_status", "updated_at"]
    )


def standardise(claims):
    return (
        claims
        .withColumn("claim_id", F.trim(F.col("claim_id")))
        .withColumn("claim_amount", F.col("claim_amount").cast("decimal(18,2)"))
        .withColumn("claim_status", F.upper(F.trim(F.col("claim_status"))))
        .withColumn("updated_at", F.to_timestamp("updated_at"))
    )


def keep_latest(claims):
    w = Window.partitionBy("claim_id").orderBy(F.col("updated_at").desc_nulls_last())
    return (
        claims.withColumn("row_num", F.row_number().over(w))
        .filter(F.col("row_num") == 1)
        .drop("row_num")
    )


def split_valid_invalid(claims):
    is_valid = (
        F.col("claim_id").isNotNull()
        & F.col("claim_amount").isNotNull()
        & (F.col("claim_amount") >= 0)
    )
    return claims.filter(is_valid), claims.filter(~is_valid)


def run(spark):
    bronze = build_synthetic_bronze(spark)
    # Note: rows with a null claim_id all share one partition; that is fine here
    # because they are quarantined anyway.
    deduped = keep_latest(standardise(bronze))
    valid, invalid = split_valid_invalid(deduped)
    return valid, invalid


if __name__ == "__main__":
    spark = SparkSession.builder.master("local[1]").appName("claims-silver-demo").getOrCreate()
    spark.sparkContext.setLogLevel("ERROR")
    valid, invalid = run(spark)
    print("SILVER (valid):")
    valid.orderBy("claim_id").show(truncate=False)
    print("QUARANTINE (invalid):")
    invalid.orderBy("claim_id").show(truncate=False)
    print(f"valid={valid.count()} quarantined={invalid.count()}")
    spark.stop()
