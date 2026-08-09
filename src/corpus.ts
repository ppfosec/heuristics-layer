import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { compiledCorpusSchema, type CompiledCorpus, type Heuristic } from "./schema.js";
import { parseHeuristicMarkdown } from "./markdown.js";

export function validateCorpusObjects(heuristics: Heuristic[]): void {
  const ids = new Set<string>();
  for (const heuristic of heuristics) {
    if (ids.has(heuristic.id)) throw new Error(`Duplicate heuristic ID: ${heuristic.id}`);
    ids.add(heuristic.id);
  }
  for (const heuristic of heuristics) {
    for (const related of heuristic.related) {
      if (!ids.has(related)) throw new Error(`${heuristic.id} relates to missing heuristic ${related}`);
    }
  }
}

export async function compileCorpus(sourceDirectory: string, outputPath?: string): Promise<CompiledCorpus> {
  const files = (await readdir(sourceDirectory, { recursive: true }))
    .filter((file) => file.endsWith(".md"))
    .sort();
  const sources = await Promise.all(files.map(async (file) => ({ file, source: await readFile(join(sourceDirectory, file), "utf8") })));
  const all = sources.map(({ source }) => parseHeuristicMarkdown(source));
  const heuristics = all.filter((heuristic) => heuristic.status === "approved").sort((a, b) => a.id.localeCompare(b.id));
  validateCorpusObjects(heuristics);
  const sourceHash = createHash("sha256")
    .update(sources.map(({ file, source }) => `${file}\0${source}`).join("\0"))
    .digest("hex");
  const corpus = compiledCorpusSchema.parse({ formatVersion: "0.1.0", generatedAt: new Date().toISOString(), sourceHash, heuristics });
  if (outputPath) await writeFile(outputPath, `${JSON.stringify(corpus, null, 2)}\n`, "utf8");
  return corpus;
}
