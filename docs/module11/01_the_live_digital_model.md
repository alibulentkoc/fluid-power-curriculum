!!! abstract "You are here"
    **Module 11 — The Live Digital Model**  ·  **Unit 1 — Model Meets Machine**  ·  **Lesson 01 — The live digital model**

# Lesson 01 — The live digital model

> **Module 11 · Lesson 01** · *A model that runs beside the machine.*
> The validated model does not have to sit on a shelf after commissioning. This lesson runs it live, in lockstep with the real platform, feeding it the same commands and comparing its predictions against what the machine actually does.
>
> **Learning outcome:** Explain the concept of a live digital model — a validated model run in parallel with the machine on the same commands — and how comparing its predictions to measurements reveals whether the real platform is behaving as designed.

---

## 1. Why This Matters

The platform works: it lifts, holds ±1 mm, rejects disturbances. But "works today" is not "works forever". Seals wear, oil ages and traps air, friction creeps up, small leaks develop — and here is the subtle danger: the controller *hides* all of this. Feedback exists precisely to correct for disturbances and drift, so a machine can be quietly degrading — a seal leaking, friction rising — while the controller compensates and the platform still meets spec, right up until the degradation exceeds what the controller can mask and the machine fails, seemingly without warning. A machine that only reports "on target" tells you nothing about its health. To see the degradation while it is still small, you need to compare the machine not against its target but against a model of how it *should* behave.

So the decision this lesson makes is: **should we run the validated model live alongside the machine, and what does comparing prediction to measurement tell us?** The idea is simple and powerful: take the model validated in Module 09, run it in real time driven by the exact same commands the real platform receives, and compare what the model predicts to what the sensors measure. When the machine behaves as designed, the two agree — the difference between them stays down at the level of sensor noise. When something changes — a leak, added friction, air in the oil — the machine's behaviour diverges from the model's prediction, and that divergence appears immediately as a growing gap, often before the controller can no longer hide it and long before failure. The live model turns "is it on target?" into the far more useful "is it behaving as it was designed to?" — the question that lets you catch trouble early.

## 2. Physical Intuition

Picture two platforms running side by side: the real steel-and-oil machine, and a digital copy of it living in the controller's computer — the validated model, stepping forward in real time. Both receive the identical command stream, millisecond by millisecond. The real one responds with real physics; the digital one responds with the equations you validated. If the model is faithful and the machine is healthy, the two move in near-perfect step — the digital platform is a running prediction of what the real one should be doing at every instant. Lay the predicted position against the measured position and they sit on top of each other, separated only by the small jitter of sensor noise.

Now let something go wrong on the real machine — a seal starts to leak, so the platform sags a little faster than it should under load. The model, knowing nothing of the leak, keeps predicting the healthy behaviour; the real machine, leaking, drifts away from that prediction. The gap between them — small and noisy when healthy — begins to grow, and it grows in a way that points at the cause: a downward drift smells like a leak, a sluggish response like added friction, a shifted ringing frequency like air in the oil. The controller may still be holding target by working harder, masking the fault from anyone watching only the position. But the model is not fooled, because it predicts the *healthy* effort, and the machine is now using different effort to achieve the same result. The live model watches the machine against its own design, and the divergence is the early warning the target alone could never give.

## 3. The Idea You Now Need

A live digital model runs the validated model in real time on the **same command** $u(t)$ as the machine, producing a prediction to compare against the measurement. The key quantity is the **residual** — measured minus predicted:

$$ r(t) = x_\text{measured}(t) - x_\text{predicted}(t) $$

When the machine is healthy and the model faithful, the residual stays at the level of **sensor noise and small model error**:

$$ |r|_\text{healthy} \approx 0.07\ \text{mm} \quad(\text{noise + model mismatch}) $$

When a fault develops, the machine diverges from the healthy prediction and the residual **grows past that band**:

$$ \text{leak (sag):}\ |r|\to 30\ \text{mm}, \qquad \text{added friction:}\ |r|\to 0.3\ \text{mm} $$

both far outside the healthy ~0.07 mm, so a threshold a few times the healthy level flags a real fault while ignoring noise. The model must be **driven by the same inputs** as the machine — same commands, ideally same conditions — or the comparison is meaningless; and it must be the **validated** model, trustworthy within its range (Module 09), or the residual reflects model error rather than machine health. Run this way, the residual answers continuously: *is the machine still behaving as designed?*

## 4. Visual Explanation

<figure markdown>
  ![The live digital model running beside the machine. On the left, a single command stream u of t splits and feeds two blocks in parallel: the real platform (steel and oil), which produces a measured position from its sensor, and the live digital model (the validated equations in software), which produces a predicted position. On the right, the two position signals are subtracted at a comparison point to form the residual, measured minus predicted. Two residual traces are shown: a healthy one staying flat near zero at the level of sensor noise, about 0.07 mm; and a faulty one that starts flat then, when a leak develops partway through, grows steadily away from zero to tens of millimetres, crossing a dashed threshold line that raises a flag. A caption notes: same command to both; small residual means behaving as designed, growing residual means something changed.](assets/m11-l1-live-model.svg){ width="720" }
</figure>

Read it left to right. One **command** feeds both the **real platform** and the **live digital model** — this shared input is what makes the comparison valid. Each produces a position: measured from the machine's sensor, predicted from the model's equations. Subtracting them gives the **residual**. The two traces on the right are the whole point: the **healthy** residual stays flat at the sensor-noise floor, because the faithful model and the healthy machine agree; the **faulty** residual sits flat until a leak develops, then climbs away and crosses the **threshold**, raising a flag. The controller might still be holding position through all of this — but the residual exposes the fault the position alone would hide. A model running beside the machine, fed the same commands, turns silent degradation into a visible, rising signal.

## 5. Engineering Example

Running a live model beside a machine to monitor its health is a fast-growing practice across industry — in jet engines, wind turbines, pumps, and production lines — because it catches problems that threshold alarms on raw signals miss. A simple over-temperature or over-pressure alarm only fires once a variable leaves its safe range, which is often late; a model-based residual fires when the machine stops matching its expected behaviour, which can be far earlier and far more specific. The same command drives model and machine, and the divergence between predicted and measured is watched continuously, so a bearing beginning to fail, a valve sticking, or a seal weeping shows up as a characteristic residual pattern long before it trips a conventional alarm. The two prerequisites this lesson names are exactly what real deployments get right or wrong: the model must be genuinely validated against the machine (a bad model produces false alarms and hides real ones), and it must be driven by the true operating inputs (compare against the wrong command history and the residual is noise). Done well, a live model converts maintenance from reactive — fix it after it breaks — to predictive — fix it when the model says it is starting to drift, on your schedule rather than the failure's.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — a validated platform model run live on the same commands as the machine; healthy residual ~0.07 mm (sensor noise + model error); a developing seal leak that makes the machine sag ~6 mm/s under load.

**Find** — the healthy residual band, the residual once the leak develops, and whether a threshold can distinguish them.

**Assumptions**

- The model predicts healthy behaviour; the leak affects the machine only; residual = measured − predicted.

**Solution**

$$ |r|_\text{healthy} \approx 0.07\ \text{mm (noise + model error)} $$
$$ \text{leak develops} \Rightarrow \text{machine sags below prediction} \Rightarrow |r| \to \sim30\ \text{mm} $$
$$ \text{threshold at, say, } 0.3\ \text{mm} \;(\sim4\times\text{ healthy}) \text{ flags the leak, ignores noise} $$

**Result**

$$ \boxed{\text{Healthy } \sim0.07\text{ mm; leak } \to \sim30\text{ mm; a } 0.3\text{ mm threshold separates them cleanly}} $$

**Engineering Interpretation** — The numbers show why the residual is such a good health signal: the healthy band and the fault are separated by orders of magnitude, so a threshold set a few times above the noise floor catches real faults with almost no false alarms. Crucially, this works *even while the controller is masking the fault* — the platform might still be holding ±1 mm because feedback is compensating for the leak, so a person watching only the position sees nothing wrong. But the model predicts the healthy machine's behaviour, and the leaking machine simply is not that machine anymore, so the residual grows regardless of what the controller does to the position. Notice the residual is also *diagnostic*, not just detective: a downward drift points to a leak, where a sluggish response would point to friction and a shifted resonance to entrained air — the same parameter-identification logic from Module 09's validation, now running continuously. The two cautions are essential: feed the model the wrong commands and the comparison is meaningless, and use an unvalidated model and the residual measures your modeling error, not the machine's health. With a validated model on the true inputs, the live comparison becomes the machine's own early-warning system — the foundation the rest of this module builds on.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson01_live_model.html" title="The live digital model — predicted vs measured" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson01_live_model.html)

Run the model and machine together and watch the residual stay near zero while healthy. Then inject a fault — a leak or added friction — and see the residual climb away from the noise floor and cross the alarm threshold, even as the controller keeps holding position.

## 8. Coding Exercise

```python
import random
vmax, dt, target = 85.0, 1e-3, 300.0

def run(fault=None, fault_at=5.0, T=10.0):
    random.seed(1)
    x_real = x_model = 0.0; t = 0.0; peak_res = 0.0
    while t < T:
        u = max(-1, min(1, 0.02*(target - x_model)))     # same command to both
        v_real = v_model = vmax*u
        if fault == "leak" and t >= fault_at:  v_real -= 6.0     # machine only
        x_real  += v_real*dt
        x_model += v_model*dt
        r = (x_real + random.gauss(0, 0.02)) - x_model          # residual
        if t >= fault_at: peak_res = max(peak_res, abs(r))
        t += dt
    return peak_res

print("healthy residual:", round(run(None), 2), "mm")
print("leak residual:", round(run('leak'), 1), "mm")
```

**Your task:** confirm the leak grows the residual far past the healthy noise floor. Then answer in a comment: why can the residual reveal a fault even while the controller still holds the platform on target?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson01_quiz.html" title="The live digital model — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson01_quiz.html)

1. What is a live digital model, and how is it run relative to the machine?
2. What is the residual, and what does its size indicate?
3. Why can a live model reveal a fault the controller is still masking?
4. What two conditions must hold for the comparison to be meaningful?
5. Why is a model-based residual often better than a simple threshold alarm on a raw signal?

## 10. Challenge Problem

A plant already has alarms on the platform's position and pressure that fire if either leaves its safe range, and the manager questions why a live digital model is needed on top of them. Explain what the model-based residual catches that the raw-signal alarms miss, using the specific case of a slow seal leak that the controller compensates for. Then explain the two ways a live model can *fail* to be useful — an unvalidated model and mismatched inputs — and what each failure looks like in the residual, so the reader understands the discipline the approach demands.

## 11. Common Mistakes

- **Watching only the target.** A machine can hold spec while degrading; the residual against the model reveals what the target hides.
- **Using an unvalidated model.** Then the residual measures model error, not machine health, producing false alarms and missed faults.
- **Feeding the model different inputs.** The comparison is only valid if model and machine get the same commands and conditions.
- **Setting the threshold at the noise floor.** Too tight and noise triggers false alarms; set it a few times above the healthy residual.

## 12. Key Takeaways

**The decision you can now make:** run the validated model live beside the machine and read the predicted-versus-measured gap as a health signal.

- A **live digital model** runs the validated model in real time on the **same commands** as the machine.
- The **residual** $r=x_\text{measured}-x_\text{predicted}$ is the health signal: **small when healthy** (~0.07 mm noise floor), **growing when a fault develops**.
- It reveals faults **even while the controller masks them**, because the model predicts the *healthy* behaviour the machine no longer shows.
- It requires a **validated model** and the **same inputs** as the machine, or the comparison is meaningless.
- It turns "on target?" into "**behaving as designed?**". **Lesson 02 examines the residual signal itself.**

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the live comparison

```
Explain the concept of a live digital model for a hydraulic platform: run the validated model in real time on the same commands as the machine, and compute the residual (measured position minus predicted). Explain why a small residual (~sensor noise, 0.07 mm) means healthy and a growing residual means a fault, and why this works even while the controller masks the fault by holding position.
```

**Challenge** — model-based vs threshold alarms

```
A plant has raw-signal alarms on a hydraulic platform's position and pressure. Explain what a model-based residual catches that these miss - using a slow seal leak the controller compensates for - and the two ways a live model fails to be useful (unvalidated model, mismatched inputs) and how each shows up in the residual.
```

**Explore** — predictive maintenance

```
Describe how running a validated model live beside a machine enables predictive maintenance: comparing predicted and measured behaviour to detect drift and wear early, versus reactive (fix after failure) and scheduled maintenance. What makes a residual diagnostic of the specific fault (leak vs friction vs entrained air)?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 11 Lesson 01 — The live digital model.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*A validated model running beside the machine, fed the same commands, turns silent degradation into a visible residual. Next: Lesson 02 — The residual signal, examining that health signal in detail and what shapes its healthy band.*
