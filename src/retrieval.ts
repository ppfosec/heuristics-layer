import type { Heuristic, RetrievalHit } from "./schema.js";

const stopWords = new Set(["a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "in", "is", "it", "of", "on", "or", "that", "the", "to", "with"]);

function tokens(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(/\s+/).filter((token) => token.length > 1 && !stopWords.has(token));
}

function fieldTokens(heuristic: Heuristic): Array<[string, number]> {
  return [
    ...tokens(heuristic.title).map((token) => [token, 4] as [string, number]),
    ...heuristic.tags.flatMap((tag) => tokens(tag).map((token) => [token, 4] as [string, number])),
    ...heuristic.domains.flatMap((domain) => tokens(domain).map((token) => [token, 3] as [string, number])),
    ...tokens(heuristic.category).map((token) => [token, 3] as [string, number]),
    ...tokens(heuristic.principle).map((token) => [token, 3] as [string, number]),
    ...heuristic.triggers.flatMap((trigger) => tokens(trigger).map((token) => [token, 2] as [string, number])),
    ...heuristic.signals.flatMap((signal) => tokens(signal).map((token) => [token, 2] as [string, number])),
    ...heuristic.examples.flatMap((example) => tokens(example.scenario).map((token) => [token, 1] as [string, number]))
  ];
}

export function retrieve(
  heuristics: Heuristic[],
  query: string,
  options: { domain?: string; limit?: number; minScore?: number } = {}
): RetrievalHit[] {
  const queryTerms = [...new Set(tokens(query))];
  if (queryTerms.length === 0) return [];
  return heuristics
    .filter((heuristic) => heuristic.status === "approved")
    .filter((heuristic) => !options.domain || heuristic.domains.includes(options.domain))
    .map((heuristic) => {
      const weighted = fieldTokens(heuristic);
      const weights = new Map<string, number>();
      for (const [term, weight] of weighted) weights.set(term, Math.max(weights.get(term) ?? 0, weight));
      const matchedTerms = queryTerms.filter((term) => weights.has(term));
      const raw = matchedTerms.reduce((sum, term) => sum + (weights.get(term) ?? 0), 0);
      const maximum = queryTerms.length * 4;
      const domainBoost = options.domain && heuristic.domains.includes(options.domain) ? 0.1 : 0;
      const score = Math.min(1, raw / maximum + domainBoost);
      return {
        id: heuristic.id,
        version: heuristic.version,
        score: Number(score.toFixed(4)),
        matchedTerms,
        reason: matchedTerms.length ? `Matched: ${matchedTerms.join(", ")}` : "No lexical match",
        heuristic
      };
    })
    .filter((hit) => hit.score >= (options.minScore ?? 0.05))
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, options.limit ?? 5);
}
