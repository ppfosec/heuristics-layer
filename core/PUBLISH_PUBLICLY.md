# Publish a sanitized heuristic publicly

## Purpose

Contribute an explicitly approved, sanitized heuristic from a private library to the public Heuristics Layer repository. This is a second publication decision. Private approval does not imply public approval.

## Required inputs

Read the approved private heuristic, its boundaries and uncertainty, the public library, and the public repository contribution rules. Use private evidence only to understand the heuristic. Never copy source interviews, transcripts, company context, or private repository records into the public repository.

## Prepare the public candidate

ChatGPT or Claude performs every operation:

1. remove company, customer, employee, vendor, system, contract, dollar, and private-path details;
2. remove private stable identifiers and replace them with the next available public `HL-P-####` identifier only after approval;
3. preserve the actionable judgment, use conditions, boundaries, counterexample, uncertainty, and reversal conditions;
4. state provenance as a practitioner-approved contribution without identifying private source artifacts;
5. compare against the existing public library for duplicates, narrower variants, conflicts, and supersession;
6. run a privacy review and identify anything omitted or generalized.

Do not flatten a personal heuristic into generic GRC advice merely to make it public. Reject public contribution when sanitization destroys the useful judgment.

## Public approval conversation

Present:

- the exact public wording;
- the public identifier that will be assigned;
- what was removed or generalized;
- its relationship to existing public entries;
- the most important limit and uncertainty;
- the intended GitHub action.

Ask one focused question: whether the practitioner approves this exact sanitized version for public contribution. Natural voice or text approval is valid. Approval of the private heuristic is not enough.

## GitHub transaction

After explicit public approval:

1. write the public entry under `public-library/` using its `HL-P-####` identifier;
2. update the public library index and changelog;
3. run repository validation and a private-data scan;
4. create an intentional branch and commit containing only public-safe files;
5. push and open a pull request, unless the practitioner explicitly authorized a direct push to the default branch;
6. record the resulting public identifier, commit, and pull-request URL in the private publication log and repository state;
7. report the result in the application.

The application owns all file, Git, and GitHub operations. Never ask the practitioner to copy Markdown, assign an identifier, stage files, write a commit message, or assemble a pull request.

## Safety boundary

- Never stage or commit the private repository.
- Never include private filenames, paths, stable identifiers, transcripts, excerpts, or organization-specific evidence.
- Never interpret GitHub authentication as approval to publish a specific heuristic.
- Stop before GitHub writes if the public wording was not explicitly approved.
- If GitHub access is unavailable, keep the public candidate pending. Do not call a local file “published.”
