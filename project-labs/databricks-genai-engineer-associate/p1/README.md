# RAG analytics assistant over BI documentation

**Certification:** Databricks Certified Generative AI Engineer Associate (Databricks)
**Project 1 of 5**

> Answer plain-English questions from analytics/policy docs without hallucinating numbers.

![Architecture diagram](https://amandbohra.github.io/portfolio/study/projects/databricks-genai-engineer-associate-1.svg)

## Architecture & data model
Docs → chunk → embed → Databricks Vector Search (Delta Sync Index) → retrieve top-k → grounded prompt → LLM → cited answer.

## Concepts covered
- **RAG pipeline** — Retrieve relevant context, then generate a grounded answer — reduces hallucination and uses current/proprietary data.
- **Chunking & overlap** — Split docs into passages with slight overlap to preserve cross-boundary context.
- **Embeddings** — Vector representations where semantically similar text is close, enabling similarity retrieval.
- **Vector Search retrieval** — Index embeddings and fetch top-k nearest chunks for a query.
- **Grounded generation** — Instruct the model to answer only from retrieved context and cite sources; abstain otherwise.

## Implementation steps
1. Chunk documents with sensible size/overlap; embed and index in Vector Search.
2. Embed the query; retrieve top-k relevant chunks.
3. Build a grounded prompt instructing answer-from-context + citations.
4. Return an honest 'not found' when context is insufficient.

## Outcomes
- Assistant that answers from real docs, not guesses.
- Cited, verifiable responses.
- Up-to-date knowledge without retraining.

## Tech stack
`Databricks Vector Search` · `LLM` · `Python`

## Why this project (profile relevance)
Directly extends the GenAI RAG analytics-assistant project in the portfolio.

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/databricks-genai-engineer-associate*
