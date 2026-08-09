# Evaluation guide

An evaluation case declares a task, context, evidence, expected considerations, a likely novice mistake, relevant heuristic IDs, required concepts, forbidden claims, and a rubric. The harness compares three conditions: the base model, the same model with a generic GRC prompt, and the same model with retrieved approved heuristics. All three return the same observable artifact contract.

The v0.1 scorer is deterministic lexical rubric matching. It is useful for regression tests because the result is reproducible and inspectable. It is not a substitute for expert judgment or model-quality research.

A credible domain evaluation should add:

1. Representative cases held out from the source interviews.
2. Blind expert scoring of baseline and treatment outputs.
3. Rubrics that separate factuality, evidence handling, uncertainty calibration, materiality, and decision usefulness.
4. Retrieval ablations to distinguish corpus quality from retrieval quality.
5. Failure review for cases where retrieved heuristics reduce performance or overgeneralize.
6. Versioned model, prompt, corpus, and case identifiers.

Store observable outputs and scores. Do not request or persist hidden chain-of-thought.

## Blind expert review

After `npm run eval`, prepare an anonymous review set:

```bash
heuristics eval-blind --evaluation .heuristics-demo/evals/EVAL-TPRM-002.json
```

The command writes a review file containing outputs A, B, and C, plus a separate key mapping labels to conditions. Keep the key away from the grader until scoring is complete.

```bash
heuristics eval-grade .heuristics-demo/evals/EVAL-TPRM-002-blind-review.json \
  --label A \
  --grader "Expert name" \
  --scores 4,3,5 \
  --overall 4 \
  --notes "Strong evidence handling; escalation needs work."
```

Supply one 1-to-5 score for each criterion in the case rubric. The grade records the criterion text, grader, time, overall score, and notes. This supports expert judgment without revealing which condition produced the output.
