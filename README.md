# The Heuristics Layer

**Models have knowledge. Heuristics give them judgment.**

A vendor says its administrators share a privileged account protected by CyberArk. One analyst rejects the answer at “shared account.” Another accepts it at “CyberArk.” Both stopped early.

The useful judgment sits underneath those labels: Can each session be tied to a named person? Was access approved and time-bound? Can the vendor demonstrate what happened? Does the account reach a system important enough to escalate?

The Heuristics Layer is an open framework for extracting that kind of tacit expert judgment through structured interviews, editing it into reviewable heuristics, and retrieving the relevant subset when a model has to make a decision. GRC is the first reference domain. The machinery is domain-agnostic.

This repository contains a working v0.1 vertical slice:

```text
synthetic interview -> notes -> candidates -> challenge -> review
                                                     |
                                                     v
                                      approved Markdown heuristics
                                                     |
                                                     v
                                     compiled JSON -> retrieval
                                                     |
                                                     v
                                      reasoning context -> eval
```

It is local-first, provider-neutral, and deliberately boring. There is no agent framework, hosted vector database, telemetry service, or browser-delivered private corpus hiding behind the diagram.

## Run the complete demonstration

Requirements: Node.js 22 or 24 and npm.

```bash
npm install
npm run check
npm run demo
npm run eval
```

The demo imports [a synthetic GRC interview](examples/interviews/B-shared-privileged-access.md), creates two candidate heuristics, challenges them, records fixture review decisions, compiles the approved Markdown, retrieves both heuristics for a new vendor statement, and writes an observable reasoning context. The eval compares the same deterministic reasoner with and without the retrieved heuristics.

The fixture should produce a positive rubric delta. That proves the plumbing and evaluation contract work. It does **not** prove that heuristics improve every model, domain, or real assessment. That claim needs representative cases and expert-reviewed corpora.

Generated artifacts are written to `.heuristics-demo/` and ignored by Git.

## What is a heuristic here?

A heuristic is a versioned expert judgment object. Its principle is only one part. It can also carry triggers, signals, probes, exceptions, compensating factors, escalation conditions, examples, counterexamples, related heuristics, and source excerpts.

Approved sources use Markdown with YAML frontmatter. Experts can read and edit them without working inside a JSON object. Compilation validates the source and emits normalized JSON for applications.

```markdown
---
id: evidence.certification_scope
version: 0.1.0
status: approved
domains: [tprm, core]
category: evidence_quality
---

## Principle

Certification should reduce uncertainty only for risks, systems,
periods, and controls demonstrably covered by its scope.

## Probes

- Is the relevant service in scope?
- Is the relevant control covered?
- Does the audit period apply?
```

The complete object contract is in [the schema](schemas/heuristic.schema.json).

## CLI

```bash
heuristics import interview.md
heuristics notes interview-id
heuristics extract interview-id
heuristics challenge interview-id heuristic.one heuristic.two
heuristics review heuristic.one --action approve --reviewer "Expert name" --confidence high --reason "Challenge resolved"
heuristics compile
heuristics search "shared privileged account protected by a vault" --domain tprm
heuristics demo
heuristics eval
heuristics eval-blind --evaluation .heuristics-demo/evals/EVAL-TPRM-002.json
heuristics eval-grade <blind-review.json> --label A --grader "Expert" --scores 4,3,5 --overall 4
```

The bundled provider is a deterministic synthetic fixture. Connect a real model by implementing `ElicitationModel` for interview processing and `ReasoningModel` for downstream reasoning. The core keeps prompts, schemas, lifecycle enforcement, provenance, compilation, retrieval, and eval records outside provider code.

## Public framework, private judgment

This repository teaches the method. It contains synthetic transcripts and sanitized examples. It should not contain Pierre-Paul Ferland's accumulated GRC corpus, raw interviews, customer situations, or unresolved working notes.

A private corpus can live in a private repository, mounted directory, or private package. A backend points the runtime at that corpus, retrieves only what a task needs, and sends only that selected context to the configured model provider. The browser receives the structured result, not the corpus.

See the [private corpus guide](docs/private-corpus.md) before using real interviews.

## Design choices

- Cognitive task analysis informs the interview behavior: concrete incidents, cues, strategies, exceptions, and novice traps.
- Model output cannot approve itself. Approval is an explicit lifecycle transition with reviewer identity, time, reason, and provenance.
- Retrieval is weighted lexical search in v0.1. Every hit includes its score, matched terms, and reason. Embeddings can be added behind an adapter when evidence justifies them.
- The reasoning harness requests facts, applied heuristic IDs, evidence, inference, uncertainty, open questions, escalation, and conclusion. It does not request hidden chain-of-thought.
- Apache 2.0 permits commercial applications and proprietary corpora while providing an explicit patent grant.

Read the [research basis](docs/research.md), [architecture](docs/architecture.md), [interviewer specification](docs/interviewer-spec.md), and [ADRs](docs/adr/) for the full record.

Interview work can start in one of [five modes](docs/interview-modes.md). Corpus-aware briefings bring prior coverage, open questions, contradictions, and promising probes into the next conversation. Candidate heuristics are checked against an [eight-part editorial rubric](docs/editorial-rubric.md) before expert review.

The public [evaluation dataset](evals/cases/) contains seven synthetic GRC cases. Each records the evidence, expected expert considerations, likely novice mistake, relevant heuristic IDs, and rubric.

## Project status

Version `0.1.0` is an executable reference implementation, not a finished theory of expertise. The next evidentiary milestone is a real, private interview with Pierre-Paul, followed by expert review and evaluation against representative GRC cases. Synthetic expertise does not become real because the tests are green.

## Contributing

Start with [CONTRIBUTING.md](CONTRIBUTING.md). Security and privacy reports belong in [SECURITY.md](SECURITY.md).
