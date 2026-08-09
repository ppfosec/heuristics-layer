import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { validateCorpusObjects } from "../src/corpus.js";
import { parseHeuristicMarkdown } from "../src/markdown.js";

describe("public heuristic examples", () => {
  it("contains four approved, related, schema-valid synthetic examples", async () => {
    const directory = resolve("examples/heuristics");
    const files = (await readdir(directory)).filter((file) => file.endsWith(".md"));
    const heuristics = await Promise.all(files.map(async (file) => parseHeuristicMarkdown(await readFile(resolve(directory, file), "utf8"))));
    validateCorpusObjects(heuristics);
    expect(heuristics).toHaveLength(4);
    expect(heuristics.every((item) => item.status === "approved")).toBe(true);
    expect(heuristics.every((item) => item.provenance.approvedBy?.includes("not expert approval"))).toBe(true);
  });
});
