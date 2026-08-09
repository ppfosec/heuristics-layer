# Contributing

Heuristics Layer is deliberately small. Contributions should improve the voice interview, semantic challenge, expert review, privacy, cross-device setup, or clarity of the resulting Markdown.

Do not add a CLI, provider abstraction, vector database, orchestration framework, or deterministic heuristic scorer without a demonstrated user need.

Before opening a change:

```bash
python scripts/validate.py
python scripts/build_release.py
python scripts/validate.py --downloads
```

Use fictional or thoroughly sanitized GRC examples. Never contribute raw customer, employee, vendor, or employer material.
