!!! abstract "You are here"
    **Module 10 — Control Systems**  ·  **Unit 2 — Shaping the Controller**  ·  **Lesson 03 — PID control**

# Lesson 03 — PID control

> **Module 10 · Lesson 03** · *Fast, exact, and damped.*
> Proportional control is fast but leaves droop and rings at high gain. This lesson adds the integral term to erase the droop and the derivative term to damp the ring — completing the PID controller.
>
> **Learning outcome:** Extend proportional control to full PID — using the integral term to eliminate steady-state droop and the derivative term to add damping — and explain what each term contributes and costs.

---

## 1. Why This Matters

Proportional control got the platform fast and tight, but left two problems: a small residual droop under sustained load, and a ceiling on gain set by the oil-spring resonance. Both are exactly the kind of thing the job cannot tolerate — a platform that must sit *on* the target under load, not near it, and that must be able to respond crisply without shaking. The fix is not more proportional gain — that only trades droop for oscillation. It is two additional terms, each addressing one flaw directly: an integral term that erases the droop, and a derivative term that damps the ring and buys back gain. Together with the proportional term they form the PID controller, the most widely used control law in all of engineering.

So the decision this lesson makes is: **how do we erase the residual droop and tame the ringing that proportional control alone cannot?** The integral term watches the error over *time* — it accumulates it, so even a tiny persistent error slowly builds command until the error is driven to exactly zero; against a sustained disturbance, the integral quietly grows to supply precisely the holding command needed, and the droop vanishes. The derivative term watches the error's *rate* — it reacts to how fast the error is changing, pushing back against rapid motion, which damps overshoot and the oil-spring ring and lets the proportional gain go higher than it safely could alone. Proportional for speed, integral for exactness, derivative for damping: the three together turn a good-enough loop into one that hits the target, holds it precisely under load, and does so without oscillating — the ±1 mm the platform needs.

## 2. Physical Intuition

Think of the three terms as three different ways of looking at the error. The proportional term looks at the error *now* — how far off am I this instant — and pushes in proportion. That is fast and intuitive, but it has no memory and no foresight, which is why it leaves droop and can overshoot. The integral term gives the controller *memory*: it keeps a running total of the error, so a small error that persists is not ignored but accumulates, building command until the error is gone. This is what kills the droop — as long as the platform sits even slightly below target, the integral keeps growing the command until it is exactly on target, and against a steady downward load it winds up to hold precisely the force needed. The cost of memory is sluggishness and a tendency to overshoot if the accumulation runs unchecked.

The derivative term gives the controller *foresight*: it looks at how fast the error is changing and reacts to the trend, not just the level. If the platform is rushing toward the target, the derivative term sees the rapid closing and eases off early, braking before the overshoot happens — like lifting off the accelerator as you approach a stop rather than slamming the brake at the line. This damping is what tames the oil-spring ring and lets you run a higher proportional gain without oscillation: a proportional gain that alone would overshoot 110% can, with derivative damping, settle with barely 5%. The cost of foresight is noise sensitivity — reacting to the rate of change means reacting to the jitter in the measurement too. So the three terms are a balance: the present, the past, and the future of the error, each contributing a strength and each carrying a cost, combined into one command.

## 3. The Idea You Now Need

The PID control law sums three terms — proportional, integral, derivative:

$$ u = \underbrace{K_p\,e}_{\text{present}} + \underbrace{K_i\!\int e\,dt}_{\text{past}} + \underbrace{K_d\,\frac{de}{dt}}_{\text{future}} $$

The **integral** term erases steady-state droop. Under a sustained disturbance, proportional control alone leaves a residual, but the integral accumulates it away:

$$ \text{P only } (K_p=0.15): e_\text{ss}=+0.24\ \text{mm} \quad\to\quad \text{PI } (K_i=0.4): e_\text{ss}=0.00\ \text{mm} $$

because at steady state the integral has grown to supply exactly the holding command the disturbance demands ($u=d/v_\text{max}=0.035$), leaving no error to sustain it. The **derivative** term adds damping, taming overshoot and the oil-spring ring, so a higher proportional gain becomes usable:

$$ \text{P } (K_p=0.30): \text{overshoot } 110\% \quad\to\quad \text{PD } (K_d=0.01): \text{overshoot } 5\% $$

Each term has a cost: too much integral causes lag and overshoot (windup); the derivative amplifies sensor noise. The full controller — $K_p$ for speed, $K_i$ for exactness, $K_d$ for damping — is **fast, exact, and damped**, but only when the three gains are balanced, which is the tuning problem of Lesson 04.

## 4. Visual Explanation

<figure markdown>
  ![PID control shown as three terms combining. On the left, the three contributions to the command are stacked: the proportional term, a curve tracking the present error; the integral term, a curve accumulating the area under the error over time; and the derivative term, a curve tracking the rate of change of the error. On the right, three closed-loop responses to holding a target under a downward disturbance: proportional-only settles slightly below target, leaving a visible droop; adding the integral term drives the response exactly onto the target over time, erasing the droop; adding the derivative term keeps it on target while damping the overshoot, giving a clean settle. A summary reads: P for speed (leaves droop), I for exactness (erases droop), D for damping (tames the ring), full law u = Kp e + Ki integral e + Kd de/dt.](assets/m10-l3-pid.svg){ width="720" }
</figure>

The left panel breaks the command into its three sources: the **proportional** term follows the present error, the **integral** term is the accumulated area under the error (its memory), and the **derivative** term follows the error's slope (its foresight). The right panel shows what each adds to the platform's holding under load. **Proportional only** settles below the target — the visible droop. **Adding integral** drives the response onto the target exactly, as the accumulated error grows the command until the gap closes. **Adding derivative** keeps that zero-error hold but damps the transient, so it settles cleanly instead of ringing. Read left to right, it is the anatomy of the most used controller in engineering: three views of the error, three complementary fixes, one command.

## 5. Engineering Example

PID is genuinely ubiquitous — temperature controllers, motor drives, process loops, flight controllers, and hydraulic servos overwhelmingly use some form of it, because those three terms cover the essential needs of almost any single-loop control: track quickly, hold exactly, and settle smoothly. In practice engineers often use only what a job needs: PI control (no derivative) is extremely common where droop-free holding matters but noise makes derivative action troublesome, while PD control suits systems that need damping but tolerate some steady offset. The platform wants all three: proportional for a fast lift, integral to sit exactly on the commanded height under load, derivative to keep the oil spring from ringing as it settles. The costs this lesson names are real and shape practice — integral windup during large moves is managed with anti-windup limits, and derivative noise is managed by filtering the derivative or computing it on the measurement rather than the error. Knowing not just the three terms but their side effects is what separates a controller that works in a demo from one that works on a real machine day after day.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — platform holding 100 mm under a sustained 3 mm/s downward disturbance; $K_p=0.15$; the oil-spring resonance limits proportional gain.

**Find** — the droop under P alone, the effect of adding integral, and how derivative changes the usable gain.

**Assumptions**

- Droop $e_\text{ss}=d/(v_\text{max}K_p)$; integral drives $e_\text{ss}\to0$; derivative adds damping.

**Solution**

$$ \text{P: } e_\text{ss}=\frac{3}{85\times0.15}=0.24\ \text{mm (residual droop)} $$
$$ \text{PI }(K_i=0.4): \text{ integral grows until } u=\frac{d}{v_\text{max}}=0.035,\ \text{so } e_\text{ss}\to 0.00\ \text{mm} $$
$$ \text{D on a high gain }(K_p=0.30): \text{ overshoot } 110\%\to5\%\ \text{with } K_d=0.01 $$

**Result**

$$ \boxed{\text{I erases the 0.24 mm droop; D turns a 110\% overshoot into 5\%}} $$

**Engineering Interpretation** — Each term does exactly one job the others cannot. The **integral** converts "hold near target" into "hold exactly on target": under the steady disturbance, proportional control needs a standing 0.24 mm error to generate its holding command, but the integral supplies that command from accumulated history instead, so the error falls to zero — the platform sits precisely on the commanded height regardless of the load. The **derivative** attacks the resonance ceiling from the other side: proportional control alone could not use a gain of 0.30 because it would overshoot 110% and ring, but derivative damping brakes the approach and cuts that to 5%, making the higher, faster gain usable. So integral buys *exactness* and derivative buys *usable speed and damping* — together lifting the platform past both limitations of proportional-only control. The remaining subtlety, which Lesson 04 addresses, is that these gains interact: too much integral reintroduces overshoot, too much derivative amplifies noise into the command, and the three must be balanced against each other and against the oil-spring resonance. But the capability is now complete: a controller that can hold ±1 mm exactly, under load, without ringing — the target of the whole curriculum, in hand and awaiting only tuning.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson03_pid.html" title="PID control — add integral and derivative" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson03_pid.html)

Switch between P, PI, and PID and watch the platform hold a target under a disturbance: proportional leaves a droop, integral drives it to zero, and derivative damps the settle. See each term earn its place.

## 8. Coding Exercise

```python
vmax, wn, zeta, dt = 85.0, 77.0, 0.12, 2e-5

def hold(Kp, Ki, Kd, target=100.0, dist=-3.0, T=4.0):
    x, v, w, I, eprev, t = target, 0.0, 0.0, 0.0, 0.0, 0.0   # start at target
    while t < T:
        e = target - x
        I += e*dt
        de = (e - eprev)/dt; eprev = e
        u = max(-1, min(1, Kp*e + Ki*I + Kd*de))
        dv, dw = w, wn*wn*(vmax*u + dist - v) - 2*zeta*wn*w
        v += dv*dt; w += dw*dt; x += v*dt; t += dt
    return target - x

print("P  droop:", round(hold(0.15, 0.0, 0.0), 3), "mm")
print("PI droop:", round(hold(0.15, 0.4, 0.0), 3), "mm")
print("PID droop:", round(hold(0.15, 0.4, 0.006), 3), "mm")
```

**Your task:** confirm the integral drives the droop to zero. Then answer in a comment: why does adding the integral term let the platform hold *exactly* on target when proportional control cannot, and what is the physical meaning of the accumulated integral at steady state?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson03_quiz.html" title="PID control — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson03_quiz.html)

1. What are the three terms of a PID controller, and what does each respond to?
2. How does the integral term erase the steady-state droop?
3. What does the derivative term contribute, and how does it help with the resonance?
4. What is the cost of each term — integral and derivative?
5. What does each of P, I, and D buy: speed, exactness, or damping?

## 10. Challenge Problem

A platform under PID control holds its height perfectly in calm conditions, but when an engineer commands a large fast move, it overshoots badly and takes a long time to settle — worse than proportional control did. Explain what is happening in terms of the integral term accumulating during the move (windup), why it causes the overshoot, and what anti-windup measure would fix it. Then explain separately why turning the derivative gain up to damp the settle eventually makes the command jittery, and what that reveals about the derivative term's interaction with the position sensor.

## 11. Common Mistakes

- **Adding integral without limit.** During large moves the integral winds up and overshoots; use anti-windup.
- **Cranking derivative for more damping.** Derivative amplifies sensor noise into the command; filter it or apply it to the measurement.
- **Expecting P alone to hold exactly.** Only the integral erases steady-state droop; proportional always leaves a residual.
- **Treating the three gains as independent.** They interact — more integral needs adjusting damping; tuning balances all three (Lesson 04).

## 12. Key Takeaways

**The decision you can now make:** complete the controller — add integral to erase droop and derivative to damp — and explain each term's contribution and cost.

- **PID** sums three terms: $u=K_p e + K_i\!\int e\,dt + K_d\,de/dt$ — the present, past, and future of the error.
- **Integral erases steady-state droop** (0.24 mm → 0), by accumulating error until the holding command is supplied without error.
- **Derivative adds damping**, taming overshoot and the oil-spring ring (110% → 5%) and making higher gain usable.
- Each has a **cost**: integral windup during large moves, derivative noise amplification.
- P for **speed**, I for **exactness**, D for **damping**. **Lesson 04 tunes the three gains** against the resonance.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the three terms

```
Explain the PID control law u = Kp*e + Ki*integral(e) + Kd*de/dt for a hydraulic platform. Describe what each term responds to (present error, accumulated error, error rate), how the integral erases the ~0.24 mm steady-state droop under a sustained disturbance, and how the derivative damps the oil-spring ring so a higher gain becomes usable (110% overshoot -> 5%).
```

**Challenge** — windup and noise

```
A PID-controlled hydraulic platform holds perfectly when still but overshoots badly after a large fast move, and gets jittery when the derivative gain is raised. Explain integral windup (accumulation during the move) and its anti-windup fix, and why derivative action amplifies sensor noise - and how each is managed in practice.
```

**Explore** — P, PI, PD, PID

```
Compare P, PI, PD, and full PID control for practical systems. When is each the right choice - which jobs tolerate droop (PD) or forbid derivative due to noise (PI), and which (like a precision hydraulic platform) need all three? Relate each term to speed, exactness, and damping.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 10 Lesson 03 — PID control.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The controller is complete: proportional for speed, integral for exactness, derivative for damping — able to hold ±1 mm under load without ringing. Next: Lesson 04 — Tuning and stability, balancing the three gains against the oil-spring resonance for margin.*
