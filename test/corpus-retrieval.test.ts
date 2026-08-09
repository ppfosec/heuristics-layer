import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { compileCorpus, validateCorpusObjects } from "../src/corpus.js";
import { renderHeuristicMarkdown } from "../src/markdown.js";
import { retrieve } from "../src/retrieval.js";
import { SyntheticGrcProvider } from "../src/synthetic-provider.js";
import { approved, transcript } from "./helpers.js";

const temporary: string[] = [];
afterEach(async () => Promise.all(temporary.splice(0).map((path) => rm(path, { recursive: true, force: true }))));

describe("corpus compilation and retrieval", () => {
  it("compiles only approved sources with a reproducible source hash", async () => {
    const root = await mkdtemp(join(tmpdir(), "heuristics-corpus-"));
    temporary.push(root);
    const source = join(root, "source");
    await mkdir(source);
    const provider = new SyntheticGrcProvider();
    const notes = await provider.generateNotes(transcript);
    const candidates = await provider.extractCandidates(transcript, notes);
    for (const candidate of candidates) await writeFile(join(source, `${candidate.id}.md`), renderHeuristicMarkdown(approved(candidate)), "utf8");
    const first = await compileCorpus(source);
    const second = await compileCorpus(source);
    expect(first.formatVersion).toBe("0.1.0");
    expect(first.heuristics).toHaveLength(2);
    expect(first.sourceHash).toBe(second.sourceHash);
    expect(first.heuristics[0]?.provenance.approvedBy).toBe("Fixture reviewer");
  });

  it("detects duplicate IDs and missing relationships", async () => {
    const provider = new SyntheticGrcProvider();
    const notes = await provider.generateNotes(transcript);
    const candidates = await provider.extractCandidates(transcript, notes);
    expect(() => validateCorpusObjects([approved(candidates[0]!), approved(candidates[0]!)] )).toThrow(/Duplicate/);
    expect(() => validateCorpusObjects([approved(candidates[0]!)])).toThrow(/missing heuristic/);
  });

  it("returns structured, explainable retrieval hits", async () => {
    const provider = new SyntheticGrcProvider();
    const notes = await provider.generateNotes(transcript);
    const candidates = (await provider.extractCandidates(transcript, notes)).map(approved);
    const hits = retrieve(candidates, "shared privileged admin account using a password vault", { domain: "tprm" });
    expect(hits.map((hit) => hit.id)).toContain("privileged_access.accountability");
    expect(hits.map((hit) => hit.id)).toContain("compensating_controls.demonstrated_bundle");
    expect(hits[0]?.matchedTerms.length).toBeGreaterThan(0);
    expect(hits[0]?.reason).toMatch(/^Matched:/);
  });
});
