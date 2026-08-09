import { describe, expect, it } from "vitest";
import { scoreArtifact, type EvaluationCase } from "../src/evaluation.js";
import { retrieve } from "../src/retrieval.js";
import { assembleReasoningContext } from "../src/runtime.js";
import { SyntheticGrcProvider } from "../src/synthetic-provider.js";
import { approved, transcript } from "./helpers.js";

describe("reasoning harness and evaluation", () => {
  it("assembles traceable context and produces a positive fixture delta", async () => {
    const provider = new SyntheticGrcProvider();
    const notes = await provider.generateNotes(transcript);
    const heuristics = (await provider.extractCandidates(transcript, notes)).map(approved);
    const context = "Vendor uses a shared privileged administrator account protected by a CyberArk password vault.";
    const hits = retrieve(heuristics, context, { domain: "tprm" });
    const assembled = assembleReasoningContext({ task: "Assess the response", context, hits });
    expect(assembled).toContain("privileged_access.accountability");
    expect(assembled).toContain("Do not expose hidden chain-of-thought");

    const testCase: EvaluationCase = {
      id: "E-1", task: "Assess", context,
      evidence: ["Vendor assertion"],
      expectedExpertConsiderations: ["Accountability"],
      likelyNoviceMistake: "Stopping at the product name.",
      relevantHeuristics: ["privileged_access.accountability"],
      requiredConcepts: ["accountability", "attribution", "approval", "evidence", "materiality", "uncertainty"],
      forbiddenClaims: ["automatically acceptable"],
      rubric: ["Tests the control outcome"]
    };
    const baseline = await provider.reason({ task: testCase.task, context, heuristics: [] });
    const generic = await provider.reason({ task: testCase.task, context, heuristics: [], genericGuidance: "Apply general GRC good practices." });
    const enhanced = await provider.reason({ task: testCase.task, context, heuristics });
    expect(scoreArtifact(testCase, enhanced).score).toBeGreaterThan(scoreArtifact(testCase, baseline).score);
    expect(scoreArtifact(testCase, enhanced).score).toBeGreaterThan(scoreArtifact(testCase, generic).score);
    expect(enhanced.heuristicIds).toEqual(heuristics.map((item) => item.id));
  });
});
