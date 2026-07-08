!!! abstract "You are here"
    **Module 06 — Valves & Control**  ·  **Unit 1 — Commanding the Flow**  ·  **Lesson 04 — Metering flow: the proportional valve**

# Lesson 04 — Metering flow: the proportional valve

> **Module 06 · Lesson 04** · *From on/off to smooth, commanded speed.*
> The platform can now raise, lower, and hold. But a plain directional valve is essentially on or off — the platform lurches to full speed and slams to a stop. To reach a height to ±1 mm, motion must be *metered*: sped up, slowed down, and crept to a precise stop. This lesson adds the proportional valve that does it.
>
> **Learning outcome:** Explain how a proportional valve turns an electrical command into a metered flow and speed, use it to approach a target within ±1 mm, and choose meter-in or meter-out for resistive versus overrunning loads.

---

## 1. Why This Matters

A simple directional valve is a light switch: on or off. Command "raise" and its spool jumps open, the platform accelerates to full speed, and command "hold" and it slams shut — fine for coarse work, hopeless for stopping on a millimetre. Recall from Module 04 that the platform's full-speed extend is ~85 mm/s; a valve that can only do "full speed" or "stop" would overshoot any target by centimetres and jar the load every time it moved. Precision needs a *dimmer*, not a switch — a way to command *how fast*, continuously, and to ease the motion to rest exactly where wanted.

So the decision this lesson settles is: **how do you meter the flow to control speed smoothly enough to place the platform within ±1 mm?** The answer is the **proportional valve** — a directional valve whose spool moves *in proportion* to an electrical command, so its opening, and therefore the flow and the speed, can be dialled anywhere from a crawl to full tilt. That same equation from Lesson 01, $Q = C_d A(u)\sqrt{2\Delta p/\rho}$, becomes a control knob: change the command, change $A(u)$, change the speed. And a second choice appears — *which* flow to throttle, in or out — that decides whether the platform can be controlled while gravity is trying to drop it.

## 2. Physical Intuition

A proportional valve is built like the directional valve of Lesson 02, but with a spool that does not just snap between end positions — it takes up any position in between, pushed by a proportional solenoid whose force tracks its drive current. Send 100 % of command and the spool opens fully (~7.6 mm², the whole 10 L/min, ~85 mm/s); send 50 % and it opens halfway (~5 L/min, ~42 mm/s); send 5 % and it barely cracks (~0.5 L/min, ~4 mm/s). Flow follows command, so speed follows command. To land on a target, you drive fast while far away, then wind the command down as you approach, creeping the last millimetre and stopping clean — no overshoot, no slam.

The second idea is *where* you throttle. You can restrict the flow on its way **into** the cylinder (**meter-in**) or on its way **out** (**meter-out**). For a load that resists motion — like lifting — either works. But for an **overrunning** load — like lowering the platform, where gravity is trying to drop it faster than the oil is fed — meter-in fails: the load runs away, pulling the piston and cavitating the inlet. Meter-out saves it: by throttling the oil the descending load must *push out*, it creates a back-pressure that holds the load against gravity, so speed stays commanded. Throttle the exit, and gravity can't win.

## 3. The Idea You Now Need

With a proportional spool, the opening tracks the command $u$ (a fraction 0–1), so at a fixed valve drop the flow and the piston speed scale with it:

$$ Q(u) = C_d\,A_\text{full}\,u\,\sqrt{\frac{2\Delta p}{\rho}} = Q_\text{full}\,u, \qquad v(u) = \frac{Q(u)}{A_\text{cap}} = v_\text{full}\,u $$

For the platform, $v_\text{full} \approx 85\ \text{mm/s}$, so $v(u) \approx 85\,u$ mm/s: full command 85 mm/s, 5 % command ~4 mm/s. Approaching a target, you ramp the command down so the last millimetre is crept at a few mm/s and the stop lands inside **±1 mm**.

For lowering, the load is overrunning, so **meter-out** must hold a back-pressure on the cap side that balances the load:

$$ p_\text{back} \approx \frac{F}{A_\text{cap}} = \frac{19\,600}{1963.5\times10^{-6}} \approx 100\ \text{bar} $$

The meter-out orifice throttles the descending flow while sustaining that ~100 bar, so the platform descends at the commanded speed instead of dropping. Meter-in cannot do this — nothing downstream resists gravity.

## 4. Visual Explanation

<figure markdown>
  ![On the left, a graph of piston speed versus valve command: a straight line from zero to about 85 millimetres per second as the command goes from 0 to 100 percent, with markers at 100 percent (85 mm/s), 50 percent (42 mm/s) and 5 percent (4 mm/s), and an arrow showing the command wound down near the target to creep the last millimetre and stop within the plus or minus 1 millimetre band. On the right, two schematics for lowering an overrunning load: meter-in throttles the supply into the cylinder and the load runs away under gravity (marked unsafe), while meter-out throttles the oil leaving the cap side, holding about 100 bar of back-pressure so the descent stays under command (marked controlled).](assets/m06-l4-metering.svg){ width="760" }
</figure>

On the left, the proportional relationship: piston speed rises straight-line with command, so the controller can dial any speed from a 4 mm/s creep to the full 85 mm/s — and by **winding the command down near the target**, it eases the platform into its ±1 mm band without overshoot. On the right, the metering choice for lowering: **meter-in** (throttling the supply) lets the overrunning load run away under gravity, while **meter-out** (throttling the cap-side outflow) holds ~100 bar of back-pressure that resists gravity, keeping the descent at the commanded speed. Speed control and overrunning-load control are the proportional valve's two gifts.

## 5. Engineering Example

The difference between a light switch and a dimmer is exactly the difference between a directional and a proportional valve — and you feel it every time you drive. A car's accelerator is a proportional command: a little pedal, a little flow, a gentle creep in traffic; more pedal, more speed. Imagine instead a pedal that was only "floored" or "off" — you could never park, never ease to a stop, never inch forward. Hydraulic motion is the same: coarse machines use on/off directional valves and accept the lurch, but anything that must position precisely — machine tools, robots, this platform — meters its flow with a proportional (or servo) valve, trading a little cost and complexity for the ability to arrive gently and exactly.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the platform positioning and lowering:

- Full-command speed $v_\text{full} \approx 85\ \text{mm/s}$; command $u$ ∈ [0, 1]
- Load $F = 19.6\ \text{kN}$, $A_\text{cap} = 1963.5\ \text{mm}^2$

**Find** — the creep speed at low command, and the meter-out back-pressure to lower safely.

**Assumptions**

- Flow proportional to command at fixed valve drop; quasi-steady motion.

**Solution**

$$ v(0.05) = 85 \times 0.05 \approx 4.2\ \text{mm/s} \quad (\text{a controllable creep for the last mm}) $$

$$ p_\text{back} = \frac{19\,600}{1963.5\times10^{-6}} \approx 100\ \text{bar} \quad (\text{meter-out holds this against gravity}) $$

**Result**

$$ \boxed{v(u)\approx 85\,u\ \text{mm/s};\ \text{creep }\sim4\text{ mm/s at 5\%};\ \text{meter-out holds }\sim100\text{ bar to lower}} $$

**Engineering Interpretation** — Because speed tracks command, the controller has a smooth handle on motion: race across the gap near full command, then taper to a ~4 mm/s creep for the final millimetre and stop cleanly inside ±1 mm — the overshoot a switch-like valve would cause simply never happens. Lowering adds the overrunning twist: gravity would drop the load, so the proportional valve must **meter-out**, throttling the cap-side oil the descending load pushes against and sustaining ~100 bar of back-pressure to keep the descent obedient. That back-pressure requirement is exactly what a dedicated **counterbalance valve** provides automatically — the subject of Lesson 05, which completes the valve set.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson04_metering.html" title="Metering flow — proportional command and meter-in vs meter-out" style="width:100%;height:880px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

Dial the command and watch the opening, flow, and speed scale with it — from a 4 mm/s creep to the full 85 mm/s. Then switch a *lowering* load between meter-in and meter-out: meter-in lets gravity run the load away, while meter-out holds the back-pressure that keeps the descent at the speed you command.

## 8. Coding Exercise

```python
v_full = 84.9        # mm/s at full command (10 L/min into the cap side)

def speed(command):                 # command 0..1
    return v_full * command         # mm/s (flow ~ command at fixed dP)

def creep_ok(command, tol_mm=1.0):
    # a gentle final-approach speed lets you stop within tolerance
    return speed(command) <= 5.0    # ~<=5 mm/s creeps the last mm cleanly

for u in (1.0, 0.5, 0.05):
    print(f"{int(u*100):3d}% -> {speed(u):5.1f} mm/s", "creep-ok" if creep_ok(u) else "too fast to stop on a mm")
```

**Your task:** confirm speed scales with command and that ~5 % command gives a ~4 mm/s creep suitable for the last millimetre. Then: sketch a command-vs-time profile that moves the platform 100 mm and stops within ±1 mm — fast in the middle, tapering at the end. Why must you start decelerating *before* you reach the target?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson04_quiz.html" title="Metering flow — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

1. How does a proportional valve differ from a plain directional valve?
2. Why does piston speed scale with the command in a proportional valve?
3. How do you use a proportional valve to stop within ±1 mm without overshoot?
4. What is the difference between meter-in and meter-out?
5. Why must an overrunning (lowering) load be metered *out*, not *in*?

## 10. Challenge Problem

The platform must move down exactly 50 mm and stop within ±1 mm, with a 2-tonne load and gravity assisting the descent. Explain, step by step, what the proportional valve must do: which side it meters (and why), how the command should vary from start to stop, and what would go wrong if it metered-in instead. Then explain why *position* accuracy ultimately needs feedback (a sensor closing the loop), which the proportional valve makes possible but does not by itself provide.

## 11. Common Mistakes

- **Expecting a directional valve to position precisely.** On/off motion overshoots; precision needs proportional metering that can creep and stop.
- **Not decelerating early.** Commanding full speed until the target, then stopping, overshoots — the command must taper *before* arrival.
- **Metering-in an overrunning load.** Throttling the supply while gravity drives the load lets it run away and cavitate the inlet. Lowering must meter-out.
- **Forgetting the back-pressure cost.** Meter-out holds ~100 bar on the cap side to restrain the load — real pressure the system must supply and the heat it makes.

## 12. Key Takeaways

**The decision you can now make:** meter the flow with a proportional valve to command speed smoothly and place the platform within ±1 mm, choosing meter-out for overrunning loads.

- A **proportional valve** moves its spool in proportion to command, so opening, flow, and speed all scale: $v(u) \approx 85\,u$ mm/s.
- To position within **±1 mm**, ramp the command down near the target — creep the last millimetre at a few mm/s and stop without overshoot.
- **Meter-in** (throttle supply) suits resistive loads; an **overrunning** load (lowering) must be **metered-out**, throttling the outflow to hold ~100 bar of back-pressure against gravity.
- The orifice law $Q = C_d A(u)\sqrt{2\Delta p/\rho}$ from Lesson 01 is now a **control knob** — command sets $A(u)$, which sets speed.
- The platform can now move precisely — but its overrunning descent still needs a dedicated restraint. **Lesson 05 adds the counterbalance valve** and assembles the complete valve set.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — proportional metering

```
Explain how a proportional hydraulic valve meters flow: its spool moves in proportion to an electrical command, so the opening A(u), the flow Q = C_d*A(u)*sqrt(2*dP/rho), and the actuator speed all scale with command. For a cylinder whose full-command speed is 85 mm/s, give the speed at 100%, 50%, and 5% command, and explain how tapering the command lets you stop within +/-1 mm.
```

**Challenge** — meter-in vs meter-out

```
Explain the difference between meter-in and meter-out flow control in hydraulics, and why an overrunning (gravity-driven) load such as a lowering platform must be metered-out. Describe what goes wrong with meter-in (runaway, inlet cavitation), and estimate the meter-out back-pressure needed to restrain a 19.6 kN load on a 50 mm bore (~100 bar).
```

**Explore** — from metering to position control

```
For a hydraulic platform positioned to +/-1 mm, explain how a proportional valve is the actuator in a closed-loop position controller: a sensor measures position, the controller computes an error, and it commands the valve to meter flow and drive the error to zero. Why does open-loop metering alone not guarantee +/-1 mm, and what does feedback add?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 06 Lesson 04 — Metering flow: the proportional valve.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*Motion is now metered — a proportional valve dials speed from a creep to full tilt and eases the platform into its millimetre, with meter-out to tame gravity on the way down. Next: Lesson 05 — Controlling the overrunning load, where a counterbalance valve makes that restraint automatic and the complete valve set comes together.*
