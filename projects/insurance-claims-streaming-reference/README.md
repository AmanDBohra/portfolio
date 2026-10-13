# Replay-Safe Claim Event Consumer — Reference Project

> **Reference project on synthetic data, not client work.** It illustrates a common design pattern for
> insurance data platforms. No client code, data, schemas or results are included, and no performance
> figures are claimed. Hands-on experience: Databricks, PySpark and Python. The other technologies mentioned
> (AWS services, Snowflake, dbt, Kafka/Kinesis, Jenkins, Terraform, governance tooling) reflect working
> exposure as part of the wider platform team.

## Problem

Claim status events arrive from Kafka or Kinesis with duplicates, out-of-order delivery, bad payloads and
occasional replays. The consumer must end in the same correct state however the stream is delivered.

## Patterns shown

- **Idempotency:** an event id seen before is ignored (in AWS this key store could be DynamoDB).
- **Out-of-order safety:** only a higher event version replaces stored state, so a late older event is ignored.
- **Dead-letter quarantine:** invalid events are kept with a reason instead of being dropped.
- **Checkpointing and replay:** replaying the whole stream, or starting again with lost state, converges to the same result.

## Files

| File | What it shows |
|---|---|
| `claim_event_consumer.py` | The consumer, as a small pure-Python simulation |
| `test_claim_event_consumer.py` | Tests for duplicates, late events, quarantine and replay |

## Run

```bash
python claim_event_consumer.py
python test_claim_event_consumer.py
```

## Notes

Kafka, Kinesis and Firehose are not interchangeable steps to chain together: pick the route that fits the existing
infrastructure (Kafka as the event platform, Kinesis as the AWS-native stream, Firehose as delivery to S3).
