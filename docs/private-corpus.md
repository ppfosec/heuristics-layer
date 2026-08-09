# Private corpus guide

Keep real expert material outside the public repository. A practical layout is:

```text
private-grc-corpus/
  interviews/
  workflow/
  heuristics/
  compiled/
  evals/
```

Pass that directory explicitly to the library or CLI. Do not put it beneath a public checkout. Raw transcripts may contain customer, employer, or personal information; sanitize before promoting any object into `examples/`.

The core performs no telemetry and no network calls. A configured model adapter may transmit the prompt and selected content to its provider, so that adapter is the privacy boundary. Review provider retention and residency terms before using real interviews.
