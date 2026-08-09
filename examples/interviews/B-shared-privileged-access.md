---
id: interview-2026-08-09-B
title: Shared privileged access and compensating controls
domain: tprm
synthetic: true
recordedAt: 2026-08-09T15:00:00.000Z
---

INTERVIEWER: The vendor says its administrators share a privileged account protected by CyberArk. What is your first reaction?

EXPERT: I get concerned, but the shared name is not the whole problem. I need to know whether I can attribute each session. Saying CyberArk does not finish the assessment. Show me checkout and session attribution.

INTERVIEWER: Why does attribution matter more than the name?

EXPERT: Because I care whether a named person was authorized, whether access was time-bound, and whether we can reconstruct what happened. A PAM broker can use one target identity while restoring those outcomes.

INTERVIEWER: So shared accounts are acceptable?

EXPERT: That is too broad. If people know a standing password and logs only say “admin,” the risk is real. If each person authenticates, receives approval, gets a rotated credential, and has a recorded session, the design may be acceptable. I still need evidence and I still care what system they can reach.

INTERVIEWER: What would a junior analyst get wrong?

EXPERT: One might reject it at “shared account.” Another might accept it at “CyberArk.” Both stopped before assessing the control outcome.
