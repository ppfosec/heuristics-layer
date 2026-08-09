# ADR 0003: Explainable lexical retrieval first

Status: accepted

V0.1 uses deterministic weighted lexical retrieval over title, principle, domain, tags, triggers, and examples, with optional domain filtering. It returns IDs, scores, matched terms, and reasons. Embeddings are an adapter-level future enhancement; a hosted vector database is not required to validate the thesis.
