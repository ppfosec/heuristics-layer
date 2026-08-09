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
- Evidence reviewed: private `vendor_acceptance_heuristics_2026-08-09.zip`, containing a session packet and proposed library changes; private contents were not committed
- Notes and defects: mobile-created attachments were downloadable on mobile but their file handles were unavailable on desktop. Reopening the same completed chat in ChatGPT Work and asking it to regenerate the files produced desktop-downloadable copies. Output quality was substantively useful, but the first run did not explicitly preserve every promised evidence field or the eight-dimension qualitative evaluation. The runtime contract was tightened after review.

## Claude

- Plan and workspace type:
- Desktop setup surface:
- Mobile operating system and Claude app version:
- Code execution and file creation enabled: yes | no
- Custom Skill enabled: yes | no
- Empty Project visible on mobile before installation: pass | fail
- Project fallback available in a new mobile chat: pass | fail
- Substantive voice interview completed to practitioner satisfaction: pass | fail
- `close and process` handled inside the same chat: pass | fail
- Two-file review bundle available on desktop: pass | fail
- No silent external or local write: pass | fail
- One candidate reviewed by the practitioner: approve | revise | reject | not tested
- Notes and defects:

## Release decision

- ChatGPT acceptance: pass with documented mobile-to-desktop file-regeneration limitation
- Claude acceptance: not tested
- Blocking defects: Claude acceptance remains outstanding. No blocking ChatGPT defect after documenting the file handoff and tightening output-contract fidelity.
- Decision: keep draft until Claude acceptance
- Approved by: ChatGPT workflow accepted by Pierre-Paul Ferland; final release approval pending
