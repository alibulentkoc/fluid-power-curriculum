# COMPETENCY_MAP.md

**Project:** Fluid-Powered Physical AI Curriculum
**Document type:** Competency framework (Competency-First + Assessment Architecture, Directive v3.0)
**Version:** 1.0
**Last updated:** 2026-06-20
**Consumes:** `LEARNER_JOURNEY.md` (identity arc, provisional competency groups), `CANONICAL_PARAMETER_MODEL.md` (Educational Ownership parameter groups), `TRAINER_INTEGRATION_ARCHITECTURE.md` (`workcell_state`, benchmark runners)
**Feeds:** `ASSESSMENT_MAP.md` (next), `CERTIFICATION_FRAMEWORK.md`, Workforce framework
**Status:** Authoritative for what the learner must be able to *do* and what evidence demonstrates it.

---

## 0. Purpose and authority

The directive requires the curriculum be organized around **competencies** — demonstrable capabilities with evidence — not topics, and that **every assessment answer "what capability has been demonstrated?"** This document names the competencies, decomposes them to the module level, and binds each to the Trainer evidence that proves it.

It does **not invent** competencies. It formalizes the five groups that already emerged in the Learner Journey, which are themselves the directive's five named competencies. The sequencing working out this way — the competencies surfacing from the identity arc rather than being imposed — is the signal that the architecture order is correct.

Where any assessment, lesson, or credential defines a competency or its evidence in conflict with this document, **this document is authoritative**.

---

## 1. Design principles

1. **A competency is a demonstrable capability with evidence.** "Knows about X" is not a competency; "can do X, shown by artifact Y" is.
2. **Evidence is Trainer-sourced.** Every competency's evidence is an artifact in `workcell_state` and/or a scored benchmark run — not a quiz score, not attendance.
3. **No invented competencies.** The five core competencies are the directive's five. Granularity is added *below* them as module-level enabling competencies, never beside them.
4. **Each competency maps to an identity and to a workplace capability.** It tells the learner who they have become and what they can do on the job.
5. **Honest status.** A competency is marked demonstrable now only where its modules are delivered.

---

## 2. The competency model

```
Core competency  (5, from the directive)
   └── Enabling competencies  (module-level: the specific things that build the core)
          └── Evidence  (workcell_state artifact and/or scored benchmark)
                 └── Acceptance criteria  (from canonical model + benchmark targets)
```

Each core competency carries: a "can do" statement, its identity stage, its modules, its evidence, acceptance criteria, the parameter groups it rests on (Educational Ownership cross-link), and its enabling competencies.

---

## 3. Status legend

| Tag | Meaning |
|-----|---------|
| ✅ **Demonstrable now** | Modules delivered; evidence can be produced today (M01–M04). |
| 🟡 **Partial** | Some enabling competencies delivered, others planned. |
| ⬜ **Planned** | Owned by planned modules (05–12); not yet demonstrable. |

These mirror `PROJECT_STATE.md` delivery state — a competency cannot be "demonstrable" if its module isn't.

---

## 4. The five core competencies

### C1 — Model Hydraulic Systems ✅

- **Can do:** understand a fluid-powered system, specify its fluid, and predict its cylinder's motion with a validated model.
- **Identity:** Fluid Power Analyst · **Modules:** M01–M04 · **Benchmark:** Positioning (simulated).
- **Evidence:** the validated `cylinder_simulation` artifact in `workcell_state.twin.cylinder`.
- **Acceptance:** simulated steady velocity within ±10 % of the analytical estimate; ODE stable; validated against an independent hand calculation.
- **Parameter groups (→ Educational Ownership):** supply, cylinder, fluid, dynamics.
- **Enabling competencies:**

| ID | Enabling competency | Module | Evidence slot | Status |
|----|---------------------|--------|---------------|--------|
| C1.1 | Frame the whole machine and its task | M01 | `concept` | ✅ |
| C1.2 | Identify and select components | M02 | `hardware` | ✅ |
| C1.3 | Specify the working fluid | M03 | `fluid` | ✅ |
| C1.4 | Model valve/orifice flow | M04-L02 | `twin` (valve model) | ✅ |
| C1.5 | Model cylinder force balance with Stribeck friction | M04-L03 | `twin.cylinder` | ✅ |
| C1.6 | Model pressure dynamics / bulk modulus | M04-L04 | `twin.pressures` | ✅ |
| C1.7 | Assemble and validate the coupled simulation | M04-L05 | `twin.cylinder` | ✅ |

### C2 — Analyze System Performance 🟡

- **Can do:** evaluate how well the machine performs — trajectory, cycle time, energy, and low-speed behavior — against targets.
- **Identity:** Fluid Power Analyst → Designer · **Modules:** M04 onward · **Benchmark:** Positioning (analysis).
- **Evidence:** a scored positioning benchmark run + a performance analysis in `workcell_state.benchmark_scores`.
- **Acceptance:** positioning analysis meets ±1 mm and the cycle-time target in the Trainer.
- **Parameter groups:** dynamics, supply, cylinder (+ power_unit* once M05 lands).
- **Enabling competencies:**

| ID | Enabling competency | Module | Status |
|----|---------------------|--------|--------|
| C2.1 | Predict cylinder trajectory and cycle time | M04 | ✅ |
| C2.2 | Diagnose stick-slip and low-speed behavior | M04-L03 | ✅ |
| C2.3 | Analyze energy use and losses | M03-L04, M05, M08 | 🟡 |
| C2.4 | Evaluate performance against the positioning benchmark | Trainer runner | 🟡 (sim now; measured after M09) |

### C3 — Design Fluid Power Solutions ⬜

- **Can do:** size and integrate a complete fluid-power system — power source, motion control, actuator — into one working circuit.
- **Identity:** Fluid Power Designer · **Modules:** M05–M08 · **Benchmark:** Positioning + Force.
- **Evidence:** the design report set (HPU design, motion-control architecture, actuator selection, integrated ISO 1219 circuit with energy budget) in `workcell_state`.
- **Acceptance:** the designed system meets positioning and force targets in Trainer simulation; the energy budget closes.
- **Parameter groups:** power_unit*, valve, actuator, circuit*.
- **Enabling competencies:** size the HPU (M05); design motion control (M06); select and justify the actuator (M07); integrate the full circuit with an energy budget (M08). All ⬜ pending delivery.

### C4 — Create Electrohydraulic Controllers ⬜

- **Can do:** give the machine senses and a control brain — perceive state and close the loop with stable, safe control.
- **Identity:** Electrohydraulic Systems Engineer · **Modules:** M09–M10 · **Benchmark:** Force + Autonomous (begins).
- **Evidence:** a working controller (PID + task state machine) and a wired sensor layer in `workcell_state.control` / `.sensors`.
- **Acceptance:** force benchmark met closed-loop; controller stable; safety states verified.
- **Parameter groups:** sensors*, control*.
- **Enabling competencies:** specify and wire the sensor layer (M09); implement PID control (M10-L02); build the task state machine and safety logic (M10-L03); validate the closed loop in simulation (M10-L04). All ⬜.

### C5 — Build Physical AI Systems ⬜

- **Can do:** *model, monitor, and improve the behavior of a real physical system using sensing, control, simulation, and digital-twin technologies* — culminating in a self-aware, autonomous machine.
- **Identity:** Physical AI Systems Engineer · **Modules:** M11–M12 · **Benchmark:** Autonomous (full).
- **Evidence:** the integrated digital twin with fault detection + the capstone demonstration in `workcell_state.integrated_twin` / `.demonstration`.
- **Acceptance:** all three benchmark tasks pass autonomously; twin residual stays within bounds; no human intervention.
- **Parameter groups:** twin*.
- **Enabling competencies:** integrate the full twin (M11); implement fault detection / residual monitoring (M11); commission and integrate the system (M12); run and document the autonomous demonstration (M12). All ⬜.

`*` = parameter group currently TBD in the canonical model.

---

## 5. Competency → evidence map

The directive's competency/evidence pairing, made concrete and acceptance-bound. `ASSESSMENT_MAP.md` reads this table.

| Competency | Evidence (Trainer) | Benchmark | Acceptance criteria | Status |
|------------|--------------------|-----------|---------------------|--------|
| C1 Model Hydraulic Systems | Validated cylinder simulation | Positioning (sim) | ±10 % vs analytical; ODE stable; validated | ✅ |
| C2 Analyze System Performance | Scored benchmark + analysis | Positioning | ±1 mm; cycle-time target met | 🟡 |
| C3 Design Fluid Power Solutions | Design report + integrated circuit | Positioning + Force | targets met in sim; energy budget closes | ⬜ |
| C4 Create Electrohydraulic Controllers | Working controller + sensor layer | Force | closed-loop force tolerance; stable; safe | ⬜ |
| C5 Build Physical AI Systems | Integrated twin + capstone | Autonomous | all 3 tasks autonomous; residual in bounds | ⬜ |

---

## 6. Master cross-link (extends Learner Journey §7)

| Competency | Identity | Modules | `workcell_state` slots | Benchmark | Parameter groups (Educational Ownership) | Status |
|------------|----------|---------|------------------------|-----------|------------------------------------------|--------|
| C1 | Fluid Power Analyst | M01–M04 | concept, hardware, fluid, twin.cylinder, twin.pressures | positioning (sim) | supply, cylinder, fluid, dynamics | ✅ |
| C2 | Analyst → Designer | M04+ | twin, benchmark_scores | positioning | dynamics, supply, cylinder | 🟡 |
| C3 | Fluid Power Designer | M05–M08 | power_unit, motion_control, actuator, circuit | positioning, force | power_unit*, valve, actuator | ⬜ |
| C4 | Electrohydraulic Engineer | M09–M10 | sensors, control | force, autonomous | sensors*, control* | ⬜ |
| C5 | Physical AI Engineer | M11–M12 | integrated_twin, demonstration | autonomous | twin* | ⬜ |

This table, the Learner Journey §7 table, and the Trainer artifact-accumulation map (Trainer Architecture §6) must always agree. Together they are the single spine of the platform.

---

## 7. Workplace-capability mapping (workforce hook)

Each competency maps to a workplace capability, satisfying the directive's requirement that outcomes map to workplace capability where practical. The full audience tiering is owned by the Workforce framework; this is the seed.

| Competency | Workplace capability |
|------------|----------------------|
| C1 Model | Predict and troubleshoot machine behavior via a model; support commissioning |
| C2 Analyze | Performance analysis, diagnostics, optimization of fluid-power systems |
| C3 Design | Fluid-power system design and specification |
| C4 Controllers | Electrohydraulic controls / automation engineering |
| C5 Physical AI | Digital-twin and autonomy engineering for physical systems |

A technician pathway may target C1–C3; an engineer pathway targets C1–C5 (see Learner Journey §6).

---

## 8. Relationship to Educational Ownership

Per the architect's note, the Educational Ownership parameter groups in the Canonical Model are the **seed** of these competencies, and the link is explicit and bidirectional:

```
Educational Ownership (parameters)        Competency Map
  fluid group        (M03)        ──►      C1.3 Specify the working fluid
  cylinder+dynamics  (M04)        ──►      C1.5 Model force balance
  supply             (M01)        ──►      C2 Analyze performance
  sensors* / control*(M09–M10)    ──►      C4 Create controllers
```

A future change to a parameter group's ownership should trigger a review of the competency that rests on it, and vice versa. When `parameter_registry.csv` is built (Canonical Model §11, deferred), it should carry a `competency` column closing this loop.

---

## 9. Forward hook to the Assessment Map

This document says *what* must be demonstrated and *what evidence* counts. `ASSESSMENT_MAP.md` (next) says *how it is scored*: it turns each competency's evidence and acceptance criteria into a concrete, repeatable, Trainer-executed assessment, and distinguishes formative practice (the existing ungraded quizzes, kept) from summative competency verification (the benchmark-based evidence here). No physics is re-implemented there; it interprets Trainer evidence against these competencies.

---

## 10. Exists / preserve / modify / create

- **Exists:** the provisional competency groups (Learner Journey); the directive's five named competencies; the capability-added boxes per delivered lesson.
- **Preserve:** the five-competency structure (do not expand sideways); the capability-added framing as enabling-competency source text.
- **Modify:** convert capability statements into evidence-bound competencies; reframe assessment around them.
- **Create:** the enabling-competency decomposition, the evidence/acceptance binding, the workplace mapping, and the cross-link tables.

---

## 11. Open questions (→ ARCHITECT_DECISIONS.md / later frameworks)

| ID | Question | Owner |
|----|----------|-------|
| D-CM1 | Are C1 and C2 separately credentialed, or jointly at the Analyst checkpoint? | Certification |
| D-CM2 | Minimum enabling-competency coverage required to claim a core competency (all vs threshold) | Assessment + certification |
| D-CM3 | How re-assessment / re-takes work for a failed benchmark | Assessment framework |

None block the Assessment Map; they refine certification and scoring.

---

## 12. Acceptance criteria

1. Exactly five core competencies, each the directive's; none invented.
2. Every core competency has module-level enabling competencies, Trainer-sourced evidence, and acceptance criteria.
3. Every competency maps to an identity, a benchmark, a parameter group, and a workplace capability.
4. Status honestly reflects delivery (only C1 fully demonstrable now).
5. The §6 cross-link agrees with Learner Journey §7 and Trainer Architecture §6.

---

*End of `COMPETENCY_MAP.md` v1.0. Phase 2B document 6 of 7. Formalizes the five competencies with enabling decomposition, evidence, acceptance, and cross-links; nothing invented beyond the directive's five. Awaiting approval before producing `ASSESSMENT_MAP.md`, the final Phase 2B document.*
