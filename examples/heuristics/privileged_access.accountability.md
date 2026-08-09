---
id: privileged_access.accountability
title: Shared identity is an accountability problem
version: 0.1.0
status: approved
kind: soft_heuristic
domains:
  - tprm
category: privileged_access
tags:
  - shared account
  - privileged access
  - accountability
  - attribution
related:
  - compensating_controls.demonstrated_bundle
expertConfidence:
  level: high
  rationale: The synthetic fixture explicitly supports this public example.
provenance:
  interviewId: interview-2026-08-09-B
  sourcePath: 'synthetic://B-shared-privileged-access.md'
  excerpts:
    - observationId: O-001
      quote: >-
        The shared name is not the whole problem. I need to know whether I can
        attribute each session.
  createdAt: '2026-08-09T15:00:00.000Z'
  approvedAt: '2026-08-09T17:00:00.000Z'
  approvedBy: Synthetic fixture reviewer (not expert approval)
---
# Shared identity is an accountability problem

## Principle
Shared privileged access increases risk when individual authorization, accountability, or forensic attribution is weakened.

## Rationale
The target account name is less important than whether actions can be authorized, constrained, and attributed to a person.

## Triggers
- A privileged credential or target identity is shared by multiple people.

## Signals
- Generic administrator identity
- No named session attribution

## Probes
- How does each person authenticate?
- How is each session approved and attributed?
- Can session activity be reconstructed?

## Confidence effect
Confidence remains low until identity and session evidence demonstrate attribution.

## Risk effect
Risk increases when shared access weakens authorization or investigation capability.

## Decision implications
- Assess accountability outcomes before classifying the design as acceptable or unacceptable.

## Escalation conditions
- Material systems lack individual authorization or attributable session records.

## Exceptions
- A shared target account may be acceptable when a broker restores strong individual authentication, approval, and session attribution.

## Compensating factors
- PAM brokering
- Just-in-time approval
- Session recording
- Credential rotation

## Common novice mistake
Treating the presence of a shared account as the conclusion instead of testing accountability.

## Examples
- **positive:** Engineers use one root identity with an unlogged shared password. => Flag weakened accountability and require remediation or escalation based on materiality.
- **counterexample:** A PAM broker maps individually approved and recorded sessions to one target identity. => Evaluate the broker evidence; do not reject solely because the target identity is shared.
