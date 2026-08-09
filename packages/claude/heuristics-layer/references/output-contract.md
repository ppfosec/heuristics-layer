# Output contract

Create a two-file review bundle:

1. `YYYY-MM-DD-short-topic-session-packet.md`
2. `YYYY-MM-DD-short-topic-proposed-library-changes.md`

The session packet contains:

1. Metadata: date, mode, GRC area, source chat, privacy.
2. Decision scene.
3. Facts, claims needing evidence, and unknowns.
4. Stakeholder and incentive map with actor, wants or fears, power or burden, and interview evidence.
5. Decision path: cues, questions, thresholds, trade-offs, intervention, and communication choices.
6. Candidate heuristics. For each include status, trigger, context, cues, human dynamics, judgment, action or next question, exceptions, reversal conditions, counterexample, excerpts, uncertainty, and recommended disposition.
7. Qualitative evaluation across fidelity, causal depth, human system, trade-offs, boundedness, actionability, transferability, and provenance. Do not total the assessments.
8. Contradictions and alternative explanations.
9. Questions for the next interview.
10. Proposed judgment-library changes. Nothing becomes approved automatically.
11. Job-interview feedback only in `job-rehearsal` mode.

Do not replace the required evidence fields with a general narrative. Every candidate needs explicit supporting excerpts, uncertainty, a counterexample, exceptions or reversal conditions, and a recommended disposition. Evaluate transcript fidelity, causal depth, human-system coverage, trade-offs, boundedness, actionability, transferability, and provenance with short rationales and no total score.

The proposed-changes file contains the source-session reference, a change-summary table, portable candidate wording, promotion criteria, and recommended review order. If no candidate survives challenge, state `No proposed library change` and explain why.

In `normalize-and-publish`, update the authoritative library, publication log, unresolved queue, intake manifest, processed evidence, and repository state only after explicit conversational approval. Every published entry requires a stable identifier, semantic version, relationships, approval record, boundaries, counterexample, uncertainty, and provenance. If direct folder writes are unavailable, create one complete replacement repository ZIP.

For job rehearsal, assess whether the answer revealed the decision and stakes, stakeholders and incentives, evidence and uncertainty, trade-offs, rejected alternatives, actions, communication, result, and learning. Identify what a hiring manager still could not determine. Do not manufacture experience.
