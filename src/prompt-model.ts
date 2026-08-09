import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { z, type ZodType } from "zod";
import {
  challengeSchema,
  heuristicSchema,
  interviewNotesSchema,
  reasoningArtifactSchema,
  type Challenge,
  type Heuristic,
  type InterviewNotes,
  type ReasoningArtifact,
  type Transcript
} from "./schema.js";
import type { ReasoningModel } from "./runtime.js";
import type { ElicitationModel } from "./workflow.js";

export interface StructuredGenerationRequest {
  purpose: "notes" | "extract" | "challenge" | "reason";
  system: string;
  input: string;
  jsonSchema: Record<string, unknown>;
}

export interface StructuredGenerator {
  generate(request: StructuredGenerationRequest): Promise<unknown>;
}

async function prompt(name: string): Promise<string> {
  const url = new URL(`../prompts/${name}.md`, import.meta.url);
  return readFile(fileURLToPath(url), "utf8");
}

async function generate<T>(generator: StructuredGenerator, purpose: StructuredGenerationRequest["purpose"], system: string, input: unknown, schema: ZodType<T>): Promise<T> {
  const result = await generator.generate({
    purpose,
    system,
    input: JSON.stringify(input, null, 2),
    jsonSchema: z.toJSONSchema(schema, { target: "draft-2020-12" }) as Record<string, unknown>
  });
  return schema.parse(result);
}

export class PromptModel implements ElicitationModel, ReasoningModel {
  constructor(private readonly generator: StructuredGenerator) {}

  async generateNotes(transcript: Transcript): Promise<InterviewNotes> {
    return generate(this.generator, "notes", `${await prompt("interviewer")}\n\n${await prompt("notes")}`, { transcript }, interviewNotesSchema);
  }

  async extractCandidates(transcript: Transcript, notes: InterviewNotes): Promise<Heuristic[]> {
    return generate(this.generator, "extract", await prompt("extractor"), { transcript, notes, constraints: { status: "candidate", version: "0.1.0", preserveSourceQuotes: true } }, z.array(heuristicSchema));
  }

  async challengeCandidate(candidate: Heuristic, transcript: Transcript, notes: InterviewNotes): Promise<Challenge> {
    return generate(this.generator, "challenge", await prompt("challenger"), { candidate, transcript, notes }, challengeSchema);
  }

  async reason(input: { task: string; context: string; heuristics: Heuristic[]; genericGuidance?: string }): Promise<ReasoningArtifact> {
    const system = [
      "Use approved heuristics as expert guidance, not as facts.",
      "Distinguish supplied facts, evidence, inference, uncertainty, and missing information.",
      "Return the observable decision artifact only. Never return hidden chain-of-thought."
    ].join("\n");
    return generate(this.generator, "reason", system, input, reasoningArtifactSchema);
  }
}
