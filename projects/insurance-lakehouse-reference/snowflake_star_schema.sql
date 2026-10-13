-- Illustrative star schema for claims analytics (Snowflake-style SQL).
-- REFERENCE EXAMPLE. Not client code; names and metrics are generic.
-- Metric definitions (e.g. loss ratio) must be agreed with the insurance
-- business team, not inferred from raw fields.

create table dim_policy (
    policy_key      integer primary key,
    policy_type     varchar,
    coverage        varchar,
    annual_premium  decimal(18,2)
);

create table dim_customer (
    customer_key    integer primary key,
    customer_segment varchar            -- approved, non-sensitive attributes only
);

create table dim_date (
    date_key        integer primary key, -- yyyymmdd
    full_date       date,
    month           integer,
    quarter         integer,
    year            integer
);

create table dim_claim_status (
    status_key      integer primary key,
    status_name     varchar              -- REGISTERED, PENDING, SETTLED
);

create table fact_claims (
    claim_id        varchar primary key,
    policy_key      integer references dim_policy(policy_key),
    customer_key    integer references dim_customer(customer_key),
    status_key      integer references dim_claim_status(status_key),
    claim_date_key  integer references dim_date(date_key),
    claim_amount    decimal(18,2),
    paid_amount     decimal(18,2),
    reserve_amount  decimal(18,2)
);

-- Example metric: outstanding reserves and paid-vs-claimed by policy type
select
    p.policy_type,
    count(*)                         as claims_registered,
    sum(f.claim_amount)              as total_claimed,
    sum(f.paid_amount)               as total_paid,
    sum(f.reserve_amount)            as outstanding_reserve
from fact_claims f
join dim_policy p on p.policy_key = f.policy_key
group by p.policy_type
order by total_claimed desc;
