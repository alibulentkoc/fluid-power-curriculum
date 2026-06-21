# TRAINER_PLATFORM_DECISION_REVIEW.md

**Project:** Fluid-Powered Physical AI Curriculum
**Document type:** Decision review (Trainer platform)
**Version:** 1.1 (repository accessed; decision ratified)
**Last updated:** 2026-06-21
**Informs:** OD-1 (resolved: EXTEND), OD-2/OD-3/OD-4
**Status:** Decision **ratified — EXTEND IN PLACE**. The conditional framing of v1.0 is superseded by the v1.1 update below (§A). No code. No Trainer modification.

---

## A. v1.1 update — repository accessed, decision ratified (supersedes the conditional framing)

The Trainer repository (`github.com/alibulentkoc/hydraulic-trainer-platform`) was provided and **directly inspected** (README, ARCHITECTURE.md). The v1.0 `[assumed]` cells below are now superseded by grounded facts; the recommendation moves from "conditional hybrid" to **EXTEND IN PLACE (decided)**. The v1.0 body is retained as history.

**Grounded Step-0 audit:**
- **Stack** — single self-contained **offline** HTML file; React 18.3.1 + ReactDOM inlined; source `src/app.jsx` + `src/core/engine.js`; **esbuild** build; Babel removed at v1.1.0 (no runtime transformer); pinned npm toolchain; no server/network.
- **Engine separability** — **already separated.** `calculate(inp)` is a pure function in `src/core/engine.js`, verified identical to the v1.0.0 baseline. *It is a steady-state sizing/analysis engine, **not** a dynamic ODE simulator.*
- **Persistence** — none at v1.0.0; **autosave + recovery + export added v1.2.0**; current v1.4.0 has local persistence + export. Browser-local only.
- **Constants** — **in code** (engineering tables in `src/core/engine.js`); no external parameter file.
- **Accounts** — none; auth/licensing is a *future* phase (8), isolated from core.
- **Capability** — design/analyze sizing + animated ISO schematic + GUIDE/LEARN/PHYSICS/COACH. Maps to M02/M03/M05/M07/M08, partial M06. **Lacks:** dynamic simulation (M04 twin), sensors (M09), control (M10), twin/fault (M11), benchmark scoring, per-learner curriculum state.
- **Deployment** — single offline file (`dist/hydraulic_trainer.html`); USB/LMS-distributable; offline is a hard invariant.
- **Structure** — was monolithic; now mid-modularization (Phase 5); governed by a **no-rewrite, never-break-offline** constitution with five invariants.

**Ratified decision (OD-1): EXTEND IN PLACE.** Re-host is **rejected** — it would violate the Trainer's own offline-single-file invariant and no-rewrite constitution. Preserve the pure engine and offline artifact; add platform capability as **new isolated modules** (Post-Decision Directive Stages 1–6; `ARCHITECT_DECISIONS.md` D10).

**Two findings that shaped it:** (1) the engine is steady-state, so a **dynamic simulation module must be added** (Stage 1), not reused from `calculate()`; (2) the **offline invariant vs. credential-evidence** tension is resolved by **offline signed export → optional external service** (Stages 5–6), never a backend in core (OD-2 resolved).

**Dependent calls (now firm):** OD-2 → resolved (export-to-external; certification §7 + directive Stages 5–6). OD-3 → local autosave is the practice sandbox; canonical state rides the export. OD-4 → stay on React 18 + esbuild single-file; new modules follow the carve-along-seams pattern. New risk recorded: two-sources-of-truth (engine tables vs canonical model) → **build-time parameter injection + parity `verify`** (D12).

---

## 0. Scope and honesty note *(v1.0 — historical; superseded by §A)*

This review compares the Hydraulic Trainer **v1.4.0** against the platform requirements in `TRAINER_INTEGRATION_ARCHITECTURE.md`.

**The Trainer repository was not accessible to this review.** A search did not surface it (likely private or unindexed), and its internal architecture has not been audited. Therefore:

- The **required** side of every comparison is firm (from the architecture document).
- The **current** side is built from *known/stated* attributes of v1.4.0 — operational, browser-based, a standalone hydraulic circuit designer/trainer (`PROJECT_STATE.md` §4; the curriculum's interactive layer is client-side HTML) — and is marked **[assumed — confirm in audit]** wherever it depends on internals.


Consequently the extend-vs-re-host **recommendation is conditional**, and the first item in the recommended sequence (§7) is a Trainer-internals audit that converts this review's conditional call into a final one. This is the OD-1 dependency, made explicit.

---

## 1. Gap analysis — v1.4.0 vs the platform architecture

Each platform capability from `TRAINER_INTEGRATION_ARCHITECTURE.md`, its likely current state, and the gap.

| Platform capability (required) | v1.4.0 current state | Gap |
|--------------------------------|----------------------|-----|
| **Hydraulics + ODE engine** (compute) | **Present** [assumed] — a designer/trainer must compute circuit/sim behavior | Small — the asset to preserve; confirm it matches canonical values |
| **Circuit-design UI** | **Present** [assumed] — it is a "Designer" | Small — likely reusable as the M06–M08 surfaces |
| **Parameter layer** consuming `workcell_parameters.yaml` + invariants | **Absent** — values likely hard-coded/in-tool [assumed] | Large — must consume the canonical loader; no literals |
| **`workcell_state`** (per-learner, versioned, persistent) | **Absent** [assumed] — standalone tools rarely persist structured per-user state | Large — core new capability |
| **Module Integration Contracts** (M01–M12 surfaces) | **Absent** — not built around the curriculum's modules | Large — the integration mechanism |
| **Benchmark runners + scoring** | **Absent** — benchmarks defined but not executable anywhere | Large — the assessment surface |
| **Portfolio** (accumulated artifacts) | **Absent** [assumed] | Medium — derivable once state exists |
| **Account-backed, attributable persistence** (credential-grade) | **Absent** [assumed] — client-side tool | Large — required by certification §7 (OD-2) |
| **Assessment/certification interfaces** (evidence out) | **Absent** | Medium — depends on state + scoring |
| **Curriculum ↔ Trainer parameter version sync** | **Absent** | Medium |

**Summary:** v1.4.0's likely assets are the **engine** and **circuit-design UI**. The platform layers — parameter integration, per-learner state, contracts, runners, portfolio, and credential-grade persistence — are largely **net-new** regardless of path. The single most consequential gap is **account-backed durable evidence**, which certification now requires.

---

## 2. Extend vs re-host

### A. Extend existing Trainer in place
**Pros:** preserves the operational tool and its engine/UI; fastest route to a first integrated slice; lowest disruption to existing work; keeps one familiar codebase.
**Cons:** if v1.4.0 is a monolithic client-side app, retrofitting per-learner state, contracts, parameter-loader consumption, and **credential-grade account-backed persistence** may be costly and fragile; risk of accumulating debt; the OD-2 evidence requirement may not be reachable without substantial backend work anyway.
**Best when:** the audit finds the engine is **separable**, the app is **modular**, and persistence can be layered in cleanly.

### B. Re-host capabilities in a platform shell
**Pros:** clean architecture matching the platform doc (parameter layer → engine → state → surfaces → runners → portfolio) with **account-backed evidence designed in from the start**; far easier to expand for M05–M12, sensors, control, and twin; better long-term maintainability.
**Cons:** higher upfront cost; risk of **regressing or temporarily losing** a working tool; requires porting the engine + UI and **re-validating** numerics.
**Best when:** v1.4.0 is monolithic/hard to extend, or when credential-grade persistence and multi-learner accounts are needed soon (they are).

### The decisive driver and a likely hybrid
Certification (approved) **requires** account-backed, durable, attributable evidence (§7 / OD-2). **Both** paths must add a persistence/account layer to support credentials. Once that backend is being added regardless, the marginal cost of a clean shell falls — which tilts toward a **hybrid**:

> **Preserve the v1.4.0 hydraulics/ODE engine** (the hard-won, validated asset) **as the compute core, and re-host it inside a platform shell** that adds the parameter layer, `workcell_state`, contracts, runners, portfolio, and account-backed persistence.

"Extend the engine; re-host the platform." This keeps the validated physics while letting the platform layers be built correctly rather than retrofitted. **Conditional on the audit** confirming the engine is separable.

---

## 3. State persistence options

| Option | Durable | Attributable | Multi-device | Credential-grade? | Use |
|--------|---------|--------------|--------------|-------------------|-----|
| Browser-local (IndexedDB/localStorage) | weak | no | no | **No** | formative/sandbox only |
| Account-backed server store | yes | yes | yes | **Yes** | credential-bearing runs |
| File export/import of `workcell_state` | partial | weak | manual | no | portfolio export, backup |
| **Hybrid: local sandbox + server-synced credentials** | yes (for credentials) | yes | yes | **Yes** | **recommended** |

**Recommendation:** hybrid — local for practice/experimentation (also serves OD-3), server-backed the moment a learner pursues a credential. This matches certification §7 (practice may be local; credentials must be account-backed) exactly.

---

## 4. Portfolio implementation options

| Option | Description | Trade-off |
|--------|-------------|-----------|
| Derived view over `workcell_state` | Portfolio = query of populated slots + benchmark scores | Single source of truth; no duplication — **preferred core** |
| Separate portfolio store | Append-only list of artifact refs | Explicit/exportable but duplicates state |
| Export bundle | Downloadable package: artifacts + scores + manifest | Needed for credential submission / credit handoff — **complement** |

**Recommendation:** portfolio = **derived view over `workcell_state`** (no separate store) **plus an export bundle** for credential submission. Avoids drift while giving certification a clean, portable input.

---

## 5. Credential evidence storage options

This is the OD-2-critical layer; certification §7 sets the requirements (durable, attributable, timestamped, reproducible).

| Option | Meets OD-2? | Notes |
|--------|-------------|-------|
| Client-only | **No** | Not attributable/durable/tamper-evident — reject for credentials |
| Server DB with learner accounts | Yes (baseline) | System of record; stores state + `params_version` + result + timestamp → reproducible |
| **+ Signed/tamper-evident records** | Yes (strong) | Hash/sign each evidence record; supports verification and academic-integrity (credit path) |
| External issuance (Open Badges / Credly) | issuance layer | Issue a verifiable credential referencing the stored evidence record |

**Recommendation:** **server DB as system of record + signed evidence records** (run inputs, `params_version`, result, timestamp) for reproducibility and integrity, with **optional Open Badges issuance** for the credential itself. Formative/practice stays client-local. This satisfies OD-2 and the credit framework's integrity needs without over-building.

---

## 6. Risks

| ID | Risk | Severity | Mitigation |
|----|------|----------|------------|
| R-T1 | Trainer internals unknown → extend-vs-rehost cannot be finalized | High (meta) | **Step-0 audit** (§7) before committing |
| R-T2 | Extending a monolithic client app to credential-grade persistence → high rework, fragile | High | Hybrid (preserve engine, re-host platform) |
| R-T3 | Re-host regresses or temporarily loses the operational tool | Med | Keep v1.4.0 running until the shell reaches parity; port engine first |
| R-T4 | Ported/loader-fed engine produces numeric discrepancies | High | Re-validate against canonical invariants (§9) + M04 hand-calc cross-check |
| R-T5 | Persistence/account scope balloons (Trainer is now the whole platform) | High | Minimal-viable: one module (M04) through the full pipeline before scaling |
| R-T6 | Student-data obligations once accounts exist (privacy; FERPA for credit) | Med | Address in the persistence design; credit framework owns compliance |
| R-T7 | Parameter drift if the engine bypasses the canonical loader | Med | Enforce CANONICAL §9 invariants + literal-grep CI |
| R-T8 | Multi-learner concurrency/scaling after accounts | Med | Plan server store for concurrency from the start |

---

## 7. Recommended implementation sequence

Ordered to preserve the validated engine, prove the pipeline on one module early, and defer heavy persistence until the contract is proven. **No code is authorized by this review** — this is the sequence to follow once a build is approved.

0. **Audit Trainer v1.4.0 internals** — modularity, engine separability, current persistence, parameter handling. Resolves R-T1; converts the §2 recommendation from conditional to final. *(Assessment only; no modification.)*
1. **Build platform-agnostic foundations** — the canonical loader (`parameters.py`) + invariants and the `workcell_state` schema. Needed on either path.
2. **Decide extend / re-host / hybrid** from the audit. Default expectation: **hybrid** (preserve engine, re-host platform).
3. **Stand up persistence** — local sandbox first (serves OD-3 practice), then account-backed for credential mode (OD-2).
4. **Prove the pipeline on M04** — fold `cylinder_simulation` through the full Module Integration Contract (parameters → engine → state → artifact → portfolio). One module, end to end, validated against the M04 hand-calc.
5. **Benchmark runners + scoring** — positioning first (executable now), writing scored evidence to state.
6. **Portfolio** — derived view + export bundle.
7. **Credential evidence storage** — server DB + signed records; wire to the certification evidence bundles.
8. **Resume M05–M12 surfaces Trainer-first** — only after the contract is proven on M04 and the build path is fixed.

**Critical-path note:** steps 0–4 are the spine. A working M04 slice with account-backed evidence is the proof that the platform model holds; everything after it is replication and scale.

---

## 8. Decisions this review informs (does not unilaterally resolve)

| OD | Position from this review |
|----|---------------------------|
| OD-1 (extend vs re-host) | **Conditional: hybrid** — preserve engine, re-host platform; finalize after Step-0 audit |
| OD-2 (persistence) | server DB + signed records for credentials; local for practice (satisfies certification §7) |
| OD-3 (sandbox vs canonical state) | local sandbox for practice, server-synced canonical state for credentials |
| OD-4 (tech stack) | deferred to Step-0 audit; engine language likely retained, shell to match |

These remain owned by the Trainer build; this review supplies the analysis, not the final commitment.

---

*End of `TRAINER_PLATFORM_DECISION_REVIEW.md` v1.0. Gap analysis, extend-vs-rehost (conditional: hybrid), persistence/portfolio/credential options, risks, and sequence delivered. Final commitment gated on the Step-0 internals audit, because the Trainer repository was not accessible to this review. No code; no Trainer modification.*
