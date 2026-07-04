# Module 04 — Actuators

> **The machine:** the **Precision Hydraulic Lift Platform** — raises a load to a commanded height and holds it to within ±1 mm.
> **What this module does:** Module 03 filled the loop with a fully specified fluid. Module 04 turns that fluid into motion — it works out exactly how much **force** and **speed** the cylinder will give, and what stands between the ideal figures and the real ones.

---

## Where you are in the build

You have the components (Module 02) and the fluid that fills them (Module 03): mineral hydraulic oil, ISO VG 46, stiff at 1.8 GPa, held clean to ISO 18/16/13, delivered at 100 bar and 10 L/min. Now the question is what the actuator does with it. Module 01 gave the headline figure — force = pressure × area, about 19.6 kN — but a real cylinder is more than a piston: it has a **rod**, it carries **mass**, it fights **friction**, and it has to **stop** at the ends without slamming.

Each lesson takes one part of "what the cylinder gives" and settles it with the platform's own numbers.

1. **Force from pressure** — how hard the cylinder pushes, extending and retracting. *Decision: the force each way.*
2. **Speed from flow** — how fast it moves, extending and retracting. *Decision: the speed each way.*
3. **Friction and the usable force** — what mass and friction subtract from the ideal. *Decision: the real, usable force.*
4. **Cushioning and end-of-stroke** — stopping the load safely at the ends of travel. *Decision: how to decelerate.*
5. **The cylinder in motion** — mass and fluid stiffness together, over a full pick cycle. *Decision: the dynamic response.*

By the end you will know the cylinder's force and speed in both directions, honestly derated for the real world — ready for Module 05 to size the power unit that feeds it.

---

## Lessons

| # | Lesson | The actuator decision |
|---|--------|-----------------------|
| 01 | Force from pressure | Extend vs retract force; the rod's effect |
| 02 | Speed from flow | Extend vs retract speed from the same flow |
| 03 | Friction and the usable force | Mass and friction derate the ideal force |
| 04 | Cushioning and end-of-stroke | Decelerating the load at the ends |
| 05 | The cylinder in motion | Dynamic response over a pick cycle |

*Start with Lesson 01 — Force from pressure.*
