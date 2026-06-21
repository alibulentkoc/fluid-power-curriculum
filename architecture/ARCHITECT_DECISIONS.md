# ARCHITECT_DECISIONS.md

**Project:** Fluid-Powered Physical AI Curriculum
**Document type:** Authoritative decisions register
**Version:** 2.2 (dependency stability)
**Last updated:** 2026-06-21
**Status:** Authoritative for architectural decisions and the single open-decision register.

**Changelog:** v2.2 — adopted the Dependency Stability Directive; recorded `js-yaml` removal for a vendored zero-dependency YAML reader, artifact byte-identical (D13). v2.1 — recorded the ratified EXTEND-IN-PLACE decision (D10); resolved OD-1's strategic question (extend, not re-host); demoted OD-3/OD-4 to implementation-time; added D11 (Trainer Stages 1–4 are the build path that unfreezes M05–12) and D12 (build-time canonical-parameter injection + parity verify). v2.0 — transformation consolidation.

**Extension note:** v2.0 *extends* the pre-existing ARCHITECT_DECISIONS.md; it does not overwrite it. Pre-transformation decision entries are preserved in §1 and must be merged in verbatim from the original (see H-1). The transformation register (§2–§3) is additive.

---

## 0. Purpose and how to read this register

This is the one place architectural decisions and open decisions live. It replaces the scattered per-document decision IDs (D-T*, D-LJ*, D-CM*, D-AM*, P*) with a single consolidated register, removing duplicates. The per-document IDs remain valid as **aliases** (§4) so existing references resolve.

Three classes:
- **§1 Pre-transformation decisions** — the original curriculum's design rationale (preserved).
- **§2 Transformation decisions (D1–D7)** — settled decisions of the platform transformation.
- **§3 Open-decision register (OD-1…OD-10)** — unresolved decisions, deduplicated, with owners; certification-owned ones are the current focus.

---

## 1. Pre-transformation decisions (PRESERVE — merge from original)

> **H-1 (hygiene action):** the original `ARCHITECT_DECISIONS.md` text is not reproduced here because it was not available to this consolidation pass. Its entries must be pasted into this section verbatim before publication, so no prior rationale is lost. Known referenced decisions to confirm during merge:
> - MkDocs Material as the presentation layer, built from `modules/` + `curriculum/` sources.
> - The module-scale decision recorded in `CURRICULUM_ENGINEERING_METHODOLOGY.md` §22 (valid alternative implementation).
> - HTML-tool governance conventions (pin CDN versions; vendor/inline for long-lived tools; JSX precompilation over in-browser Babel; `src/` + build-artifact structure) — confirm which are repo-level ADRs.

These are **not** reopened by the transformation; they are preserved. This section is a merge placeholder, not a rewrite.

---

## 2. Transformation decisions (settled)

Each: decision · rationale · source · what it blocks/enables · status.

| ID | Decision | Rationale | Source | Blocks / enables | Status |
|----|----------|-----------|--------|------------------|--------|
| **D1** | Adopt the Trainer-centered platform target | Directive v3.0 mandates it; the existing build was lesson-primary with orphan widgets | Directive v3.0; Transformation Plan §0 | Enables the entire transformation | Accepted |
| **D2** | Bypass Stage 2 (Delivered Curriculum); go Stage 1 → Stage 3 | Building the platform is higher-leverage than finishing 12 modules in the old model | PROJECT_STATE §2 | Defers conventional course completion | Accepted |
| **D3** | Freeze M05–12 lesson production until Trainer build-out | Writing lessons before the Trainer I/O contract guarantees mass retrofit (Risk R1) | Transformation Plan §5, §14 | Blocks Phase 3; enables rework avoidance | Enforced |
| **D4** | Pull Phase 5 (Trainer integration) ahead of Phase 3 (lessons) | Architecture must exist before lessons are built against it; deliberate deviation from the directive's literal phase order | Transformation Plan §14 | Sets build order | Accepted (deviation flagged) |
| **D5** | `PROJECT_STATE` + `master_progress` authoritative for state; demote `FINAL_COMPLETION_REPORT` | Completion claim contradicted the *Planned* artifact status | PROJECT_STATE §9 (C1) | Blocks state-trust ambiguity | Accepted (H-2 pending) |
| **D6** | All 7 Phase 2B documents approved; Phase 2B complete | 7/7 exist, 5/5 consistency checks passed | Phase 2B Closure Report | Enables certification phase entry | Accepted |
| **D7** | Defer `Evidence Maturity` and `parameter_registry.csv` | Not needed until the model expands; recorded now, built later | Assessment §9; Canonical §11 | Blocks nothing now | Deferred |
| **D10** | **EXTEND the Trainer in place; do not re-host or rewrite** | Repo facts: pure separated `calculate()` engine, offline single-file invariant, no-rewrite constitution. Re-host would violate the Trainer's own invariants; extension is its chosen path (Phase 5/8 seams) | `TRAINER_PLATFORM_DECISION_REVIEW.md`; Trainer repo (README, ARCHITECTURE.md); Post-Decision Directive | Resolves OD-1 strategic question; sets all Trainer implementation | Accepted |
| **D11** | **Trainer Stages 1–4 are the build path that unfreezes M05–12** | Lesson production was frozen pending Trainer build-out (D3/R1); Stages 1–4 (dynamic sim, canonical integration, `workcell_state`, benchmark runners) *are* that build-out | Post-Decision Directive; Transformation Plan §14 | Gates resumption of M05–12 production | Accepted |
| **D12** | **Canonical parameters integrated at build time, with a parity `verify` step** | Trainer guardrails (offline, no convenience deps) disfavor runtime YAML load; build-time injection + parity check keeps one truth source without breaking offline | Post-Decision Directive Stage 2; Canonical §9; Trainer invariants | Resolves the two-sources-of-truth risk | Accepted |
| **D13** | **Adopt the Dependency Stability Directive; remove `js-yaml`, vendor a zero-dependency YAML reader** | Directive rule 9 (prefer built-in/vendored over a new dependency) + rule 15 (freeze default). `js-yaml` was a Stage-2 add, not yet in any released tag; replaced by a strict vendored reader (`scripts/lib/yamlMini.mjs`). Build artifact verified **byte-identical** (SHA-256 `6deaac8d…c93a53`), so no behavior change (rule 8). Build is now zero external runtime/dev dependencies. | Dependency Stability Directive; artifact-hash comparison | Restores exact-pin / `npm ci` / freeze compliance; future dep changes need a review branch + the seven required checks | Accepted |

---

## 3. Open-decision register (consolidated, deduplicated)

Single source for unresolved decisions. Duplicates that appeared under multiple per-document IDs are merged (see "Merged from"). **Owner** indicates which framework resolves it.

| OD | Decision | Rationale / why open | Merged from | Owner | Blocks | Status |
|----|----------|----------------------|-------------|-------|--------|--------|
| **OD-1** | Trainer extend vs re-host → **strategic question RESOLVED: EXTEND (D10)**; only *extension mechanics* remain | Settled by repo facts + Post-Decision Directive; mechanics are implementation detail | D-T1 | Trainer build | — | **Resolved (strategic); mechanics → implementation-time** |
| **OD-2** | State persistence / credential evidence | **RESOLVED:** certification §7 sets the requirement (durable, attributable); EXTEND directive Stages 5–6 set the mechanism (offline signed export → optional external service; no backend in core) | D-T2, **D-AM3** | Certification + Trainer build | — | **Resolved** |
| **OD-3** | Sandbox vs canonical learner state | Resolve when implementation requires (per directive) | D-T3 | Trainer build | Lesson↔Trainer wiring | Open (implementation-time) |
| **OD-4** | Trainer module implementation details (stack settled: **React 18 + esbuild single-file**, D10/D12) | Stack decided; only per-module detail remains | D-T4 | Trainer build | M05+ surfaces | Open (implementation-time) |
| **OD-5** | Credential structure | **RESOLVED:** four stackable credentials = four levels of one progressive certification (CERTIFICATION_FRAMEWORK §2) | D-LJ1 | Certification | — | **Resolved** |
| **OD-6** | Mid-arc placement / test-out | **RESOLVED:** placement = earn the prior credential by evidence; no separate exam (CERTIFICATION_FRAMEWORK §6) | D-LJ2 | Certification | — | **Resolved** |
| **OD-7** | Technician/workforce variants: alter module *depth* or only the stop point | Determines whether content forks or only the target identity differs | D-LJ3 | Workforce framework (certification accommodates) | Path tiering | **Open** (only remaining framework-level OD) |
| **OD-8** | Enabling-competency coverage for a summative pass | **RESOLVED:** all, verified holistically via the integrating artifact + benchmark (CERTIFICATION_FRAMEWORK §9) | **D-CM2, D-AM2** | Certification | — | **Resolved** |
| **OD-9** | Summative re-take policy | **RESOLVED:** unlimited at certification layer, logged; credit path may constrain (CERTIFICATION_FRAMEWORK §8) | **D-CM3, D-AM1** | Certification | — | **Resolved** |
| **OD-10** | C1/C2 at Analyst | **RESOLVED:** joint — Analyst credential requires both (CERTIFICATION_FRAMEWORK §2) | D-CM1 | Certification | — | **Resolved** |

**Deduplication performed:** OD-2 (D-T2 = D-AM3), OD-8 (D-CM2 = D-AM2), OD-9 (D-CM3 = D-AM1) were each one decision named in two documents — now single canonical entries.

**Register status (2026-06-21):** Of ten ODs, **OD-2, OD-5, OD-6, OD-8, OD-9, OD-10 are resolved** (certification framework) and **OD-1 strategically resolved** (EXTEND). **OD-3 and OD-4 are deferred to implementation-time** (resolve when the build requires). **OD-7 (workforce tiering) is the only framework-level decision still open**, owned by the future workforce framework.

**Parameter provisional actions** (P1–P4, Canonical §10) are tracked as verification debt in `master_progress.md` (A1), not as architectural decisions; they do not gate certification.

---

## 4. Alias map (per-document IDs → canonical OD)

So existing references in the Phase 2B documents still resolve:

| Document alias | Canonical |
|----------------|-----------|
| D-T1 | OD-1 |
| D-T2 | OD-2 |
| D-T3 | OD-3 |
| D-T4 | OD-4 |
| D-LJ1 | OD-5 |
| D-LJ2 | OD-6 |
| D-LJ3 | OD-7 |
| D-CM1 | OD-10 |
| D-CM2 / D-AM2 | OD-8 |
| D-CM3 / D-AM1 | OD-9 |
| D-AM3 | OD-2 |

---

## 5. Documentation-hygiene actions

Closing the issues that would otherwise make certification **ambiguous**. Items required before certification design vs deferrable are marked.

| ID | Hygiene issue | Why it matters for certification | Required before certification? |
|----|---------------|----------------------------------|-------------------------------|
| **H-1** | Merge the original ARCHITECT_DECISIONS.md entries into §1 | Preserves prior rationale; no certification impact | No (do before publication) |
| **H-2** | Physically demote `FINAL_COMPLETION_REPORT.md` (add pointer to `PROJECT_STATE.md`) | A live "complete" claim makes credential state ambiguous | **Recommended before** |
| **H-3** | **Canonical credential vocabulary** (resolved below) | Certification cannot be written precisely if "credential / certificate / certification / evidence bundle" are used loosely | **Yes — resolved now** |

### H-3 resolution — canonical vocabulary (effective immediately)

To remove ambiguity before certification is written, these terms are fixed:

- **Certification framework** — the governing system that issues credentials from evidence.
- **Credential** — what a learner earns at an identity checkpoint (the four in `LEARNER_JOURNEY.md` §5: Analyst, Designer, Electrohydraulic Engineer, Physical AI Engineer).
- **Evidence bundle** — the set of summative artifacts + benchmark scores that a credential requires (`ASSESSMENT_MAP.md` §9). The unit certification reads.
- **Certificate** — an optional issued document/record attesting a credential. A presentation of a credential, not the credential itself.
- **Summative evidence** — the only input to a credential (never formative/quiz results).

These definitions are now canonical; the certification framework and all later documents use them as defined.

---

## 6. Current focus — Trainer implementation (EXTEND)

The certification-owned decisions are now resolved (§3). The current focus is the **Trainer EXTEND build path (D10–D12)** and one remaining framework decision:

- **Stages 1–4 of the Trainer build** (dynamic simulation → canonical integration → `workcell_state` → benchmark runners) — the path that **unfreezes M05–12 production** (D11). Each lands as a new isolated module behind the existing esbuild build with the `verify`/`smoke` gates; `calculate()` is never touched (Trainer invariants).
- **OD-3, OD-4** — resolve at implementation-time as the build requires.
- **OD-7** (workforce path tiering) — the only open framework-level decision; owned by the future workforce framework, accommodated by certification (path subsets).

Stages 5–6 (evidence export → optional external credential service) implement the resolved OD-2 mechanism and keep the Trainer offline.

---

## 6b. Dependency stability policy (standing, per the Dependency Stability Directive)

Governing for all Trainer build work. Default is **freeze, not upgrade**.

- Exact-pin every dependency (no `^ ~ * x`); commit the lockfile; install with `npm ci`, never `npm install`, in normal builds.
- Prefer **built-in or vendored** code over a new dependency (rule 9). No runtime dependency loading, CDN assets, or auto-updating packages.
- A dependency change is **maintenance, not feature work**: it needs a dedicated review branch, a documented reason here + in the release notes, and must pass the **seven required checks** before merge — exact pin, lockfile consistency, offline build, verify gate, smoke gate, **artifact-hash comparison**, release-tag preservation.
- If a change alters behavior, reject it unless explicitly approved; if the app breaks after an update, revert immediately. Keep one known-good release tag untouched at all times.

Current state: the simulation/canonical/state build has **zero external dependencies** (D13 removed `js-yaml` for a vendored reader). The shipped artifact remains offline and dependency-free.

**Release Safety Rule (preservation-first):** no dependency update merges unless the new build is **byte-for-byte reproducible** or the delta is **explicitly approved**. Never change dependencies as part of a feature request; never combine a dependency update with feature work; never let a dependency update alter the shipped offline artifact without explicit approval; never lose a previously working release.

---

## 7. Update protocol

A decision moves from §3 (open) to §2 (settled) only with a recorded rationale, source, and date, and a version bump. New decisions are added to §3 with an owner. Per-document IDs are never reused; they alias to OD entries (§4).

---

*End of `ARCHITECT_DECISIONS.md` v2.2. EXTEND ratified (D10); certification ODs resolved; OD-3/OD-4 implementation-time; OD-7 remains. Dependency Stability Directive adopted; `js-yaml` removed for a vendored zero-dependency reader, artifact byte-identical (D13); standing dependency policy recorded (§6b).*
