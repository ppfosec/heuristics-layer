# Architecture

The architecture is mostly instructions because the core work is interpretation.

```text
core protocols
    |
    +-- ChatGPT Project package
    |
    +-- Claude chat/Project package + optional skill

voice conversation
    -> session packet + proposed library changes
    -> desktop normalize-and-publish
    -> conversational practitioner approval
    -> transactional private judgment library update
    -> later LLM use
```

## Semantic layer

The LLM interviews, reconstructs the decision, separates facts from judgment, proposes candidates, generates counterexamples, tests alternative explanations, identifies gaps, and evaluates candidate quality. In `normalize-and-publish`, it also reconciles candidates across sessions, maintains stable identifiers and versions, and updates every repository record after conversational approval.

## Deterministic layer

Repository code packages ZIP files and validates required files, skill metadata, unresolved placeholders, internal links, and release contents. It does not extract or score practitioner judgment.

## Public and private material

The repository ships public protocols, a blank private-repository template, and fictional examples. Raw transcripts, private session packets, proposed changes, and the published judgment library remain in the user's selected account and storage.

## Surface boundary

Mobile and web voice conduct interviews. Local publication uses ChatGPT Work or Claude Cowork on desktop after the user grants access to the private folder. When local access is unavailable, the model emits one complete replacement repository ZIP instead of asking the practitioner to merge fragments.

Keep the public framework checkout and private heuristics repository separate. The public repository receives framework changes and separately approved sanitized contributions. The private repository contains the authoritative personal library and source evidence.
