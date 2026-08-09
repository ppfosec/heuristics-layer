# Acceptance test

The release is not product-complete until a paid ChatGPT user and a paid Claude user can each complete this test.

## Setup on laptop

- Download the platform ZIP.
- Complete setup without opening a terminal.
- Confirm the runtime in a cloud Project.
- Add one sanitized résumé or GRC role description.

## Interview on mobile

- Open the same account and Project on mobile.
- Start a new voice conversation without uploading or pasting anything.
- Ask for a GRC judgment interview.
- Answer naturally for at least fifteen minutes.
- Observe whether the interviewer follows incentives, authority, adoption, organizational history, trade-offs, and communication rather than collecting control facts.
- Say `close and process` before ending voice mode.
- Confirm that extraction and evaluation happen without opening a second chat.

## Output on laptop

- Open the completed chat on laptop.
- Create or download the Markdown session packet.
- Confirm that no file was silently written into a local folder, repository, Project file area, Drive, or other destination.
- Verify that every candidate points to interview evidence.
- Verify that every candidate includes a counterexample, uncertainty, and reversal condition.
- Verify that the model did not approve its own candidates.
- Approve, revise, or reject at least one candidate.
- Update a private `JUDGMENT_LIBRARY.md`.

## Failure conditions

The test fails if:

- mobile requires reinstalling files or instructions;
- the interviewer behaves like a questionnaire;
- the output mainly summarizes GRC facts;
- stakeholders and incentives disappear from the analysis;
- the evaluation is a numerical score without editorial reasoning;
- ending the interface is required to trigger processing;
- private details appear in a reusable artifact without review;
- the model writes outside the chat without the user choosing the exact destination;
- a candidate becomes approved without the practitioner.
