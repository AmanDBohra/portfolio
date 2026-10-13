-- Renewal and premium-to-claims analytics (illustrative, SQL).
-- REFERENCE EXAMPLE on synthetic data; runs on SQLite via run_demo.py and is
-- written in portable SQL that maps onto Snowflake. Business definitions
-- (renewal, earned premium, loss ratio) MUST be agreed with the insurance
-- business team; the definitions below are simple demo definitions.

-- 1) Renewal rate by product: policies that expired in the period and renewed
select
    p.product,
    count(*)                                              as expiring_policies,
    sum(case when p.renewed = 1 then 1 else 0 end)        as renewed_policies,
    round(1.0 * sum(case when p.renewed = 1 then 1 else 0 end) / count(*), 3) as renewal_rate
from policies p
group by p.product
order by p.product;

-- 2) Paid-claims-to-premium ratio by product (demo definition)
select
    p.product,
    sum(p.annual_premium)                                 as premium,
    coalesce(sum(c.paid_amount), 0)                       as paid_claims,
    round(1.0 * coalesce(sum(c.paid_amount), 0) / sum(p.annual_premium), 3) as paid_to_premium
from policies p
left join (
    select policy_id, sum(paid_amount) as paid_amount from claims group by policy_id
) c on c.policy_id = p.policy_id
group by p.product
order by p.product;
