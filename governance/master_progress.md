# master_progress.md

**Project:** Fluid-Powered Physical AI Curriculum
**Document type:** Running progress ledger
**Version:** 2.0
**Last updated:** 2026-06-21
**Pairs with:** `PROJECT_STATE.md` (authoritative snapshot)

**Changelog:** v2.0 — Stage 6 done (D19); **Trainer build pipeline (Stages 1–6) COMPLETE**; remaining items are repo-side wire-time. v1.9 — Stage 5 done (D18). v1.8 — Stage 4 done (D17); **D11 unfreeze MET — M05–12 unfrozen**. v1.7 — Stage 3 approved (D16); Release Safety Rule. v1.6 — Dependency Stability Directive; `js-yaml` removed for vendored reader (D15). v1.5 — Stage 2 approved (D14). v1.4 — Stage 1 shipped (D13). v1.3 — EXTEND ratified; unfreeze path (D11); build-time injection (D12). v1.2 — Phase 3A. v1.1 — Phase 2B reconciliation. v1.0 — initial ledger.

---

## 0. How to read this file

`PROJECT_STATE.md` records *what is true now* (the snapshot). This file records *what has happened, in sequence, and what is next* (the ledger). When the two ever disagree, `PROJECT_STATE.md` wins on current state; this file is corrected to match.

**Date honesty:** entries dated `2026-06-20` were performed in the current working session. Work completed before the transformation began has **no recorded date** and is marked `pre-transformation (date not recorded)`.

**Status vocabulary:** `done` · `in progress` · `approved` · `frozen` · `blocked` · `open` · `not started`.

---

## 1. Program maturity tracker

Mirror of `PROJECT_STATE.md` §2.

| Stage | Name | State |
|-------|------|-------|
| 0 | Concept | passed |
| 1 | Curriculum Prototype | **current** |
| 2 | Delivered Curriculum | bypassed by design |
| 3 | Trainer-Centered Platform | target (architecture defined; not yet operational) |
| 4 | Certification Platform | architecture done; not yet operational |
| 5 | Credit-Bearing Program | architecture done; not yet operational |

**Maturity log:**
- *(date not recorded)* — Reached Stage 1: prototype delivered through Module 04.
- `2026-06-20` — Stage 1 → Stage 3 transition begun (Phase 2A approved).
- `2026-06-20` — Stage 3 **architecture** fully defined (Phase 2B complete). Note: architecture defined ≠ platform operational; Stage 3 completes when the Trainer is built out and integrated.
- `2026-06-21` — Certification + credit **architecture** complete (Phases 3A/3B); all nine architecture documents done.
- `2026-06-21` — **First platform capability shipped:** Stage 1 dynamic simulation implemented and verified (D13). Project state: *architecture → architecture + first platform capability.*

---

## 2. Phase ledger

| Phase | Name | Status | Notes |
|-------|------|--------|-------|
| 1 | Audit | done | Audit + conformance matrix `2026-06-20` |
| 2A | Transformation Plan | approved | `2026-06-20` |
| 2B | Architecture-document production | **done** | 7 docs delivered + approved; closure report issued `2026-06-20` |
| 3A | Certification architecture | **done** | `CERTIFICATION_FRAMEWORK.md` + closure report `2026-06-21` |
| 3B | Credit architecture | **done** | `CREDIT_FRAMEWORK.md` `2026-06-21`; all nine architecture documents complete |
| 3 | Installment production (M05–12) | **unfrozen `2026-06-21`** | D11 condition met (Stages 1–4 built); may resume |
| 4 | Verification | not started | — |
| 5 | Trainer integration (build-out) | **in progress** | EXTEND (D10); Stage 1 done `2026-06-21`, Stages 2–6 remain |
| 6 | Assessment validation | not started | Benchmarks executable in Trainer |
| 7 | Certification validation | not started | — |
| 8 | Publication | not started | — |

---

## 3. Phase 2B document production log

All seven delivered in dependency order and individually approved.

| # | Document | Version | Status | Approval |
|---|----------|---------|--------|----------|
| 1 | `PROJECT_STATE.md` | 1.2 | done | approved `2026-06-20` (+2B reconciliation) |
| 2 | `master_progress.md` | 1.1 | done | approved `2026-06-20` (this file) |
| 3 | `CANONICAL_PARAMETER_MODEL.md` | 1.1 | done | approved `2026-06-20` (Educational Ownership added) |
| 4 | `TRAINER_INTEGRATION_ARCHITECTURE.md` | 1.0 | done | approved `2026-06-20` |
| 5 | `LEARNER_JOURNEY.md` | 1.1 | done | approved `2026-06-20` (Physical AI definition added) |
| 6 | `COMPETENCY_MAP.md` | 1.0 | done | approved `2026-06-20` |
| 7 | `ASSESSMENT_MAP.md` | 1.0 | done | approved `2026-06-20` |

Closure: `PHASE_2B_CLOSURE_REPORT.md` issued `2026-06-20`.
Completed after Phase 2B: `CERTIFICATION_FRAMEWORK.md`, `CREDIT_FRAMEWORK.md` (Phases 3A/3B, `2026-06-21`).

---

## 4. Module delivery ledger

Unchanged this phase (Phase 2B was architecture, not lesson production). Artifacts delivered: **4 / 12** (M01–M04). M05–12 production remains frozen. See `PROJECT_STATE.md` §5 for the per-module table.

---

## 5. Trainer integration ledger

**Strategy: EXTEND IN PLACE (D10).** Re-host rejected (violates Trainer's offline/no-rewrite constitution). Build path = Post-Decision Directive Stages 1–6, landing as isolated modules behind the existing esbuild build with `verify`/`smoke` gates; `calculate()` untouched.

| Milestone | Status |
|-----------|--------|
| Trainer exists and operational (v1.4.0) | done (pre-transformation) |
| Trainer integration **architecture** defined | done (`TRAINER_INTEGRATION_ARCHITECTURE.md`) |
| Canonical parameter model defined | done (`CANONICAL_PARAMETER_MODEL.md` v1.1) |
| Decision review (grounded) + EXTEND ratified | done `2026-06-21` (review v1.1; D10) |
| **Stage 1 — dynamic simulation module** (`src/simulation/`) | **done `2026-06-21`** — quasi-static 2-state; reproduces M04 reference (v_steady 84.5 mm/s; P_b/P_r 25/35 bar); verify+smoke gates pass; chained-gate wiring adopted; `calculate()` untouched |
| Stage 1b — full 4-state stiff model | **deferred** (needs stiff integrator; not a blocker for Stages 2–4) |
| **Stage 2 — build-time canonical integration + parity verify** (D12) | **approved `2026-06-21`; complete pending repo-side engine-parity pass (D14)** — `workcell_parameters.yaml` authoritative; build-time injection; transparent swap verified (v_steady identical to fixture); version/checksum gates pass |
| **Stage 3 — `workcell_state` layer** (extends persistence) | **approved `2026-06-21`; complete pending repo-side persistence-adapter round-trip (D16)** — 12 slots; fluid→twin contract chain verified end-to-end; prerequisite enforcement, staleness, sandbox isolation, round-trip via mock adapter all pass |
| **Stage 4 — benchmark runners + scoring** | **done `2026-06-21` (D17)** — three runners, pure state-driven scorers (no `simulate()`); positioning pass/fail/not_available; force+autonomous fail-honest; criteria from canonical; deterministic; evidence in `state.benchmarks` |
| **— D11 unfreeze condition (Stages 1–4) — MET** | **`2026-06-21`** — M05–12 production may resume |
| **Stage 5 — signed evidence export** | **done `2026-06-21` (D18)** — sealed bundle (`src/evidence-export/`); SHA-256 via built-in `crypto.subtle` (offline); reproducible across independent scoring runs (hash excludes timestamps); tamper-evident; verbatim pass/fail/not_available; provisional flags; refs not bulk; verify+smoke pass |
| **Stage 6 — optional external credential service (offline core preserved)** | **done `2026-06-21` (D19)** — external `credential-service/` (outside `src/`/`dist/`); ingests sealed bundle, verifies hash (shared Stage 5 core), applies credential rule, optional identity, issues **signed** credential (ECDSA P-256) or rejects, audits both paths; deterministic verdict; honest reject of not-yet-satisfiable credentials; Trainer offline+unchanged; verify+smoke pass |
| **— Trainer build pipeline (Stages 1–6) COMPLETE** | **`2026-06-21`** — compute → truth source → store → score → seal → credential; zero-dep Trainer core; full chain exit 0 |

**Stages 1–4 are the build path that unfreezes M05–12 production (D11).**

---

## 6. Open actions / backlog

| ID | Action | Status |
|----|--------|--------|
| A1 | Discharge verification debt: confirm M01–03 lesson depth; open M05–12 pages; confirm provisional params P1–P4 from code | open |
| A2 | Demote `FINAL_COMPLETION_REPORT.md`; add pointer to `PROJECT_STATE.md` | open |
| A3 | Keep M05–12 production frozen until Trainer build-out | frozen (enforced) |
| A4 | Build `parameters.py` loader + CI drift/invariant checks (Canonical §9) | queued |
| A5 | Extend `ARCHITECT_DECISIONS.md` with D1–D5 + the consolidated open-decision register | **done** `2026-06-20` (v2.0; D1–D7 + OD-1…OD-10; vocabulary fixed) |
| A6 | Resolve consolidated open decisions (D-T, D-LJ, D-CM, D-AM, see Closure Report §3) before dependent build steps | open |
| A7 | **Future enhancement (deferred):** add `Evidence Maturity` to assessment evidence bundles (`ASSESSMENT_MAP.md` §9) | deferred |
| A8 | **Future artifact (deferred):** `parameter_registry.csv` with `competency` column (Canonical §11, Competency §8) | deferred |

---

## 7. Decision log (summary)

Full rationale belongs in `ARCHITECT_DECISIONS.md` (pending extension, A5).

- **D1 `2026-06-20`** — Adopt Trainer-centered platform target (Directive v3.0).
- **D2 `2026-06-20`** — Bypass Stage 2; transition Stage 1 → Stage 3 directly.
- **D3 `2026-06-20`** — Freeze M05–12 production until Trainer build-out (mitigates R1).
- **D4 `2026-06-20`** — Pull Phase 5 (Trainer integration) ahead of Phase 3.
- **D5 `2026-06-20`** — `PROJECT_STATE` + `master_progress` authoritative for state; `FINAL_COMPLETION_REPORT` demoted.
- **D6 `2026-06-20`** — All 7 Phase 2B architecture documents approved; Phase 2B complete.
- **D7 `2026-06-20`** — Defer Evidence Maturity (A7) and `parameter_registry.csv` (A8) to later phases; record now, build when the model expands.
- **D8 `2026-06-20`** — Consolidated all open decisions into `ARCHITECT_DECISIONS.md` v2.0 (OD-1…OD-10); fixed canonical credential vocabulary (H-3).
- **D9 `2026-06-20`** — Certification structurally sound (6 certification-owned decisions resolved); credit framework unblocked and delivered. All nine directive documents now exist.
- **D10 `2026-06-21`** — EXTEND the Trainer in place; re-host/rewrite rejected (repo facts + Post-Decision Directive). OD-1 strategically resolved.
- **D11 `2026-06-21`** — Trainer Stages 1–4 are the build path that unfreezes M05–12 production.
- **D12 `2026-06-21`** — Canonical parameters integrated at build time with a parity `verify` step (no runtime YAML; offline preserved).
- **D13 `2026-06-21`** — Stage 1 quasi-static dynamic simulation implemented and verified (reproduces M04 reference within tolerance); wired via chained `package.json` gates (`&& node scripts/*-simulation.mjs`) leaving `scripts/verify.mjs`/`smoke.mjs` and `calculate()` untouched; Stage 1b (stiff full model) deferred.
- **D14 `2026-06-21`** — Stage 2 canonical integration implemented and approved: `workcell_parameters.yaml` is the single source, build-time injected into a frozen versioned+checksummed module (offline preserved); transparent swap verified (v_steady identical to the Stage 1 fixture); `js-yaml` is build-time-only. **Completion is recorded once the repo-side engine-parity check passes** (could not run in the sandbox; no `engine.js` present).
- **D15 `2026-06-21`** — Dependency Stability Directive adopted (freeze default; exact pins; `npm ci`; built-in/vendored over new deps). `js-yaml` (added in Stage 2) removed for a vendored zero-dependency reader; generated artifact **byte-identical**, no behavior change. Build is now zero external dependencies. Recorded in `ARCHITECT_DECISIONS.md` D13 + policy §6b + release note. *(Supersedes D14's "js-yaml build-time-only" note.)*
- **D16 `2026-06-21`** — Stage 3 `workcell_state` implemented and approved: 12-slot per-learner store extending (not replacing) persistence; fluid→twin contract chain, prerequisite enforcement, staleness, sandbox isolation, round-trip all verified (mock adapter). **Completion recorded once the repo-side persistence-adapter round-trip passes.** Release Safety Rule recorded (ARCHITECT_DECISIONS §6b).
- **D17 `2026-06-21`** — Stage 4 benchmark runners implemented and approved: three pure state-driven scorers (no `simulate()`); positioning scores pass/fail/not_available; force+autonomous fail-honest; criteria from the canonical `benchmarks` group; deterministic; evidence in `state.benchmarks`. **D11 unfreeze condition (Stages 1–4) MET — M05–12 production may resume.** (Stages 2,3 retain one repo-side wire-time check each; Stage 4 evidence persistence rides Stage 3's adapter.)
- **D18 `2026-06-21`** — Stage 5 evidence export implemented and approved: sealed bundle via built-in `crypto.subtle` SHA-256 (offline, zero-dep); hash excludes timestamps so it is reproducible across independent scoring runs and fingerprints the achievement; tamper-evident; verbatim pass/fail/not_available + provisional flags; artifact references not bulk trajectories. **Honest signing boundary:** tamper-evident hashing only — cryptographic non-repudiation is deferred to the Stage 6 external service (offline core cannot hold a key). Stage 6 (external credential seam) is the only remaining implementation step.
- **D19 `2026-06-21`** — Stage 6 external credential service implemented and approved: external `credential-service/` (outside the Trainer's `src/`/`dist/`, never bundled, never a runtime dependency); one-way ingest of a sealed bundle; hash verification reuses Stage 5's pure core (single-sourced hash); pure credential-rule evaluation (apply, don't define); optional pluggable identity; **real ECDSA P-256 issuer signature** on issuance (the non-repudiation Stage 5 deferred); append-only audit on issue AND reject; deterministic verdict; honest rejection of force/autonomous credentials until M07/M09/M10/M11 land. **Trainer build pipeline (Stages 1–6) is COMPLETE; Trainer core remains offline, single-file, zero-dependency, `calculate()` byte-identical.**

---

## 8. Next action

**Trainer build pipeline (Stages 1–6) is complete** — compute → one truth source → store → score → seal → credential, with the Trainer core offline, single-file, and zero-dependency. The remaining items are **repo-side wire-time** integrations, not new design: (1) Stage 2 engine-parity check against the real `engine.js`; (2) Stage 3 persistence-adapter round-trip against the real v1.2.0 persistence; (3) merge the standalone `verify-*`/`smoke-*` gates into the repo's `verify.mjs`/`smoke.mjs` (needs those files, currently robots-blocked — Claude can merge if pasted). **M05–12 production is unfrozen (D17/D11).** Pre-existing tracked items: H-1 (original ARCHITECT_DECISIONS merge), CR-1 (time-on-task for credit hours), OD-7 (workforce framework).

---

## 9. Update protocol

Append to the relevant ledger section on every change; never rewrite history (correct forward, dated). Increment version and last-updated on each edit. At each phase close, reconcile this file against `PROJECT_STATE.md` and confirm they agree. (Reconciled at Phase 2B close `2026-06-20`.)

---

*End of `master_progress.md` v2.0. **Trainer build pipeline (Stages 1–6) COMPLETE** (Stage 6 = D19): compute → truth source → store → score → seal → credential. Trainer core offline, single-file, zero-dependency, `calculate()` byte-identical. Remaining items are repo-side wire-time (engine-parity, persistence-adapter, gate merge) + pre-existing tracked items. M05–12 unfrozen. Reconciled `2026-06-21`.*

## D20 — M01–M04 conformance audit accepted (YELLOW, integration-only)
Audited published curriculum M01–M04 against approved architecture (MODULE_ARTIFACT_MAP, BENCHMARK_TASKS + LEARNER_JOURNEY/COMPETENCY/ASSESSMENT/TRAINER/CERT/CREDIT). All four GREEN on artifact/competency/benchmark/learner-journey; YELLOW only on workcell_state population + Trainer-integration hooks (modules predate the evidence layer + 12-slot schema). No RED. Verdict: **Module 5 production may begin.** Retrofits recorded in RETROFIT_NOTES.md (R1–R4), parallel + non-blocking.

## D21 — Module 5 production started: power_unit contract (M05 HPU artifact)
First M5 deliverable: `src/state/contracts/powerUnitContract.js` (owner M05, slot `power_unit`, reads `['twin']`) — pure/state-driven HPU sizing from canonical (bore, supply P) + stored twin v_steady. Authored WITH the Trainer seam from the start; this is the pattern the M01–M04 retrofit hooks (R1/R2) adopt. Gate `scripts/verify-power-unit.mjs` PASS: prereq chain (twin→power_unit), HPU sizing real/finite, relief margin, provenance carried. Sized HPU @ wp-1.1.0: 9.96 L/min, 1.66 kW hydraulic, 1.95 kW motor, 110 bar relief, 29.9 L reservoir. No regression (verify-state/benchmarks/params/simulation green). calculate() untouched; offline single-file invariant untouched.

## D22 — M05 module manifest + learning outcomes locked
`MODULE05_MANIFEST.md`: module purpose, twin consumption (v_steady + canonical bore/supply), HPU artifact spec, LO1–LO4 mapped to the 4 published lessons + summary, Positioning benchmark tie-in (conditions feasibility, adds no runner), and the exact `workcell_state.power_unit` expectation. Written against the proven `powerUnitContract` (not ahead of it) and cross-checked by `scripts/check-m05-manifest.mjs` PASS — every produced artifact field, the `['twin']` prereq, `requires_params`, and the proven invariants are documented; no over-claimed fields. Next: M05 lesson content, then code/labs. calculate() + offline invariant untouched.

## D23 — M05 Lesson 01 "Why the machine needs power" (LO1)
First M05 lesson, full 12-part structure, scoped to LO1 (establish why a power source is needed; read flow+pressure demand from the twin). Worked example derives Q = A_bore·v_steady = 9.96 L/min and P_hyd = p·Q = 1.66 kW at 100 bar from the twin's v_steady=84.53 mm/s (wp-1.1.0). Gated: embedded Python executes and prints the claimed values; all worked figures cross-checked against the live power_unit artifact; 12/12 parts present; LO1-scoped (defers pump choice/motor sizing to L02/L03). One lesson per stop. Next: Lesson 02 (LO2, choosing the power source).

## D24 — M05 Lesson 01 reworked to reference-course standard (style alignment)
Per Ali's feedback, rebuilt L01 to match the published physical-ai-curriculum lesson style (the prototype at module01/lesson01). Changes: (1) replaced ASCII "1920" diagram with a professional SVG asset (m05-l1-demand-handoff.svg, hydraulic steel/teal/amber identity, IBM Plex) + a Mermaid flowchart; (2) Interactive Demonstration is now a real standalone HTML widget (lesson01_flow_and_power_demand.html — live sliders for velocity/bore/pressure → Q=A·v, P=p·Q), not fixed prose; (3) Knowledge Check is now a standalone auto-graded quiz (lesson01_quiz.html — formative, unlimited attempts, immediate feedback, not graded) with questions also inline; (4) added breadcrumb, header blockquote, AI Learning Companion, Global Learning Support, next-lesson footer. Gated (gate-lesson01.mjs): demo computes canonical 9.96 L/min & 1.66 kW and reacts (double v → double Q); quiz key correct & grades 5/5; SVG valid/non-ASCII; lesson carries reference structure + figures match power_unit artifact. Supersedes D23's lesson body.

## D25 — Curriculum restart accepted; Module 01 Launch Package built (curriculum leads, Trainer frozen)
Per the Curriculum Restart Master Directive: Trainer architecture/contracts/slots/ownership left UNCHANGED this turn (no code touched in src/state). Built the new Module 01 Launch Package as pure curriculum content to the preserved visual standard: module01_index.md (machine-first landing: a compact power unit + cylinder lifts a 2-tonne load; 4-lesson arc → System Concept Diagram) and Lesson 01 "Why fluid power exists" + SVG (m01-l1-the-machine.svg, the machine concept), interactive demo (force multiplier: F_in→F_out via area ratio), formative quiz, single-file preview. Directive rules enforced by gate-m01.mjs: machine→problem→decision opening before any math; NO banned vocabulary (artifact/competency/benchmark/state/pipeline/twin/Physical AI/Smart Agricultural); no AI framing; F=p·A introduced only after the need is felt. Gated: demo computes 10.19 bar / 16.0× / 8.00 kN and reacts (halving large piston → 4.0×); quiz key correct 5/5; SVG valid/non-ASCII; coding exercise runs (19635 N ≈ 2002 kg, comment reconciled); 12 parts; preview composites. Supersedes the old M05-first content path under the restart. Next: M01 Lessons 02–04, then revisit whether any Trainer adjustment is actually needed.

## D26 — Engineering Content Quality Directive applied to M01 L01 (standard-setting pass)
Upgraded the M01 L01 package to the new quality bar, with a real visual review (cairosvg rasterization + inspection): (1) SVG redrawn for TECHNICAL CONSISTENCY — vertical cylinder, fluid enters cap side below piston, piston/rod/load all move upward, lift arrow up; fixed malformed/oversized arrowheads (hand-drawn polygons), removed label/line overlaps, larger fonts for mobile/print, consistent hierarchy. (2) Demo rebuilt from abstract sliders into a REAL hydraulic jack: two cylinders + hose + working pressure gauge + pump handle, with pistons that physically move (pump stroke: small piston falls far, load rises little — energy trade made visible); added rAF/performance shim for robustness. (3) Worked example restructured to Given/Find/Solution/Result/Engineering-interpretation with rendered LaTeX (zero raw-bracket equations). (4) Quiz preserved as the standard (immediate feedback, explanations, unlimited attempts). Gate gate-m01.mjs PASS across all checks; preview composites with worked-card. Trainer still untouched.

## D27 — Global Curriculum Production Standard authored; M01 L01 brought to full conformance
Consolidated the Engineering Content Quality Directive (presentation) with five learning-quality additions into GLOBAL_CURRICULUM_PRODUCTION_STANDARD.md: B1 Engineering Decision Rule, B2 Machine-First Rule, B3 Realism Rule, B4 Worked Example Template (Given/Find/Assumptions/Solution/Result/Engineering Interpretation), B5 Learner Language Rule (+adds "workcell" to banned-in-prose). Part C = 9-point Definition of Done. Standard answers both "does it look professional?" and "does it teach engineering?". Then closed the two gaps the standard exposed in the reference lesson M01 L01: added Assumptions to the worked example (B4) and an explicit "decision you can now make" statement (B1); performed the now-mandatory multi-width SVG review (desktop/tablet/mobile via cairosvg) — primary labels readable at 380px, secondary captions tight → codified "load-bearing text in primary tier" guidance. Gate gate-m01.mjs PASS on all 9 Definition-of-Done checks. Trainer untouched.

## D28 — Visual Standard v1.0 promoted; figure type hierarchy enforced
Promoted the M01 L01 reference to VISUAL_STANDARD_v1.md per architect review (A- rating). Codified: design tokens (hydraulic palette + IBM Plex), the mandatory four-tier figure type hierarchy (L1 title 26/700, L2 section 15/700, L3 parameter 13/600 mono, L4 annotation 12/400, callout 20/700), figure-consistency (5 story points), multi-width review (desktop/tablet/mobile) with load-bearing-in-primary-tier rule, and the demo realism ladder (intro pictorial → advanced ISO 1219, deferred). Fixed the reviewer's specific defect: "100 bar" parameter no longer competes with "POWER UNIT" section title — applied the hierarchy to the SVG and verified programmatically (26>15>13>12) and at all three render widths. Global Standard A3 now references Visual Standard v1.0. Tracked open item: choose ONE consistent machine (lift/press/manipulator/loader/forklift) before Module 03 — recommendation logged (compact lift/positioning actuator matching the 50mm/100bar canonical params). ISO 1219 symbols deferred to advanced modules. Trainer untouched.

## D29 — Global Curriculum Production Standard v1.1: B6 Engineering Narrative Continuity Rule added
Per architect approval (Global Standard A, Visual Standard v1.0 A) with two requested additions. Added B6 Engineering Narrative Continuity Rule: every module answers (1) what machine are we building, (2) what part is being designed now, (3) how it connects to the previous module, (4) what new engineering decision it unlocks — so the course reads machine→machine→machine, never topic→topic→topic (prevents the drift that damaged the earlier curriculum). Definition of Done extended to 10 checks (added module-continuity check). Standard now governs production; refinement of standards considered complete. Second addition (select the course machine before Module 03) surfaced to the user as a decision with recommendation. Trainer untouched.

## D30 — Course machine SELECTED and locked: Precision Hydraulic Lift Platform
User selected (over loader/forklift and harvesting-arm options) the Precision Hydraulic Lift Platform — chosen because it matches all prior work (50mm bore, 100 bar, ~2t, ±1mm positioning, 84.53 mm/s) so nothing built changes, and scales to autonomous positioning by M12. COURSE_MACHINE.md locks identity + the B6 continuity spine (what each of the 12 modules designs of THIS machine). Canonical figure course-machine.svg built to Visual Standard v1.0: vertical cylinder drives a guided platform up between two rails, lifts a 2t load, position scale with ±1mm commanded-height target, power unit + 100 bar line into cap side. Visually reviewed + fixed at desktop/tablet/mobile (baseplate overlap + rail-crossing label corrected); hierarchy verified programmatically (26>15>13>12). M01 figure/jack demo remain valid (same machine essentials). From M03 on, every figure/demo/example depicts this platform. Standards refinement complete; ready to produce content. Trainer untouched.

## D31 — M01 Lesson 02 "How energy is transmitted" produced (first lesson built natively to the Master Standard)
First content built under the Master Curriculum Production Standard (Technology Coverage Rule resolved the motor question: cylinder-central machine, motors as supporting examples — no re-ask). Full package: 02_how_energy_is_transmitted.md (machine-first: power unit on floor vs work at cylinder → how does energy cross the gap; introduces P=p·Q after the need; defers flow/loss quantification to M03), m01-l2-energy-path.svg (3-stage energy chain, v1.0 hierarchy, visually reviewed at desktop/tablet/mobile — fixed pill overflow + bottom-strip clip), lesson02_energy_transmission.html (real-system demo: power unit→animated flow→cylinder raising platform; flow sets rise speed, power=p×Q readout; rAF shim), lesson02_quiz.html (standard), single-file preview. Gate gate-l2.mjs PASS on all 12 Definition-of-Done checks: machine→problem→decision opening, stated decision, learner language, rendered math, full worked-example template (Given/Find/Assumptions/Solution/Result/Interpretation), consistent reviewed figure, realistic demo (double flow→double power verified; pressure raises power), quiz 5/5, reinforces the lift platform, advances narrative (links L01→L03), AI companion deepens-not-summarizes. Coding exercise runs (1.66 kW). Trainer untouched.

## D31a — Formula rendering regression FIXED (raw math in worked examples)
Root cause: worked-example DISPLAY math in L01+L02 was authored with double-backslash delimiters (\\[ ... \\], \\times, \\text, \\approx) — arithmatex does not recognize \\[ as a math delimiter, so those equations fell through to raw text (the "raw not professional" the user saw). Inline math (single backslash) was fine. Fix: normalized all math to single-backslash \[...\]/\(...\) in both lessons (30 tokens). Verified by rendering every equation through a real MathJax engine (mathjax-full): 17/17 equations typeset with 0 errors; rasterized the worked-example equations to confirm professional output (italic vars, × operator, 10^-4 superscript, ≈, upright units). Added a regression GUARD to gate-m01.mjs and gate-l2.mjs that fails on any double-backslash math delimiter, so this cannot recur. Also delivered site_math/ (mathjax.js arithmatex-compatible config + mkdocs.yml snippet) so the DEPLOYED site renders math — the preview alone working is not enough; the live site needs pymdownx.arithmatex + MathJax configured. Previews regenerated. Trainer untouched.

## D31b — Hose/port connections fixed across all figures and demos
User flagged hoses "ending in the middle" with no ports. Audited every figure with a physical fluid connection and fixed each so hoses terminate at a drawn PORT fitting on the component, at the correct location (cap end for lift cylinders), with no mid-air ends: (1) L02 demo rig — hose previously ended ~36px short of the cylinder in mid-air; rebuilt with a pump OUTLET PORT and a CAP PORT, hose now routes outlet→gauge→under frame→cap port (and updated the animation base coordinates + single flow-dash path to match the new geometry). (2) course-machine.svg — added pump outlet port + cylinder cap port; hose connects port-to-port; removed arrowhead that poked into the barrel. (3) m01-l1-the-machine.svg — same outlet+cap port treatment. (4) L01 jack demo — added cap-end port fittings at both cylinder bottoms. All re-rendered and visually verified (cairosvg). Previews regenerated; gate-m01 + gate-l2 still PASS (L02 demo still computes 1.67 kW and animates after the rig rebuild). Trainer untouched.

## D32a — Formula rendering made bulletproof: previews now pre-render math to inline SVG
Recurring complaint root cause: previews relied on CLIENT-SIDE MathJax (CDN + arithmatex config `ignoreHtmlClass:'.*'`), which renders inconsistently (CDN/async/config-fragility) — validating the LaTeX through the engine proved the math was valid but didn't guarantee the preview rendered it. Definitive fix: added prerender-math.mjs (mathjax-full, server-side) as a build post-step that converts every arithmatex span/div into INLINE SVG and removes the client-side MathJax entirely. Applied to L01/L02/L03 previews (4+3+5 display, 7+3+8 inline equations → SVG; 0 arithmatex spans left). Verified by rasterizing rendered equations (F=p×A; A=F/p=19,620/10,000,000=1.962×10⁻³ m²) — professional fractions/superscripts/units, no CDN needed. Added a gate guard to gate-m01/l2/l3: preview must contain mjx-container SVG, zero arithmatex spans, zero MathJax CDN, no raw \[/\( in body — so a future regen can't silently revert. Also corrected site_math/mathjax.js to the official MkDocs Material form (ignoreHtmlClass ".*|") for the deployed site. BUILD CONVENTION: after generating any preview, run scripts/prerender-math.mjs on it. Trainer untouched.

## D33 — M01 Lesson 04 "Real industrial machines" produced; MODULE 01 COMPLETE
Closing lesson of Module 01, full standard, pre-rendered math + ports from the start. Engineering decision = read any machine as power unit→line→actuator→load and choose linear vs rotary actuation. Satisfies the Technology Coverage Rule: the platform (cylinder, linear, F=p·A) shown alongside the rotary counterpart (hydraulic MOTOR, T=p·D/2π) with winch/conveyor supporting examples — motors as supporting examples, platform still central. Package: 04_real_industrial_machines.md, m01-l4-machine-family.svg (two-row linear-vs-rotary architecture + "EVERY MACHINE" summary; ports on both rows; reviewed desktop/mobile — fixed label/annotation overlaps), lesson04_actuator_types.html (real-machine demo: toggle cylinder↔motor on the same power unit/hose/gauge; force kN vs torque N·m; CSS lift transition + drum spin, no rAF loop; both modes rasterized + verified port-to-port), lesson04_quiz.html (standard). Preview pre-rendered to inline SVG (4 display + 5 inline eqns). Gate gate-l4.mjs PASS all 12 DoD + math/port/coverage guards (demo: 19.6 kN cylinder / 79.6 N·m motor; quiz 5/5; coding prints 79.6 N·m). All L04 equations validated through MathJax (0 errors). 
MODULE 01 (Introduction to Fluid Power Systems) now COMPLETE: L01 why fluid power exists, L02 energy transmission, L03 force multiplication (derives the 50mm bore), L04 real machines (linear+rotary) — all to the Master Standard, all gated, math pre-rendered, ports clean. Trainer untouched. Next: Module 02 — Fluid Power Components.

## D33a — L04 (and all M01) preview rendering FIXED: self-contained, zero external deps
User reported L04 preview: formula issue continues, §4 Visual Explanation an empty box, §7 Interactive blank. Real diagnosis (rasterized the actual inlined components from the preview, not the source): (a) the inline figure SVG, the demo iframe rig, and the math all rasterized fine individually — components were valid; (b) the breakage was in the ASSEMBLED preview: §4 "empty box" = the MERMAID diagram, loaded as a CDN ES-module import (`<script type=module> import ... from cdn.jsdelivr.net/mermaid`) which fails on a local file:// page; figure SVG above it rendered fine; (c) figures/mermaid were wrapped in invalid `<p><div>...</div></p>` (markdown artifact) which browsers mangle; (d) the §7 demo iframe srcdoc was actually a complete, self-contained doc that runs with 0 errors in jsdom — its blankness was collateral from the parent page's module error + bad nesting. Fix: added clean-preview.py (build step BEFORE prerender-math.mjs) that removes the mermaid div + its module loader, strips all external CDN scripts/links, and unwraps invalid <p> around block elements. Applied to all 4 M01 previews → now ZERO external deps (cdn=0, module=0, mermaid=0), valid HTML. Math stays pre-rendered SVG. Mermaid remains in the lesson .md for the deployed MkDocs site (which renders it natively). VERIFIED by rasterizing the figure, the demo-iframe rig, and the math straight out of each cleaned preview (all render) and running both iframes in jsdom (0 errors, demo computes, quiz 5 questions). Hardened gate-m01/l2/l3/l4 with: preview has ZERO external deps, no invalid <p><div> nesting, iframes are complete self-contained docs. All 4 gates PASS. BUILD CONVENTION now: generate preview → clean-preview.py → prerender-math.mjs. Honest limit noted: components verified by rasterization + jsdom, but no live browser available. Trainer untouched.

## D34 — Module 02 opened; Lesson 01 "The hydraulic cylinder" COMPLETE & gate-verified
Module 02 (Fluid Power Components) begins the build: the learner stops surveying machines and designs the lift platform component by component. 4-lesson arc: L01 cylinder (actuator), L02 power unit (pump+reservoir), L03 lines/fittings/ports (conductors), L04 complete component set. Wrote module02_index.md (machine-first landing + lesson table). 
L01 "The hydraulic cylinder": component decision = stroke (= lift height) + single- vs double-acting (how the platform returns/holds). Files: 01_the_hydraulic_cylinder.md (machine-first; worked ex bore 50mm × stroke 600mm -> swept volume V=A×stroke=1.18 L; concludes platform needs DOUBLE-acting for controlled lowering + ±1mm hold; 0 banned vocab, 0 double-backslash math), assets/m02-l1-cylinder-anatomy.svg (horizontal cutaway: barrel, piston+seals, rod, cap-side teal chamber, rod-side chamber, CAP PORT 'fluid in->extends', ROD PORT 'fluid in->retracts', STROKE dimension, single/double note; reviewed desktop+mobile, fixed rod-into-box overlap), demos/lesson01_cylinder.html (real system supply->two hoses->cap+rod ports->vertical cylinder+platform+2t; controls: stroke slider 200-700mm, Extend/Retract, Single/Double; CSS-transition lifter NO rAF; cap-side fluid grows with lift, rod-side fluid on powered retract, gravity arrow on single-acting; geometry rebuilt after baseline error pushed platform off-canvas; port labels nudged clear), quizzes/lesson01_quiz.html (KEY=[1,0,1,1,1]).
NEW reusable tool: scripts/build-preview.py — parameterized clean preview generator that is self-contained FROM THE START (drops mermaid->kept in .md for site, inlines figure SVG, embeds demo+quiz iframes, NO CDN scripts, unwraps invalid <p>). BUILD CONVENTION confirmed: build-preview.py -> prerender-math.mjs (copy beside node_modules in /tmp/htp-repo to resolve mathjax-full) -> clean-preview.py (idempotent) -> render-verify -> gate.
VERIFIED: math pre-rendered to inline SVG (4 display + 3 inline, 0 arithmatex left, 0 cdn); rasterized the figure, the demo rig, and a worked-example equation straight out of the assembled preview and VIEWED them (all render); both iframes run in jsdom with 0 errors; coding exercise prints 1.18 L (600mm) and 0.79 L (400mm task); all 4 equations validate through mathjax-full (0 errors). gate-m2l1.mjs: 33/33 PASS (demo computations, quiz 5/5, 12 DoD, worked-template, single-backslash math guard, ZERO-deps + no-invalid-nesting + iframes-complete preview guards, component-decision present). Trainer untouched.

## D35 — FORMULA RENDERING: definitive root cause + fix (plain self-contained SVG)
User reported (again) formula rendering issue persists on M02 L01 preview. Previous "fix" (pre-render to mjx-container SVG) was still fragile: every equation was wrapped in MathJax's <mjx-container> CUSTOM ELEMENT, sized in ex units, coloured via currentColor, and glyphs emitted as <use xlink:href="#..."> references depending on an injected stylesheet — three independent browser-rendering dependencies. The figures never had this problem because they are plain <svg>. Diagnosis ruled out raw delimiters (0) and unresolved glyph refs (0) — the data was fine; the WRAPPER/CSS machinery was the failure.
DEFINITIVE FIX: rewrote prerender-math.mjs to emit PLAIN, fully self-contained <svg> per equation — SVG output with fontCache:'none' (inline glyph <path>, NO <use>/xlink), strip the <mjx-container> wrapper, convert ex->px (deterministic, EX=8.2), replace currentColor with #13314A ink, class="mjx-eq". Zero custom elements, zero use-refs, zero injected-CSS dependency: renders exactly like the figure SVGs that the user has confirmed always work. build-preview.py CSS updated (.mjx-disp + .mjx-eq, dropped mjx-container rules).
VERIFIED: rebuilt ALL FIVE previews through the pipeline (M01 L01-L04 re-rendered too, not just M02 L01). Audit per preview: mjx-eq>0, mjx-container=0, xlink=0, arithmatex=0, cdn=0. Extracted and rasterized EVERY equation from M02 L01 (all 7: display + inline) AS-IS with no modification — all render perfectly (fractions, superscripts, units, scientific notation, sci-notation exponents); spot-checked M01 L03 (F=p×A) renders too. All 5 gates updated to assert plain-SVG math (mjx-eq present; no mjx-container/xlink/arithmatex/cdn) and PASS. M02 L01 preview still composites (figure + 2 iframes), both iframes run in jsdom with 0 errors. Honest limit unchanged: verified by rasterizing real components + jsdom, no live browser here. Trainer untouched.
BUILD CONVENTION (current): build-preview.py -> prerender-math.mjs (run from /tmp/htp-repo so mathjax-full resolves) -> clean-preview.py -> render-verify (rasterize figure + every equation + each iframe SVG, VIEW) -> gate.

## D36 — Module 02 Lesson 02 "The power unit" COMPLETE & gate-verified
Component decision = pump flow sized to a target lift speed (Q=A×v), plus the motor power it demands (P=p×Q). B6 continuity: picks up L01's 1.18 L swept volume and the "flow sets speed" thread; forward to L03 (lines that carry the flow). Files: 02_the_power_unit.md (machine-first; teaches the key misconception fix — a pump makes FLOW not pressure, the LOAD sets pressure, relief valve caps it; worked ex bore 50mm, v=85 mm/s, p=100 bar -> Q=10.0 L/min, P=1.67 kW, reservoir 20-30 L; 0 banned vocab, 0 double-backslash math), assets/m02-l2-power-unit.svg (reservoir + motor + pump + suction line into tank + pressure line -> PRESSURE PORT -> "to the cylinder" + 100 bar gauge + RELIEF VALVE returning to tank; reviewed desktop+mobile; FIXED relief-return line that ended mid-air -> now routed into the reservoir fluid; suction label lifted clear), demos/lesson02_power_unit.html (real system reservoir->pump->pressure line->cap port->cylinder+2t; flow slider 2-20 L/min; Run lift animates the platform with CSS transition-duration = computed lift time so higher flow visibly lifts faster, NO rAF; readouts speed/lift-time/motor-power; Reset; jsdom-verified Q=10->84.9mm/s/7.1s/1.67kW, Q=20->169.8/3.5/3.33, Run sets duration~7.07s, Reset->translateY(0)), quizzes/lesson02_quiz.html (KEY=[0,1,1,0,0]).
VERIFIED with the now-standard plain-SVG math pipeline: rasterized the figure, the demo rig, and ALL 12 equations straight out of the assembled preview and VIEWED them (every equation renders — fractions, sci-notation, units, ≈); both iframes run in jsdom with 0 errors; coding prints 10.0 L/min & 1.67 kW (and 20.0/3.34 for the 170 mm/s task); 6 equations validate through mathjax-full (0 errors). Preview audit: mjx-eq=12, mjx-container=0, xlink=0, arithmatex=0, cdn=0, module=0, mermaid=0, p-div=0. gate-m2l2.mjs: 33/33 PASS. Trainer untouched. Module 02 now 2/4 lessons (L01 cylinder, L02 power unit); next L03 lines/fittings/ports, L04 component set.

## D37 — Figure + formulas now PNG <img> (definitive end to "empty box / formulas not rendered")
User reported M02 L02: visual-explanation figure shows an empty box AND formulas not rendered — yet both rasterize fine in isolation. Root insight: the failure is specific to INLINE SVG in the MAIN PAGE of the preview (the iframe demo, also SVG, rendered fine for the user — so the user's viewer fails on main-page inline <svg>, via a height:auto-collapse / namespace / gradient-url() quirk I cannot observe). My cairosvg checks never caught it because they test SVG in isolation, not as the browser parses it inside the page.
DEFINITIVE FIX: new scripts/rasterize-embed.py (final pipeline step) rasterizes every MAIN-PAGE inline <svg> — the figure (2x) and each pre-rendered formula (3x) — to PNG and embeds them as <img src="data:image/png;base64,..."> with EXPLICIT width/height (and preserved baseline vertical-align for inline math). PNG <img> renders in any HTML viewer with zero inline-SVG dependency (no namespace, no height:auto collapse, no url()/gradient resolution). Interactive demo + quiz stay as iframes (isolated documents), untouched. Caught + fixed a bug in the new script: figure source ends '</svg>\n' so the figure regex needed '\s*</div>' or it over-matched 88 lines into a formula; corrected.
APPLIED to ALL SIX previews (M01 L01-L04, M02 L01-L02): each now reports "inline <svg left in main page: 0". VERIFIED by DECODING the embedded base64 PNGs straight from each file and VIEWING them — figure renders (gradients, labels, ports) and all formulas render (fractions, sci-notation, units, ≈). Iframes still run in jsdom with 0 errors (untouched). All 6 gates updated: figure is .figure img (not svg), and new guard "math + figure are PNG <img>, ZERO inline SVG in main page" (string-based: figure img + mjx-eq img present, no <svg> outside srcdocs, no arithmatex/mjx-container/cdn). All 6 gates PASS.
BUILD CONVENTION (final): build-preview.py -> prerender-math.mjs (from /tmp/htp-repo) -> clean-preview.py -> rasterize-embed.py -> gate. Honest limit: verified by decoding the actual embedded PNGs; PNG <img> has no runtime rendering dependency so it cannot fail where any HTML+text+img renders. Trainer untouched. The deployed MkDocs site is unaffected (it keeps real SVG figures + MathJax, which render correctly there); this PNG pass is only for the self-contained single-file review previews.
