# Product workflow

## Product boundary

Heuristics Layer has one customer workflow with two internal phases: interview, then extraction and evaluation. The user installs on desktop and can interview on mobile or laptop.

For both ChatGPT and Claude, the fastest first run is one ordinary chat synchronized across desktop and mobile. A cloud Project becomes the reusable home for later interviews. A private Drive or local folder holds the durable Markdown corpus.

Before installing, verify that the empty chat or Project appears on the phone and that voice is enabled there. Account, organization, app-version, and regional controls cannot be repaired by uploading another Markdown file.

## ChatGPT

1. On desktop or web, create a regular chat and upload the supplied instructions and runtime file.
2. Confirm the runtime, then open that same chat on mobile.
3. Conduct the interview by voice without creating another chat.
4. Say `close and process` before ending voice mode.
5. Produce a session packet and a proposed library-changes file.
6. If the mobile-created attachments are not downloadable on desktop, download them on mobile or reopen the same chat in ChatGPT Work and regenerate the two files without changing the analysis.
7. After the first successful run, create a cloud Project if you want reusable instructions and a working copy of the approved library across future chats.

Eligible ChatGPT workspaces can install personal Skills, but current Skills documentation says desktop and web/mobile installations do not sync automatically. The ordinary-chat and Project paths therefore remain the customer workflow. ChatGPT Work is only a tested desktop file-regeneration fallback.

## Claude

1. On desktop or web, create a regular chat and upload `CLAUDE_INSTRUCTIONS.md` and `HEURISTICS_LAYER.md`.
2. Confirm the runtime, then open that same chat on mobile.
3. Conduct the interview by voice without creating another chat.
4. Say `close and process`, then review and save the two-file bundle.
5. After the first successful run, create `My GRC Judgment` as a regular cloud Project for reusable instructions and the reviewed library.
6. Install the custom Skill only if the account-level convenience is useful. It is not required for the interview or Project.

Do not make a local Cowork Project the only home. Remote Cowork sessions may be available on some accounts, but Cowork project data remains a separate, desktop-local surface in the current documentation.

## Why the chat or Project duplicates part of the Skill

The Skill defines reusable account-level behavior. The uploaded files supply a visible, cross-device runtime that works even when Skills are disabled, unavailable, or simply confusing. This duplication is intentional. The first interview should not depend on successful Skill installation.

## Session rhythm

- Keep one decision or interview theme per chat.
- Use a new chat for each interview.
- Let the interview close itself before tapping the voice stop control.
- Review candidates before adding them to the durable library.
- Periodically consolidate approved sessions on desktop.
- Keep one private source of record for the approved library and replace stale Project copies after review.
