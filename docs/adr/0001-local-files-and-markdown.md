# ADR 0001: Local files and Markdown sources

Status: accepted

Canonical approved heuristics use Markdown with YAML frontmatter. Workflow artifacts use JSON. Markdown keeps expert review readable; JSON keeps transient machine state unambiguous. Compilation validates both and emits normalized JSON. SQLite is deferred until concurrent editing or query volume justifies it.
