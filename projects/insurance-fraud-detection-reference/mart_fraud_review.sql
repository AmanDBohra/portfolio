-- models/marts/mart_fraud_review.sql  (dbt model, illustrative)
-- Investigator-facing table built from already-validated features.
-- A production model must also handle late-arriving updates, rescoring of
-- existing claims and deterministic tie-breaking.
{{ config(materialized='incremental', unique_key='claim_id') }}

select
    claim_id,
    claim_date,
    claim_type,
    risk_score,
    entity_match_status,
    evidence_reference_count,
    primary_reason_code,
    rule_version,
    scoring_timestamp,
    review_status
from {{ ref('int_claim_risk_features') }}
{% if is_incremental() %}
where scoring_timestamp > (
    select coalesce(max(scoring_timestamp), '1900-01-01'::timestamp_ntz) from {{ this }}
)
{% endif %}
