!!! abstract "You are here"
    **Module 04 — Actuators**  ·  **Unit 1 — The Cylinder**  ·  **Lesson 01 — Force from pressure**

# Lesson 01 — Force from pressure

> **Module 04 · Lesson 01** · *How hard the cylinder pushes — and why each direction differs.*
> Module 01 gave you the headline: force = pressure × area, about 19.6 kN at 100 bar. But a real cylinder has a **rod**, and the rod changes the story on the way back. This lesson works out the force the cylinder actually gives, extending *and* retracting.
>
> **Learning outcome:** Compute the force the platform's cylinder produces when extending and when retracting, from the bore and annulus areas, and explain why the rod makes the two differ.

---

## 1. Why This Matters

The platform's whole job is to lift a two-tonne load — a weight of about 19.6 kN — and hold it. So the first thing the cylinder has to prove is that it can *make* that force. Module 01 showed it can: 100 bar acting on the 50 mm bore gives about 19.6 kN, which is exactly the load. That is the extend stroke, the one that does the lifting.

But the cylinder also has to come back down under control, and here a detail you have not accounted for takes over: the **rod**. On the return stroke the fluid does not push on the full piston face — the rod is in the way — so the same 100 bar produces a *different*, smaller force. If you size a system as though both directions were equal, you will be wrong about the return. So the decision this lesson settles is concrete: **how much force does the cylinder give extending, and how much retracting?** Both follow from one idea and the areas you can compute.

## 2. Physical Intuition

Pressure produces force by pushing on an area: the more area it acts on, the more force you get. On the **extend** stroke the fluid enters the cap side and pushes on the whole piston face — the full bore. That is the biggest area the cylinder has, so extend gives the biggest force. This is the stroke that lifts the load.

On the **retract** stroke the fluid enters the rod side instead, and there the rod passes straight through the chamber and out of the cylinder. The fluid cannot push on the area the rod occupies — it can only push on the ring of piston face left around the rod, the **annulus**. Less area, same pressure, so less force. The rod, in effect, steals a circle of area from the retract stroke. That is why a rod cylinder is asymmetric: strong and slow one way, weaker and quicker the other. This lesson quantifies the force half of that; the next does the speed.

## 3. The Idea You Now Need

Force is pressure times the area it acts on:

$$ F = p\,A $$

The two areas that matter are the full **bore** area and the **annulus** — the bore minus the circle the rod takes up:

$$ A_b = \frac{\pi}{4}d_b^{\,2}, \qquad A_r = A_b - \frac{\pi}{4}d_r^{\,2} $$

So the cylinder gives two forces at the same pressure — a larger one extending, a smaller one retracting:

$$ F_\text{ext} = p\,A_b, \qquad F_\text{ret} = p\,A_r $$

Their ratio, $A_b/A_r$, is a fixed property of the cylinder set only by the bore and rod diameters — the **area ratio**. It tells you, at a glance, how much weaker the return stroke is than the push.

## 4. Visual Explanation

<figure markdown>
  ![The cylinder shown in two states. Extending: fluid at 100 bar fills the cap side and pushes on the full 50 mm bore, area 1963.5 square millimetres, giving 19.6 kilonewtons that lifts the two-tonne load. Retracting: fluid fills the rod side and pushes only on the annulus — the bore minus the 28 mm rod — area 1347.7 square millimetres, giving 13.5 kilonewtons. The rod's circle, 615.8 square millimetres, is marked as the area lost on the return stroke, and the area ratio 1.457 is called out.](assets/m04-l1-force.svg){ width="760" }
</figure>

On top, the **extend** stroke: pressure on the full bore ($A_b = 1963.5\ \text{mm}^2$) makes $F_\text{ext} = 19.6$ kN — just enough to lift the 19.6 kN load, which is exactly how the bore was chosen. Below, the **retract** stroke: the same pressure acts only on the annulus ($A_r = 1347.7\ \text{mm}^2$), because the 28 mm rod removes a $615.8\ \text{mm}^2$ circle, so $F_\text{ret} = 13.5$ kN. The area ratio $A_b/A_r = 1.457$ is the fixed number that says the return push is about a third weaker — and, as the next lesson shows, correspondingly faster.

## 5. Engineering Example

A trash compactor and a log splitter both live off this asymmetry on purpose. Their heavy work — crushing, splitting — happens on the **extend** stroke, where the full bore gives maximum force; the return stroke only has to pull the empty ram back, so the weaker, faster annulus side is exactly what you want there. Designers put the force where the work is and take the speed where it is free. Your platform does the same: it spends its big extend force lifting the load, and lets the lighter retract force (helped by gravity) bring it back down.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the platform's cylinder at working pressure:

- Bore diameter $d_b = 50\ \text{mm}$, rod diameter $d_r = 28\ \text{mm}$
- Working pressure $p = 100\ \text{bar} = 100\times10^5\ \text{Pa}$

**Find** — the extend force, the retract force, and the area ratio.

**Assumptions**

- Static push (no friction or motion losses yet — those come in Lesson 03).
- Full working pressure acts on the driven side.

**Solution**

$$ A_b = \frac{\pi}{4}(0.050)^2 = 1.9635\times10^{-3}\ \text{m}^2 = 1963.5\ \text{mm}^2 $$

$$ A_r = A_b - \frac{\pi}{4}(0.028)^2 = 1.9635\times10^{-3} - 6.158\times10^{-4} = 1.3477\times10^{-3}\ \text{m}^2 = 1347.7\ \text{mm}^2 $$

$$ F_\text{ext} = p\,A_b = (100\times10^5)(1.9635\times10^{-3}) = 19.6\ \text{kN} $$

$$ F_\text{ret} = p\,A_r = (100\times10^5)(1.3477\times10^{-3}) = 13.5\ \text{kN} $$

$$ \frac{A_b}{A_r} = \frac{1963.5}{1347.7} = 1.457 $$

**Result**

$$ \boxed{F_\text{ext} = 19.6\ \text{kN} \;\;(\text{meets the 19.6 kN load})\qquad F_\text{ret} = 13.5\ \text{kN}\qquad A_b/A_r = 1.457} $$

**Engineering Interpretation** — The extend force lands exactly on the 19.6 kN load, which is not luck — the 50 mm bore was chosen in Module 02 so that 100 bar would just lift two tonnes. The retract force is about a third smaller because the rod removes 615.8 mm² of working area, and that is fine: retracting only lowers the load, which gravity already helps. The single number to carry forward is the **area ratio, 1.457** — it fixes both the force asymmetry here and the speed asymmetry in the next lesson.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson01_force.html" title="Cylinder force — extend vs retract" style="width:100%;height:820px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson01_force.html)

Set the pressure and switch between extend and retract. Watch the driven area change — full bore one way, annulus the other — and the force with it. Find 100 bar and confirm 19.6 kN extending, 13.5 kN retracting, and see the area ratio hold at 1.457 whatever the pressure.

## 8. Coding Exercise

```python
import math
db, dr = 0.050, 0.028          # bore and rod diameters, m
Ab = math.pi/4 * db**2         # bore area
Ar = Ab - math.pi/4 * dr**2    # annulus area (bore minus rod)

def force_kN(p_bar, extending=True):
    A = Ab if extending else Ar
    return p_bar*1e5 * A / 1000

print(round(force_kN(100, True), 1), "kN extend")    # 19.6
print(round(force_kN(100, False), 1), "kN retract")  # 13.5
print(round(Ab/Ar, 3), "area ratio")                 # 1.457
```

**Your task:** confirm 19.6 kN extend and 13.5 kN retract at 100 bar. Then: what rod diameter would make the retract force exactly half the extend force, and is that a sensible rod for this cylinder?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson01_quiz.html" title="Force from pressure — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson01_quiz.html)

1. Which stroke — extend or retract — gives the larger force, and why?
2. What is the "annulus" area, and why is it smaller than the bore?
3. At 100 bar the cylinder gives 19.6 kN extending. Why is that number significant for this platform?
4. The retract force is 13.5 kN — why is a weaker return stroke acceptable here?
5. What does the area ratio (1.457) tell you in one number?

## 10. Challenge Problem

An engineer specifies this same cylinder for a machine that must *push* with full force in **both** directions — extend and retract alike. Explain why a standard rod cylinder cannot deliver equal force each way, by how much the retract force falls short here, and describe one cylinder design that *does* give (nearly) equal force in both directions and the trade-off it makes to get there.

## 11. Common Mistakes

- **Assuming force is the same both ways.** The rod makes retract weaker — here by a factor of 1.457. Sizing the return as if it equalled the extend force overestimates it.
- **Using the rod diameter as an area.** The area *lost* is the rod's circle, $\frac{\pi}{4}d_r^2$; the area that *pushes* on retract is the bore minus that circle, not the rod itself.
- **Forgetting the units.** $F = p\,A$ gives newtons only with $p$ in pascals and $A$ in m². Bar times mm² is not newtons.
- **Confusing force with speed.** A bigger area gives more force but, for the same flow, less speed. Extend is strong and slow; retract is weaker and quick. This lesson is force; speed is next.

## 12. Key Takeaways

**The decision you can now make:** state the force the cylinder gives extending and retracting, from the bore and annulus areas at working pressure.

- Force is $F = p\,A$ — pressure acting on whichever area is driven.
- **Extend** uses the full bore $A_b = 1963.5\ \text{mm}^2$, giving $F_\text{ext} = 19.6\ \text{kN}$ — exactly the 19.6 kN load, which is how the bore was sized.
- **Retract** uses the annulus $A_r = 1347.7\ \text{mm}^2$ (the rod removes $615.8\ \text{mm}^2$), giving $F_\text{ret} = 13.5\ \text{kN}$ — a weaker return, which is fine because gravity helps lower the load.
- The **area ratio** $A_b/A_r = 1.457$ is the fixed number that captures the asymmetry.
- The cylinder's force is settled both ways. **The next lesson turns the same flow into speed** — where the rod makes retract the *faster* stroke.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the rod's effect

```
Explain why a hydraulic cylinder with a rod produces different forces on the extend and retract strokes at the same pressure. Define the bore area and the annulus (rod-side) area, derive F = p*A for each, and explain physically why the rod removes area only on the retract stroke. Use a 50 mm bore and 28 mm rod at 100 bar as the worked case.
```

**Challenge** — force vs speed trade

```
For a rod hydraulic cylinder, explain the trade-off between force and speed on the extend versus retract strokes at a fixed pressure and a fixed flow. Why does the stroke with the larger area give more force but less speed, and how does the area ratio A_b/A_r tie the two asymmetries together?
```

**Explore** — equal-force cylinders

```
Standard rod cylinders give unequal force extending and retracting. Explain the designs used when equal (or specific) force ratios are needed: double-rod (through-rod) cylinders, and cylinders chosen for a 2:1 area ratio for regenerative circuits. What does each design trade away, and when is each the right choice?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 04 Lesson 01 — Force from pressure.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The cylinder's force is settled both ways — 19.6 kN extending, 13.5 kN retracting, area ratio 1.457. Next: Lesson 02 — Speed from flow, where the same 10 L/min gives two different velocities, and the rod makes the return the faster one.*
