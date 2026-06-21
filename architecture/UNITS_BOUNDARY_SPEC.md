# UNITS BOUNDARY SPECIFICATION

**Project:** Fluid-Powered Physical AI Platform
**Document type:** Implementation specification (cross-cutting — Units Boundary Directive)
**Version:** 1.0
**Last updated:** 2026-06-21
**Authority:** Units Boundary Directive · repo preservation constitution (ADR-000, ADR-002, ADR-004) · `CANONICAL_PARAMETER_MODEL.md`
**Touches:** a new pure module `src/units/`; presentation + persisted preference in `src/app.jsx` (additive); curriculum display/export boundaries
**Status:** Specification only. **No code.**

---

## 0. The one principle everything follows from

**Display units are a pure presentation concern.** A unit conversion happens only when a value
crosses *out* to be shown or *in* from a field — never inside the engine, the scorers, the stored
state, or the hashed evidence. The toggle changes what the user *reads*, never what the system
*computes, scores, stores, or seals*. Every rule below is a consequence of this.

### Binding constraints
- **Engine stays native (Rule 1).** `src/core/engine.js` and `calculate()` are **not touched**;
  they remain imperial (psi, in, ft, °F, GPM). Conversion happens *outside* the engine, at its call
  boundary.
- **Curriculum stays SI where required (Rule 2).** `workcell_parameters.yaml` and all Stage 1–6
  evidence remain SI (m, Pa, m³/s).
- **Convert only at the boundary (Rule 3).** engine↔display, canonical↔display, and any value at an
  export/import edge. Nowhere else.
- **One canonical representation per store (Rule 8).** Trainer app-state persists in **engine-native
  (imperial)**; evidence persists in **SI**. Neither store ever holds display-converted numbers.
- **Offline / single-file constitution preserved.** The units core lives in `src/`, bundles into the
  one offline file, adds **no runtime dependency**, and never reaches the network.

---

## 1. Purpose

Let the Trainer and curriculum **display** values in SI *or* US-customary at the user's choice, with a
persisted preference and unambiguous labels, while guaranteeing the choice has **zero effect** on
calculations, benchmark results, evidence hashes, or stored state — and while every conversion is
**exact and tested**, failing loudly when a value cannot be safely converted.

---

## 2. Two native systems, one boundary

```
   INPUT fields ──in→[convert]→ native ┐                         ┌ native ─[convert]→out── DISPLAY (labels)
                                       │                         │
   USER  ── toggle: SI | customary ────┤   ENGINE (imperial)     │   CANONICAL (SI)   ── DISPLAY (labels)
                                       │   calculate() native    │   evidence native
                                       └─────────────────────────┘
   STORAGE: app-state in engine-native (imperial)      EVIDENCE: SI canonical (hash over SI)
   PREFERENCE: display_mode persisted in prefs (NOT in evidence content)
   The toggle path touches DISPLAY only — never the native cores, the stores, or the hash.
```

The engine is imperial-native; the curriculum is SI-native; the **display layer** is the only place
the two unit systems are rendered, and it renders whichever the user selected. There is no single
"platform unit system" — there are two native cores and one presentation boundary between them and
the screen.

---

## 3. Units conversion core — `src/units/`

```
src/units/
  registry.js   # unit definitions by dimension, with EXACT factors to a base SI unit
  convert.js    # convert(value, fromUnit, toUnit) — pure, exact, fail-loud
  format.js     # format(value, unit, mode) -> { text, label } for display (Rule 7)
  index.js      # public API
```
- **Pure, dependency-free, deterministic.** No DOM, no engine import, no state.
- **Dimension-typed.** Every unit belongs to a dimension (length, pressure, force, mass, velocity,
  flow, area, volume, temperature, density). `convert` refuses across dimensions (Rule 10).
- **Single-sourced.** The same core serves the `app.jsx` display layer *and* the curriculum
  display/export — one definition of every factor.

### Conversion model
Each non-temperature unit has an **exact multiplicative factor** to its dimension's SI base. Convert =
`value × factor(from) ÷ factor(to)`. **Temperature is affine** (°C↔°F has an offset) and is handled by
a dedicated path; the multiplicative path **refuses** temperature units so an offset can never be
silently dropped (Rule 10).

---

## 4. Exactness and the factor table (Rule 9)

Factors are the **defined** exact values, not approximations:

| Dimension | SI base | Exact customary factor |
|-----------|---------|------------------------|
| length | m | in = 0.0254 m; ft = 0.3048 m; mm = 1e-3 m |
| force | N | lbf = 4.4482216152605 N |
| mass | kg | lb = 0.45359237 kg |
| pressure | Pa | psi = lbf/in² = 4.4482216152605 / 0.0254² Pa; bar = 1e5 Pa |
| area | m² | in² = 0.0254² m² |
| volume | m³ | in³ = 0.0254³ m³; US gal = 3.785411784e-3 m³; L = 1e-3 m³ |
| velocity | m/s | in/s = 0.0254 m/s; ft/s = 0.3048 m/s; mm/s = 1e-3 m/s |
| flow | m³/s | GPM = 3.785411784e-3/60 m³/s; L/min = 1e-3/60 m³/s |
| density | kg/m³ | lb/ft³ = 0.45359237/0.3048³ kg/m³ |
| temperature | °C (affine) | °F: C = (F − 32)·5/9 |

- **Round-trip identity:** `native → display → native` returns the original (within IEEE-754 ULP;
  exact for the defined factors). Tested.
- Factors are defined **once** in `registry.js`; nothing hard-codes a converted literal elsewhere.

---

## 5. Display-mode toggle (Rule 4)

- **State:** `display_mode ∈ { 'SI', 'customary' }`, held as UI state in `app.jsx`.
- **Scope:** presentation only. Flipping it re-renders displayed values through `convert`+`format`;
  it issues **no recompute**, touches **no stored number**, and never enters scoring or hashing.
- **Default:** `customary` — matches the Trainer's existing imperial UI so current users see no
  change; SI is opt-in. *(Decision point: confirm default; curriculum-facing views may prefer SI.)*
- **Control:** a visible toggle that also serves as the always-on indicator of the active system
  (Rule 7).

---

## 6. Invariance guarantees (Rule 5) — and why each holds

| Must not change | Why it can't |
|-----------------|--------------|
| **Calculations** | `calculate()` runs on engine-native inputs; the toggle converts only the *rendered output*. Inputs reach the engine in native units (fields convert in once, to native). |
| **Benchmark results** | Scorers read SI canonical evidence; the display toggle never enters the benchmark layer. |
| **Evidence hashes** | The hash is over SI `content` (timestamps already excluded). `display_mode` is a *preference*, outside evidence content. Same evidence ⇒ same hash in either mode. |
| **Stored state** | App-state persists in engine-native; the toggle never rewrites stored numbers. Evidence persists in SI. |

Each guarantee is a **test**, not an assertion (§11): export the same evidence in both modes and prove
**identical `content_sha256`**; score in both modes and prove identical verdicts; compute in both modes
and prove identical engine outputs.

---

## 7. Persisting the preference (Rule 6)

- `display_mode` is added to the **prefs** side of the existing `app.jsx` persistence envelope
  (`PERSIST.KEY = "hydraulic-trainer/state/v1"`), alongside existing prefs — **not** to inputs and
  **not** to evidence content.
- Backward-compatible: `coercePrefs` defaults `display_mode` when absent, so old saved data loads
  unchanged; `migrateEnvelope` needs no version bump for an additive, defaulted pref. *(Confirm
  against the real `coercePrefs`/`SCHEMA_VERSION` before wiring.)*
- Because the preference lives in prefs, **persisting it cannot alter an evidence hash or stored
  workcell state** — by construction.

---

## 8. Labels (Rule 7)

- Every displayed quantity renders with the unit label of the **active** mode (e.g. `mm`/`in`,
  `bar`/`psi`, `N`/`lbf`).
- The toggle is the always-visible indicator of the active system.
- **Exports state their canonical system explicitly:** an evidence bundle is SI and says so in a
  human-readable header field, so the artifact is unambiguous to whoever opens it, regardless of the
  exporter's display mode. (The hashed `content` is unchanged; the label is metadata.)

---

## 9. One canonical representation per store (Rule 8)

- **Trainer app-state:** engine-native (imperial), always. The store never holds display values.
- **Evidence bundle:** SI canonical, always. The store never holds display values.
- A value is converted to a display system **only** at the moment of rendering or at an explicit
  export-for-display edge — never on the way *into* a store.

---

## 10. Fail loud (Rule 10)

`convert` refuses — throws with a clear reason, never silently passes through — on:
- **unknown unit** (`unknown unit 'X'`),
- **dimension mismatch** (`cannot convert length → pressure`),
- **non-finite value** (`NaN/Infinity not convertible`),
- **temperature via the multiplicative path** (`temperature is affine; use convertTemperature`).

No clamping, no "best effort," no default-to-input. A value that cannot be safely converted stops the
operation visibly.

---

## 11. Verification strategy

A new gate (`verify-units.mjs`) proving:
- **exact reference conversions:** 1 in = 25.4 mm; 100 bar = 1e7 Pa; 0 °C = 32 °F; 1 US gal =
  3.785411784 L; 1 psi = 6894.757293168361 Pa.
- **round-trip identity:** native→display→native returns the original for every unit.
- **hash invariance (the headline test):** the same scored state exported with `display_mode:'SI'`
  vs `display_mode:'customary'` yields **identical `content_sha256`**.
- **calc invariance:** engine outputs identical regardless of display mode (display converts the
  rendered copy only).
- **benchmark invariance:** verdicts identical regardless of display mode.
- **fail-loud:** unknown unit, dimension mismatch, non-finite, and temperature-misuse all throw.
- **persistence:** a saved envelope with `display_mode` round-trips; an old envelope without it loads
  with the default and an unchanged evidence hash.

`verify-units.mjs` chains after `verify-export.mjs`; the full pipeline stays green and zero-dependency.

---

## 12. Where the changes land (and what they respect)

- **`src/units/` (new):** pure conversion core — sandbox-implementable and fully testable now.
- **Curriculum display/export boundary:** uses `src/units/` to render SI canonical in either mode and
  to stamp the export's canonical-system label. Evidence content stays SI. Sandbox-testable now.
- **`src/app.jsx` (repo-side, additive):** the toggle, the display conversion of engine outputs at the
  render boundary, and the `display_mode` pref. **Governed by the preservation constitution** — no
  change to `calculate()`/`engine.js`, no new dependency, no break to the offline single-file build,
  no change to stored-state or export *content*. This is the only part that modifies a protected file,
  and it is presentation + a defaulted pref only. Requires the real `app.jsx` + your approval to wire.

---

## 13. What this does NOT do

It does not change the engine's math or native units; it does not introduce a platform-wide unit
system; it does not convert anything inside a store, a scorer, or a hash; it does not add a runtime
dependency; it does not alter the evidence schema or the sealed `content`.

---

## 14. Definition of done (mapped to the directive)

| Rule | Done when |
|------|-----------|
| 1 engine native | `engine.js`/`calculate()` byte-identical; conversion outside the engine |
| 2 curriculum SI | canonical + evidence remain SI |
| 3 convert at boundary | conversions only at engine/display/export edges |
| 4 UI toggle | SI/customary toggle present and visible |
| 5 no effect on calc/benchmark/hash/state | all four invariance tests pass |
| 6 persist preference | `display_mode` persisted in prefs; round-trips; old data defaults |
| 7 clear labels | active system always labeled; exports stamp canonical system |
| 8 one canonical per store | app-state imperial, evidence SI; no display values stored |
| 9 exact + tested | exact factors; reference + round-trip tests pass |
| 10 fail loud | unknown/mismatch/non-finite/affine-misuse all throw |

When the table holds — `src/units/` built and gated, curriculum boundary using it with hash-invariance
proven, and the `app.jsx` toggle+pref wired without touching the engine or the offline invariant — the
Units Boundary Directive is satisfied.

---

*End of Units Boundary Specification v1.0. Display units are presentation-only; the engine stays
imperial, the curriculum stays SI, conversion is exact and confined to the boundary, and the toggle
provably cannot move a calculation, a score, a hash, or a stored value. The pure units core is
sandbox-ready; the `app.jsx` toggle is an additive, constitution-respecting repo-side change. No code.
Awaiting approval.*
