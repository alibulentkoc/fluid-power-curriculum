!!! abstract "You are here"
    **Module 08 — Electrohydraulic Control**  ·  **Unit 1 — Driving the Platform Electrically**  ·  **Lesson 02 — On/off vs proportional**

# Lesson 02 — On/off vs proportional

> **Module 08 · Lesson 02** · *Two kinds of electrical valve.*
> A wire can command the valve — but what kind of valve? This lesson contrasts the on/off (bang-bang) solenoid valve with the proportional valve, and shows why the platform's millimetre goal forces the choice.
>
> **Learning outcome:** Distinguish on/off from proportional electrohydraulic valves, quantify why an on/off valve cannot position the platform to ±1 mm (overshoot and shock), and justify the proportional valve for this machine.

---

## 1. Why This Matters

Not every electrical valve can do what the platform needs. The cheapest and most common electrohydraulic valve is a simple **on/off** solenoid: energise it and the spool snaps fully open, de-energise it and it snaps shut — full flow or nothing. It is perfect for a huge range of jobs: clamp on, clamp off; extend the ejector, retract it; open the dump line. But ask it to stop a two-tonne load at a precise height and it cannot — it only knows *go* and *stop*, and by the time it reacts, the load has sailed past the target and slammed to a halt hard enough to spike the pressure. The proportional valve, which can command *any* speed, is what makes fine positioning possible — but it costs more and is more delicate, so choosing it has to be justified, not assumed.

So the decision this lesson makes is: **on/off or proportional — which does the platform need, and why does the ±1 mm goal decide it?** The answer is proportional, and the reason is quantitative, not stylistic. An on/off valve run at full 85 mm/s overshoots any target by more than a millimetre just from reaction lag, and stopping the load that suddenly throws the pressure past the relief. A proportional valve can ramp the command down to a 4 mm/s creep as it nears the target, so it settles within the millimetre and stops gently. The goal picks the valve.

## 2. Physical Intuition

Picture the two valves approaching a target line. The **on/off** valve is a light switch: the platform charges toward the line at full 85 mm/s, the controller sees it arrive and commands *stop* — but the valve needs a moment to close and the two-tonne load has momentum, so it keeps going a millimetre or two past the line before it halts. And *how* it halts matters: bringing that much mass from full speed to a stop in a few milliseconds is like a water-hammer — the trapped oil has nowhere to go, so the pressure spikes hard, jarring the machine and tripping the relief. On/off is decisive and fast, which is exactly what you want for slamming a clamp shut, and exactly what you do not want for kissing a load onto a mark.

The **proportional** valve is a dimmer. As the platform nears the target the controller winds the command down — full speed far away, then half, then a slow creep in the last stretch — so it drifts the final millimetre at 4 mm/s and settles onto the line without overshoot. Stopping from a crawl barely disturbs the pressure, so there is no shock. The trade is real: the proportional valve is more expensive, has a small dead-band and some hysteresis, and is fussier about contamination. But only it can turn "get near the target" into "stop *on* the target," which is the whole reason the platform exists. Same circuit, same solenoid principle — but a spool that can sit anywhere, not just at the ends.

## 3. The Idea You Now Need

The difference is **discrete vs continuous flow**, and the platform's tolerance turns that into a hard requirement. An on/off valve gives $Q\in\{0,\,Q_\text{max}\}$; a proportional valve gives $Q = Q_\text{max}\,u$ for any $u\in[0,1]$. The cost of "discrete" shows up as overshoot from reaction lag $t_r$:

$$ \text{overshoot} \approx v \cdot t_r = 85\ \tfrac{\text{mm}}{\text{s}} \times 0.02\ \text{s} \approx 1.7\ \text{mm} \;>\; 1\ \text{mm} $$

and as a deceleration pressure spike when that speed is killed suddenly:

$$ \Delta p = \frac{m\,a}{A_\text{cap}} = \frac{m\,(v/t_r)}{A_\text{cap}} = \frac{2000\times(0.085/0.02)}{1963.5\times10^{-6}} \approx 43\ \text{bar} \;\Rightarrow\; 143\ \text{bar} > 115\ \text{bar (relief)} $$

A proportional valve escapes both by commanding a creep near the target: at $v=4.2$ mm/s the overshoot is $4.2\times0.02\approx0.08$ mm and the stopping spike is only ~2 bar. So the platform **needs a proportional valve** — the ±1 mm tolerance and the 2-tonne load make on/off unusable for positioning, though on/off remains right for full-stroke sequencing elsewhere.

## 4. Visual Explanation

<figure markdown>
  ![Two speed-versus-position profiles approaching a target line. The on/off profile is a flat line at 85 mm per second that continues past the target before dropping abruptly to zero, overshooting by about 1.7 mm, with a pressure-spike marker showing 143 bar exceeding the 115 bar relief. The proportional profile ramps down as it nears the target — full speed far away, then a 4 mm per second creep in the last stretch — and reaches zero right at the target line inside the plus or minus 1 mm band, with a small 2 bar pressure marker. A side panel contrasts the two valves: on/off gives full flow or none and suits sequencing; proportional gives any flow and suits positioning.](assets/m08-l2-valves.svg){ width="720" }
</figure>

The two curves tell the whole story. The **on/off** valve holds full 85 mm/s right up to the target and then falls off a cliff — but the cliff is *past* the line, because the valve's reaction lag let the load run ~1.7 mm too far, and the abrupt stop spikes the pressure to 143 bar, over the relief. The **proportional** valve bleeds its speed off early, coasting the last millimetre at a 4 mm/s creep, so its curve reaches zero exactly on the target inside the ±1 mm band with only a gentle pressure blip. Read across to the side panel: on/off is the right tool for *sequencing* (clamp, eject, dump), proportional for *positioning* — and the platform is a positioning job.

## 5. Engineering Example

Every hydraulic machine mixes both valve types, matched to the job. A plastic injection-moulding machine uses on/off valves to open and close the clamp and eject the part — full-stroke moves where "slam it" is fine — but a proportional (or servo) valve to control the injection speed and hold the pack pressure, where the result depends on *how fast* and *how much*. A mobile crane uses on/off valves for outrigger deploy and proportional valves for the boom, so the operator can feather a load onto a target. Choosing on/off where proportional is needed is a classic, expensive mistake: the machine "works" on the bench (it moves) but cannot hold tolerance or stops so hard it cracks fixtures. The platform's ±1 mm hold puts it firmly in proportional territory for its main axis — which is exactly the valve already in its circuit.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — platform: full speed 85 mm/s, load 2000 kg, cap area 1963.5 mm², relief 115 bar, valve reaction lag ≈ 20 ms, target tolerance ±1 mm.

**Find** — the on/off overshoot and stopping pressure spike, and whether a proportional creep fixes both.

**Assumptions**

- Overshoot ≈ speed × reaction lag; spike from decelerating the mass in the lag time.

**Solution**

$$ \text{on/off overshoot} = 85 \times 0.02 = 1.7\ \text{mm} > 1\ \text{mm} $$
$$ \Delta p_\text{on/off} = \frac{2000\,(0.085/0.02)}{1963.5\times10^{-6}} = 43\ \text{bar} \Rightarrow 143\ \text{bar} > 115 $$
$$ \text{proportional creep 4.2 mm/s: overshoot}=0.08\ \text{mm}, \quad \Delta p \approx 2\ \text{bar} $$

**Result**

$$ \boxed{\text{On/off: 1.7 mm overshoot + 143 bar spike (fails). Proportional creep: 0.08 mm + 2 bar (holds ±1 mm).}} $$

**Engineering Interpretation** — The two failure numbers for on/off are independent and each disqualifying. The **1.7 mm overshoot** alone breaks the ±1 mm spec — and that is the *best* case, ignoring the load's own coasting, so reality is worse. The **43 bar spike** is arguably worse still: it pushes the system to 143 bar, past the 115 bar relief, so every stop dumps flow through the relief, hammers the structure, and heats the oil — a maintenance and safety problem, not just a precision one. The proportional valve dissolves both by trading speed for control near the target: winding down to a 4 mm/s creep shrinks the overshoot 20-fold and the spike 20-fold. This is why the choice is not about preference — the physics of a heavy load and a tight tolerance *forbid* on/off for positioning. Note the proportional valve still needs to *know* when it is near the target to start ramping down, which again points to the position sensor of the next lessons.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson02_valves.html" title="On/off vs proportional — approaching a target" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson02_valves.html)

Send the platform to a target with each valve. Watch the on/off valve overshoot the mark and spike the pressure past the relief, and the proportional valve ramp down to a creep and settle inside the ±1 mm band. Change the target and see which valve keeps its promise.

## 8. Coding Exercise

```python
v_full, m, A_cap, relief = 0.085, 2000.0, 1963.5e-6, 115   # m/s, kg, m^2, bar
def overshoot_mm(v, t_r=0.02): return v * t_r * 1000
def spike_bar(v, t_r=0.02):    return m*(v/t_r)/A_cap/1e5

for name, v in (("on/off (full)", v_full), ("proportional creep", 0.0042)):
    print(f"{name:20} overshoot {overshoot_mm(v):5.2f} mm | stop spike {spike_bar(v):5.1f} bar "
          f"| working+spike {100+spike_bar(v):5.0f} bar {'> relief!' if 100+spike_bar(v)>relief else 'ok'}")
```

**Your task:** confirm on/off overshoots >1 mm and spikes over the relief, while the creep does neither. Then: could you *fake* proportional control with an on/off valve by switching it on and off very fast (PWM)? Note one drawback that would cause for a 2-tonne load.

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson02_quiz.html" title="On/off vs proportional — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson02_quiz.html)

1. What flow can an on/off valve produce, versus a proportional valve?
2. Why does an on/off valve overshoot the platform's target by more than 1 mm?
3. What happens to the pressure when an on/off valve stops the 2-tonne load suddenly?
4. How does a proportional valve avoid both the overshoot and the spike?
5. Name one job on a machine for which an on/off valve is the *right* choice.

## 10. Challenge Problem

A cost-focused redesign proposes replacing the platform's proportional valve with a fast on/off valve driven by pulse-width modulation (PWM) — switching it on and off hundreds of times a second so the *average* flow can be anything between zero and full, mimicking proportional control. Analyse whether this can meet the ±1 mm hold: what the average-flow argument gets right, and what it misses about a 2-tonne load, pressure ripple, valve wear, and the shock of each switching edge. Conclude whether PWM-ing an on/off valve is a sound substitute for a true proportional valve on this machine, and why.

## 11. Common Mistakes

- **Assuming any electrical valve can position.** On/off valves give full flow or none; they cannot creep, so they cannot settle to a tight tolerance.
- **Ignoring the stopping shock.** Halting a heavy load from full speed spikes the pressure — often past the relief — not just overshoots.
- **Over-specifying proportional everywhere.** For full-stroke sequencing (clamp, eject), on/off is cheaper, faster, and correct; proportional is for controlled motion.
- **Forgetting the dead-band.** Real proportional valves ignore very small commands near zero, which matters when creeping toward a target.

## 12. Key Takeaways

**The decision you can now make:** choose the valve type a task needs, and justify proportional for the platform quantitatively.

- **On/off** = discrete flow ($0$ or $Q_\text{max}$): fast, cheap, right for full-stroke **sequencing**.
- **Proportional** = continuous flow ($Q_\text{max}\,u$): commands any speed, right for **positioning**.
- On/off **overshoots ~1.7 mm** (reaction lag) and **spikes ~43 bar** (to 143 bar, past the relief) stopping the 2-tonne load — it **cannot** hold ±1 mm.
- Proportional **ramps to a ~4 mm/s creep**: 0.08 mm overshoot, ~2 bar spike — it **can** hold ±1 mm.
- The platform's tolerance and load **force the proportional choice**. **Lesson 03 adds the position sensor** the proportional valve needs to know when to ramp down.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the two valve types

```
Contrast on/off (bang-bang) and proportional electrohydraulic valves: discrete vs continuous flow, cost, response, dead-band. Using a 2-tonne platform at 85 mm/s full speed, cap area 1963.5 mm^2, relief 115 bar, and ~20 ms valve lag, show why an on/off valve overshoots a ±1 mm target and spikes the pressure, while a proportional valve creeping at ~4 mm/s does neither.
```

**Challenge** — PWM an on/off valve?

```
Can pulse-width modulating a fast on/off valve substitute for a true proportional valve on a 2-tonne hydraulic platform that must hold ±1 mm? Explain what the average-flow argument gets right and what it misses about load inertia, pressure ripple, valve wear, and switching shock.
```

**Explore** — matching valves to jobs

```
On a hydraulic machine that both sequences (clamp, eject) and positions (fine motion to a target), explain how engineers mix on/off and proportional/servo valves, choosing each for the right axis, and the consequences of choosing on/off where proportional is needed.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 08 Lesson 02 — On/off vs proportional.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The platform needs a proportional valve — only continuous flow can creep onto a millimetre target without overshoot or shock. But the valve must know when to ramp down. Next: Lesson 03 — Sensing position, the measurement that tells it where the platform is.*
