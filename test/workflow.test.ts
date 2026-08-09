import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { SyntheticGrcProvider } from "../src/synthetic-provider.js";
import { transitionStatus, Workflow } from "../src/workflow.js";
import { transcript } from "./helpers.js";

const temporary: string[] = [];
afterEach(async () => Promise.all(temporary.splice(0).map((path) => rm(path, { recursive: true, force: true }))));

describe("editorial workflow", () => {
  it("normalizes YAML timestamps into portable ISO strings", async () => {
    const root = await mkdtemp(join(tmpdir(), "heuristics-import-"));
    temporary.push(root);
    const source = join(root, "interview.md");
    await writeFile(source, "---\nid: interview-import\ntitle: Import test\ndomain: test\nsynthetic: true\nrecordedAt: 2026-08-09T15:00:00.000Z\n---\n\nThis is a sufficiently long synthetic interview transcript.", "utf8");
    const workflow = new Workflow(join(root, "workspace"), new SyntheticGrcProvider());
    const imported = await workflow.importTranscript(source);
    expect(imported.recordedAt).toBe("2026-08-09T15:00:00.000Z");
  });

  it("requires challenge before approval and preserves provenance", async () => {
    const root = await mkdtemp(join(tmpdir(), "heuristics-workflow-"));
    temporary.push(root);
    const provider = new SyntheticGrcProvider();
    const workflow = new Workflow(root, provider);
    await workflow.initialize();
    const notes = await workflow.generateNotes(transcript);
    const [candidate] = await workflow.extractCandidates(transcript, notes);
    await expect(workflow.review(candidate!, { heuristicId: candidate!.id, action: "approve", reviewer: "Expert", reason: "Looks right", decidedAt: "2026-08-09T17:00:00.000Z", expertConfidence: { level: "high", rationale: "Supported by the interview." } })).rejects.toThrow(/Invalid status transition/);
    const challenged = await workflow.challenge(candidate!, transcript, notes);
    const reviewed = await workflow.review(challenged.candidate, { heuristicId: candidate!.id, action: "approve", reviewer: "Expert", reason: "Challenge resolved", decidedAt: "2026-08-09T17:00:00.000Z", expertConfidence: { level: "high", rationale: "Challenge resolved with a supported exception." } });
    expect(reviewed.status).toBe("approved");
    expect(reviewed.provenance.approvedBy).toBe("Expert");
    expect(reviewed.expertConfidence?.level).toBe("high");
    expect(reviewed.provenance.excerpts[0]?.observationId).toBe("O-001");
    expect(await readFile(join(workflow.paths.heuristics, `${reviewed.id}.md`), "utf8")).toContain("## Exceptions");
  });

  it("rejects impossible lifecycle transitions", async () => {
    const provider = new SyntheticGrcProvider();
    const notes = await provider.generateNotes(transcript);
    const [candidate] = await provider.extractCandidates(transcript, notes);
    expect(() => transitionStatus(candidate!, "approved")).toThrow(/Invalid status transition/);
  });
});
