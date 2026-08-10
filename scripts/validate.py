from __future__ import annotations

import argparse
import io
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
    "core/NORMALIZE_AND_PUBLISH.md",
    "core/PUBLISH_PUBLICLY.md",
    "core/OUTPUT_CONTRACT.md",
    "core/PRIVACY.md",
    "core/JUDGMENT_REPOSITORY.md",
    "core/JUDGMENT_LIBRARY.md",
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
    "packages/claude/heuristics-layer/references/judgment-repository.md",
    "packages/claude/heuristics-layer/references/normalize-and-publish.md",
    "examples/ai-vendor-plan/session-packet.md",
    "examples/ai-vendor-plan/proposed-library-changes.md",
    "examples/ai-vendor-plan/published-repository/library/JUDGMENT_LIBRARY.md",
    "examples/ai-vendor-plan/published-repository/publications/PUBLICATION_LOG.md",
    "examples/ai-vendor-plan/published-repository/unresolved/UNRESOLVED_QUESTIONS.md",
    "examples/ai-vendor-plan/published-repository/intake/INTAKE_MANIFEST.md",
    "examples/ai-vendor-plan/published-repository/REPOSITORY_STATE.md",
    "docs/LIVE_ACCEPTANCE_RECORD.md",
    "docs/V0.3_ACCEPTANCE.md",
    "docs/V0.3_FORWARD_TEST_RECORD.md",
    "docs/V0.3_LIVE_RESULT.md",
    "docs/RELEASE_NOTES_V0.3.0.md",
    "public-library/README.md",
    "public-library/CONTRIBUTION_TEMPLATE.md",
]

CHATGPT_CONTENTS = {
    "START_HERE.md",
    "PROJECT_INSTRUCTIONS.md",
    "HEURISTICS_LAYER.md",
    "NORMALIZE_AND_PUBLISH.md",
    "PUBLISH_PUBLICLY.md",
    "OPTIONAL_HEURISTICS_LAYER_SKILL.zip",
    "PRIVATE_HEURISTICS_REPOSITORY.zip",
    "PRIVACY.md",
    "JUDGMENT_REPOSITORY.md",
    "JUDGMENT_LIBRARY.md",
    "LICENSE",
}

CLAUDE_CONTENTS = {
    "00_START_HERE.md",
    "CLAUDE_INSTRUCTIONS.md",
    "HEURISTICS_LAYER.md",
    "NORMALIZE_AND_PUBLISH.md",
    "PUBLISH_PUBLICLY.md",
    "OPTIONAL_HEURISTICS_LAYER_SKILL.zip",
    "PRIVATE_HEURISTICS_REPOSITORY.zip",
    "PRIVACY.md",
    "JUDGMENT_REPOSITORY.md",
    "JUDGMENT_LIBRARY.md",
    "LICENSE",
}

SKILL_ROOT = ROOT / "packages" / "claude" / "heuristics-layer"
TEMPLATE_ROOT = SKILL_ROOT / "assets" / "private-heuristics-repository"
PORTABLE_SKILL_CONTENTS = {
    source.relative_to(SKILL_ROOT.parent).as_posix()
    for source in SKILL_ROOT.rglob("*")
    if source.is_file()
}
REPOSITORY_TEMPLATE_CONTENTS = {
    source.relative_to(TEMPLATE_ROOT.parent).as_posix()
    for source in TEMPLATE_ROOT.rglob("*")
    if source.is_file()
}

PRIVATE_REPOSITORY_PATTERNS = (
    ("private stable identifier", re.compile(rb"PPF-H-", flags=re.IGNORECASE)),
    ("private local Heuristics path", re.compile(rb"[A-Z]:\\[^\\\r\n]+\\Heuristics", flags=re.IGNORECASE)),
)


def fail(message: str, failures: list[str]) -> None:
    failures.append(message)


def validate_source(failures: list[str]) -> None:
    for relative in REQUIRED_SOURCE_FILES:
        if not (ROOT / relative).is_file():
            fail(f"missing required file: {relative}", failures)

    text_files = list(ROOT.glob("*.md"))
    for directory in ("core", "docs", "examples", "packages", "public-library"):
        text_files.extend((ROOT / directory).rglob("*.md"))

    for path in text_files:
        text = path.read_text(encoding="utf-8")
        if "[TODO" in text or "TODO:" in text:
            fail(f"unresolved placeholder: {path.relative_to(ROOT)}", failures)
        if "\u2014" in text:
            fail(f"em dash found: {path.relative_to(ROOT)}", failures)
        encoded = text.encode("utf-8")
        for label, pattern in PRIVATE_REPOSITORY_PATTERNS:
            if pattern.search(encoded):
                fail(f"{label} found: {path.relative_to(ROOT)}", failures)

    acceptance_record = (ROOT / "docs" / "LIVE_ACCEPTANCE_RECORD.md").read_text(encoding="utf-8")
    for line in acceptance_record.splitlines():
        if line.startswith("- Evidence reviewed:") and re.search(r"`[^`]+\.(?:md|zip)`", line, flags=re.IGNORECASE):
            fail("live acceptance record must describe private evidence without publishing its filenames", failures)

    skill_path = ROOT / "packages" / "claude" / "heuristics-layer" / "SKILL.md"
    if skill_path.is_file():
        skill = skill_path.read_text(encoding="utf-8")
        frontmatter = re.match(r"^---\nname: ([a-z0-9-]+)\ndescription: (.+)\n---\n", skill)
        if not frontmatter:
            fail("portable SKILL.md has invalid frontmatter", failures)
        elif frontmatter.group(1) != "heuristics-layer":
            fail("portable skill name must be heuristics-layer", failures)

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
        for phrase in ("normalize-and-publish", "publication", "practitioner"):
            if phrase not in text:
                fail(f"customer runtime missing v0.3 publication contract ({phrase}): {path.relative_to(ROOT)}", failures)

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
    for phrase in ("same chat appears on your phone", "background conversations", "data controls", "mobile file sandbox", "chatgpt work", "two completed markdown outputs", "optional_heuristics_layer_skill.zip", "not documented as guaranteed inside voice", "private_heuristics_repository.zip", "normalize and publish", "do not ask me to edit or move files", "complete-zip path without local work", "one complete replacement repository zip"):
        if phrase not in chatgpt_start:
            fail(f"ChatGPT guide missing tested workflow or limitation: {phrase}", failures)

    chatgpt_runtime = (ROOT / "packages" / "chatgpt" / "HEURISTICS_LAYER.md").read_text(encoding="utf-8").lower()
    for phrase in ("two-file review bundle", "supporting excerpts", "all eight qualitative dimensions", "regenerate the same two files"):
        if phrase not in chatgpt_runtime:
            fail(f"ChatGPT runtime missing output-contract safeguard: {phrase}", failures)

    claude_start = (ROOT / "packages" / "claude" / "START_HERE.md").read_text(encoding="utf-8").lower()
    if "cowork" not in claude_start or "same account" not in claude_start:
        fail("Claude guide must cover the cross-device boundary", failures)
    for phrase in ("extract the downloaded", "leave `optional_heuristics_layer_skill.zip`", "start with one ordinary claude chat", "claude_instructions.md", "same chat", "optional skill", "judgment_repository.md", "included empty starter", "regenerate the two completed markdown outputs", "not documented as guaranteed inside voice", "private_heuristics_repository.zip", "normalize and publish", "do not ask me to edit or move files", "complete-zip path without local cowork", "one complete replacement repository zip"):
        if phrase not in claude_start:
            fail(f"Claude guide missing simplified workflow or repository repair: {phrase}", failures)

    platform_notes = (ROOT / "docs" / "PLATFORM_NOTES.md").read_text(encoding="utf-8").lower()
    if "learn.chatgpt.com/docs/build-skills" in platform_notes:
        fail("platform notes still cite the superseded ChatGPT Skills page", failures)
    if "skills in chatgpt" not in platform_notes or "code execution and file creation" not in platform_notes:
        fail("platform notes must cover current ChatGPT and Claude Skills boundaries", failures)

    skill_root = ROOT / "packages" / "claude" / "heuristics-layer"
    executable_suffixes = {".py", ".js", ".ts", ".sh", ".ps1", ".exe"}
    executables = [path for path in skill_root.rglob("*") if path.is_file() and path.suffix.lower() in executable_suffixes]
    if executables:
        fail("portable skill must remain instruction-only", failures)

    publish_protocol = (ROOT / "core" / "NORMALIZE_AND_PUBLISH.md").read_text(encoding="utf-8").lower()
    for phrase in ("one complete replacement zip", "publication transaction", "never ask the practitioner", "explicitly approves", "immutable identifier prefix"):
        if phrase not in publish_protocol:
            fail(f"normalize-and-publish protocol missing safety contract: {phrase}", failures)

    public_protocol = (ROOT / "core" / "PUBLISH_PUBLICLY.md").read_text(encoding="utf-8").lower()
    for phrase in ("second publication decision", "private approval does not imply public approval", "hl-p-####", "private-data scan", "pull request", "never stage or commit the private repository"):
        if phrase not in public_protocol:
            fail(f"public contribution protocol missing safety contract: {phrase}", failures)

    public_library = (ROOT / "public-library" / "README.md").read_text(encoding="utf-8")
    public_entries = re.findall(r"^# (HL-P-\d{4}):", public_library, flags=re.MULTILINE)
    if len(public_entries) != len(set(public_entries)):
        fail("public library contains duplicate stable identifiers", failures)

    live_result = (ROOT / "docs" / "V0.3_LIVE_RESULT.md").read_text(encoding="utf-8").lower()
    for phrase in ("seven distinct heuristic candidates", "published exactly one private heuristic", "six candidates remained blocked", "no private publication content", "codex desktop"):
        if phrase not in live_result:
            fail(f"v0.3 live result missing acceptance evidence: {phrase}", failures)

    template_library = TEMPLATE_ROOT / "library" / "JUDGMENT_LIBRARY.md"
    if not template_library.is_file() or "published heuristic count: 0" not in template_library.read_text(encoding="utf-8").lower():
        fail("private repository template must start with an empty authoritative library", failures)
    template_protocol = (TEMPLATE_ROOT / "NORMALIZE_AND_PUBLISH.md").read_text(encoding="utf-8").lower()
    for phrase in ("never ask the practitioner", "publication transaction", "explicitly approves", "one complete replacement repository zip"):
        if phrase not in template_protocol:
            fail(f"private repository template missing self-contained publication contract: {phrase}", failures)

    example_root = ROOT / "examples" / "ai-vendor-plan" / "published-repository"
    example_library = (example_root / "library" / "JUDGMENT_LIBRARY.md").read_text(encoding="utf-8")
    example_state = (example_root / "REPOSITORY_STATE.md").read_text(encoding="utf-8")
    example_log = (example_root / "publications" / "PUBLICATION_LOG.md").read_text(encoding="utf-8")
    published_ids = re.findall(r"^## (HL-H-\d{4}):", example_library, flags=re.MULTILINE)
    state_count = re.search(r"^- Published heuristics: (\d+)$", example_state, flags=re.MULTILINE)
    library_count = re.search(r"^- Published heuristic count: (\d+)$", example_library, flags=re.MULTILINE)
    if not state_count or not library_count or int(state_count.group(1)) != len(published_ids) or int(library_count.group(1)) != len(published_ids):
        fail("synthetic published repository counts do not agree", failures)
    for stable_id in published_ids:
        if stable_id not in example_log:
            fail(f"synthetic publication log missing published identifier: {stable_id}", failures)


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


def validate_archive_privacy(data: bytes, label: str, failures: list[str]) -> None:
    try:
        with zipfile.ZipFile(io.BytesIO(data)) as archive:
            for info in archive.infolist():
                if info.is_dir():
                    continue
                body = archive.read(info)
                searchable = info.filename.encode("utf-8") + b"\n" + body
                for pattern_label, pattern in PRIVATE_REPOSITORY_PATTERNS:
                    if pattern.search(searchable):
                        fail(f"{pattern_label} found in release archive: {label}!{info.filename}", failures)
                if info.filename.lower().endswith(".zip"):
                    validate_archive_privacy(body, f"{label}!{info.filename}", failures)
    except zipfile.BadZipFile:
        fail(f"invalid nested ZIP archive: {label}", failures)


def validate_downloads(failures: list[str]) -> None:
    downloads = ROOT / "downloads"
    chatgpt = downloads / f"heuristics-layer-chatgpt-v{VERSION}.zip"
    claude = downloads / f"heuristics-layer-claude-v{VERSION}.zip"
    validate_zip(chatgpt, CHATGPT_CONTENTS, failures)
    validate_zip(claude, CLAUDE_CONTENTS, failures)

    for platform, archive_path in (("ChatGPT", chatgpt), ("Claude", claude)):
        if archive_path.is_file():
            validate_archive_privacy(archive_path.read_bytes(), archive_path.name, failures)
            with zipfile.ZipFile(archive_path) as outer:
                with outer.open("OPTIONAL_HEURISTICS_LAYER_SKILL.zip") as nested:
                    with zipfile.ZipFile(nested) as skill:
                        actual = {name for name in skill.namelist() if not name.endswith("/")}
                        if actual != PORTABLE_SKILL_CONTENTS:
                            fail(
                                f"unexpected {platform} skill contents: expected {sorted(PORTABLE_SKILL_CONTENTS)}, got {sorted(actual)}",
                                failures,
                            )
                with outer.open("PRIVATE_HEURISTICS_REPOSITORY.zip") as nested:
                    with zipfile.ZipFile(nested) as repository:
                        actual = {name for name in repository.namelist() if not name.endswith("/")}
                        if actual != REPOSITORY_TEMPLATE_CONTENTS:
                            fail(
                                f"unexpected {platform} repository template contents: expected {sorted(REPOSITORY_TEMPLATE_CONTENTS)}, got {sorted(actual)}",
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
