# Output contract

Every completed interview produces a two-file review bundle. The session packet preserves the case and evaluation. The proposal file isolates the candidate changes that may later be reviewed against the durable judgment library.

Return both files inline or as downloadable chat attachments by default. A suggested filename is not permission to write into a local folder, repository, Project file area, or external service. Save there only after the user explicitly chooses the destination.

## Session packet

Suggested filename:

`YYYY-MM-DD-short-topic-session-packet.md`

Use these sections:

```markdown
# Session: [topic]

## Metadata
- Date:
- Mode: judgment-capture | job-rehearsal
- GRC area:
- Source chat:
- Privacy: private | sanitized

## Decision scene
[What had to be decided and why it mattered.]

## Facts, claims, and unknowns
### Facts
### Claims needing evidence
### Unknowns

## Stakeholder and incentive map
| Actor | Wants or fears | Power or burden | Evidence from interview |

## Decision path
[Cues noticed, questions asked, thresholds considered, trade-offs weighed, intervention chosen.]

## Candidate heuristics
### [candidate-id]
- Status: candidate | needs-clarification
- Trigger:
- Context:
- Cues:
- Human dynamics:
- Judgment:
- Action or next question:
- Exceptions and reversal conditions:
- Counterexample:
- Supporting excerpts:
- Uncertainty:
- Recommended disposition: approve | revise | probe | merge | split | reject

## Candidate evaluation
| Candidate | Fidelity | Causal depth | Human system | Trade-offs | Boundedness | Actionability | Transferability | Provenance |

[Short rationale and disagreement between dimensions. No total score.]

## Contradictions and alternative explanations

## Questions for the next interview

## Proposed library changes
[Summarize the separate proposal file. Nothing becomes approved automatically.]

## Interview feedback
[Include only for job-rehearsal mode.]
```

The headings may be adapted for readability, but the evidence fields are mandatory. Every candidate needs explicit supporting excerpts, uncertainty, a counterexample, exceptions or reversal conditions, and a recommended disposition. The evaluation must address all eight qualitative dimensions with short rationales. Structure is an evidence control, not a substitute for interpretation.

## Proposed judgment-library changes

Suggested filename:

`YYYY-MM-DD-short-topic-proposed-library-changes.md`

Use these sections:

```markdown
# Proposed judgment-library changes: [topic]

## Source session
- Session packet:
- Source chat:
- Privacy: private | sanitized

## Change summary
| Candidate | Proposed action | Evidence state | Principal limitation |

## Proposed candidates
### [candidate-id]: [title]
- Status: candidate | needs-clarification
- Proposed action: add | revise | probe | merge | split | reject
- Use when:
- Notice:
- Understand:
- Do:
- Adapt for people:
- Do not apply when:
- What would change this judgment:
- Supporting excerpts:
- Uncertainty:
- Provenance:

## Promotion criteria

## Recommended review order
```

If the interview supports no defensible candidate, still create the proposal file. State `No proposed library change` and explain why. This makes abstention reviewable.

## Durable judgment library

Suggested filename:

`JUDGMENT_LIBRARY.md`

Store only expert-reviewed material. Each entry should include:

```markdown
## [stable-id]: [title]

- Status: approved | deprecated
- Version:
- GRC areas:
- Learned from:
- Last reviewed:

### Use when

### Notice

### Understand
[Causal, organizational, and interpersonal logic.]

### Do
[Question, intervention, explanation, escalation, or decision tendency.]

### Adapt for people
[Relevant incentives, authority, adoption, relationship history, and communication choices.]

### Do not apply when

### What would change this judgment

### Provenance
```

## Job-interview feedback

When the session is a rehearsal, assess whether the answer made the candidate's judgment visible. Address:

- the decision and stakes;
- stakeholders and incentives;
- evidence and uncertainty;
- trade-offs and rejected alternatives;
- actions and communication;
- result and subsequent learning;
- what a hiring manager still could not determine.

Do not manufacture an improved story. Suggest a stronger structure using only the user's demonstrated experience.
