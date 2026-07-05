!!! abstract "You are here"
    **Module 06 — Valves & Control**  ·  **Unit 1 — Commanding the Flow**  ·  **Lesson 05 — Controlling the overrunning load**

# Lesson 05 — Controlling the overrunning load

> **Module 06 · Lesson 05** · *Taming gravity automatically — and the complete valve set.*
> Lesson 04 showed that a lowering load must be metered *out*, holding a back-pressure against gravity. But doing that by hand — trusting the operator or controller to never open the valve too far — is fragile. This lesson adds the valve that holds that back-pressure automatically, and then assembles the whole valve package that commands the platform.
>
> **Learning outcome:** Specify a counterbalance valve that holds the load, meters an overrunning descent automatically, and fails safe; then name the complete valve set that raises, lowers, and holds the platform, ready for Module 07.

---

## 1. Why This Matters

Meter-out, from Lesson 04, is the right idea for lowering — but relying on a proportional valve to *always* throttle the outflow just enough is a thin safety margin. One command error, one signal glitch, one operator slip, and the valve opens too far, the back-pressure collapses, and two tonnes accelerate downward. A precision lift that also carries a heavy load cannot depend on perfect commanding to avoid a runaway; it needs a component that makes the safe behaviour *automatic*, whatever the rest of the system does.

So the decision this lesson settles is: **what single valve holds the load, controls its descent against gravity automatically, and fails safe — and, with it, what is the complete set of valves the platform needs?** The answer is the **counterbalance valve**: a load-holding valve with a built-in, self-regulating back-pressure that no command can defeat. Adding it completes the valve package — direction, metering, holding, and overrunning control — which is exactly the deliverable Module 07 needs to wire the platform into a working circuit.

## 2. Physical Intuition

A counterbalance valve sits on the cap-side line, right at the cylinder, and does three things at once. Raising, it lets oil flow freely *into* the cylinder through an integral **check** — no restriction on lifting. Holding, that check seals drop-tight, so the load cannot drift (the job Lesson 03's pilot-operated check did). Lowering is the clever part: the valve is spring-set to a pressure *above* what the load alone produces, so the load by itself cannot force it open — the load is trapped. To descend, a **pilot** line, fed by the pressure the pump puts on the *rod* side, helps push the valve open. Now the descent happens only while the pump is actively driving it.

And it is **self-regulating**. If the load starts to run away — accelerating downward — the cap-side pressure feeding the valve *drops* (the piston is outrunning the oil), so the valve closes a little, throttling the outflow and slowing the load back down. If the load lags, pressure builds and the valve opens more. This negative feedback pins the descent speed to the pump's flow, automatically, with no controller in the loop. Gravity simply cannot win: the harder it pulls, the more the valve clamps down. And because opening needs pilot pressure from the pump, losing the pump means the valve shuts and the load stops — fail-safe by construction.

## 3. The Idea You Now Need

The counterbalance valve is spring-set above the load-induced pressure, so the load alone cannot open it:

$$ p_\text{set} \approx 1.3\,p_\text{load} = 1.3 \times 100 \approx 130\ \text{bar} $$

The 30 % margin holds the load statically with certainty. To lower, the rod-side pilot pressure makes up the difference through the pilot ratio $R = A_\text{pilot}/A_\text{poppet}$:

$$ p_\text{load} + R\,p_\text{pilot} \ge p_\text{set} \;\Rightarrow\; p_\text{pilot} \ge \frac{p_\text{set}-p_\text{load}}{R} = \frac{130-100}{3} \approx 10\ \text{bar} $$

— a modest signal, supplied only while the pump drives the rod side, so no pump means no descent. The self-regulation is the key property: a small overrun drops $p_\text{load}$, which by the same inequality closes the valve, throttling the outflow. That automatic meter-out is why an overrunning load stays controlled.

With this, the platform's **complete valve set** is defined:

| Valve | Role | From |
|-------|------|------|
| Proportional 4/3 DCV (tandem centre, spring-centred) | direction · metered speed · unloads pump at centre | L02, L04 |
| Counterbalance valve (at the cap port) | drop-tight hold · automatic overrunning control · pilot-to-lower | L03, L05 |
| Relief valve | system pressure safety cap | Module 05 |

## 4. Visual Explanation

<figure markdown>
  ![On the left, a counterbalance valve at the cylinder cap port: an integral check valve lets oil flow freely in to raise; for holding, it seals drop-tight; for lowering, a relief element spring-set to 130 bar is helped open by a pilot line fed from the rod-side supply, and a feedback arrow shows that if the load overruns, the cap pressure drops and the valve closes to throttle the outflow — self-regulating. On the right, the complete valve set assembled around the cylinder: a proportional 4/3 directional valve for direction and metered speed, the counterbalance valve at the cap port for holding and overrunning control, and the system relief valve as the pressure cap, feeding from the Module 05 power unit — the package ready for Module 07 to wire into a circuit.](assets/m06-l5-counterbalance.svg){ width="760" }
</figure>

On the left, the counterbalance valve's three jobs: a **check** for free lifting, a **drop-tight** seal for holding, and a spring-set (**130 bar**) relief that a **rod-side pilot** cracks open to lower — with the self-regulating feedback that throttles any overrun automatically. On the right, the **complete valve set**: the **proportional 4/3 DCV** commands direction and speed and unloads the pump at centre; the **counterbalance valve** at the cap port holds the load and tames its descent; the **relief valve** caps system pressure. Fed by Module 05's power unit, this is the whole package — everything needed to raise, lower, and hold the platform, ready to become a circuit in Module 07.

## 5. Engineering Example

A loaded truck descending a long grade does not ride the brakes — it uses engine or exhaust braking, letting the engine's compression automatically absorb the potential energy so the truck holds a steady speed without the driver constantly modulating. A counterbalance valve is the hydraulic version of that automatic restraint: it converts the load's own weight into the back-pressure that controls its descent, self-adjusting moment to moment. Cranes lowering loads, aerial platforms retracting, forklift masts descending — all carry counterbalance (or the closely related over-centre) valves at their cylinders, precisely so that gravity is restrained by the hydraulics themselves, not by the vigilance of a controller. It is the difference between a descent that is *commanded* and one that is merely *permitted*.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the platform lowering its load:

- Load-induced pressure $p_\text{load} = 100\ \text{bar}$; counterbalance set at 1.3× load; pilot ratio $R = 3$

**Find** — the valve setting, the pilot pressure to lower, and why the descent self-regulates.

**Assumptions**

- Standard (load-assisted) counterbalance valve; quasi-steady descent.

**Solution**

$$ p_\text{set} = 1.3 \times 100 = 130\ \text{bar} \quad(\text{holds the load with 30\% margin}) $$

$$ p_\text{pilot} \ge \frac{130-100}{3} \approx 10\ \text{bar} \quad(\text{from the rod-side supply, only while the pump drives}) $$

Overrun check: if the load accelerates, $p_\text{load}$ falls, so $p_\text{load}+R\,p_\text{pilot}$ drops below $p_\text{set}$ and the valve closes — throttling the outflow and slowing the load.

**Result**

$$ \boxed{p_\text{set}\approx130\text{ bar};\ \sim10\text{ bar pilot to lower};\ self\text{-}regulating,\ fail\text{-}safe} $$

**Engineering Interpretation** — Set at 130 bar, the counterbalance valve traps the 100 bar load with a comfortable margin: nothing short of an active ~10 bar pilot from the rod side will let it open, so a stopped or failed pump leaves the load locked. During descent, the valve's own feedback does the metering that Lesson 04 asked the controller to do by hand: any tendency to run away drops the cap pressure and clamps the valve, holding the speed to whatever the pump feeds. With this valve added, the platform's **complete valve set** is in hand — a proportional 4/3 directional valve for direction and speed, a counterbalance valve for holding and controlled lowering, and a relief valve for safety. That package, fed by the Module 05 power unit, is everything Module 07 needs to assemble the full circuit.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson05_counterbalance.html" title="Controlling the overrunning load — the counterbalance valve" style="width:100%;height:880px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson05_counterbalance.html)

Set the counterbalance pressure and the rod-side pilot, and try to lower the load. Too little pilot and it stays locked (safe); enough pilot and it descends — but push the load toward overrun and watch the valve self-throttle to hold the speed. The load cannot run away, and with no pilot it simply holds.

## 8. Coding Exercise

```python
def cbv(p_load_bar, p_set_bar, p_pilot_bar, R=3):
    opens = (p_load_bar + R*p_pilot_bar) >= p_set_bar
    return "descends (metered)" if opens else "locked (held)"

print(cbv(100, 130, 0))     # locked  -> holds with no pilot
print(cbv(100, 130, 10))    # descends -> ~10 bar pilot opens it
# self-regulation: an overrun drops p_load, re-locking / throttling
print(cbv(85, 130, 10))     # locked again -> valve clamps down on overrun
```

**Your task:** confirm no pilot means the load is held, ~10 bar opens it, and a dropped load pressure (overrun) re-locks it — the self-regulation. Then: what would happen if you set the counterbalance *below* the 100 bar load pressure, and why is that dangerous?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson05_quiz.html" title="Controlling the overrunning load — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson05_quiz.html)

1. Why is manual meter-out (Lesson 04) not enough for a heavy overrunning load?
2. What three jobs does a counterbalance valve do at once?
3. Why is it set *above* the load-induced pressure, and what opens it to lower?
4. How does the valve automatically stop the load from running away?
5. What is the platform's complete valve set, and what does each valve do?

## 10. Challenge Problem

Compare two ways to control the platform's descent: (a) Lesson 03's pilot-operated check valve plus careful meter-out by the proportional valve, and (b) a single counterbalance valve. Explain what the counterbalance valve integrates and why that is safer for an overrunning load. Then analyse the setting trade-off: what goes wrong if the counterbalance is set too close to the 100 bar load (nuisance behaviour), and what goes wrong if it is set far too high (hard to lower, wasted energy)?

## 11. Common Mistakes

- **Trusting manual meter-out for a heavy load.** One over-open command collapses the back-pressure and the load runs away. Automate it with a counterbalance valve.
- **Setting the counterbalance below the load pressure.** Then the load opens it by itself — no holding, no control. It must sit above the load, with margin.
- **Piping the pilot from the wrong place.** The pilot must come from the rod-side drive pressure, so descent happens only while the pump pushes — losing that is the fail-safe.
- **Mounting it away from the cylinder.** Like the holding valve, it belongs at the cylinder port so a hose failure cannot drop the load.

## 12. Key Takeaways

**The decision you can now make:** control an overrunning load automatically with a counterbalance valve, and name the complete valve set that commands the platform.

- Manual meter-out is fragile; a **counterbalance valve** makes the back-pressure automatic and **fail-safe**.
- Set **above** the load (**~130 bar**, 1.3× the 100 bar load), it holds the load; a **rod-side pilot** (~10 bar at 3:1) cracks it to lower.
- It **self-regulates**: any overrun drops the cap pressure and closes the valve, throttling the outflow — gravity cannot win, and no pump means no descent.
- The platform's **complete valve set**: a **proportional 4/3 DCV** (direction, speed, pump-unloading), a **counterbalance valve** (holding, overrunning control), and a **relief valve** (safety).
- **Module 06 is complete** — the platform can be commanded to raise, lower, and hold, smoothly and safely. **Module 07 wires these parts, with the Module 05 power unit, into the full hydraulic circuit.**

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the counterbalance valve

```
Explain how a hydraulic counterbalance (over-centre) valve controls an overrunning load: the integral check for free lifting, the drop-tight hold, and the spring-set relief opened by a rod-side pilot for lowering. Using a 100 bar load, a 1.3x setting (130 bar), and a 3:1 pilot ratio, find the pilot pressure needed to lower, and explain the self-regulating anti-runaway feedback.
```

**Challenge** — counterbalance vs check-plus-metering

```
Compare controlling a lowering hydraulic load with (a) a pilot-operated check valve plus meter-out at a proportional valve, versus (b) a single counterbalance valve. Explain what the counterbalance valve integrates, why its self-regulation is safer for an overrunning load, and the consequences of setting it too low or too high relative to the load pressure.
```

**Explore** — the complete valve set

```
Summarise the complete set of valves needed to command a hydraulic lift platform that must raise, lower, and hold a 2-tonne load to +/-1 mm: a proportional 4/3 directional valve (direction, metered speed, pump unloading), a counterbalance valve at the cylinder (holding and overrunning control), and a system relief valve. Explain how these work together, and what remains to turn them into a complete hydraulic circuit.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 06 Lesson 05 — Controlling the overrunning load.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*Module 06 is complete — the platform has its full valve set: a proportional directional valve to command direction and speed, a counterbalance valve to hold the load and tame its descent, and a relief valve for safety. Next: Module 07 — Circuits, where these valves and the Module 05 power unit are wired into the complete hydraulic circuit that raises, lowers, and holds the platform.*
