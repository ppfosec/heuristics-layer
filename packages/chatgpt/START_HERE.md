# Use Heuristics Layer in ChatGPT

The fastest tested path is one ordinary ChatGPT chat. Set it up on desktop or web, open that same chat on your phone, and start talking.

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
2. Upload `PROJECT_INSTRUCTIONS.md` and `HEURISTICS_LAYER.md`.
3. Say:

   > Read both uploaded files. Treat `PROJECT_INSTRUCTIONS.md` as the operating instructions for this chat and use `HEURISTICS_LAYER.md` as the complete protocol. Confirm that Heuristics Layer is ready. Do not begin the interview yet.

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
3. Upload `HEURISTICS_LAYER.md` and the current reviewed `JUDGMENT_LIBRARY.md` to Project sources.
4. Start one new Project chat for each interview.
5. Open the same Project chat on mobile and use voice as above.

The Project is the reusable home. The single-chat path is the quickest way to prove the workflow before building a private corpus.

## Recover the files on desktop

ChatGPT's mobile file sandbox may create attachments that are downloadable on the phone but do not remain downloadable when the chat is opened on desktop. The first live acceptance run hit this limitation.

You have two options:

1. Download both files on the phone and move them to your private storage.
2. Reopen the completed chat on desktop in ChatGPT Work and say:

   > Regenerate the two completed Markdown outputs from this chat as downloadable desktop files. Create the session packet and the proposed judgment-library changes file. Do not re-interview me, add new candidates, or change the analysis.

Regeneration is a file handoff, not a second evaluation pass. Compare the regenerated files with the visible chat before saving them.

## Keep the heuristics somewhere durable

Use `JUDGMENT_REPOSITORY.md` to create a private Google Drive folder or private local folder for session packets, proposals, and the approved `JUDGMENT_LIBRARY.md`. Do not use the public product repository for private interviews.

ChatGPT voice transcripts may differ from the spoken exchange. Treat transcript excerpts as evidence to review, not a courtroom record.
