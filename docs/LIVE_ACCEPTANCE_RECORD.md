# Live acceptance record

Complete this record with a real paid account before making the v0.2 release final. Use a sanitized GRC decision. Do not commit the transcript, session packet, résumé, job description, or private judgment library.

## Release candidate

- Commit at time of evidence review: `a80e04af432d715afb1080f848a490e201fb849c`
- Package checksum: tester did not independently record the downloaded archive checksum; post-test hardened ChatGPT package is recorded in `downloads/SHA256SUMS.txt`
- Test date: 2026-08-09
- Tester: Pierre-Paul Ferland

## ChatGPT

- Plan and workspace type: paid ChatGPT account with ChatGPT Work available; exact plan and workspace type not recorded
- Desktop setup surface: files uploaded into a chat on desktop or web; exact surface not recorded
- Mobile operating system and ChatGPT app version: not recorded
- Voice experience shown in settings: not recorded
- Background conversations enabled: not recorded
- Prepared chat visible on mobile before interview: pass
- Uploaded instructions available in the synchronized mobile chat: pass
- Substantive voice interview completed to practitioner satisfaction: pass
- Interview processing completed in the same source chat: pass; exact spoken trigger not recorded
- Two Markdown outputs created: pass
- Session packet available on desktop: pass after regeneration in ChatGPT Work
- No silent external or local write: pass; files remained in the ChatGPT sandbox until downloaded
- One candidate reviewed by the practitioner: candidates accepted as useful for continued review; no heuristic automatically approved
- Evidence reviewed: a private ChatGPT ZIP containing a session packet and proposed library changes; neither private filenames nor contents were committed
- Notes and defects: mobile-created attachments were downloadable on mobile but their file handles were unavailable on desktop. Reopening the same completed chat in ChatGPT Work and asking it to regenerate the files produced desktop-downloadable copies. Output quality was substantively useful, but the first run did not explicitly preserve every promised evidence field or the eight-dimension qualitative evaluation. The runtime contract was tightened after review.

## Claude

- Plan and workspace type: Claude account; exact plan and workspace type not recorded
- Desktop setup surface: files prepared in Claude, with final file generation repeated in the app; exact initial surface not recorded
- Mobile operating system and Claude app version: not recorded
- Code execution and file creation enabled: not recorded
- Custom Skill enabled: no; uploaded-file workflow tested
- Prepared chat available for voice: pass
- Uploaded instructions available in the voice conversation: pass
- Substantive voice interview completed to practitioner satisfaction: pass
- Interview processing completed from the same conversation: pass; exact spoken trigger not recorded
- Two-file review bundle available on desktop: pass after regeneration in the Claude app
- No silent external or local write: pass; private files were downloaded by the practitioner
- One candidate reviewed by the practitioner: useful corpus material identified; final approval dispositions not recorded
- Evidence reviewed: two private Claude Markdown outputs containing the session packet and proposed library changes; neither private filenames nor contents were committed
- Notes and defects: Claude voice failed when asked to generate the downloadable files, so the practitioner repeated the file-generation request in the app. The resulting bundle followed the contract closely: three bounded candidates, deliberate exclusions, supporting evidence, uncertainty, counterexamples, reversal conditions, dispositions, a stakeholder map, a challenge log, and rationales across all eight qualitative dimensions. The recovery workflow now explicitly treats app regeneration as a file handoff and forbids a second interview or changed analysis.

## Release decision

- ChatGPT acceptance: pass with documented mobile-to-desktop file-regeneration limitation
- Claude acceptance: pass with documented voice-to-app file-regeneration limitation
- Blocking defects: none in the tested uploaded-file workflows; custom Skill activation inside live voice remains unverified and is not part of the runtime promise
- Decision: acceptance gates passed; publish after rebuilding and validating both release archives
- Approved by: both live workflows accepted by Pierre-Paul Ferland; candidate heuristics remain subject to practitioner review
