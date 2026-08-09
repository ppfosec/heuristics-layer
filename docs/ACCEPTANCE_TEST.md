# Acceptance test

The release is not product-complete until a paid ChatGPT user and a paid Claude user can each complete this test.

## Setup on laptop

- Record the date, plan, workspace type, desktop surface, mobile operating system, and app version in `LIVE_ACCEPTANCE_RECORD.md`.
- Confirm that an empty chat or cloud Project appears on mobile and that voice is available before uploading the package.
- Download the platform ZIP.
- Complete setup without opening a terminal.
- For ChatGPT, confirm the runtime in one synchronized chat. For Claude, confirm it in a cloud Project.
- Add one sanitized résumé or GRC role description.

## Interview on mobile

- Open the same account and source chat or Project on mobile.
- Start a new voice conversation without uploading or pasting anything.
- For ChatGPT, continue the same prepared chat and enable background conversations.
- For Claude, verify the same prepared chat works without installing or invoking the optional Skill.
- Ask for a GRC judgment interview.
- Complete a substantive interview that the practitioner considers representative. Fifteen minutes is a useful target, not a pass condition.
- Observe whether the interviewer follows incentives, authority, adoption, organizational history, trade-offs, and communication rather than collecting control facts.
- Say `close and process` before ending voice mode.
- Confirm that extraction and evaluation happen without opening a second chat.

## Output on laptop

- Open the completed chat on laptop.
- Create or download the session packet and proposed judgment-library changes file.
- If mobile file handles are unavailable on desktop, verify that exact regeneration in ChatGPT Work produces equivalent downloadable files without a second interview or changed analysis.
- Confirm that no file was silently written into a local folder, repository, Project file area, Drive, or other destination.
- Verify that every candidate points to interview evidence.
- Verify that every candidate includes a counterexample, uncertainty, and reversal condition.
- Verify that the model did not approve its own candidates.
- Approve, revise, or reject at least one candidate.
- Update a private `JUDGMENT_LIBRARY.md`.

## Failure conditions

The test fails if:

- mobile requires reinstalling files or instructions;
- the interview depends on ChatGPT Work, Codex, Claude Cowork, or an installed Skill;
- an account or workspace capability is missing and the installer fails to identify it during preflight;
- the interviewer behaves like a questionnaire;
- the output mainly summarizes GRC facts;
- stakeholders and incentives disappear from the analysis;
- the evaluation is a numerical score without editorial reasoning;
- ending the interface is required to trigger processing;
- private details appear in a reusable artifact without review;
- the model writes outside the chat without the user choosing the exact destination;
- a candidate becomes approved without the practitioner.

Mobile-only file handles are a documented platform limitation, not a product failure, when the files can be downloaded on mobile or regenerated unchanged from the same completed chat on desktop.
