# Retrofit Notes — M01–M04 (Integration-Only)

Source: M01–M04 Conformance Audit, **accepted**. All four modules classified **YELLOW (integration only)** — they produce the correct artifact, advance the correct benchmark task, and support the intended learner-identity transition. They predate the Trainer evidence layer and the 12-slot `workcell_state` schema, so they lack only the state-population / Trainer-integration hooks. No content rewrite. None blocks Module 5.

These run **in parallel** with M5 production and adopt the seam pattern set by the M05 `power_unit` contract (`src/state/contracts/powerUnitContract.js`).

| # | Module | Slot | Retrofit (additive hook only) | Pattern to copy |
|---|--------|------|-------------------------------|-----------------|
| R1 | M01 Foundations | `concept` | `conceptContract` writing the System Concept Diagram artifact into `workcell_state.concept` | `fluidContract` (no `reads`, params-only) |
| R2 | M02 Components | `hardware` | `hardwareContract` writing the Component Map into `workcell_state.hardware` | `fluidContract` |
| R3 | M03 Fluids | `fluid` | Already has `fluidContract`; verify the **published density figure matches canonical `869.61 kg/m³` (`wp-1.1.0`)** | n/a (value check) |
| R4 | M04 Fluid Mechanics | `twin` | Already has `twinContract`; confirm the published M04 simulation output binds through the contract (no drift from the stored twin the positioning runner scores) | n/a (binding check) |

Notes:
- R1/R2 are the only *new* hooks; R3/R4 are verification of existing bindings.
- Each hook is a pure `produce()` returning the module's artifact, written through `writeSlot` — content-neutral, no lesson change.
- Acceptance test for each: a `verify-<slot>.mjs` gate proving prereq order + artifact shape + provenance, mirroring `verify-power-unit.mjs`.

Status: open, parallel, non-blocking.
