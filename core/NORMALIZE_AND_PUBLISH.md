# Normalize and publish protocol

## Purpose

Turn interview outputs into normalized, practitioner-approved heuristics in the authoritative private library. ChatGPT or Claude performs all parsing, comparison, editing, identifier assignment, versioning, and file operations. The practitioner supplies judgment through conversation.

Use this protocol when the user asks to normalize, approve, promote, merge, or publish heuristic candidates, update the judgment library, or process pending interview outputs.

## Required repository

Work only in the private repository folder the user explicitly selects. Read:

1. `REPOSITORY_STATE.md`;
2. `library/JUDGMENT_LIBRARY.md`;
3. `intake/INTAKE_MANIFEST.md` and every pending intake artifact;
4. related session packets and proposals when provenance is needed;
5. `publications/PUBLICATION_LOG.md`;
6. `unresolved/UNRESOLVED_QUESTIONS.md`.

Treat session packets, transcripts, and proposed changes as evidence. They are not authoritative library entries.

Before normalization, register any unlisted files found in `intake/` as pending source bundles. Group related session and proposal files, record their filenames and evidence state in `intake/INTAKE_MANIFEST.md`, and update the pending count in `REPOSITORY_STATE.md`. This bookkeeping does not publish knowledge and does not require approval. Do not move or delete the source during registration.

If the repository does not exist, create it from the supplied private-repository template before processing intake. Do not make the user create or edit individual files.

## Human interaction contract

Never ask the practitioner to copy Markdown, reconcile schemas, assign identifiers, compare files, update versions, move evidence, or edit the library. Ask only questions whose answers could change meaning, applicability, relationships, or publication status. Ask one focused question at a time. Accept natural voice or text approval; do not require a command phrase.

## Normalize

For each candidate:

- separate case facts, external domain facts, preferences, organizational history, stakeholder inference, hypotheses, and reusable judgment;
- produce the smallest portable heuristic supported by the evidence;
- preserve when it applies, what to notice, why it matters, what to do, how to adapt for people, when not to apply it, and what would change the judgment;
- preserve supporting excerpts, provenance, uncertainty, a counterexample, exceptions, and reversal conditions;
- read the immutable identifier prefix from `REPOSITORY_STATE.md` and assign `[prefix]-####` only when the candidate is ready to publish;
- begin published wording at version `1.0.0` and preserve identifiers across revisions;
- reject polished narration and generic GRC knowledge that do not represent practitioner judgment.

## Reconcile

Compare every candidate with the current library and other pending candidates. Detect:

- duplicates and near-duplicates;
- broader or narrower versions of the same judgment;
- contradictions that may depend on context;
- dependencies and sequencing;
- candidates that supersede existing entries;
- candidates that should merge or split;
- missing evidence that blocks publication.

Resolve what the evidence supports. Ask the practitioner only when the answer changes the result.

## Challenge

Before recommending publication:

- construct a plausible counterexample;
- change one important condition and reconsider the candidate;
- test an alternative explanation;
- identify missing stakeholder perspectives;
- test for hindsight bias, organizational overfitting, and personal preference;
- state what evidence would disconfirm the heuristic;
- confirm that the heuristic could change a future question, intervention, explanation, escalation, or decision.

Do not use a numerical score or a field-completion test.

## Approval conversation

Present each publication decision in plain language:

- proposed final wording;
- why it is reusable;
- most important boundary or counterexample;
- relationship to existing entries;
- recommended disposition.

Supported dispositions are `publish`, `revise`, `merge`, `split`, `probe`, `reject`, and `supersede`.

The model may recommend a disposition. Do not write a published entry until the practitioner explicitly approves its final meaning and wording in the conversation.

## Publication transaction

After explicit approval, complete all of these operations as one transaction:

1. add or update the normalized entry in `library/JUDGMENT_LIBRARY.md`;
2. preserve stable identifiers and update versions;
3. record dependencies, superseded entries, boundaries, and provenance;
4. append the decision to `publications/PUBLICATION_LOG.md`;
5. update `unresolved/UNRESOLVED_QUESTIONS.md`;
6. place processed evidence in the appropriate dated `sessions/`, `proposals/`, or `archive/` location without destroying the source;
7. update `intake/INTAKE_MANIFEST.md` and `REPOSITORY_STATE.md`;
8. validate that repository counts and states agree;
9. report the publication result in the application.

If any write fails, stop. Do not leave a candidate marked published in only some files. Restore or provide the last internally consistent state and explain the failed operation.

## Surface fallback

When the current application cannot write directly to the selected private folder, generate one complete replacement ZIP containing the entire resulting repository. Do not return isolated snippets or ask the practitioner to merge files. State that the bundle must replace the prior repository only after the practitioner reviews the publication summary.

## Privacy and safety

- Write only within the selected private repository unless another destination is explicitly authorized.
- Never copy private content into the public Heuristics Layer repository.
- Sanitize identifiable company, customer, employee, vendor, system, and contract details unless preservation is explicitly approved.
- Never silently promote model inference into practitioner knowledge.
- Never destroy source evidence. Archive rejected, duplicated, and superseded material with its decision record.
