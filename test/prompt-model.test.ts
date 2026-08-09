import { describe, expect, it } from "vitest";
import { PromptModel, type StructuredGenerationRequest } from "../src/prompt-model.js";
import { SyntheticGrcProvider } from "../src/synthetic-provider.js";
import { transcript } from "./helpers.js";

describe("schema-driven provider adapter", () => {
  it("runs every elicitation stage through a provider-neutral structured generator", async () => {
    const fixture = new SyntheticGrcProvider();
    const notes = await fixture.generateNotes(transcript);
    const candidates = await fixture.extractCandidates(transcript, notes);
    const challenge = await fixture.challengeCandidate(candidates[0]!, transcript, notes);
    const reasoning = await fixture.reason({ task: "Assess", context: transcript.text, heuristics: candidates });
    const responses: unknown[] = [notes, candidates, challenge, reasoning];
    const requests: StructuredGenerationRequest[] = [];
    const model = new PromptModel({
      async generate(request) {
        requests.push(request);
        return responses.shift();
      }
    });

    const generatedNotes = await model.generateNotes(transcript);
    const generatedCandidates = await model.extractCandidates(transcript, generatedNotes);
    await model.challengeCandidate(generatedCandidates[0]!, transcript, generatedNotes);
    await model.reason({ task: "Assess", context: transcript.text, heuristics: generatedCandidates });

    expect(requests.map((request) => request.purpose)).toEqual(["notes", "extract", "challenge", "reason"]);
    expect(requests.every((request) => request.jsonSchema.$schema === "https://json-schema.org/draft/2020-12/schema")).toBe(true);
    expect(requests[0]?.system).toContain("concrete incident");
    expect(requests[3]?.system).toContain("Never return hidden chain-of-thought");
  });

  it("rejects malformed provider output before it reaches workflow state", async () => {
    const model = new PromptModel({ async generate() { return { interviewId: transcript.id }; } });
    await expect(model.generateNotes(transcript)).rejects.toThrow();
  });
});
