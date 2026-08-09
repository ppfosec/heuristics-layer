# Normalize and publish

Use this protocol to turn pending interview outputs into the authoritative private heuristics library. The application performs all parsing, reconciliation, editing, identifiers, versions, and file operations. The practitioner answers substantive questions through voice or text.

## Read the repository

Work only in the private folder the user explicitly selects. Read:

- `REPOSITORY_STATE.md`;
- `library/JUDGMENT_LIBRARY.md`;
- `intake/INTAKE_MANIFEST.md` and pending intake artifacts;
- related session packets and proposals;
- `publications/PUBLICATION_LOG.md`;
- `unresolved/UNRESOLVED_QUESTIONS.md`.

If the repository does not exist, copy the structure in `assets/private-heuristics-repository/` into the selected folder. Do not make the user create individual files.

Register any unlisted files found in `intake/` as pending bundles before normalization. Group related evidence, update `intake/INTAKE_MANIFEST.md`, and reconcile the pending count in `REPOSITORY_STATE.md`. Registration does not publish knowledge and requires no approval. Do not move or delete source files during registration.

## Normalize and reconcile

For every candidate:

1. Separate case facts, domain facts, preferences, organizational history, stakeholder inference, hypotheses, and reusable judgment.
2. Produce the smallest portable heuristic supported by evidence.
3. Preserve use conditions, cues, causal logic, action, human adaptation, boundaries, reversal conditions, supporting excerpts, uncertainty, counterexample, and provenance.
4. Compare it with the current library and other candidates for duplicates, conflicts, dependencies, sequencing, merges, splits, and supersession.
5. Challenge it with a counterexample, one changed condition, an alternative explanation, missing stakeholder perspectives, hindsight bias, overfitting, and disconfirming evidence.
6. Read the immutable identifier prefix from `REPOSITORY_STATE.md` and assign `[prefix]-####` only when the candidate is ready to publish. Begin at version `1.0.0` and preserve the identifier across revisions.

Do not use numerical scoring or field completion as a substitute for judgment.

## Ask for approval

Present the proposed final wording, why it is reusable, its most important limit, its relationship to existing entries, and the recommended disposition. Ask one focused question at a time.

Supported dispositions are `publish`, `revise`, `merge`, `split`, `probe`, `reject`, and `supersede`.

Never ask the practitioner to copy Markdown, compare files, assign identifiers, move evidence, or edit the library. Do not publish until the practitioner explicitly approves the final meaning and wording in the conversation.

## Complete the publication transaction

After approval:

1. update `library/JUDGMENT_LIBRARY.md`;
2. append the decision to `publications/PUBLICATION_LOG.md`;
3. update `unresolved/UNRESOLVED_QUESTIONS.md`;
4. preserve processed evidence under the dated `sessions/`, `proposals/`, or `archive/` location;
5. update `intake/INTAKE_MANIFEST.md` and `REPOSITORY_STATE.md`;
6. validate that identifiers, versions, counts, states, and provenance agree;
7. report the result in the application.

If a write fails, stop and restore or provide the last internally consistent state. Do not leave a candidate published in only some files.

If the surface cannot write the selected folder, create one complete replacement repository ZIP. Do not return isolated snippets or ask the practitioner to merge them.

Never write outside the selected folder, copy private material into the public product repository, destroy evidence, or silently promote model inference.
