from __future__ import annotations

import hashlib
import tempfile
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
VERSION = (ROOT / "VERSION").read_text(encoding="utf-8").strip()


def add_file(archive: zipfile.ZipFile, source: Path, destination: str) -> None:
    archive.write(source, destination)


def build_chatgpt() -> Path:
    output = DIST / f"heuristics-layer-chatgpt-v{VERSION}.zip"
    package = ROOT / "packages" / "chatgpt"
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for name in ("START_HERE.md", "PROJECT_INSTRUCTIONS.md", "HEURISTICS_LAYER.md"):
            add_file(archive, package / name, name)
        add_file(archive, ROOT / "core" / "PRIVACY.md", "PRIVACY.md")
        add_file(archive, ROOT / "LICENSE", "LICENSE")
    return output


def build_claude_skill(destination: Path) -> None:
    skill = ROOT / "packages" / "claude" / "heuristics-layer"
    with zipfile.ZipFile(destination, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for source in sorted(skill.rglob("*")):
            if source.is_file():
                relative = source.relative_to(skill.parent)
                add_file(archive, source, relative.as_posix())


def build_claude() -> Path:
    output = DIST / f"heuristics-layer-claude-v{VERSION}.zip"
    package = ROOT / "packages" / "claude"
    with tempfile.TemporaryDirectory() as temporary_directory:
        skill_zip = Path(temporary_directory) / "heuristics-layer-skill.zip"
        build_claude_skill(skill_zip)
        with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED) as archive:
            add_file(archive, package / "START_HERE.md", "START_HERE.md")
            add_file(archive, package / "project" / "PROJECT_INSTRUCTIONS.md", "project/PROJECT_INSTRUCTIONS.md")
            add_file(archive, package / "project" / "HEURISTICS_LAYER.md", "project/HEURISTICS_LAYER.md")
            add_file(archive, skill_zip, "heuristics-layer-skill.zip")
            add_file(archive, ROOT / "core" / "PRIVACY.md", "PRIVACY.md")
            add_file(archive, ROOT / "LICENSE", "LICENSE")
    return output


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> None:
    DIST.mkdir(exist_ok=True)

    archives = [build_chatgpt(), build_claude()]
    checksums = "\n".join(f"{sha256(path)}  {path.name}" for path in archives) + "\n"
    (DIST / "SHA256SUMS.txt").write_text(checksums, encoding="utf-8")

    for path in archives:
        print(f"built {path.relative_to(ROOT)}")
    print("built dist/SHA256SUMS.txt")


if __name__ == "__main__":
    main()
