# ADR 0004: Provider-neutral core

Status: accepted

Generation crosses the `StructuredModel` interface. The core owns schemas, prompts, workflow state, and validation. Providers only return structured output. The offline synthetic adapter enables deterministic tests. No orchestration framework is required.
