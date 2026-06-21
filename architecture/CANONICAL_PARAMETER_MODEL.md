# CANONICAL_PARAMETER_MODEL.md

**Project:** Fluid-Powered Physical AI Curriculum
**Document type:** Source of engineering truth (Canonical Model Rule, Directive v3.0)
**Version:** 1.1
**Last updated:** 2026-06-20
**Machine-readable artifact:** `workcell_parameters.yaml` (defined in §8; this document is its specification and governance)
**Status:** Authoritative for all engineering values. Core parameters **locked**; periphery **provisional/TBD** as marked.

**Changelog:** v1.1 — added §11 Educational Ownership (pedagogical provenance per parameter); reserved `parameter_registry.csv` as a future artifact. v1.0 — initial source of engineering truth.

---

## 0. Purpose and authority

The Canonical Model Rule requires that every lesson, simulation, assessment, and Trainer view use **identical parameters, units, assumptions, and calculations**. This document, and the `workcell_parameters.yaml` file it specifies, is that single source. No lesson, demo, or Trainer module may hard-code a physical value that contradicts this file; values are *imported*, never re-typed.

**Precedence:** where any lesson, code file, or Trainer view states a physical value that conflicts with this document, **this document is authoritative** and the other artifact is corrected. Where this document marks a value *provisional* or *TBD*, no artifact may present it as final.

**Honesty rule for this document:** every value below is tagged with a status and a source. Values are **Locked** only when drawn from delivered, reviewed content. Nothing is invented and presented as authoritative. Provisional and TBD entries are recorded as open work, not silently filled.

---

## 1. Status legend

| Tag | Meaning |
|-----|---------|
| 🔒 **Locked** | Established in delivered, reviewed content (Modules 01–04). Authoritative now. |
| 🟡 **Provisional** | Referenced in delivered content but exact value not yet confirmed against source code; best-known value recorded, flagged for confirmation. |
| ⬜ **TBD** | Owned by a planned module (05–12); does not exist yet. Key reserved, value null. |

A parameter's status may only move toward Locked (TBD → Provisional → Locked) via the change-control process in §9. It never silently regresses.

---

## 2. Unit and sign conventions

**Internal computation is SI**, always: metres (m), metres/second (m/s), pascals (Pa), kilograms (kg), seconds (s), m³/s for flow. Conversion to display units (mm, bar, L/min, °C, cSt) happens only at presentation. Mixing mm/m or bar/Pa inside a calculation is the single most common silent error (recorded in M04 common-mistakes) and is forbidden in the canonical layer.

**Display conventions:** position mm · pressure bar · flow L/min · temperature °C · viscosity cSt · force N.

**Sign conventions:**
- Cylinder position `x`: positive = extension; `x = 0` at fully retracted.
- Velocity `v = ẋ`: positive = extending.
- Friction force: always opposes motion (`sign(v)`).
- Pressures: absolute, ≥ 0; gauge where explicitly noted.
- Flow `Q`: positive into the chamber it feeds.

**Conversion constants (exact, for reference):** 1 bar = 1×10⁵ Pa · 1 L = 1×10⁻³ m³ · 1 L/min = 1.6667×10⁻⁵ m³/s · 1 cSt = 1×10⁻⁶ m²/s.

---

## 3. Fluid parameters (Module 03 — Fluid Specification)

| Parameter | Symbol | Value (SI) | Display | Status | Source |
|-----------|--------|-----------|---------|--------|--------|
| Fluid type | — | — | Mineral-based hydraulic oil | 🔒 | M03 deliverable |
| ISO viscosity grade | — | — | ISO VG 46 | 🔒 | M03 deliverable |
| Kinematic viscosity @40 °C | ν₄₀ | ≈4.6×10⁻⁵ m²/s | ≈46 cSt | 🔒 | M03 (VG 46) |
| Acceptable viscosity band | — | 1.3×10⁻⁵–8.0×10⁻⁵ m²/s | 13–80 cSt | 🔒 | M03 |
| Operating temperature (nominal) | T | 313–333 K | ~40–60 °C | 🔒 | M03 |
| Operating temperature (window) | — | 302–347 K | 29–74 °C | 🔒 | M03 |
| Bulk modulus, clean oil | B | 1.8×10⁹ Pa | 1.8 GPa | 🔒 | M03 |
| Effective bulk modulus (twin) | B_e | 1.5×10⁹ Pa | 1.5 GPa | 🔒 | M03/M04 (entrained-air case used in cylinder ODE) |
| Density | ρ | ≈8.5–8.7×10² kg/m³ | ≈850–870 kg/m³ | 🟡 | M03 lists density as a twin parameter; exact value to be confirmed from `viscosity_model.py` |
| Cleanliness target | — | — | ISO 18/16/13 | 🔒 | M03 (set by solenoid DCV) |
| Filter rating | β₁₀ | — | β₁₀ ≥ 100, return line | 🔒 | M03 |

**Note on B_e:** the cylinder ODE (M04 L05) uses the **effective** bulk modulus 1.5 GPa, not the clean-oil 1.8 GPa, because entrained air lowers stiffness. Both are canonical; the ODE must use B_e. This distinction is itself a locked decision.

---

## 4. Cylinder parameters (Modules 01, 04 — primary cylinder)

| Parameter | Symbol | Value (SI) | Display | Status | Source |
|-----------|--------|-----------|---------|--------|--------|
| Bore diameter | d_b | 0.050 m | 50 mm | 🔒 | M04 |
| Rod diameter | d_r | 0.028 m | 28 mm | 🔒 | M04 |
| Bore area (derived) | A_b | 1.9635×10⁻³ m² | 1963.5 mm² | 🔒 (derived) | π·d_b²/4 |
| Rod cross-section (derived) | A_rod | 6.158×10⁻⁴ m² | 615.8 mm² | 🔒 (derived) | π·d_r²/4 |
| Rod-side annulus area (derived) | A_r | 1.3477×10⁻³ m² | 1347.7 mm² | 🔒 (derived) | A_b − A_rod |
| Area ratio (derived) | A_b/A_r | 1.457 | — | 🔒 (derived) | — |
| Stroke length | L_stroke | ≈0.200 m | ≈200 mm | 🟡 | Implied by M04 challenge (200 mm extend); confirm against M02/M07 cylinder spec |
| Dead/initial chamber volume | V₀ | ≈5×10⁻⁵ m³ | ≈0.05 L | 🟡 | M04 L05 used ~0.05 L "small bore chamber" for the stiffness coefficient; confirm whether this is dead volume or a position point |
| Max static force @ supply (derived) | F_max | 1.96×10⁴ N | ≈19.6 kN (~20 kN) | 🔒 (derived) | A_b·P_supply |

**Position-dependent volumes are derived, never stored as constants:** bore-side chamber volume `V_b(x) = V₀_b + A_b·x`; rod-side `V_r(x) = V₀_r + A_r·(L_stroke − x)`. The Trainer computes these from `x`; only the dead volumes are parameters.

---

## 5. Dynamics and friction parameters (Module 04 L03)

| Parameter | Symbol | Value (SI) | Display | Status | Source |
|-----------|--------|-----------|---------|--------|--------|
| Moving mass (piston+rod+effector) | m | 3.0 kg | 3 kg | 🔒 | M04 L03 |
| End-effector mass (subset of m) | — | ≈1.5 kg | ≈1.5 kg | 🟡 | M01 example ("~1.5 kg effector + payload"); confirm split |
| Coulomb friction | F_c | 60 N | 60 N | 🔒 | M04 L03 |
| Static (breakaway) friction | F_s | 120 N | 120 N | 🔒 | M04 L03 challenge |
| Viscous friction coefficient | b | 200 N·s/m | 200 N·s/m | 🔒 | M04 L03 |
| Stribeck velocity | v_s | 0.010 m/s | 10 mm/s | 🔒 | M04 L03 challenge |
| Nominal external load | F_load | 100 N | 100 N | 🟡 | M04 L03 **worked-example** value (horizontal, no gravity component); confirm as canonical nominal vs illustrative |

**Friction model (locked form):** `F_friction = F_c·sign(v) + b·v + (F_s − F_c)·exp(−(v/v_s)²)·sign(v)` (Stribeck, simplified). This functional form is canonical; any controller or twin must use it.

---

## 6. Operating point and hydraulic supply (Modules 01, 03, 04)

| Parameter | Symbol | Value (SI) | Display | Status | Source |
|-----------|--------|-----------|---------|--------|--------|
| Supply pressure (nominal) | P_supply | 1.0×10⁷ Pa | 100 bar | 🔒 | M01/M04 |
| System flow at operating point (derived) | Q | ≈1.65×10⁻⁴ m³/s | ≈9.9 L/min | 🔒 (derived) | from 10 mm line @ 2.1 m/s |
| Baseline extend velocity (simulated) | v_ext | ≈0.082 m/s | ≈82 mm/s | 🔒 | M04 L05 simulation |
| Baseline extend velocity (analytical) | — | ≈0.085 m/s | ≈85 mm/s | 🔒 | M01 hand calc (validation cross-check) |
| Supply line inner diameter | D_line | 0.010 m | 10 mm | 🔒 | M03 |
| Supply line fluid velocity | — | 2.1 m/s | 2.1 m/s | 🔒 | M03 |
| Supply line pressure loss | ΔP_line | ≈5.4×10⁴ Pa | ≈0.54 bar | 🔒 | M03 (Darcy-Weisbach) |

**Internal consistency check (recorded, passes):** line flow `Q = 2.1 m/s × π(0.005)² = 1.65×10⁻⁴ m³/s ≈ 9.9 L/min`; dividing by bore area gives `Q/A_b ≈ 0.084 m/s ≈ 84 mm/s`, consistent with the simulated 82 mm/s and analytical 85 mm/s. The supply, line, and cylinder parameters are mutually consistent. The Trainer should run this check as a built-in invariant (see §9).

---

## 7. Valve, benchmark targets, and the TBD register

### 7.1 Valve / orifice model (Module 04 L02) — partially captured

| Parameter | Symbol | Value | Status | Source |
|-----------|--------|-------|--------|--------|
| Orifice model form | — | `Q = C_d·A(u)·√(2·ΔP/ρ)` | 🔒 (form) | M04 L02/L05 |
| Discharge coefficient | C_d | typical 0.6–0.7 | 🟡 | Used in M04 quasi-static eq; exact value to confirm from `orifice_valve_model.py` |
| Valve area-vs-command map | A(u) | — | 🟡 | Functional form in M04 code; confirm |

### 7.2 Benchmark targets (Benchmark Tasks page — locked acceptance criteria)

| Target | Value | Status | Source |
|--------|-------|--------|--------|
| Positioning steady-state error | ±1 mm | 🔒 | Benchmark Task 1 |
| Positioning slow-approach speed | 5 mm/s | 🔒 | M04 L03 challenge |
| Example position command | 150 mm | 🔒 | Benchmark Task 1 |
| Force-control commanded grip | 20 N | 🔒 | Benchmark Task 2 |
| Pick-cycle stroke | 200 mm extend / 0.5 s hold / 200 mm retract | 🔒 | M04 L05 challenge |
| Throughput target | 8 cycles/min | 🔒 | M04 L05 challenge |

These targets are the assessment thresholds; `ASSESSMENT_MAP.md` (Phase 2B doc 7) reads them from here.

### 7.3 TBD register (owned by planned modules — keys reserved, values null)

| Domain | Parameters awaited | Owning module |
|--------|--------------------|---------------|
| Power unit | pump type & displacement, motor power, relief setting, reservoir volume | M05 ⬜ |
| Valves (detail) | DCV spool type, rated flow, command-to-spool mapping, pressure/flow valve settings | M06 ⬜ |
| Actuator (final) | confirmed primary cylinder spec, end-effector actuator | M07 ⬜ |
| Circuit | full ISO 1219 component list, energy budget | M08 ⬜ |
| Sensors | 2× pressure transducer range/resolution, position sensor, flow sensor, load cell | M09 ⬜ |
| Control | PID gains K_p/K_i/K_d, loop rate, state-machine states & limits | M10 ⬜ |
| Twin | residual thresholds, fault-detection bounds | M11 ⬜ |

No planned-module value may be invented here. They populate as their modules are produced (Trainer-first, per the Transformation Plan).

---

## 8. Machine-readable artifact: `workcell_parameters.yaml`

This is the file the Trainer and all code import. The `.md` you are reading is its specification; the `.yaml` is the data. Every entry carries `value`, `unit`, and `status`, so consumers can detect provisional/TBD values programmatically. Seed (locked + provisional + null-TBD):

```yaml
# workcell_parameters.yaml — Canonical source of engineering truth
# Spec & governance: CANONICAL_PARAMETER_MODEL.md
# status: locked | provisional | tbd. Consumers MUST treat tbd as missing.
meta:
  version: "1.0"
  units_internal: SI            # m, m/s, Pa, kg, s, m^3/s
fluid:
  type:            {value: "mineral hydraulic oil", status: locked}
  iso_vg:          {value: 46,        unit: cSt_at_40C, status: locked}
  bulk_modulus_clean:     {value: 1.8e9, unit: Pa, status: locked}
  bulk_modulus_effective: {value: 1.5e9, unit: Pa, status: locked}  # USE THIS in cylinder ODE
  density:         {value: 860,  unit: kg/m3, status: provisional}  # confirm from code
  visc_band_min:   {value: 1.3e-5, unit: m2/s, status: locked}
  visc_band_max:   {value: 8.0e-5, unit: m2/s, status: locked}
  temp_nom_min:    {value: 313, unit: K, status: locked}
  temp_nom_max:    {value: 333, unit: K, status: locked}
  cleanliness_iso: {value: "18/16/13", status: locked}
cylinder:
  bore_d:    {value: 0.050, unit: m, status: locked}
  rod_d:     {value: 0.028, unit: m, status: locked}
  stroke:    {value: 0.200, unit: m, status: provisional}
  dead_volume_bore: {value: 5.0e-5, unit: m3, status: provisional}
  # areas A_b, A_rod, A_r are DERIVED at load time, never stored
dynamics:
  mass:      {value: 3.0,  unit: kg,    status: locked}
  friction_coulomb: {value: 60,  unit: N,     status: locked}
  friction_static:  {value: 120, unit: N,     status: locked}
  friction_viscous: {value: 200, unit: N*s/m, status: locked}
  stribeck_velocity:{value: 0.010, unit: m/s, status: locked}
  load_nominal:     {value: 100, unit: N,     status: provisional}
supply:
  pressure:  {value: 1.0e7, unit: Pa, status: locked}
  flow_operating: {value: 1.65e-4, unit: m3/s, status: locked}  # ~9.9 L/min
  line_id:   {value: 0.010, unit: m, status: locked}
valve:
  model: {value: "Cd*A(u)*sqrt(2*dP/rho)", status: locked}
  discharge_coeff: {value: 0.65, unit: dimensionless, status: provisional}  # confirm from code
benchmark:
  pos_error_tol:   {value: 0.001, unit: m,   status: locked}   # ±1 mm
  pos_slow_speed:  {value: 0.005, unit: m/s, status: locked}
  grip_force:      {value: 20,    unit: N,   status: locked}
  cycle_target_per_min: {value: 8, unit: 1/min, status: locked}
power_unit:  {status: tbd}   # M05
sensors:     {status: tbd}   # M09
control:     {status: tbd}   # M10
twin:        {status: tbd}   # M11
```

Derived quantities (areas, position-dependent volumes, max force, area ratio) are computed by a small canonical loader (e.g. `parameters.py`) that reads the YAML and exposes `A_b`, `A_r`, `V_b(x)`, etc. **Derived values are never written into the YAML** — that is how drift is prevented at the source.

---

## 9. Drift control and governance

**Single source.** `workcell_parameters.yaml` is the only place a physical constant is defined. Lessons, demos, the Trainer, and all `code/` import it. A grep/CI check flags any numeric physical literal in lesson or code files that should have come from the loader.

**Invariant checks (run in CI and in the Trainer at load).** At minimum:
1. `A_b > A_r > 0`, area ratio ≈ 1.457.
2. Operating-point consistency (§6 check): `Q / A_b` within ±10 % of the recorded extend velocity.
3. `bulk_modulus_effective ≤ bulk_modulus_clean`.
4. No parameter tagged `locked` has a null value; no consumer reads a `tbd` value as a number.

**Change control.** A parameter changes status or value only by: (a) an entry in `master_progress.md`, (b) a status update here, (c) a version bump of both this document and the YAML, (d) re-running the invariant checks. Status may advance TBD → Provisional → Locked; a regression requires an explicit recorded reason.

**Versioning.** This document and `workcell_parameters.yaml` share a version number and move together. Consumers pin to a version.

---

## 10. Provenance and open actions

**Verified-source values** (🔒) come from: M03 summary (fluid spec, line sizing, bulk modulus), M04 L03 (mass, friction, areas), M04 L05 (extend velocity, B_e usage, chamber-volume order of magnitude), Benchmark Tasks page (targets), and M01 (analytical extend velocity, ~1.5 kg effector). The cross-consistency in §6 was checked and passes.

**Open parameter actions (feed `master_progress.md` A-series):**

| ID | Action | Resolves |
|----|--------|----------|
| P1 | Confirm density ρ and discharge coefficient C_d from `code/module03` and `code/module04` | two 🟡 → 🔒 |
| P2 | Confirm stroke length and dead volumes from M02/M07 cylinder spec | two 🟡 → 🔒 |
| P3 | Confirm whether F_load = 100 N is the canonical nominal or an illustrative value | one 🟡 |
| P4 | Confirm end-effector mass split within the 3 kg moving mass | one 🟡 |
| P5 | Build the canonical loader (`parameters.py`) + CI drift/invariant checks | enables §9 enforcement |

These do not block the next architecture document; they are tracked, not gating. P1–P4 are discharged by reading the four named code files (the same verification debt noted in `PROJECT_STATE.md` §5).

---

## 11. Educational ownership

Beyond technical provenance (§10), every parameter carries *pedagogical* ownership, so a future instructor can see where a value enters the **learner's journey**, not just where it is stored. Each parameter identifies three things:

1. **Owning module** — the module pedagogically responsible for the parameter.
2. **First appearance** — the lesson where the learner first encounters it.
3. **Validation source** — where it is confirmed or cross-checked.

Schema:

```text
Supply Pressure
  Owner:            Module 01
  First Appearance: M01-L03
  Validation:       M04-L05 simulation
```

Educational-ownership record for the currently locked/provisional parameters:

| Parameter | Owning module | First appearance | Validation source |
|-----------|---------------|------------------|-------------------|
| Supply pressure | M01 | M01-L03 (math foundations) | M04-L05 simulation |
| Bore / rod diameter | M02 (cylinder) | M02-L03 cylinders & motors | M04-L03 worked example |
| Areas A_b/A_rod/A_r (derived) | M04 | M04-L03 | M04-L05 |
| Moving mass | M04 | M04-L03 | M04-L05 |
| Friction set (F_c, F_s, b, v_s) | M04 | M04-L03 | M04-L03 challenge |
| Bulk modulus (clean & effective) | M03 | M03-L01 | M04-L05 (ODE stiffness) |
| Density, viscosity grade | M03 | M03-L01/L02 | M03 tested code |
| Cleanliness / filter / line sizing | M03 | M03-L03/L04 | M03 deliverable |
| Extend velocity (operating) | M01 (analytical) | M01-L03 | M04-L05 (sim cross-check) |
| Benchmark targets | Benchmark Tasks | Benchmark Tasks page | M12 capstone (planned) |

Some owning-module attributions are best-known and will be confirmed when M01–03 lesson depth is verified (PROJECT_STATE §5). Each ownership row inherits the 🔒/🟡 status of its value in §3–7.

**Future home (deferred, not built now):** at scale — once Modules 05–12 multiply the parameter set across electrohydraulics, sensors, controllers, and the twin — this ownership metadata graduates into a dedicated **`parameter_registry.csv`** with one row per parameter carrying `Parameter, Owner Module, Status, Used In, Last Verified`. It is reserved as a planned artifact so it lands exactly when the model starts expanding, not before.

---

*End of `CANONICAL_PARAMETER_MODEL.md` v1.1. Phase 2B document 3 of 7. Locked core established; provisional/TBD periphery recorded honestly; educational ownership added. Awaiting nothing — approved; proceeding to `TRAINER_INTEGRATION_ARCHITECTURE.md`.*
