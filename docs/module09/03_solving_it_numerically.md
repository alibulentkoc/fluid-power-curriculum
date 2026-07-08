!!! abstract "You are here"
    **Module 09 — Modeling & Simulation**  ·  **Unit 2 — Building the Model**  ·  **Lesson 03 — Solving it numerically**

# Lesson 03 — Solving it numerically

> **Module 09 · Lesson 03** · *Making the equations run.*
> The equations of motion describe the platform continuously; a computer works in steps. This lesson turns them into a running simulation by numerical integration, and finds the time step that keeps it stable and accurate.
>
> **Learning outcome:** Turn the platform's equations of motion into a running simulation by stepping them forward in time, and choose a time step that is both stable and accurate for the ~12 Hz oil-spring dynamics.

---

## 1. Why This Matters

The three equations from Lesson 02 are exact and continuous — they describe the platform at every instant. But a computer cannot handle "every instant"; it works in discrete steps, computing the state a little ahead, then a little further, marching through time. Turning the continuous equations into that step-by-step march is *numerical integration*, and it is what actually produces a simulation you can run, plot, and experiment on. Without it the equations are just algebra on paper; with it they become a virtual platform.

So the decision this lesson makes is: **how do we step the equations forward in time, and how big a step can we take?** The stepping itself is simple — the new state is the old state plus the rate of change times the step size, done for each variable. The subtlety, and the whole reason this lesson exists, is the *step size*. Too large a step and the simulation either drifts from the truth or, worse, blows up into nonsense that has nothing to do with the real platform. Too small and it runs needlessly slowly. The oil-spring resonance from Lesson 02 sets the scale: to follow a 12 Hz oscillation faithfully the step must be a small fraction of its 82 ms period — around a millisecond — which happily also matches the 1 kHz rate the real controller runs at. Choosing that step is the difference between a simulation you can trust and one that lies to you.

## 2. Physical Intuition

Imagine walking a curve you can only feel the slope of. At each point you know which way it heads — that is the rate of change the equations give you — so you take a small straight step in that direction, feel the new slope, and step again. String enough short steps together and you trace the curve. That is the essence of numerical integration: replace the smooth continuous motion with many tiny straight-line moves, each following the current rate. For the platform, at each step you read the current forces, flow, and pressure, compute how fast each state is changing, and nudge the state forward by that amount over one time step.

The catch is step length. On a gently curving path, long strides work fine. But the platform's oil spring makes the state *oscillate* — it curves back on itself twelve times a second — and long strides on a tight curve overshoot: you stride past where the curve turned, then over-correct the other way, and the error compounds until the simulated motion swings wildly and diverges, a pure artefact of stepping too coarsely. Shorten the stride and each move stays on the curve; the simulation rings and settles just as the real platform would. The rule of thumb is to take at least twenty steps across each oscillation — for a 12 Hz ring that is a step of a few milliseconds — and a comfortable millisecond gives over eighty. The faster the dynamics, the shorter the stride; the oil-spring resonance is what sets the pace.

## 3. The Idea You Now Need

Numerical integration steps each state forward by its rate over a time step $\Delta t$ — the **Euler** method:

$$ v \mathrel{+}= a\,\Delta t, \qquad x \mathrel{+}= v\,\Delta t, \qquad p \mathrel{+}= \dot p\,\Delta t $$

where the rates $a$, $\dot p$ come from the equations of motion evaluated at the current state. Repeat every $\Delta t$ and the state marches through time. The step size is bounded from two sides. **Stability** (the simulation must not diverge) requires the step to stay under a limit set by the oil-spring frequency $\omega_n$:

$$ \Delta t < \frac{2}{\omega_n} = \frac{2}{77\ \text{rad/s}} \approx 26\ \text{ms} $$

**Accuracy** (the simulation must be close, not just bounded) is stricter — resolve the 82 ms oscillation with at least ~20 samples:

$$ \Delta t < \frac{1}{20\,f_n} = \frac{1}{20\times12.2} \approx 4\ \text{ms} $$

Choosing $\Delta t = 1$ ms gives ~82 samples per oscillation, sits far inside stability, and matches the controller's 1 kHz rate. For larger steps at the same accuracy, a higher-order method like **Runge–Kutta (RK4)** samples the rate four times per step, with error shrinking as $\Delta t^4$ instead of $\Delta t$ — so RK4 at 4 ms can beat Euler at 1 ms. Simple Euler at 1 ms is plenty for this platform.

## 4. Visual Explanation

<figure markdown>
  ![Two panels. The left panel shows the Euler idea: a smooth true curve with a series of short straight-line steps following the local slope, each of length delta t, tracing along it — with a note that a large step overshoots where the curve bends. The right panel shows a step response of the oil-spring oscillation simulated three ways: at delta t of 1 millisecond the simulated curve rings at 12 Hz and settles smoothly, tracking the true response; at 4 milliseconds it is slightly coarser but still tracks; at 30 milliseconds, above the 26 millisecond stability limit, the simulated curve swings with growing amplitude and diverges into nonsense. A ladder on the side marks the stability limit at 26 ms and the accuracy target at 4 ms, with 1 ms marked as the chosen step.](assets/m09-l3-numerical.svg){ width="720" }
</figure>

The left panel is the method: follow the slope in short straight steps. The right panel is why the step size matters. At **1 ms** the simulation rings and settles exactly like the real oil-spring response — over eighty steps span each oscillation, so every turn of the curve is captured. At **4 ms** it is coarser but still faithful, right at the accuracy edge. At **30 ms** — past the 26 ms stability limit — the steps are longer than the dynamics can tolerate, and the simulation *diverges*: the amplitude grows with each step into a wild oscillation that the real platform would never do. The ladder makes the two bounds concrete: stay under 26 ms to be stable, under 4 ms to be accurate, and 1 ms to be comfortable. Same equations, three step sizes, three very different outcomes.

## 5. Engineering Example

Every simulation tool — from a hand-written Euler loop to professional multibody and hydraulics packages — faces this choice, and the resonance-sets-the-step rule is universal. An engineer simulating a hydraulic axis first estimates the fastest dynamics (here, the ~12 Hz oil spring; in stiffer systems, hundreds of hertz) and picks a step a small fraction of that period, then often switches to RK4 or an adaptive-step solver to take longer strides where the motion is smooth and short ones where it is sharp. Getting this wrong is a classic trap: a simulation that "explodes" or shows impossible oscillation is almost always a step-size problem, not a modeling error — the equations were right, but the integration was too coarse to follow them. Recognising that a divergent simulation usually means "shorten the step," not "the physics is unstable," saves enormous debugging time. And matching the simulation step to the controller's real update rate, as we do at 1 ms, means the virtual platform is stepped exactly as the real control loop will drive the machine.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — oil-spring frequency $f_n=12.2$ Hz ($\omega_n=77$ rad/s), period 82 ms; candidate steps 1, 4, and 30 ms.

**Find** — which steps are stable, which are accurate, and how many samples each takes per oscillation.

**Assumptions**

- Stability limit $\Delta t<2/\omega_n$; accuracy wants ≥20 samples per period.

**Solution**

$$ \Delta t_\text{stab}=\frac{2}{77}=26\ \text{ms}, \qquad \Delta t_\text{acc}=\frac{82\ \text{ms}}{20}\approx 4\ \text{ms} $$
$$ \text{1 ms}\to 82\ \text{samples (good)},\quad \text{4 ms}\to 20\ \text{(edge)},\quad \text{30 ms}\to 2.7\ \text{(unstable, }>26\text{ ms)} $$

**Result**

$$ \boxed{\text{1 ms: stable \& accurate; 4 ms: borderline; 30 ms: diverges}} $$

**Engineering Interpretation** — The three steps sort into the three outcomes cleanly. **30 ms** is past the stability limit, so it does not just lose accuracy — it *blows up*, producing an oscillation that grows without bound and looks nothing like the platform; a beginner might wrongly conclude the design is unstable when it is the solver that failed. **4 ms** is stable and just meets the twenty-samples rule, usable but with visible coarseness in sharp transients. **1 ms** is the sweet spot: eighty-plus samples per ring, deep inside stability, and — the practical bonus — identical to the controller's update period, so the model is stepped exactly as the real loop will run. This is the payoff of knowing the natural frequency from Lesson 02: it directly hands you the step size, no trial and error. With the step chosen, the simulation is now a tool you can trust to run the mission (Lesson 05) and design the controller (Module 10) — provided, as Lesson 04 checks next, its parameters match the real machine.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson03_numerical.html" title="Solving it numerically — time step and stability" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

Set the time step and run the oil-spring step response. Watch a small step track the true motion, a moderate step coarsen it, and a step past the 26 ms limit diverge into nonsense — the same equations, made trustworthy or useless by the step alone.

## 8. Coding Exercise

```python
import math
m, k = 2000.0, 1.18e7          # mass, oil-spring stiffness
c = 30000.0                    # light damping
wn = math.sqrt(k/m)            # ~77 rad/s

def simulate(dt, T=0.5, F=3000.0):
    x, v, t = 0.0, 0.0, 0.0
    peak = 0.0
    while t < T:
        a = (F - k*x - c*v) / m
        v += a*dt                       # semi-implicit Euler
        x += v*dt
        peak = max(peak, abs(x))
        t += dt
    return peak                          # bounded if stable, huge if not

for dt in (0.001, 0.004, 0.030):
    p = simulate(dt)
    print(f"dt={dt*1000:4.0f} ms  peak={p:.4f} m  {'STABLE' if p<0.01 else 'DIVERGED'}")
print("stability limit 2/wn =", round(2/wn*1000), "ms")
```

**Your task:** confirm 1 ms and 4 ms stay bounded while 30 ms diverges. Then answer in a comment: if a stiffer oil doubled the natural frequency, what would happen to the largest usable time step?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson03_quiz.html" title="Solving it numerically — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

1. What does numerical integration do to the continuous equations of motion?
2. Write the Euler step for the platform's state — how is each variable advanced?
3. What sets the stability limit on the time step, and what is it here?
4. Why is the accuracy requirement stricter than the stability limit, and what step does it imply?
5. Why choose 1 ms, and what does RK4 offer over Euler?

## 10. Challenge Problem

A teammate runs the platform simulation with a 30 ms time step to make it finish faster, and reports that "the design is unstable — the platform oscillates out of control." You suspect the simulation, not the design. Explain how to tell a genuine physical instability from a numerical one, what specifically goes wrong at 30 ms given the ~12 Hz oil spring, and what step you would recommend and why. Then explain the general principle linking the fastest dynamics in a model to the largest safe time step, and why a higher-order method like RK4 changes the trade-off.

## 11. Common Mistakes

- **Blaming the physics for a divergent simulation.** A blow-up is almost always too large a step, not an unstable design; shorten $\Delta t$ first.
- **Meeting stability but not accuracy.** Staying under 26 ms keeps it bounded, but you need ~4 ms or less to be *correct*; bounded is not accurate.
- **Using a needlessly tiny step.** Far below 1 ms wastes time for no benefit; match the step to the fastest dynamics.
- **Ignoring the natural frequency when picking the step.** The oil-spring resonance sets the scale; guessing the step invites instability or waste.

## 12. Key Takeaways

**The decision you can now make:** turn the equations of motion into a running simulation and choose a stable, accurate time step.

- **Numerical integration** replaces continuous motion with many short steps: $\text{state} \mathrel{+}= \text{rate}\times\Delta t$ (Euler).
- **Stability** needs $\Delta t < 2/\omega_n \approx 26$ ms; **accuracy** needs $\Delta t \lesssim 4$ ms (≥20 samples per oscillation).
- **1 ms** is the choice: ~82 samples per ring, deep inside stability, and matches the 1 kHz control rate.
- The **oil-spring resonance (Lesson 02) sets the step**; a divergent sim usually means "shorten $\Delta t$", not "unstable design".
- **RK4** ($O(\Delta t^4)$) buys accuracy at larger steps. **Lesson 04 validates the model against reality.**

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — stepping the equations

```
Explain how to turn a hydraulic platform's continuous equations of motion (Newton + compressibility + orifice) into a running simulation by Euler integration: state += rate * dt. For an oil-spring natural frequency of ~12 Hz (omega_n = 77 rad/s), derive the stability limit dt < 2/omega_n ~ 26 ms and the accuracy target dt < 1/(20 f_n) ~ 4 ms, and explain why 1 ms is a good choice.
```

**Challenge** — real vs numerical instability

```
A hydraulic platform simulation "explodes" when run with a 30 ms time step, given a ~12 Hz oil-spring resonance. Explain how to distinguish a numerical instability (too large a step) from a genuine physical instability, what goes wrong at 30 ms, and how shortening the step or switching to RK4 fixes it.
```

**Explore** — integration methods

```
Compare numerical integration methods for simulating a hydraulic servo (a ~12 Hz resonant system): forward Euler, semi-implicit (symplectic) Euler, and RK4. Discuss stability, accuracy order (O(dt) vs O(dt^4)), cost per step, and when each is the right choice.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 09 Lesson 03 — Solving it numerically.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The equations now run: stepped forward at 1 ms, the simulation rings and settles like the real oil-spring platform. Next: Lesson 04 — Validating the model, checking its predictions and parameters against reality so it can be trusted.*
