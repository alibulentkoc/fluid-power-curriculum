# STAGE 3 — WORKCELL_STATE LAYER SPECIFICATION

**Project:** Fluid-Powered Physical AI Platform
**Document type:** Implementation specification (Stage 3 of the EXTEND build)
**Version:** 1.0
**Last updated:** 2026-06-21
**Authority:** Master Implementation Directive Stage 3 · `TRAINER_INTEGRATION_ARCHITECTURE.md`
**Consumes:** Stage 1 `src/simulation/`, Stage 2 canonical (`params.generated.js`), the Trainer's existing v1.2.0 persistence
**Status:** Specification only. **No code.** Defines the `workcell_state` layer.

---

## 0. Context and constraints (binding)

`workcell_state` is the per-learner record that **accumulates curriculum artifacts** as a
learner progresses. Stage 1 produces the first artifact (the twin); Stage 2 makes every
artifact traceable to a parameter version. Stage 3 is the store that holds them. Bound by:

- **Extend, do not replace persistence** — the Trainer already has autosave + recovery +
  export (v1.2.0). `workcell_state` is a serializable object persisted **through that existing
  mechanism**, not a new storage system.
- **Offline / single-file preserved** — state lives in the existing local persistence; no
  server, no network (the credential/online path is Stages 5–6, external).
- **`calculate()` / `engine.js` untouched.**
- **One truth source** — slots reference the canonical `params_version`; no slot redefines a
  physical parameter.

**Wire-time dependency (surfaced early, like `engine.js` was for Stage 2):** the actual hook
into the existing persistence requires that layer's interface (its load/save/export API and
on-disk shape). I do not have it in this checkout. Stage 3 therefore defines `workcell_state`
as a self-contained, serializable module with a small **persistence adapter** boundary; the
in-memory layer, lifecycle, and round-trip are fully buildable and verifiable now, and the
adapter is bound to the repo's real persistence at wire-time.

---

## 1. Purpose

1. Hold a **per-learner**, **versioned** record of curriculum artifacts across the 12 slots.
2. Let each module **read** prerequisite artifacts and **write** its own, via a contract.
3. Provide the substrate that **benchmark runners (Stage 4)** score and **evidence export
   (Stage 5)** serializes.
4. Flag artifacts **stale** when canonical parameters change, so the learner re-runs.

Non-goals: a new persistence engine; accounts/credentials (Stages 5–6); scoring (Stage 4).

---

## 2. Module boundaries

```
src/state/
  schema.js            # the 12-slot workcell_state shape + slot status enum
  workcellState.js     # create/read/write/version API over the state object (pure)
  contract.js          # Module Integration Contract: declare slot, inputs, output
  persistenceAdapter.js# thin boundary to the EXISTING v1.2.0 persistence (wire-time)
  staleness.js         # mark slots stale on params_version change
```

- **Pure core** (`schema`, `workcellState`, `contract`, `staleness`): no React/DOM/I/O.
- **`persistenceAdapter.js`** is the *only* file that knows the existing persistence API; it
  exposes `load()/save()/export()` and is wired to the repo's real layer at integration time.
- Does **not** touch `calculate()`, the engine, `src/simulation/*` internals (it *consumes*
  the simulation's result object), or replace persistence.

---

## 3. The `workcell_state` schema

### 3.1 Twelve slots
`concept, hardware, fluid, twin, power_unit, motion_control, actuator, circuit, sensors,
control, integrated_twin, demonstration` — the set from `TRAINER_INTEGRATION_ARCHITECTURE.md`.

### 3.2 Slot shape
```js
slot = {
  status: 'empty' | 'populated' | 'stale',
  artifact: <module-specific payload> | null,   // e.g. twin = simulation summary + ref
  params_version: 'wp-1.0.0' | null,            // the canonical version it was built against
  owner_module: 'M04' | null,                   // which module populated it
  produced_at: <ISO timestamp> | null,
  provenance: { model?, solver?, provisional?[] } // carried from the producer (Stage 1 emits this)
}
```

### 3.3 State object
```js
workcell_state = {
  meta: { schema_version: 'ws-1.0.0', learner_id: <opaque>, params_version_seen: 'wp-1.0.0' },
  slots: { concept: slot, hardware: slot, ... , demonstration: slot }  // all 12, start 'empty'
}
```
- **`learner_id`** is an opaque local identifier (anonymous; OD-3 sandbox-vs-canonical is
  resolved here by giving each learner one canonical state plus optional throwaway sandbox
  copies — see §6).
- **`schema_version`** enables migration (`docs/migrations`) without losing user work.

---

## 4. Slot lifecycle

```
empty ──(owner module writes artifact)──► populated ──(canonical params_version bumps)──► stale
  ▲                                                                                         │
  └──────────────────────────(owner module re-runs and rewrites)───────────────────────────┘
```

- A slot is written **only by its owning module** (enforced by the contract, §5).
- The **twin** slot is the first concrete case: Stage 1's `simulate()` result populates it,
  carrying `params_version` and `provisional[]` straight from the simulation provenance.
- A slot never silently overwrites a *different* slot; writes are scoped to the declared slot.

---

## 5. Module Integration Contract

Each curriculum module declares a contract; the layer enforces it.

```js
contract = {
  slot: 'twin',                      // the ONE slot this module writes
  reads: ['fluid', 'hardware'],      // prerequisite slots it may read (read-only)
  requires_params: ['cylinder.bore_d', ...],  // canonical keys it needs
  produce: (state, canonical) => artifact      // pure; returns the slot artifact
}
```

- `writeSlot(state, contract, canonical)` runs `produce`, stamps `params_version`,
  `owner_module`, `produced_at`, sets `status='populated'`, and returns a **new** state object
  (immutability; last-write-wins within a slot).
- Reading a `reads` slot that is `empty` is a contract error surfaced to the learner
  (prerequisite not met) — not a silent proceed.
- **First contract delivered:** the twin/simulation contract (`slot:'twin'`, reads `fluid`,
  produces from `simulate()`), proving the pipeline canonical → simulation → state end-to-end.

---

## 6. Persistence integration (extend, not replace)

- `workcell_state` is a plain serializable object; `persistenceAdapter.save/load` route it
  through the **existing** v1.2.0 autosave/recovery/export — no new store.
- **Round-trip invariant:** `load(save(state))` deep-equals `state`. This is a hard gate (§8).
- **Migration:** on a `schema_version` change, a documented migration upgrades old saved state;
  never discard user work (Trainer invariant 5).
- **OD-3 resolution (local):** the learner has one **canonical** `workcell_state`; experimentation
  uses a **sandbox copy** (a clone tagged `sandbox`) that can be discarded without touching the
  canonical record. Credential-bearing runs use the canonical state only. (The online credential
  path remains Stages 5–6.)

---

## 7. Versioning and staleness

- Every populated slot stores the `params_version` it was built against (Stage 2 supplies it).
- On a canonical bump, `staleness.markStale(state, newVersion)` sets any slot whose
  `params_version` predates `newVersion` to `status='stale'` and updates
  `meta.params_version_seen`.
- Stale slots are **not** auto-recomputed (that's the owning module's job, learner-driven); they
  are flagged so benchmarks/evidence never silently use outdated artifacts.

---

## 8. Verification strategy

Extend the chained gate (after `verify-params.mjs`):

- **schema** — a fresh state has all 12 slots `empty`; `schema_version` present.
- **contract write** — the twin contract populates only `twin`, stamps version/owner/time,
  leaves the other 11 untouched.
- **end-to-end** — canonical → `simulate()` → twin slot populated with the right
  `params_version` and propagated `provisional[]`.
- **round-trip** — `load(save(state))` deep-equals `state` (against a mock adapter now; the real
  adapter at wire-time).
- **staleness** — bump `params_version`; the populated twin slot flips to `stale`; an
  unrelated empty slot stays `empty`.
- **isolation** — a sandbox clone mutated does not change the canonical state.
- **determinism** — same inputs → same artifact (inherited from Stage 1).

**Smoke:** create state, write the twin slot from a one-shot simulation, save/load via the mock
adapter, all offline.

---

## 9. Failure modes and handling

| Failure mode | Detection / handling |
|--------------|----------------------|
| Write to a foreign slot | contract scopes writes to `contract.slot`; attempt → error |
| Read an `empty` prerequisite | contract error ("prerequisite <slot> not met"), no silent proceed |
| Round-trip loss | save/load deep-equal gate fails the build |
| Stale not flagged on bump | staleness gate fails |
| Schema drift / old saved state | migration upgrades; never discard (invariant 5) |
| Sandbox leak into canonical | isolation gate fails |
| Artifact missing `params_version` | write path requires it (Stage 2 supplies); reject otherwise |

Principle: fail visibly; never lose or silently outdate a learner's work.

---

## 10. Interaction with `calculate()` and persistence

- **`calculate()` / engine:** untouched; `workcell_state` consumes the *simulation* result, not
  the engine.
- **Persistence:** extended through `persistenceAdapter` only; the existing autosave/recovery/
  export keep owning the bytes. The adapter is the single wire-time coupling, isolated by design.
- **Canonical:** slots reference `params_version`; no slot redefines a parameter (one truth source).

---

## 11. Definition of done (Stage 3)

1. `src/state/` exists: schema (12 slots), pure `workcellState` API, contract, staleness, adapter.
2. The twin contract populates the `twin` slot from a canonical `simulate()` run, end-to-end.
3. Round-trip, staleness, isolation, and contract-scope gates pass (mock adapter now).
4. `persistenceAdapter` is bound to the repo's real v1.2.0 persistence at wire-time; round-trip
   re-verified against it.
5. `calculate()`/engine byte-identical; offline/single-file intact; persistence extended, not
   replaced.
6. Provisional/version provenance flows from simulation → slot → (ready for Stage 4/5).

When 1–3 and 5–6 hold in the sandbox and 4 passes in the repo, Stage 3 is complete: the Trainer
accumulates per-learner, version-tracked artifacts on a trustworthy parameter foundation —
**3 of 4** unfreeze stages (D11), with Stage 4 (benchmark runners) consuming this state next.

---

*End of Stage 3 Workcell State Layer Specification v1.0. Defines the 12-slot schema, slot
lifecycle, Module Integration Contract, persistence extension, versioning/staleness,
verification, and failure modes. The persistence adapter is the one wire-time coupling. No
code. Awaiting approval to implement.*
