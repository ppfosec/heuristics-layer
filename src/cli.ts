#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { compileCorpus } from "./corpus.js";
import { assessCandidateQuality } from "./editorial.js";
import { scoreArtifact, type EvaluationCase } from "./evaluation.js";
import { createBlindEvaluation, createExpertGrade } from "./grading.js";
import { createInterviewBriefing } from "./interview.js";
import { retrieve } from "./retrieval.js";
import { assembleReasoningContext } from "./runtime.js";
import { blindEvaluationSchema, evaluationCaseSchema, evaluationRunSchema, heuristicSchema, interviewNotesSchema, transcriptSchema, type Heuristic, type InterviewNotes } from "./schema.js";
import { SyntheticGrcProvider } from "./synthetic-provider.js";
import { Workflow } from "./workflow.js";

function option(args: string[], name: string, fallback?: string): string | undefined {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
}

function positional(args: string[]): string[] {
  const result: string[] = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index]?.startsWith("--")) index += 1;
    else if (args[index]) result.push(args[index]!);
  }
  return result;
}

async function json<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, "utf8")) as T;
}

function usage(): never {
  console.error(`The Heuristics Layer CLI

heuristics import <transcript.md> [--workspace .heuristics]
heuristics notes <interview-id> [--workspace .heuristics]
heuristics extract <interview-id> [--workspace .heuristics]
heuristics challenge <interview-id> [--workspace .heuristics]
heuristics review <heuristic-id> --action approve|reject|request_clarification --reviewer <name> --reason <text> [--confidence low|medium|high]
heuristics compile [--source <heuristics-dir>] [--output <corpus.json>]
heuristics search <query> [--corpus <corpus.json>] [--domain <domain>] [--limit 5]
heuristics brief <topic> --mode deep_dive|case_review|contrast|failure_analysis|novice_comparison [--notes id,id]
heuristics quality <heuristic-id> [--corpus <corpus.json>]
heuristics demo [--workspace .heuristics-demo]
heuristics eval [--workspace .heuristics-demo]
heuristics eval-blind [--evaluation <run.json>] [--seed <text>]
heuristics eval-grade <blind-review.json> --label A|B|C --grader <name> --scores 1,5,3 --overall 4 [--notes <text>]`);
  process.exit(1);
}

async function runDemo(workspaceRoot: string): Promise<void> {
  const provider = new SyntheticGrcProvider();
  const workflow = new Workflow(workspaceRoot, provider);
  const source = fileURLToPath(new URL("../examples/interviews/B-shared-privileged-access.md", import.meta.url));
  const transcript = await workflow.importTranscript(source);
  const notes = await workflow.generateNotes(transcript);
  const candidates = await workflow.extractCandidates(transcript, notes);
  const approved: Heuristic[] = [];
  for (const candidate of candidates) {
    const challenged = await workflow.challenge(candidate, transcript, notes);
    approved.push(await workflow.review(challenged.candidate, {
      heuristicId: candidate.id,
      action: "approve",
      reviewer: "Synthetic fixture reviewer (not expert approval)",
      reason: "Approved only for the deterministic public demonstration.",
      decidedAt: new Date().toISOString(),
      expertConfidence: { level: "high", rationale: "The synthetic fixture explicitly supports this example heuristic." }
    }));
  }
  const corpusPath = join(workflow.paths.compiled, "corpus.json");
  const corpus = await compileCorpus(workflow.paths.heuristics, corpusPath);
  const query = "Vendor uses a shared privileged administrator account protected by a CyberArk password vault.";
  const hits = retrieve(corpus.heuristics, query, { domain: "tprm", limit: 5 });
  const assembled = assembleReasoningContext({ task: "Assess the vendor response", context: query, hits });
  await writeFile(join(workflow.paths.compiled, "assembled-context.txt"), assembled, "utf8");
  console.log(JSON.stringify({ interviewId: transcript.id, observations: notes.observations.length, candidates: candidates.length, approved: approved.map((item) => item.id), corpus: corpusPath, retrieved: hits.map(({ id, score, reason }) => ({ id, score, reason })) }, null, 2));
}

async function runEvaluation(workspaceRoot: string): Promise<void> {
  const provider = new SyntheticGrcProvider();
  const workflow = new Workflow(workspaceRoot, provider);
  const corpusPath = join(workflow.paths.compiled, "corpus.json");
  const corpus = await json<{ heuristics: Heuristic[] }>(corpusPath);
  const casePath = fileURLToPath(new URL("../evals/cases/shared-access-strong-compensation.json", import.meta.url));
  const testCase: EvaluationCase = evaluationCaseSchema.parse(await json(casePath));
  const baseline = await provider.reason({ task: testCase.task, context: testCase.context, heuristics: [] });
  const generic = await provider.reason({ task: testCase.task, context: testCase.context, heuristics: [], genericGuidance: "Apply general GRC good practices. Check controls, evidence, risk, and compliance." });
  const hits = retrieve(corpus.heuristics, testCase.context, { domain: "tprm" });
  const enhanced = await provider.reason({ task: testCase.task, context: testCase.context, heuristics: hits.map((hit) => hit.heuristic) });
  const result = evaluationRunSchema.parse({
    evaluationVersion: "0.1.0",
    generatedAt: new Date().toISOString(),
    case: testCase,
    baseline: { artifact: baseline, score: scoreArtifact(testCase, baseline) },
    genericGrcPrompt: { artifact: generic, score: scoreArtifact(testCase, generic) },
    withHeuristics: { artifact: enhanced, score: scoreArtifact(testCase, enhanced) },
    delta: scoreArtifact(testCase, enhanced).score - scoreArtifact(testCase, baseline).score,
    retrieved: hits.map(({ id, score, reason }) => ({ id, score, reason })),
    limitation: "This deterministic fixture verifies evaluation mechanics, not general model improvement."
  });
  await mkdir(workflow.paths.evals, { recursive: true });
  const output = join(workflow.paths.evals, `${testCase.id}.json`);
  await writeFile(output, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ output, baseline: result.baseline.score, genericGrcPrompt: result.genericGrcPrompt.score, withHeuristics: result.withHeuristics.score, delta: result.delta, limitation: result.limitation }, null, 2));
}

async function main(): Promise<void> {
  const [command, ...args] = process.argv.slice(2);
  if (!command) usage();
  const workspaceRoot = resolve(option(args, "--workspace", ".heuristics")!);
  const provider = new SyntheticGrcProvider();
  const workflow = new Workflow(workspaceRoot, provider);
  const values = positional(args);

  if (command === "demo") return runDemo(workspaceRoot);
  if (command === "eval") return runEvaluation(workspaceRoot);
  if (command === "eval-blind") {
    const evaluationPath = resolve(option(args, "--evaluation", join(workspaceRoot, "evals", "EVAL-TPRM-002.json"))!);
    const run = evaluationRunSchema.parse(await json(evaluationPath));
    const blinded = createBlindEvaluation(run, option(args, "--seed", run.case.id));
    const reviewPath = join(dirname(evaluationPath), `${run.case.id}-blind-review.json`);
    const keyPath = join(dirname(evaluationPath), `${run.case.id}-blind-key.json`);
    await writeFile(reviewPath, `${JSON.stringify(blinded.review, null, 2)}\n`, "utf8");
    await writeFile(keyPath, `${JSON.stringify(blinded.key, null, 2)}\n`, "utf8");
    console.log(JSON.stringify({ reviewPath, keyPath, instruction: "Give the review file to the grader. Keep the key separate until grading is complete." }, null, 2));
    return;
  }
  if (command === "eval-grade") {
    const reviewPath = values[0] ? resolve(values[0]) : undefined;
    const label = option(args, "--label") as "A" | "B" | "C" | undefined;
    const grader = option(args, "--grader");
    const scores = (option(args, "--scores", "") ?? "").split(",").filter(Boolean).map(Number);
    const overallScore = Number(option(args, "--overall"));
    if (!reviewPath || !label || !grader || scores.some(Number.isNaN) || Number.isNaN(overallScore)) usage();
    const review = blindEvaluationSchema.parse(await json(reviewPath));
    const grade = createExpertGrade({ review, label, grader, scores, overallScore, notes: option(args, "--notes") });
    const safeGrader = grader.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const outputPath = join(dirname(reviewPath), `${review.caseId}-${label}-${safeGrader}.grade.json`);
    await writeFile(outputPath, `${JSON.stringify(grade, null, 2)}\n`, "utf8");
    console.log(JSON.stringify({ outputPath, grade }, null, 2));
    return;
  }
  if (command === "import") {
    if (!values[0]) usage();
    console.log(JSON.stringify(await workflow.importTranscript(resolve(values[0])), null, 2));
    return;
  }
  if (["notes", "extract", "challenge"].includes(command)) {
    const id = values[0];
    if (!id) usage();
    await workflow.initialize();
    const transcript = transcriptSchema.parse(await json(join(workflow.paths.interviews, `${id}.json`)));
    if (command === "notes") {
      console.log(JSON.stringify(await workflow.generateNotes(transcript), null, 2));
      return;
    }
    const notes = interviewNotesSchema.parse(await json(join(workflow.paths.notes, `${id}.json`)));
    if (command === "extract") {
      console.log(JSON.stringify(await workflow.extractCandidates(transcript, notes), null, 2));
      return;
    }
    const candidateFiles = values.slice(1);
    if (!candidateFiles.length) throw new Error("challenge requires one or more heuristic IDs after the interview ID");
    const results = [];
    for (const heuristicId of candidateFiles) {
      const candidate = heuristicSchema.parse(await json(join(workflow.paths.candidates, `${heuristicId}.json`)));
      results.push(await workflow.challenge(candidate, transcript, notes));
    }
    console.log(JSON.stringify(results, null, 2));
    return;
  }
  if (command === "review") {
    const id = values[0];
    const action = option(args, "--action") as "approve" | "reject" | "request_clarification" | undefined;
    const reviewer = option(args, "--reviewer");
    const reason = option(args, "--reason");
    const confidence = option(args, "--confidence") as "low" | "medium" | "high" | undefined;
    if (!id || !action || !reviewer || !reason || (action === "approve" && !confidence)) usage();
    const candidate = heuristicSchema.parse(await json(join(workflow.paths.candidates, `${id}.json`)));
    console.log(JSON.stringify(await workflow.review(candidate, { heuristicId: id, action, reviewer, reason, decidedAt: new Date().toISOString(), expertConfidence: confidence ? { level: confidence, rationale: reason } : undefined }), null, 2));
    return;
  }
  if (command === "compile") {
    const source = resolve(option(args, "--source", join(workspaceRoot, "heuristics"))!);
    const output = resolve(option(args, "--output", join(workspaceRoot, "compiled", "corpus.json"))!);
    await mkdir(dirname(output), { recursive: true });
    console.log(JSON.stringify(await compileCorpus(source, output), null, 2));
    return;
  }
  if (command === "search") {
    const query = values.join(" ");
    if (!query) usage();
    const corpusPath = resolve(option(args, "--corpus", join(workspaceRoot, "compiled", "corpus.json"))!);
    const corpus = await json<{ heuristics: Heuristic[] }>(corpusPath);
    console.log(JSON.stringify(retrieve(corpus.heuristics, query, { domain: option(args, "--domain"), limit: Number(option(args, "--limit", "5")) }), null, 2));
    return;
  }
  if (command === "brief") {
    const topic = values.join(" ");
    const mode = option(args, "--mode") as "deep_dive" | "case_review" | "contrast" | "failure_analysis" | "novice_comparison" | undefined;
    if (!topic || !mode) usage();
    const corpusPath = resolve(option(args, "--corpus", join(workspaceRoot, "compiled", "corpus.json"))!);
    const corpus = await json<{ heuristics: Heuristic[] }>(corpusPath);
    const noteIds = (option(args, "--notes", "") ?? "").split(",").filter(Boolean);
    const priorNotes: InterviewNotes[] = [];
    for (const id of noteIds) priorNotes.push(interviewNotesSchema.parse(await json(join(workspaceRoot, "notes", `${id}.json`))));
    console.log(JSON.stringify(createInterviewBriefing({ topic, mode, heuristics: corpus.heuristics, priorNotes }), null, 2));
    return;
  }
  if (command === "quality") {
    const id = values[0];
    if (!id) usage();
    const candidate = heuristicSchema.parse(await json(join(workspaceRoot, "candidates", `${id}.json`)));
    const corpusPath = resolve(option(args, "--corpus", join(workspaceRoot, "compiled", "corpus.json"))!);
    let existing: Heuristic[] = [];
    try { existing = (await json<{ heuristics: Heuristic[] }>(corpusPath)).heuristics; } catch { /* A new workspace may not have a corpus yet. */ }
    console.log(JSON.stringify(assessCandidateQuality(candidate, existing), null, 2));
    return;
  }
  usage();
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
