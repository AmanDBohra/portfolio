# Retrieval quality tuning & hybrid search

**Certification:** Databricks Certified Generative AI Engineer Associate (Databricks)
**Project 2 of 5**

> Improve answer relevance for jargon/acronym-heavy insurance queries.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-genai-engineer-associate-2.svg)

## Architecture & data model
Broad vector+keyword retrieval → metadata filter → re-ranker → precise top-few context, evaluated on a labeled set.

## Concepts covered
- **Chunk-size tuning** — Balance context completeness vs precision and token cost by adjusting size/overlap.
- **Re-ranking** — A cross-encoder re-scores initial candidates so the best context is used.
- **Hybrid (semantic + keyword) search** — Combines vector similarity with keyword matching to catch exact terms/codes.
- **Metadata filtering** — Restrict retrieval by attributes (doc type, recency) for precision and scoping.
- **Top-k trade-offs** — Higher k improves recall but adds noise/cost; retrieve broad then re-rank.

## Implementation steps
1. Experiment with chunk size/overlap; measure retrieval precision.
2. Add a re-ranker over initial candidates.
3. Combine vector + keyword (hybrid) search.
4. Filter by metadata (type/recency).

## Outcomes
- Higher answer relevance on jargon-heavy queries.
- Better precision at controlled cost.
- Scoped, current retrieval.

## Tech stack
`Vector Search` · `Re-ranker` · `Python`

## Why this project (profile relevance)
Domain-specific retrieval quality is what makes an assistant genuinely useful.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-genai-engineer-associate*
