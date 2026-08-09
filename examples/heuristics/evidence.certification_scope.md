---
id: evidence.certification_scope
title: Certification answers a bounded question
version: 0.1.0
status: approved
kind: soft_heuristic
domains:
  - tprm
  - core
category: evidence_quality
tags:
  - certification
  - soc 2
  - scope
  - evidence
related: []
expertConfidence:
  level: high
  rationale: The synthetic fixture explicitly supports this public example.
provenance:
  interviewId: interview-2026-08-09-A
  sourcePath: 'synthetic://A-certification-evidence.md'
  excerpts:
    - observationId: O-001
      quote: A report only helps if the service and control are actually in scope.
  createdAt: '2026-08-09T14:00:00.000Z'
  approvedAt: '2026-08-09T17:00:00.000Z'
  approvedBy: Synthetic fixture reviewer (not expert approval)
---
# Certification answers a bounded question

## Principle
Certification should reduce uncertainty only for risks, systems, periods, and controls demonstrably covered by its scope.

## Rationale
An assurance report cannot support claims outside what was examined.

## Triggers
- Certification is cited as evidence for a specific technical or organizational claim.

## Signals
- No scope mapping
- Relevant service omitted

## Probes
- Is the service in scope?
- Is the relevant control covered?
- Does the period apply?

## Confidence effect
Increase confidence only within the report's demonstrated boundary.

## Risk effect
Certification does not directly remove underlying risk outside its scope.

## Decision implications
- Map the question to report scope and exceptions.

## Escalation conditions
- A material claim relies solely on out-of-scope assurance.

## Exceptions
- A scoped report may be sufficient for a low-materiality question when the exact control is tested.

## Compensating factors
- Bridge letter
- Control-specific artifact

## Common novice mistake
Treating certification as a universal security maturity proxy.

## Examples
- **positive:** A SOC 2 report excludes the product handling assessed data. => Do not use it to close the product-specific question.
- **negative:** The relevant service and control are tested for the applicable period with no exception. => Use the report to reduce uncertainty for that bounded question.
