!!! abstract "You are here"
    **Module 11 — The Live Digital Model**  ·  **Unit 3 — The Complete Machine**  ·  **Lesson 05 — The monitored platform**

# Lesson 05 — The monitored platform

> **Module 11 · Lesson 05** · *A machine that knows itself.*
> Everything assembles: the controlled platform, the live model, the calibrated residual, the diagnosis, and the estimator. This lesson runs them together against a developing fault — and closes the curriculum.
>
> **Learning outcome:** Assemble the complete monitored platform and show it detecting, diagnosing, and quantifying a developing fault long before failure — the culmination of a machine that is built, modeled, controlled, and self-aware.

---

## 1. Why This Matters

This is the end of the road the whole curriculum has travelled. It began with a fluid in a cylinder and built, layer by layer, everything needed to make a two-tonne platform lift and hold to ±1 mm: the working fluid and its properties, the cylinder that turns pressure into force and motion, the power unit and valves that supply and direct the flow, the circuit that assembles them into a machine, the electrical command and sensing that make it controllable, the model that predicts it, and the control that governs it to the millimetre. Module 11 added the final layer — the machine watching itself against a live model of its own design. This lesson runs all of it together, and the result is not just a machine that works but a machine that *knows whether it is working*: it lifts, it holds, and it can tell, continuously, whether it is still behaving as it was built to.

So the decision this lesson makes is: **does the complete monitored platform catch a developing fault — detect it, diagnose it, and quantify it — before it becomes a failure?** Running the full system against a slowly growing seal leak, the answer is a decisive yes. The controlled platform holds ±1 mm throughout, its feedback quietly compensating for the leak — exactly the silent degradation that would blindside a machine watched only by its target. But the live model, running beside it, sees the divergence immediately: the residual crosses its threshold, the signature identifies a leak, and the estimator quantifies the leak rate — all while the platform is still dead on target and the leak is a small fraction of what it would take to fail. The monitor flags the fault with a large lead time before the hold would ever break, turning a future breakdown into a scheduled repair. That is the complete machine: built, modeled, controlled, and self-aware — and with it, the curriculum is complete.

## 2. Physical Intuition

Picture the finished system running. The platform holds its commanded height, rock-steady at ±1 mm, the controller doing its job. Beside it in software, the live model runs on the same commands, and an observer keeps the model locked to the machine while estimating the states and parameters no sensor reads. A bank of residuals watches the gaps between prediction and measurement, each calibrated against its healthy band. Now a seal begins, slowly, to leak. On the outside, nothing seems wrong — the platform stays exactly on target, because the feedback loop simply commands a little more flow to make up for what the leak steals, and the position never wavers. A person watching only the height would see a perfectly healthy machine, right up until the day the leak grew too large to compensate and the platform suddenly sagged.

But the monitor is not watching the height — it is watching the machine against its design. The extra command the controller must use to hold against the leak is exactly what the healthy model does not predict, so the residual grows the moment the leak begins. It crosses its threshold while the leak is still tiny; the pattern across the residuals — position and command shifting, pressure bleeding, resonance untouched — names it a leak; and the estimator, tracking the leak rate as a parameter, reports how bad it is and how fast it is worsening. The platform is still holding perfectly, but you now know a seal is failing, which seal, and how long until it matters. The repair becomes a scheduled task done at a convenient time, not an emergency after a two-tonne load has dropped. This is the whole point of the layer Module 11 added, and the whole point of building a machine you understand deeply enough to model: understanding is what lets the machine watch itself.

## 3. The Idea You Now Need

The complete monitored platform assembles every layer of the curriculum into one running system:

$$ \text{fluid} \to \text{cylinder} \to \text{power unit} \to \text{valves} \to \text{circuit} \to \text{command \& sense} \to \text{model} \to \text{control} \to \text{monitor} $$

Against a developing leak, the pieces work in concert:

$$ \text{control (M10): holds } \pm1\ \text{mm} \quad+\quad \text{live model (L01) + residual (L02) + diagnosis (L03) + estimator (L04)} $$

and the timing is the payoff. The controller **masks** the fault, holding target while the leak grows; but the monitor **detects** it early:

$$ \text{detected at leak}\approx2.4\ \text{mm/s} \;(\sim5\%\ \text{of the failure level}), \quad \text{hold fails at}\approx50\ \text{mm/s} $$
$$ \Rightarrow\ \text{lead time} \approx 20\times\ \text{the detection time — a scheduled repair, not a breakdown} $$

Detection comes from the residual crossing threshold; diagnosis from the leak's signature across the residuals; quantification from the estimator tracking the leak rate. Together they convert **reactive maintenance** (fix after failure) into **predictive maintenance** (fix on schedule, caught early). The machine now **works, holds ±1 mm, and knows whether it is behaving as designed** — the complete engineering object this curriculum set out to build.

## 4. Visual Explanation

<figure markdown>
  ![The complete monitored platform and the curriculum it completes. At the top, the full system: the controlled machine (closed-loop, holding plus or minus 1 mm) and, beside it on the same commands, the live model with its observer; a bank of residuals compares them, feeding a diagnosis block (the signature matrix) and an estimator that tracks the leak rate. Below, a timeline of a developing leak: the platform position stays flat on target inside the plus-or-minus 1 mm band the whole time (the controller masking the fault), while the leak rate rises steadily; the monitor's detection fires early, when the leak is about 2.4 mm/s, marked detected; far to the right a marker shows where the hold would finally fail at about 50 mm/s, with the long gap between them labelled lead time for planned maintenance. A footer strip lists the curriculum's layers from fluid through cylinder, power unit, valves, circuit, command and sensing, model, control, to monitor - all built.](assets/m11-l5-monitored.svg){ width="720" }
</figure>

The top is the finished machine: the closed-loop controller holding ±1 mm, the live model and observer running alongside on the same commands, and the residual-diagnosis-estimator chain turning the gap between them into detection, cause, and magnitude. The timeline below is the capstone result. The position line stays flat on target inside the ±1 mm band for the entire run — the controller faithfully masking the growing leak — while the leak-rate line climbs steadily beneath it. The **detection** marker fires early, at a leak of about 2.4 mm/s, when the platform is still perfectly on target; the **failure** marker sits far to the right at about 50 mm/s, where the hold would finally break. The wide gap between them is the **lead time** — the window the monitor buys for a planned repair instead of a breakdown. And the footer is the whole journey: every layer from the working fluid to the self-watching monitor, each built in its turn, now assembled into one machine that lifts, holds, and knows itself.

## 5. Engineering Example

The complete architecture shown here — a controlled machine with a live model beside it doing detection, diagnosis, and parameter estimation — is the direction real industrial systems are moving, and for exactly the reasons this capstone demonstrates: control alone makes a machine perform, but control plus monitoring makes it *dependable*, because it converts hidden degradation into early, actionable warning. The economic argument is decisive in practice: unplanned failure of a machine like this is enormously costly — the dropped load, the collateral damage, the emergency downtime — while a scheduled repair caught early is routine and cheap, and the lead time the monitor provides is precisely what makes the scheduling possible. The same pattern scales from this one lift to fleets of turbines, pumps, and production lines, where live models watch thousands of machines and flag the handful beginning to drift. And the deepest lesson of the whole curriculum lives in this final assembly: every layer built on the one before it, and the monitoring at the top was only possible because the machine was understood deeply enough at every level below to be modeled faithfully — the fluid, the cylinder, the valves, the circuit, the sensing, the dynamics, the control. Understanding is not academic; it is what lets a machine be controlled to a millimetre and lets it watch itself for the faults that would otherwise end it. That is the engineering this curriculum set out to teach, now complete in one machine.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the complete monitored platform: closed-loop control (±1 mm) plus live model, residual, diagnosis, and estimator, run against a seal leak growing steadily; control authority is exhausted at a leak of ~50 mm/s; the monitor flags at a leak of ~2.4 mm/s.

**Find** — when the fault is caught relative to failure, and what each layer contributes.

**Assumptions**

- Controller compensates until authority is exhausted; monitor detects via residual and estimator.

**Solution**

$$ \text{detected at leak}\approx2.4\ \text{mm/s} \;(\sim5\%\ \text{of the } 50\ \text{mm/s failure level}) $$
$$ \text{hold holds } \pm1\ \text{mm until authority exhausted at}\approx50\ \text{mm/s} $$
$$ \text{lead time}\approx20\times\ \text{detection time — flagged, diagnosed, quantified while still on target} $$

**Result**

$$ \boxed{\text{Fault caught at } \sim5\%\ \text{of failure level, with } \sim20\times\ \text{lead time — a scheduled repair}} $$

**Engineering Interpretation** — The result is the whole case for the monitored machine. The controller does its job so well that it hides the leak completely from anyone watching the position — the platform holds ±1 mm from the first drop of leakage until the moment, far in the future, when the leak finally outruns the control authority and the load sags. That masking is a double-edged thing: wonderful for keeping the machine running, dangerous because it conceals the degradation. The monitor resolves the danger by watching the machine against its model rather than against its target: the leak reveals itself in the extra command the controller must use, which the healthy model does not predict, so the residual grows from the very start and crosses threshold while the leak is still a twentieth of the failure level. Diagnosis names it a leak from its signature; the estimator quantifies the rate. The engineer is handed not "the machine failed" but "a seal is leaking, here is how fast, and you have ample time to fix it" — the difference between a catastrophe and a work order. And every layer of the curriculum made this possible: the model that predicts, built on the dynamics, built on the circuit, built on the components, built on the fluid. The machine lifts, holds ±1 mm, and knows itself — and with that, the curriculum is complete.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson05_monitored.html" title="The monitored platform — detect a fault before failure" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

Run the complete monitored platform against a developing leak. Watch the position hold flat on target while the leak grows, the monitor detect and quantify it early, and the failure point sit far ahead — the lead time the whole system buys.

## 8. Coding Exercise

```python
vmax, dt, target = 85.0, 1e-3, 300.0
Kp, Ki, Kd, L_max = 0.15, 0.4, 0.01, 50.0    # control authority fails at ~50 mm/s leak

def monitored(leak_accel=2.0, detect_leak=2.0, T=40.0):
    x, I, eprev, t = target, 0.0, 0.0, 0.0
    det = fail = None; leak_est = 0.0
    while t < T:
        leak = leak_accel*t
        e = target - x; I += e*dt; de = (e-eprev)/dt; eprev = e
        u = max(-1, min(1, Kp*e + Ki*I + Kd*de))
        x += (vmax*u - leak)*dt; t += dt
        leak_est += 5.0*(u*vmax - leak_est)*dt          # estimator tracks the counter-command
        if det  is None and leak_est > detect_leak: det  = (t, leak)
        if fail is None and leak >= L_max:          fail = (t, leak)
    return det, fail

det, fail = monitored()
print(f"detected at {det[0]:.1f}s (leak {det[1]:.1f} mm/s); fails at {fail[0]:.1f}s")
print(f"lead time: {fail[0]-det[0]:.1f}s")
```

**Your task:** confirm the fault is detected at a small fraction of the failure level, with a large lead time. Then answer in a comment: why does the controller holding ±1 mm perfectly make the *monitor* more important, not less?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson05_quiz.html" title="The monitored platform — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

1. What are the parts of the complete monitored platform, and what does each contribute?
2. Why does the controller holding ±1 mm make monitoring more important, not less?
3. How does the monitor catch the leak so early relative to failure?
4. What is the difference between reactive and predictive maintenance here?
5. Why was the monitoring layer only possible because the machine was understood deeply enough to model?

## 10. Challenge Problem

You are handed the complete monitored platform and asked to justify its cost to a manager who points out that the control system already holds ±1 mm perfectly, so the machine "obviously works." Make the case for the monitoring layer using the leak scenario: explain what "works" hides, what the monitor provides that the controller cannot, and quantify the value of the lead time between early detection and eventual failure. Then reflect on the curriculum as a whole: explain why the monitoring at the top of the stack depended on every layer beneath it, and what the phrase "a machine that knows whether it is behaving as designed" means in engineering terms.

## 11. Common Mistakes

- **Believing "it holds target" means "it is healthy."** Feedback masks degradation; only the model-based monitor reveals it.
- **Treating monitoring as optional once control works.** Control makes the machine perform; monitoring makes it dependable.
- **Waiting for failure to act.** The lead time from early detection is the whole value — it enables scheduled, cheap repair.
- **Forgetting the model is the foundation.** Detection, diagnosis, and estimation all rest on the validated model, and thus on understanding every layer beneath it.

## 12. Key Takeaways

**The decision you can now make:** run the complete monitored platform and confirm it detects, diagnoses, and quantifies a developing fault before failure — the curriculum's final capability.

- The complete machine assembles **every layer**: fluid → cylinder → power unit → valves → circuit → command & sense → model → control → **monitor**.
- The controller **masks** a developing leak (holds ±1 mm); the monitor **detects it early** (~5% of failure level) via the residual, **diagnoses** it, and **quantifies** it.
- This buys a **large lead time** (~20×) — converting **reactive** maintenance into **predictive**.
- Monitoring makes the machine **dependable**, not just functional — it **knows whether it is behaving as designed**.
- It was only possible because the machine was **understood deeply enough to model** — the reward of the whole curriculum. **The curriculum is complete.**

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the complete machine

```
Explain the complete monitored hydraulic platform: closed-loop control holding +/-1 mm, plus a live model, residual monitor, diagnosis, and state estimator running beside it. Against a developing seal leak, the controller masks the fault (holds target) while the monitor detects it early (~2.4 mm/s, ~5% of the ~50 mm/s failure level), diagnoses a leak, and quantifies the rate - a ~20x lead time enabling predictive maintenance. Explain why masking makes the monitor more valuable, not less.
```

**Challenge** — justifying the monitor

```
A manager says a hydraulic platform "obviously works" because the controller holds +/-1 mm, questioning the monitoring layer's cost. Make the engineering and economic case using a developing-leak scenario: what "works" hides, what the model-based monitor provides that control cannot, and the value of the lead time between early detection and eventual failure.
```

**Explore** — the whole curriculum

```
Trace how a hydraulic lift curriculum builds one machine layer by layer: working fluid, cylinder, power unit, valves, circuit, electrical command and sensing, modeling, control, and monitoring. Explain why each layer depends on the ones below, and why "a machine that knows whether it is behaving as designed" requires understanding every layer deeply enough to model it faithfully.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 11 Lesson 05 — The monitored platform, the final lesson of the curriculum.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and a reflection on the whole curriculum.
```

---

*The curriculum is complete. From a fluid in a cylinder to a two-tonne platform that lifts, holds ±1 mm, and watches itself against a live model of its own design — built, modeled, controlled, and self-aware. A machine understood at every layer, and dependable because of it.*
