# Product workflow

## Product boundary

Heuristics Layer has one customer workflow with two internal phases: interview, then extraction and evaluation. The user installs on desktop and can interview on mobile or laptop.

The cross-device home is a cloud ChatGPT Project or cloud Claude Project. A local repository or Claude Cowork project may help maintain files on desktop, but neither is the mobile interview environment.

## ChatGPT

1. On desktop, create `My GRC Judgment` as a cloud ChatGPT Project.
2. Paste the supplied Project instructions and upload the runtime file.
3. On mobile, open the same Project, create a voice chat, and conduct the interview.
4. Say `close and process` before ending voice mode.
5. On desktop, reopen the chat, export the session packet, and review proposed library changes.

An optional future ChatGPT marketplace plugin may improve desktop installation. The Project runtime remains required until installed skills reliably follow the user into mobile voice.

## Claude

1. On desktop, upload and enable the supplied custom skill.
2. Create `My GRC Judgment` as a regular cloud Claude Project.
3. Paste the supplied Project instructions and upload the fallback runtime file.
4. On mobile, open that cloud Project, start a voice chat, and conduct the interview.
5. Say `close and process`, then return to desktop to review and save the packet.

Do not make a local Cowork Project the only home. It does not provide the same cloud project on mobile.

## Why the Project duplicates part of the skill

The skill defines reusable behavior. The Project supplies cross-device state, personal context, prior chats, and a mobile-safe fallback. This small duplication is intentional. The mobile interview must work even when a desktop-only customization surface is absent.

## Session rhythm

- Keep one decision or interview theme per chat.
- Use a new chat for each interview.
- Let the interview close itself before tapping the voice stop control.
- Review candidates before adding them to the durable library.
- Periodically consolidate approved sessions on desktop.
