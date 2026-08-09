# Private judgment repository

Keep three kinds of material separate through application-managed files:

1. Session packets preserve evidence and interpretation.
2. Proposed changes remain unpublished candidates.
3. `library/JUDGMENT_LIBRARY.md` contains only normalized heuristics explicitly approved in conversation.

## Required layout

```text
Heuristics Layer/
  00_START_HERE.md
  NORMALIZE_AND_PUBLISH.md
  REPOSITORY_STATE.md
  intake/
    INTAKE_MANIFEST.md
  library/
    JUDGMENT_LIBRARY.md
  publications/
    PUBLICATION_LOG.md
  unresolved/
    UNRESOLVED_QUESTIONS.md
  sessions/
  proposals/
  archive/
```

Use the local folder explicitly selected by the user as the source of record. A Project copy is useful context, but it is not automatically synchronized.

Desktop ChatGPT Work or Claude Cowork may update the selected folder after the user grants access. Mobile and web chats cannot be assumed to write local files. When direct folder access is unavailable, create one complete replacement repository ZIP.

The application inventories intake, normalizes and reconciles candidates, asks focused substantive questions, obtains explicit approval, and performs the complete publication transaction. The practitioner never edits, merges, versions, or moves the files manually.

Do not silently promote proposals, destroy evidence, or write outside the selected private folder. Do not place private interviews or the judgment library in the public product repository.
