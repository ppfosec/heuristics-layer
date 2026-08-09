# Use Heuristics Layer in Claude

Start with one ordinary Claude chat. Ignore the optional Skill until the interview works.

First, extract the downloaded `heuristics-layer-claude-v0.2.0.zip` into a normal folder. Open `00_START_HERE.md` from that folder. Leave `OPTIONAL_HEURISTICS_LAYER_SKILL.zip` zipped unless you choose the optional Skill steps later.

## What the files are

- `CLAUDE_INSTRUCTIONS.md`: short operating instructions for the chat or Project.
- `HEURISTICS_LAYER.md`: the complete interview and evaluation protocol.
- `JUDGMENT_REPOSITORY.md`: a guide for you when saving and reviewing outputs. Claude does not need this file to conduct the interview.
- `JUDGMENT_LIBRARY.md`: an empty private starter library. Nothing enters it without practitioner approval.
- `OPTIONAL_HEURISTICS_LAYER_SKILL.zip`: an optional account-level Skill for later reuse.

## Fast path: one interview chat

1. On Claude web or Desktop, start a new regular chat.
2. Upload `CLAUDE_INSTRUCTIONS.md` and `HEURISTICS_LAYER.md`.
3. Say:

   > Read both uploaded files. Treat `CLAUDE_INSTRUCTIONS.md` as the operating instructions for this chat and use `HEURISTICS_LAYER.md` as the complete protocol. Confirm that Heuristics Layer is ready. Do not begin the interview yet.

4. Optionally upload a résumé, GRC role description, or sanitized background notes.
5. Open that same chat in Claude Mobile under the same account. Do not create another chat.
6. Enter voice mode and say:

   - `Interview me about how I make GRC decisions.`
   - `Run a GRC job interview for this role.`

7. When ready, say `Close and process`.
8. Wait until Claude confirms that the session packet and proposed judgment-library changes are complete.

If downloadable file creation is unavailable, ask Claude to return the two complete Markdown artifacts in the chat. The interview still works.

## Reusable path: a cloud Project

After the first successful interview:

1. Create a regular cloud Claude Project named `My GRC Judgment`.
2. Copy the contents of `CLAUDE_INSTRUCTIONS.md` into Project instructions.
3. Upload `HEURISTICS_LAYER.md` and your current reviewed `JUDGMENT_LIBRARY.md` to Project knowledge. Use the included empty starter if no candidate has been approved yet.
4. Start one new Project chat for each interview.
5. Open that same Project chat on mobile and use voice as above.

Do not use a local Cowork Project as the only home. Use a regular cloud Project for the cross-device workflow.

## Optional Skill

The Skill is convenient after the basic workflow makes sense. It is not required for mobile voice or the cloud Project.

1. Confirm that `Code execution and file creation` and Skills are enabled in Claude settings.
2. Open `Customize > Skills`.
3. Choose `Create skill > Upload a skill`.
4. Upload `OPTIONAL_HEURISTICS_LAYER_SKILL.zip`.
5. Enable the Skill.

## If Claude reports a JUDGMENT_REPOSITORY error

Stop asking Claude to locate the file. It is not a runtime dependency.

Read `JUDGMENT_REPOSITORY.md` yourself when you are ready to save the two outputs. Upload it only if you want Claude to help organize or update your private library. The corrected optional Skill also contains its own repository reference.

Use a private Google Drive folder or private local folder as the source of record. Keep session packets, proposed changes, and the approved `JUDGMENT_LIBRARY.md` separate.
