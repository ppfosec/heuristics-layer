import { describe, expect, it } from "vitest";
import { assessCandidateQuality } from "../src/editorial.js";
import { createInterviewBriefing } from "../src/interview.js";
import { SyntheticGrcProvider } from "../src/synthetic-provider.js";
import { approved, transcript } from "./helpers.js";

describe("interview preparation and editorial quality", () => {
  it("briefs an interview from current corpus coverage and unresolved notes", async () => {
    const provider = new SyntheticGrcProvider();
    const notes = await provider.generateNotes(transcript);
    const heuristics = (await provider.extractCandidates(transcript, notes)).map(approved);
    const briefing = createInterviewBriefing({ topic: "shared privileged access through a password vault", mode: "contrast", heuristics, priorNotes: [notes] });
    expect(briefing.existingCoverage).toContain("privileged_access.accountability");
    expect(briefing.openQuestions).toContain("Are sessions individually attributable?");
    expect(briefing.promisingThreads.length).toBeGreaterThan(0);
    expect(briefing.objective).toContain("opposite outcomes");
  });

  it("scores strong candidates against an explicit eight-part rubric", async () => {
    const provider = new SyntheticGrcProvider();
    const notes = await provider.generateNotes(transcript);
    const candidates = await provider.extractCandidates(transcript, notes);
    const assessment = assessCandidateQuality(candidates[0]!, candidates);
    expect(assessment.possible).toBe(8);
    expect(assessment.score).toBeGreaterThanOrEqual(7);
    expect(assessment.criteria.map((criterion) => criterion.id)).toContain("distinct_from_domain_fact");
  });
});
