import { describe, expect, it } from "vitest";
import { scoreArtifact } from "../src/evaluation.js";
import { createBlindEvaluation, createExpertGrade } from "../src/grading.js";
import { evaluationRunSchema, type EvaluationCase } from "../src/schema.js";
import { SyntheticGrcProvider } from "../src/synthetic-provider.js";

const testCase: EvaluationCase = {
  id: "E-BLIND-1",
  task: "Assess a response",
  context: "A shared administrator account is protected by a password vault.",
  evidence: ["Vendor assertion"],
  expectedExpertConsiderations: ["Accountability"],
  likelyNoviceMistake: "Stopping at the product name.",
  relevantHeuristics: [],
  requiredConcepts: ["evidence", "uncertainty"],
  forbiddenClaims: [],
  rubric: ["Evidence handling", "Uncertainty calibration", "Practical usefulness"]
};

describe("blind expert grading", () => {
  it("separates anonymized outputs from the condition key", async () => {
    const provider = new SyntheticGrcProvider();
    const baseline = await provider.reason({ task: testCase.task, context: testCase.context, heuristics: [] });
    const generic = await provider.reason({ task: testCase.task, context: testCase.context, heuristics: [], genericGuidance: "Apply generic GRC guidance." });
    const enhanced = generic;
    const run = evaluationRunSchema.parse({
      evaluationVersion: "0.1.0", generatedAt: "2026-08-09T18:00:00.000Z", case: testCase,
      baseline: { artifact: baseline, score: scoreArtifact(testCase, baseline) },
      genericGrcPrompt: { artifact: generic, score: scoreArtifact(testCase, generic) },
      withHeuristics: { artifact: enhanced, score: scoreArtifact(testCase, enhanced) },
      delta: 0, retrieved: [], limitation: "Fixture"
    });
    const first = createBlindEvaluation(run, "fixed-seed");
    const second = createBlindEvaluation(run, "fixed-seed");
    expect(first).toEqual(second);
    expect(Object.values(first.key.mapping).sort()).toEqual(["baseline", "genericGrcPrompt", "withHeuristics"].sort());
    expect(JSON.stringify(first.review)).not.toContain("genericGrcPrompt");

    const grade = createExpertGrade({ review: first.review, label: "A", grader: "Expert", scores: [4, 3, 5], overallScore: 4, gradedAt: "2026-08-09T19:00:00.000Z" });
    expect(grade.rubricScores).toHaveLength(3);
    expect(grade.overallScore).toBe(4);
    expect(() => createExpertGrade({ review: first.review, label: "B", grader: "Expert", scores: [5], overallScore: 5 })).toThrow(/Expected 3/);
  });
});
