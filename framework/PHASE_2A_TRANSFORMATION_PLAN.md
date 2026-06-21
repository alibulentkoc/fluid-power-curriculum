# Phase 2A — Curriculum Transformation Plan

**Project:** Fluid-Powered Physical AI Curriculum
**Governs:** Transformation from the current lesson-primary site to the Trainer-centered learning platform required by the Curriculum Platform Architect Directive v3.0
**Status:** Planning document — awaiting approval before Phase 2B
**Scope of this document:** Planning only. No curriculum content, no architecture documents, no lessons.

---

## 0. The transformation in one sentence

The existing work is a *lessons-with-supplemental-widgets* build; the directive requires a *Trainer-as-laboratory platform*. This is not a completion task — it is an **inversion of the center of gravity**, and almost every gap below is a consequence of that single move.

---

## 1. Current State Summary

A MkDocs (Material) lesson site organized as 12 topic-titled modules, each with ~4–5 lessons on a consistent 12-part template, taught through a 5-layer pedagogy (intuition → visual → math → code → integration), unified by a strong single-machine narrative (the Smart Agricultural Workcell). Modules 01–04 are delivered to high quality with validated artifacts; Modules 05–12 are self-reported as *Planned*. Interactivity is delivered as standalone per-lesson HTML widgets. Python models in `code/` are tested and cross-validated against hand calculations. Self-study is supported by per-lesson AI Companion and translation prompts. Assessment is formative and ungraded. Three benchmark tasks are defined with quantified criteria but are not executable inside any environment.

- **Exists:** the lesson site, M01–04 content + artifacts, tested Python models, per-lesson widgets, AI/translation scaffolding, three defined benchmark tasks, partial governance docs (methodology, capability-growth map, ADRs, completion report).
- **Preserve:** see §16 and each roadmap; in brief — the single-machine spine, 5-layer pedagogy, 12-part template, artifact-chain *principle*, the three benchmark tasks, the tested Python models, the honest engineering voice.
- **Modify:** module organization (topic → capability), interactivity (widgets → Trainer modules), assessment (content-check → competency-evidence), the completion report (false "complete" claim).
- **Create:** everything platform-level — see §13.

## 2. Target State Summary

One growing engineering system in which the **Hydraulic Trainer & Designer is the primary environment** — sandbox, design, simulation, assessment, portfolio, and certification — and lessons *support* it. Every module declares its Trainer inputs, outputs, in-Trainer assessment, and stored artifacts. A single canonical parameter file is the source of engineering truth; no lesson or Trainer view drifts from it. The curriculum is organized around named competencies, each with explicit evidence; benchmark tasks are executable and scored inside the Trainer and serve as the primary assessment and certification evidence. The learner moves along a defined professional-identity arc and can be a student, technician, engineer, continuing-ed, or workforce participant. Self-paced learners can progress, verify, and earn a credential without an instructor; a separate credit-bearing track adds outcome mapping and instructor evaluation. The Physical-AI progression (physical → modeling → simulation → control → sensing → electrohydraulics → digital twins → intelligent systems → Physical AI) is preserved and only completed once its delivered.

- **Exists:** the directive itself (the target spec) and the conformant *design* of the existing first act.
- **Preserve:** the directive's ordering constraints (physical-before-AI; Trainer-as-truth; evidence-based certification).
- **Modify:** n/a (target state).
- **Create:** the platform that realizes it.

## 3. Major Architectural Gaps

| ID | Gap | Severity | Root cause |
|----|-----|----------|------------|
| G1 | Center-of-gravity inversion not done (lessons primary, not Trainer) | Critical | Build predates directive |
| G2 | No persistent Trainer environment; interactivity fragmented into widgets | Critical | G1 |
| G3 | No canonical parameter file enforcing source-of-truth | Critical | Trainer absent |
| G4 | No competency map (named competency → evidence) | High | Topic organization |
| G5 | Assessment verifies consumption, not competency | High | Formative-only design |
| G6 | Benchmark tasks not executable in Trainer, not wired to certification | High | G2 |
| G7 | Certification framework absent | High | G4, G6 |
| G8 | Credit framework absent (no outcome/ABET mapping, no instructor track) | High | — |
| G9 | Workforce / multi-audience tiering absent | Medium | Single implied audience |
| G10 | Learner identity arc absent | Medium | Capability tracked, identity not |
| G11 | 8 of 9 required docs missing; state record is self-contradictory | High | Governance partial |
| G12 | M05–12 content and artifacts not delivered | High | Production incomplete |

- **Exists:** G-level visibility (this matrix; the curriculum's own *Planned* labels).
- **Preserve:** nothing in the gaps.
- **Modify:** G1, G2, G5, G11 are reframes/reworks of existing assets.
- **Create:** G3, G4, G6, G7, G8, G9, G10 are net-new; G12 is forward production.

## 4. Dependency Graph

```
Canonical Parameter Model (source of truth)
        │  (Trainer must consume it)
        ▼
TRAINER_INTEGRATION_ARCHITECTURE  ◄── gates everything downstream
        │
        ├─► Fold M01–04 artifacts into Trainer
        │
        ├─► Benchmark tasks executable + scored IN Trainer
        │            │
        │            ▼
        │      ASSESSMENT_MAP ──────────────┐
        │                                   │
LEARNER_JOURNEY ─► COMPETENCY_MAP ──────────┤ (assessment verifies competency)
        │                │                  ▼
        │                │            CERTIFICATION_FRAMEWORK
        │                │                  │
        │                │                  ▼
        │                │            CREDIT_FRAMEWORK
        │                ▼
        └──────► WORKFORCE tiering (audiences × competencies × credentials)

Forward lesson production (M05–12)  depends on ► TRAINER_INTEGRATION_ARCHITECTURE
PROJECT_STATE.md / master_progress.md  ─ created early, maintained throughout (meta)
```

- **Exists:** an implicit, undocumented dependency order.
- **Preserve:** the directive's stated doc list as the node set.
- **Modify:** nothing.
- **Create:** this graph as the basis for §5 and §14.

## 5. Critical Path Analysis

The longest gating chain is:

**Canonical Parameter Model → Trainer Integration Architecture → Trainer consumes model + benchmark tasks executable in Trainer → Assessment Map → Certification Framework → Credit Framework.**

Two consequences decide the whole sequence:

1. **Certification and credit are unreachable until benchmark tasks run in the Trainer**, which is unreachable until the Trainer consumes the canonical model. So the canonical model + Trainer architecture is the single gate for the entire back half of the directive.
2. **Forward lesson production (M05–12) must not begin before the Trainer Integration Architecture is fixed.** If lessons are written first, every one will require retrofitting to the Trainer I/O contract — the largest avoidable rework risk in the project (see R1).

`COMPETENCY_MAP` is a parallel early item, but it must land **before** `ASSESSMENT_MAP` (assessments verify competencies) and is informed by `LEARNER_JOURNEY` (the end-state identity defines the terminal competencies).

- **Exists:** M01–04 as a stable baseline the critical path can build from.
- **Preserve:** the M04 cylinder simulation as the first artifact to fold into the Trainer (proves the integration pattern).
- **Modify:** nothing on the path is reused as-is except the Python models.
- **Create:** the canonical model and Trainer architecture — the head of the path.

## 6. Trainer Integration Roadmap

The Trainer becomes the persistent environment that accumulates the artifact chain; each module populates a layer of it.

- **Exists:** the standalone Hydraulic Trainer & Designer tool; per-lesson widgets (e.g., the cylinder ODE stepper); tested Python models; the M04 cylinder-simulation artifact.
- **Preserve:** the tested Python models (become the Trainer's compute core); the physics inside the existing widgets; the M04 simulation as the first persisted artifact.
- **Modify:** convert standalone widgets into Trainer modules; re-point lessons from "open this widget" to "do this in the Trainer"; make M04's artifact persist in Trainer state rather than living in a one-off page.
- **Create:** `TRAINER_INTEGRATION_ARCHITECTURE.md`; the canonical parameter file; the per-module I/O contract (inputs / outputs / in-Trainer assessment / stored artifacts); the Trainer state + persistence model; the artifact-accumulation mechanism.
- **Stages:** (a) define architecture + parameter file → (b) fold M01–04 artifacts into Trainer → (c) make benchmark tasks executable + scored in Trainer → (d) build M05–12 Trainer-first.

## 7. Competency Framework Roadmap

- **Exists:** implicit competencies inside the per-lesson "capability added" boxes and the benchmark success criteria; the directive's five anchor competencies (Model / Analyze / Design / Create controllers / Build Physical AI).
- **Preserve:** the capability-added framing and benchmark criteria as raw input.
- **Modify:** convert capability statements into named competencies with explicit, observable evidence; align module sequencing to competency progression rather than topic order.
- **Create:** `COMPETENCY_MAP.md` (competency → evidence → owning module → benchmark task → audience tier), terminating in the Physical-AI competency that defines the learner's end-state identity.

## 8. Assessment Roadmap

- **Exists:** formative quizzes (ungraded), coding exercises, challenge problems, worked examples.
- **Preserve:** the formative quizzes and coding exercises **as practice** — keep them ungraded and clearly labeled practice.
- **Modify:** reframe assessment around competency evidence; promote the three benchmark tasks to **summative, Trainer-executed** assessments; attach rubrics.
- **Create:** `ASSESSMENT_MAP.md`; autograders that check coding work against the canonical models; in-Trainer benchmark scoring (pass/fail against the defined criteria, e.g. ±1 mm positioning, 20 N force); the summative gate that certification reads from.

## 9. Certification Roadmap

- **Exists:** nothing.
- **Preserve:** n/a.
- **Modify:** n/a.
- **Create:** `CERTIFICATION_FRAMEWORK.md` defining evidence requirements (completed artifacts + benchmark performance + capstone performance + competency verification), reproducible pass criteria, the portfolio mechanism (Trainer as portfolio environment), and credential issuance (e.g. Open Badges / Credly).
- **Blocked until:** `COMPETENCY_MAP` exists and benchmark tasks are Trainer-executable (§5).

## 10. Credit-Bearing Roadmap

- **Exists:** nothing in-repo (prior faculty-manual/TPR familiarity is background, not an artifact).
- **Preserve:** n/a.
- **Modify:** n/a.
- **Create:** `CREDIT_FRAMEWORK.md` with learning outcomes in measurable verbs, ABET student-outcome mapping (notably outcomes for problem-solving, design, and experimentation), contact-/credit-hour justification, an instructor-evaluation track, academic-integrity provisions, institutional-compliance notes, and a syllabus crosswalk. Kept **separate from lesson content** per the directive.
- **Blocked until:** competency map + assessment map exist (credit reads competency evidence).

## 11. Workforce Development Roadmap

- **Exists:** a single implied audience (engineering students).
- **Preserve:** the engineering rigor — tiering must not dilute the core.
- **Modify:** tier competencies and credentials by audience rather than authoring separate content.
- **Create:** the audience model (student / technician / engineer / continuing-ed / workforce participant); an outcome → workplace-capability mapping; a tiered credential ladder; per-audience entry points and prerequisites. (Likely folded into `COMPETENCY_MAP` + `CERTIFICATION_FRAMEWORK` rather than a standalone doc, unless a dedicated file is preferred.)

## 12. Learner Journey Roadmap

- **Exists:** the capability-growth map (capability progression, but not *identity*).
- **Preserve:** the capability-growth map as the input skeleton.
- **Modify:** extend capability progression into a professional-identity arc.
- **Create:** `LEARNER_JOURNEY.md` — Beginning Student → Fluid Power Analyst → Fluid Power Designer → Electrohydraulic Systems Engineer → Physical AI Systems Engineer — each stage mapped to modules, competencies, and credentials.

## 13. Required Repository Artifacts

The directive names nine authoritative documents. Status:

| Document | Status | Action |
|----------|--------|--------|
| `LEARNER_JOURNEY.md` | Missing | Create (§12) |
| `COMPETENCY_MAP.md` | Missing | Create (§7) |
| `TRAINER_INTEGRATION_ARCHITECTURE.md` | Missing | Create (§6) — critical path head |
| `ASSESSMENT_MAP.md` | Missing | Create (§8) |
| `CERTIFICATION_FRAMEWORK.md` | Missing | Create (§9) |
| `CREDIT_FRAMEWORK.md` | Missing | Create (§10) |
| `PROJECT_STATE.md` | Missing | Create — truthful state record |
| `ARCHITECT_DECISIONS.md` | Exists | Preserve + extend |
| `master_progress.md` | Missing | Create — running progress ledger |

Plus required-but-not-in-the-nine:
- **Canonical parameter file** — mandated by the Canonical Model Rule; create as critical-path head.
- **Existing extra governance docs** (methodology, capability-growth, completion report) — Preserve the first two; **Modify the completion report** to reconcile with `PROJECT_STATE.md` and retire the false "complete" claim.

## 14. Recommended Development Sequence

Gated, mapped to directive Phases 2–8. Do not skip; do not begin forward lesson production before the Trainer architecture is fixed.

1. **Phase 2A (this document)** — transformation plan → approval.
2. **Phase 2B — architecture docs in dependency order:** Canonical Parameter Model → `TRAINER_INTEGRATION_ARCHITECTURE` → `LEARNER_JOURNEY` → `COMPETENCY_MAP` → `ASSESSMENT_MAP` → `CERTIFICATION_FRAMEWORK` → `CREDIT_FRAMEWORK`; stand up `PROJECT_STATE` + `master_progress` first and maintain throughout.
3. **Phase 5 (Trainer integration) — pulled early:** build/extend the Trainer to consume the canonical model; fold M01–04 artifacts in; prove the per-module I/O contract on existing modules.
4. **Phase 6 (assessment validation):** make the three benchmark tasks executable and scored in the Trainer; attach rubrics and autograders.
5. **Phase 7 (certification validation):** wire benchmark + portfolio evidence into the certification framework; validate reproducibility.
6. **Phase 3 (installment production) — resumed Trainer-first:** produce M05–12 to M04 depth, each declaring Trainer I/O and producing its artifact; capstone (M12) demonstrates all three benchmark tasks end to end.
7. **Workforce tiering + credit track:** finalize audience tiers and the instructor-evaluated credit pathway.
8. **Phase 8 (publication).**

(Note the deliberate reordering: directive Phase 5 Trainer-integration is pulled ahead of Phase 3 lesson production, because the architecture must exist before lessons are written against it — see §5, R1.)

- **Exists:** the directive's 8-phase frame.
- **Preserve:** "do not skip phases."
- **Modify:** pull Trainer integration ahead of forward lesson production.
- **Create:** this gated sequence.

## 15. Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|-----------|
| R1 | M05–12 lessons authored before Trainer architecture → mass retrofit | High | High | Freeze forward lesson production until §14 step 2–3 complete |
| R2 | Canonical model not enforced → parameter drift across lessons/Trainer | Med | High | Single parameter file imported everywhere; CI check for drift |
| R3 | Contradictory state docs persist → governance trust erodes | High | Med | Replace completion report claim with `PROJECT_STATE` early |
| R4 | Cert/credit/workforce pursued before benchmarks are executable → stall | Med | High | Honor the dependency gates in §4–5 |
| R5 | Trainer scope balloons (now the whole platform) → underestimated | High | High | Define a minimal Trainer that runs the three benchmarks first; grow by module |
| R6 | Over-rigid competency/cert gating deters self-paced learners | Med | Med | Keep an open, ungraded path; gate only the credential, not the learning |
| R7 | Solo-maintainer bandwidth vs platform ambition | High | High | Sequence so each phase ships a usable increment; avoid big-bang |
| R8 | M05–12 authored thinner than M04 → depth asymmetry returns | Med | Med | Treat M04 as the depth bar; per-module artifact + benchmark check |

- **Exists:** R1, R3, R8 are already latent in the current build.
- **Preserve:** the M04 depth bar as the quality reference (mitigates R8).
- **Modify:** the state record (mitigates R3).
- **Create:** the drift check and benchmark-minimal Trainer (mitigate R2, R5).

## 16. Success Criteria

The transformation is complete when all of the following hold:

1. Every module declares Trainer inputs, outputs, in-Trainer assessment, and stored artifacts; **zero standalone widgets remain.**
2. A single canonical parameter file exists; all lessons and the Trainer reference it; **measured parameter drift is zero.**
3. The three benchmark tasks are **executable and scored inside the Trainer.**
4. Every competency has named, observable evidence; assessments verify **capability, not consumption.**
5. A self-paced learner can **progress, verify progress, and earn a completion credential** without instructor involvement.
6. Certification is **reproducible** from documented evidence (artifacts + benchmark + capstone + competency verification).
7. The credit track has **measurable outcomes, ABET mapping, and an instructor-evaluation pathway,** kept separate from lesson content.
8. All nine authoritative documents exist and are current; **the state record is truthful** (no "complete" claim contradicting delivery).
9. The learner-identity arc is **traversable end to end**, mapped to modules, competencies, and credentials.
10. M05–12 are delivered to **M04 depth**, each with its artifact, culminating in a capstone that demonstrates all three benchmark tasks autonomously.

- **Exists:** criterion 10's depth reference (M04).
- **Preserve:** M04 as the standard.
- **Modify:** nothing — these are acceptance gates.
- **Create:** the verification checks behind criteria 1–9.

---

*End of Phase 2A Transformation Plan. Awaiting approval before Phase 2B (architecture-document production in the §14 dependency order).*
