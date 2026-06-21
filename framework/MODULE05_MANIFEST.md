# Module 05 — Hydraulic Pumps and Power Generation
## Module Manifest + Learning Outcomes

*Status: framing locked. The `power_unit` contract (`src/state/contracts/powerUnitContract.js`) is built and gate-proven (`verify-power-unit.mjs`); this manifest is written against that proven artifact, not ahead of it.*

---

### 1. Module purpose

The machine gains **a power source**. Module 05 sizes and characterizes the **Hydraulic Power Unit (HPU)** — prime mover (motor), pump, relief valve, and reservoir — that delivers the flow and pressure the cylinder needs. It turns the twin's *motion prediction* into a concrete, justified *power source* capable of feeding that motion.

Position in the build sequence:

```
Cylinder Simulation (M04, twin)  ──►  the prediction the power source must feed
        ▼
Hydraulic Power Unit Design (M05) ──►  the power the motion control (M06) directs
```

---

### 2. What M05 consumes from `twin`

| Input | Source | Role |
|-------|--------|------|
| `twin.summary.v_steady` (m/s) | M04 twin artifact (stored slot) | Steady extend velocity → sets the **required pump flow** `Q = A_bore · v_steady` |
| `cylinder.bore_d` (m) | canonical `wp-1.1.0` | Bore area `A_bore = π/4 · bore_d²` |
| `supply.pressure` (Pa) | canonical `wp-1.1.0` | Working pressure → hydraulic power and relief setting |

The contract **reads `['twin']`** as a hard prerequisite: `power_unit` cannot populate until `twin` is populated and fresh. M05 consumes the *stored* twin through the state layer — it does **not** re-run the simulation or call the engine.

---

### 3. Artifact produced — Hydraulic Power Unit Design

Written to `workcell_state.power_unit`. Fields (SI base units; the Trainer units toggle handles customary/SI display):

| Field | Meaning |
|-------|---------|
| `kind` | Artifact discriminator, always `'power_unit'` |
| `pump_flow_m3s`, `pump_flow_Lmin` | Required pump delivery |
| `hydraulic_power_W` | Fluid power, `P_supply · Q` |
| `motor_power_W` | Shaft power, `hydraulic / overall_efficiency` |
| `relief_setting_Pa` | Relief cracking pressure (margin above supply) |
| `reservoir_L` | Reservoir volume (3:1 flow rule) |
| `assumptions` | `{ overall_efficiency, relief_margin, reservoir_ratio_min }` |
| `reads_from` | `{ twin_v_steady }` — provenance of the demand |
| `provenance` | `{ params_version, provisional[] }` |

**Artifact rule satisfied:** a sized, characterized power source the student can point to — "the machine has a power source now." Reference sizing at `wp-1.1.0`: ≈ 9.96 L/min, 1.66 kW hydraulic, 1.95 kW motor, 110 bar relief, 29.9 L reservoir.

---

### 4. Learning outcomes

Each outcome is assessable and ends in a piece of the artifact. Mapped to the four published lessons.

| LO | Lesson | Outcome | Artifact tie |
|----|--------|---------|--------------|
| **LO1** | 01 — Why the machine needs power | Explain why the workcell needs a dedicated power source, and read the flow + pressure demand the cylinder imposes from the twin's prediction | consumes `twin.v_steady` |
| **LO2** | 02 — Choosing the power source | Select an appropriate pump/prime-mover type (fixed vs variable displacement; gear / vane / piston) and justify it against the duty | component selection rationale |
| **LO3** | 03 — Performance and efficiency | Compute hydraulic power and apply volumetric / mechanical / overall efficiency to size the prime mover | `hydraulic_power_W`, `motor_power_W`, `assumptions.overall_efficiency` |
| **LO4** | 04 — Designing the power unit | Produce the complete HPU design — pump flow, motor power, relief setting, reservoir — justified end to end | full `power_unit` artifact |

The `summary` lesson consolidates LO1–LO4 and hands the populated `power_unit` slot to M06.

---

### 5. Benchmark tie-in

Advances **Task 1 — Precision Positioning** (the artifact map's "05 powers it"). M05 supplies the flow and pressure that make the positioning response — predicted by M04 and scored by the Stage-4 positioning runner — physically *achievable*: an under-sized HPU caps velocity and force and would break the ±1 mm settling/holding criteria. M05 **adds no new benchmark runner**; it conditions the feasibility of the existing positioning task. Force and Autonomous tasks remain prerequisite-gated to later modules.

---

### 6. Exact `workcell_state.power_unit` expectation

| Property | Value |
|----------|-------|
| `slot` | `power_unit` |
| `owner_module` | `M05` |
| `reads` | `['twin']` (prerequisite enforced; rejects when twin empty/stale) |
| `requires_params` | `['cylinder.bore_d', 'supply.pressure']` |
| `artifact.kind` | `'power_unit'` |
| status transition | `empty → populated` via `writeSlot` |
| provenance | `provenance.params_version === canonical.meta.version`; `provisional[]` inherited from inputs + twin |

Invariants (proven by `verify-power-unit.mjs`): `motor_power_W ≥ hydraulic_power_W`; `relief_setting_Pa > supply.pressure`; all sizing fields finite and positive. Downstream contracts (M06) read `power_unit` through the state layer; no engine call.

---

### 7. Trainer integration

The HPU artifact reaches `workcell_state.power_unit` through the `powerUnitContract` seam — already built and proven. This is the **authored-from-the-start pattern** the M01–M04 retrofit hooks (R1/R2) adopt. Evidence export (Stage 5) and credentialing (Stage 6) consume the slot through the existing pipeline unchanged. `calculate()` and the offline single-file invariant are untouched.

---

### 8. Lesson set (frame only — content is the next deliverable)

| # | Lesson | LO |
|---|--------|----|
| 01 | Why the machine needs power | LO1 |
| 02 | Choosing the power source | LO2 |
| 03 | Performance and efficiency | LO3 |
| 04 | Designing the power unit | LO4 |
| — | Summary | consolidation + handoff to M06 |

Each lesson follows the curriculum's twelve-part structure and leaves `code/` and `labs/` artifacts (subsequent deliverables, in order: lesson content → code/labs).
