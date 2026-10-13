from claim_event_consumer import ConsumerState, run, synthetic_stream

def go():
    stream = synthetic_stream()
    s = run(ConsumerState(), stream)
    assert {k: v["status"] for k, v in s.claims.items()} == {"C1": "SETTLED", "C2": "REGISTERED"}  # late v2 ignored
    assert len(s.dead_letter) == 1 and s.dead_letter[0]["reason"] == "MISSING_FIELD"
    # full replay with the same state changes nothing (checkpoint + idempotency)
    before = ({k: dict(v) for k, v in s.claims.items()}, len(s.dead_letter))
    run(s, stream)
    assert ({k: dict(v) for k, v in s.claims.items()}, len(s.dead_letter)) == before
    # replay from scratch (state lost, no checkpoint) still converges to the same result
    s2 = run(ConsumerState(), stream)
    assert {k: v["status"] for k, v in s2.claims.items()} == {"C1": "SETTLED", "C2": "REGISTERED"}
    print("streaming consumer tests passed")

if __name__ == "__main__":
    go()
