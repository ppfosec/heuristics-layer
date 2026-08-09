import type { EvaluationCase, ReasoningArtifact } from "./schema.js";
export type { EvaluationCase } from "./schema.js";

export interface EvaluationScore {
  caseId: string;
  score: number;
  possible: number;
  matchedConcepts: string[];
  forbiddenClaimsFound: string[];
}

export function scoreArtifact(testCase: EvaluationCase, artifact: ReasoningArtifact): EvaluationScore {
  const output = [
    ...artifact.facts,
    ...artifact.evidence,
    ...artifact.inferences,
    ...artifact.uncertainty,
    ...artifact.openQuestions,
    artifact.conclusion
  ].join(" ").toLowerCase();
  const matchedConcepts = testCase.requiredConcepts.filter((concept) => output.includes(concept.toLowerCase()));
  const forbiddenClaimsFound = testCase.forbiddenClaims.filter((claim) => output.includes(claim.toLowerCase()));
  return {
    caseId: testCase.id,
    score: Math.max(0, matchedConcepts.length - forbiddenClaimsFound.length),
    possible: testCase.requiredConcepts.length,
    matchedConcepts,
    forbiddenClaimsFound
  };
}
