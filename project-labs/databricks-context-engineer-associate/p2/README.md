# Tool-using agent for analytics tasks

**Certification:** Databricks Certified Context Engineer Associate (Databricks)
**Project 2 of 5**

> Let an agent fetch live figures (query a table, run a calc) and answer.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-context-engineer-associate-2.svg)

## Architecture & data model
An agent with a small, typed toolset (query table, run calc) loops plan→act→check via the Mosaic AI Agent Framework, with guardrails and a step limit.

## Concepts covered
- **Tool/function calling** — The model requests an action; the app runs it and returns the result into context.
- **Typed tool schemas** — Clear names, descriptions, and typed parameters so the model calls tools correctly.
- **Agent loop (plan → act → check)** — Iterative reasoning: plan a step, call a tool, incorporate the result, continue.
- **Feeding tool results into context** — Tool outputs re-enter the context so the model reasons over real data.
- **Guardrails on actions** — Confirmations/permission scoping for risky or irreversible operations.

## Implementation steps
1. Define a few clearly-described tools with typed parameters.
2. Implement the loop: model requests tool → app validates/runs → result to context.
3. Add confirmations for risky actions.
4. Bound iterations with a max-steps limit.

## Outcomes
- Agent that acts on live enterprise data.
- Reliable tool selection and execution.
- Safe, bounded behavior.

## Tech stack
`Mosaic AI Agent Framework` · `LLM` · `Python`

## Why this project (profile relevance)
Agentic patterns extend RAG into actions over enterprise systems.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-context-engineer-associate*
