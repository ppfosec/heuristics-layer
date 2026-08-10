# LLM-led extraction, challenge, and evaluation

This stage is semantic editorial work. Do not simulate it with keyword counts, fixed scores, or field-completion rules.

## 1. Reconstruct the decision

Describe the decision as the expert encountered it:

- relevant facts and claims;
- uncertainty and missing evidence;
- stakeholders, incentives, authority, and likely resistance;
- business, security, compliance, financial, and adoption consequences;
- reversibility and time pressure;
- the sequence of questions and interventions.

Keep case facts separate from the expert's reusable judgment.

## 2. Propose the smallest useful set of candidates

Create a candidate only when the transcript supports a reusable pattern that could change a future question, intervention, explanation, escalation, or decision.

A candidate should state:

- when it applies;
- which cues matter;
- what causal or organizational logic connects the cues to the response;
- what the expert tends to do;
- what could reverse or limit it;
- which transcript evidence supports it;
- what remains uncertain.

Merge restatements of the same judgment. Split candidates that contain different triggers or different decision consequences.

## 3. Challenge every candidate

For each candidate:

- construct a plausible counterexample;
- change one important condition and reconsider the result;
- test whether it is merely a domain fact or personal preference;
- test whether an alternative explanation fits the transcript;
- identify missing stakeholder perspectives;
- identify where hindsight or outcome knowledge may be distorting the account;
- ask what evidence would disconfirm the candidate.

Revise, narrow, split, defer, or reject weak candidates. Do not preserve a candidate merely because it fits the output template.

## 4. Evaluate with judgment, not arithmetic

Assess each candidate as `strong`, `partial`, `unsupported`, or `contradicted` across these dimensions:

- **Transcript fidelity:** supported by what the expert actually said.
- **Causal depth:** explains why the pattern matters rather than repeating a conclusion.
- **Human-system coverage:** represents incentives, authority, adoption, relationships, or communication where material.
- **Trade-off quality:** preserves competing costs and consequences.
- **Boundedness:** states exceptions, reversal conditions, or uncertainty.
- **Actionability:** changes what a practitioner asks, does, communicates, or decides.
- **Transferability:** can help in another GRC situation without pretending every organization is the same.
- **Provenance:** points to supporting excerpts or moments.

Write a short rationale for every assessment. Do not calculate a total score. Conflicting dimensions are useful editorial evidence.

## 5. Keep approval human

The LLM may recommend `publish`, `revise`, `probe`, `merge`, `split`, `reject`, or `supersede`. Only the expert may authorize publication.

If the expert has not reviewed the candidate, use `candidate` or `needs-clarification`. Route the proposal into the later `normalize-and-publish` mode. Do not make the practitioner edit or merge files.

## 6. Produce the output contract

Create the artifacts defined in `OUTPUT_CONTRACT.md`. Preserve uncertainty and provenance. Do not expose hidden chain-of-thought. Provide observable evidence, interpretations, challenges, and decisions.
