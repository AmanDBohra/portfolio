# Memory & long-conversation management

**Certification:** Databricks Certified Context Engineer Associate (Databricks)
**Project 3 of 5**

> Keep multi-turn sessions coherent without blowing the token budget.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-context-engineer-associate-3.svg)

## Architecture & data model
Recent turns kept verbatim; older turns summarized; long-term facts in an external store retrieved as needed; cached with invalidation.

## Concepts covered
- **Short vs long-term memory** — Short-term is the running conversation; long-term is retrieved from an external store.
- **Summarization of old turns** — Condense earlier turns to preserve key facts within the token budget.
- **Retrieval of long-term facts** — Fetch relevant stored facts on demand instead of holding everything in context.
- **Context compression** — Distill retrieved passages to the pertinent sentences to save tokens.
- **Freshness vs caching** — Cache to save cost but invalidate when underlying data changes.

## Implementation steps
1. Keep recent turns; summarize older ones.
2. Store long-term facts externally; retrieve when relevant.
3. Compress retrieved passages to essentials.
4. Invalidate caches when source data changes.

## Outcomes
- Coherent multi-turn sessions within budget.
- Scalable long-term memory.
- Lower cost with fresh answers.

## Tech stack
`Vector store` · `LLM` · `Python`

## Why this project (profile relevance)
Robust memory is what makes assistants usable beyond a single question.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-context-engineer-associate*
