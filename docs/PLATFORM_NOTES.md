# Platform notes

Checked 2026-08-09. Product surfaces change, so verify these assumptions before a major release.

## ChatGPT

ChatGPT Projects keep files, instructions, chats, and memory together, support voice, and are designed to move between phone and web. That makes the cloud Project the customer runtime. [Projects in ChatGPT](https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt)

Personal Skills are available in eligible ChatGPT workspaces, but OpenAI documents that they must be installed separately on desktop and web/mobile and do not automatically sync across those surfaces. Heuristics Layer therefore uses the cloud Project as its cross-device runtime and does not require a ChatGPT Skill. [Skills in ChatGPT](https://help.openai.com/en/articles/20001066)

ChatGPT saves a transcript after a voice conversation, but the transcript may not perfectly match the audio exchange. The interview protocol therefore preserves important excerpts and uncertainty rather than treating the transcript as exact evidence. [ChatGPT Voice](https://help.openai.com/en/articles/20001274)

Connected apps and plugins are not guaranteed in every live voice experience. Google Drive persistence belongs in the post-interview desktop or text workflow, with normal authorization, rather than in the core voice promise. [ChatGPT Voice](https://help.openai.com/en/articles/20001274)

Voice availability depends on the plan, workspace settings, region, and app version. Mobile background conversations can keep a voice session running while the user changes apps or locks the phone. Personal-workspace users should review Data Controls before discussing private work because transcript and file use depends on the plan and settings. [ChatGPT Voice](https://help.openai.com/en/articles/20001274)

Observed in the 2026-08-09 paid-account acceptance run: the same prepared chat synchronized from desktop to mobile and supported a satisfactory voice interview and file generation. The attachments created by the mobile sandbox were available on mobile but were not downloadable when the chat returned to desktop. Reopening the completed chat in ChatGPT Work and regenerating the same outputs produced desktop-downloadable files. The installer documents this as a handoff limitation and forbids changing the analysis during regeneration.

## Claude

Claude supports custom Skills uploaded as ZIP files. Skills require `Code execution and file creation` to be enabled even when the Skill itself contains only instructions and references. [Use skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude)

Regular Claude Projects use uploaded knowledge and instructions across Project chats. Paid-plan project memory is available on web, Claude Desktop, and Claude Mobile. [How to create and manage projects](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects)

Claude voice supports switching between voice and text and saves textual transcripts. [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode)

Claude can create downloadable files on mobile. [Create and edit files with Claude](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude)

Remote Cowork sessions are rolling out across surfaces, but Cowork project data is still documented as desktop-local with no cloud sync. The product therefore uses a regular cloud Claude Project for the interview environment and treats Cowork as an optional desktop curation surface. [Projects in Claude Cowork](https://support.claude.com/en/articles/14116274-organize-your-tasks-with-projects-in-claude-cowork)
