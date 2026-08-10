# Changelog

## 0.3.0

- Added `normalize-and-publish` as the third product mode.
- Added an application-operated private repository template to both platform downloads and the portable Agent Skill.
- Moved normalization, deduplication, stable identifiers, versioning, evidence movement, and publication logging into ChatGPT or Claude.
- Added an explicit conversational approval gate before publication.
- Added a transactional publication contract covering the library, publication log, unresolved queue, intake manifest, processed evidence, and repository state.
- Added a complete replacement-repository ZIP fallback when the current surface cannot write the selected local folder.
- Defined ChatGPT Work and Claude Cowork desktop as the local publication surfaces while keeping mobile voice as the interview surface.
- Added an optional second approval for sanitized contributions to the public heuristic library without exposing private evidence.
- Validated the no-approval gate and one complete conversationally approved transaction against a real private repository.

## 0.2.0

- Rebuilt the product around desktop setup and mobile or laptop voice interviews.
- Focused the method on GRC operating judgment, stakeholder incentives, adoption, organizational history, relationships, and trade-offs.
- Added ChatGPT Project and Claude Skill plus cloud Project distributions.
- Added `close and process` as the explicit transition from interview to LLM-led extraction, challenge, and evaluation.
- Added a two-file review bundle: the evidence-bearing session packet and portable proposed judgment-library changes.
- Added a private judgment-repository guide for Google Drive or local storage and reviewed-library synchronization.
- Documented the tested ChatGPT single-chat fast path and mobile-to-desktop file-regeneration limitation.
- Simplified Claude to a two-file single-chat fast path, moved the Skill to an optional step, and bundled the previously missing judgment-repository reference inside the Skill.
- Added explicit ZIP extraction instructions and an empty, review-gated `JUDGMENT_LIBRARY.md` starter to both platform downloads.
- Added platform preflight checks for mobile Project visibility, voice, file creation, workspace controls, and background conversations.
- Added a live paid-account acceptance record and a no-silent-write release gate.
- Removed the npm package, CLI, synthetic model provider, retrieval runtime, deterministic reasoner, and numerical evaluation pipeline.

## 0.1.0

- Published the original TypeScript reference implementation. Superseded by the voice-first product in 0.2.0.
