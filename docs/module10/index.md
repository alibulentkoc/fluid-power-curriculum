# Module 10 — Control Systems

> **Capability this module adds:** close the loop — use the platform's own position measurement to correct its command in real time, so it reaches a commanded height and holds it to ±1 mm despite drift and disturbance.
>
> **Deliverable it produces:** a tuned position controller for the platform — the rule that turns measured error into command — validated in simulation to hit and hold ±1 mm, ready for the live digital model of Module 11.

Every module so far has built toward one number: ±1 mm. The platform can be driven and sensed (Module 08) and its motion predicted (Module 09), but left open-loop it drifts — a few percent of speed error smears its arrival by a centimetre or more. The missing piece is *feedback*: letting the platform watch its own position and correct the command to close the gap. That is control, and it is what finally delivers the precision the whole curriculum has been aiming at.

This module builds the controller step by step against the validated model from Module 09. It starts with the feedback principle, adds proportional then integral and derivative action, tunes the loop against the oil-spring resonance that caps its speed, and runs the full closed-loop mission. What leaves the module is a controller that hits ±1 mm and holds it — and a clear-eyed account of what sets the limits on how fast and how tightly it can do so.

## The five lessons

1. **The feedback principle** — from open-loop drift to closed-loop correction: measure the error, drive it to zero.
2. **Proportional control** — the simplest controller, its gain and its limits: fast response, residual droop, and the resonance ceiling.
3. **PID control** — adding integral action to erase droop and derivative action to damp, for zero-error holding.
4. **Tuning and stability** — setting the gains against the ~12 Hz oil-spring resonance to be fast yet stable, with margin.
5. **The closed-loop platform** — running the full mission under control: hit ±1 mm, hold it, and reject disturbances. Closing the module.

Each lesson is tested against the platform's real numbers — ±1 mm, 85 mm/s, 12 Hz oil spring, 115 bar relief — so the controller that leaves this module governs the machine we actually modeled, not a generic plant.
