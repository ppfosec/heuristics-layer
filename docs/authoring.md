# Authoring approved heuristics

Approved heuristics are Markdown files with YAML frontmatter. The frontmatter carries identity, lifecycle, taxonomy, relationships, and provenance. The body carries the judgment an expert needs to review.

Required body sections are fixed so compilation can fail loudly when a material part disappears:

- Principle and rationale
- Triggers, signals, and probes
- Confidence and risk effects
- Decision and escalation implications
- Exceptions and compensating factors
- Common novice mistake
- At least two examples, including the expected handling

Use a stable, namespaced ID such as `evidence.certification_scope`. Update the version when approved content changes. Do not recycle an ID for a different principle. A source with `status: candidate` can be stored for editing, but the compiler includes only `approved` objects.

The Markdown parser is intentionally strict. “None recorded” is valid for optional sections. Deleting the section is not, because an absent section is indistinguishable from an accidental authoring error.
