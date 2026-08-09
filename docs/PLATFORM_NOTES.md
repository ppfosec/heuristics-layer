# Platform notes

Checked 2026-08-09. Product surfaces change, so verify these assumptions before a major release.

## ChatGPT

ChatGPT Projects keep files, instructions, chats, and memory together, support voice, and are designed to move between phone and web. That makes the cloud Project the customer runtime. [Projects in ChatGPT](https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt)

Personal Skills are available in eligible ChatGPT workspaces and can be used automatically when relevant. OpenAI's Skills and Voice documentation do not currently guarantee that a custom Skill is loaded inside a live voice conversation. Heuristics Layer therefore includes a portable optional Skill but uses the cloud Project or uploaded files as its tested cross-device voice runtime. [Skills in ChatGPT](https://help.openai.com/en/articles/20001066) [ChatGPT Voice](https://help.openai.com/en/articles/20001274)

ChatGPT saves a transcript after a voice conversation, but the transcript may not perfectly match the audio exchange. The interview protocol therefore preserves important excerpts and uncertainty rather than treating the transcript as exact evidence. [ChatGPT Voice](https://help.openai.com/en/articles/20001274)

Connected apps and plugins are not guaranteed in every live voice experience. Google Drive persistence belongs in the post-interview desktop or text workflow, with normal authorization, rather than in the core voice promise. [ChatGPT Voice](https://help.openai.com/en/articles/20001274)

Voice availability depends on the plan, workspace settings, region, and app version. Mobile background conversations can keep a voice session running while the user changes apps or locks the phone. Personal-workspace users should review Data Controls before discussing private work because transcript and file use depends on the plan and settings. [ChatGPT Voice](https://help.openai.com/en/articles/20001274)

Observed in the 2026-08-09 paid-account acceptance run: the same prepared chat synchronized from desktop to mobile and supported a satisfactory voice interview and file generation. The attachments created by the mobile sandbox were available on mobile but were not downloadable when the chat returned to desktop. Reopening the completed chat in ChatGPT Work and regenerating the same outputs produced desktop-downloadable files. The installer documents this as a handoff limitation and forbids changing the analysis during regeneration.

ChatGPT Work in the desktop app can open a local folder or project after the user grants access. Local files and outputs remain on that computer unless explicitly moved or shared. Work on web and mobile cannot directly access local computer files. Version 0.3 therefore uses mobile or web for interviewing and ChatGPT Work on desktop for the normalize-and-publish transaction. [ChatGPT Work and Codex](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex)

When Work or local folder access is unavailable, the platform-independent fallback uploads the complete repository ZIP to an ordinary file-capable chat and returns one complete replacement ZIP. This requires attachment and download actions but no internal file editing.

## Claude

Claude supports custom Skills uploaded as ZIP files. Skills require `Code execution and file creation` to be enabled even when the Skill itself contains only instructions and references. [Use skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude)

Anthropic documents that enabled Skills apply automatically when relevant, but its Skills and Voice pages do not currently guarantee that a custom Skill loads inside a voice conversation. The included Skill is therefore optional; uploaded files or Project knowledge remain the tested voice runtime. [Use skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude) [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode)

Regular Claude Projects use uploaded knowledge and instructions across Project chats. Paid-plan project memory is available on web, Claude Desktop, and Claude Mobile. [How to create and manage projects](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects)

Claude voice supports switching between voice and text and saves textual transcripts. [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode)

Claude can create downloadable files on mobile. [Create and edit files with Claude](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude)

Observed in the 2026-08-09 acceptance run: Claude completed a substantive voice interview and the editorial analysis, but the request to generate the two downloadable Markdown files failed in voice. Reopening the same conversation in the app and regenerating the outputs succeeded. This is a documented handoff limitation, and the recovery prompt forbids re-interviewing or changing the analysis.

The practitioner found ChatGPT's interviewing stronger in these particular runs. Both models showed useful curiosity and digging behavior. That comparison is recorded as a model-and-run observation, not a package verdict: the source stories differed, and Claude's final files were produced after later contract hardening. Job rehearsal now deliberately constrains that curiosity so the simulated interview remains plausible before the deeper evaluation pass.

Claude Cowork can read and write only the local folders the user connects, and local access requires Claude Desktop to remain available. Cowork sessions can be monitored from other surfaces, but Cowork project data is still documented as desktop-local without cloud sync. Version 0.3 uses a regular cloud Claude Project for mobile interviews and Claude Cowork on desktop for the normalize-and-publish transaction. [Get started with Claude Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork) [Projects in Claude Cowork](https://support.claude.com/en/articles/14116274-organize-your-tasks-with-projects-in-claude-cowork)

When Cowork or local folder access is unavailable, the same complete-ZIP fallback works in an ordinary file-capable Claude chat.
