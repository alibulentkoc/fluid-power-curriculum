# TRAINER_INTEGRATION_ARCHITECTURE.md

**Project:** Fluid-Powered Physical AI Curriculum
**Document type:** Operational platform architecture (Trainer Integration Rule, Directive v3.0)
**Version:** 1.0
**Last updated:** 2026-06-20
**Consumes:** `CANONICAL_PARAMETER_MODEL.md` / `workcell_parameters.yaml` (the source of engineering truth)
**Status:** Authoritative for how every module, lesson, assessment, and artifact connects to the Hydraulic Trainer.

---

## 0. Purpose and authority

The directive makes the Hydraulic Trainer & Designer the **primary learning environment** — sandbox, design, simulation, assessment, portfolio, and certification — with lessons *supporting* it. This document defines the mechanism: the persistent Trainer state, the contract every module must satisfy to plug into it, how the Trainer consumes the canonical parameters, and how "the machine" accumulates across twelve modules into one growing system.

This is the head of the operational platform:

```
Canonical Parameters → Trainer Architecture → Assessment → Certification → Credit
```

Everything after this orbits the Trainer, not individual lessons. Where a lesson, demo, or assessment connects to the machine in a way that conflicts with this document, **this document is authoritative**.

**Honesty scope.** The Trainer exists today as an operational standalone tool (v1.4.0). Its *internal* implementation has not been audited in this work. This document therefore defines the **integration contract and the capabilities the Trainer must expose** to become the platform — not a claim about how v1.4.0 is built internally. Items requiring knowledge of the Trainer's internals, or a build decision, are marked **OPEN** and routed to `ARCHITECT_DECISIONS.md` (§14).

---

## 1. Design principles

1. **Trainer-first.** A capability lives in the Trainer; a lesson explains and motivates it. If something is interactive, it is a Trainer module, not a standalone widget.
2. **One source of truth.** Every physical value comes from `workcell_parameters.yaml` via the canonical loader. The Trainer hard-codes nothing the loader can provide.
3. **Artifacts accumulate.** Each module writes a durable artifact into Trainer state; later modules read it. The machine is the sum of these artifacts, and it only grows.
4. **Persistent and per-learner.** Trainer state survives across sessions and belongs to a learner. Returning to the Trainer means returning to *your* machine, as far as you have built it.
5. **The Trainer is the measurement surface.** Benchmark tasks execute and are scored inside the Trainer; assessment and certification read those results — they are not re-implemented elsewhere.
6. **No orphans.** No disconnected simulation, no isolated demo. Existing standalone widgets migrate in or are retired (§8).

---

## 2. Platform architecture (conceptual)

```
                ┌─────────────────────────────────────────────┐
                │            HYDRAULIC TRAINER (platform)       │
                │                                               │
  workcell_     │  ┌───────────────┐   loads/validates         │
  parameters →──┼─►│ Parameter layer│  (invariants at load)    │
  .yaml         │  └──────┬─────────┘                          │
                │         ▼                                     │
                │  ┌───────────────┐                            │
                │  │ Engine layer  │  hydraulics + ODE compute  │
                │  └──────┬────────┘                            │
                │         ▼                                     │
                │  ┌───────────────┐   the machine as a         │
                │  │  State layer  │   persistent object        │
                │  │ workcell_state│   (per learner, versioned) │
                │  └──────┬────────┘                            │
                │         ▼                                     │
                │  ┌───────────────────────────────────────┐   │
                │  │ Module surfaces  M01 … M12             │   │
                │  │ (each populates one layer of machine)  │   │
                │  └──────┬─────────────────────┬──────────┘   │
                │         ▼                     ▼               │
                │  ┌─────────────┐      ┌──────────────┐        │
                │  │ Benchmark    │      │  Portfolio    │       │
                │  │ runners +    │      │  (accumulated │       │
                │  │ scoring      │      │  artifacts)   │       │
                │  └──────┬──────┘      └──────┬────────┘        │
                └─────────┼────────────────────┼────────────────┘
                          ▼                     ▼
                  ASSESSMENT_MAP        CERTIFICATION / CREDIT
                  (reads scores)        (reads portfolio + scores)

  LESSONS ──────► reference Trainer actions ("do X in the Trainer"); they support, not replace.
```

The Trainer is five layers (parameters → engine → state → module surfaces → benchmark/portfolio) plus two outward interfaces (assessment, certification/credit). Lessons attach from the side.

---

## 3. The Module Integration Contract (the core)

Every module — delivered or planned — must declare one **Trainer Integration Contract**. This is the reusable interface that satisfies the directive's requirement that each module specify its Trainer **inputs, outputs, in-Trainer assessment, and stored artifacts**. No module is "Trainer-integrated" until its contract is filled and its artifact writes to state.

**Contract schema** (`trainer/contracts/<module>.yaml`):

```yaml
module_id:        M04
title:            Fluid Mechanics for Intelligent Machines
trainer_layer:    cylinder_twin           # the machine layer this module populates
inputs:
  parameters:     [cylinder.*, fluid.bulk_modulus_effective, dynamics.*, valve.*, supply.*]
  prior_artifacts:[M02.hardware_architecture, M03.fluid_specification]
  learner_inputs: [valve_command_profile, extend_time]
outputs:
  artifact:
    id:           cylinder_simulation
    type:         validated_simulation
    schema:       {trajectory: [t, x, v, P_b, P_r], summary: {v_steady, settle_time}}
    persists_in:  workcell_state.twin.cylinder
  capability_unlocked: "simulate cylinder motion from a valve command"
assessment_in_trainer:
  benchmark:      positioning            # which benchmark this advances
  checks:         [steady_velocity_within_10pct_of_analytical, ode_stable]
  evidence_emitted: positioning_sim_result
storage:
  writes:         [workcell_state.twin.cylinder]
  reads:          [workcell_state.fluid, workcell_state.hardware]
status:           integrated             # planned | contract_defined | integrated
```

**Contract rules.** (a) `inputs.parameters` may name only keys that exist in `workcell_parameters.yaml`; a reference to a `tbd` key fails validation. (b) `prior_artifacts` may name only artifacts written by earlier modules — this enforces the chain. (c) Every contract must emit at least one `artifact` and at least one piece of `evidence` or it is incomplete (the directive's artifact rule, mechanized). (d) `status` advances `planned → contract_defined → integrated`.

The contract is the unit of Trainer integration. Producing a module now means *filling its contract and wiring its artifact*, not writing a standalone page.

---

## 4. The machine as a persistent object: `workcell_state`

"The machine" is a per-learner, versioned state object that the module surfaces populate. It is the literal embodiment of the "one machine in twelve stages" narrative.

```yaml
workcell_state:                  # one per learner
  meta: {learner_id, params_version, schema_version, updated_at}
  concept:    {}                 # M01  System Concept Diagram
  hardware:   {}                 # M02  Hardware Architecture
  fluid:      {}                 # M03  Fluid Specification
  twin:                          # M04+ Digital twin, grows over modules
    cylinder: {}                 #   M04 cylinder simulation core
    pressures: {}                #   M04
  power_unit: {}                 # M05  (tbd)
  motion_control: {}             # M06  (tbd)
  actuator: {}                   # M07  (tbd)
  circuit: {}                    # M08  (tbd)
  sensors: {}                    # M09  (tbd)
  control: {}                    # M10  (tbd)
  integrated_twin: {}            # M11  (tbd)
  demonstration: {}              # M12  (tbd)
  portfolio: [artifact_refs...]  # accumulates every module's artifact
  benchmark_scores: {}           # latest scored runs per task
```

**Rules.** State is append-and-refine: a module fills its own slot and may read but not overwrite another module's slot except through an explicit, recorded revision. State pins the `params_version` it was built against (§11). Each artifact lands in both its typed slot and the flat `portfolio` list (the portfolio is what certification reads).

---

## 5. Canonical parameter integration

The Trainer's parameter layer is the **only** place values enter. On load it:

1. reads `workcell_parameters.yaml` at a pinned version;
2. runs the canonical loader to compute derived quantities (areas, position-dependent volumes, max force) — these are computed, never read from state or YAML;
3. runs the §9 invariants from `CANONICAL_PARAMETER_MODEL.md` (area relationships, operating-point consistency, bulk-modulus ordering, no null-locked, no tbd-as-number);
4. refuses to start a module whose contract references a `tbd` parameter, with a clear "owned by Module NN, not yet defined" message.

No engine or module surface may instantiate a physical constant by literal. A CI check greps Trainer and lesson sources for stray numeric physical literals (the same rule the canonical model mandates).

---

## 6. Artifact-accumulation map (module → machine layer)

This is the Trainer-anchored version of the artifact chain — each module populates one layer of the persistent machine and unlocks one capability. It supersedes the standalone `MODULE_ARTIFACT_MAP` framing by binding each artifact to Trainer state.

| Module | Writes to `workcell_state` | Capability unlocked in Trainer | Benchmark advanced | Integration status |
|--------|----------------------------|--------------------------------|--------------------|--------------------|
| M01 | `concept` | view/understand the whole machine | all (conceptual) | contract to define |
| M02 | `hardware` | populate named components | positioning, force | contract to define |
| M03 | `fluid` | set fluid properties (params live) | positioning | contract to define |
| M04 | `twin.cylinder`, `twin.pressures` | simulate cylinder from valve command | positioning | **integrated target (first fold)** |
| M05 | `power_unit` | size & run the HPU | positioning | planned ⬜ |
| M06 | `motion_control` | direct & meter motion | positioning, force | planned ⬜ |
| M07 | `actuator` | confirm actuator + end effector | force | planned ⬜ |
| M08 | `circuit` | assemble full ISO 1219 circuit | positioning, force | planned ⬜ |
| M09 | `sensors` | perceive state (sensor layer live) | force, autonomous | planned ⬜ |
| M10 | `control` | run PID + task state machine | force, autonomous | planned ⬜ |
| M11 | `integrated_twin` | full twin + fault detection | autonomous | planned ⬜ |
| M12 | `demonstration` | run all three benchmarks autonomously | autonomous | planned ⬜ |

By M08 the learner has assembled the full circuit in the Trainer; by M11 the Trainer runs the twin alongside; by M12 it executes and scores the three benchmark tasks end to end.

---

## 7. Benchmark execution inside the Trainer

The three benchmark tasks are **runnable, scored procedures** in the Trainer, not prose. Each has a runner that reads `workcell_state`, executes, and writes a scored result to `benchmark_scores` and the learner's evidence.

| Benchmark | Trainer runner reads | Pass criteria (from canonical model §7.2) | Emits |
|-----------|----------------------|-------------------------------------------|-------|
| Positioning | `twin`, `motion_control`, `sensors` | steady-state error ≤ ±1 mm; bounded overshoot; holds under load | `positioning_score` |
| Force-controlled | `actuator`, `sensors`, `control` | applied force within tolerance of 20 N command; stable; no overshoot spike | `force_score` |
| Autonomous | full state incl. `integrated_twin` | approach→grip→move→place→verify completes; twin residual in bounds; no intervention | `autonomy_score` |

Partial execution is meaningful and recorded: at M04 the positioning runner scores the *simulated* trajectory (no sensors yet); once M09 adds sensors the same runner scores against measured position vs twin. The runner is stable; what it can read grows with the machine. These scores are the evidence `ASSESSMENT_MAP` and `CERTIFICATION_FRAMEWORK` consume — defined once, here.

---

## 8. Migration of existing interactivity

Current standalone widgets (e.g. the M04 cylinder ODE stepper) and the operational Trainer v1.4.0 must converge.

- **Preserve:** the physics and the tested Python models behind each widget; the M04 `cylinder_simulation` artifact is the **first** to fold into Trainer state (Transformation Plan §6) and proves the contract end to end.
- **Modify:** each widget becomes a Trainer module surface bound to `workcell_state`, reading parameters from the loader; lessons re-point from "open this widget" to "do this in the Trainer."
- **Retire:** any widget that duplicates a Trainer capability once migrated, so there is one place per capability.
- **OPEN (D-T1):** whether the existing Trainer v1.4.0 codebase is extended in place or its capabilities are re-hosted in a platform shell depends on its internals (not yet audited). Routed to `ARCHITECT_DECISIONS.md`.

---

## 9. Lesson ↔ Trainer relationship

Lessons keep their pedagogical strength (the 5-layer progression, the 12-part template) but their interactive and integration sections change role:

- The "interactive demonstration" section points to a **named Trainer action**, not a one-off page.
- The "coding exercise" runs against the canonical loader and writes to (a sandbox copy of) `workcell_state`.
- The "deliverable / capability added" box names the exact `workcell_state` slot the module fills.

Lessons explain *why*; the Trainer is *where it happens and is recorded*. This is the directive's "lessons support the Trainer," made concrete.

---

## 10. Persistence, portfolio, and self-paced progress

- **Persistence:** `workcell_state` survives across sessions per learner.
- **Portfolio:** the accumulating `portfolio` list is the learner's evidence of a built machine — the raw material certification reads.
- **Progress:** completion is measured by populated state slots + benchmark scores, not pages viewed. A self-paced learner can see exactly how much of the machine they have built and which benchmarks they pass — enabling progress verification without an instructor (the directive's self-paced requirement).
- **OPEN (D-T2):** where state persists (browser-local vs account-backed) is a build decision with certification implications (a credential needs durable, attributable evidence). Routed to `ARCHITECT_DECISIONS.md`.

---

## 11. Versioning and curriculum ↔ Trainer sync

The Canonical Model Rule requires curriculum and Trainer to stay synchronized. Mechanism:

- `workcell_parameters.yaml`, `CANONICAL_PARAMETER_MODEL.md`, and the Trainer parameter layer share a **version**. The Trainer displays and pins the parameter version it runs.
- A learner's `workcell_state` records the `params_version` it was built against; on a parameter version bump, the Trainer flags any state that needs recompute.
- A module contract pins the parameter keys it depends on; a parameter change that touches those keys triggers a contract re-validation.

This is how a change to one number propagates safely instead of silently desyncing lessons, Trainer, and scores.

---

## 12. Downstream interfaces (forward hooks, not built here)

- **→ ASSESSMENT_MAP (2B doc 7):** reads `benchmark_scores` and contract `evidence_emitted`. Assessment does not re-run physics; it interprets Trainer evidence against competencies.
- **→ CERTIFICATION_FRAMEWORK (later):** reads `portfolio` + `benchmark_scores` for reproducible, evidence-based credentials.
- **→ CREDIT_FRAMEWORK (later):** adds instructor evaluation on top of the same evidence.

These are named so the Trainer exposes the right surfaces now; the frameworks themselves are later phases and are not designed here.

---

## 13. Required sub-artifacts and file layout

```
trainer/
├── parameters.py                 # canonical loader: reads YAML, computes derived, runs invariants
├── state/
│   └── workcell_state.schema.yaml
├── contracts/
│   ├── M01.yaml … M12.yaml       # one Module Integration Contract each
├── engine/                       # hydraulics + ODE compute (consumes loader only)
├── benchmarks/
│   ├── positioning_runner …      # scored runners (§7)
│   ├── force_runner …
│   └── autonomy_runner …
└── portfolio/                    # accumulation + export for certification
```

`parameters.py` and the `workcell_state` schema are the first to build (they gate every contract). Contracts are filled module by module, M04 first.

---

## 14. Open decisions (→ ARCHITECT_DECISIONS.md)

| ID | Decision | Why it's open | Blocks |
|----|----------|---------------|--------|
| D-T1 | Extend Trainer v1.4.0 in place vs re-host in a platform shell | Trainer internals not yet audited | §8 migration mechanics |
| D-T2 | State persistence: browser-local vs account-backed | Certification needs durable, attributable evidence | certification design |
| D-T3 | Sandbox vs canonical state for coding exercises | Avoid learners corrupting their own machine while experimenting | lesson↔Trainer wiring |
| D-T4 | Trainer tech stack for new module surfaces (matches v1.4.0 or not) | Depends on D-T1 | M05+ surface production |

None block defining contracts and the state schema; they block specific build steps. They should be resolved before M05+ surface production begins.

---

## 15. Exists / preserve / modify / create

- **Exists:** operational Trainer v1.4.0; standalone widgets; tested Python models; the M04 `cylinder_simulation` artifact; the canonical parameter model (just established).
- **Preserve:** the Trainer's operational status; widget/model physics; the M04 artifact as first fold; lesson pedagogy.
- **Modify:** widgets → Trainer module surfaces; lessons → reference Trainer actions; `MODULE_ARTIFACT_MAP` framing → bound to `workcell_state`.
- **Create:** `workcell_state` schema; the Module Integration Contract for each module; `parameters.py` loader; benchmark runners; portfolio/export; the four OPEN decisions' resolutions.

---

## 16. Acceptance criteria (when the Trainer *is* the platform)

1. Every module has a filled Integration Contract; each writes its artifact to `workcell_state`.
2. No standalone widget remains; one place per capability.
3. The Trainer instantiates **zero** physical constants by literal; all come from the loader; invariants run at load.
4. The three benchmark tasks execute and score inside the Trainer; their scores are the only assessment evidence source.
5. `workcell_state` persists per learner and accumulates a portfolio across modules.
6. Curriculum and Trainer share a pinned parameter version and stay synced on change.
7. A self-paced learner can build the machine, see populated slots, and read benchmark pass/fail without an instructor.

---

*End of `TRAINER_INTEGRATION_ARCHITECTURE.md` v1.0. Phase 2B document 4 of 7. Defines the contract, state, parameter integration, benchmark execution, and migration that make the Trainer the platform. Four build decisions (D-T1…D-T4) routed to `ARCHITECT_DECISIONS.md`. Awaiting approval before producing `LEARNER_JOURNEY.md`.*
