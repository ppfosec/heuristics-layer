# Proposed judgment-library changes: Choosing an AI assistant plan

## Source session

- Session packet: `session-packet.md`
- Source chat: fictional example
- Privacy: sanitized

## Change summary

| Candidate | Proposed action | Evidence state | Principal limitation |
| --- | --- | --- | --- |
| adoption-is-part-of-control-effectiveness | probe | partial | Actual bypass or adoption history was not established |
| premium-controls-need-an-owner | revise | partial | Passive controls and operated controls need separate treatment |

## Proposed candidates

### adoption-is-part-of-control-effectiveness

- Status: candidate
- Proposed action: probe
- Use when: A formally stronger control depends on daily behavior and faces credible adoption resistance.
- Notice: Existing tool affinity, implementation burden, prior bypass, and where the work lands.
- Understand: A feature has limited control value when the operating team routes around it. Preference alone still cannot waive a non-compensable requirement.
- Do: Compare expected operating effectiveness and ask what observed behavior supports the adoption forecast.
- Adapt for people: Separate the assurance Security receives from the workload and loss of autonomy absorbed by the operating team.
- Do not apply when: A contractual, regulatory, or other mandatory requirement decides the control floor.
- What would change this judgment: Evidence that the team consistently adopts mandated tooling or that the stronger capability is passive and non-bypassable.
- Supporting excerpts: “The plan only protects us if the team actually works inside it.” “Preference is not a waiver.”
- Uncertainty: The interview did not establish actual bypass history.
- Provenance: `session-packet.md`, candidate `adoption-is-part-of-control-effectiveness`.

### premium-controls-need-an-owner

- Status: candidate
- Proposed action: revise
- Use when: A premium tier is justified through controls requiring configuration, monitoring, review, or response.
- Notice: Feature-led recommendations, unclear operators, missing review processes, and price premiums treated as maturity.
- Understand: Procurement can buy the feature while its operating queue lands on an unnamed team.
- Do: Identify the control owner and operating cadence before crediting the feature as risk reduction.
- Adapt for people: Make the hidden workload visible to Security, Product, Procurement, and the team expected to operate it.
- Do not apply when: The capability is passively enforced, cannot be bypassed, and has no recurring operating requirement.
- What would change this judgment: Evidence that the feature provides preventive value without configuration or monitoring.
- Supporting excerpts: “We keep pricing the button and forgetting the queue behind it.”
- Uncertainty: Some premium capabilities may be inherently preventive.
- Provenance: `session-packet.md`, candidate `premium-controls-need-an-owner`.

## Promotion criteria

- Obtain a concrete adoption or bypass case before promoting the first candidate.
- Split passive enforcement from operated controls before promoting the second candidate.
- Preserve the mandatory-requirement override in any approved wording.
- Require practitioner review of the final wording and provenance.

## Recommended review order

1. Probe the practitioner for observed adoption behavior.
2. Revise the control-owner candidate into passive and operated variants if the evidence supports both.
3. Approve, merge, or reject only after the new evidence is recorded.
