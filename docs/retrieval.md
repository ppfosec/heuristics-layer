# Retrieval

V0.1 uses weighted lexical retrieval. Titles and tags carry the most weight, followed by domain, category, principle, triggers, signals, and example scenarios. An optional domain filter limits the candidate set.

Every result returns:

- stable heuristic ID and version;
- normalized relevance score;
- matched query terms;
- a plain-language retrieval reason;
- the complete structured heuristic.

The score is retrieval relevance. It is not expert confidence, evidence confidence, model confidence, or risk severity.

Lexical retrieval is intentionally easy to inspect and test. It will miss conceptual matches with little vocabulary overlap. An embedding adapter can be added later, but embeddings remain derived indexes. They do not replace canonical Markdown, validation, provenance, or retrieval traces.
