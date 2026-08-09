# Heuristics Layer

**I taught ChatGPT how I make GRC decisions while doing the dishes.**

Heuristics Layer is a voice-first interview and editorial system for experienced Governance, Risk and Compliance practitioners.

Set it up once on your laptop. Open the same Project on your phone. Talk through a difficult vendor decision, policy exception, audit disagreement, control gap, or interview answer while you walk the dog, fold laundry, or stare at the dishes you were definitely going to do earlier.

The LLM does more than transcribe the conversation. It probes what you noticed, who wanted what, who could block the decision, which evidence changed your confidence, how adoption affected the control, what you chose not to escalate, and how you explained the trade-off. It then challenges its own interpretation and produces reviewable Markdown.

The result is a private, reusable representation of how you operate in GRC.

## The actual workflow

```text
DESKTOP SETUP, ONCE
Create a cloud ChatGPT or Claude Project
Install the supplied instructions and files
                    |
                    v
MOBILE OR LAPTOP VOICE
Talk through one real GRC decision
The interviewer follows judgment, incentives, and trade-offs
Say: "Close and process"
                    |
                    v
LLM EDITORIAL PASS
Reconstruct -> extract -> challenge -> evaluate
                    |
                    v
DESKTOP REVIEW
Approve, revise, or reject candidates
Update the private judgment library
```

Laptop interviews work. Mobile voice is the point: no uploading files, rebuilding prompts, or typing with your thumbs after the initial setup.

## Install

Choose one platform:

- [Download for ChatGPT](downloads/heuristics-layer-chatgpt-v0.2.0.zip) or [read the setup guide](packages/chatgpt/START_HERE.md)
- [Download for Claude](downloads/heuristics-layer-claude-v0.2.0.zip) or [read the setup guide](packages/claude/START_HERE.md)

The platform choices and current cross-device limitations are documented in [Platform notes](docs/PLATFORM_NOTES.md).

Paid plans are the primary design target because Project memory, file creation, and desktop work surfaces make the complete loop more useful. If the workflow works on a free plan, good. The product does not contort itself around the weakest surface.

The downloadable release contains one ZIP for ChatGPT and one for Claude. Setup happens on desktop. Interviews happen in the same cloud Project on mobile or desktop.

Before installing, create an empty Project and confirm that it appears on your phone with voice available. That sixty-second check catches disabled workspace permissions and stale mobile apps before you spend fifteen minutes explaining a procurement fight to a phone that was never listening properly.

## What it extracts

Heuristics Layer is not trying to teach a model that SOC 2 exists or that privileged access is sensitive. Models already have plenty of compliance documents.

It is trying to capture judgment such as:

- when a formally stronger control will fail because the operating team will route around it;
- how to distinguish a contractual requirement from a security-team preference;
- who owns the budget, who inherits the work, and who can quietly veto the decision;
- when organizational history deserves weight and when it has become bias;
- which missing evidence changes risk and which only changes confidence;
- how reversibility affects the amount of certainty required;
- how to explain the same residual risk to engineering, procurement, finance, and an executive.

Domain facts are evidence. The product is the practitioner’s way of navigating the people and trade-offs around those facts.

## What a completed interview produces

Each session produces a Markdown packet with:

- the decision scene;
- facts, claims, and unknowns;
- a stakeholder and incentive map;
- the practitioner’s decision path;
- a small set of candidate heuristics;
- counterexamples and alternative interpretations;
- qualitative evaluation with transcript evidence;
- unresolved questions;
- proposed changes to the private judgment library;
- job-interview feedback when using rehearsal mode.

See the [synthetic example](examples/ai-vendor-plan/session-packet.md). It demonstrates the output shape, not Pierre-Paul Ferland’s actual expert corpus.

## The LLM does the judgment work

The old v0.1 treated the product too much like a TypeScript pipeline. That implementation has been removed.

Extraction and evaluation are semantic work. The LLM must interpret the transcript, test competing explanations, notice missing context, challenge overconfident candidates, and decide what deserves another question.

Deterministic code remains only for packaging and repository validation. It does not pretend to infer tacit expertise.

## Human approval remains mandatory

The model may recommend that a candidate be approved, revised, probed, merged, split, or rejected. It cannot promote its own inference into approved expert knowledge.

The practitioner owns the library. A plausible paragraph is not provenance.

## Privacy

Raw interviews and the resulting judgment library are private by default. This public repository contains the method, installation packs, and synthetic examples. It does not contain Pierre-Paul’s accumulated GRC corpus.

Read the [privacy boundary](core/PRIVACY.md) before using company or customer examples.

## Build the release packages

The product itself does not require a CLI. Maintainers can build and validate the downloadable ZIP files with Python’s standard library:

```bash
python scripts/validate.py
python scripts/build_release.py
python scripts/validate.py --downloads
```

## Project status

Version 0.2 is the voice-first product pivot. Automated and synthetic forward tests pass. Final release acceptance still requires one real paid-account ChatGPT run and one real paid-account Claude run using the [live acceptance record](docs/LIVE_ACCEPTANCE_RECORD.md).

Models have knowledge. The work here is making experienced judgment reusable without flattening it into another checklist.
