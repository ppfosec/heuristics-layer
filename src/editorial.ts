import type { Heuristic } from "./schema.js";

export interface QualityCriterion {
  id: "actionable" | "contextual" | "discriminating" | "reusable" | "challengeable" | "retrievable" | "decision_useful" | "distinct_from_domain_fact";
  passed: boolean;
  reason: string;
}

export interface QualityAssessment {
  heuristicId: string;
  score: number;
  possible: number;
  criteria: QualityCriterion[];
  possibleDuplicates: Array<{ id: string; similarity: number }>;
}

function words(value: string): Set<string> {
  return new Set(value.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(/\s+/).filter((word) => word.length > 2));
}

function similarity(left: Heuristic, right: Heuristic): number {
  const a = words(`${left.title} ${left.principle} ${left.tags.join(" ")}`);
  const b = words(`${right.title} ${right.principle} ${right.tags.join(" ")}`);
  const intersection = [...a].filter((item) => b.has(item)).length;
  const union = new Set([...a, ...b]).size;
  return union ? intersection / union : 0;
}

export function assessCandidateQuality(candidate: Heuristic, existing: Heuristic[] = []): QualityAssessment {
  const exampleKinds = new Set(candidate.examples.map((example) => example.kind));
  const conditional = /\b(when|where|unless|only|depends|if|within|until)\b/i.test(candidate.principle);
  const criteria: QualityCriterion[] = [
    { id: "actionable", passed: candidate.probes.length > 0 || candidate.decisionImplications.length > 0, reason: "Provides a probe or decision implication." },
    { id: "contextual", passed: candidate.triggers.length > 0 && (candidate.exceptions.length > 0 || candidate.compensatingFactors.length > 0), reason: "Defines when it applies and what can change the result." },
    { id: "discriminating", passed: exampleKinds.size >= 2, reason: "Includes examples that produce different handling." },
    { id: "reusable", passed: candidate.tags.length >= 2 && candidate.principle.length >= 40, reason: "Carries enough stable language for use beyond one anecdote." },
    { id: "challengeable", passed: candidate.exceptions.length > 0 && (exampleKinds.has("counterexample") || exampleKinds.has("negative")), reason: "Can be tested against an exception or counterexample." },
    { id: "retrievable", passed: candidate.title.length >= 8 && candidate.tags.length >= 2 && candidate.triggers.length > 0, reason: "Has a descriptive title, tags, and trigger language." },
    { id: "decision_useful", passed: candidate.decisionImplications.length > 0 || candidate.escalationConditions.length > 0, reason: "Changes a question, decision, or escalation." },
    { id: "distinct_from_domain_fact", passed: conditional && candidate.noviceMistake !== undefined, reason: "Expresses a contextual distinction and names a novice trap." }
  ];
  const possibleDuplicates = existing
    .filter((heuristic) => heuristic.id !== candidate.id)
    .map((heuristic) => ({ id: heuristic.id, similarity: Number(similarity(candidate, heuristic).toFixed(3)) }))
    .filter((match) => match.similarity >= 0.4)
    .sort((a, b) => b.similarity - a.similarity);
  return {
    heuristicId: candidate.id,
    score: criteria.filter((criterion) => criterion.passed).length,
    possible: criteria.length,
    criteria,
    possibleDuplicates
  };
}
