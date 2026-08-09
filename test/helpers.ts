import type { Heuristic, Transcript } from "../src/schema.js";

export const transcript: Transcript = {
  id: "interview-test-B",
  title: "Shared privileged access",
  domain: "tprm",
  synthetic: true,
  recordedAt: "2026-08-09T15:00:00.000Z",
  sourcePath: "fixtures/B.md",
  text: "The vendor uses a shared privileged administrator account. The shared name is not the whole problem. Saying CyberArk does not finish the assessment. Show me checkout and session attribution."
};

export function approved(heuristic: Heuristic): Heuristic {
  return {
    ...heuristic,
    status: "approved",
    expertConfidence: { level: "high", rationale: "Synthetic fixture is internally consistent." },
    provenance: {
      ...heuristic.provenance,
      approvedAt: "2026-08-09T17:00:00.000Z",
      approvedBy: "Fixture reviewer"
    }
  };
}
