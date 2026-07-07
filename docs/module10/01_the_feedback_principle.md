!!! abstract "You are here"
    **Module 10 — Control Systems**  ·  **Unit 1 — Closing the Loop**  ·  **Lesson 01 — The feedback principle**

# Lesson 01 — The feedback principle

> **Module 10 · Lesson 01** · *Measure, then correct.*
> Open-loop, the platform commands and hopes — and drifts. This lesson introduces feedback: letting the platform measure its own position and correct the command, closing the gap between where it is and where it should be.
>
> **Learning outcome:** Explain the feedback principle — measuring the output, comparing it to the target, and driving the error to zero — and contrast open-loop and closed-loop behaviour on the platform's drift and disturbance.

---

## 1. Why This Matters

The whole curriculum has aimed at ±1 mm, and Module 09 showed the honest gap: open-loop, the platform arrives about a centimetre off, because it stops on a timer, not on a measurement. No amount of careful commanding fixes this — the platform simply does not know where it actually is, so temperature, friction, and load quietly push it off target. The fix is not a better command; it is a fundamentally different structure. Let the platform *look* at its own position, compare it to the target, and adjust the command to erase the difference, continuously. That structure — feedback — is the single most important idea in all of control, and it is what turns a machine that lifts approximately into one that holds precisely.

So the decision this lesson makes is: **how do we make the platform hold a target it keeps missing — and what does closing the loop actually buy?** The answer is to stop commanding blind and start correcting from measurement: compute the error as target minus measured position, and set the command from that error, so that whenever the platform is low it drives up, whenever high it eases off, and when it arrives the error is zero and it holds. This one change transforms the machine. Where open-loop drift of ~15 mm came from a mere 5% speed error, a closed loop drives that error to essentially zero and, just as importantly, *rejects disturbances* — a load that tries to creep the platform down is met with more command automatically. Feedback is how the platform defends its position against everything the open loop was helpless against.

## 2. Physical Intuition

Think of steering a car down a lane. Open-loop would be closing your eyes, fixing the wheel at what you guessed was straight, and hoping — and of course you drift, because the road crowns, the wind pushes, the alignment is off. What you actually do is keep your eyes open: you see the lane, notice you are drifting left, and turn right to correct, continuously, without ever computing anything. That is feedback. Your eyes are the sensor, the lane centre is the setpoint, the drift is the error, and your hands are the controller turning error into correction. The magic is that you do not need to know the wind or the road crown in advance — you just cancel their effect as you see it.

The platform closes its loop the same way. Its position sensor is the eyes; the commanded height is the lane centre; the difference between them is the error the controller works to erase. When the platform is below target, the error is positive and the controller commands *up*; as it rises, the error shrinks and the command eases; at the target the error is zero and it holds. And when something disturbs it — a heavier load, warmer oil, a leak that lets it sink — the position drifts, the error grows, and the controller pushes back automatically, no forewarning required. The open-loop platform was a driver with eyes closed, arriving wherever the drift took it. The closed-loop platform keeps its eyes on the target and corrects its way there, then holds — which is exactly the ±1 mm the job demands.

## 3. The Idea You Now Need

Feedback computes the **error** and drives it to zero. With target $x_\text{target}$ and measured position $x$:

$$ e = x_\text{target} - x, \qquad u = f(e) $$

The command is a function of the error, not a fixed timed profile. The simplest choice — proportional — is $u = K_p\,e$: command in proportion to how far off you are. As the platform approaches the target the error shrinks, the command eases, and at $e=0$ it holds. Contrast the two structures on the platform's drift. **Open-loop**, a 5% speed error over a 300 mm move lands it 15 mm off, uncorrected:

$$ x_\text{open} = v_\text{max}(1+\delta)\,t_\text{stop} = 300\times1.05 = 315\ \text{mm} \;\Rightarrow\; +15\ \text{mm error} $$

**Closed-loop**, the same drift is erased, because the controller keeps commanding until $e=0$; and a disturbance — say a load creeping the platform down at 3 mm/s — is met with steady counter-command, held to well under a millimetre. The loop rejects what the open path could not: drift, disturbance, and model error alike. This lesson is the *structure*; the coming lessons shape $f(e)$ — proportional, integral, derivative — to make the holding fast, exact, and stable.

## 4. Visual Explanation

<figure markdown>
  ![Two control structures compared. On top, open-loop: a setpoint feeds a controller, then the plant (the platform), producing the output position — with no path back, so a drift or disturbance arrow pushes the output off target and nothing corrects it, landing 15 mm high. On the bottom, closed-loop: the setpoint enters a summing junction, the error (setpoint minus measured position) feeds the controller, which commands the plant; the output position is measured by a sensor and fed back to the summing junction with a minus sign, closing the loop. A disturbance arrow now pushes the output, but the error grows and the controller corrects it, holding on target. A side note: open-loop error about 15 mm; closed-loop holds to plus or minus 1 mm.](assets/m10-l1-feedback.svg){ width="720" }
</figure>

The two block diagrams are the whole lesson. **Open-loop** (top) is a one-way street: setpoint to controller to plant to output, with no return path. When the disturbance arrow pushes the output, nothing notices, and it lands 15 mm high — the Module 09 result. **Closed-loop** (bottom) adds the one connection that changes everything: the sensor measures the output and feeds it back to a summing junction, where it is subtracted from the setpoint to form the error. Now the controller acts on the *error*, not the raw setpoint, so any disturbance that moves the output grows the error and gets corrected. That single feedback wire — output measured and subtracted — is the difference between drifting to 15 mm off and holding to ±1 mm. Every controller in this module lives in the "controller" block; the loop around it is what makes them work.

## 5. Engineering Example

Feedback is the backbone of essentially all automatic machinery: a thermostat measuring room temperature and switching the furnace, a cruise control measuring speed and adjusting throttle, an autopilot holding a heading, a drone holding position against wind. In every case the pattern is identical — measure the controlled variable, subtract it from the target to get an error, and drive an actuator to shrink that error — and in every case the payoff is the same: the system rejects disturbances and drift it was never explicitly told about, because it responds to their *effect* on the output rather than needing to predict their cause. This is why feedback is so powerful and so universal: it converts "know everything in advance and command perfectly" — which is impossible — into "watch the result and correct" — which is achievable. For the platform, it is the difference between a machine that needs its load, oil temperature, and friction known to the last decimal, and one that simply holds its commanded height regardless. The controller designs of the coming lessons all sit inside this loop; the loop itself is the invention.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — target 300 mm; $v_\text{max}=85$ mm/s; a 5% speed drift; a proportional controller $u=K_p e$; and a disturbance creeping the platform down at 3 mm/s.

**Find** — the open-loop error, and whether closed-loop holds the target against the drift and disturbance.

**Assumptions**

- Open-loop stops on a timer; closed-loop commands from measured error each step.

**Solution**

$$ x_\text{open}=300\times1.05 = 315\ \text{mm} \;\Rightarrow\; +15\ \text{mm (uncorrected)} $$
$$ \text{closed-loop: } e=300-x \to 0 \text{ as the controller drives } u=K_p e \Rightarrow x\to 300\ \text{mm} $$
$$ \text{with } -3\ \text{mm/s disturbance: held at } \approx 299.3\ \text{mm} \;(<1\ \text{mm error}) $$

**Result**

$$ \boxed{\text{Open-loop } +15\text{ mm; closed-loop holds } \approx 300\text{ mm, within } \pm1\text{ mm}} $$

**Engineering Interpretation** — The contrast is the entire case for feedback. Open-loop, the 5% drift is a 15 mm miss and there is nothing to be done about it after the fact — the platform never learns it is off. Closed-loop, the identical drift is erased: the controller simply keeps commanding until the measured position equals the target, so *whatever* speed the platform actually ran at, it ends up in the right place. The disturbance case is even more telling — a load creeping the platform down would be a slow catastrophe open-loop, but closed-loop the sag grows the error and the controller answers with steady counter-command, pinning the position within a millimetre. Notice the small residual (~0.7 mm) against a sustained disturbance: proportional control leaves a little error, because it needs *some* error to generate the holding command. Erasing even that is the job of integral action in Lesson 03. But the structural victory is already won here: by acting on measured error, the platform defends its height against drift and disturbance alike — the capability the whole curriculum needed, now in hand and waiting only to be shaped and tuned.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson01_feedback.html" title="The feedback principle — open vs closed loop" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson01_feedback.html)

Toggle feedback on and off and apply a drift or a disturbance. Watch the open-loop platform sail past the target and stay off, while the closed-loop platform corrects and holds — the same machine, transformed by one feedback connection.

## 8. Coding Exercise

```python
vmax, target, dt = 85.0, 300.0, 1e-3

def open_loop(drift):                      # timed command, no measurement
    t_stop = target / vmax
    return vmax*(1+drift)*t_stop

def closed_loop(Kp, disturb=0.0, n=20000): # command from measured error
    x = 0.0
    for _ in range(n):
        e = target - x
        u = max(-1, min(1, Kp*e))          # saturate to +/-100%
        x += (vmax*u + disturb) * dt
    return x

print("open-loop, 5% drift:", round(open_loop(0.05), 1), "mm")
print("closed-loop:", round(closed_loop(0.05), 2), "mm")
print("closed-loop, -3 mm/s disturbance:", round(closed_loop(0.05, -3.0), 2), "mm")
```

**Your task:** confirm the closed loop lands on 300 mm where the open loop misses by 15 mm. Then answer in a comment: why does a sustained disturbance leave a small residual error under proportional control, and what would remove it?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson01_quiz.html" title="The feedback principle — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson01_quiz.html)

1. What is the feedback principle, in one sentence?
2. What is the error, and how does a proportional controller use it?
3. Why does open-loop drift by ~15 mm while closed-loop holds the target?
4. How does feedback reject a disturbance it was never told about?
5. Why does proportional control leave a small residual error against a sustained disturbance?

## 10. Challenge Problem

A colleague proposes to fix the platform's 15 mm open-loop drift by measuring the oil temperature and friction very precisely and pre-computing a perfect command — no feedback needed. Explain why this feedforward-only approach is fragile, what classes of error it cannot handle, and how feedback achieves the same goal without knowing any of those quantities in advance. Then explain the one thing feedback fundamentally requires that open-loop does not, and why that makes the position sensor of Module 08 essential rather than optional.

## 11. Common Mistakes

- **Confusing a better command with feedback.** Refining an open-loop command still cannot correct what it does not measure; feedback needs the measurement.
- **Forgetting the minus sign.** Feedback subtracts the measured output from the setpoint; getting the sign wrong turns correction into runaway.
- **Expecting proportional control to be perfect.** It leaves a small residual against sustained disturbance; integral action removes it (Lesson 03).
- **Thinking feedback needs to know the disturbance.** It responds to the disturbance's *effect* on the output, so it rejects causes it was never told about.

## 12. Key Takeaways

**The decision you can now make:** close the loop — drive the platform from measured error rather than a timed command — and explain what that buys.

- **Feedback** measures the output, forms the **error** $e=x_\text{target}-x$, and drives it to zero: $u=f(e)$.
- **Open-loop drifts** (~15 mm from a 5% speed error) because it never measures; **closed-loop holds** by correcting continuously.
- Feedback **rejects disturbances and drift** it was never told about, by responding to their effect on the output.
- **Proportional control** ($u=K_p e$) leaves a small residual against sustained disturbance — removed by integral action later.
- The loop is the invention; the controllers shape $f(e)$. **Lesson 02 builds proportional control.**

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the feedback loop

```
Explain the feedback principle for a hydraulic lift platform: measure position, subtract from the target to form the error e = x_target - x, and command the actuator to drive e to zero. Contrast open-loop (timed command, drifts ~15 mm on a 5% speed error) with closed-loop (corrects and holds ±1 mm), and explain the summing-junction/sensor block diagram.
```

**Challenge** — feedforward vs feedback

```
A team wants to fix a hydraulic platform's 15 mm open-loop drift by precisely measuring oil temperature and friction and pre-computing a perfect command, with no feedback. Explain why this feedforward-only approach is fragile, what errors it cannot handle, and how feedback achieves the goal without knowing those quantities in advance.
```

**Explore** — feedback everywhere

```
Describe how the same feedback structure (measure, compare to setpoint, drive the error to zero) underlies a thermostat, cruise control, an autopilot, and a hydraulic position servo. Why does feedback reject disturbances the system was never explicitly told about, and what does it fundamentally require that open-loop control does not?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 10 Lesson 01 — The feedback principle.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The loop is closed: the platform now drives from measured error, not a timed guess, and holds against drift and disturbance. Next: Lesson 02 — Proportional control, the simplest rule for turning error into command, and where its limits lie.*
