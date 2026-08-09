---
name: heuristics-layer
description: Conduct voice-first GRC judgment interviews and normalize and publish approved practitioner heuristics into a private authoritative library. Use for GRC decision debriefs, tacit-knowledge capture, stakeholder and incentive analysis, GRC job-interview rehearsal, processing interview outputs, reconciling candidate heuristics, or updating a private judgment library.
---

# Heuristics Layer

Conduct a natural GRC interview, perform an LLM-led editorial pass, and publish normalized practitioner-approved heuristics when requested. Optimize for the practitioner's decision habits, stakeholder reading, incentive analysis, trade-offs, uncertainty, and communication choices. Treat control and framework knowledge as case context rather than the main extraction target.

## Choose a mode

- Use `judgment-capture` for a real or sanitized GRC decision, disagreement, exception, escalation, or failure.
- Use `job-rehearsal` for a realistic GRC hiring interview. Do not coach during an answer unless the user pauses the rehearsal. Ask only follow-ups that fit the role, interview stage, and available time. Reserve deep extraction for after the answer or interview.
- Use `normalize-and-publish` to process pending interview outputs, reconcile them with the authoritative library, obtain conversational approval, and complete the publication transaction without requiring the practitioner to edit files.

If the request clearly concerns an interview, choose the relevant interview mode. If it concerns candidates, intake, approval, promotion, normalization, or the library, choose `normalize-and-publish`. Ask only when the intent is genuinely ambiguous.

## Load the protocol

Read these references before beginning:

- `references/interview-protocol.md`
- `references/grc-judgment-model.md`

When the user says `close and process`, also read:

- `references/evaluation-protocol.md`
- `references/output-contract.md`

When the user asks where to save outputs, how to maintain the private library, or how to merge approved candidates, read `references/judgment-repository.md`. Do not require this reference to begin or complete an interview.

For `normalize-and-publish`, read both:

- `references/normalize-and-publish.md`
- `references/judgment-repository.md`

If the private repository does not exist, use `assets/private-heuristics-repository/` as the source structure.

## Run the interview

Start from one concrete decision scene. Ask one primary question at a time in voice mode. Follow cues that reveal judgment instead of completing a questionnaire.

Do not summarize prematurely. Probe what the expert noticed, why it mattered, who wanted what, who could block the outcome, how adoption and organizational history affected the decision, what evidence would change the conclusion, and when the opposite choice would be reasonable.

In job rehearsal, behave like a credible hiring interviewer rather than an extraction facilitator. Do not exhaust every branch, announce the evaluation model, or turn the live interview into an open-ended Socratic debrief.

When enough material exists, say:

> I have enough evidence for this pass. I still see these uncertainties: [brief list]. Should I probe them, or close and process the interview?

Do not rely on the user ending the voice interface as an automation trigger.

## Process the interview

When the user says `close and process`, stop asking interview questions. Reconstruct the decision, propose the smallest defensible set of candidate heuristics, challenge every candidate, evaluate them qualitatively, and produce the two-file review bundle.

Never approve inferred knowledge automatically. Recommend a disposition and leave approval to the expert.

Every candidate must explicitly include supporting excerpts, uncertainty, a counterexample, exceptions or reversal conditions, and a recommended disposition. Evaluate all eight qualitative dimensions with short rationales and no total score.

If file creation is available in the chat, create two downloadable Markdown files: the session packet and proposed judgment-library changes. Otherwise, provide two complete copyable Markdown blocks. If voice file creation fails, regenerate the same two files from the completed chat in the app or text interface without re-interviewing or changing the analysis. Do not write into a local folder, repository, Project file area, Drive, or another destination unless the user explicitly chooses that destination. Ask whether the user wants to review candidates now or return later on desktop.

## Normalize and publish

Run this mode on a desktop surface that can access the private repository folder. Inventory pending intake, compare candidates with the existing library, normalize and challenge them, and ask only the substantive questions needed for publication.

Never ask the practitioner to edit Markdown, compare files, assign identifiers, update versions, or move evidence. After explicit conversational approval, update the library, publication log, unresolved queue, intake manifest, processed evidence, and repository state as one consistent transaction.

If the surface cannot write the selected folder, create one complete replacement repository ZIP. Do not return a collection of snippets for the practitioner to assemble.

## Protect private material

Keep identifiable company, customer, employee, and vendor details private by default. Sanitize reusable artifacts unless the user explicitly asks to preserve names. A downloadable chat attachment is not permission to save elsewhere. Confirm the exact destination before any local or external write.
