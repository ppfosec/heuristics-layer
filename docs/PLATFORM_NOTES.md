# Platform notes

Checked 2026-08-09. Product surfaces change, so verify these assumptions before a major release.

## ChatGPT

ChatGPT Projects keep files, instructions, chats, and memory together, support voice, and are designed to move between phone and web. That makes the cloud Project the customer runtime. [Projects in ChatGPT](https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt)

Standalone skills are currently documented for the ChatGPT desktop app, Codex CLI, and IDE extension. Heuristics Layer therefore does not depend on a standalone skill for its mobile interview. [Build skills](https://learn.chatgpt.com/docs/build-skills)

ChatGPT saves a transcript after a voice conversation, but the transcript may not perfectly match the audio exchange. The interview protocol therefore preserves important excerpts and uncertainty rather than treating the transcript as exact evidence. [Voice Mode FAQ](https://help.openai.com/en/articles/8400625-voice-mode-faqGPT)

Connected apps and plugins are not guaranteed in every live voice experience. Google Drive persistence belongs in the post-interview desktop or text workflow, with normal authorization, rather than in the core voice promise. [ChatGPT Voice](https://help.openai.com/en/articles/20001274)

## Claude

Claude supports custom skills uploaded as ZIP files. The skill in this repository contains instructions and references only. [Use skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude)

Regular Claude Projects use uploaded knowledge and instructions across Project chats. Paid-plan project memory is available on web, Claude Desktop, and Claude Mobile. [How to create and manage projects](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects)

Claude voice supports switching between voice and text and saves textual transcripts. [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode)

Claude can create downloadable files on mobile. [Create and edit files with Claude](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude)

Claude Cowork projects are desktop-local and currently have no cloud sync. The product therefore uses a regular cloud Claude Project for the interview environment and treats Cowork as an optional desktop curation surface. [Projects in Claude Cowork](https://support.claude.com/en/articles/14116274-organize-your-tasks-with-projects-in-claude-cowork)
