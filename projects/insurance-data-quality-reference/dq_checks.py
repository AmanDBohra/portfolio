"""
Data-quality and reconciliation checks with a pipeline-health monitor (illustrative).

REFERENCE EXAMPLE on synthetic data. Not client code. Shows the checks that
usually matter beyond "did the Spark job succeed": completeness, uniqueness,
validity, referential integrity, source-vs-target reconciliation, and an
anomaly alert for sudden shifts such as a match rate jumping from 5% to 80%.
"""
import pandas as pd


def completeness(df, cols):
    return {c: float(df[c].notna().mean()) for c in cols}


def duplicate_keys(df, key):
    return df[df.duplicated(key, keep=False)][key].tolist()


def invalid_amounts(df, col="claim_amount"):
    return df[(df[col].isna()) | (df[col] < 0)].index.tolist()


def orphan_keys(child, parent, key):
    return sorted(set(child[key].dropna()) - set(parent[key].dropna()))


def reconcile(source: pd.DataFrame, target: pd.DataFrame, amount_col="claim_amount", tol=0.01):
    s_cnt, t_cnt = len(source), len(target)
    s_sum, t_sum = source[amount_col].sum(), target[amount_col].sum()
    return {
        "count_match": s_cnt == t_cnt,
        "amount_match": abs(s_sum - t_sum) <= tol,
        "source_count": s_cnt, "target_count": t_cnt,
        "source_sum": float(s_sum), "target_sum": float(t_sum),
    }


def rate_shift_alert(today: float, baseline: float, max_abs_shift: float = 0.25):
    """Pause publication and investigate when a rate moves far from baseline."""
    shift = abs(today - baseline)
    return {"alert": shift > max_abs_shift, "shift": round(shift, 3)}


def synthetic():
    claims = pd.DataFrame({
        "claim_id": ["C1", "C2", "C2", None, "C5"],
        "policy_id": ["P1", "P2", "P2", "P3", "P9"],
        "claim_amount": [100.0, 250.0, 250.0, -5.0, None],
    })
    policies = pd.DataFrame({"policy_id": ["P1", "P2", "P3"]})
    return claims, policies


if __name__ == "__main__":
    claims, policies = synthetic()
    print(completeness(claims, ["claim_id", "claim_amount"]))
    print("dupes:", duplicate_keys(claims, "claim_id"), "orphans:", orphan_keys(claims, policies, "policy_id"))
