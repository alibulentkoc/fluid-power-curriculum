!!! abstract "You are here"
    **Module 04 — Actuators**  ·  **Unit 1 — The Cylinder**  ·  **Lesson 04 — Cushioning and end-of-stroke**

# Lesson 04 — Cushioning and end-of-stroke

> **Module 04 · Lesson 04** · *Stopping the moving load without slamming.*
> Lessons 01–03 gave the cylinder its force and speed and derated them for friction. But a moving load has to *stop* — and at the ends of travel it can run out of stroke while still moving. This lesson stops it gently, so the piston never hammers the end cap.
>
> **Learning outcome:** Find the kinetic energy the piston carries into the end of stroke, size a cushion that absorbs it over a short distance, and show how spreading the stop cuts the impact force many times over.

---

## 1. Why This Matters

The platform's piston travels its stroke and then reaches the end. If it arrives still moving — and at 85 mm/s extending or 124 mm/s retracting, it does — something has to absorb its momentum. Without help, that something is the steel end cap, and the load stops in the fraction of a millimetre the metal can flex. Stopping that fast turns a modest amount of kinetic energy into an enormous force: a hammer blow, thousands of times per shift, that cracks caps, bends rods, and loosens every fitting in the machine.

So the decision this lesson settles is: **how do you bring the moving load to rest at the end of travel without a damaging impact?** The answer is *cushioning* — deliberately decelerating the piston over the last stretch of stroke instead of at a dead stop. Get the cushion length right and the end-of-stroke force drops from a destructive spike to a gentle push. This is the difference between a cylinder that survives years and one that beats itself apart.

## 2. Physical Intuition

Catch a cricket ball with a stiff, locked hand and it stings; catch it by drawing your hand back as it arrives and it barely registers. Same ball, same speed, same energy to absorb — but pulling your hand back spreads the stop over a longer distance, so the force is far smaller. Force is energy divided by stopping distance: stop in a centimetre instead of a millimetre and the force is a tenth.

A cushion does exactly this for the piston. Near the end of the stroke, a small plunger on the piston enters a pocket and blocks the easy exit for the oil; the trapped oil can now escape only through a tiny restriction, so it builds a back-pressure that pushes against the piston and slows it down. The piston coasts to rest over the last couple of centimetres — the cushion length — rather than crashing to a halt against the cap. The steel never takes the blow; the oil does, gently, spread over distance. Choosing the cushion is choosing how far to draw your hand back.

## 3. The Idea You Now Need

The piston arrives carrying kinetic energy set by its moving mass and speed:

$$ E_k = \tfrac{1}{2} m v^2 $$

To stop it, the cushion must do work equal to that energy over the cushion length $L_c$. Work is force times distance, so the average decelerating force is the energy divided by the distance:

$$ F = \frac{E_k}{L_c} = \frac{m v^2}{2 L_c} $$

The key is the $L_c$ in the denominator: **the stopping force is inversely proportional to the stopping distance**. Halve the cushion length and you double the force; a hard stop, where the distance is a fraction of a millimetre, produces a force tens of times larger than a proper cushion. The deceleration is $a = v^2/(2L_c)$, and the pressure the cushion oil must build is simply $p_c = F/A$ — which, for a well-sized cushion, stays far below the working pressure.

## 4. Visual Explanation

<figure markdown>
  ![A cylinder piston approaching the end cap, with a cushion plunger entering a pocket and throttling the oil outflow through a small restriction, building a back-pressure that decelerates the piston over the cushion length. Beside it, a bar comparison: stopping the 2-tonne load from 85 millimetres per second in a 1 millimetre hard stop gives about 7.2 kilonewtons of impact, while stopping it over a 25 millimetre cushion gives only about 290 newtons — twenty-five times less. A small note shows the cushion pressure stays around 1.5 bar, far below the 100 bar supply.](assets/m04-l4-cushioning.svg){ width="760" }
</figure>

On the left, the mechanism: as the piston nears the cap, the cushion plunger seals off the main port, so the last of the oil must squeeze through a small restriction. That restriction builds the back-pressure that decelerates the piston over the cushion length. On the right, why it matters: the same 7.2 J of kinetic energy (the 2-tonne load at 85 mm/s) becomes a **7.2 kN hammer blow** if stopped in 1 mm of metal give, but only about **290 N** if spread over a 25 mm cushion — a **25× reduction**, at a cushion pressure of just ~1.5 bar. Retracting is worse (faster, and gravity helps it along), so the cushion is sized for that.

## 5. Engineering Example

A lift (elevator) does not stop by hitting the bottom of the shaft — it has buffers at the base that compress and absorb the car's energy over a distance if it ever overtravels. Car bumpers and crumple zones do the same for a crash: they lengthen the stopping distance so the deceleration, and the force on the occupants, stays survivable. Every one of these is the same equation, $F = E_k/L$: you cannot change the energy, so you change the distance. The cylinder's cushion is the platform's crumple zone, sized so the end of every stroke is a soft landing rather than a collision.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the platform arriving at the end of its extend stroke:

- Moving mass $m \approx 2000\ \text{kg}$ (the 2-tonne load dominates)
- Extend speed $v = 85\ \text{mm/s} = 0.085\ \text{m/s}$
- Bore area $A_b = 1963.5\ \text{mm}^2$

**Find** — the kinetic energy, the stopping force for a 25 mm cushion versus a 1 mm hard stop, and the cushion pressure.

**Assumptions**

- Constant deceleration over the cushion length (average force).
- The cushion absorbs the kinetic energy; other forces are secondary for this estimate.

**Solution**

$$ E_k = \tfrac{1}{2}(2000)(0.085)^2 = 7.2\ \text{J} $$

$$ F_\text{cushion} = \frac{E_k}{L_c} = \frac{7.2}{0.025} = 289\ \text{N}, \qquad F_\text{hard} = \frac{7.2}{0.001} = 7\,230\ \text{N} = 7.2\ \text{kN} $$

$$ p_c = \frac{F_\text{cushion}}{A_b} = \frac{289}{1.9635\times10^{-3}} = 1.47\times10^{5}\ \text{Pa} \approx 1.5\ \text{bar} $$

**Result**

$$ \boxed{\text{cushion } 289\ \text{N at }1.5\ \text{bar} \quad\text{vs}\quad \text{hard stop } 7.2\ \text{kN} \;\;(25\times\ \text{worse})} $$

**Engineering Interpretation** — The energy is small — 7.2 joules — but *where it stops* changes everything. Slammed to rest in 1 mm of metal flex, it becomes a 7.2 kN blow, a third of the cylinder's rated force, delivered on every stroke. Spread over a 25 mm cushion, it is a gentle 289 N at 1.5 bar — nothing the cylinder even notices. The retract stroke is the harder case (124 mm/s and gravity pulling the load down give about 15 J, so ~615 N over the same cushion), so you size the cushion for that worst case. The cushion length is the design knob: longer is gentler, up to the stroke you can spare.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson04_cushioning.html" title="Cushioning — stopping force vs cushion length" style="width:100%;height:840px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson04_cushioning.html)

Set the cushion length and watch the stopping force and deceleration. Shrink it toward a hard stop and the force rockets up the $1/L_c$ curve into the kilonewtons; stretch it and the stop becomes gentle. Compare extend and retract, and see the cushion pressure stay far below the 100 bar supply — a soft landing, by design.

## 8. Coding Exercise

```python
m = 2000.0                # moving mass ~ 2-tonne load, kg
Ab = 3.14159/4 * 0.050**2 # bore area, m^2

def stop(v, Lc):
    Ek = 0.5 * m * v**2
    F  = Ek / Lc          # average stopping force, N
    return Ek, F, F/Ab/1e5 # energy J, force N, cushion pressure bar

for v in (0.085, 0.124):                 # extend, retract
    Ek, F25, p = stop(v, 0.025)          # 25 mm cushion
    _,  Fhard, _ = stop(v, 0.001)        # 1 mm hard stop
    print(f"v={v*1000:.0f} mm/s  Ek={Ek:.1f} J  cushion={F25:.0f} N ({p:.1f} bar)  hard={Fhard/1000:.1f} kN")
```

**Your task:** confirm the 25 mm cushion gives ~289 N extending and the hard stop ~7.2 kN. Then find the cushion length that would keep the *retract* stopping force under 500 N — and check whether that length fits within a sensible fraction of the stroke.

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson04_quiz.html" title="Cushioning — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson04_quiz.html)

1. What does a cushion actually do to stop the piston gently?
2. In $F = E_k/L_c$, what happens to the force if you halve the cushion length?
3. Why is a hard stop against the end cap so damaging, even though the energy is small?
4. Which stroke — extend or retract — sets the cushion size for this platform, and why?
5. Roughly how does the cushion pressure compare with the 100 bar working pressure?

## 10. Challenge Problem

A cylinder on a faster machine arrives at its end of stroke at 300 mm/s carrying a 500 kg load, and the end caps keep cracking. The available cushion length is only 15 mm. Work out the stopping force that cushion gives, explain why it may still be too harsh, and propose two ways — beyond simply lengthening the cushion — to bring the end-of-stroke force down to something the cylinder can take for millions of cycles.

## 11. Common Mistakes

- **Thinking small energy means small force.** 7 joules sounds trivial, but stopped in a fraction of a millimetre it becomes kilonewtons. Force depends on the *distance*, not just the energy.
- **Sizing the cushion for the gentler stroke.** Retract is faster and gravity-assisted, so it carries more energy. Size the cushion for the worst case or it will be too harsh one way.
- **Confusing cushioning with control deceleration.** The control system usually slows the load before the end; the cushion is the mechanical backstop for when it does not. Both matter.
- **Making the cushion as short as possible.** A shorter cushion means a higher force. Use as much length as the stroke can spare — longer is gentler.

## 12. Key Takeaways

**The decision you can now make:** size the end-of-stroke cushion so the moving load stops within a safe deceleration force, at the worst-case stroke.

- A moving piston carries kinetic energy $E_k = \tfrac{1}{2}mv^2$ that must be absorbed at the end of travel.
- The stopping force is $F = E_k/L_c$ — **inversely proportional to the cushion length**. Spreading the stop is what cuts the force.
- For the platform, a **25 mm cushion** turns a **7.2 kN** hard-stop blow into a gentle **~290 N at 1.5 bar** — a **25× reduction**.
- **Retract is the worst case** (faster, gravity-assisted, ~15 J), so the cushion is sized for it.
- The cylinder is now complete as a static-and-stopping device: force, speed, usable force, and a safe stop. **Lesson 05 puts it all in motion** — mass and fluid stiffness together, over a full pick cycle.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — energy, distance, force

```
Explain why the force needed to stop a moving hydraulic piston at the end of its stroke is F = (1/2)m*v^2 / L, where L is the stopping distance, and why a hard stop (very small L) produces a huge force while a cushion (larger L) produces a small one. Use m = 2000 kg, v = 85 mm/s, and compare L = 1 mm with L = 25 mm.
```

**Challenge** — how a cushion works

```
Describe how a hydraulic cylinder's end-of-stroke cushion works mechanically: the cushion plunger, the pocket it enters, the throttled oil path, and the back-pressure that decelerates the piston. Why does this spread the stop over a distance, and how does the cushion length (and adjustable needle) set the deceleration?
```

**Explore** — sizing and alternatives

```
Explain how engineers size an end-of-stroke cushion for a hydraulic cylinder from the moving mass, velocity, and allowable force, and what alternatives exist when the built-in cushion is not enough: external shock absorbers, deceleration valves, controlled electronic slowdown, and stroke limits. What are the trade-offs?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 04 Lesson 04 — Cushioning and end-of-stroke.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The cylinder now stops as cleanly as it starts — a soft landing at each end, sized for the worst-case stroke. Next: Lesson 05 — The cylinder in motion, where mass and fluid stiffness act together over a full pick cycle and the module's picture becomes fully dynamic.*
