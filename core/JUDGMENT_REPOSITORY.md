# Private judgment repository

Heuristics Layer produces three different kinds of material. Keep them separate:

1. **Session packets** preserve what happened, what the model inferred, and how the candidates were challenged.
2. **Proposed library changes** isolate material waiting for practitioner review.
3. **The judgment library** contains only practitioner-approved heuristics.

## Recommended layout

```text
Heuristics Layer/
  library/
    JUDGMENT_LIBRARY.md
  sessions/
    2026/
      2026-08-09-vendor-acceptance-session-packet.md
  proposals/
    2026/
      2026-08-09-vendor-acceptance-proposed-library-changes.md
  archive/
```

This is a private knowledge folder, not necessarily a Git repository. A private Google Drive folder is convenient across devices. A local encrypted folder may fit stricter data-handling requirements. Choose one source of record. Two almost-current copies of `JUDGMENT_LIBRARY.md` are how the institutional-memory project becomes another stale spreadsheet.

## What stays in ChatGPT or Claude

Keep the runtime instructions and a working copy of `JUDGMENT_LIBRARY.md` in the cloud Project when the account and workspace are approved for the material. Keep raw transcripts in the source chat unless there is a deliberate reason to export them.

Project knowledge does not automatically turn a Drive file or local file into a synchronized database. After approving changes, replace the Project's working library with the new source-of-record copy.

## After every interview

1. Recover the session packet and proposed-changes file on the device where you curate the library.
2. Save both files in the private repository.
3. Review every candidate against its excerpts, counterexample, uncertainty, and reversal conditions.
4. Approve, revise, merge, split, probe, or reject it.
5. Start with the supplied empty `JUDGMENT_LIBRARY.md` and merge only approved wording into it.
6. Replace the older Project knowledge copy with the reviewed library.

Do not let the model silently promote proposals. Do not place private interviews or the judgment library in the public Heuristics Layer repository.
