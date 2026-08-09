# Use Heuristics Layer in Claude

Start with one ordinary Claude chat. Ignore the optional Skill until the interview works.

First, extract the downloaded `heuristics-layer-claude-v0.3.0.zip` into a normal folder. Open `00_START_HERE.md` from that folder. Leave `OPTIONAL_HEURISTICS_LAYER_SKILL.zip` and `PRIVATE_HEURISTICS_REPOSITORY.zip` zipped until the relevant steps below.

## What the files are

- `CLAUDE_INSTRUCTIONS.md`: short operating instructions for the chat or Project.
- `HEURISTICS_LAYER.md`: the complete interview and evaluation protocol.
- `NORMALIZE_AND_PUBLISH.md`: the complete private-library publication protocol.
- `JUDGMENT_REPOSITORY.md`: a guide for you when saving and reviewing outputs. Claude does not need this file to conduct the interview.
- `JUDGMENT_LIBRARY.md`: an empty private starter library. Nothing enters it without practitioner approval.
- `OPTIONAL_HEURISTICS_LAYER_SKILL.zip`: an optional account-level Skill for later reuse.
- `PRIVATE_HEURISTICS_REPOSITORY.zip`: the structure Claude creates and operates for the practitioner.

## Fast path: one interview chat

1. On Claude web or Desktop, start a new regular chat.
2. Upload `CLAUDE_INSTRUCTIONS.md`, `HEURISTICS_LAYER.md`, and `NORMALIZE_AND_PUBLISH.md`.
3. Say:

   > Read the three uploaded files. Treat `CLAUDE_INSTRUCTIONS.md` as the operating instructions, use `HEURISTICS_LAYER.md` for interviews, and use `NORMALIZE_AND_PUBLISH.md` when publishing heuristics. Confirm that Heuristics Layer is ready. Do not begin the interview yet.

4. Optionally upload a résumé, GRC role description, or sanitized background notes.
5. Open that same chat in Claude Mobile under the same account. Do not create another chat.
6. Enter voice mode and say:

   - `Interview me about how I make GRC decisions.`
   - `Run a GRC job interview for this role.`

7. When ready, say `Close and process`.
8. Wait until Claude confirms that the session packet and proposed judgment-library changes are complete.

If voice completes the interview but does not create downloadable files, stop voice, reopen the same completed chat in the Claude app or text interface, and say:

> Regenerate the two completed Markdown outputs from this chat as downloadable files. Create the session packet and the proposed judgment-library changes file. Do not re-interview me, add new candidates, or change the analysis.

If downloadable file creation is still unavailable, ask Claude to return the two complete Markdown artifacts in the chat. The interview still works. Regeneration is only a file handoff, not a second evaluation pass.

## Reusable path: a cloud Project

After the first successful interview:

1. Create a regular cloud Claude Project named `My GRC Judgment`.
2. Copy the contents of `CLAUDE_INSTRUCTIONS.md` into Project instructions.
3. Upload `HEURISTICS_LAYER.md`, `NORMALIZE_AND_PUBLISH.md`, and your current published `JUDGMENT_LIBRARY.md` to Project knowledge. Use the included empty starter if no heuristic has been published yet.
4. Start one new Project chat for each interview.
5. Open that same Project chat on mobile and use voice as above.

Do not use a local Cowork Project as the only home. Use a regular cloud Project for the cross-device workflow.

## Optional Skill

The Skill is convenient after the basic workflow makes sense. It is not required for mobile voice or the cloud Project. Claude documents Skills and voice separately, but Skills are not documented as guaranteed inside voice. Verify the Skill in your own mobile session before relying on it there.

1. Confirm that `Code execution and file creation` and Skills are enabled in Claude settings.
2. Open `Customize > Skills`.
3. Choose `Create skill > Upload a skill`.
4. Upload `OPTIONAL_HEURISTICS_LAYER_SKILL.zip`.
5. Enable the Skill.

## Create the private repository once

Do this in Claude Cowork in the desktop app.

Before relying on this path, confirm that `Cowork` appears and can connect a local folder. Availability depends on the plan, workspace, and desktop app version. If either capability is missing, use the complete-ZIP path below.

1. Start a Cowork task and connect only the local parent folder where the private repository should live.
2. Attach `PRIVATE_HEURISTICS_REPOSITORY.zip`.
3. Say:

   > Create my private Heuristics Layer repository inside the connected folder using this template. You own all internal file operations. Do not publish anything yet. Confirm the authoritative library path and repository state when setup is complete.

The practitioner should not extract the repository template, create internal folders, or edit Markdown. Claude performs that setup.

## Normalize and publish

After an interview produces the session packet and proposed changes:

1. Open Claude Cowork on desktop and connect the private repository folder.
2. Download or regenerate the completed interview outputs in their source chat, then attach both files to Cowork. Do not assume that a regular chat transfers its files directly into a new Cowork task.
3. Say:

   > Register these interview outputs as pending intake. Normalize and reconcile the candidates against my current library. Ask me only the substantive questions needed to decide what represents my judgment. After I approve final wording, publish it and complete every repository update. Do not ask me to edit or move files.

Claude compares candidates, asks for conversational approval, and updates the library, publication log, unresolved queue, intake manifest, evidence archive, and repository state. If direct folder writing is unavailable, it must return one complete replacement repository ZIP.

## Complete-ZIP path without local Cowork

Use this when Cowork or local folder access is unavailable:

1. In an ordinary Claude chat with file creation, upload your current complete private-repository ZIP. Use `PRIVATE_HEURISTICS_REPOSITORY.zip` for the first publication.
2. Upload the completed interview outputs.
3. Give the same normalize-and-publish request above.
4. Review and approve meaning and wording in the conversation.
5. Download the one complete replacement repository ZIP that Claude creates.

That replacement ZIP is the new source of record. Claude must not ask you to extract it, merge individual files, or repair its internal structure.

Use the local private repository as the source of record. Keep a Project copy only as working context for later mobile interviews. Project knowledge does not automatically synchronize the local library.
