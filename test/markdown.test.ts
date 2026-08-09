import { describe, expect, it } from "vitest";
import { parseHeuristicMarkdown, renderHeuristicMarkdown } from "../src/markdown.js";
import { SyntheticGrcProvider } from "../src/synthetic-provider.js";
import { approved, transcript } from "./helpers.js";

describe("heuristic Markdown", () => {
  it("round-trips the canonical human-readable source", async () => {
    const provider = new SyntheticGrcProvider();
    const notes = await provider.generateNotes(transcript);
    const [candidate] = await provider.extractCandidates(transcript, notes);
    const heuristic = approved(candidate!);
    expect(parseHeuristicMarkdown(renderHeuristicMarkdown(heuristic))).toEqual(heuristic);
  });

  it("rejects sources missing required review sections", () => {
    expect(() => parseHeuristicMarkdown("---\nid: evidence.bad\n---\n# Incomplete\n")).toThrow(/Missing Markdown section/);
  });
});
