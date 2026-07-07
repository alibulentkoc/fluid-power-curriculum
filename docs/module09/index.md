# Module 09 — Modeling & Simulation

> **Capability this module adds:** predict the platform's motion with a mathematical model — run it in software to answer "will it reach the height in time, and stay within its limits?" *before* committing to hardware.
>
> **Deliverable it produces:** a validated simulation of the driven-and-sensed platform — same command→(position, pressure) interface, now running in software — ready for the controller design of Module 10.

Module 08 handed over a plant: command in, position and pressure out, but the loop still open. Before wrapping a controller around a two-tonne machine, it pays to build a *model* of it — equations that reproduce the same input-to-output behaviour in software. With a model you can ask the mission question ("does it lift the load the required height in the required time?"), find pressure peaks, and later tune a controller — all at the cost of a re-run, not a rebuild.

This module builds that model from the physics you already know — Newton's law for the moving mass, and the hydraulics for how flow builds pressure and moves the piston — then solves it numerically, checks it against reality, and runs the mission. What leaves the module is a trustworthy simulation with the *same interface* as the real platform, so a controller developed against the model will work against the machine.

## The five lessons

1. **Why model the platform** — the case for simulation, and what a model is: equations that turn a command into predicted motion.
2. **The equations of motion** — Newton for the mass plus hydraulics for flow and pressure: the platform's dynamic model.
3. **Solving it numerically** — turning the equations into a running simulation with numerical integration, and choosing a stable time step.
4. **Validating the model** — checking the simulation against known behaviour and identifying its parameters, so it can be trusted.
5. **Simulating the mission** — running the raise-to-height scenario end to end: does it arrive in time and within limits? Closing the module for control.

Each lesson is checked against the platform's real numbers — 2 t, 10 L/min, 85 mm/s, 600 mm, 115 bar — so the model that leaves this module predicts the machine you actually built, not a generic one.
