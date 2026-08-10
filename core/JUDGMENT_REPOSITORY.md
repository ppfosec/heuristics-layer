# Private judgment repository

Heuristics Layer produces three different kinds of material. ChatGPT or Claude keeps them separate:

1. **Session packets** preserve what happened, what the model inferred, and how the candidates were challenged.
2. **Proposed library changes** isolate material waiting for practitioner review.
3. **The judgment library** contains only practitioner-approved heuristics.

## Application-owned layout

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
    2026/
      2026-08-09-vendor-acceptance-session-packet.md
  proposals/
    2026/
      2026-08-09-vendor-acceptance-proposed-library-changes.md
  archive/
```

This is a private knowledge folder, not necessarily a Git repository. ChatGPT Work or Claude Cowork can operate it after the user grants access to that folder on desktop. The practitioner interacts in the application and approves substantive judgment. The model owns the file operations.

## Surface boundary

Mobile and web voice can conduct the interview and create the two-file review bundle. Local publication requires a desktop surface with permission to read and write the private repository. If local access is unavailable, the model creates one complete replacement repository ZIP.

Project knowledge does not automatically synchronize a local folder. Treat the private repository as authoritative and replace any Project working copy after publication.

## Normalize and publish

1. The model inventories pending interview outputs.
2. The model normalizes, reconciles, and challenges candidates against the existing library.
3. The model asks focused substantive questions in the application.
4. The practitioner approves, revises, merges, splits, probes, rejects, or supersedes through conversation.
5. The model completes the publication transaction defined in `NORMALIZE_AND_PUBLISH.md`.
6. The model reports the updated library version and remaining unresolved questions.

The practitioner never edits Markdown or moves internal files. The model never publishes without explicit conversational approval. Do not place private interviews or the judgment library in the public Heuristics Layer repository.
