# Use Heuristics Layer in ChatGPT

The fastest tested path is one ordinary ChatGPT chat. Set it up on desktop or web, open that same chat on your phone, and start talking.

First, extract the downloaded `heuristics-layer-chatgpt-v0.3.0.zip` into a normal folder. Open `START_HERE.md` from that folder.

The download also contains `OPTIONAL_HEURISTICS_LAYER_SKILL.zip` and `PRIVATE_HEURISTICS_REPOSITORY.zip`. Leave both zipped for now. The uploaded-files workflow below is the tested voice path.

## What you need

- A paid ChatGPT plan, ChatGPT desktop or web, and the current ChatGPT Mobile app.
- The same account and workspace signed in on both devices.
- Voice enabled for your account and workspace.
- Permission to process the material you discuss.

## Sixty-second preflight

Before uploading anything private:

1. Start an empty chat on desktop or web and confirm that the same chat appears on your phone.
2. Open it on the phone and confirm that the voice control is available.
3. Turn on `Background conversations` in Mobile settings if you want to keep talking while doing chores or while the phone is locked.
4. In a personal workspace, review `Settings > Data Controls`. Voice transcripts and files are handled according to your plan and settings.

If the chat or voice control is missing, update the app and check workspace permissions. Uploading another Markdown file will not repair an account-level restriction.

## Fast path: one interview chat

1. On desktop or web, start a new regular chat.
2. Upload `PROJECT_INSTRUCTIONS.md`, `HEURISTICS_LAYER.md`, and `NORMALIZE_AND_PUBLISH.md`.
3. Say:

   > Read the three uploaded files. Treat `PROJECT_INSTRUCTIONS.md` as the operating instructions, use `HEURISTICS_LAYER.md` for interviews, and use `NORMALIZE_AND_PUBLISH.md` when publishing heuristics. Confirm that Heuristics Layer is ready. Do not begin the interview yet.

4. Optionally upload a résumé, GRC role description, or sanitized background notes.
5. Open that same chat in ChatGPT Mobile. Do not start a second chat.
6. Turn on voice and say:

   - `Interview me about how I make GRC decisions.`
   - `Run a GRC job interview for this role.`

When ready, say `Close and process`. Wait until ChatGPT confirms that both Markdown outputs are complete before ending voice mode.

## Reusable path: a cloud Project

Use this after the first interview if you want to start future interviews without uploading the runtime again.

1. Create a cloud Project named `My GRC Judgment`.
2. Copy `PROJECT_INSTRUCTIONS.md` into Project instructions.
3. Upload `HEURISTICS_LAYER.md`, `NORMALIZE_AND_PUBLISH.md`, and your current published `JUDGMENT_LIBRARY.md` to Project sources. Use the included empty starter if no heuristic has been published yet.
4. Start one new Project chat for each interview.
5. Open the same Project chat on mobile and use voice as above.

The Project is the reusable home. The single-chat path is the quickest way to prove the workflow before building a private corpus.

## Optional Skill

Eligible ChatGPT workspaces can install `OPTIONAL_HEURISTICS_LAYER_SKILL.zip` as a personal Skill. It is a portable Agent Skill and contains the same interview and evaluation behavior as the Claude download.

1. In the ChatGPT sidebar, open `Plugins`, then the `Skills` tab.
2. Select `Create`, then `Upload from your computer`.
3. Upload `OPTIONAL_HEURISTICS_LAYER_SKILL.zip` and wait for the safety scan.
4. If you want it on both desktop and web/mobile, add it separately on each surface. Personal Skills do not automatically sync across those surfaces.
5. Start a new text chat and ask: `Use Heuristics Layer to interview me about a GRC decision.` Confirm that the Skill is invoked before testing voice.

Skills are not documented as guaranteed inside voice, and personal Skill availability and installation can vary by workspace and surface. Do not delete the Project instructions or uploaded runtime after installing it. Until you verify the Skill in your own mobile voice session, treat it as an account-level text and desktop convenience, not the voice runtime.

## Create the private repository once

Do this in ChatGPT Work in the desktop app. Local folder access is not available from Work on web or mobile.

Before relying on this path, confirm that `Work` appears in the desktop app and can open a local folder. Availability depends on the plan and workspace. If either capability is missing, use the complete-ZIP path below.

1. Start a Work task and grant access only to the local parent folder where the private repository should live.
2. Attach `PRIVATE_HEURISTICS_REPOSITORY.zip`.
3. Say:

   > Create my private Heuristics Layer repository inside the selected folder using this template. You own all internal file operations. Do not publish anything yet. Confirm the authoritative library path and repository state when setup is complete.

The practitioner should not extract the repository template, create internal folders, or edit Markdown. ChatGPT performs that setup.

## Normalize and publish

After an interview produces the session packet and proposed changes:

1. Open ChatGPT Work on desktop and grant access to the private repository folder.
2. Download or regenerate the completed interview outputs in their source chat, then attach both files to Work. Do not assume that a regular chat transfers its files directly into a new Work task.
3. Say:

   > Register these interview outputs as pending intake. Normalize and reconcile the candidates against my current library. Ask me only the substantive questions needed to decide what represents my judgment. After I approve final wording, publish it and complete every repository update. Do not ask me to edit or move files.

ChatGPT compares candidates, asks for conversational approval, and updates the library, publication log, unresolved queue, intake manifest, evidence archive, and repository state. If local folder writing is unavailable, it must return one complete replacement repository ZIP.

## Complete-ZIP path without local Work

Use this when Work or local folder access is unavailable:

1. In an ordinary ChatGPT chat with file creation, upload your current complete private-repository ZIP. Use `PRIVATE_HEURISTICS_REPOSITORY.zip` for the first publication.
2. Upload the completed interview outputs.
3. Give the same normalize-and-publish request above.
4. Review and approve meaning and wording in the conversation.
5. Download the one complete replacement repository ZIP that ChatGPT creates.

That replacement ZIP is the new source of record. ChatGPT must not ask you to extract it, merge individual files, or repair its internal structure.

## Recover the files on desktop

ChatGPT's mobile file sandbox may create attachments that are downloadable on the phone but do not remain downloadable when the chat is opened on desktop. The first live acceptance run hit this limitation.

You have two options:

1. Download both files on the phone and move them to your private storage.
2. Reopen the same completed chat on desktop and use the file-creation surface available to that chat. Say:

   > Regenerate the two completed Markdown outputs from this chat as downloadable desktop files. Create the session packet and the proposed judgment-library changes file. Do not re-interview me, add new candidates, or change the analysis.

Regeneration is a file handoff, not a second evaluation pass. After recovery, attach the two files to a separate Work publication task if using the local-folder path.

## Keep one source of record

The local private repository is authoritative. A cloud Project may contain a working copy of the published library for mobile interviews, but it is not automatically synchronized. After publication, ask ChatGPT to provide the current library as one file if the Project copy needs replacement. Do not use the public product repository for private interviews.

ChatGPT voice transcripts may differ from the spoken exchange. Treat transcript excerpts as evidence to review, not a courtroom record.
