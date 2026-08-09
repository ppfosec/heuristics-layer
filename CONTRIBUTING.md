# Contributing

Contributions should preserve the project's central distinction: model-generated candidates are not approved expert knowledge.

Before opening a pull request:

```bash
npm install
npm run check
npm run build
npm run demo
npm run eval
```

Add tests for schema, lifecycle, provenance, compilation, retrieval, or compatibility changes. Use synthetic or sanitized fixtures only. Do not submit a real transcript, customer example, employer artifact, or private corpus excerpt.

Significant object-model, storage, retrieval, provider, privacy, versioning, or distribution changes need a short ADR in `docs/adr/`.
