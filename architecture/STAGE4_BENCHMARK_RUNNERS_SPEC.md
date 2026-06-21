# STAGE 4 — BENCHMARK RUNNERS & SCORING SPECIFICATION

**Project:** Fluid-Powered Physical AI Platform
**Document type:** Implementation specification (Stage 4 of the EXTEND build)
**Version:** 1.1
**Last updated:** 2026-06-21
**Authority:** Stage 4 Directive (Benchmark Runners and Scoring) · `ASSESSMENT_MAP.md` · `CERTIFICATION_FRAMEWORK.md`
**Consumes (read-only):** Stage 3 `workcell_state` (which holds Stage 1 twin + Stage 2 canonical provenance)
**Status:** Specification only. **No code.** Defines `src/benchmarks/`.

**Changelog:** v1.1 — aligned to the Stage 4 Directive. Runners are now **pure scorers over stored
`workcell_state`** — they do **not** call `simulate()` or duplicate simulation logic (state-driven
requirement). Adopted the directive's exact per-runner reads/outputs, the formative/summative
boundary, the "apply not define" score policy, and the directive's implementation order +
acceptance criteria. v1.0 — initial spec (positioning re-ran the simulation; superseded).

---

## 0. Context and constraints (binding)

Stage 4 turns stored Trainer state into **deterministic benchmark scoring**. It **adds benchmark
runners only**. It must NOT modify: `calculate()`, `src/core/engine.js`, Stage 1 simulation logic,
Stage 2 canonical integration, or Stage 3 `workcell_state` design.

- **State-driven (decisive):** runners read from `workcell_state` **only**. They do **not** re-run
  lesson logic and do **not** duplicate simulation logic. The twin's trajectory/benchmark inputs are
  produced in Stage 1 and stored in state (Stage 3); Stage 4 **scores what is stored**.
- **Deterministic:** same state + same parameters + same runner inputs ⇒ same score.
- **Offline / pure:** no network, no backend, no runtime remote calls; zero external dependencies.
- **Evidence-based:** runners emit **evidence records**, not UI messages.
- **Formative/summative boundary:** benchmark evidence is **summative**. Runners never read or score
  formative/quiz data; only summative artifacts in state feed a score.
- **One truth source:** physical values and benchmark **acceptance criteria** both come from
  canonical (a version-tracked `benchmarks:` group); runners **apply** criteria, never define them.
- **Fail loud:** missing prerequisites, stale state, or invalid inputs **refuse to score** and explain.

---

## 1. Purpose

Create three Trainer benchmark runners — **positioning**, **force**, **autonomous** — that read
`workcell_state`, score the stored artifacts against the canonical acceptance criteria, and emit
scored evidence for certification (Stage 5 export). No new curriculum architecture, competencies,
benchmark types, or scoring categories.

---

## 2. Module boundaries

```
src/benchmarks/
  index.js         # public API: runBenchmark(name, state, canonical, opts) / runAll(state, canonical)
  positioning.js   # positioning runner + scorer (executable now: twin slot is populated)
  force.js         # force runner (capability proxy from stored twin; full scoring pending sensors/control)
  autonomous.js    # autonomous runner (pending integrated_twin/demonstration)
  scoring.js       # shared scoring utilities: threshold comparison, pass/fail, score-record shape
  evidence.js      # shape a scored result into a stored evidence record
```
- **Pure, dependency-free, state-only.** Read artifact slots read-only; **no `simulate()` call**;
  write only into the evidence path (`state.benchmarks`).
- Does **not** touch `calculate()`/engine, the Stage 1–3 modules' logic, or add any dependency.

---

## 3. The three runners (directive reads/outputs)

### 3.1 Positioning runner — executable now
- **Reads (from state):** `twin.cylinder`, `twin.pressures`, the Stage 1 benchmark inputs stored on
  the twin artifact (`twin.artifact.benchmarkInputs.positioning`).
- **Outputs:** position error, settling time, overshoot, pass/fail, evidence record.
- **Scores:** position error against the canonical positioning criterion (`benchmarks.positioning_tolerance`,
  default `±1 mm`). Reads only stored signals; if the stored artifact has no target/error (twin not run
  toward a target), it refuses with `not_available` (fail loud) rather than inventing a scenario.

### 3.2 Force runner — capability proxy now, full scoring pending prerequisites
- **Reads (from state):** `sensors`, `control`, `twin` pressure/force data, plus Stage 3 benchmark
  inputs and the stored Stage 1 trajectory data.
- **Outputs:** commanded force vs achieved force, stability metrics, safety flags, pass/fail, evidence.
- **Now:** `sensors` (M09) and `control` (M10) slots are unbuilt → the runner reports `not_available`
  for commanded-vs-achieved force scoring, naming the missing slots. It still computes the **force
  capability** from stored twin pressures (`F = P_b·A_b − P_r·A_r`) and a **safety flag** (cavitation/
  over-pressure from stored provenance) as informational metrics. No fabricated grip pass.
- **Scores (when prerequisites exist):** achieved vs commanded force against `benchmarks.force_target`
  (default `20 N`) with the stability/safety criteria.

### 3.3 Autonomous runner — pending prerequisites
- **Reads (from state):** `integrated_twin`, `demonstration`, all relevant prior slots, and the
  benchmark inputs from the full machine state.
- **Outputs:** autonomous task-completion result, residual/fault-monitoring result, intervention flag,
  pass/fail, evidence.
- **Now:** `integrated_twin` (M11) and `demonstration` (M12) are unbuilt → `not_available`, naming the
  missing slots; forward-compatible evidence shape so no signature change when they land.

---

## 4. Inputs and how each runner reads `workcell_state`

Each runner consumes: `workcell_state`, the canonical **parameter version** (from state/artifacts),
the **benchmark target values** (canonical `benchmarks` group), and runner-specific options.

- A required slot must be `populated` and **not stale** (Stage 3 status). Missing → `not_available`
  (reason: prerequisite missing); stale → `not_available` (reason: stale prerequisite; re-run it).
- The runner pulls `params_version` and propagated `provisional[]` from the artifact provenance into
  the evidence (maturity carries to credentials).
- Reads are **read-only**; runners never mutate an artifact slot and never call simulation.

---

## 5. Outputs — the evidence record (summative)

Each runner emits a stored evidence record:
```js
evidence = {
  benchmark: 'positioning',
  status: 'pass' | 'fail' | 'not_available',
  score_summary: <short string>,
  measured: { position_error: 0.6, settling_time: 0.12, overshoot: 0.0, ... },  // runner-specific
  criterion: { name, threshold, unit, comparator },     // the applied canonical criterion
  pass: true | false | null,                            // null when not_available
  params_version: 'wp-1.0.0',
  state_version: 'ws-1.0.0',
  provisional: ['valve.discharge_coeff', ...],
  prerequisites: ['twin'],
  deterministic: true,
  produced_at: <ISO>,                                   // recorded, NOT scored
  reason: <string|null>,                                // why not_available, if applicable
}
```
- **Summative only:** this record derives solely from summative artifacts; no formative/quiz input.
- Written to the **Trainer evidence path** `state.benchmarks[name]` (the 12 artifact slots stay
  artifact-only) **and** returned. `runAll` yields the full set for Stage 5 and certification.
- **Score policy:** binary **pass/fail** against the canonical criterion (deterministic ⇒ unlimited
  re-attempts per `CERTIFICATION_FRAMEWORK.md`); `measured` values are feedback, not the gate.
  `not_available` is neither pass nor fail.

---

## 6. Determinism and offline

- Runners add no randomness and no wall-clock logic. They score **stored** values, so a fixed
  `(state, canonical)` yields identical `status` + `measured` every run (verify check, §8).
- `produced_at` is provenance only — never an input to a score.
- Pure, offline, zero dependencies; nothing leaves the artifact.

---

## 7. Score policy and where criteria live (apply, do not define)

Runners **apply** the canonical acceptance criteria already defined in the architecture; they do not
define success standards or invent categories. Criteria live in a version-tracked `benchmarks:` group
in `workcell_parameters.yaml`:
```yaml
benchmarks:
  positioning_tolerance: { value: 0.001, unit: m, status: locked, owner_module: M04, source: benchmark_spec }
  force_target:          { value: 20,    unit: N, status: locked, owner_module: M07, source: benchmark_spec }
```
Carried through the existing build-time generation (versioned + checksummed); `build-params.mjs`
extends to expose the `benchmarks` group. No model change; one truth source.

---

## 8. Verification strategy

Extend the chained gate (after `verify-state.mjs`):

- **positioning pass** — a stored twin within tolerance scores `pass` (`position_error ≤ tolerance`).
- **positioning fail** — a stored twin outside tolerance scores `fail` — gate discriminates, not rubber-stamps.
- **prerequisite honesty** — positioning on a state with empty/stale `twin` → `not_available`, right reason.
- **force** — reports capability + safety flag; `not_available` for commanded-vs-achieved (no sensors/control).
- **autonomous** — `not_available`, prerequisites named.
- **determinism** — same `(state, canonical)` → identical evidence.
- **evidence shape** — record validates; carries `params_version`, `state_version`, provisional flags.
- **criteria source** — threshold read from canonical `benchmarks` group, not a literal.
- **summative boundary** — runner ignores any non-summative field; scores only summative artifacts.

**Smoke:** with a populated twin, run positioning, get a scored evidence record offline.

---

## 9. Failure modes (fail loud)

| Failure mode | Handling |
|--------------|----------|
| Prerequisite slot empty | `not_available` (prerequisite missing); never score |
| Prerequisite stale | `not_available` (stale); re-run the artifact first |
| Benchmark needs unbuilt module (force commanded/achieved, autonomous) | `not_available`, prerequisites named; no fabricated pass |
| Stored artifact missing the needed signal (e.g. no target/error) | `not_available`; runner does not invent a scenario |
| Criterion missing from canonical | gate fails (one-truth-source violation) |
| Non-determinism introduced | determinism gate fails |
| Scoring on provisional params | evidence carries `provisional[]`; still scored |
| Reachable-target exceeded (stored result) | positioning `fail` (honest physical result), not an error |

Principle: a benchmark produces a reproducible scored result or an honest `not_available` — never a
silent or fabricated pass.

---

## 10. Interaction with the prior stages (no modification)

- **`calculate()`/engine:** untouched.
- **Stage 1 simulation:** not re-run, not duplicated; the runner reads its stored output.
- **Stage 2 canonical:** physical values + criteria sourced from it (one truth source).
- **Stage 3 state:** artifact slots read-only; evidence written only to `state.benchmarks`; persisted
  via the existing Stage 3 adapter (no new persistence).

---

## 11. Implementation order (directive)

1. Build positioning runner.
2. Build force runner.
3. Build autonomous runner.
4. Add shared scoring utilities.
5. Add runner fixtures and regression tests.
6. Wire into verify and smoke gates.
7. Confirm offline operation and deterministic output.

---

## 12. Acceptance criteria (Stage 4 complete when)

- all three runners exist;
- each runner reads from `workcell_state`;
- each runner emits scored evidence;
- each runner is deterministic;
- each runner runs offline;
- verify and smoke gates pass;
- no curriculum or engine invariants are broken.

---

## 13. Definition of done

When §12 holds with positioning fully scored (pass + fail verified), force/autonomous fail-honest
(`not_available`, prerequisites named, capability/safety informational for force), evidence written to
`state.benchmarks`, determinism + criteria-source + summative-boundary gates passing, `calculate()`/
engine byte-identical, offline, zero external dependencies — Stage 4 is complete. That makes **4 of 4**
unfreeze stages built (D11): the platform produces reproducible, version-tracked summative evidence,
and **M05–12 production may unfreeze**. Force/autonomous become fully scorable as M07/M09/M10/M11 land.

---

*End of Stage 4 Benchmark Runners & Scoring Specification v1.1. Runners are pure, deterministic,
offline scorers over stored `workcell_state` — no simulation re-run, no new criteria. Positioning is
fully scorable now; force and autonomous are fail-honest until their prerequisite slots exist. No code.
Awaiting approval to implement.*
