from __future__ import annotations

import argparse
import re
import sys
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
VERSION = (ROOT / "VERSION").read_text(encoding="utf-8").strip()

REQUIRED_SOURCE_FILES = [
    "README.md",
    "core/INTERVIEW_PROTOCOL.md",
    "core/EVALUATION_PROTOCOL.md",
    "core/GRC_JUDGMENT_MODEL.md",
    "core/OUTPUT_CONTRACT.md",
    "core/PRIVACY.md",
    "core/JUDGMENT_REPOSITORY.md",
    "packages/chatgpt/START_HERE.md",
    "packages/chatgpt/PROJECT_INSTRUCTIONS.md",
    "packages/chatgpt/HEURISTICS_LAYER.md",
    "packages/claude/START_HERE.md",
    "packages/claude/project/PROJECT_INSTRUCTIONS.md",
    "packages/claude/project/HEURISTICS_LAYER.md",
    "packages/claude/heuristics-layer/SKILL.md",
    "packages/claude/heuristics-layer/references/interview-protocol.md",
    "packages/claude/heuristics-layer/references/grc-judgment-model.md",
    "packages/claude/heuristics-layer/references/evaluation-protocol.md",
    "packages/claude/heuristics-layer/references/output-contract.md",
    "examples/ai-vendor-plan/session-packet.md",
    "examples/ai-vendor-plan/proposed-library-changes.md",
    "docs/LIVE_ACCEPTANCE_RECORD.md",
]

CHATGPT_CONTENTS = {
    "START_HERE.md",
    "PROJECT_INSTRUCTIONS.md",
    "HEURISTICS_LAYER.md",
    "PRIVACY.md",
    "JUDGMENT_REPOSITORY.md",
    "LICENSE",
}

CLAUDE_CONTENTS = {
    "START_HERE.md",
    "project/PROJECT_INSTRUCTIONS.md",
    "project/HEURISTICS_LAYER.md",
    "heuristics-layer-skill.zip",
    "PRIVACY.md",
    "JUDGMENT_REPOSITORY.md",
    "LICENSE",
}

CLAUDE_SKILL_CONTENTS = {
    "heuristics-layer/SKILL.md",
    "heuristics-layer/references/interview-protocol.md",
    "heuristics-layer/references/grc-judgment-model.md",
    "heuristics-layer/references/evaluation-protocol.md",
    "heuristics-layer/references/output-contract.md",
}


def fail(message: str, failures: list[str]) -> None:
    failures.append(message)


def validate_source(failures: list[str]) -> None:
    for relative in REQUIRED_SOURCE_FILES:
        if not (ROOT / relative).is_file():
            fail(f"missing required file: {relative}", failures)

    text_files = list(ROOT.glob("*.md"))
    for directory in ("core", "docs", "examples", "packages"):
        text_files.extend((ROOT / directory).rglob("*.md"))

    for path in text_files:
        text = path.read_text(encoding="utf-8")
        if "[TODO" in text or "TODO:" in text:
            fail(f"unresolved placeholder: {path.relative_to(ROOT)}", failures)
        if "\u2014" in text:
            fail(f"em dash found: {path.relative_to(ROOT)}", failures)

    skill_path = ROOT / "packages" / "claude" / "heuristics-layer" / "SKILL.md"
    if skill_path.is_file():
        skill = skill_path.read_text(encoding="utf-8")
        frontmatter = re.match(r"^---\nname: ([a-z0-9-]+)\ndescription: (.+)\n---\n", skill)
        if not frontmatter:
            fail("Claude SKILL.md has invalid frontmatter", failures)
        elif frontmatter.group(1) != "heuristics-layer":
            fail("Claude skill name must be heuristics-layer", failures)

    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    for link in re.findall(r"\[[^]]+\]\(([^)]+)\)", readme):
        if "://" not in link and not (ROOT / link).exists():
            fail(f"broken README link: {link}", failures)

    forbidden = ["src/cli.ts", "package.json", "src/synthetic-provider.ts"]
    for relative in forbidden:
        if (ROOT / relative).exists():
            fail(f"obsolete product surface remains: {relative}", failures)

    product_files = [
        ROOT / "packages" / "chatgpt" / "PROJECT_INSTRUCTIONS.md",
        ROOT / "packages" / "chatgpt" / "HEURISTICS_LAYER.md",
        ROOT / "packages" / "claude" / "project" / "PROJECT_INSTRUCTIONS.md",
        ROOT / "packages" / "claude" / "project" / "HEURISTICS_LAYER.md",
        ROOT / "packages" / "claude" / "heuristics-layer" / "SKILL.md",
    ]
    for path in product_files:
        text = path.read_text(encoding="utf-8").lower()
        if "close and process" not in text:
            fail(f"missing spoken close trigger: {path.relative_to(ROOT)}", failures)
        if "codex" in text:
            fail(f"customer product must not depend on Codex: {path.relative_to(ROOT)}", failures)
        if "do not write into a local folder" not in text:
            fail(f"missing explicit file-write boundary: {path.relative_to(ROOT)}", failures)

    for path in product_files:
        text = path.read_text(encoding="utf-8").lower()
        for phrase in ("two-file", "supporting excerpts", "eight qualitative dimensions"):
            if phrase not in text:
                fail(f"customer runtime missing two-file evidence contract ({phrase}): {path.relative_to(ROOT)}", failures)

    for path in (ROOT / "packages").rglob("*.md"):
        if "codex" in path.read_text(encoding="utf-8").lower():
            fail(f"customer package must not mention Codex: {path.relative_to(ROOT)}", failures)

    chatgpt_start = (ROOT / "packages" / "chatgpt" / "START_HERE.md").read_text(encoding="utf-8").lower()
    if "same account and workspace" not in chatgpt_start or "turn on voice" not in chatgpt_start:
        fail("ChatGPT guide must cover the cross-device voice handoff", failures)
    for phrase in ("same chat appears on your phone", "background conversations", "data controls", "mobile file sandbox", "chatgpt work", "two completed markdown outputs"):
        if phrase not in chatgpt_start:
            fail(f"ChatGPT guide missing tested workflow or limitation: {phrase}", failures)

    chatgpt_runtime = (ROOT / "packages" / "chatgpt" / "HEURISTICS_LAYER.md").read_text(encoding="utf-8").lower()
    for phrase in ("two-file review bundle", "supporting excerpts", "all eight qualitative dimensions", "regenerate the same two files"):
        if phrase not in chatgpt_runtime:
            fail(f"ChatGPT runtime missing output-contract safeguard: {phrase}", failures)

    claude_start = (ROOT / "packages" / "claude" / "START_HERE.md").read_text(encoding="utf-8").lower()
    if "cowork" not in claude_start or "same account" not in claude_start:
        fail("Claude guide must cover the cloud Project boundary", failures)
    for phrase in ("code execution and file creation", "project fallback", "voice control"):
        if phrase not in claude_start:
            fail(f"Claude guide missing platform preflight: {phrase}", failures)

    platform_notes = (ROOT / "docs" / "PLATFORM_NOTES.md").read_text(encoding="utf-8").lower()
    if "learn.chatgpt.com/docs/build-skills" in platform_notes:
        fail("platform notes still cite the superseded ChatGPT Skills page", failures)
    if "skills in chatgpt" not in platform_notes or "code execution and file creation" not in platform_notes:
        fail("platform notes must cover current ChatGPT and Claude Skills boundaries", failures)

    skill_root = ROOT / "packages" / "claude" / "heuristics-layer"
    executable_suffixes = {".py", ".js", ".ts", ".sh", ".ps1", ".exe"}
    executables = [path for path in skill_root.rglob("*") if path.is_file() and path.suffix.lower() in executable_suffixes]
    if executables:
        fail("Claude skill must remain instruction-only", failures)


def validate_zip(path: Path, expected: set[str], failures: list[str]) -> None:
    if not path.is_file():
        fail(f"missing release archive: {path.relative_to(ROOT)}", failures)
        return
    with zipfile.ZipFile(path) as archive:
        actual = {name for name in archive.namelist() if not name.endswith("/")}
        if actual != expected:
            fail(
                f"unexpected archive contents for {path.name}: expected {sorted(expected)}, got {sorted(actual)}",
                failures,
            )


def validate_downloads(failures: list[str]) -> None:
    downloads = ROOT / "downloads"
    chatgpt = downloads / f"heuristics-layer-chatgpt-v{VERSION}.zip"
    claude = downloads / f"heuristics-layer-claude-v{VERSION}.zip"
    validate_zip(chatgpt, CHATGPT_CONTENTS, failures)
    validate_zip(claude, CLAUDE_CONTENTS, failures)

    if claude.is_file():
        with zipfile.ZipFile(claude) as outer:
            with outer.open("heuristics-layer-skill.zip") as nested:
                with zipfile.ZipFile(nested) as skill:
                    actual = {name for name in skill.namelist() if not name.endswith("/")}
                    if actual != CLAUDE_SKILL_CONTENTS:
                        fail(
                            f"unexpected Claude skill contents: expected {sorted(CLAUDE_SKILL_CONTENTS)}, got {sorted(actual)}",
                            failures,
                        )

    checksum = downloads / "SHA256SUMS.txt"
    if not checksum.is_file() or len(checksum.read_text(encoding="utf-8").splitlines()) != 2:
        fail("SHA256SUMS.txt must contain exactly two archive checksums", failures)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--downloads", action="store_true", help="also validate downloadable release archives")
    args = parser.parse_args()

    failures: list[str] = []
    validate_source(failures)
    if args.downloads:
        validate_downloads(failures)

    if failures:
        for message in failures:
            print(f"FAIL: {message}")
        return 1

    scope = "source and downloadable archives" if args.downloads else "source"
    print(f"validated {scope} for v{VERSION}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
