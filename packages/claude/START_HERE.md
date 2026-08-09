# Install Heuristics Layer in Claude

Set this up once on your laptop. Use the cloud Claude Project for interviews so the same environment is available on Claude Mobile.

## What you need

- A paid Claude plan, Claude web or Desktop for setup, and the current Claude Mobile app for the interview.
- `Code execution and file creation` enabled in `Settings > Capabilities`. Claude requires this capability for custom Skills and downloadable files.
- Skills enabled for your account or organization. Team and Enterprise administrators can control these capabilities.

## Sixty-second preflight

Before uploading anything private:

1. Create an empty regular Claude Project and confirm that it appears on your phone under the same account.
2. Start a Project chat on the phone and confirm that the voice control is available.
3. Confirm that `Code execution and file creation` is enabled on mobile.
4. If Skills are unavailable or disabled on mobile, continue with the Project setup below. The uploaded Project fallback is sufficient for the interview.

If the Project or voice control is missing, update Claude Mobile and check organization settings before continuing.

## Install the skill

1. In Claude, open `Customize`, then `Skills`.
2. Choose `Create skill`, then `Upload a skill`.
3. Upload `heuristics-layer-skill.zip` from this download.
4. Enable the skill.

## Create the cross-device Project

1. Create a regular cloud Claude Project named `My GRC Judgment`.
2. Copy `project/PROJECT_INSTRUCTIONS.md` into the Project instructions.
3. Upload `project/HEURISTICS_LAYER.md` to Project knowledge.
4. Optionally add your résumé, a GRC job description, or sanitized background notes.
5. Start a Project chat and say: `Confirm that Heuristics Layer is ready. Do not begin an interview yet.`

Do not use a local Cowork Project as the only setup. Cowork projects are desktop-local and do not provide the same cloud Project on mobile.

The Project instructions and knowledge file deliberately duplicate the essential Skill behavior. That fallback is what keeps the interview usable across devices even if the Skill is not invoked on a particular surface.

## Use it on your phone

1. Open Claude Mobile with the same account.
2. Open the cloud `My GRC Judgment` Project.
3. Start a new Project chat and enter voice mode.
4. Say `Interview me about how I make GRC decisions` or `Run a GRC job interview for this role`.
5. When ready, say `Close and process`.
6. Wait until Claude confirms that both Markdown outputs are complete before ending voice mode.

## Return to your laptop

Open the completed chat. Ask Claude to create the session packet and proposed judgment-library changes as two downloadable Markdown files. Review candidates before approving them, then follow `JUDGMENT_REPOSITORY.md` to maintain the private library.
