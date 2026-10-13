import pandas as pd
from dq_checks import *

def go():
    claims, policies = synthetic()
    c = completeness(claims, ["claim_id", "claim_amount"])
    assert c["claim_id"] == 0.8 and c["claim_amount"] == 0.8
    assert sorted(duplicate_keys(claims, "claim_id")) == ["C2", "C2"]
    assert invalid_amounts(claims) == [3, 4]                    # negative and missing
    assert orphan_keys(claims, policies, "policy_id") == ["P9"]  # no matching policy
    ok = reconcile(pd.DataFrame({"claim_amount": [1.0, 2.0]}), pd.DataFrame({"claim_amount": [1.0, 2.0]}))
    assert ok["count_match"] and ok["amount_match"]
    bad = reconcile(pd.DataFrame({"claim_amount": [1.0, 2.0]}), pd.DataFrame({"claim_amount": [1.0]}))
    assert not bad["count_match"] and not bad["amount_match"]
    assert rate_shift_alert(0.80, 0.05)["alert"] is True        # the 5% -> 80% case
    assert rate_shift_alert(0.07, 0.05)["alert"] is False
    print("data-quality tests passed")

if __name__ == "__main__":
    go()
