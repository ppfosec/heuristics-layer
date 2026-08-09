import { createHash } from "node:crypto";
import {
  blindEvaluationKeySchema,
  blindEvaluationSchema,
  expertGradeSchema,
  type BlindEvaluation,
  type BlindEvaluationKey,
  type EvaluationRun,
  type ExpertGrade
} from "./schema.js";

type Condition = "baseline" | "genericGrcPrompt" | "withHeuristics";
const labels = ["A", "B", "C"] as const;

export function createBlindEvaluation(run: EvaluationRun, seed = run.case.id): { review: BlindEvaluation; key: BlindEvaluationKey } {
  const conditions: Condition[] = ["baseline", "genericGrcPrompt", "withHeuristics"];
  conditions.sort((left, right) => createHash("sha256").update(`${seed}:${left}`).digest("hex").localeCompare(createHash("sha256").update(`${seed}:${right}`).digest("hex")));
  const mapping = Object.fromEntries(labels.map((label, index) => [label, conditions[index]!])) as Record<(typeof labels)[number], Condition>;
  const review = blindEvaluationSchema.parse({
    reviewVersion: "0.1.0",
    caseId: run.case.id,
    task: run.case.task,
    context: run.case.context,
    evidence: run.case.evidence,
    rubric: run.case.rubric,
    outputs: labels.map((label) => ({ label, artifact: run[mapping[label]].artifact }))
  });
  return { review, key: blindEvaluationKeySchema.parse({ caseId: run.case.id, mapping }) };
}

export function createExpertGrade(input: {
  review: BlindEvaluation;
  label: "A" | "B" | "C";
  grader: string;
  scores: number[];
  overallScore: number;
  notes?: string;
  gradedAt?: string;
}): ExpertGrade {
  if (!input.review.outputs.some((output) => output.label === input.label)) throw new Error(`Unknown output label: ${input.label}`);
  if (input.scores.length !== input.review.rubric.length) throw new Error(`Expected ${input.review.rubric.length} rubric scores, received ${input.scores.length}`);
  return expertGradeSchema.parse({
    gradeVersion: "0.1.0",
    caseId: input.review.caseId,
    outputLabel: input.label,
    grader: input.grader,
    gradedAt: input.gradedAt ?? new Date().toISOString(),
    rubricScores: input.review.rubric.map((criterion, index) => ({ criterion, score: input.scores[index] })),
    overallScore: input.overallScore,
    notes: input.notes ?? ""
  });
}
