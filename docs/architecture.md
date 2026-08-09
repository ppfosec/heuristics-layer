# Architecture

The v0.1 architecture is a local-first TypeScript library and CLI. It preserves the responsibilities in the larger vision without turning each responsibility into a service.

```text
transcript -> notes -> candidates -> challenges -> explicit review
                                                  |
                                                  v
                                       approved Markdown sources
                                                  |
                                                  v
                                      compiled JSON corpus
                                                  |
                                     retrieve + assemble context
                                                  |
                                           model adapter
                                                  |
                                           evaluation record
```

The workflow has two boundaries:

- `StructuredModel` is the provider-neutral generation boundary for notes, extraction, challenge, and reasoning.
- `Corpus` is the stable consumption boundary. Applications do not need interview or editorial code.

The bundled synthetic adapter is deterministic and offline. It is a fixture for testing the complete workflow, not a claim that keyword rules can elicit real expertise.

## Confidence is not one number

The system keeps four concepts separate:

- Expert confidence is recorded on an approved heuristic with a rationale.
- Retrieval relevance is a query-specific score with matched terms and a reason.
- Evidence confidence belongs to the reasoning artifact and describes the support available for the current case.
- Model confidence is optional provider output. It cannot substitute for evidence confidence or expert approval.

## Public and private data

The public repository contains methods, schemas, prompts, synthetic transcripts, sanitized examples, runtime code, and evals. Real transcripts, working notes, rejected candidates, and the private GRC corpus belong in a separate directory or private repository. The runtime accepts a corpus path; it never transmits or discovers corpora and has no telemetry.

See the ADRs for decisions and tradeoffs.
