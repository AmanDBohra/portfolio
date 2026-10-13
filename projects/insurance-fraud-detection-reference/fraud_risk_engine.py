"""
Explainable, rule-based fraud *review-priority* scoring (illustrative).

REFERENCE EXAMPLE on synthetic data. Not client code. The weights below are
example configuration values, NOT empirically validated fraud weights, and a
high score means "review under the approved workflow", never "fraud proven".

Design points shown:
  * entity-match confidence is kept separate from fraud risk; a low-confidence
    match adds no points and only asks for verification
  * every flag carries a reason code and the rule version (audit trail)
  * identifiers are pseudonymised with a keyed HMAC, not a plain hash
"""
import hashlib
import hmac
from datetime import date

import pandas as pd

RULE_VERSION = "v0.1-demo"
WEIGHTS = {
    "DATE_INCONSISTENCY": 25,
    "LOCATION_INCONSISTENCY": 20,
    "REUSED_EVIDENCE": 25,
    "REPEAT_CLAIM_PATTERN": 10,
}
MATCH_VERIFIED_MIN = 0.90      # demo threshold, to be calibrated on real data
MATCH_CANDIDATE_MIN = 0.50


def pseudonymise(value: str, key: bytes) -> str:
    """Keyed HMAC token. Plain hashing of guessable fields can be reversed by guessing."""
    return "TKN_" + hmac.new(key, value.encode(), hashlib.sha256).hexdigest()[:12]


def match_status(confidence: float) -> str:
    if confidence >= MATCH_VERIFIED_MIN:
        return "VERIFIED"
    if confidence >= MATCH_CANDIDATE_MIN:
        return "CANDIDATE"
    return "UNMATCHED"


def band(score: int) -> str:
    if score >= 60:
        return "PRIORITY_REVIEW"
    if score >= 30:
        return "ADDITIONAL_VALIDATION"
    return "STANDARD"


def score_claims(claims: pd.DataFrame, evidence: pd.DataFrame) -> pd.DataFrame:
    ev = evidence.copy()
    ev["match_status"] = ev["match_confidence"].map(match_status)

    # evidence reused across claims that belong to different policies
    reuse = (
        ev.merge(claims[["claim_id", "policy_id"]], on="claim_id")
        .groupby("content_hash")["policy_id"].nunique()
    )
    reused_hashes = set(reuse[reuse > 1].index)

    out = []
    for _, c in claims.iterrows():
        points, reasons = 0, []
        for _, e in ev[ev["claim_id"] == c["claim_id"]].iterrows():
            if e["match_status"] != "VERIFIED":
                if e["match_status"] == "CANDIDATE":
                    reasons.append("VERIFY_MATCH")     # no fraud points
                continue
            if e["reliable"]:
                gap = abs((e["published_loss_date"] - c["reported_loss_date"]).days)
                if gap >= 3:
                    points += WEIGHTS["DATE_INCONSISTENCY"]; reasons.append("DATE_INCONSISTENCY")
                if e["location"] != c["incident_region"]:
                    points += WEIGHTS["LOCATION_INCONSISTENCY"]; reasons.append("LOCATION_INCONSISTENCY")
            if e["content_hash"] in reused_hashes:
                points += WEIGHTS["REUSED_EVIDENCE"]; reasons.append("REUSED_EVIDENCE")
        if c["prior_claims_24m"] >= 3:
            points += WEIGHTS["REPEAT_CLAIM_PATTERN"]; reasons.append("REPEAT_CLAIM_PATTERN")
        score = min(points, 100)
        out.append({
            "claim_id": c["claim_id"], "risk_score": score, "review_band": band(score),
            "reason_codes": sorted(set(reasons)), "rule_version": RULE_VERSION,
        })
    return pd.DataFrame(out)


def synthetic_data():
    d = lambda s: date.fromisoformat(s)
    claims = pd.DataFrame([
        ("CLM1", "POL1", d("2026-09-15"), "Pune",   0),
        ("CLM2", "POL2", d("2026-09-10"), "Mumbai", 4),
        ("CLM3", "POL3", d("2026-09-12"), "Delhi",  0),
        ("CLM4", "POL4", d("2026-09-14"), "Pune",   1),
        ("CLM5", "POL5", d("2026-09-14"), "Pune",   0),
    ], columns=["claim_id", "policy_id", "reported_loss_date", "incident_region", "prior_claims_24m"])
    evidence = pd.DataFrame([
        # claim, hash, match confidence, reliable, published date, location
        ("CLM1", "H1", 0.95, True,  d("2026-09-01"), "Pune"),    # date gap 14d, verified
        ("CLM2", "H2", 0.97, True,  d("2026-09-10"), "Mumbai"),  # consistent
        ("CLM3", "H3", 0.97, True,  d("2026-09-12"), "Chennai"), # location mismatch
        ("CLM3", "H9", 0.97, True,  d("2026-09-12"), "Delhi"),
        ("CLM4", "H9", 0.96, True,  d("2026-09-14"), "Pune"),    # H9 reused vs CLM3 (different policy)
        ("CLM5", "H5", 0.60, True,  d("2026-08-01"), "Goa"),     # only a candidate match -> no points
    ], columns=["claim_id", "content_hash", "match_confidence", "reliable", "published_loss_date", "location"])
    return claims, evidence


if __name__ == "__main__":
    claims, evidence = synthetic_data()
    print(score_claims(claims, evidence).to_string(index=False))
    print(pseudonymise("vehicle-ABC-123", b"demo-key-not-a-secret"))
