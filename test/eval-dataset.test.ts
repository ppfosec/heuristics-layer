import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { evaluationCaseSchema } from "../src/schema.js";

describe("public evaluation dataset", () => {
  it("contains seven schema-valid, distinct cases", async () => {
    const directory = resolve("evals/cases");
    const files = (await readdir(directory)).filter((file) => file.endsWith(".json"));
    const cases = await Promise.all(files.map(async (file) => evaluationCaseSchema.parse(JSON.parse(await readFile(resolve(directory, file), "utf8")))));
    expect(cases).toHaveLength(7);
    expect(new Set(cases.map((item) => item.id)).size).toBe(7);
    expect(cases.every((item) => item.expectedExpertConsiderations.length > 0 && item.rubric.length > 0)).toBe(true);
  });
});
