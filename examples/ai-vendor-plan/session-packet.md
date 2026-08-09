# Session: Choosing an AI assistant plan

> Synthetic example. The companies, people, and decision are fictional. Product capabilities are intentionally generalized because vendor plans change.

## Metadata

- Date: 2026-08-09
- Mode: judgment-capture
- GRC area: AI vendor governance
- Source chat: synthetic fixture
- Privacy: sanitized

## Decision scene

A security lead preferred an enterprise AI-assistant tier because it offered additional administrative and security capabilities. A product team preferred the team tier because of cost and expected adoption. The practitioner had to recommend a plan without treating the security feature list as the entire decision.

## Facts, claims, and unknowns

### Facts

- The enterprise tier had additional controls relevant to the security team.
- The team tier cost less.
- The product team already preferred the vendor and was likely to use it.

### Claims needing evidence

- The additional controls materially reduced the risks of the proposed use case.
- The product team would reject or bypass another approved tool.
- A lower tier plus compensating controls could meet the organization’s obligations.

### Unknowns

- Whether any missing enterprise control was contractually required.
- Which data and workflows the team intended to place in the service.
- Who would operate the additional controls after purchase.
- Whether the adoption concern reflected observed behavior or assumption.

## Stakeholder and incentive map

| Actor | Wants or fears | Power or burden | Evidence from interview |
| --- | --- | --- | --- |
| Security lead | Stronger administration and a defensible approval | Can withhold security recommendation | Focused on the feature delta |
| Product team | A tool it will use without a large budget increase | Creates adoption or bypass risk | Had already built affinity for the vendor |
| Finance | Predictable cost and justified premium | Controls budget approval | Asked which risk the price difference purchased down |
| Practitioner | A control environment that works after procurement | Must translate and document residual risk | Refused to equate the largest plan with the best decision |

## Decision path

The practitioner first separated mandatory requirements from desirable features. They then asked who would operate each enterprise control and whether the product team’s adoption concern was supported by prior behavior. They treated adoption as part of control effectiveness, while refusing to use preference as a waiver for contractual or non-compensable requirements. Reversibility mattered: a bounded pilot with restricted data could produce evidence before a wider commitment.

## Candidate heuristics

### adoption-is-part-of-control-effectiveness

- Status: candidate
- Trigger: A formally stronger option may face meaningful user resistance.
- Context: Tool or process selection where daily user behavior affects whether the control operates.
- Cues: Existing tool affinity, history of bypass, implementation burden, weak ownership of premium controls.
- Human dynamics: Security receives assurance from features; the operating team receives the workload and loss of autonomy.
- Judgment: Compare real operating effectiveness, not feature lists alone. A stronger control that will be bypassed may produce less protection than a narrower control people consistently use.
- Action or next question: Ask what observed behavior supports the adoption forecast and who will operate each proposed control.
- Exceptions and reversal conditions: Do not trade away contractual, regulatory, or non-compensable requirements for adoption.
- Counterexample: The team dislikes the enterprise tier but consistently follows mandated tooling and the additional control is required by customer contract.
- Supporting excerpts: “The plan only protects us if the team actually works inside it.” “Preference is not a waiver.”
- Uncertainty: The interview did not establish actual bypass history.
- Recommended disposition: probe

### premium-controls-need-an-owner

- Status: candidate
- Trigger: A premium tier is justified through controls that require configuration, monitoring, or review.
- Context: Security tooling and SaaS plan selection.
- Cues: Feature-led recommendation, unclear operator, no review process, price premium treated as maturity.
- Human dynamics: Procurement can buy the feature while the operating burden lands on an unnamed team.
- Judgment: Do not count an administrative capability as risk reduction until someone can explain who configures it, reviews it, and responds when it signals a problem.
- Action or next question: Ask for the control owner and operating cadence before crediting the feature.
- Exceptions and reversal conditions: A passively enforced capability may provide value without a recurring review process.
- Counterexample: The control is enabled by default, cannot be bypassed, and has no ongoing operating requirement.
- Supporting excerpts: “We keep pricing the button and forgetting the queue behind it.”
- Uncertainty: Some capabilities may be inherently preventive.
- Recommended disposition: revise

## Candidate evaluation

| Candidate | Fidelity | Causal depth | Human system | Trade-offs | Boundedness | Actionability | Transferability | Provenance |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| adoption-is-part-of-control-effectiveness | strong | strong | strong | strong | strong | strong | partial | partial |
| premium-controls-need-an-owner | strong | strong | strong | partial | partial | strong | strong | partial |

The adoption candidate is useful but still leans on an unverified claim about the team’s behavior. Another interview should ask for a concrete case where the team bypassed, resisted, or embraced an imposed tool. The control-owner candidate transfers well, but it needs a cleaner distinction between passively enforced features and controls that create an operational queue.

## Contradictions and alternative explanations

- Vendor affinity may reflect genuine usability evidence rather than identity or brand attachment.
- Security may know about a contractual commitment that was not present in the interview.
- The cost objection may be a proxy for budget ownership rather than disagreement about risk.

## Questions for the next interview

- Describe a time this team bypassed or successfully adopted an imposed tool.
- Which enterprise capabilities would be non-compensable for this use case?
- Who would own configuration, monitoring, and evidence after purchase?
- What pilot boundary would create useful evidence without creating an irreversible commitment?

## Proposed judgment-library changes

Do not approve either candidate yet. Probe adoption history. Revise the control-owner candidate to distinguish passive enforcement from operated controls.
