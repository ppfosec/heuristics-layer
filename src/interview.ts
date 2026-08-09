import { interviewBriefingSchema, type Heuristic, type InterviewBriefing, type InterviewNotes } from "./schema.js";
import { retrieve } from "./retrieval.js";

export type InterviewMode = InterviewBriefing["mode"];

const objectives: Record<InterviewMode, string> = {
  deep_dive: "Explore one judgment area until its cues, thresholds, exceptions, and decision consequences are explicit.",
  case_review: "Follow a concrete case chronologically and identify the decisions, cues, evidence, and next questions.",
  contrast: "Compare opposite outcomes to expose the variables that change the expert's judgment.",
  failure_analysis: "Examine a judgment that failed and identify the assumption, missing cue, or exception that mattered.",
  novice_comparison: "Contrast expert and novice handling to expose tacit sequencing, pattern recognition, and common traps."
};

export function createInterviewBriefing(input: {
  topic: string;
  mode: InterviewMode;
  heuristics: Heuristic[];
  priorNotes?: InterviewNotes[];
  limit?: number;
}): InterviewBriefing {
  const hits = retrieve(input.heuristics, input.topic, { limit: input.limit ?? 5, minScore: 0.01 });
  const coverage = hits.map((hit) => hit.heuristic);
  const notes = input.priorNotes ?? [];
  const briefing = {
    topic: input.topic,
    mode: input.mode,
    objective: objectives[input.mode],
    existingCoverage: coverage.map((heuristic) => heuristic.id),
    openQuestions: [...new Set(notes.flatMap((note) => note.openQuestions))].slice(0, 8),
    possibleConflicts: [...new Set(notes.flatMap((note) => note.contradictions))].slice(0, 8),
    avoidDuplicating: coverage.map((heuristic) => heuristic.id),
    promisingThreads: [...new Set([
      ...notes.flatMap((note) => note.candidatePatterns),
      ...coverage.flatMap((heuristic) => heuristic.probes)
    ])].slice(0, 8)
  };
  return interviewBriefingSchema.parse(briefing);
}
