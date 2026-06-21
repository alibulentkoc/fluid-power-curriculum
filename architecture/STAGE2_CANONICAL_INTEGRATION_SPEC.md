# STAGE 2 — CANONICAL PARAMETER INTEGRATION SPECIFICATION

**Project:** Fluid-Powered Physical AI Platform
**Document type:** Implementation specification (Stage 2 of the EXTEND build)
**Version:** 1.0
**Last updated:** 2026-06-21
**Authority:** Master Implementation Directive Stage 2 · `ARCHITECT_DECISIONS.md` D12
**Consumes:** `CANONICAL_PARAMETER_MODEL.md`, Stage 1 `src/simulation/`, Trainer build (esbuild)
**Status:** Specification only. **No code.** Defines the build-time canonical integration.

---

## 0. Context and constraints (binding)

Stage 1 left the simulation reading a **fixture** (`test/fixtures/canonical_workcell.js`).
Stage 2 makes a single canonical file authoritative and feeds it into the build, so no
module carries its own copy of a physical value. It is bound by:

- **One truth source** — `workcell_parameters.yaml`. No competing parameter system.
- **Build-time integration, not runtime config** — values are inlined at build time;
  the shipped artifact loads no YAML, makes no network/file call (offline invariant).
- **`calculate()` / `engine.js` are NOT modified** — the engine keeps its in-code
  constants; Stage 2 reconciles them with canonical by **verification**, not rewrite.
- **No runtime dependencies** — a YAML parser is a **build-time dev dependency only**,
  never shipped in the artifact (see §4.4 for a zero-dependency JSON fallback).

The central problem Stage 2 solves: the engine has its own constant tables and the
simulation now has canonical. That is *exactly* the two-sources-of-truth risk (D12).
The resolution is **inject + verify**: canonical drives the new modules; a build-time
gate **asserts the engine agrees** with canonical and **fails on drift**.

---

## 1. Purpose

1. Establish `workcell_parameters.yaml` as the **single** engineering truth source.
2. **Inject** it into the build so the simulation (and future modules) consume canonical
   values with zero runtime cost and full offline preservation.
3. **Detect drift** between the engine's existing constants and canonical, failing the
   build before divergence can reach a release.
4. **Track versions** so every artifact and every result is traceable to a parameter set.

Non-goals: changing the engine's behavior; moving the engine's constants into canonical
(that would modify `engine.js` — out of scope, would need its own ADR); runtime configuration.

---

## 2. Module boundaries

### 2.1 What Stage 2 adds
```
workcell_parameters.yaml          # THE source of engineering truth (new, authoritative)
scripts/
  build-params.mjs                # build step: YAML -> generated, frozen JS params module
  verify-params.mjs               # gate: schema, derived-value, ENGINE-PARITY, version checks
src/simulation/
  generated/
    params.generated.js           # build output (committed or build-only); frozen canonical
  params.js                       # (Stage 1) now imports generated canonical instead of a fixture
```

### 2.2 What Stage 2 does NOT touch
- `src/core/engine.js` and `calculate()` — read-only parity check only (§5).
- `src/simulation/{model,integrator,index,benchmarkInputs}.js` — unchanged; they already
  consume whatever `params.js` returns.
- The shipped artifact's offline/single-file nature — canonical is inlined at build time.

### 2.3 The substitution
Stage 1's `params.js` already expects the `{ value, unit, status }` shape and refuses on
`tbd`. Stage 2 changes **only its import**: from the test fixture to
`generated/params.generated.js`. No model or integrator change. This is the seam Stage 1
was built for.

---

## 3. The canonical source: `workcell_parameters.yaml`

### 3.1 Schema (per entry)
```yaml
meta:
  version: wp-1.0.0            # semantic; bumped on any value change
  generated_from: workcell_parameters.yaml
cylinder:
  bore_d:   { value: 0.050, unit: m,  status: locked,      owner_module: M02, source: design }
  rod_d:    { value: 0.028, unit: m,  status: locked,      owner_module: M02, source: design }
  stroke:   { value: 0.200, unit: m,  status: provisional, owner_module: M02, source: estimate }
fluid:
  density:  { value: 860,   unit: kg/m3, status: provisional, owner_module: M03, source: literature }
  # ...
```
- `status ∈ {locked, provisional, tbd}` — drives the maturity flags already wired in Stage 1.
- `owner_module`, `source` — the Educational Ownership fields (`CANONICAL_PARAMETER_MODEL.md`
  §11), so each value's provenance and first-teaching module are traceable.

### 3.2 Derived-value policy (unchanged from Stage 1)
Areas (`A_b`, `A_rod`, `A_r`) and any other derived quantity are **computed at load, never
stored** in the YAML. `build-params.mjs` does not bake derived values; `params.js` computes
them. One definition, no drift.

---

## 4. Build-time integration mechanism

### 4.1 The build step (`build-params.mjs`)
1. Read and parse `workcell_parameters.yaml`.
2. Validate against the schema (§7): every entry has `value/unit/status`; no `tbd` on a
   key the simulation requires.
3. Emit `src/simulation/generated/params.generated.js` — a **frozen** ES module exporting
   the canonical object plus `meta.version` and a content **checksum**.
4. Runs **before** the esbuild bundle, so the generated module is part of the import graph
   and gets inlined into the single offline artifact.

### 4.2 Why generate a JS module (not read YAML at runtime)
The shipped artifact must run offline with no file/network access (invariant). Generating a
JS module at build time inlines the values; the artifact never sees YAML. This is the
literal meaning of "build-time integration, avoid runtime configuration complexity."

### 4.3 Version + checksum
`params.generated.js` carries `meta.version` and a checksum of the source. Both flow into
every simulation result's provenance (Stage 1 already emits `params_version`) and into the
release record, so an artifact is always traceable to an exact parameter set.

### 4.4 Dependency note (offline invariant)
A YAML parser (e.g. a pinned `js-yaml`) is a **build-time devDependency**, excluded from the
artifact — consistent with "no runtime/convenience dependencies in the shipped file." If even
a build-time parser dependency is unwanted, the **fallback** is to author the source as
`workcell_parameters.json` (zero parser dependency; native `JSON.parse`), trading YAML comments
for zero-dep purity. *Recommended default: YAML + build-time-only parser; fallback documented.*
*(This is the one Stage 2 implementation-time choice — OD-4 detail — for your call.)*

---

## 5. Engine parity / drift detection (the two-sources resolution)

The engine keeps its own constants; Stage 2 proves they **agree** with canonical without
modifying the engine. `verify-params.mjs` performs a read-only parity check across the
quantities the engine and canonical **share** (bore, rod, supply pressure, fluid properties,
friction set, etc.).

**Preferred mechanism (no engine change):** drive `calculate()` through its **public pure
interface** at the canonical operating point and assert its outputs are consistent with the
canonical-derived expectations (e.g. sized areas, pressure-drop budget). Divergence between
the engine's baked constants and canonical surfaces as an output mismatch → **build fails**.

**If the engine already exports its constant table:** read it directly and compare
value-by-value (tighter, simpler).

**If neither is feasible without an engine edit:** the only change that would help is a
*read-only, non-behavioral* `export` of the engine's constant table. That is arguably within
the no-rewrite rule (it changes no behavior), but it touches `engine.js`, so it is **gated on
explicit approval and an ADR** — not assumed here. Until then, the public-interface check (above)
is the default.

This check is the mechanism that makes "one truth source" real: canonical is authoritative,
and the engine is continuously proven to match it or the release is blocked.

---

## 6. Drift detection and version tracking (summary of gates)

- **Schema drift** — malformed/missing entry → fail.
- **Derived drift** — `params.js`-computed areas vs an independent recomputation in the gate
  must agree (guards a regression in the derivation) → fail on mismatch.
- **Engine drift** — §5 parity mismatch → fail.
- **Version drift** — artifact's embedded `params_version`/checksum must match the source at
  build time → fail on mismatch.
- **Maturity surfacing** — provisional/`tbd` counts reported (not failed on, except `tbd` on a
  required key), feeding the evidence-maturity flags already in the simulation output.

---

## 7. Verification strategy

Extend the existing gates (chained `package.json` approach adopted in Stage 1; D13):

- **verify** — `verify-params.mjs` runs: (1) schema valid; (2) derived areas correct and equal
  to `params.js` output; (3) **engine parity** (§5) passes; (4) version/checksum stamped and
  consistent; (5) the Stage 1 simulation parity **still passes when fed canonical** (i.e.,
  re-run `verify-simulation.mjs` against generated params, not the fixture) — proving the swap
  changed nothing physical.
- **smoke** — generated params import cleanly and a one-shot canonical simulation boots offline.

The decisive end-to-end check: **Stage 1 parity (v_steady, pressures, hold, determinism) must
hold identically when the source is the generated canonical module instead of the fixture.**
If it does, the integration is transparent; if it doesn't, the swap introduced drift and the
build fails.

---

## 8. Failure modes and handling

| Failure mode | Detection / handling |
|--------------|----------------------|
| YAML missing or unparseable | build-params.mjs aborts with a clear path/line message; build fails |
| Required key `tbd` | params.js already refuses (Stage 1); gate reports the owning module |
| Engine ↔ canonical mismatch | §5 parity fails the build; names the divergent quantity |
| Derived-value regression | gate recomputation ≠ params.js → fail |
| Version/checksum mismatch | artifact not traceable → fail; never ship an untraceable release |
| Build-time parser dep unavailable offline | documented JSON fallback (§4.4) removes the dependency |
| Generated module hand-edited | checksum mismatch → fail (generated is build output, not a hand-edit target) |

Principle (inherited): fail visibly at **build time**, never ship a drifted or untraceable artifact.

---

## 9. Interaction with `calculate()`

- **Never modified.** The only contact is the **read-only** parity check (§5), preferably through
  the engine's public pure interface.
- **Shared truth, enforced.** Stage 1 said the engine and simulation may share canonical *data*;
  Stage 2 makes that sharing *verified* — canonical is the source, the engine is proven to match.
- Any proposal to source the engine's constants *from* canonical (modifying `engine.js`) is a
  separate, ADR-gated decision, explicitly out of Stage 2 scope.

---

## 10. Definition of done (Stage 2)

1. `workcell_parameters.yaml` exists and is the sole authoritative source.
2. `build-params.mjs` generates a frozen, versioned, checksummed `params.generated.js`,
   inlined by esbuild; the artifact stays offline/single-file.
3. `params.js` imports generated canonical (fixture retired to test-only use); no model change.
4. `verify-params.mjs` passes: schema, derived equality, **engine parity**, version/checksum.
5. **Stage 1 parity passes identically against generated canonical** (transparent swap).
6. `calculate()`/`engine.js` byte-identical to before; offline single-file intact.
7. Provisional/`tbd` maturity surfaced; `tbd`-on-required fails fast.

When 1–7 hold, Stage 2 is complete: one truth source, drift-proof, version-tracked — and
Stage 3 (`workcell_state`) can accumulate artifacts on a trustworthy parameter foundation.
Stages 1–2 of 4 toward the M05–12 unfreeze (D11) done.

---

*End of Stage 2 Canonical Parameter Integration Specification v1.0. Defines the YAML source,
build-time injection, engine parity/drift detection without modifying the engine, version
tracking, verification, and failure modes. No code. Awaiting approval to implement.*
