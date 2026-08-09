---
id: materiality.gap_vs_consequence
title: A real gap is not automatically material
version: 0.1.0
status: approved
kind: escalation_trigger
domains:
  - risk
  - core
category: materiality
tags:
  - gap
  - materiality
  - escalation
  - impact
related: []
expertConfidence:
  level: high
  rationale: The synthetic fixture explicitly supports this public example.
provenance:
  interviewId: interview-2026-08-09-C
  sourcePath: 'synthetic://C-materiality-escalation.md'
  excerpts:
    - observationId: O-001
      quote: A real gap does not automatically deserve escalation.
  createdAt: '2026-08-09T16:00:00.000Z'
  approvedAt: '2026-08-09T17:00:00.000Z'
  approvedBy: Synthetic fixture reviewer (not expert approval)
---
# A real gap is not automatically material

## Principle
Escalation should reflect plausible consequence and decision significance, not the existence of a control gap alone.

## Rationale
Equivalent gaps can create very different exposure depending on data, dependency, scope, reversibility, and impact.

## Triggers
- A confirmed control gap is being considered for escalation.

## Signals
- Severity label derived from gap presence alone

## Probes
- What can happen?
- Who or what is exposed?
- Is the effect reversible?

## Confidence effect
Evidence of a gap can be high-confidence while its materiality remains uncertain.

## Risk effect
Materiality depends on the scenario's consequence and exposure.

## Decision implications
- Assess impact dimensions before escalation.

## Escalation conditions
- Plausible impact crosses an accountable decision threshold.

## Exceptions
- Mandatory escalation rules may apply regardless of estimated consequence.

## Compensating factors
- Limited scope
- Rapid reversibility
- Layered controls

## Common novice mistake
Equating control deficiency with high risk.

## Examples
- **positive:** The gap exposes regulated production data and cannot be quickly reversed. => Escalate based on material consequence.
- **counterexample:** The same gap exists in an isolated disposable test system. => Record the gap without automatically escalating it.
