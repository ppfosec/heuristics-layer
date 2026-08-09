import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import matter from "gray-matter";
import { renderHeuristicMarkdown } from "../src/markdown.js";
import { transcriptSchema } from "../src/schema.js";
import { SyntheticGrcProvider } from "../src/synthetic-provider.js";

const sources = [
  "examples/interviews/A-certification-evidence.md",
  "examples/interviews/B-shared-privileged-access.md",
  "examples/interviews/C-materiality-escalation.md"
];
const output = resolve("examples/heuristics");
await mkdir(output, { recursive: true });
const provider = new SyntheticGrcProvider();

for (const sourcePath of sources) {
  const raw = await readFile(resolve(sourcePath), "utf8");
  const parsed = matter(raw);
  const transcript = transcriptSchema.parse({
    ...parsed.data,
    recordedAt: parsed.data.recordedAt instanceof Date ? parsed.data.recordedAt.toISOString() : parsed.data.recordedAt,
    sourcePath: `synthetic://${basename(sourcePath)}`,
    text: parsed.content.trim()
  });
  const notes = await provider.generateNotes(transcript);
  const candidates = await provider.extractCandidates(transcript, notes);
  for (const candidate of candidates) {
    const approved = {
      ...candidate,
      status: "approved" as const,
      expertConfidence: { level: "high" as const, rationale: "The synthetic fixture explicitly supports this public example." },
      provenance: {
        ...candidate.provenance,
        approvedAt: "2026-08-09T17:00:00.000Z",
        approvedBy: "Synthetic fixture reviewer (not expert approval)"
      }
    };
    await writeFile(resolve(output, `${approved.id}.md`), renderHeuristicMarkdown(approved), "utf8");
  }
}
