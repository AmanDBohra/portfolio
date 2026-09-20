# Context-window design for a grounded assistant

**Certification:** Databricks Certified Context Engineer Associate (Databricks)
**Project 1 of 5**

> Assemble system rules, retrieved context, and the query within the token budget.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-context-engineer-associate-1.svg)

## Architecture & data model
A prompt assembler orders system rules → retrieved context (delimited) → query, budgeting tokens and trimming to the most relevant context.

## Concepts covered
- **Context window / token budget** — The finite tokens the model can attend to; every component must be sized deliberately.
- **Prompt structure & ordering** — System rules first, relevant context next, query last, with key rules made salient.
- **Lost-in-the-middle** — Models attend most to the start/end; avoid burying critical instructions in the middle.
- **Grounding** — Supply authoritative context so answers are supported and verifiable.
- **Delimiting untrusted content** — Mark retrieved/user text as data, not instructions, to resist prompt injection.

## Implementation steps
1. Structure the prompt: durable rules first, relevant context next, query last.
2. Delimit/label untrusted content as data.
3. Budget tokens across components; trim to relevant context.
4. Place critical instructions prominently.

## Outcomes
- Reliable, grounded answers within budget.
- Reduced injection risk.
- Better use of limited context.

## Tech stack
`LLM` · `Prompt design`

## Why this project (profile relevance)
Foundational to building reliable, grounded AI assistants.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-context-engineer-associate*
