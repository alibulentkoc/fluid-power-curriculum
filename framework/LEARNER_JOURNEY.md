# LEARNER_JOURNEY.md

**Project:** Fluid-Powered Physical AI Curriculum
**Document type:** Learner Transformation Model (Directive v3.0)
**Version:** 1.1
**Last updated:** 2026-06-20
**Consumes:** `CANONICAL_PARAMETER_MODEL.md` (Educational Ownership), `TRAINER_INTEGRATION_ARCHITECTURE.md` (`workcell_state` slots, benchmarks)
**Feeds:** `COMPETENCY_MAP.md` (next), and downstream certification/credit/workforce frameworks
**Status:** Authoritative for the learner-identity arc and stage boundaries.

**Changelog:** v1.1 — added the Physical AI definition to Stage 4. v1.0 — initial five-stage identity arc.

---

## 0. Purpose and authority

After the project has defined its truth (PROJECT_STATE), progress (master_progress), parameters (Canonical Model), and platform (Trainer Architecture), this document answers the next question: **who is the learner becoming?**

It defines the professional-identity arc the curriculum moves a learner along, binds each identity stage to the modules that produce it, the `workcell_state` slots it fills, the benchmark tasks it advances, and the competency groups it will be assessed against. It is the bridge between *capability* (what the machine can do) and *identity* (who the learner has become by building it).

Where any module, lesson, or credential describes learner progression in a way that conflicts with this arc, **this document is authoritative**.

---

## 1. Design principles

1. **Identity, not topics.** Progress is named as a professional the learner becomes, not a list of subjects covered.
2. **Every module moves the learner forward.** No module leaves the learner in the same identity it found them.
3. **Stackable.** Each identity transition is a meaningful stopping point and a stackable credential checkpoint (§5) — important for non-degree audiences.
4. **Multi-entry, multi-exit.** Different audiences enter and exit at different identities (§6); the arc is a ladder, not a single mandatory run.
5. **Grounded in the machine.** Each identity is defined by what the learner can build and demonstrate in the Trainer, not by what they have read.

---

## 2. The transformation model

The directive's three-phase model — Starting Identity → Developing Identity → Professional Identity — is realized as a five-stage arc:

```
Starting        Developing                                  Professional
─────────   ─────────────────────────────────────   ───────────────────────
Beginning   Fluid Power   →  Fluid Power   →  Electrohydraulic   →  Physical AI
Student     Analyst          Designer         Systems Engineer      Systems Engineer
```

Each stage is an identity the learner *earns by building a portion of the machine*. The arc deliberately mirrors the directive's Physical-AI progression (physical → modeling → simulation → control → sensing → electrohydraulics → twins → intelligent systems → Physical AI): identity advances only as the engineering substrate is built beneath it.

---

## 3. The arc across twelve modules

```
 Identity:   Beginning │ Fluid Power Analyst │ Fluid Power Designer │ Electrohydraulic Eng │ Physical AI Eng
             Student    │                     │                      │                      │
 Modules:    (entry)    │   M01 M02 M03 M04   │   M05 M06 M07 M08    │      M09 M10         │   M11 M12
 Machine:    —          │ concept→fluid→twin  │ power→motion→circuit │  sensors→control     │ twin→demonstration
 Benchmark:  —          │ positioning (sim)   │ positioning + force  │  force + autonomous  │ autonomous (full)
 Can now:    —          │ analyze & predict   │ design & integrate   │  sense & control     │ build autonomous AI
```

Four transitions, each a credential checkpoint (§5). The capstone (M12) is the final demonstration that the Physical AI identity is real, not asserted.

---

## 4. Stage-by-stage definition

### Stage 0 — Beginning Student (entry identity)

- **Holds:** curiosity and prerequisites (see §6 entry profiles). No machine yet.
- **Cannot yet:** reason quantitatively about a fluid-powered system.
- **Transition trigger:** completes M01 orientation and can describe the whole machine.

### Stage 1 — Fluid Power Analyst (Developing)

- **"I can now":** understand a fluid-powered system, specify its fluid, and **predict its cylinder's motion** with a validated model.
- **Modules:** M01–M04.
- **Machine built (`workcell_state`):** `concept`, `hardware`, `fluid`, `twin.cylinder`, `twin.pressures`.
- **Benchmark advanced:** Precision Positioning (simulated trajectory).
- **Competency group (→ COMPETENCY_MAP, provisional):** *Model Hydraulic Systems*; *Analyze System Performance*.
- **Parameter groups owned (→ Educational Ownership):** supply, cylinder, fluid, dynamics.
- **Evidence at exit:** the validated `cylinder_simulation` artifact + a passing positioning-sim score.

### Stage 2 — Fluid Power Designer (Developing)

- **"I can now":** size and integrate a complete fluid-power system — power source, motion control, actuator — into one working circuit.
- **Modules:** M05–M08.
- **Machine built:** `power_unit`, `motion_control`, `actuator`, `circuit`.
- **Benchmark advanced:** Precision Positioning (powered/metered) and Force-Controlled Interaction (begins).
- **Competency group (provisional):** *Design Fluid Power Solutions*.
- **Parameter groups owned:** power_unit (tbd), valve, actuator.
- **Evidence at exit:** HPU design, motion-control architecture, actuator selection report, integrated ISO 1219 circuit with energy budget — all in `workcell_state`.

### Stage 3 — Electrohydraulic Systems Engineer (Professional, entry)

- **"I can now":** give the machine senses and an embedded control brain — perceive state and close the loop.
- **Modules:** M09–M10.
- **Machine built:** `sensors`, `control`.
- **Benchmark advanced:** Force-Controlled Interaction (closed-loop) and Autonomous Manipulation (begins).
- **Competency group (provisional):** *Create Electrohydraulic Controllers*.
- **Parameter groups owned:** sensors (tbd), control (tbd).
- **Evidence at exit:** wired sensor layer + working PID and task state machine, scored against the force benchmark in the Trainer.

### Stage 4 — Physical AI Systems Engineer (Professional)

*A Physical AI Systems Engineer can model, monitor, and improve the behavior of a real physical system using sensing, control, simulation, and digital-twin technologies.*

- **"I can now":** build a self-aware, autonomous fluid-powered system — an integrated digital twin that monitors the machine, and an autonomous task demonstration validated against it.
- **Modules:** M11–M12.
- **Machine built:** `integrated_twin`, `demonstration`.
- **Benchmark advanced:** Autonomous Manipulation (full, end-to-end).
- **Competency group (provisional):** *Build Physical AI Systems*.
- **Parameter groups owned:** twin (tbd).
- **Evidence at exit:** the full twin with fault detection + the capstone demonstration passing all three benchmark tasks autonomously — the terminal proof of identity.

---

## 5. Identity transitions as stackable credentials (forward hook)

Each of the four transitions is a natural credential checkpoint. This is a forward hook for `CERTIFICATION_FRAMEWORK.md`; it is **named here, designed there.**

| Credential checkpoint | Earned by | Evidence (from Trainer) |
|-----------------------|-----------|-------------------------|
| → Fluid Power Analyst | completing M01–M04 | analyst-stage artifacts + positioning-sim score |
| → Fluid Power Designer | completing M05–M08 | design artifacts + integrated circuit + positioning/force scores |
| → Electrohydraulic Engineer | completing M09–M10 | sensor layer + controller + force score |
| → Physical AI Engineer | completing M11–M12 | integrated twin + capstone autonomous score |

Because they are stackable, a learner who stops after Stage 2 still leaves with a real, defensible credential — which is what makes the arc usable for technicians, continuing-ed, and workforce learners (§6).

---

## 6. Multi-audience pathways

The directive requires the curriculum to serve students, technicians, engineers, continuing-ed, and workforce participants. The arc supports this through different entry and target identities. (Entry-competency profiles and the full audience tiering are owned by the future Workforce framework; this section establishes the journey-level structure it builds on.)

| Audience | Typical entry | Typical target identity | Notes |
|----------|---------------|-------------------------|-------|
| Engineering student | Beginning Student | Physical AI Engineer (full arc) | The complete journey |
| Technician | Beginning Student | Fluid Power Analyst → Designer | Operate, maintain, basic design; Physical AI optional |
| Practicing engineer | Fluid Power Analyst (placement) | Electrohydraulic / Physical AI | May test out of Stage 1 |
| Continuing-ed learner | varies (placement) | any stacked credential | Self-paced; stops at any checkpoint |
| Workforce participant | Beginning Student | Analyst / Designer (applied) | Emphasis on the machine and benchmarks over derivations |

**Placement (forward hook):** entry above Beginning Student requires evidence of the prior identity's competencies — defined in `COMPETENCY_MAP.md` and gated by the certification framework. Not designed here.

---

## 7. Master mapping — identity ↔ module ↔ state ↔ benchmark ↔ competency ↔ parameters

This table is the cross-link the architecture has been converging toward. It binds the learner-identity arc to every other layer, and is the direct seed for `COMPETENCY_MAP.md`.

| Identity | Modules | `workcell_state` slots | Benchmark | Competency group (→ map) | Parameter groups (→ Educational Ownership) |
|----------|---------|------------------------|-----------|--------------------------|--------------------------------------------|
| Beginning Student | entry | — | — | — | — |
| Fluid Power Analyst | M01–M04 | concept, hardware, fluid, twin.cylinder | positioning (sim) | Model Hydraulic Systems; Analyze Performance | supply, cylinder, fluid, dynamics |
| Fluid Power Designer | M05–M08 | power_unit, motion_control, actuator, circuit | positioning, force | Design Fluid Power Solutions | power_unit*, valve, actuator |
| Electrohydraulic Engineer | M09–M10 | sensors, control | force, autonomous | Create Electrohydraulic Controllers | sensors*, control* |
| Physical AI Engineer | M11–M12 | integrated_twin, demonstration | autonomous | Build Physical AI Systems | twin* |

`*` = parameter group currently TBD (owned by a planned module). Competency groups are **provisional**, named from the directive's five competencies, to be formalized in `COMPETENCY_MAP.md` — which should cross-link back to both this arc and the Educational Ownership table, per the architect's note that those parameter groups are the seed of the competencies.

---

## 8. Relationship to other documents

- **Consumes:** the `workcell_state` slot model and benchmark runners (Trainer Architecture); the Educational Ownership parameter groups (Canonical Model).
- **Feeds:** `COMPETENCY_MAP.md` (the provisional competency groups become formal competencies with evidence); `CERTIFICATION_FRAMEWORK.md` (the four checkpoints become credentials); the Workforce framework (the audience pathways).
- **Stays synced with:** the artifact-accumulation map in Trainer Architecture §6 — the two must always agree on which modules fill which slots.

---

## 9. Exists / preserve / modify / create

- **Exists:** the `CAPABILITY_GROWTH_MAP` (capability progression — the skeleton); the module/benchmark structure.
- **Preserve:** the capability-growth progression as the substrate beneath the identity arc.
- **Modify:** reframe capability progression as *identity* progression (the directive's transformation model).
- **Create:** the five named identities, the four credential checkpoints, the multi-audience pathways, and the master cross-link table (§7).

---

## 10. Open questions (→ ARCHITECT_DECISIONS.md / later frameworks)

| ID | Question | Owner |
|----|----------|-------|
| D-LJ1 | Are the four checkpoints separate micro-credentials, or a single progressive credential with four levels? | Certification framework |
| D-LJ2 | Exact placement/test-out evidence for mid-arc entry | Competency + certification |
| D-LJ3 | Do technician/workforce variants alter module *depth*, or only the target identity (same content, different stop point)? | Workforce framework |

None block the Competency Map; they shape certification and workforce design.

---

## 11. Acceptance criteria

1. Every module belongs to exactly one identity stage; every stage names what the learner "can now" do.
2. Each stage binds to specific `workcell_state` slots and at least one benchmark.
3. Each transition is a stackable credential checkpoint with Trainer-sourced evidence.
4. The arc supports at least the five required audiences via entry/target identities.
5. The §7 master table agrees with Trainer Architecture §6 and seeds the Competency Map.

---

*End of `LEARNER_JOURNEY.md` v1.1. Phase 2B document 5 of 7. Defines the five-stage identity arc, stackable credential checkpoints, multi-audience pathways, and the master cross-link that seeds the Competency Map. Awaiting approval before producing `COMPETENCY_MAP.md`.*
