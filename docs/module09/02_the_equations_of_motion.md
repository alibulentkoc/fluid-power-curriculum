!!! abstract "You are here"
    **Module 09 — Modeling & Simulation**  ·  **Unit 2 — Building the Model**  ·  **Lesson 02 — The equations of motion**

# Lesson 02 — The equations of motion

> **Module 09 · Lesson 02** · *Writing the physics down.*
> A dynamic model is three coupled equations. This lesson derives them — Newton's law for the moving mass, the compressible-chamber law for pressure, and the orifice law for the valve — and shows they reproduce the platform you know.
>
> **Learning outcome:** Write the platform's equations of motion — the coupled dynamics of position, velocity, and pressure driven by the command — verify they reproduce the known steady state, and interpret the hydraulic natural frequency they reveal.

---

## 1. Why This Matters

The kinematic model was a single line: speed equals command times a constant. It answered "how long to arrive?" and nothing else. To predict pressure, acceleration, and — crucially — how the platform *responds to a controller*, you need the real physics written down as equations that evolve in time. Those equations are the heart of the whole module: solve them (Lesson 03), check them (Lesson 04), and run the mission (Lesson 05). Get them right and the simulation behaves like the machine; get them wrong and every prediction downstream is wrong too.

So the decision this lesson makes is: **what are the platform's equations of motion — the coupled relationships that turn a command into evolving position, velocity, and pressure?** There are exactly three, each a law you already know applied to one part of the platform: Newton's law for the two-tonne mass, a compressibility law for how flow builds pressure in the cap chamber, and the orifice law for how the valve meters flow. Together they form a small coupled system, and a satisfying check falls out immediately — set them to steady state and they hand back the exact numbers you have used all along: 100 bar to hold, 10 L/min to cruise at 85 mm/s. They also reveal something the kinematic model hid: the oil is a spring, so the platform is a spring-mass system that can *oscillate* — the single most important fact for controlling it.

## 2. Physical Intuition

Start with the mass. The piston and its two-tonne load obey Newton's law: their acceleration is the net force divided by the mass. Three forces act — the oil pressure pushing up on the piston face ($pA$), gravity pulling the load down ($mg$), and friction opposing motion ($b\dot{x}$). When the up-push exactly balances gravity and friction, the platform holds or cruises steadily; when it does not, the mass accelerates. That is the first equation, and it is why the platform cannot jump to speed — a real mass takes force and time to get moving.

Now the pressure, which is subtler. Oil is nearly but not perfectly incompressible: squeeze it and the pressure rises. The cap chamber is a trapped volume of oil, and its pressure changes when the flow *in* through the valve does not match the volume the piston is *opening up* as it moves. Pump more in than the piston makes room for and the pressure climbs; let the piston outrun the inflow and it falls. That mismatch, divided by the oil's springiness, is the rate of pressure change — the second equation. And the flow itself comes from the valve: the command opens an orifice, and the orifice passes flow according to the pressure across it — the third equation, straight from the metering lesson. Chain them together and you see the coupling: the valve sets flow, flow builds pressure, pressure accelerates the mass, the moving mass changes the volume, which changes the pressure — a loop. Because oil springs back, that loop can ring, and the platform behaves like a heavy weight on a stiff spring.

## 3. The Idea You Now Need

The platform's state is position $x$, velocity $v=\dot{x}$, and cap pressure $p$. Three coupled equations evolve it. **Newton's law** for the mass:

$$ m\,\dot{v} = p\,A_\text{cap} - m g - b\,v $$

The **compressible-chamber law** — pressure rises when inflow exceeds the volume rate the piston opens:

$$ \dot{p} = \frac{\beta}{V(x)}\big(Q_\text{in} - A_\text{cap}\,v\big), \qquad V(x)=V_0 + A_\text{cap}\,x $$

and the **valve orifice law** relating command and pressure to flow:

$$ Q_\text{in} = C_d\,A_v(u)\sqrt{\frac{2(p_s-p)}{\rho}} \;\approx\; Q_\text{max}\,u\sqrt{\frac{p_s-p}{p_s-p_0}} $$

Set them to steady state ($\dot v=0,\ \dot p=0$) and they return the platform you know:

$$ p = \frac{mg}{A_\text{cap}} = 100\ \text{bar}, \qquad Q_\text{in}=A_\text{cap}v = 10\ \text{L/min at }85\ \text{mm/s} $$

And the oil's springiness plus the mass gives a **hydraulic natural frequency** — the rate the platform will oscillate if disturbed:

$$ \omega_n = \sqrt{\frac{\beta A_\text{cap}^2}{m\,V}} , \qquad f_n=\frac{\omega_n}{2\pi} \approx 12\ \text{Hz (mid-stroke)} $$

That 12 Hz is the ceiling on how fast a controller can safely push the platform — the number Module 10 must respect.

## 4. Visual Explanation

<figure markdown>
  ![A free-body and chamber diagram of the platform with its three equations. The piston-and-load mass has three forces: oil pressure times area pushing up, weight mg pulling down, and friction b times velocity opposing motion — labelled as Newton's law, mass times acceleration equals pA minus mg minus bv. Below the piston, the cap chamber is drawn as a compressible volume V(x) that grows with position; flow Q_in enters through the valve while the piston sweeps out volume at rate A times v, and the pressure rate is beta over V times the difference — labelled the compressible-chamber law. The valve is drawn as a variable orifice set by the command u, passing flow by the orifice law. A callout shows the oil acting as a spring of stiffness beta A squared over V, giving with the mass a natural frequency of about 12 Hz at mid-stroke. A steady-state box notes that setting the rates to zero returns 100 bar to hold and 10 L/min to cruise.](assets/m09-l2-eom.svg){ width="720" }
</figure>

Read the diagram as the three equations made physical. At the top, the **mass** with its three forces — the up-push $pA$, the weight $mg$, the friction $bv$ — whose imbalance is the acceleration (Newton). In the middle, the **chamber** as a springy volume that gains pressure when inflow beats the piston's volume rate (compressibility). At the valve, the **orifice** the command opens (metering). The **oil-spring callout** is the punchline: because the trapped oil compresses, it stores energy like a spring, and a spring plus a two-tonne mass rings at ~12 Hz. The **steady-state box** is the sanity check — zero out the rates and the equations reproduce the 100 bar and 10 L/min you already trust. The model is new; the machine it describes is the familiar one.

## 5. Engineering Example

These same three equations — a mechanical Newton equation, a hydraulic compressibility equation, and a valve orifice equation — are the standard model for essentially every hydraulic servo axis, from flight actuators to machine-tool slides to the platform here. Practising engineers write exactly this system, sometimes adding refinements (rod-side pressure, leakage, valve dynamics, stiction) when the application demands, but the three-equation core is universal. The hydraulic natural frequency it exposes is one of the first numbers a controls engineer computes, because it sets the achievable bandwidth: you cannot command a hydraulic axis to respond much faster than its oil-spring resonance without exciting it into oscillation. When a hydraulic machine "buzzes" or hunts, this resonance is usually why — and it was predictable from the equations before the machine was ever switched on. Deriving the model is not an academic exercise; it hands you the number that decides whether your control will be smooth or shaky.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — $m=2000$ kg, $A_\text{cap}=1963.5$ mm², $\beta=1.8$ GPa, mid-stroke volume $V\approx589$ cm³; $g=9.81$.

**Find** — the hold pressure from the steady state, and the hydraulic natural frequency.

**Assumptions**

- Steady state means $\dot v=0,\ \dot p=0$; oil-spring stiffness is $k=\beta A_\text{cap}^2/V$.

**Solution**

$$ \dot v=0:\quad p = \frac{mg}{A_\text{cap}} = \frac{2000\times9.81}{1963.5\times10^{-6}} = 1.0\times10^{7}\ \text{Pa} = 100\ \text{bar} $$
$$ k = \frac{\beta A_\text{cap}^2}{V} = \frac{1.8\times10^{9}\times(1963.5\times10^{-6})^2}{589\times10^{-6}} \approx 1.18\times10^{7}\ \text{N/m} $$
$$ \omega_n=\sqrt{\frac{k}{m}}=\sqrt{\frac{1.18\times10^7}{2000}}\approx 77\ \text{rad/s} \;\Rightarrow\; f_n=\frac{77}{2\pi}\approx 12\ \text{Hz} $$

**Result**

$$ \boxed{\text{Hold } 100\text{ bar; oil-spring natural frequency } \approx 12\text{ Hz}} $$

**Engineering Interpretation** — Two results, two uses. The **100 bar** is the model checking itself against reality: the steady-state form of Newton's equation must return the load pressure you have used since Module 04, and it does — a first validation before any simulation runs. The **12 Hz** is the model telling you something new and actionable: the oil column is a stiff spring, and with the two-tonne mass it forms a resonator. Push a controller to demand motion faster than about 12 Hz and it will excite this resonance, making the platform buzz or oscillate instead of settling — so Module 10 will deliberately keep the control bandwidth well below it. Notice the natural frequency depends on the chamber volume $V$, which grows as the piston extends, so the platform is actually *softest and slowest-ringing* near the top of its stroke and stiffest near the bottom — a subtlety only the dynamic model reveals. This is the payoff of writing the equations: they hand you the resonance, the pressure, and even how they vary along the stroke, all before the machine moves.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson02_eom.html" title="The equations of motion — force balance and oil spring" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson02_eom.html)

Adjust the cap pressure and velocity to see the force balance — drive, weight, friction — and the resulting acceleration, watching it hit zero at the 100 bar hold. Then move the piston along its stroke and see the oil-spring stiffness and natural frequency change with chamber volume.

## 8. Coding Exercise

```python
import math
A, m, g, beta = 1963.5e-6, 2000.0, 9.81, 1.8e9
b = 2000.0                              # friction coeff (identified later)

def accel(p_bar, v):                    # Newton's law -> acceleration
    return (p_bar*1e5*A - m*g - b*v) / m

def f_natural(x):                       # oil-spring natural frequency at position x
    V = A*x
    k = beta*A**2 / V
    return math.sqrt(k/m) / (2*math.pi)

print("accel at 100 bar, v=0:", round(accel(100, 0), 3), "m/s^2  (≈0 -> holds)")
print("accel at 110 bar, v=0:", round(accel(110, 0), 3), "m/s^2  (>0 -> rises)")
print("f_n at 0.3 m:", round(f_natural(0.3), 1), "Hz")
```

**Your task:** confirm the platform holds at 100 bar (acceleration ≈ 0). Then answer in a comment: does the natural frequency rise or fall as the piston extends toward the top of the stroke, and why?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson02_quiz.html" title="The equations of motion — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson02_quiz.html)

1. What are the three coupled equations of the platform's dynamic model, and what physics does each capture?
2. In Newton's equation, what are the three forces on the mass?
3. Why does the cap pressure change — what does the compressible-chamber law balance?
4. What does the model return at steady state, and why is that reassuring?
5. What is the hydraulic natural frequency, what causes it, and why does it matter for control?

## 10. Challenge Problem

A controls engineer is handed the platform's three equations and asked for the fastest the control loop can safely run. Explain how the hydraulic natural frequency (~12 Hz at mid-stroke) sets that limit, why exceeding it causes trouble, and how the limit *changes* as the platform rises through its stroke. Then explain which single physical property of the oil is responsible for the resonance existing at all, and what would happen to the natural frequency if that property were much larger (a stiffer oil) or much smaller (air entrained in the oil).

## 11. Common Mistakes

- **Dropping the friction or rod-side terms silently.** They may be small, but state the simplification; the model is only as honest as its assumptions.
- **Treating pressure as instantaneous.** Pressure is a *state* with its own rate equation; it builds through compressibility, it does not jump.
- **Forgetting the coupling.** The three equations feed each other; solving one in isolation misses the oscillation.
- **Ignoring the oil spring.** The ~12 Hz resonance is real and sets the control bandwidth; assuming the platform is infinitely stiff invites instability.

## 12. Key Takeaways

**The decision you can now make:** write the platform's coupled equations of motion and read the dynamics they contain.

- The dynamic model is **three coupled equations** in $(x,v,p)$: Newton for the mass, compressibility for the pressure, orifice for the valve.
- **Newton:** $m\dot v = pA - mg - bv$; **chamber:** $\dot p=\frac{\beta}{V}(Q_\text{in}-Av)$; **valve:** $Q_\text{in}\propto u\sqrt{p_s-p}$.
- At **steady state** they reproduce the known 100 bar hold and 10 L/min cruise — a built-in sanity check.
- The compressible oil is a **spring**, giving a **hydraulic natural frequency ~12 Hz** that caps control bandwidth.
- **Lesson 03 solves these equations numerically** to produce the running simulation.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — deriving the model

```
Derive the three coupled equations of motion for a hydraulic lift platform: Newton's law for the mass (m*a = p*A - m*g - b*v), the compressible-chamber pressure equation (p' = (beta/V)*(Q_in - A*v)), and the valve orifice equation (Q_in ~ Q_max*u*sqrt(ps-p)). Use m=2000 kg, A=1963.5 mm^2, beta=1.8 GPa, and show the steady state returns 100 bar and 10 L/min.
```

**Challenge** — the oil-spring resonance

```
For a hydraulic platform (m=2000 kg, A=1963.5 mm^2, beta=1.8 GPa, mid-stroke chamber volume ~589 cm^3), compute the hydraulic natural frequency f_n = (1/2pi)*sqrt(beta*A^2/(m*V)). Explain why the compressible oil acts as a spring, why f_n ~ 12 Hz limits control bandwidth, and how f_n changes as the piston extends.
```

**Explore** — model refinements

```
The core hydraulic-servo model is three equations (Newton, chamber compressibility, valve orifice). Discuss refinements engineers add when needed - rod-side pressure, internal leakage, valve dynamics, stiction/Coulomb friction - and when each matters for a lift platform.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 09 Lesson 02 — The equations of motion.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The platform is now three coupled equations — Newton, compressibility, orifice — that reproduce the real machine and reveal its oil-spring resonance. Next: Lesson 03 — Solving it numerically, turning these equations into a running simulation.*
