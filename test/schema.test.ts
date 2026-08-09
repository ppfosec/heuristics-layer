import { describe, expect, it } from "vitest";
import { heuristicSchema, semverPattern } from "../src/schema.js";
import { SyntheticGrcProvider } from "../src/synthetic-provider.js";
import { transcript } from "./helpers.js";

describe("schemas", () => {
  it("accepts valid candidates and enforces stable IDs", async () => {
    const provider = new SyntheticGrcProvider();
    const notes = await provider.generateNotes(transcript);
    const [candidate] = await provider.extractCandidates(transcript, notes);
    expect(heuristicSchema.parse(candidate).id).toBe("privileged_access.accountability");
    expect(() => heuristicSchema.parse({ ...candidate, id: "Bad ID" })).toThrow();
  });

  it("uses semantic versions", () => {
    expect(semverPattern.test("0.1.0")).toBe(true);
    expect(semverPattern.test("v1")).toBe(false);
  });
});
