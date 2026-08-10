# Product workflow

## Product boundary

Heuristics Layer has one customer workflow with three modes: judgment capture, job rehearsal, and normalize-and-publish. The user installs on desktop, interviews on mobile or laptop, then publishes on a desktop surface with access to the private repository.

For both ChatGPT and Claude, the fastest first interview is one ordinary chat synchronized across desktop and mobile. A cloud Project becomes the reusable interview home. A separate private local folder is the authoritative corpus.

Before installing, verify that the empty chat or Project appears on the phone and that voice is enabled there. Account, organization, app-version, and regional controls cannot be repaired by uploading another Markdown file.

## ChatGPT

1. On desktop or web, create a regular chat and upload the supplied instructions and runtime file.
2. Confirm the runtime, then open that same chat on mobile.
3. Conduct the interview by voice without creating another chat.
4. Say `close and process` before ending voice mode.
5. Produce a session packet and a proposed library-changes file.
6. If the mobile-created attachments are not downloadable on desktop, download them on mobile or reopen the same chat in ChatGPT Work and regenerate the two files without changing the analysis.
7. After the first successful run, create a cloud Project if you want reusable instructions and a working copy of the approved library across future chats.
8. In ChatGPT Work on desktop, grant access to the private repository folder, add completed interview outputs, and say `normalize and publish`.
9. Answer substantive approval questions. ChatGPT performs every private-repository edit.

If Work or local folder access is unavailable, upload the complete repository ZIP and interview outputs to an ordinary chat. ChatGPT returns one complete replacement repository ZIP after approval.

Eligible ChatGPT workspaces can install the included portable personal Skill. Current documentation does not guarantee that a custom Skill loads inside voice, and Skill availability or installation may vary by workspace and surface. The ordinary-chat and Project paths therefore remain the tested customer workflow. ChatGPT Work is only a tested desktop file-regeneration fallback.

## Claude

1. On desktop or web, create a regular chat and upload `CLAUDE_INSTRUCTIONS.md` and `HEURISTICS_LAYER.md`.
2. Confirm the runtime, then open that same chat on mobile.
3. Conduct the interview by voice without creating another chat.
4. Say `close and process`, then review and save the two-file bundle.
5. If voice does not create downloadable files, leave voice, reopen the same chat in the Claude app or text interface, and regenerate the same two outputs without changing the analysis.
6. After the first successful run, create `My GRC Judgment` as a regular cloud Project for reusable instructions and a working copy of the published library.
7. Install the included portable Skill only if the account-level convenience is useful. It is not required for the interview or Project, and current documentation does not guarantee custom Skill activation inside voice.
8. In Claude Cowork on desktop, connect the private repository folder, add completed interview outputs, and say `normalize and publish`.
9. Answer substantive approval questions. Claude performs every private-repository edit.

If Cowork or local folder access is unavailable, upload the complete repository ZIP and interview outputs to an ordinary chat. Claude returns one complete replacement repository ZIP after approval.

Do not make a local Cowork Project the only home. Remote Cowork sessions may be available on some accounts, but Cowork project data remains a separate, desktop-local surface in the current documentation.

## Optional public contribution

Private publication finishes first. If the practitioner wants to share a heuristic, the application prepares sanitized public wording in the separate public framework checkout and asks for a second approval. After approval it assigns the public identifier, validates privacy, commits only public-safe files, and opens a pull request. The private repository is never staged or pushed.

## Why the chat or Project duplicates part of the Skill

The Skill defines reusable account-level behavior, including publication. The uploaded files supply a visible runtime that works when Skills are unavailable. This duplication is intentional. The first interview should not depend on successful Skill installation.

## Session rhythm

- Keep one decision or interview theme per chat.
- Use a new chat for each interview.
- Let the interview close itself before tapping the voice stop control.
- Let the model normalize and reconcile candidates before asking for publication approval.
- Approve meaning and wording in the application, never by editing files.
- Keep one private source of record and replace stale Project copies after publication.
