# Prompt engineering & structured output

**Certification:** Databricks Certified Generative AI Engineer Associate (Databricks)
**Project 3 of 5**

> Get consistent, parseable answers (e.g., JSON) with guardrails.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-genai-engineer-associate-3.svg)

## Architecture & data model
A prompt template (system rules + few-shot + schema) with input/output guardrails and low temperature drives consistent structured answers.

## Concepts covered
- **System prompts** — Persistent role, grounding rules, and abstention policy for the assistant.
- **Few-shot examples** — Worked examples in the prompt to lock in output format/behavior.
- **Output schemas / JSON mode** — Enforce structured, parseable output for downstream automation.
- **Guardrails** — Validate/filter inputs and outputs for safety, policy, and format.
- **Temperature control** — Low temperature for factual/deterministic answers; higher for creative tasks.

## Implementation steps
1. Design a system prompt with grounding + abstention rules.
2. Add few-shot examples for the target format.
3. Enforce a JSON schema for outputs.
4. Set low temperature; add guardrails on inputs/outputs.

## Outcomes
- Consistent, parseable responses.
- Safer inputs/outputs.
- Reliable integration into BI tools.

## Tech stack
`LLM` · `Prompt templates` · `Guardrails`

## Why this project (profile relevance)
Reliable, structured outputs are required to wire GenAI into BI tools.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-genai-engineer-associate*
