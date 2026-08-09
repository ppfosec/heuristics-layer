import type { ElicitationModel } from "./workflow.js";
import type { Challenge, Heuristic, InterviewNotes, ReasoningArtifact, Transcript } from "./schema.js";
import type { ReasoningModel } from "./runtime.js";

function provenance(transcript: Transcript, observationId: string, quote: string): Heuristic["provenance"] {
  return {
    interviewId: transcript.id,
    sourcePath: transcript.sourcePath,
    excerpts: [{ observationId, quote }],
    createdAt: transcript.recordedAt
  };
}

export class SyntheticGrcProvider implements ElicitationModel, ReasoningModel {
  async generateNotes(transcript: Transcript): Promise<InterviewNotes> {
    if (/certification|soc 2/i.test(transcript.text)) {
      return {
        interviewId: transcript.id,
        observations: [{ id: "O-001", text: "The expert treats certification as bounded evidence rather than a general security verdict.", supportingQuotes: ["A report only helps if the service and control are actually in scope."] }],
        candidatePatterns: ["Evidence reduces uncertainty only within its demonstrated scope."],
        openQuestions: ["Which report scope details are decisive?", "When can certification alone be sufficient?"],
        contradictions: [], assumptions: [], termsToClarify: ["in scope"], overlaps: []
      };
    }
    if (/shared|privileged|vault/i.test(transcript.text)) {
      return {
        interviewId: transcript.id,
        observations: [
          { id: "O-001", text: "Shared privileged identity is a warning signal because it may weaken accountability, not because sharing is categorically unacceptable.", supportingQuotes: ["The shared name is not the whole problem. I need to know whether I can attribute each session."] },
          { id: "O-002", text: "A password vault is relevant but its strength depends on individual checkout, approval, rotation, and session evidence.", supportingQuotes: ["Saying CyberArk does not finish the assessment. Show me checkout and session attribution."] }
        ],
        candidatePatterns: ["Assess the accountability outcome behind shared privileged access.", "Evaluate compensating controls as a bundle of demonstrated capabilities."],
        openQuestions: ["Is access standing or just in time?", "Are sessions individually attributable?", "Can operation be demonstrated?"],
        contradictions: ["The expert initially called shared accounts high risk, then accepted a constrained case with restored attribution."],
        assumptions: ["The scenario concerns meaningful privileged access."], termsToClarify: ["session attribution"], overlaps: ["Accountability and compensating-control strength may be related but remain distinct."]
      };
    }
    return {
      interviewId: transcript.id,
      observations: [{ id: "O-001", text: "Materiality depends on impact dimensions and reversibility rather than the mere presence of a control gap.", supportingQuotes: ["A real gap does not automatically deserve escalation."] }],
      candidatePatterns: ["Escalation should follow material consequence, not gap detection alone."],
      openQuestions: ["Which impact dimensions dominate?"], contradictions: [], assumptions: [], termsToClarify: ["material"], overlaps: []
    };
  }

  async extractCandidates(transcript: Transcript): Promise<Heuristic[]> {
    if (/certification|soc 2/i.test(transcript.text)) return [certificationHeuristic(transcript)];
    if (/shared|privileged|vault/i.test(transcript.text)) return [accountabilityHeuristic(transcript), compensatingControlHeuristic(transcript)];
    return [materialityHeuristic(transcript)];
  }

  async challengeCandidate(candidate: Heuristic): Promise<Challenge> {
    if (candidate.id === "privileged_access.accountability") {
      return {
        heuristicId: candidate.id,
        questions: ["What if a PAM broker uses one target account but binds every session to a named person?", "Does the heuristic apply to non-production systems with no sensitive data?", "Is the core failure shared naming or lost accountability?"],
        counterexamples: [{ kind: "counterexample", scenario: "A shared target identity is brokered through individually authenticated, approved, recorded sessions.", expected: "Do not rate it as high risk solely because the target identifier is shared." }],
        unresolved: ["Materiality still depends on system and data exposure."],
        proposedRevision: "Shared privileged access increases risk when individual authorization, accountability, or forensic attribution is weakened."
      };
    }
    return {
      heuristicId: candidate.id,
      questions: ["When would the apparent signal be acceptable?", "What evidence would change the conclusion?"],
      counterexamples: [{ kind: "counterexample", scenario: candidate.examples[1]?.scenario ?? "The control is fully demonstrated.", expected: candidate.examples[1]?.expected ?? "Do not fire the heuristic." }],
      unresolved: [],
      proposedRevision: candidate.principle
    };
  }

  async reason(input: { task: string; context: string; heuristics: Heuristic[]; genericGuidance?: string }): Promise<ReasoningArtifact> {
    if (input.heuristics.length === 0 && input.genericGuidance) {
      return {
        facts: ["The vendor reports a shared privileged account protected by a password vault."],
        heuristicIds: [],
        evidence: ["The evidence is limited to the vendor statement."],
        evidenceConfidence: "low",
        inferences: ["Generic GRC guidance suggests reviewing access controls, logging, and policy compliance."],
        uncertainty: ["Uncertainty remains because implementation details were not supplied."],
        openQuestions: ["Is MFA enabled?", "Are privileged actions logged?"],
        escalation: "consider",
        modelConfidence: "low",
        conclusion: "Perform additional control testing before accepting the response."
      };
    }
    if (input.heuristics.length === 0) {
      return {
        facts: ["The vendor reports a shared privileged account protected by a password vault."],
        heuristicIds: [], evidence: ["Vendor statement"], evidenceConfidence: "low",
        inferences: ["Shared administrator accounts are generally risky."] ,
        uncertainty: ["Control operation has not been verified."],
        openQuestions: ["Does the vendor have a privileged access policy?"],
        escalation: "consider", modelConfidence: "low",
        conclusion: "Treat the shared account as a high-risk gap and consider escalation."
      };
    }
    return {
      facts: ["The vendor reports a shared privileged account.", "The vendor reports use of a password vault."],
      heuristicIds: input.heuristics.map((heuristic) => heuristic.id),
      evidence: ["The only evidence supplied is the vendor assertion; no configuration or session artifact was supplied."],
      evidenceConfidence: "low",
      inferences: ["The vault may restore accountability, but its product name alone does not demonstrate that outcome.", "Risk depends on individual authentication, approval, rotation, session attribution, and the materiality of the accessed system."],
      uncertainty: ["Uncertainty remains because individual authorization and forensic attribution are unknown.", "The vault's operating effectiveness is unknown."],
      openQuestions: ["Does each person authenticate individually before checkout?", "Is access approved and time-bound?", "Are sessions recorded and attributable?", "Can the vendor provide a sample access or session record?"],
      escalation: "consider",
      modelConfidence: "medium",
      conclusion: "Do not accept or reject the design based on the shared identifier or vault label alone. Verify whether the compensating controls restore accountability, then assess residual risk against system materiality."
    };
  }
}

function base(transcript: Transcript, value: Omit<Heuristic, "status" | "version" | "provenance">, observationId: string, quote: string): Heuristic {
  return { ...value, status: "candidate", version: "0.1.0", provenance: provenance(transcript, observationId, quote) };
}

function accountabilityHeuristic(transcript: Transcript): Heuristic {
  return base(transcript, {
    id: "privileged_access.accountability", title: "Shared identity is an accountability problem", kind: "soft_heuristic", domains: ["tprm"], category: "privileged_access", tags: ["shared account", "privileged access", "accountability", "attribution"],
    principle: "Shared privileged access increases risk when individual authorization, accountability, or forensic attribution is weakened.",
    rationale: "The target account name is less important than whether actions can be authorized, constrained, and attributed to a person.",
    triggers: ["A privileged credential or target identity is shared by multiple people."], signals: ["Generic administrator identity", "No named session attribution"],
    probes: ["How does each person authenticate?", "How is each session approved and attributed?", "Can session activity be reconstructed?"],
    confidenceEffect: "Confidence remains low until identity and session evidence demonstrate attribution.", riskEffect: "Risk increases when shared access weakens authorization or investigation capability.",
    decisionImplications: ["Assess accountability outcomes before classifying the design as acceptable or unacceptable."], escalationConditions: ["Material systems lack individual authorization or attributable session records."],
    exceptions: ["A shared target account may be acceptable when a broker restores strong individual authentication, approval, and session attribution."], compensatingFactors: ["PAM brokering", "Just-in-time approval", "Session recording", "Credential rotation"],
    noviceMistake: "Treating the presence of a shared account as the conclusion instead of testing accountability.", related: ["compensating_controls.demonstrated_bundle"],
    examples: [
      { kind: "positive", scenario: "Engineers use one root identity with an unlogged shared password.", expected: "Flag weakened accountability and require remediation or escalation based on materiality." },
      { kind: "counterexample", scenario: "A PAM broker maps individually approved and recorded sessions to one target identity.", expected: "Evaluate the broker evidence; do not reject solely because the target identity is shared." }
    ]
  }, "O-001", "The shared name is not the whole problem. I need to know whether I can attribute each session.");
}

function compensatingControlHeuristic(transcript: Transcript): Heuristic {
  return base(transcript, {
    id: "compensating_controls.demonstrated_bundle", title: "A control product name is not a demonstrated compensating control", kind: "caution_signal", domains: ["tprm", "core"], category: "compensating_controls", tags: ["password vault", "pam", "evidence", "control operation"],
    principle: "Credit a compensating control only for the relevant capabilities that are configured, operating, and supported by evidence.",
    rationale: "A product can support many capabilities without proving that the needed outcome is configured or operating in the assessed environment.",
    triggers: ["A vendor cites a product or platform as the answer to a control gap."], signals: ["Product name without configuration detail", "Capability claim without operating evidence"],
    probes: ["Which capability offsets the gap?", "How is it configured?", "What artifact demonstrates operation?"],
    confidenceEffect: "A named product raises a testable hypothesis but should not materially increase confidence by itself.", riskEffect: "Demonstrated capabilities may reduce residual risk; unsupported claims do not.",
    decisionImplications: ["Map each claimed capability to the original control objective and evidence."], escalationConditions: ["A material gap relies on an unverified compensating control."],
    exceptions: ["Previously validated, current evidence may be reused when scope and configuration are unchanged."], compensatingFactors: ["Configuration export", "Access log", "Sample approval", "Independent test"],
    noviceMistake: "Awarding full control credit because a recognized security product is deployed.", related: ["privileged_access.accountability"],
    examples: [
      { kind: "positive", scenario: "Vendor says CyberArk manages a shared admin password but supplies no configuration or logs.", expected: "Ask for the specific checkout, approval, rotation, and attribution evidence." },
      { kind: "negative", scenario: "Vendor provides current configuration and sampled records showing named, approved, recorded sessions.", expected: "Credit the demonstrated capabilities against the accountability gap." }
    ]
  }, "O-002", "Saying CyberArk does not finish the assessment. Show me checkout and session attribution.");
}

function certificationHeuristic(transcript: Transcript): Heuristic {
  return base(transcript, {
    id: "evidence.certification_scope", title: "Certification answers a bounded question", kind: "soft_heuristic", domains: ["tprm", "core"], category: "evidence_quality", tags: ["certification", "soc 2", "scope", "evidence"],
    principle: "Certification should reduce uncertainty only for risks, systems, periods, and controls demonstrably covered by its scope.", rationale: "An assurance report cannot support claims outside what was examined.",
    triggers: ["Certification is cited as evidence for a specific technical or organizational claim."], signals: ["No scope mapping", "Relevant service omitted"], probes: ["Is the service in scope?", "Is the relevant control covered?", "Does the period apply?"],
    confidenceEffect: "Increase confidence only within the report's demonstrated boundary.", riskEffect: "Certification does not directly remove underlying risk outside its scope.", decisionImplications: ["Map the question to report scope and exceptions."], escalationConditions: ["A material claim relies solely on out-of-scope assurance."], exceptions: ["A scoped report may be sufficient for a low-materiality question when the exact control is tested."], compensatingFactors: ["Bridge letter", "Control-specific artifact"], noviceMistake: "Treating certification as a universal security maturity proxy.", related: [],
    examples: [{ kind: "positive", scenario: "A SOC 2 report excludes the product handling assessed data.", expected: "Do not use it to close the product-specific question." }, { kind: "negative", scenario: "The relevant service and control are tested for the applicable period with no exception.", expected: "Use the report to reduce uncertainty for that bounded question." }]
  }, "O-001", "A report only helps if the service and control are actually in scope.");
}

function materialityHeuristic(transcript: Transcript): Heuristic {
  return base(transcript, {
    id: "materiality.gap_vs_consequence", title: "A real gap is not automatically material", kind: "escalation_trigger", domains: ["risk", "core"], category: "materiality", tags: ["gap", "materiality", "escalation", "impact"],
    principle: "Escalation should reflect plausible consequence and decision significance, not the existence of a control gap alone.", rationale: "Equivalent gaps can create very different exposure depending on data, dependency, scope, reversibility, and impact.",
    triggers: ["A confirmed control gap is being considered for escalation."], signals: ["Severity label derived from gap presence alone"], probes: ["What can happen?", "Who or what is exposed?", "Is the effect reversible?"], confidenceEffect: "Evidence of a gap can be high-confidence while its materiality remains uncertain.", riskEffect: "Materiality depends on the scenario's consequence and exposure.", decisionImplications: ["Assess impact dimensions before escalation."], escalationConditions: ["Plausible impact crosses an accountable decision threshold."], exceptions: ["Mandatory escalation rules may apply regardless of estimated consequence."], compensatingFactors: ["Limited scope", "Rapid reversibility", "Layered controls"], noviceMistake: "Equating control deficiency with high risk.", related: [],
    examples: [{ kind: "positive", scenario: "The gap exposes regulated production data and cannot be quickly reversed.", expected: "Escalate based on material consequence." }, { kind: "counterexample", scenario: "The same gap exists in an isolated disposable test system.", expected: "Record the gap without automatically escalating it." }]
  }, "O-001", "A real gap does not automatically deserve escalation.");
}
