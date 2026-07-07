!!! abstract "You are here"
    **Module 10 — Control Systems**  ·  **Unit 3 — Making It Robust**  ·  **Lesson 04 — Tuning and stability**

# Lesson 04 — Tuning and stability

> **Module 10 · Lesson 04** · *Fast, but with a safety margin.*
> Three gains, one resonance, and a stability limit you must not cross. This lesson tunes the PID gains to be fast and tight while keeping a healthy margin against the oil-spring resonance.
>
> **Learning outcome:** Tune the platform's PID gains for a fast, well-damped response while maintaining a stability margin against the ~12 Hz oil-spring resonance, and explain what gain margin and bandwidth mean for robustness.

---

## 1. Why This Matters

The three PID terms each do their job, but their gains are not independent — push one and the others' behaviour shifts, and every gain nudges the loop closer to or further from the edge of instability. That edge is real and unforgiving: at some combination of gains the loop stops damping the oil spring and starts feeding it, and the platform oscillates. A controller tuned right at that edge might look brilliant in a calm test and then shake itself apart the first time the oil warms, the load changes, or the model is slightly off. So tuning is not just about making the response fast — it is about making it fast *with room to spare*, so that the inevitable drift and disturbance of a real machine never tip it over the edge. A controller without margin is a liability dressed as a success.

So the decision this lesson makes is: **how do we set the three gains to be fast and tight while keeping a safe margin from the resonance?** The anchor is the oil-spring resonance: there is an ultimate gain at which the loop oscillates on its own, and good tuning stays a factor of two or more below it — a gain margin. The bandwidth of the loop, how fast it can respond, must sit well below the ~12 Hz resonance, so the controller never commands motion at the frequency the oil spring wants to ring at. Within those bounds the three gains are balanced: proportional for bandwidth, derivative to damp — which actually *raises* the stability ceiling and buys back margin — and integral for droop-free holding, kept modest so it does not erode the phase headroom. Tuned this way the platform responds in a couple of hundred milliseconds, holds ±1 mm, and keeps a comfortable margin against the resonance, so it stays stable through everything a real machine throws at it.

## 2. Physical Intuition

Every feedback loop has a breaking point: turn the gain up far enough and it stops correcting and starts oscillating, feeding energy into the very motion it should suppress. For the platform that breaking point is the oil spring — raise the gain and at some *ultimate gain* the loop rings at the oil-spring frequency and never settles. Tuning well means finding out where that edge is and deliberately staying back from it. How far back is the gain margin: run at half the ultimate gain and you have a two-times margin, meaning the gain could double — from model error, temperature, a heavier load — before the loop went unstable. That cushion is what keeps a controller that works in the lab working in the field.

The derivative term is the clever lever here, because it does not just damp the response you see — it actually moves the edge itself. By braking the approach and opposing rapid motion, derivative action lets the loop tolerate a higher gain before it oscillates, raising the ultimate gain. So adding derivative buys you either a faster response at the same margin, or more margin at the same speed — a genuine improvement, not just a trade. The integral term pulls the other way: it adds a slow lag that eats into the margin, so it must be kept modest, enough to erase droop without dragging the loop toward instability. Tuning is the balancing of these: proportional for the speed you want, derivative to damp and open up headroom, integral for exactness without eroding the cushion — all measured against the one fixed landmark, the resonance you must never excite.

## 3. The Idea You Now Need

Tuning centres on the **ultimate gain** $K_u$ — the proportional gain at which the loop oscillates on its own — and staying below it by a **gain margin**:

$$ \text{gain margin} = \frac{K_u}{K_p}, \qquad \text{target} \ge 2\times\ (6\ \text{dB}) $$

For the platform, proportional alone reaches $K_u\approx0.22$. The **derivative term raises this ceiling** — with $K_d=0.01$ the ultimate gain rises to $\approx0.40$, because damping lets the loop tolerate more gain before oscillating:

$$ K_u:\ 0.22\ \text{(P only)} \;\to\; 0.40\ \text{(with }K_d=0.01) $$

A tuned set $K_p=0.15,\ K_i=0.4,\ K_d=0.01$ then sits at a healthy margin and responds fast:

$$ \text{gain margin} = \frac{0.40}{0.15} \approx 2.7\times\ (9\ \text{dB}), \qquad \text{settles in }\sim230\ \text{ms} $$

The **bandwidth** — how fast the loop responds — must stay well below the resonance:

$$ \omega_c < \frac{\omega_n}{3} = \frac{77}{3} \approx 26\ \text{rad/s}\ (\sim4\ \text{Hz}) \;\ll\; 12\ \text{Hz oil spring} $$

A classic starting recipe (Ziegler–Nichols, from $K_u$ and the resonance period $T_u\approx82$ ms) gives approximate gains to refine. The rules of thumb: keep gain margin ≥2× and phase margin ≥45°, use derivative to buy headroom, and keep integral modest.

## 4. Visual Explanation

<figure markdown>
  ![Tuning and stability shown in three parts. On the left, a stability ladder: as the proportional gain rises the step response goes from well-damped, to lightly damped, to sustained oscillation at the ultimate gain Ku, marked as the edge; a tuned operating point sits at about half of Ku, labelled two-times gain margin. In the centre, the effect of the derivative term: two ladders side by side, the one with derivative reaching a higher ultimate gain, with an arrow showing the derivative pushes the edge up from 0.22 to 0.40, buying margin. On the right, a frequency view: the control bandwidth sits at about 4 Hz, well to the left of the 12 Hz oil-spring resonance peak, with the gap labelled the margin that keeps the loop from exciting the spring. A summary lists the tuned gains Kp 0.15, Ki 0.4, Kd 0.01 with gain margin 2.7 times and settling about 230 ms.](assets/m10-l4-tuning.svg){ width="720" }
</figure>

The three views frame tuning as staying safely back from an edge. The **stability ladder** on the left shows the edge itself: as gain rises the response damps less and less until, at the ultimate gain, it oscillates forever — and the tuned point sits at about half of that, a two-times cushion. The **derivative panel** in the centre shows the lever: adding derivative pushes the edge upward, from an ultimate gain of 0.22 to 0.40, so the same operating gain now has far more margin (or a higher gain becomes safe). The **frequency view** on the right is the deepest picture: the loop's bandwidth sits around 4 Hz, well left of the 12 Hz oil-spring resonance peak, and that gap is the margin that keeps the controller from ever commanding at the frequency the spring rings at. Tuned gains, a healthy gain margin, and bandwidth clear of the resonance — the three conditions of a controller that is fast *and* stays stable.

## 5. Engineering Example

Tuning with margin is the difference between a controller that passes acceptance and one that survives in service. Real commissioning follows exactly this logic: engineers find the stability edge — often by cautiously raising gain until the first hint of sustained oscillation, identifying the ultimate gain and period — then back off to a fraction of it, apply a tuning recipe like Ziegler–Nichols as a starting point, and refine while watching gain and phase margins. The margins are not academic niceties; they are the budget for everything the tuning test did not capture — temperature swings that change the oil stiffness and shift the resonance, load variation, valve wear, and the simple fact that the model is never exact. A loop tuned to the edge in a cool morning test can go unstable in a hot afternoon as the resonance moves; a loop with a two-times margin rides through it. This is also why the derivative term is prized despite its noise cost: raising the stability ceiling is worth a great deal when that ceiling is what stands between a working machine and an oscillating one. Good tuning is disciplined cowardice — fast, but never closer to the edge than you can justify.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — platform with oil-spring resonance $\omega_n=77$ rad/s (~12 Hz, period ~82 ms); proportional-only ultimate gain $K_u=0.22$; adding $K_d=0.01$ raises it to $0.40$.

**Find** — the gain margin of $K_p=0.15$ with and without derivative, and whether the tuning is robust.

**Assumptions**

- Gain margin = $K_u/K_p$; target ≥2× (6 dB); bandwidth must stay below $\omega_n/3$.

**Solution**

$$ \text{P only: } \frac{K_u}{K_p}=\frac{0.22}{0.15}=1.5\times\ (3.5\ \text{dB}) \quad\text{— thin} $$
$$ \text{with } K_d=0.01: \frac{0.40}{0.15}=2.7\times\ (9\ \text{dB}) \quad\text{— healthy} $$
$$ \omega_c \approx v_\text{max}K_p = 85\times0.15 \approx 13\ \text{rad/s} < \frac{77}{3}=26\ \text{rad/s} \;\checkmark $$

**Result**

$$ \boxed{K_p=0.15,\ K_i=0.4,\ K_d=0.01:\ 2.7\times\ \text{gain margin, bandwidth clear of resonance}} $$

**Engineering Interpretation** — The same proportional gain of 0.15 is thin without derivative — only a 1.5× margin, meaning a 50% shift in effective gain from temperature or load could tip it into oscillation — but healthy with derivative, at 2.7×, because the derivative pushed the ultimate gain from 0.22 to 0.40. This is the concrete payoff of the derivative term: not just a smoother step, but a *doubled stability ceiling*, converting a fragile tune into a robust one at the same speed. The bandwidth check confirms the other bound: at about 13 rad/s the loop responds well below the 26 rad/s ceiling and far below the 77 rad/s resonance, so it never commands motion at the spring's ringing frequency. The integral of 0.4 is kept modest deliberately — enough to erase droop but not so much as to add lag that would erode the phase margin. The result is a controller that settles in ~230 ms, holds ±1 mm, and keeps a 2.7× cushion against instability — fast, exact, and robust to the drift and disturbance a real platform lives with. Lesson 05 now runs this tuned controller through the full mission, closing the loop end to end.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson04_tuning.html" title="Tuning and stability — gain margin against the resonance" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson04_tuning.html)

Raise the proportional gain and watch the response approach the oscillation edge — the ultimate gain. Then add derivative and see the edge move up, restoring margin. Read the gain margin and settling time as you tune toward fast-but-safe.

## 8. Coding Exercise

```python
vmax, wn, zeta, dt = 85.0, 77.0, 0.12, 1e-5

def grows(Kp, Kd, target=5.0, T=2.5):        # does the oscillation grow (unstable)?
    x=v=w=t=0.0; eprev=target; amps=[]
    while t < T:
        e=target-x; de=(e-eprev)/dt; eprev=e
        u=Kp*e + Kd*de
        dv,dw = w, wn*wn*(vmax*u - v) - 2*zeta*wn*w
        v+=dv*dt; w+=dw*dt; x+=v*dt; t+=dt; amps.append(x)
    early=max(amps[:len(amps)//4])-target; late=max(amps[3*len(amps)//4:])-target
    return late/early > 1.0

def ultimate_gain(Kd):
    Kp=0.08
    while Kp < 1.2 and not grows(Kp, Kd): Kp += 0.01
    return round(Kp, 2)

print("Ku (P only):", ultimate_gain(0.0))
print("Ku (Kd=0.01):", ultimate_gain(0.01))
print("gain margin at Kp=0.15:", round(ultimate_gain(0.01)/0.15, 1), "x")
```

**Your task:** confirm the derivative raises the ultimate gain and the margin. Then answer in a comment: why is a 2× gain margin worth deliberately giving up some response speed, given a real machine's temperature and load variation?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson04_quiz.html" title="Tuning and stability — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson04_quiz.html)

1. What is the ultimate gain, and what is gain margin?
2. Why tune to a margin below the ultimate gain rather than to the edge?
3. How does the derivative term change the stability ceiling?
4. Why must the loop bandwidth stay below the oil-spring resonance?
5. What are the target gain and phase margins, and why do they matter for a real machine?

## 10. Challenge Problem

A platform controller is tuned on a cool morning right up to the edge of oscillation for the fastest possible response, and passes its acceptance test beautifully. That afternoon, as the hydraulic oil warms, it begins to oscillate on its own. Explain what changed physically, why tuning to the edge caused the failure, and how a gain margin would have prevented it. Then explain how you would use the derivative term to recover the lost response speed without sacrificing the margin, and why the oil-spring resonance is the fixed landmark all of this tuning is measured against.

## 11. Common Mistakes

- **Tuning to the edge for speed.** Maximum speed at zero margin is fragile; temperature or load then tips it into oscillation.
- **Ignoring the resonance when setting bandwidth.** The loop must respond well below the ~12 Hz oil spring, or it excites it.
- **Over-using integral.** Too much integral adds lag that erodes phase margin; keep it modest.
- **Treating a tuning recipe as final.** Ziegler–Nichols is a starting point; always verify and refine the margins.

## 12. Key Takeaways

**The decision you can now make:** tune the three gains for a fast, damped response that keeps a healthy margin against the oil-spring resonance.

- Tuning stays below the **ultimate gain** $K_u$ by a **gain margin** ($K_u/K_p\ge2\times$), so drift and load never tip the loop unstable.
- The **derivative term raises $K_u$** (0.22 → 0.40 with $K_d=0.01$), buying margin or speed.
- **Bandwidth must stay below the resonance** ($\omega_c<\omega_n/3\approx4$ Hz $\ll$ 12 Hz).
- A tuned set $K_p=0.15,K_i=0.4,K_d=0.01$ gives **~2.7× margin, ~230 ms settle** — fast, exact, robust.
- **Recipes (Ziegler–Nichols) are starting points**; verify margins. **Lesson 05 runs the tuned loop through the mission.**

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — margins and the resonance

```
Explain tuning a PID controller for a hydraulic platform with a ~12 Hz oil-spring resonance. Define the ultimate gain Ku (where the loop oscillates), gain margin (Ku/Kp, target >=2x), and why bandwidth must stay below wn/3. Show how adding derivative (Kd=0.01) raises Ku from 0.22 to 0.40, and give a tuned set Kp=0.15, Ki=0.4, Kd=0.01 with a 2.7x margin.
```

**Challenge** — tuned to the edge

```
A hydraulic platform controller is tuned to the edge of oscillation on a cool morning and oscillates that afternoon as the oil warms. Explain what changed (oil stiffness/resonance shift), why zero margin caused the failure, how a 2x gain margin prevents it, and how the derivative term recovers speed without losing margin.
```

**Explore** — tuning methods

```
Compare PID tuning approaches for a resonant hydraulic servo: Ziegler-Nichols (ultimate gain/period), manual loop-shaping to gain/phase margins, and model-based tuning. Discuss gain margin, phase margin, bandwidth vs resonance, and why derivative action raises the achievable gain.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 10 Lesson 04 — Tuning and stability.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The gains are tuned: fast, exact, damped, and a comfortable margin from the resonance edge. Next: Lesson 05 — The closed-loop platform, running the tuned controller through the full mission to hit and hold ±1 mm.*
