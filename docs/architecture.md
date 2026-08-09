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
    -> expert review
    -> private judgment library
    -> later LLM use
```

## Semantic layer

The LLM interviews, reconstructs the decision, separates facts from judgment, proposes candidates, generates counterexamples, tests alternative explanations, identifies gaps, and evaluates candidate quality.

## Deterministic layer

Repository code packages ZIP files and validates required files, skill metadata, unresolved placeholders, internal links, and release contents. It does not extract or score practitioner judgment.

## Public and private material

The repository ships public protocols and fictional examples. Raw transcripts, private session packets, proposed changes, and the approved judgment library remain in the user’s selected account and storage.
