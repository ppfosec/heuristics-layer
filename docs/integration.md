# Integration guide

Consuming applications need only the compiled corpus, retriever, context assembler, and a reasoning provider.

```ts
import { assembleReasoningContext, retrieve } from "@heuristics-layer/core";

const hits = retrieve(corpus.heuristics, vendorAnswer, {
  domain: "tprm",
  limit: 5
});

const context = assembleReasoningContext({
  task: "Assess the vendor response",
  context: vendorAnswer,
  hits
});
```

Keep the corpus on the server. Log retrieved IDs, versions, scores, and reasons with the decision artifact. Do not log raw private source excerpts unless the application has an explicit retention need.

The runtime performs no network call. Your model adapter owns the provider request and therefore owns the data-transfer boundary.

## Connecting a model provider

Implement `StructuredGenerator`, then pass it to `PromptModel`. The generator receives a purpose, system instructions, serialized input, and a Draft 2020-12 JSON Schema. It is responsible for calling the provider and returning the parsed JSON value.

```ts
import { PromptModel, type StructuredGenerator } from "@heuristics-layer/core";

const generator: StructuredGenerator = {
  async generate(request) {
    // Call the provider configured by your application.
    // Return the provider's parsed structured output.
  }
};

const model = new PromptModel(generator);
```

`PromptModel` validates every response before workflow code can persist it. The provider cannot bypass status transitions or approve its own candidate.
