!!! abstract "You are here"
    **Module 04 — Actuators**  ·  **Unit 1 — The Cylinder**  ·  **Lesson 03 — Friction and the usable force**

# Lesson 03 — Friction and the usable force

> **Module 04 · Lesson 03** · *What mass and friction subtract from the ideal.*
> Lessons 01 and 02 gave the cylinder's ideal force and speed — 19.6 kN and 85 mm/s, from clean $p\,A$ and $Q/A$. The real cylinder gives a little less, because its seals drag and its parts have mass. This lesson finds the *usable* force, and the friction that quietly rules slow, precise motion.
>
> **Learning outcome:** Model the cylinder's friction across speed, subtract it (and inertia) from the ideal force to get the usable force, and explain why low-speed friction — not the small force loss — is the real threat to precision.

---

## 1. Why This Matters

The 19.6 kN from Lesson 01 is the force the pressure makes on the piston. It is not quite the force delivered to the load, because the piston does not slide for free: its seals press against the bore and drag, and that drag always opposes motion. Whatever the cylinder is trying to do, friction takes a bite first. On top of that, the moving parts have mass, so some force goes into accelerating them rather than moving the load.

So the decision this lesson settles is honest bookkeeping: **of the ideal 19.6 kN, how much is actually usable once friction and inertia take their share?** The answer has two surprises. For the heavy lift the loss is small — a fraction of a percent — so the usable force is still about 19.5 kN. But the *shape* of the friction, highest exactly when the cylinder is barely moving, is what makes slow, precise positioning hard — and precision is the whole point of this platform.

## 2. Physical Intuition

Push a heavy box across a floor. It resists at first — you have to shove hard to get it going — and then, once it slides, it is suddenly easier to keep moving. That first, higher resistance is **static friction** (stiction); the lower, steady resistance once moving is **kinetic friction**. A cylinder's seals behave the same way: there is a **breakaway** force you must beat before the piston moves at all, and a lower drag once it is sliding.

But there is more, and it is the important part. As the piston picks up speed, the friction does not just drop to a constant — it dips to a minimum and then **climbs again**, because fast motion drags fluid through the seal (viscous friction). Plot friction against speed and you get a distinctive curve: **high at a standstill, dipping as it starts to move, rising again at speed** — the Stribeck curve. The dangerous region is the far left: when you are trying to *inch* the platform to its final millimetre, friction is at its highest and most uneven, so the piston tends to **stick, then slip** — stick-slip — jumping past the target instead of gliding to it. The small force loss barely matters; this low-speed misbehaviour is what fights the ±1 mm hold.

## 3. The Idea You Now Need

The cylinder's friction is captured by a standard model that adds three effects — a constant (Coulomb) drag, a viscous drag that grows with speed, and a Stribeck term that raises the friction near zero speed toward the breakaway value:

$$ F_f(v) = F_c\,\operatorname{sign}(v) + b\,v + (F_s - F_c)\,e^{-(v/v_s)^2}\operatorname{sign}(v) $$

with the platform's locked values $F_c = 60\ \text{N}$ (Coulomb), $F_s = 120\ \text{N}$ (breakaway), $b = 200\ \text{N·s/m}$ (viscous), and $v_s = 10\ \text{mm/s}$ (Stribeck velocity). At a standstill the exponential is 1, so the friction is the full $F_s = 120\ \text{N}$; once moving fast the exponential vanishes and only $F_c + b\,v$ remains.

The **usable force** is the ideal force minus friction and whatever is needed to accelerate the moving mass $m = 3\ \text{kg}$:

$$ F_\text{usable} = \underbrace{p\,A_b}_{\text{ideal}} - F_f(v) - m\,a $$

At steady speed $a = 0$, so the usable force is just the ideal minus friction. For this heavy, slow lift the inertia term is tiny; friction is the whole story.

## 4. Visual Explanation

<figure markdown>
  ![A friction-versus-velocity curve, the Stribeck curve, for the platform's cylinder. At zero speed the friction is the full breakaway value of 120 newtons. As velocity rises the curve dips to a minimum near 65 newtons around 22 millimetres per second, then rises again along the viscous line 60 plus 200 v. Markers show the breakaway point at 120 N, the slow-approach point at 5 millimetres per second and 108 newtons, and the running extend point at 85 millimetres per second and 77 newtons. A side bar shows the ideal 19.6 kilonewton force with a thin sliver removed for the roughly 80 newton friction, leaving a usable force of about 19.5 kilonewtons.](assets/m04-l3-friction.svg){ width="760" }
</figure>

The curve is the friction the piston feels at each speed. It starts high — the full **120 N** breakaway at a standstill — dips to a minimum around **65 N** as it gets moving, then climbs the viscous line as speed rises. The running point, at 85 mm/s, sits at about **77 N**. The side bar puts that in proportion: against the ideal 19.6 kN, an 80 N drag is a barely visible sliver, leaving a usable force of about **19.5 kN**. The lesson of the picture is the left edge, not the sliver: friction is worst exactly where precision is needed.

## 5. Engineering Example

A record player's tonearm, or any precision slide, fights the same enemy. Engineers who need smooth, creep-free slow motion dread "stick-slip": at a crawl, static friction lets the part stick, force builds until it breaks free, and it lurches forward — then sticks again. The fix is never "more force"; it is reducing and smoothing the low-speed friction (better seals, coatings, lubrication) and using control that anticipates the breakaway. Your platform meets stick-slip every time it eases into its final position, which is why Lesson 03 flags it now and Module 10 designs a controller to beat it.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the platform's cylinder and its locked friction model:

- Ideal extend force $p\,A_b = 19.6\ \text{kN}$
- $F_c = 60\ \text{N}$, $F_s = 120\ \text{N}$, $b = 200\ \text{N·s/m}$, $v_s = 10\ \text{mm/s}$

**Find** — the friction at breakaway, at a slow approach (5 mm/s), and at running speed (85 mm/s), and the usable force each time.

**Assumptions**

- Steady speed at each point (no acceleration term).
- The locked Stribeck model applies.

**Solution**

$$ F_f(0^+) = F_c + (F_s - F_c) = 120\ \text{N} \quad(\text{breakaway}) $$

$$ F_f(5\,\text{mm/s}) = 60 + 200(0.005) + 60\,e^{-(0.5)^2} = 107.7\ \text{N} $$

$$ F_f(85\,\text{mm/s}) = 60 + 200(0.085) + 60\,e^{-(8.5)^2} \approx 77\ \text{N} $$

Subtracting from the ideal 19.6 kN:

$$ F_\text{usable}(85\,\text{mm/s}) = 19{,}600 - 77 = 19{,}523\ \text{N} \approx 19.5\ \text{kN} $$

**Result**

$$ \boxed{\text{breakaway } 120\ \text{N} \;\to\; \text{running } 77\ \text{N};\quad F_\text{usable} \approx 19.5\ \text{kN}\ (0.4\%\ \text{loss})} $$

**Engineering Interpretation** — Two things to carry away. First, the force bookkeeping: friction costs only about 80 N out of 19.6 kN, so the usable force is still ~19.5 kN — but you must beat **120 N to break away**, so the cylinder needs a little pressure margin to start, not just to hold. Second, and more important, the friction is **highest at low speed** (108 N at 5 mm/s versus 77 N at running speed): exactly when the platform is easing into its final position, friction is largest and most uneven, which is what causes stick-slip and threatens ±1 mm. The usable force is fine; the low-speed friction is the problem Module 10 must solve.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson03_friction.html" title="Friction and the usable force" style="width:100%;height:860px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson03_friction.html)

Sweep the piston speed along the Stribeck curve. Watch the friction start at the 120 N breakaway, dip as the piston gets moving, then climb with the viscous term — and see the usable force (ideal minus friction) track just below 19.6 kN. Notice how much higher the friction is at a crawl than at running speed: that gap is where precision is lost.

## 8. Coding Exercise

```python
import math
Fc, Fs, b, vs = 60.0, 120.0, 200.0, 0.010     # locked friction model
F_ideal = 19600.0                              # p * A_b, N

def friction(v):                               # v > 0, m/s
    return Fc + b*v + (Fs - Fc)*math.exp(-(v/vs)**2)

def usable(v):
    return F_ideal - friction(v)

for v in (0.005, 0.010, 0.085, 0.124):
    print(f"v={v*1000:5.1f} mm/s  Ff={friction(v):6.1f} N  usable={usable(v)/1000:.2f} kN")
print("breakaway:", Fc + (Fs - Fc), "N")       # 120
```

**Your task:** confirm friction is ~77 N at 85 mm/s and 120 N at breakaway. Then find the speed at which the friction is *lowest* (the Stribeck minimum) — and explain why running there would give the smoothest motion but is not where the platform needs to be precise.

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson03_quiz.html" title="Friction and the usable force — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson03_quiz.html)

1. What is "breakaway" (static) friction, and how does it compare to the friction once moving?
2. The usable force is only about 0.4 % below the ideal. So why does friction matter so much here?
3. In the friction model, which term dominates at very low speed, and which at high speed?
4. What is stick-slip, and when does the platform meet it?
5. Why does the cylinder need a little pressure margin just to *start* moving?

## 10. Challenge Problem

The platform must ease its load the last 2 mm to a target and stop within ±1 mm, but it keeps overshooting: it sticks, pressure builds, then it jumps past the mark. Using the Stribeck curve, explain why moving slowly makes this *worse* rather than better, and propose two changes — one mechanical, one in how the cylinder is driven — that would reduce the stick-slip without simply pushing harder.

## 11. Common Mistakes

- **Treating friction as a single number.** It is not: 120 N to break away, ~65 N at the dip, ~77 N running, rising with speed. Which value applies depends entirely on how fast the piston is moving.
- **Worrying about the force loss, not the low-speed shape.** The ~0.4 % force loss is negligible; the high, uneven friction near zero speed is what actually hurts the platform.
- **Forgetting the breakaway margin.** A cylinder sized to *hold* a load may not have the extra force to *start* it moving against 120 N of stiction. Size for breakaway, not just steady state.
- **Assuming slower is smoother.** Below the Stribeck dip, slower motion means *higher* and more uneven friction — the cause of stick-slip, not the cure.

## 12. Key Takeaways

**The decision you can now make:** state the cylinder's usable force after friction, and recognise low-speed friction as the real obstacle to precise motion.

- Friction always opposes motion and follows the **Stribeck curve**: highest at breakaway (**120 N**), dipping as it moves (~65 N), rising with speed (viscous $b\,v$).
- The **usable force** is the ideal minus friction (and inertia): $19.6\ \text{kN} - \sim77\ \text{N} \approx \mathbf{19.5\ kN}$ running — only a 0.4 % loss.
- But you must beat **120 N to break away**, so the cylinder needs a little **pressure margin to start**, not only to hold.
- The real cost of friction is at **low speed**, where it is high and uneven and causes **stick-slip** — the enemy of the ±1 mm hold, and the reason Module 10 needs a controller.
- The cylinder's force is now honest — ideal and usable. **Lesson 04 handles the ends of travel: cushioning**, so the load stops without slamming.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the Stribeck curve

```
Explain the friction model F_f(v) = Fc*sign(v) + b*v + (Fs-Fc)*exp(-(v/vs)^2)*sign(v) for a hydraulic cylinder, term by term: Coulomb, viscous, and Stribeck. Using Fc=60 N, Fs=120 N, b=200 N.s/m, vs=10 mm/s, describe the shape of friction versus velocity and why it is highest at breakaway, dips, then rises.
```

**Challenge** — stick-slip and precision

```
Explain physically why a hydraulic actuator suffers stick-slip at very low speeds, using the idea that static friction exceeds kinetic friction and that friction is high just above zero speed. Why does this make positioning to a tight tolerance (like +/-1 mm) difficult, and what strategies (mechanical and control) reduce it?
```

**Explore** — usable force and margin

```
For a hydraulic cylinder giving an ideal force p*A, explain how seal friction and the mass of the moving parts reduce the force actually available to move a load, and why you must size for the breakaway (static) friction to guarantee the actuator can start moving, not just hold. How large is the friction loss typically, relative to the rated force?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 04 Lesson 03 — Friction and the usable force.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The cylinder's force is now honest: 19.6 kN ideal, ~19.5 kN usable, with low-speed friction flagged as the precision problem to solve later. Next: Lesson 04 — Cushioning and end-of-stroke, stopping the moving load safely at the ends of travel.*
