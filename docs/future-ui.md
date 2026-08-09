# Future UI

The v0.1 interface is a CLI because it makes the workflow visible and testable. A later application can use the same library to provide:

- voice or transcript interview sessions;
- live structured notes and unresolved threads;
- candidate cards with provenance excerpts;
- challenge questions and counterexamples;
- revise, merge, split, approve, reject, and request-more-probing actions;
- a corpus browser and version history;
- a retrieval playground showing why each heuristic fired;
- blind baseline, generic-prompt, and heuristic-assisted eval review.

The UI should call a backend that owns the private corpus and model credentials. It should receive the selected review or reasoning artifact, not download the corpus into the browser.
