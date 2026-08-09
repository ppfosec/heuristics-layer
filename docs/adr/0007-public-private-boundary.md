# ADR 0007: Public framework, private corpus

Status: accepted

The public repository contains code, methodology, prompts, schemas, synthetic fixtures, and sanitized examples. Real transcripts and the accumulated GRC corpus live outside the checkout in private storage. Runtime consumers receive a corpus path explicitly; the core does not discover, upload, or expose it. Promotion from private to public requires a separate sanitization and review decision.
