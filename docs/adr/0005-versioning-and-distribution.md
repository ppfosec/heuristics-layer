# ADR 0005: SemVer and npm-compatible distribution

Status: accepted

The public package is `@heuristics-layer/core` at `0.1.0`. Corpus format and individual heuristic versions use SemVer. npm is appropriate for TypeScript consumers, while compiled corpus JSON remains portable to other languages. Publishing is intentionally separate from building v0.1.
