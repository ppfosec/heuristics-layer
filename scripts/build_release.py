from __future__ import annotations

import hashlib
import tempfile
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = ROOT / "downloads"
VERSION = (ROOT / "VERSION").read_text(encoding="utf-8").strip()


def add_file(archive: zipfile.ZipFile, source: Path, destination: str) -> None:
    archive.write(source, destination)


def build_portable_skill(destination: Path) -> None:
    skill = ROOT / "packages" / "claude" / "heuristics-layer"
    with zipfile.ZipFile(destination, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for source in sorted(skill.rglob("*")):
            if source.is_file():
                relative = source.relative_to(skill.parent)
                add_file(archive, source, relative.as_posix())


def build_repository_template(destination: Path) -> None:
    template = ROOT / "packages" / "claude" / "heuristics-layer" / "assets" / "private-heuristics-repository"
    with zipfile.ZipFile(destination, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for source in sorted(template.rglob("*")):
            if source.is_file():
                relative = source.relative_to(template.parent)
                add_file(archive, source, relative.as_posix())


def build_chatgpt() -> Path:
    output = DOWNLOADS / f"heuristics-layer-chatgpt-v{VERSION}.zip"
    package = ROOT / "packages" / "chatgpt"
    with tempfile.TemporaryDirectory() as temporary_directory:
        skill_zip = Path(temporary_directory) / "heuristics-layer-skill.zip"
        repository_zip = Path(temporary_directory) / "private-heuristics-repository.zip"
        build_portable_skill(skill_zip)
        build_repository_template(repository_zip)
        with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED) as archive:
            for name in ("START_HERE.md", "PROJECT_INSTRUCTIONS.md", "HEURISTICS_LAYER.md"):
                add_file(archive, package / name, name)
            add_file(archive, skill_zip, "OPTIONAL_HEURISTICS_LAYER_SKILL.zip")
            add_file(archive, repository_zip, "PRIVATE_HEURISTICS_REPOSITORY.zip")
            add_file(archive, ROOT / "core" / "NORMALIZE_AND_PUBLISH.md", "NORMALIZE_AND_PUBLISH.md")
            add_file(archive, ROOT / "core" / "PUBLISH_PUBLICLY.md", "PUBLISH_PUBLICLY.md")
            add_file(archive, ROOT / "core" / "PRIVACY.md", "PRIVACY.md")
            add_file(archive, ROOT / "core" / "JUDGMENT_REPOSITORY.md", "JUDGMENT_REPOSITORY.md")
            add_file(archive, ROOT / "core" / "JUDGMENT_LIBRARY.md", "JUDGMENT_LIBRARY.md")
            add_file(archive, ROOT / "LICENSE", "LICENSE")
    return output


def build_claude() -> Path:
    output = DOWNLOADS / f"heuristics-layer-claude-v{VERSION}.zip"
    package = ROOT / "packages" / "claude"
    with tempfile.TemporaryDirectory() as temporary_directory:
        skill_zip = Path(temporary_directory) / "heuristics-layer-skill.zip"
        repository_zip = Path(temporary_directory) / "private-heuristics-repository.zip"
        build_portable_skill(skill_zip)
        build_repository_template(repository_zip)
        with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED) as archive:
            add_file(archive, package / "START_HERE.md", "00_START_HERE.md")
            add_file(archive, package / "project" / "PROJECT_INSTRUCTIONS.md", "CLAUDE_INSTRUCTIONS.md")
            add_file(archive, package / "project" / "HEURISTICS_LAYER.md", "HEURISTICS_LAYER.md")
            add_file(archive, skill_zip, "OPTIONAL_HEURISTICS_LAYER_SKILL.zip")
            add_file(archive, repository_zip, "PRIVATE_HEURISTICS_REPOSITORY.zip")
            add_file(archive, ROOT / "core" / "NORMALIZE_AND_PUBLISH.md", "NORMALIZE_AND_PUBLISH.md")
            add_file(archive, ROOT / "core" / "PUBLISH_PUBLICLY.md", "PUBLISH_PUBLICLY.md")
            add_file(archive, ROOT / "core" / "PRIVACY.md", "PRIVACY.md")
            add_file(archive, ROOT / "core" / "JUDGMENT_REPOSITORY.md", "JUDGMENT_REPOSITORY.md")
            add_file(archive, ROOT / "core" / "JUDGMENT_LIBRARY.md", "JUDGMENT_LIBRARY.md")
            add_file(archive, ROOT / "LICENSE", "LICENSE")
    return output


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> None:
    DOWNLOADS.mkdir(exist_ok=True)

    archives = [build_chatgpt(), build_claude()]
    checksums = "\n".join(f"{sha256(path)}  {path.name}" for path in archives) + "\n"
    (DOWNLOADS / "SHA256SUMS.txt").write_text(checksums, encoding="utf-8")

    for path in archives:
        print(f"built {path.relative_to(ROOT)}")
    print("built downloads/SHA256SUMS.txt")


if __name__ == "__main__":
    main()
