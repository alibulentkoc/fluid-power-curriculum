# Module 08 — Electrohydraulic Control

> **Capability this module adds:** drive and sense the platform *electrically* — replace the manual lever with a command signal to the valve, and read the platform's state back through sensors.
>
> **Deliverable it produces:** an electrically-driven, electrically-sensed platform — command in, measurements out — ready for the simulation of Module 09 and the closed-loop control of Module 10.

You have a complete, fail-safe hydraulic circuit. Until now a person moved its lever. This module puts a **wire** where the lever was: a current signal commands the proportional valve, and sensors report back where the platform is and how hard it is working. That is the electrohydraulic interface — the bridge between the hydraulics you have built and the control you will build.

Crucially, this module does **not** close the loop yet. It answers *how the platform is driven and sensed electrically* — the actuator command chain and the measurement chain — and leaves the loop open. Wiring those two chains into a controller that hits and holds ±1 mm is Module 10; simulating the driven platform first is Module 09.

## The five lessons

1. **Commanding with electricity** — the proportional solenoid: how a current command becomes spool position, flow, and platform speed.
2. **On/off vs proportional** — the two kinds of electrical valve, what each can and cannot do, and why the platform needs proportional.
3. **Sensing position** — measuring where the platform is: sensor type, range over the 600 mm stroke, and the resolution a ±1 mm goal demands.
4. **Sensing pressure and load** — reading force and safety electrically with pressure transducers.
5. **The driven-and-sensed platform** — command in, measurements out: the complete electrohydraulic interface, ready for Modules 09 and 10.

Each lesson adds one piece of the electrical interface and checks it against the platform's real numbers — the 10 L/min flow, the 600 mm stroke, the ±1 mm target — so that what leaves this module is not a diagram but a specified, wired machine.
