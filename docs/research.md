# Research basis

The Heuristics Layer borrows methods, not authority, from adjacent fields.

## Knowledge elicitation

Cognitive task analysis (CTA) is used to elicit and transfer tacit knowledge about expert decisions. A 2022 systematic review found interviews and the Critical Decision Method among the most common techniques, especially in work involving complexity and uncertainty. Applied CTA studies organize knowledge around decisions, cues, strategies, and novice traps. The interview specification therefore probes concrete incidents before attempting abstraction, asks what cue changed the expert's confidence, looks for exceptions, and records what a novice would miss.

Sources:

- Swaby et al., “The use of cognitive task analysis in clinical and health services research: a systematic review,” 2022: https://doi.org/10.1186/s40814-022-01002-6
- Craig et al., “Using cognitive task analysis to identify critical decisions in the laparoscopic environment,” 2012: https://doi.org/10.1177/0018720812448393

## Human oversight and evaluation

NIST's AI RMF calls for defined human oversight and documented, repeatable test, evaluation, verification, and validation. Its Generative AI Profile also recommends testing generated content against defined guidance and maintaining provenance feedback loops with human reviewers. This project consequently treats model output as a candidate, never as approved expert knowledge, and stores observable evaluation artifacts rather than hidden chain-of-thought.

Sources:

- NIST AI RMF Core: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/
- NIST AI 600-1, Generative AI Profile: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf

## Portability and versioning

Canonical objects are validated in code and exported as JSON compatible with JSON Schema Draft 2020-12. Object versions follow Semantic Versioning. Major version zero is intentionally used while the object contract is still being learned.

Sources:

- JSON Schema Draft 2020-12: https://json-schema.org/draft/2020-12
- Semantic Versioning 2.0.0: https://semver.org/spec/v2.0.0.html

## Deliberate limits

The research does not prove that extracted heuristics improve decisions in every domain. The included evaluation proves only that the local pipeline can run a controlled comparison against declared rubric items. Domain claims require expert-approved corpora and representative task sets.
