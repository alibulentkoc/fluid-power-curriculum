# Module 11 — The Live Digital Model

> **Capability this module adds:** run the validated model *live*, in lockstep with the real platform, feeding it the same commands and comparing its predictions against the machine's measurements — so you know, continuously, whether the real platform is behaving as designed.
>
> **Deliverable it produces:** a live monitoring model beside the running platform that turns the gap between predicted and measured behaviour into a health signal — catching faults, drift, and wear before they become failures.

The platform is built, modeled, and controlled — it lifts two tonnes and holds ±1 mm. But a real machine changes over time: seals wear, oil ages, friction creeps, air ingresses. The controller hides much of this by correcting for it, which means a machine can be silently degrading while still meeting spec — until it suddenly does not. The remedy is to run the validated model of Module 09 *alongside* the real machine, driven by the same commands, and watch where prediction and reality diverge. A model that matches means a machine behaving as designed; a growing gap means something has changed, and often reveals what.

This module builds that live comparison. It starts with the concept of a model running in lockstep, defines the residual between predicted and measured as the health signal, uses it to detect and diagnose faults, adds state estimation to see quantities no sensor measures directly, and assembles the complete monitored platform. What leaves the module — and closes the curriculum — is a machine that not only works but knows whether it is working, watching itself against the model of how it was designed to behave.

## The five lessons

1. **The live digital model** — running the validated model in lockstep with the machine, comparing predicted against measured.
2. **The residual signal** — the gap between prediction and measurement as the platform's health signal: small when healthy, growing when not.
3. **Detecting and diagnosing faults** — thresholds on the residual, and the distinct signatures a leak, added friction, or entrained air leave behind.
4. **Estimating hidden state** — fusing model and measurements to see internal quantities no sensor reads directly, and tracking parameters as they drift.
5. **The monitored platform** — the complete live model beside the controlled machine, catching a developing fault before it becomes a failure. Closing the curriculum.

Each lesson is grounded in the platform's real numbers — its validated model, its ±0.02 mm hold, its 12 Hz oil spring — so the monitoring built here watches the actual machine this curriculum designed, controlled, and now keeps well.
