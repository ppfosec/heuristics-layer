# Heuristics Layer

**I taught ChatGPT how I make GRC decisions while doing the dishes.**

Heuristics Layer is a voice-first interview and editorial system for experienced Governance, Risk and Compliance practitioners.

Upload it to one ChatGPT or Claude chat on your laptop. Open that same chat on your phone. Talk through a difficult vendor decision, policy exception, audit disagreement, control gap, or interview answer while you walk the dog, fold laundry, or stare at the dishes you were definitely going to do earlier. Move into a cloud Project when you want the setup to persist across future interviews.

The LLM does more than transcribe the conversation. It probes what you noticed, who wanted what, who could block the decision, which evidence changed your confidence, how adoption affected the control, what you chose not to escalate, and how you explained the trade-off. It then challenges its own interpretation and produces reviewable Markdown.

The result is a private, reusable representation of how you operate in GRC. Version 0.3 closes the loop: ChatGPT or Claude also normalizes and publishes approved heuristics into the authoritative private library. The practitioner answers judgment questions. The application deals with the files.

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
DESKTOP NORMALIZE AND PUBLISH
ChatGPT Work or Claude Cowork reads pending outputs
The model normalizes, reconciles, and challenges candidates
You approve meaning and wording in conversation
The model publishes the complete private library transaction
```

Laptop interviews work. Mobile voice is the point: no rebuilding prompts or typing with your thumbs during the interview. Desktop handles setup, file recovery, and publication.

## Install

Choose one platform:

- [Download for ChatGPT](downloads/heuristics-layer-chatgpt-v0.3.0.zip) or [read the setup guide](packages/chatgpt/START_HERE.md)
- [Download for Claude](downloads/heuristics-layer-claude-v0.3.0.zip) or [read the setup guide](packages/claude/START_HERE.md)

The platform choices and current cross-device limitations are documented in [Platform notes](docs/PLATFORM_NOTES.md).

Both downloads include the same optional portable Agent Skill. The first interview still uses two ordinary uploaded Markdown files so a Skill installation problem cannot block the product. Neither platform currently documents custom Skill activation as guaranteed inside live voice, so the Project or uploaded-file path remains the tested voice runtime.

Paid plans are the primary design target because Project memory, file creation, and desktop work surfaces make the complete loop more useful. If the workflow works on a free plan, good. The product does not contort itself around the weakest surface.

The downloadable release contains one ZIP for ChatGPT and one for Claude. Each includes the portable Skill and a private-repository template. Setup happens on desktop. Interviews happen in the same cloud Project on mobile or desktop. The preferred publication path uses ChatGPT Work or Claude Cowork with permission to the private local folder. Accounts without local folder access use the complete-ZIP path: upload the current repository and receive one complete replacement repository after approval.

Keep two folders: the public framework checkout and a separate private heuristics repository. Framework updates and explicitly approved sanitized public contributions go to GitHub. Private interviews and evidence stay in the private repository.

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

Each session produces two reviewable Markdown files: a session packet and proposed judgment-library changes. Together they include:

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

Approved candidates move into a separate private `JUDGMENT_LIBRARY.md`. ChatGPT or Claude normalizes candidates across interviews, compares them with the current library, asks focused approval questions, and completes the file transaction. The practitioner decides what represents their judgment but never has to splice Markdown.

## Normalize and publish

The third mode processes pending interview outputs against the authoritative library. It detects duplicates, contradictions, dependencies, sequencing, merges, splits, and superseded entries. It assigns stable identifiers and versions only after the candidate is ready.

The model may recommend `publish`, `revise`, `merge`, `split`, `probe`, `reject`, or `supersede`. It cannot publish until the practitioner approves the final meaning and wording through conversation.

After approval, the application updates the library, publication log, unresolved queue, intake manifest, processed evidence, and repository state. If the surface cannot write the selected folder, it returns one complete replacement repository ZIP. The user does not become a part-time Markdown migration script.

## Share one publicly

Private publication and public contribution are separate decisions. After a heuristic is safely in the private library, ChatGPT or Claude can prepare a sanitized public version, explain what it removed, and ask for a second approval. Only then may it assign an `HL-P-####` identifier and open a GitHub pull request. The practitioner does not become a part-time Git operator either.

The [public library](public-library/README.md) starts empty in v0.3. The point is to prove the boundary before filling the shelf.

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

Use the [private judgment repository guide](core/JUDGMENT_REPOSITORY.md) to understand how the application keeps session evidence, proposed changes, and the published library separate.

## Build the release packages

The product itself does not require a CLI. Maintainers can build and validate the downloadable ZIP files with Python’s standard library:

```bash
python scripts/validate.py
python scripts/build_release.py
python scripts/validate.py --downloads
```

## Project status

Version 0.3 adds the missing publication loop to the tested voice-first product. The interview workflows passed real ChatGPT and Claude runs. Sanitized forward tests passed publication and no-approval cases, and one real private-repository transaction passed conversational approval and consistency checks. See the [live result](docs/V0.3_LIVE_RESULT.md) and reusable [acceptance record](docs/V0.3_ACCEPTANCE.md).

Models have knowledge. The work here is making experienced judgment reusable without flattening it into another checklist.
