import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { z } from "zod";
import {
  challengeSchema,
  blindEvaluationSchema,
  compiledCorpusSchema,
  evaluationCaseSchema,
  evaluationRunSchema,
  expertGradeSchema,
  heuristicSchema,
  interviewNotesSchema,
  reasoningArtifactSchema,
  transcriptSchema
} from "../src/schema.js";

const schemas = {
  heuristic: heuristicSchema,
  transcript: transcriptSchema,
  "interview-notes": interviewNotesSchema,
  challenge: challengeSchema,
  corpus: compiledCorpusSchema,
  "evaluation-case": evaluationCaseSchema,
  "evaluation-run": evaluationRunSchema,
  "blind-evaluation": blindEvaluationSchema,
  "expert-grade": expertGradeSchema,
  "reasoning-artifact": reasoningArtifactSchema
};

const output = resolve("schemas");
await mkdir(output, { recursive: true });
for (const [name, schema] of Object.entries(schemas)) {
  const jsonSchema = z.toJSONSchema(schema, { target: "draft-2020-12" });
  await writeFile(resolve(output, `${name}.schema.json`), `${JSON.stringify({ $id: `https://heuristics-layer.dev/schemas/${name}.schema.json`, ...jsonSchema }, null, 2)}\n`, "utf8");
}
