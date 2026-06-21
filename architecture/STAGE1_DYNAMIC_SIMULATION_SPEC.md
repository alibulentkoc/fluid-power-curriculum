# STAGE 1 — DYNAMIC SIMULATION MODULE SPECIFICATION

**Project:** Fluid-Powered Physical AI Platform
**Document type:** Implementation specification (Stage 1 of the EXTEND build)
**Version:** 1.0
**Last updated:** 2026-06-21
**Authority:** Master Implementation Directive · `ARCHITECT_DECISIONS.md` D10–D12
**Consumes:** `CANONICAL_PARAMETER_MODEL.md`, `TRAINER_INTEGRATION_ARCHITECTURE.md`, curriculum M04 reference (`cylinder_simulation`)
**Status:** Specification only. **No code.** Defines the `src/simulation/` module to be built next.

---

## 0. Context and constraints (binding)

The Trainer is a single-file, offline, React 18 + esbuild application whose physics today is the **pure, steady-state** `calculate()` engine in `src/core/engine.js`. This module adds a **dynamic** capability the engine does not have. It is bound by the Trainer's non-negotiable invariants:

- offline, single-file deployable; **no network, no runtime config load, no convenience dependencies**;
- `calculate()` is **never modified** by this work;
- simulation and sizing logic are **never combined**;
- **one** parameter source (canonical), integrated at build time (D12).

A consequence that shapes the whole design: the curriculum's reference implementation is Python/SciPy (`solve_ivp`), but this module runs in **offline browser JS**. It must therefore ship a **small, embedded numerical integrator** (no heavy npm solver dependency), and the reference Python outputs become the **verification oracle**, not a runtime dependency.

---

## 1. Purpose

Add a dynamic-simulation capability that predicts the workcell cylinder's **motion over time** from a valve command — position, velocity, and chamber pressures — so the Trainer can:

1. realize the **M04 digital-twin** requirement (the coupled cylinder ODE that `calculate()` cannot produce);
2. feed the **benchmark runners** (Stage 4) with the time-series they score;
3. seed the twin progression that later stages (sensors, control, integrated twin) extend.

**Explicit non-goals:** this module does **not** size components, does **not** replace or call `calculate()` for sizing, and does **not** issue credentials. It computes transient behavior; that is all.

---

## 2. Module boundaries

### 2.1 Location and shape
```
src/
  core/
    engine.js            # calculate() — UNTOUCHED by this work
  simulation/
    index.js             # public API surface (the only import point for the app)
    model.js             # the ODE right-hand side: friction, valve, force balance, pressure
    integrator.js        # embedded RK45 (Dormand–Prince); pure, dependency-free
    params.js            # adapts canonical parameters → simulation inputs (derived areas, SI)
    benchmarkInputs.js   # shapes outputs into what Stage 4 runners consume
```
Carved along a clean seam exactly as `src/core/engine.js` was (ADR-style), bundled by the existing esbuild build, behind the existing `verify`/`smoke` gates.

### 2.2 Hard isolation rules
- **Pure module.** No React, no DOM, no global state, no I/O. Inputs in → results object out (the same discipline that makes `calculate()` testable).
- **No shared mutable state with `calculate()`.** They may read the *same canonical parameters* but share no runtime objects.
- **No sizing logic.** If a quantity is a sizing concern, it belongs to `calculate()`, not here.
- **Deterministic.** Same inputs + same `params_version` ⇒ bit-stable-enough output (within documented numerical tolerance).

### 2.3 What is in vs out of Stage 1
- **In (primary):** the **quasi-static 2-state model** `[x, v]` — non-stiff, robust, the curriculum's primary model — with an embedded RK45 integrator; friction, valve, and force-balance sub-models; canonical-parameter adaptation; benchmark-input shaping.
- **In (secondary, optional within Stage 1):** the **full 4-state model** `[x, v, P_b, P_r]` as a stiffness demonstrator. It requires stiff-aware integration; if a robust embedded stiff integrator is not in scope now, this is **deferred to Stage 1b** and the module ships the quasi-static model first. *(Flagged decision OD-4 detail.)*
- **Out:** sensors, control loops, multi-cylinder, the M11 integrated twin — all later stages.

---

## 3. Inputs

### 3.1 Canonical parameters (build-time injected; SI internally)
Consumed by key from `workcell_parameters.yaml` (status in parentheses):

| Group | Keys |
|-------|------|
| cylinder | `bore_d` (🔒), `rod_d` (🔒), `stroke` (🟡), `dead_volume_bore` (🟡) |
| fluid | `bulk_modulus_effective` (🔒), `density` (🟡) |
| dynamics | `mass` (🔒), `friction_coulomb` (🔒), `friction_static` (🔒), `friction_viscous` (🔒), `stribeck_velocity` (🔒), `load_nominal` (🟡) |
| supply | `pressure` (🔒) |
| valve | `discharge_coeff` (🟡), `model` (form, 🔒) |

**Derived at load (never stored):** `A_b = π·bore_d²/4`, `A_rod = π·rod_d²/4`, `A_r = A_b − A_rod`. `params.js` owns this and must match the canonical loader exactly.

**Provisional handling:** any 🟡 input (density, Cd, load, stroke, dead volume) is accepted but its provisional status is **propagated to the output** (§4.3), so downstream benchmark/credential evidence can carry a maturity flag. The module never silently treats a provisional value as final, and **refuses to run** if a required key is `tbd`.

### 3.2 Trainer state
Reads (when present) prior artifacts from `workcell_state`: `fluid`, `hardware`. Writes its result to `twin.cylinder` / `twin.pressures` (§5).

### 3.3 Runtime / learner inputs
- **Valve command profile** `u(t)`: at minimum a piecewise-constant schedule (e.g., extend `u=+1` for `t_extend`, then `u=0` hold; optional retract `u<0`). `u ∈ [−1, +1]`.
- **Durations / horizon:** `t_extend`, `t_hold`, optional `t_retract`, total `t_end`.
- **Solver options:** tolerances (`rtol`, `atol`), max step; sensible defaults supplied.
- **Model select:** `quas_static` (default) | `full` (if 1b present).

---

## 4. Outputs

A single results object (the engine's "inputs in, results out" pattern).

### 4.1 Trajectory (time series)
Arrays sampled at solver output points (and/or a fixed display grid): `t[]`, `x[]` (m), `v[]` (m/s), and for the full model `P_b[]`, `P_r[]` (Pa). Quasi-static reports `P_b`, `P_r` as the algebraically-solved instantaneous values.

### 4.2 Summary
`v_steady` (steady extend velocity), `settle_position`, `settle_time`, `peak_velocity`, `reached_position`, and per-phase markers (extend/hold/retract). Units SI internally; display conversion (mm, mm/s, bar) at the UI boundary only.

### 4.3 Provenance / maturity block
`params_version`, `model` used, solver + tolerances, list of any **provisional** parameters in play, and a boolean `validated_against_reference` (set by the verify gate, §7). This block is what makes a run reproducible and is required by Stage 5 evidence export.

### 4.4 Benchmark inputs
A shaped sub-object (`benchmarkInputs.js`) exposing exactly what the Stage 4 runners need, derived from the trajectory — e.g. for positioning: final position error vs target, settling time, overshoot, hold stability. The module **computes the signals**; the runners (Stage 4) **score** them. No scoring logic lives here.

---

## 5. State integration

- **Writes** `workcell_state.twin.cylinder` (the simulation artifact: summary + a reference to/inline of the trajectory) and `twin.pressures`.
- **Append-and-refine, never overwrite foreign slots.** The module fills only its own twin slots; it reads `fluid`/`hardware` but does not modify them.
- **Version pinning.** The written artifact records the `params_version` it ran against; on a later parameter bump the Trainer can flag the artifact stale (per `TRAINER_INTEGRATION_ARCHITECTURE.md` §11).
- **Persistence reuse.** This **extends** the Trainer's existing v1.2.0 persistence/export; it does not introduce a new store. *(OD-3 — whether a run targets a practice sandbox copy or canonical state — is resolved at Stage 3 wiring time; this module is indifferent, taking the target state object as a parameter.)*

---

## 6. Benchmark integration

- The **positioning** benchmark is the first consumer and is **executable now** (it only needs the simulated trajectory). The module's `benchmarkInputs` must expose position-vs-time, steady velocity, settle time, overshoot, and hold stability.
- **Force** and **autonomous** benchmarks consume the same trajectory plus capabilities added in later stages (sensors M09, control M10); the module's output schema must be **forward-compatible** with them (include pressures and a stable result shape) but Stage 1 only guarantees positioning inputs.
- **Determinism is a benchmark requirement:** a scored run must be reproducible from `params_version` + inputs (§7), because Stage 4 evidence and Stage 5 export depend on it.

---

## 7. Verification strategy

This is the load-bearing section. The module is unverified until all of the following pass, wired into the Trainer's existing `verify`/`smoke` gate.

### 7.1 Reference-oracle parity (the primary check)
Validate against the curriculum M04 reference (`cylinder_simulation`) golden values, stored as fixtures:

| Check | Reference | Tolerance |
|-------|-----------|-----------|
| Steady extend velocity (quasi-static) | **82.3 mm/s** | within ±2% |
| Trajectory points (t=0.05→2.9 mm; 0.10→7.0; 0.25→19.3; 0.50→39.9; 1.00→81.0 mm) | M04 worked-example table | within ±2% per point |
| Hold behavior | reaches ~82.3 mm, v→0 on `u=0` | qualitative + final-value |
| Analytical cross-check | Module 01 ~85 mm/s | within ±10% |

If the full 4-state model ships (1b): it must settle to the **same** steady velocity (82.3 mm/s) and show the pressure build (≈2→73 bar in the first ~10 ms) then breakaway to P_b≈26 bar / P_r≈37 bar during motion — the curriculum's two-models-agree validation.

### 7.2 Internal-consistency invariants (from `CANONICAL_PARAMETER_MODEL.md` §6, §9)
- `A_b > A_r > 0`, area ratio ≈ 1.457;
- operating-point sanity: `Q/A_b ≈ v_steady` within ±10%;
- no NaN/Inf in any output; pressures bounded `0 ≤ P ≤ P_supply` (flag cavitation if `P_b < 0` would occur, §8).

### 7.3 Determinism
Same inputs + `params_version` → identical summary within numerical tolerance across repeated runs and across two machines (the `verify` gate runs it twice).

### 7.4 Gate integration
- A `verify`-style script compares module output to the stored golden fixtures (parallel to the engine's existing `verify.mjs` parity check).
- A `smoke`-style check boots the built artifact and runs one canonical simulation offline.
- **No release ships** if parity or determinism fails (Trainer invariant: never ship a broken release).

---

## 8. Failure modes and handling

| Failure mode | Cause | Detection / handling |
|--------------|-------|----------------------|
| **Stiffness stall** | explicit solver on the full 4-state model | quasi-static (non-stiff) is the primary path; full model gated behind a stiff-aware integrator (1b) or refused with a clear message — never a silent hang |
| **Unit mismatch** | mixing mm/m or bar/Pa | integrate strictly in SI; convert only at the UI; a unit assertion in `params.js` |
| **Friction sign discontinuity at v≈0** | `sign(v)` and Stribeck term jump at zero | smooth/threshold the transition (documented `v_eps`); avoids stick-slip-induced solver chatter |
| **Negative / cavitation pressure** | demanded `P_b` below vapor | clamp + emit a warning flag in the result (do not crash); surfaces as a physical caution, mirroring `calculate()`'s warnings ethos |
| **Valve closed / zero flow** | `u=0` | flow → 0, velocity → 0 (hold); must produce a flat hold, not a divide-by-zero |
| **End-of-stroke** | `x` reaches `stroke` | clamp at stroke with zero/again-balanced velocity; flag |
| **Provisional parameter in a scored run** | density/Cd/load still 🟡 | run proceeds but `provisional[]` populated; benchmark/evidence inherit the flag (evidence-maturity hook) |
| **`tbd` parameter referenced** | a required key not yet defined | **refuse to run** with "owned by Module NN, not yet defined" |
| **Solver non-convergence** | bad inputs / extreme params | bounded max steps; on failure return an explicit error result, never partial silent output |

Guiding principle (inherited from the Trainer's fail-loud guard): **fail visibly and explain**, never produce a quiet wrong answer or a blank result.

---

## 9. Interaction with `calculate()`

- **Strict separation.** This module never calls, imports, or modifies `calculate()`. They are independent computations (sizing vs dynamics).
- **Shared truth, not shared code.** Both read the *same canonical parameters*; neither owns a private copy. This is the one permitted point of contact, and it is read-only data, not control flow.
- **Optional consistency cross-check (validation only, not a dependency):** a `verify`-time assertion may confirm that the simulation's steady-state velocity is consistent with the operating point `calculate()` would size to — a nice agreement check, but the module must run and pass with `calculate()` entirely absent.
- **No combined logic, ever** (directive rule): if a future need seems to require mixing sizing and dynamics, that is a signal to stop and design a new seam, not to entangle the two.

---

## 10. Definition of done (Stage 1)

1. `src/simulation/` exists as a pure, dependency-free module behind the esbuild build.
2. Quasi-static model reproduces the M04 reference within §7.1 tolerances; `verify` and `smoke` gates pass.
3. Canonical parameters drive every value (derived areas computed, not stored); provisional flags propagate.
4. Outputs include trajectory, summary, provenance/maturity, and positioning benchmark inputs.
5. Writes to `twin.cylinder`/`twin.pressures` via the existing persistence, version-pinned.
6. `calculate()` is byte-identical to before; offline single-file operation intact.
7. Full 4-state stiffness model either passes its parity check or is explicitly deferred to Stage 1b with a recorded reason.

When 1–6 hold (7 optional), Stage 1 is complete and contributes (with Stages 2–4) to the M05–12 unfreeze condition (D11).

---

*End of Stage 1 Dynamic Simulation Module Specification v1.0. Defines purpose, boundaries, inputs, outputs, state and benchmark integration, verification, failure modes, and `calculate()` isolation. No code written. Awaiting approval to proceed to implementation.*
