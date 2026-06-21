# The Course Machine — Precision Hydraulic Lift Platform

*The single machine the entire course builds. Selected before Module 03 per the Global Curriculum Production Standard (B6). Every module from here designs, understands, or controls a part of **this** machine; every figure, demo, worked example, and number reinforces the same system.*

---

## The machine, in one sentence

**A precision hydraulic lift platform that raises a heavy load to a commanded height and holds it there to within ±1 mm.**

## What it does

A vertical hydraulic cylinder, mounted in a rigid frame, drives a guided platform up and down. A load rides on the platform. The platform must reach a commanded height quickly, stop precisely, and hold steady against the load without drifting. A position sensor on the frame reports where the platform actually is.

## Why it exists

Many machines must place a heavy load at an exact height and keep it there — lift tables, machine-tool axes, material-handling stages, agricultural positioning rigs. They need three things at once: **large force** (to raise the load), **steady holding** (to stay put under load), and **precision** (to stop within a millimetre). Fluid power delivers the force and the hold; this course adds the precision and, eventually, the autonomy.

## How to sketch it

> A frame with two vertical guide rails. A hydraulic cylinder stands in the middle, its rod pushing a flat platform up between the rails. A load sits on the platform. A position scale runs up one rail. Off to the side, a power unit (motor + pump + reservoir) feeds the cylinder through a line.

If a learner can draw that, they can hold the whole course in their head.

## Canonical anchor (unchanged, `wp-1.1.0`)

| Quantity | Value |
|----------|-------|
| Cylinder bore | 50 mm |
| Working pressure | 100 bar |
| Lift capacity | ≈ 19.6 kN (≈ two tonnes) |
| Positioning target | ±1 mm |
| Steady extend velocity | 84.53 mm/s |

These are the same numbers used since Module 01 and in the Module 05 power-unit sizing — the machine choice keeps all prior work valid.

---

## What each module designs of this machine (the continuity spine, B6)

| Module | The part being designed | The new decision it unlocks |
|--------|-------------------------|------------------------------|
| 01 Introduction | the whole machine, as a concept | is fluid power the right choice here? |
| 02 Components | the parts list of the platform | which components does it need? |
| 03 Fluid Fundamentals | the fluid that powers it | how much pressure and flow does it demand? |
| 04 Actuators | the cylinder that lifts the platform | how much force and speed will the cylinder give? |
| 05 Power Units | the power unit feeding the cylinder | what pump, motor, relief, and reservoir to specify? |
| 06 Valves & Control | directing flow to raise / lower / hold | which valves command the platform? |
| 07 Circuits | the complete hydraulic circuit | how do the parts connect, and how is the load held? |
| 08 Electrohydraulic | sensors and solenoids on the platform | how is it driven and sensed electrically? |
| 09 Modeling & Simulation | a simulation model of the platform's motion | will it reach the height in time, before we build? |
| 10 Control Systems | closed-loop position control | how do we hit ±1 mm and hold it? |
| 11 Digital Twins | a live digital model of the running platform | is the real platform behaving as designed? |
| 12 Fluid-Powered Physical AI | the platform operating autonomously | can it position, monitor, and adapt on its own? |

Read top to bottom, the course is one machine becoming more capable — never a list of topics.

---

## Production note

- The Module 01 figure and the hydraulic-jack demo already depict this machine's essentials (cylinder, fluid, load, lift). They remain valid.
- From Module 03 onward, every figure, demo, and worked example depicts the **Precision Hydraulic Lift Platform** specifically, using the canonical anchor above.
- The machine's name appears in learner prose as "the lift platform" or "the platform" — plain language, per B5.
