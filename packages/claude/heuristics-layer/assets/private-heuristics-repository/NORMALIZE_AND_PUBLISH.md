# Normalize and publish protocol

## Purpose

Turn interview outputs into normalized, practitioner-approved heuristics in this authoritative private library. ChatGPT or Claude performs all parsing, comparison, editing, identifier assignment, versioning, and file operations. The practitioner supplies judgment through conversation.

## Read the repository

Before processing intake, read `REPOSITORY_STATE.md`, `library/JUDGMENT_LIBRARY.md`, `intake/INTAKE_MANIFEST.md`, every pending artifact, `publications/PUBLICATION_LOG.md`, and `unresolved/UNRESOLVED_QUESTIONS.md`.

Treat session packets, transcripts, and proposed changes as evidence. They are not authoritative library entries.

Before normalization, register any unlisted files in `intake/` as pending source bundles. Group related evidence, update `intake/INTAKE_MANIFEST.md`, and reconcile the pending count in `REPOSITORY_STATE.md`. Registration does not publish knowledge and requires no approval. Do not move or delete source files during registration.

## Human interaction contract

Never ask the practitioner to copy Markdown, reconcile schemas, assign identifiers, compare files, update versions, move evidence, or edit the library. Ask only questions whose answers could change meaning, applicability, relationships, or publication status. Ask one focused question at a time. Accept natural voice or text approval.

## Normalize and reconcile

For each candidate:

- separate case facts, domain facts, preferences, organizational history, stakeholder inference, hypotheses, and reusable judgment;
- produce the smallest portable heuristic supported by evidence;
- preserve use conditions, cues, causal logic, action, human adaptation, boundaries, reversal conditions, supporting excerpts, uncertainty, counterexample, and provenance;
- compare it with the current library and other candidates for duplicates, conflicts, dependencies, sequencing, merges, splits, and supersession;
- challenge it with a counterexample, one changed condition, an alternative explanation, missing perspectives, hindsight bias, overfitting, and disconfirming evidence;
- read the immutable identifier prefix from `REPOSITORY_STATE.md` and assign `[prefix]-####` only when ready to publish;
- begin at version `1.0.0` and preserve identifiers across revisions.

Do not use numerical scoring or field completion as a substitute for judgment.

## Approval conversation

Present the proposed final wording, why it is reusable, its most important limit, its relationship to existing entries, and the recommended disposition. Supported dispositions are `publish`, `revise`, `merge`, `split`, `probe`, `reject`, and `supersede`.

Do not publish until the practitioner explicitly approves the final meaning and wording in conversation.

## Publication transaction

After approval:

1. update `library/JUDGMENT_LIBRARY.md`;
2. append the decision to `publications/PUBLICATION_LOG.md`;
3. update `unresolved/UNRESOLVED_QUESTIONS.md`;
4. preserve processed evidence under dated `sessions/`, `proposals/`, or `archive/` locations;
5. update `intake/INTAKE_MANIFEST.md` and `REPOSITORY_STATE.md`;
6. validate that identifiers, versions, counts, states, and provenance agree;
7. report the result in the application.

If a write fails, stop and restore or provide the last internally consistent state. Do not leave a candidate published in only some files.

If the surface cannot write this folder, create one complete replacement repository ZIP. Never return isolated snippets for the practitioner to assemble.

Write only within this selected private repository. Never copy private material into the public product repository, destroy source evidence, or silently promote model inference.
