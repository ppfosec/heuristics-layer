---
id: compensating_controls.demonstrated_bundle
title: A control product name is not a demonstrated compensating control
version: 0.1.0
status: approved
kind: caution_signal
domains:
  - tprm
  - core
category: compensating_controls
tags:
  - password vault
  - pam
  - evidence
  - control operation
related:
  - privileged_access.accountability
expertConfidence:
  level: high
  rationale: The synthetic fixture explicitly supports this public example.
provenance:
  interviewId: interview-2026-08-09-B
  sourcePath: 'synthetic://B-shared-privileged-access.md'
  excerpts:
    - observationId: O-002
      quote: >-
        Saying CyberArk does not finish the assessment. Show me checkout and
        session attribution.
  createdAt: '2026-08-09T15:00:00.000Z'
  approvedAt: '2026-08-09T17:00:00.000Z'
  approvedBy: Synthetic fixture reviewer (not expert approval)
---
# A control product name is not a demonstrated compensating control

## Principle
Credit a compensating control only for the relevant capabilities that are configured, operating, and supported by evidence.

## Rationale
A product can support many capabilities without proving that the needed outcome is configured or operating in the assessed environment.

## Triggers
- A vendor cites a product or platform as the answer to a control gap.

## Signals
- Product name without configuration detail
- Capability claim without operating evidence

## Probes
- Which capability offsets the gap?
- How is it configured?
- What artifact demonstrates operation?

## Confidence effect
A named product raises a testable hypothesis but should not materially increase confidence by itself.

## Risk effect
Demonstrated capabilities may reduce residual risk; unsupported claims do not.

## Decision implications
- Map each claimed capability to the original control objective and evidence.

## Escalation conditions
- A material gap relies on an unverified compensating control.

## Exceptions
- Previously validated, current evidence may be reused when scope and configuration are unchanged.

## Compensating factors
- Configuration export
- Access log
- Sample approval
- Independent test

## Common novice mistake
Awarding full control credit because a recognized security product is deployed.

## Examples
- **positive:** Vendor says CyberArk manages a shared admin password but supplies no configuration or logs. => Ask for the specific checkout, approval, rotation, and attribution evidence.
- **negative:** Vendor provides current configuration and sampled records showing named, approved, recorded sessions. => Credit the demonstrated capabilities against the accountability gap.
