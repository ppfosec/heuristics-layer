import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import matter from "gray-matter";
import {
  challengeSchema,
  heuristicSchema,
  interviewNotesSchema,
  reviewDecisionSchema,
  transcriptSchema,
  type Challenge,
  type Heuristic,
  type InterviewNotes,
  type ReviewDecision,
  type Transcript
} from "./schema.js";
import { renderHeuristicMarkdown } from "./markdown.js";

export interface ElicitationModel {
  generateNotes(transcript: Transcript): Promise<InterviewNotes>;
  extractCandidates(transcript: Transcript, notes: InterviewNotes): Promise<Heuristic[]>;
  challengeCandidate(candidate: Heuristic, transcript: Transcript, notes: InterviewNotes): Promise<Challenge>;
}

const allowedTransitions: Record<Heuristic["status"], Heuristic["status"][]> = {
  observed: ["candidate", "rejected"],
  candidate: ["needs_clarification", "challenged", "rejected"],
  needs_clarification: ["candidate", "challenged", "rejected"],
  challenged: ["approved", "needs_clarification", "rejected"],
  approved: ["deprecated"],
  rejected: [],
  deprecated: []
};

export function transitionStatus(heuristic: Heuristic, next: Heuristic["status"]): Heuristic {
  if (!allowedTransitions[heuristic.status].includes(next)) {
    throw new Error(`Invalid status transition: ${heuristic.status} -> ${next}`);
  }
  return heuristicSchema.parse({ ...heuristic, status: next });
}

export interface WorkspacePaths {
  root: string;
  interviews: string;
  notes: string;
  candidates: string;
  challenges: string;
  reviews: string;
  heuristics: string;
  compiled: string;
  evals: string;
}

export function workspacePaths(root: string): WorkspacePaths {
  const absolute = resolve(root);
  return {
    root: absolute,
    interviews: join(absolute, "interviews"),
    notes: join(absolute, "notes"),
    candidates: join(absolute, "candidates"),
    challenges: join(absolute, "challenges"),
    reviews: join(absolute, "reviews"),
    heuristics: join(absolute, "heuristics"),
    compiled: join(absolute, "compiled"),
    evals: join(absolute, "evals")
  };
}

async function writeJson(path: string, value: unknown): Promise<void> {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export class Workflow {
  readonly paths: WorkspacePaths;

  constructor(readonly root: string, readonly model: ElicitationModel) {
    this.paths = workspacePaths(root);
  }

  async initialize(): Promise<void> {
    await Promise.all(Object.entries(this.paths).filter(([key]) => key !== "root").map(([, path]) => mkdir(path, { recursive: true })));
  }

  async importTranscript(sourcePath: string): Promise<Transcript> {
    await this.initialize();
    const raw = await readFile(sourcePath, "utf8");
    const parsed = matter(raw);
    const recordedAt = parsed.data.recordedAt instanceof Date
      ? parsed.data.recordedAt.toISOString()
      : parsed.data.recordedAt;
    const transcript = transcriptSchema.parse({
      ...parsed.data,
      recordedAt,
      sourcePath: resolve(sourcePath),
      text: parsed.content.trim()
    });
    await writeJson(join(this.paths.interviews, `${transcript.id}.json`), transcript);
    return transcript;
  }

  async generateNotes(transcript: Transcript): Promise<InterviewNotes> {
    const notes = interviewNotesSchema.parse(await this.model.generateNotes(transcript));
    if (notes.interviewId !== transcript.id) throw new Error("Notes reference a different interview");
    await writeJson(join(this.paths.notes, `${transcript.id}.json`), notes);
    return notes;
  }

  async extractCandidates(transcript: Transcript, notes: InterviewNotes): Promise<Heuristic[]> {
    const candidates = (await this.model.extractCandidates(transcript, notes)).map((candidate) => heuristicSchema.parse(candidate));
    if (new Set(candidates.map((candidate) => candidate.id)).size !== candidates.length) throw new Error("Extractor returned duplicate heuristic IDs");
    for (const candidate of candidates) {
      if (candidate.status !== "candidate") throw new Error(`Extracted ${candidate.id} is not in candidate state`);
      if (candidate.provenance.interviewId !== transcript.id) throw new Error(`${candidate.id} has invalid interview provenance`);
      await writeJson(join(this.paths.candidates, `${candidate.id}.json`), candidate);
    }
    return candidates;
  }

  async challenge(candidate: Heuristic, transcript: Transcript, notes: InterviewNotes): Promise<{ candidate: Heuristic; challenge: Challenge }> {
    const challenge = challengeSchema.parse(await this.model.challengeCandidate(candidate, transcript, notes));
    if (challenge.heuristicId !== candidate.id) throw new Error("Challenge references a different heuristic");
    const challenged = transitionStatus(candidate, "challenged");
    await writeJson(join(this.paths.candidates, `${candidate.id}.json`), challenged);
    await writeJson(join(this.paths.challenges, `${candidate.id}.json`), challenge);
    return { candidate: challenged, challenge };
  }

  async review(candidate: Heuristic, decisionInput: ReviewDecision): Promise<Heuristic> {
    const decision = reviewDecisionSchema.parse(decisionInput);
    if (decision.heuristicId !== candidate.id) throw new Error("Review references a different heuristic");
    const next = decision.action === "approve" ? "approved" : decision.action === "reject" ? "rejected" : "needs_clarification";
    let reviewed = transitionStatus(candidate, next);
    if (next === "approved") {
      reviewed = heuristicSchema.parse({
        ...reviewed,
        provenance: {
          ...reviewed.provenance,
          approvedAt: decision.decidedAt,
          approvedBy: decision.reviewer
        },
        expertConfidence: decision.expertConfidence
      });
      await writeFile(join(this.paths.heuristics, `${reviewed.id}.md`), renderHeuristicMarkdown(reviewed), "utf8");
    }
    await writeJson(join(this.paths.reviews, `${candidate.id}-${basename(decision.decidedAt).replace(/[:.]/g, "-")}.json`), decision);
    await writeJson(join(this.paths.candidates, `${candidate.id}.json`), reviewed);
    return reviewed;
  }
}
