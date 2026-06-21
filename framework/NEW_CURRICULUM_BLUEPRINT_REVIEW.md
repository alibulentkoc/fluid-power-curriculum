# New Curriculum Blueprint Review

*Response to the Curriculum Restart Master Directive. Scope: curriculum content production only. The Trainer Architecture, Competency / Assessment / Certification / Credit / Benchmark Frameworks, Canonical Parameter Model, and Trainer Platform are treated as authoritative and unchanged. This is a review. No lessons are written. Stops for approval.*

---

## 1. Headline verdict

The new sequence is **adoptable without changing the Trainer architecture or the 12-slot schema** — every directive module maps cleanly onto an existing state slot. The work splits into: a large **content/narrative rewrite** (sequencing, openings, vocabulary, machine framing), a small **visual/platform preserve** (the lesson framework carries over intact), and one **central reconciliation** that needs your decision before any code moves: the new sequence relocates *simulation* and *the digital twin* off Module 04, which re-owns three contracts the Trainer already encodes.

The single most important finding: **the existing curriculum is built around "the twin is born at M04." The new sequence forbids that.** New M04 is *Hydraulic Actuators*; simulation becomes M09; the digital twin becomes M11. This is correct and pedagogically cleaner, but it is the change everything else orbits.

---

## 2. Sequence comparison — existing (published) vs directive

| # | Existing (published site) | Directive (new) | Artifact (new) | Change |
|---|---------------------------|-----------------|----------------|--------|
| 01 | Foundations | Introduction to Fluid Power Systems | System Concept Diagram | Reframe only |
| 02 | Components | Fluid Power Components | Component Architecture | Reframe only |
| 03 | Fluids (viscosity, contamination, losses) | **Fluid Fundamentals** (pressure, flow, continuity, **hydraulic power, efficiency**) | Fluid Specification | **Scope shift** — M03 now owns the flow/pressure/power fundamentals |
| 04 | **Fluid Mechanics — twin born** (Cylinder Simulation) | **Hydraulic Actuators** | **Actuator Model** | **Redefined** — simulation/twin removed from M04 |
| 05 | Pumps | Hydraulic Power Units | HPU Design | Unchanged in intent |
| 06 | Valves | Hydraulic Valves and Control | Valve Selection Package | Reframe |
| 07 | Actuators (Cylinders & Motors) | Hydraulic Circuits | Circuit Design | **Re-slotted** (actuators move to M04) |
| 08 | Circuit | Electrohydraulic Systems (sensors, solenoids, PLC) | Electrohydraulic Architecture | **Re-slotted** |
| 09 | Sensors | **Modeling and Simulation** | Simulation Model | **Simulation lands here** |
| 10 | Control | Control Systems | Controller Design | Aligned |
| 11 | Digital Twin | Digital Twins | Digital Twin | Aligned |
| 12 | Capstone | Fluid-Powered Physical AI Systems | Integrated Physical AI System | Aligned |

The spine still rises the same way (concept → components → fluid → actuation → power → control → integration), but **simulation is pulled out of M04 and given its own home at M09**, and **actuators get their own module at M04**. That is the structural restart.

---

## 3. What is PRESERVED (carries over intact)

The directive preserves the visual and platform layer explicitly, and that layer is real and built:

- **The lesson framework from M05 L01** — the SVG diagram style, the interactive demo pattern, the auto-graded quiz engine, the coding-exercise pattern, the responsive layout, typography, the 12-part page structure, and the single-file rendered-preview generator. These are the **visual prototypes** the directive says to keep.
- **Trainer Platform + integration architecture** — the 12-slot `workcell_state` schema (unchanged), the contract/`writeSlot` seam, the gate discipline (`verify-*`), evidence export, credential service, units toggle, persistence adapter. All built and verified across Stages 1–6.
- **Canonical Parameter Model** (`wp-1.1.0`) and the **Stage-1 dynamic simulation engine** — the engine itself is unchanged and still valid; only its *curricular home* moves (M04 → M09).
- **Assessment / Certification / Credit / Benchmark frameworks** — authoritative, untouched.

---

## 4. What is REUSED (light retrofit, content-neutral)

- **The 12-slot schema** — no change. Every new module maps to an existing slot (see §6). This is the cleanest possible outcome and the reason the restart doesn't touch the Trainer architecture.
- **`powerUnitContract` (M05 HPU) + its gate** — the HPU sizing math is unchanged and correct. One re-point needed: it currently `reads: ['twin']`; under the new sequence M05 consumes the **Actuator Model (M04)**, so it should `reads: ['actuator']`. Mechanical change, no math change.
- **M05 L01 visual assets** (SVG, demo, quiz) — keep the style and the `Q = A·v`, `P = p·Q` demo; relabel the few places that name "the twin's prediction" to "the actuator model."

---

## 5. What is REWRITTEN (content/narrative — the bulk of the work)

- **Module sequencing** — adopt the new 12-module order (§2).
- **Lesson narratives, openings, framing** — apply the directive's rules: every lesson opens with **machine → problem → decision** before any equation; the learner must *need* the lesson before receiving it.
- **Terminology** — lesson prose must drop curriculum-team vocabulary: no *artifact, competency, benchmark, state, pipeline*; use *design, model, simulation, circuit, machine, controller, report*. **My just-written M05 L01 and manifest violate this** (they say "artifact," "the twin predicts," "v_steady from the twin") and must be reframed — assets preserved, prose rewritten.
- **Digital-twin language** — "the twin predicts…" is banned until M11. Earlier modules use *simulation model / digital model / virtual model*. M05 L01 specifically must stop sourcing its velocity from "the twin" and source it from the **Actuator Model (M04)**.
- **Machine framing & the AI progression** — early modules must not lean on "Smart Agricultural Workcell / Physical AI." The learner becomes a Fluid Power Engineer first and earns *Physical AI* only by M12. Every module must answer: what machine, what it does, why it exists.
- **M03 / M05 boundary** — the flow + pressure → hydraulic-power fundamentals I placed in M05 L01 now belong in **M03 (Fluid Fundamentals)**. M05 should *assume* them and focus on the HPU sizing **decision** (which pump, which motor, what relief, what reservoir).

---

## 6. Proposed module → slot ownership (no schema change)

The 12 slots are unchanged; only **ownership** shifts to match the new sequence. Changes from the old assignment are flagged.

| Slot | New owner | Artifact | vs old owner |
|------|-----------|----------|--------------|
| `concept` | M01 | System Concept Diagram | same |
| `hardware` | M02 | Component Architecture | same |
| `fluid` | M03 | Fluid Specification | same |
| `actuator` | **M04** | Actuator Model | **was M07** |
| `power_unit` | M05 | HPU Design | same |
| `motion_control` | M06 | Valve Selection Package | same |
| `circuit` | **M07** | Circuit Design | **was M08** |
| `sensors` | **M08** | Electrohydraulic Architecture | **was M09** |
| `twin` *(relabel: simulation/digital model)* | **M09** | Simulation Model | **was M04** |
| `control` | M10 | Controller Design | same |
| `integrated_twin` | M11 | Digital Twin | same |
| `demonstration` | M12 | Integrated Physical AI System | same |

Every module has a home; nothing is orphaned; the schema is frozen as-is.

---

## 7. Central reconciliation — needs your decision before any code moves

Adopting the new sequence re-owns three contracts the Trainer already encodes. Because the Trainer architecture is authoritative, I will **not** touch the contract layer without explicit approval. The required changes are:

1. **Re-home the simulation.** `twinContract` (currently owner M04, slot `twin`) becomes the **Simulation Model at M09**, and the slot is *relabeled* "simulation / digital model" in learner-facing terms (the internal slot key `twin` can stay; only the curricular label and owner change). The Stage-1 engine and the Stage-4 positioning runner that consume it are unaffected.
2. **Add an Actuator Model at M04.** A new `actuatorContract` (owner M04, slot `actuator`) produces the quasi-static force/speed the actuator delivers — this is M05's prerequisite. (The slot already exists; it just gains an owner earlier in the sequence.)
3. **Re-point `powerUnitContract`** from `reads: ['twin']` to `reads: ['actuator']`, so M05 sizes the HPU from the Actuator Model, not from a simulation that now lives *after* it.

This is a re-ownership, **not a schema change and not a Trainer-architecture change** — but it does edit the contract layer, so it's yours to approve. It also resolves a dependency question cleanly: M05 (HPU) needs a velocity/force demand, M04 (Actuators) now supplies it quasi-statically, and the full dynamic simulation correctly arrives later at M09.

---

## 8. Honest impact on the M05 work just completed

- **Manifest (`MODULE05_MANIFEST.md`)** — reframe: consumes the *Actuator Model (M04)*, not "the twin"; strip *artifact/state* vocabulary from learner-facing text. The HPU output spec is unchanged.
- **Lesson 01 prose** — rewrite to the directive's opening/terminology rules (machine → problem → decision; no "twin predicts"; fundamentals assumed from M03). **Visual assets are preserved**; only the SVG/quiz wording that references "the twin" is relabeled.
- **`powerUnitContract` + gate** — reused as-is except the one prerequisite re-point in §7.

I'm flagging this directly rather than letting it pass: roughly the prose of the last two deliverables is superseded by the restart, while their code and visuals survive.

---

## 9. Recommended first deliverable after approval

Per the directive's own ordering — and because it unblocks everything — the first build should be **Module 01 framing under the new rules** (the machine: what it is, what it does, why), since "never assume the learner knows the machine" is foundational and M01 sets the voice for all twelve. In parallel, on approval of §7, the three contract re-ownerships are a small, gated change that re-aligns the Trainer with the new sequence.

I have **not** written any lessons. Awaiting your approval of: (a) the new slot-ownership mapping (§6), (b) the contract reconciliation (§7), and (c) the recommended starting point (§9).
