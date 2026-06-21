# ASSESSMENT_MAP.md

**Project:** Fluid-Powered Physical AI Curriculum
**Document type:** Assessment architecture (Assessment + Benchmark Task Rules, Directive v3.0)
**Version:** 1.0
**Last updated:** 2026-06-20
**Derived strictly from:** `COMPETENCY_MAP.md` (the five competencies), `TRAINER_INTEGRATION_ARCHITECTURE.md` (runners, `workcell_state`, evidence), `CANONICAL_PARAMETER_MODEL.md` (acceptance values)
**Feeds:** `CERTIFICATION_FRAMEWORK.md` (the evidence it reads)
**Status:** Authoritative for how capability is verified.

---

## 0. Purpose and authority

The directive requires that **assessments verify competencies, not content consumption**, and that every assessment answer **"what capability has been demonstrated?"** This document turns each competency's evidence and acceptance criteria into concrete, repeatable, Trainer-executed assessments, and draws the line between formative practice and summative verification.

**It invents nothing.** No new competency (the five in `COMPETENCY_MAP.md` are fixed). No new benchmark task (the three in the Trainer are fixed). Every summative assessment is an existing benchmark runner scoring existing `workcell_state` evidence against existing canonical acceptance values. This document is a *binding*, not a new layer.

Where any assessment elsewhere conflicts with this document, **this document is authoritative**.

---

## 1. Design principles

1. **Two types, one boundary.** Formative = practice, ungraded, unlimited. Summative = competency verification, Trainer-executed, produces durable evidence. They never blur.
2. **Summative is Trainer-executable.** Every summative assessment runs inside the Trainer and emits a scored record. If it cannot run in the Trainer, it is not a summative assessment here.
3. **Every assessment names the capability.** Each one states the "capability demonstrated" — the directive's required question, answered explicitly.
4. **Consumption is never summative.** Quizzes that check understanding are formative only; passing a quiz never earns a credential.
5. **Derived, not invented.** Assessments trace 1:1 to competencies and benchmarks already defined.

---

## 2. The two assessment types

| | Formative | Summative |
|---|-----------|-----------|
| **Purpose** | Build readiness; self-check | Verify a competency |
| **Examples** | Per-lesson knowledge-check quizzes, coding exercises, challenge problems | Benchmark runs producing scored evidence |
| **Graded?** | No — ungraded, unlimited attempts | Yes — pass/fail against canonical acceptance |
| **Runs where** | Lesson page / Trainer sandbox | Trainer (scored runner) |
| **Feeds certification?** | **No** | **Yes** (the only source) |
| **Status** | Exists; preserved | Defined here; built per module |

---

## 3. Status legend

Mirrors competency delivery in `COMPETENCY_MAP.md` / `PROJECT_STATE.md`:

✅ **Executable now** (modules delivered) · 🟡 **Partial** (sim now, completes after a later module) · ⬜ **Planned** (owned by planned modules).

---

## 4. Formative layer (exists — preserved, unchanged)

The delivered curriculum's assessment is entirely formative, and it stays that way:

- **Knowledge-check quizzes** — per lesson; the delivered ones already state "does not affect your grade." Kept as ungraded, unlimited-attempt self-checks.
- **Coding exercises** — extend the tested models; run against the canonical loader in a Trainer sandbox (Trainer Architecture D-T3). Practice, not evidence.
- **Challenge problems** — stretch reasoning; ungraded.

**Role:** readiness for the summative competency verification. **Explicit limit:** no formative result is ever read by certification. This is the directive's "assessments do not verify content consumption," enforced structurally.

---

## 5. Summative assessment catalog

One summative assessment per competency. Each is an existing benchmark runner scoring existing evidence against existing canonical acceptance — nothing new.

### A1 — Verifies C1 (Model Hydraulic Systems) ✅

- **Capability demonstrated:** "I can predict the cylinder's motion with a validated model."
- **Trainer mechanism:** positioning runner over the simulated trajectory + the `cylinder_simulation` artifact in `workcell_state.twin.cylinder`.
- **Reads:** `twin.cylinder`, `twin.pressures`; parameters: cylinder, fluid.B_e, dynamics, supply.
- **Acceptance (canonical):** steady velocity within ±10 % of the analytical estimate; ODE stable; validated against the independent hand calculation.
- **Evidence emitted:** `positioning_sim_result` + artifact reference.
- **Enabling coverage:** C1.1–C1.7 (the validated coupled simulation cannot exist unless each enabling step produced its piece).

### A2 — Verifies C2 (Analyze System Performance) 🟡

- **Capability demonstrated:** "I can evaluate the machine's performance against its targets."
- **Trainer mechanism:** positioning runner scored against the ±1 mm and cycle-time targets + a performance analysis.
- **Reads:** `twin`, `benchmark_scores`.
- **Acceptance (canonical §7.2):** steady-state error ≤ ±1 mm; throughput target (8 cycles/min) evaluated.
- **Status note:** ±1 mm is sim-evaluated now; becomes *measured* (position sensor vs twin) once M09 lands. Recorded honestly as partial.
- **Evidence emitted:** `positioning_score` + analysis record.

### A3 — Verifies C3 (Design Fluid Power Solutions) ⬜

- **Capability demonstrated:** "I can design and integrate a complete fluid-power system that meets its targets."
- **Trainer mechanism:** positioning + force runners over the designed system (`power_unit`, `motion_control`, `actuator`, `circuit`) + energy-budget check.
- **Acceptance:** positioning and force targets met in simulation; energy budget closes.
- **Evidence emitted:** design artifacts (HPU, motion-control, actuator report, integrated circuit) + `positioning_score` + `force_score`.
- **Status:** planned (M05–M08).

### A4 — Verifies C4 (Create Electrohydraulic Controllers) ⬜

- **Capability demonstrated:** "I can give the machine senses and closed-loop control."
- **Trainer mechanism:** force runner closed-loop over `sensors` + `control`; stability and safety-state checks.
- **Acceptance (canonical §7.2):** applied force within tolerance of the 20 N command; stable, no spike; safety states verified.
- **Evidence emitted:** `force_score` + controller and sensor-layer artifacts.
- **Status:** planned (M09–M10).

### A5 — Verifies C5 (Build Physical AI Systems) ⬜

- **Capability demonstrated:** "I can build a self-aware, autonomous machine that monitors and improves its own behavior."
- **Trainer mechanism:** autonomy runner over the full `integrated_twin` + `demonstration`; residual monitoring throughout.
- **Acceptance:** all three benchmark tasks pass autonomously; twin residual stays within bounds; no human intervention.
- **Evidence emitted:** `autonomy_score` + capstone artifact + twin-residual record.
- **Status:** planned (M11–M12).

---

## 6. Master assessment table

| Assessment | Verifies | Benchmark used | Evidence emitted (Trainer) | Acceptance source | Status |
|------------|----------|----------------|----------------------------|-------------------|--------|
| A1 | C1 Model | Positioning (sim) | positioning_sim_result + artifact | C1 + canonical §6 | ✅ |
| A2 | C2 Analyze | Positioning | positioning_score + analysis | canonical §7.2 | 🟡 |
| A3 | C3 Design | Positioning + Force | design artifacts + scores | C3 + canonical §7.2 | ⬜ |
| A4 | C4 Controllers | Force | force_score + controller | canonical §7.2 | ⬜ |
| A5 | C5 Physical AI | Autonomous | autonomy_score + capstone | C5 acceptance | ⬜ |

Five assessments, five competencies, three benchmarks. No surplus. This table agrees with `COMPETENCY_MAP.md` §5–6.

---

## 7. Scoring and evidence model

- **A summative run = a Trainer runner** reading `workcell_state` at a pinned `params_version`, executing, and writing a pass/fail record (with the measured values) to `benchmark_scores` and the learner's `portfolio`.
- **Reproducible:** same parameter version + same state ⇒ same result (the canonical-model determinism). A credential built on it is therefore reproducible (directive requirement).
- **Durable & attributable:** the evidence record persists per learner — its durability depends on Trainer state persistence (Trainer Architecture D-T2, open).
- **Re-takes:** formative is unlimited; summative re-take policy is a certification decision (inherits D-CM3), not set here. This document defines the *evidence*, not the *policy*.

---

## 8. The formative ↔ summative boundary (explicit)

```
Formative (practice)                 Summative (verification)
─────────────────────                ─────────────────────────
quiz, coding exercise, challenge     benchmark run + workcell_state artifact
ungraded, unlimited                  scored vs canonical acceptance
builds readiness                     produces the evidence record
                          ╳ never crosses ╳
NOT read by certification             the ONLY thing certification reads
```

A learner may pass every quiz and still not hold a competency; they hold it only when the summative evidence exists. Conversely, the quizzes exist to make that evidence achievable. The boundary is the integrity of the credential.

---

## 9. Bridge to certification

This is the document's role: it assembles, per credential checkpoint (from `LEARNER_JOURNEY.md` §5), the exact **evidence bundle** certification will read. Certification design is later; the bundles are defined here so it has a precise input.

| Credential checkpoint | Summative evidence bundle | Status |
|-----------------------|---------------------------|--------|
| → Fluid Power Analyst | A1 (✅) + A2 (🟡) + analyst artifacts (concept, hardware, fluid, twin.cylinder) | partially executable now |
| → Fluid Power Designer | A3 + design artifacts + A2 complete | ⬜ |
| → Electrohydraulic Engineer | A4 + sensor/controller artifacts | ⬜ |
| → Physical AI Engineer | A5 + capstone + twin-residual record | ⬜ |

Certification reads these bundles — `portfolio` artifacts + `benchmark_scores` — and nothing else. It does not re-run physics or re-interpret competencies; it checks that the bundle is complete and passing. That clean handoff is the point of the assessment layer.

---

## 10. Relationship to other documents and sync

- **Consumes:** competencies + acceptance (`COMPETENCY_MAP.md`); runners + evidence schema (`TRAINER_INTEGRATION_ARCHITECTURE.md`); acceptance values (`CANONICAL_PARAMETER_MODEL.md`).
- **Feeds:** `CERTIFICATION_FRAMEWORK.md` (evidence bundles), and the credit framework via certification.
- **Sync rule:** A1–A5 ↔ C1–C5 ↔ the three benchmark runners must always be 1:1:n. Adding an assessment requires an existing competency and an existing benchmark; if neither exists, the request is rejected, not accommodated.

---

## 11. Exists / preserve / modify / create

- **Exists:** formative quizzes, coding exercises, challenge problems (ungraded).
- **Preserve:** all of it, unchanged, as the formative layer.
- **Modify:** reframe assessment language so "assessment" defaults to *competency verification*; quizzes are explicitly relabeled *practice*.
- **Create:** the five summative assessments (as Trainer runners + evidence records) and the per-checkpoint evidence bundles. A1 is buildable now; A2–A5 build with their modules.

---

## 12. Open questions (→ ARCHITECT_DECISIONS.md / certification)

| ID | Question | Owner |
|----|----------|-------|
| D-AM1 | Summative re-take policy (attempts, cooldown) | Certification (with D-CM3) |
| D-AM2 | Enabling-competency coverage required for a summative pass (all vs threshold) | Certification (with D-CM2) |
| D-AM3 | Evidence durability / attribution requirements for a credential | Depends on Trainer D-T2 |

None block certification design; they are its first inputs.

---

## 13. Acceptance criteria

1. Exactly five summative assessments, 1:1 with the five competencies; none invented.
2. Only the three existing benchmark tasks are used.
3. Every summative assessment is Trainer-executable and names the capability demonstrated.
4. Formative quizzes remain ungraded and are never read by certification.
5. Per-checkpoint evidence bundles are defined and trace to `LEARNER_JOURNEY.md` §5.
6. Status honestly reflects delivery (only A1 executable now; A2 partial).

---

*End of `ASSESSMENT_MAP.md` v1.0. Phase 2B document 7 of 7 — Phase 2B drafting complete. Derived entirely from the competency map, Trainer architecture, and canonical model; nothing invented. Bridges competency evidence to future certification. Awaiting approval; on approval, the closing step is the Phase 2B ledger reconciliation (`master_progress.md` + `PROJECT_STATE.md`).*
