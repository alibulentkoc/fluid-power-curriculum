# Module 06 — Valves & Control

> **The machine:** the **Precision Hydraulic Lift Platform** — raises a load to a commanded height and holds it to within ±1 mm.
> **What this module does:** Module 05 built the power unit that makes clean, cool oil at 10 L/min and 100 bar. But flow with no direction does nothing useful. Module 06 adds the valves that *command* the platform — steering the flow to raise, lower, and hold, and metering it for smooth, precise motion.

---

## Where you are in the build

You have a fully characterised cylinder (Module 04) fed by a complete power unit (Module 05). What is missing is control: something to send the oil to the right side of the piston at the right rate, to hold the load without drift, and to lower it without letting gravity run away with it. That something is a set of valves.

Each lesson takes one control job, states the decision it forces, and settles it with the platform's own numbers.

1. **What the valves must do** — the three commands (raise, lower, hold) and the directional valve that gives them. *Decision: the valve functions the platform needs.*
2. **The directional control valve** — the 4/3 DCV: its ports, positions, and how it routes flow. *Decision: the DCV type and configuration.*
3. **Holding the load** — the centre condition and a leak-free lock so the load does not drift. *Decision: how to hold without creeping.*
4. **Metering flow: the proportional valve** — the orifice law, and proportional control for smooth speed and position. *Decision: how to meter for ±1 mm.*
5. **Controlling the overrunning load** — the counterbalance valve that tames gravity on the way down, and the assembled valve set. *Decision: the complete valve package.*

By the end you will have a valve package that commands the platform — raise, lower, hold, smoothly and safely — ready for Module 07 to wire into the complete circuit.

---

## Lessons

| # | Lesson | The control decision |
|---|--------|----------------------|
| 01 | What the valves must do | The three commands; the directional valve |
| 02 | The directional control valve | 4/3 DCV ports, positions, routing |
| 03 | Holding the load | Centre condition; leak-free load hold |
| 04 | Metering flow: the proportional valve | Orifice law; proportional speed/position control |
| 05 | Controlling the overrunning load | Counterbalance valve; the complete valve set |

*Start with Lesson 01 — What the valves must do.*
