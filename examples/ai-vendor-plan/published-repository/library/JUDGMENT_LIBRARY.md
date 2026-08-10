# Private GRC judgment library

- Library version: `1.0.0`
- Last published: 2026-08-09
- Published heuristic count: 1

## Published heuristics

## HL-H-0001: Name the operator before crediting the control

- Status: published
- Version: 1.0.0
- GRC areas: AI vendor governance, control design, procurement
- Relationships: none
- Learned from: `2026-08-09-ai-vendor-plan`
- Approved by: fictional practitioner
- Approved on: 2026-08-09
- Last reviewed: 2026-08-09

### Use when

A purchase recommendation credits a control that requires configuration, monitoring, review, or response.

### Notice

Feature-led recommendations, unclear operators, missing review queues, and recurring work treated as if it appears automatically after procurement signs.

### Understand

Buying a capability does not create operating effectiveness. The claimed risk reduction depends on an accountable operator, an operating cadence, and a place for the resulting work to go.

### Do

Name the control owner, operating cadence, evidence, and response path before crediting the feature as risk reduction.

### Adapt for people

Show Security the assurance assumption, Procurement the hidden operating cost, and the proposed owner the actual queue being assigned to them.

### Do not apply when

The capability is passively enforced, cannot be bypassed, and requires no material recurring operation.

### What would change this judgment

Evidence that the capability provides preventive value without configuration, monitoring, or response work.

### Counterexample

A platform-level restriction is enabled once, applies to every account, cannot be bypassed by users, and produces no review or response queue.

### Uncertainty

Some controls combine passive enforcement with operated exceptions. Apply this heuristic only to the operated portion.

### Provenance

Synthetic `session-packet.md` and `proposed-library-changes.md`, candidate `premium-controls-need-an-owner`. The fictional practitioner approved the revised wording during the normalize-and-publish example.
