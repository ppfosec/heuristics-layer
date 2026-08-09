import type { Heuristic, ReasoningArtifact, RetrievalHit } from "./schema.js";

export interface ReasoningModel {
  reason(input: { task: string; context: string; heuristics: Heuristic[]; genericGuidance?: string }): Promise<ReasoningArtifact>;
}

export interface ReasoningRequest {
  task: string;
  context: string;
  hits: RetrievalHit[];
}

export function assembleReasoningContext(request: ReasoningRequest): string {
  const selected = request.hits.map((hit) => ({
    id: hit.id,
    version: hit.version,
    principle: hit.heuristic.principle,
    triggers: hit.heuristic.triggers,
    probes: hit.heuristic.probes,
    exceptions: hit.heuristic.exceptions,
    compensatingFactors: hit.heuristic.compensatingFactors
  }));
  return [
    "TASK", request.task,
    "", "CONTEXT", request.context,
    "", "APPROVED EXPERT HEURISTICS", JSON.stringify(selected, null, 2),
    "", "OUTPUT CONTRACT",
    "Return facts, heuristicIds, evidence, inferences, uncertainty, openQuestions, escalation, and conclusion.",
    "Do not expose hidden chain-of-thought. Do not treat a heuristic as a fact."
  ].join("\n");
}
