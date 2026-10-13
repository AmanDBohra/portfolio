from fraud_risk_engine import score_claims, synthetic_data, pseudonymise

def run():
    claims, evidence = synthetic_data()
    r = score_claims(claims, evidence).set_index("claim_id")
    assert r.loc["CLM1", "risk_score"] == 25 and r.loc["CLM1", "reason_codes"] == ["DATE_INCONSISTENCY"]
    assert r.loc["CLM2", "risk_score"] == 10 and r.loc["CLM2", "reason_codes"] == ["REPEAT_CLAIM_PATTERN"]
    assert r.loc["CLM3", "risk_score"] == 45 and set(r.loc["CLM3", "reason_codes"]) == {"LOCATION_INCONSISTENCY", "REUSED_EVIDENCE"}
    assert r.loc["CLM4", "risk_score"] == 25 and r.loc["CLM4", "reason_codes"] == ["REUSED_EVIDENCE"]
    # a low-confidence match must add NO fraud points, only a verification request
    assert r.loc["CLM5", "risk_score"] == 0 and r.loc["CLM5", "reason_codes"] == ["VERIFY_MATCH"]
    assert pseudonymise("x", b"k1") != pseudonymise("x", b"k2")   # keyed
    assert pseudonymise("x", b"k1") == pseudonymise("x", b"k1")   # stable
    print("fraud engine tests passed")

if __name__ == "__main__":
    run()
