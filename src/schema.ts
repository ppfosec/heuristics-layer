import { z } from "zod";

export const heuristicIdPattern = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)+$/;
export const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?$/;

export const excerptSchema = z.object({
  observationId: z.string().min(1),
  quote: z.string().min(1)
});

export const provenanceSchema = z.object({
  interviewId: z.string().min(1),
  sourcePath: z.string().min(1),
  excerpts: z.array(excerptSchema).min(1),
  createdAt: z.string().datetime(),
  approvedAt: z.string().datetime().optional(),
  approvedBy: z.string().min(1).optional()
});

export const exampleSchema = z.object({
  kind: z.enum(["positive", "negative", "edge", "counterexample"]),
  scenario: z.string().min(1),
  expected: z.string().min(1)
});

export const heuristicStatusSchema = z.enum([
  "observed",
  "candidate",
  "needs_clarification",
  "challenged",
  "approved",
  "rejected",
  "deprecated"
]);

export const knowledgeKindSchema = z.enum([
  "hard_constraint",
  "soft_heuristic",
  "caution_signal",
  "probe_strategy",
  "escalation_trigger",
  "contextual_consideration"
]);

export const confidenceLevelSchema = z.enum(["low", "medium", "high"]);

export const expertConfidenceSchema = z.object({
  level: confidenceLevelSchema,
  rationale: z.string().min(1)
});

export const heuristicSchema = z.object({
  id: z.string().regex(heuristicIdPattern),
  title: z.string().min(3),
  version: z.string().regex(semverPattern),
  status: heuristicStatusSchema,
  kind: knowledgeKindSchema,
  domains: z.array(z.string().min(1)).min(1),
  category: z.string().min(1),
  tags: z.array(z.string().min(1)).default([]),
  principle: z.string().min(10),
  rationale: z.string().min(10),
  triggers: z.array(z.string().min(1)).min(1),
  signals: z.array(z.string().min(1)).default([]),
  probes: z.array(z.string().min(1)).default([]),
  confidenceEffect: z.string().min(1).optional(),
  riskEffect: z.string().min(1).optional(),
  decisionImplications: z.array(z.string().min(1)).default([]),
  escalationConditions: z.array(z.string().min(1)).default([]),
  exceptions: z.array(z.string().min(1)).default([]),
  compensatingFactors: z.array(z.string().min(1)).default([]),
  noviceMistake: z.string().min(1).optional(),
  related: z.array(z.string().regex(heuristicIdPattern)).default([]),
  examples: z.array(exampleSchema).min(2),
  expertConfidence: expertConfidenceSchema.optional(),
  provenance: provenanceSchema
});

export const interviewModeSchema = z.enum(["deep_dive", "case_review", "contrast", "failure_analysis", "novice_comparison"]);

export const interviewBriefingSchema = z.object({
  topic: z.string().min(1),
  mode: interviewModeSchema,
  objective: z.string().min(1),
  existingCoverage: z.array(z.string().regex(heuristicIdPattern)),
  openQuestions: z.array(z.string()),
  possibleConflicts: z.array(z.string()),
  avoidDuplicating: z.array(z.string().regex(heuristicIdPattern)),
  promisingThreads: z.array(z.string())
});

export const transcriptSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  domain: z.string().min(1),
  synthetic: z.boolean(),
  recordedAt: z.string().datetime(),
  sourcePath: z.string().min(1),
  text: z.string().min(20)
});

export const observationSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  supportingQuotes: z.array(z.string().min(1)).min(1)
});

export const interviewNotesSchema = z.object({
  interviewId: z.string().min(1),
  observations: z.array(observationSchema).min(1),
  candidatePatterns: z.array(z.string().min(1)).min(1),
  openQuestions: z.array(z.string().min(1)).default([]),
  contradictions: z.array(z.string().min(1)).default([]),
  assumptions: z.array(z.string().min(1)).default([]),
  termsToClarify: z.array(z.string().min(1)).default([]),
  overlaps: z.array(z.string().min(1)).default([])
});

export const challengeSchema = z.object({
  heuristicId: z.string().regex(heuristicIdPattern),
  questions: z.array(z.string().min(1)).min(2),
  counterexamples: z.array(exampleSchema).min(1),
  unresolved: z.array(z.string().min(1)).default([]),
  proposedRevision: z.string().min(10).optional()
});

export const reviewDecisionSchema = z.object({
  heuristicId: z.string().regex(heuristicIdPattern),
  action: z.enum(["approve", "reject", "request_clarification"]),
  reviewer: z.string().min(1),
  reason: z.string().min(1),
  decidedAt: z.string().datetime(),
  expertConfidence: expertConfidenceSchema.optional()
}).superRefine((decision, context) => {
  if (decision.action === "approve" && !decision.expertConfidence) {
    context.addIssue({ code: "custom", path: ["expertConfidence"], message: "Approval requires the expert's confidence and rationale" });
  }
});

export const compiledCorpusSchema = z.object({
  formatVersion: z.literal("0.1.0"),
  generatedAt: z.string().datetime(),
  sourceHash: z.string().regex(/^[a-f0-9]{64}$/),
  heuristics: z.array(heuristicSchema)
});

export const retrievalHitSchema = z.object({
  id: z.string().regex(heuristicIdPattern),
  version: z.string().regex(semverPattern),
  score: z.number().min(0).max(1),
  matchedTerms: z.array(z.string()),
  reason: z.string(),
  heuristic: heuristicSchema
});

export const reasoningArtifactSchema = z.object({
  facts: z.array(z.string()),
  heuristicIds: z.array(z.string().regex(heuristicIdPattern)),
  evidence: z.array(z.string()),
  evidenceConfidence: confidenceLevelSchema,
  inferences: z.array(z.string()),
  uncertainty: z.array(z.string()),
  openQuestions: z.array(z.string()),
  escalation: z.enum(["none", "consider", "required"]),
  modelConfidence: confidenceLevelSchema.optional(),
  conclusion: z.string().min(1)
});

export const evaluationCaseSchema = z.object({
  id: z.string().min(1),
  task: z.string().min(1),
  context: z.string().min(1),
  evidence: z.array(z.string().min(1)).min(1),
  expectedExpertConsiderations: z.array(z.string().min(1)).min(1),
  likelyNoviceMistake: z.string().min(1),
  relevantHeuristics: z.array(z.string().regex(heuristicIdPattern)),
  requiredConcepts: z.array(z.string().min(1)).min(1),
  forbiddenClaims: z.array(z.string().min(1)),
  rubric: z.array(z.string().min(1)).min(1)
});

export const evaluationScoreSchema = z.object({
  caseId: z.string().min(1),
  score: z.number().min(0),
  possible: z.number().int().positive(),
  matchedConcepts: z.array(z.string()),
  forbiddenClaimsFound: z.array(z.string())
});

const evaluationConditionSchema = z.object({ artifact: reasoningArtifactSchema, score: evaluationScoreSchema });

export const evaluationRunSchema = z.object({
  evaluationVersion: z.literal("0.1.0"),
  generatedAt: z.string().datetime(),
  case: evaluationCaseSchema,
  baseline: evaluationConditionSchema,
  genericGrcPrompt: evaluationConditionSchema,
  withHeuristics: evaluationConditionSchema,
  delta: z.number(),
  retrieved: z.array(z.object({ id: z.string().regex(heuristicIdPattern), score: z.number(), reason: z.string() })),
  limitation: z.string().min(1)
});

export const blindEvaluationSchema = z.object({
  reviewVersion: z.literal("0.1.0"),
  caseId: z.string().min(1),
  task: z.string().min(1),
  context: z.string().min(1),
  evidence: z.array(z.string()),
  rubric: z.array(z.string()).min(1),
  outputs: z.array(z.object({ label: z.enum(["A", "B", "C"]), artifact: reasoningArtifactSchema })).length(3)
});

export const blindEvaluationKeySchema = z.object({
  caseId: z.string().min(1),
  mapping: z.record(z.enum(["A", "B", "C"]), z.enum(["baseline", "genericGrcPrompt", "withHeuristics"]))
});

export const expertGradeSchema = z.object({
  gradeVersion: z.literal("0.1.0"),
  caseId: z.string().min(1),
  outputLabel: z.enum(["A", "B", "C"]),
  grader: z.string().min(1),
  gradedAt: z.string().datetime(),
  rubricScores: z.array(z.object({ criterion: z.string().min(1), score: z.number().int().min(1).max(5), note: z.string().optional() })).min(1),
  overallScore: z.number().min(1).max(5),
  notes: z.string().default("")
});

export type Heuristic = z.infer<typeof heuristicSchema>;
export type HeuristicStatus = z.infer<typeof heuristicStatusSchema>;
export type Transcript = z.infer<typeof transcriptSchema>;
export type InterviewNotes = z.infer<typeof interviewNotesSchema>;
export type InterviewBriefing = z.infer<typeof interviewBriefingSchema>;
export type Challenge = z.infer<typeof challengeSchema>;
export type ReviewDecision = z.infer<typeof reviewDecisionSchema>;
export type CompiledCorpus = z.infer<typeof compiledCorpusSchema>;
export type RetrievalHit = z.infer<typeof retrievalHitSchema>;
export type ReasoningArtifact = z.infer<typeof reasoningArtifactSchema>;
export type EvaluationCase = z.infer<typeof evaluationCaseSchema>;
export type EvaluationRun = z.infer<typeof evaluationRunSchema>;
export type BlindEvaluation = z.infer<typeof blindEvaluationSchema>;
export type BlindEvaluationKey = z.infer<typeof blindEvaluationKeySchema>;
export type ExpertGrade = z.infer<typeof expertGradeSchema>;
