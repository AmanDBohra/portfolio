"""
Idempotent, replay-safe claim-event consumer (illustrative simulation).

REFERENCE EXAMPLE, pure Python, synthetic events. Models the *pattern* used with
Kafka/Kinesis consumers: event-id idempotency, out-of-order handling by version,
dead-letter quarantine, and checkpointing, so replaying a stream is safe.
In a real AWS design the seen-id set could live in DynamoDB and the quarantine
in S3; this demo keeps them in memory.
"""
from dataclasses import dataclass, field


@dataclass
class ConsumerState:
    claims: dict = field(default_factory=dict)        # claim_id -> latest accepted event
    seen_event_ids: set = field(default_factory=set)  # idempotency keys
    dead_letter: list = field(default_factory=list)   # quarantined bad events
    checkpoint: int = -1                              # last processed offset


REQUIRED = ("event_id", "claim_id", "version", "status")


def process(state: ConsumerState, offset: int, event: dict) -> None:
    if offset <= state.checkpoint:                    # already handled on a previous run
        return
    if any(event.get(k) is None for k in REQUIRED):
        state.dead_letter.append({"offset": offset, "event": event, "reason": "MISSING_FIELD"})
    elif event["event_id"] in state.seen_event_ids:   # duplicate delivery or replay
        pass
    else:
        state.seen_event_ids.add(event["event_id"])
        current = state.claims.get(event["claim_id"])
        # out-of-order safety: only a higher version replaces the stored state
        if current is None or event["version"] > current["version"]:
            state.claims[event["claim_id"]] = event
    state.checkpoint = offset


def run(state: ConsumerState, stream: list) -> ConsumerState:
    for offset, event in enumerate(stream):
        process(state, offset, event)
    return state


def synthetic_stream():
    return [
        {"event_id": "e1", "claim_id": "C1", "version": 1, "status": "REGISTERED"},
        {"event_id": "e2", "claim_id": "C2", "version": 1, "status": "REGISTERED"},
        {"event_id": "e4", "claim_id": "C1", "version": 3, "status": "SETTLED"},   # arrives early
        {"event_id": "e3", "claim_id": "C1", "version": 2, "status": "PENDING"},   # late, older
        {"event_id": "e2", "claim_id": "C2", "version": 1, "status": "REGISTERED"},  # duplicate delivery
        {"event_id": "e5", "claim_id": None, "version": 1, "status": "REGISTERED"},  # bad event
    ]


if __name__ == "__main__":
    s = run(ConsumerState(), synthetic_stream())
    print({k: v["status"] for k, v in s.claims.items()}, "dead_letter:", len(s.dead_letter))
