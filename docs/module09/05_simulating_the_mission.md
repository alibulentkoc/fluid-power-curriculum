!!! abstract "You are here"
    **Module 09 — Modeling & Simulation**  ·  **Unit 3 — Trusting the Model**  ·  **Lesson 05 — Simulating the mission**

# Lesson 05 — Simulating the mission

> **Module 09 · Lesson 05** · *Will it make the lift?*
> With a validated model, run the real job end to end: raise the two-tonne load to height. This lesson simulates the full mission — checking arrival time, pressure, and flow against their limits — and closes Module 09.
>
> **Learning outcome:** Run the validated model through the platform's mission — a full raise to height — and judge whether it arrives in time and within its pressure and flow limits, and see why holding ±1 mm still requires the closed loop of Module 10.

---

## 1. Why This Matters

Every piece of the model now exists and is trusted: the equations, the numerical solver, the identified parameters. The whole point of building it was to answer one question before committing to hardware — *will the platform actually do its job?* That job is concrete: raise a two-tonne load to a commanded height, fast enough to be useful, without tripping the relief or outrunning the pump. This lesson runs exactly that mission in simulation, end to end, and reads off the verdict. It is where modeling pays for itself, turning weeks of build-and-measure into a few seconds of computation that say *yes, it makes the lift, with this much margin* — or warns you it does not, while changing the design is still free.

So the decision this lesson makes is: **does the validated model predict the platform meets its mission — arriving in time and within its pressure and flow limits — and what does that hand to the control module?** Running the raise to 500 mm, the answer is encouraging: the platform arrives in about six seconds, flow-limited exactly as Lesson 01 estimated; the pressure peaks near 105 bar during the initial acceleration and settles to about 102 to cruise, a comfortable ten bar under the 115 bar relief; and the flow sits right at the 10 L/min the pump can supply. The mission is feasible with margin. But the same simulation exposes the one thing the platform still cannot do: *hold* the height precisely. Open-loop, a few percent of drift in speed — from oil temperature or friction — smears the arrival by a centimetre or more, nowhere near ±1 mm. The model has proven the machine can make the lift; proving it can nail the height is the job of Module 10.

## 2. Physical Intuition

Picture the whole lift as a trajectory. The command eases on over a fraction of a second — a soft start, so nothing slams — and the platform accelerates; because two tonnes needs a little extra push to get moving, the pressure rises briefly above its holding value, to around 105 bar. Then the platform settles into a steady climb at 85 mm/s, the pump's full flow, with the pressure easing back to just above 100 bar to balance the load and friction. It climbs at that rate for most of the way — the long, flow-limited cruise — until it nears the target, where the command eases off and it coasts to rest. Lay the pressure trace against the 115 bar relief line and it never comes close; lay the flow against the 10 L/min pump line and it rides right along it. The machine is working at its flow limit and well within its pressure limit — a healthy mission.

Now watch the arrival closely, and the open-loop weakness appears. The platform stops because the command was timed to stop it there — not because anything measured the height and decided it had arrived. If the oil is a little warmer today, or the friction a little different, the true speed differs by a few percent, and over a six-second climb that is a centimetre of error at the top. The platform arrived *near* the target, reliably and safely, but not *on* it — and certainly not to the millimetre the job demands. This is the precise boundary of what an open-loop, driven-and-sensed platform can do: it can make the lift, but it cannot guarantee the landing. Seeing that gap in simulation is what motivates closing the loop — using the position sensor not just to watch, but to correct.

## 3. The Idea You Now Need

The mission is a full raise, judged against three limits and one goal. Running the validated model:

$$ t_\text{arrive} \approx \frac{h}{v_\text{max}} = \frac{500\ \text{mm}}{85\ \text{mm/s}} \approx 6.0\ \text{s} \quad(\text{flow-limited}) $$

The **pressure** peaks during acceleration and must clear the relief:

$$ p_\text{peak} = \frac{mg + m\,a + b\,v}{A_\text{cap}} \approx 105\ \text{bar} \;<\; 115\ \text{bar relief} \quad(\text{10 bar margin}) $$

The **flow** must not exceed the pump:

$$ Q = A_\text{cap}\,v_\text{max} = 10\ \text{L/min} = Q_\text{pump} \quad(\text{at the limit, by design}) $$

So the mission is **feasible**: on time, under pressure, within flow. But the **hold** goal exposes the open-loop gap — a small speed drift $\delta$ over the move smears the arrival:

$$ \Delta x \approx v_\text{max}\,\delta\,t_\text{arrive} \approx 85 \times 0.03 \times 6 \approx 15\ \text{mm} \;\gg\; \pm1\ \text{mm} $$

The validated model has proven the lift is achievable; it has also proven that hitting ±1 mm needs feedback — the controller of Module 10.

## 4. Visual Explanation

<figure markdown>
  ![The mission trajectory for a 500 mm raise. Three stacked time plots share a time axis from 0 to about 6 seconds. The top plot is position, rising from 0 smoothly through a soft-start curve into a straight flow-limited climb, reaching 500 mm at about 6 seconds. The middle plot is velocity, ramping up over the first 0.3 seconds to 85 mm/s and holding flat. The bottom plot is pressure, jumping to about 105 bar during the acceleration then settling to about 102 bar for the cruise, with the 115 bar relief line drawn well above it and never reached. A verdict panel on the right lists: time about 6 s feasible tick, pressure 105 bar under relief tick, flow 10 L/min at pump limit tick, and hold plus or minus 1 mm cross, noting open-loop drift of about 15 mm needs the closed loop of Module 10.](assets/m09-l5-mission.svg){ width="720" }
</figure>

Read the three traces top to bottom. **Position** shows the whole lift: a gentle soft-start, a long straight flow-limited climb, arriving at 500 mm near six seconds. **Velocity** shows why the climb is straight — it ramps to 85 mm/s and holds, the pump's full flow. **Pressure** is the safety story: a brief rise to ~105 bar to accelerate the mass, then a settle to ~102 bar to cruise, with the 115 bar relief line sitting comfortably above, untouched. The **verdict panel** collects the judgement: on time, under pressure, within flow — three ticks — but the hold goal gets a cross, because open-loop the arrival drifts by ~15 mm. The mission is made; the millimetre is not. That single cross is the handoff to Module 10.

## 5. Engineering Example

Running the mission in simulation before building is how projects de-risk a machine. The verdict here — feasible on time, comfortable on pressure, at the flow limit — is precisely the information a team needs to commit to the design or adjust it: the ten-bar relief margin says the design is not living dangerously, and the at-the-limit flow says the pump is correctly sized, with no wasteful excess and no shortfall. Had the simulation shown the pressure grazing the relief or the arrival missing the time budget, the fix — a bigger pump, a lower load, a longer budget — would be a parameter change and a re-run, not a rebuild. Just as valuable is what the mission sim reveals about the *control* problem: by exposing the open-loop drift, it tells the controls engineer the loop must correct roughly a centimetre of positional uncertainty to reach ±1 mm, sizing the job before a line of control code is written. This is the culmination of modeling: a single simulated run that certifies feasibility, confirms component sizing, and scopes the control task — all before metal is cut.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — validated model; raise $h=500$ mm; $v_\text{max}=85$ mm/s; relief 115 bar; pump 10 L/min; open-loop speed drift up to ~3%.

**Find** — arrival time, peak pressure and its margin, flow versus the pump, and the open-loop hold error.

**Assumptions**

- Flow-limited cruise at 85 mm/s; peak pressure during the soft-start acceleration.

**Solution**

$$ t_\text{arrive}=\frac{500}{85}\approx 6.0\ \text{s}, \qquad Q=A v_\text{max}=10\ \text{L/min}=Q_\text{pump} $$
$$ p_\text{peak}\approx105\ \text{bar},\quad \text{margin}=115-105=10\ \text{bar} $$
$$ \Delta x_\text{open}\approx v_\text{max}\,(0.03)\,t_\text{arrive}=85\times0.03\times6\approx15\ \text{mm} $$

**Result**

$$ \boxed{\text{Feasible: } 6.0\text{ s},\ 105\text{ bar (10 under relief)},\ 10\text{ L/min; open-loop hold } \sim15\text{ mm} \gg \pm1\text{ mm}} $$

**Engineering Interpretation** — The three limit checks all pass, and each carries design meaning. **Time** at six seconds meets a reasonable budget and confirms the platform is flow-limited — its speed is the pump's to give, so a faster lift means a bigger pump, not a bigger motor. **Pressure** peaking ten bar under the relief means the acceleration is gentle enough that the relief never interferes, yet the margin is not so huge that the relief is mis-sized. **Flow** riding exactly at the pump limit confirms the pump is sized right for the target speed. Together they certify the lift. The **hold** check is the deliberate failure: open-loop, the ~15 mm drift is fifteen times the tolerance, and no amount of careful timing fixes it, because the platform never checks where it actually is. That is not a flaw in the model or the machine — it is the exact statement of the problem Module 10 solves. The validated model has done its job: it proved the mission is achievable, sized the components, and handed control a precisely scoped task — close the loop and turn 15 mm of open-loop drift into ±1 mm of held precision.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson05_mission.html" title="Simulating the mission — run the raise to height" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson05_mission.html)

Set the raise height and run the mission. Watch the position, velocity, and pressure play out, and read the verdict — arrival time, pressure margin, flow — against the limits. Then see the open-loop drift that keeps it from holding ±1 mm.

## 8. Coding Exercise

```python
m, A, g, b = 2000.0, 1963.5e-6, 9.81, 6000.0
vmax, relief, pump = 0.085, 115e5, 10/60/1000
dt = 1e-3

def mission(h):
    x, t, vprev, peak_p = 0.0, 0.0, 0.0, 0.0
    while x < h and t < 20:
        u = min(1.0, t/0.3)              # soft start
        v = vmax*u; a = (v - vprev)/dt; vprev = v
        x += v*dt; t += dt
        peak_p = max(peak_p, (m*g + m*a + b*v)/A)
    return t, peak_p/1e5

t, p = mission(0.500)
print(f"arrive {t:.1f} s, peak {p:.0f} bar (relief 115), flow {A*vmax*60*1000:.0f} L/min")
print("open-loop hold error at 3% drift:", round(vmax*0.03*t*1000), "mm")
```

**Your task:** confirm the raise arrives near 6 s under 115 bar. Then answer in a comment: if the time budget were 4 s instead of 6, what single component would you change, and why does a bigger motor not help?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson05_quiz.html" title="Simulating the mission — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson05_quiz.html)

1. What does simulating the mission answer, and what are the three limits it checks?
2. What arrival time does the raise give, and why is it flow-limited?
3. How high does the pressure peak, and what is the margin to the relief?
4. Why does the flow sit exactly at the pump limit, and what does that confirm?
5. Why can't the open-loop platform hold ±1 mm, and what fixes it?

## 10. Challenge Problem

The mission simulation shows the platform arriving in 6 s at 105 bar peak, flow at the 10 L/min pump limit — feasible — but drifting ~15 mm open-loop. Your manager asks for the lift to be done in 4 s instead. Work through what the simulation would show: which limit is hit first as you demand more speed, what component must change to meet 4 s, why the pressure margin matters in that change, and why a more powerful electric motor alone would not help. Then explain what the mission sim has told the control team about the size of the job awaiting them in Module 10.

## 11. Common Mistakes

- **Checking only arrival time.** A mission passes only if pressure and flow also stay within limits; a fast lift that trips the relief fails.
- **Reading open-loop arrival as precision.** Arriving *near* the target is not holding it; open-loop drift of ~15 mm is not ±1 mm.
- **Confusing flow limit with power limit.** The platform is flow-limited; a bigger motor will not speed it up, only a bigger pump.
- **Trusting the mission beyond the validated range.** The verdict holds for the load, stroke, and conditions the model was validated on; state the envelope.

## 12. Key Takeaways

**The decision you can now make:** run the validated model through the full mission and judge feasibility against time, pressure, and flow — and scope what control must still add.

- The mission — raise 2 t by 500 mm — arrives in **~6 s**, **flow-limited** as Lesson 01 predicted.
- **Pressure** peaks ~105 bar, **10 bar under the 115 bar relief**; **flow** sits at the **10 L/min pump limit** — feasible with margin.
- The three limit checks (time, pressure, flow) **pass**; the design is confirmed and correctly sized.
- **Open-loop cannot hold ±1 mm** — ~3% drift smears arrival by ~15 mm; only feedback fixes it.
- **Module 09 complete.** The validated model certifies the lift and scopes the control task. **Module 10 closes the loop to hold ±1 mm.**

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — reading a mission simulation

```
Explain how simulating a full mission (raise a 2-tonne load 500 mm) with a validated hydraulic model certifies feasibility: arrival time ~6 s (flow-limited at 85 mm/s), peak pressure ~105 bar vs a 115 bar relief, flow at the 10 L/min pump limit. What does each check confirm about the design and component sizing?
```

**Challenge** — hitting a tighter time budget

```
A hydraulic lift platform raises 2 t by 500 mm in ~6 s, flow-limited, at 105 bar peak (relief 115). To do it in 4 s, which limit is hit first, what component must change (and why a bigger motor does not help), and how does the pressure margin constrain the change?
```

**Explore** — open-loop to closed-loop

```
A mission simulation shows a hydraulic platform arriving within limits but drifting ~15 mm open-loop due to speed variation. Explain why open-loop timing cannot hold ±1 mm, what a position-feedback controller adds, and how the mission sim scopes the control task for the next module.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 09 Lesson 05 — Simulating the mission.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*Module 09 is complete — the validated model certifies the platform makes its lift, on time and within limits, and scopes the one thing left: holding the height. Next: Module 10 — Control Systems, where we close the loop to hit ±1 mm and hold it.*
