import matter from "gray-matter";
import { heuristicSchema, type Heuristic } from "./schema.js";

const sectionOrder = [
  "Principle",
  "Rationale",
  "Triggers",
  "Signals",
  "Probes",
  "Confidence effect",
  "Risk effect",
  "Decision implications",
  "Escalation conditions",
  "Exceptions",
  "Compensating factors",
  "Common novice mistake",
  "Examples"
] as const;

function bullets(values: string[]): string {
  return values.length ? values.map((value) => `- ${value}`).join("\n") : "- None recorded";
}

export function renderHeuristicMarkdown(heuristic: Heuristic): string {
  const frontmatter = {
    id: heuristic.id,
    title: heuristic.title,
    version: heuristic.version,
    status: heuristic.status,
    kind: heuristic.kind,
    domains: heuristic.domains,
    category: heuristic.category,
    tags: heuristic.tags,
    related: heuristic.related,
    expertConfidence: heuristic.expertConfidence,
    provenance: heuristic.provenance
  };
  const examples = heuristic.examples
    .map((example) => `- **${example.kind}:** ${example.scenario} => ${example.expected}`)
    .join("\n");
  const body = [
    `# ${heuristic.title}`,
    "",
    "## Principle", heuristic.principle,
    "", "## Rationale", heuristic.rationale,
    "", "## Triggers", bullets(heuristic.triggers),
    "", "## Signals", bullets(heuristic.signals),
    "", "## Probes", bullets(heuristic.probes),
    "", "## Confidence effect", heuristic.confidenceEffect ?? "None recorded",
    "", "## Risk effect", heuristic.riskEffect ?? "None recorded",
    "", "## Decision implications", bullets(heuristic.decisionImplications),
    "", "## Escalation conditions", bullets(heuristic.escalationConditions),
    "", "## Exceptions", bullets(heuristic.exceptions),
    "", "## Compensating factors", bullets(heuristic.compensatingFactors),
    "", "## Common novice mistake", heuristic.noviceMistake ?? "None recorded",
    "", "## Examples", examples,
    ""
  ].join("\n");
  return matter.stringify(body, frontmatter);
}

function sections(content: string): Map<string, string> {
  const result = new Map<string, string>();
  const pattern = /^## (.+)$/gm;
  const matches = [...content.matchAll(pattern)];
  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const next = matches[index + 1];
    if (!match || match.index === undefined) continue;
    const start = match.index + match[0].length;
    result.set(match[1]?.trim() ?? "", content.slice(start, next?.index ?? content.length).trim());
  }
  return result;
}

function list(value: string | undefined): string[] {
  if (!value || value === "- None recorded") return [];
  return value.split("\n").map((line) => line.replace(/^\s*-\s*/, "").trim()).filter(Boolean);
}

function scalar(value: string | undefined): string | undefined {
  if (!value || value === "None recorded") return undefined;
  return value.trim();
}

function parseExamples(value: string | undefined): Heuristic["examples"] {
  return list(value).map((line) => {
    const match = line.match(/^\*\*(positive|negative|edge|counterexample):\*\*\s*(.*?)\s*=>\s*(.+)$/);
    if (!match?.[1] || !match[2] || !match[3]) throw new Error(`Invalid example line: ${line}`);
    return { kind: match[1] as Heuristic["examples"][number]["kind"], scenario: match[2], expected: match[3] };
  });
}

export function parseHeuristicMarkdown(source: string): Heuristic {
  const parsed = matter(source);
  const body = sections(parsed.content);
  for (const required of sectionOrder) {
    if (!body.has(required)) throw new Error(`Missing Markdown section: ${required}`);
  }
  return heuristicSchema.parse({
    ...parsed.data,
    principle: body.get("Principle"),
    rationale: body.get("Rationale"),
    triggers: list(body.get("Triggers")),
    signals: list(body.get("Signals")),
    probes: list(body.get("Probes")),
    confidenceEffect: scalar(body.get("Confidence effect")),
    riskEffect: scalar(body.get("Risk effect")),
    decisionImplications: list(body.get("Decision implications")),
    escalationConditions: list(body.get("Escalation conditions")),
    exceptions: list(body.get("Exceptions")),
    compensatingFactors: list(body.get("Compensating factors")),
    noviceMistake: scalar(body.get("Common novice mistake")),
    examples: parseExamples(body.get("Examples"))
  });
}
