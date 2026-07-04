!!! abstract "You are here"
    **Module 04 — Actuators**  ·  **Unit 1 — The Cylinder**  ·  **Lesson 02 — Speed from flow**

# Lesson 02 — Speed from flow

> **Module 04 · Lesson 02** · *How fast the cylinder moves, each way.*
> Lesson 01 found the cylinder's force: strong extending, weaker retracting, set by the area ratio 1.457. Speed is the other half of "what the cylinder gives," and it comes from the pump's flow. This lesson turns the 10 L/min into a speed — and finds the same 1.457 ratio, flipped.
>
> **Learning outcome:** Compute the extend and retract speeds from the pump's flow, show the rod makes retract *faster* by the area ratio, and see that the force–speed trade leaves the power unchanged.

---

## 1. Why This Matters

Force alone does not make a useful platform — it has to move, and move fast enough. Module 02 promised a lift in about seven seconds; that promise is a *speed* requirement, and speed does not come from pressure — it comes from **flow**. The pump delivers 10 L/min, and every drop has to go somewhere: into the cylinder, pushing the piston along. How fast the piston travels depends on how much volume the flow has to fill per millimetre of travel — which is the piston's area.

So the decision this lesson settles is the companion to Lesson 01: **how fast does the cylinder extend, and how fast does it retract, on the platform's 10 L/min?** And because the rod makes the two sides different areas, the two speeds differ — by exactly the ratio you already met. The result completes the cylinder's performance: a force and a speed, each way.

## 2. Physical Intuition

Flow is volume per second; speed is how fast that volume stacks up behind the piston. Picture pouring water into a tube at a fixed rate: in a **wide** tube the level rises slowly, in a **narrow** tube the same pour races up. The piston is the water level, the pump is the pour, and the cylinder's driven area is the width of the tube.

That single picture settles both strokes. Extending, the flow fills behind the **full bore** — a wide tube — so the piston moves at a moderate speed. Retracting, the same flow fills behind the **annulus** — a narrower tube, because the rod takes up the middle — so the piston moves *faster*. Same pump, same 10 L/min, but the rod side is the narrow tube. Notice the mirror with Lesson 01: the full bore gave the *larger force* and now gives the *lower speed*; the annulus gave the smaller force and now gives the higher speed. Area helps force and hurts speed — the two always trade.

## 3. The Idea You Now Need

Speed is simply flow divided by the area the flow drives against:

$$ v = \frac{Q}{A} $$

Extending drives the full bore, retracting drives the annulus, so the two speeds are:

$$ v_\text{ext} = \frac{Q}{A_b}, \qquad v_\text{ret} = \frac{Q}{A_r} $$

Because $A_r$ is the smaller area, $v_\text{ret}$ is the larger speed, and their ratio is the same area ratio from Lesson 01 — now the other way up:

$$ \frac{v_\text{ret}}{v_\text{ext}} = \frac{A_b}{A_r} = 1.457 $$

There is a deeper symmetry hiding here. Extending, the cylinder gives *more force, less speed*; retracting, *less force, more speed*. Multiply the two and the areas cancel: $F\,v = (p\,A)(Q/A) = p\,Q$. The **power is the same both ways** — the rod only trades force for speed, never creating or destroying the $p\,Q$ that Module 03 identified.

## 4. Visual Explanation

<figure markdown>
  ![Two rows comparing the strokes on the platform's 10 litres per minute. The extend row drives the full bore area and moves at about 85 millimetres per second — a longer, slower speed bar labelled strong and slow, 19.6 kilonewtons. The retract row drives the smaller annulus and moves at about 124 millimetres per second — a shorter area but a longer speed bar labelled weak and fast, 13.5 kilonewtons. A badge shows the speed ratio equals the area ratio 1.457, and a second badge shows force times speed equals p times Q equals about 1.67 kilowatts for both strokes, so power is conserved.](assets/m04-l2-speed.svg){ width="760" }
</figure>

Both rows get the same 10 L/min. Extending fills the wide full bore, so the piston travels at about **85 mm/s** — the moderate speed behind the strong 19.6 kN push. Retracting fills the narrow annulus, so the same flow drives the piston at about **124 mm/s** — faster, behind the weaker 13.5 kN. The speed ratio is the area ratio, **1.457**, flipped from the force. And the right-hand badge is the punchline: force × speed is about **1.67 kW** either way — the rod trades force for speed, but the power the fluid carries is unchanged.

## 5. Engineering Example

A garden hose shows it in your hand. Water leaves the tap at a fixed flow; put your thumb over the end to shrink the opening and the water shoots out faster, even though no more is flowing. You have not added flow — you have shrunk the area, so the same volume per second must move faster to get through. The cylinder's rod side is your thumb over the hose: a smaller area for the same flow, so a higher speed. And just as your thumb does not create extra water, the rod does not create extra power — it only rearranges the same flow into more speed and less force.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the platform's cylinder on the pump's flow:

- Bore area $A_b = 1963.5\ \text{mm}^2$, annulus area $A_r = 1347.7\ \text{mm}^2$
- Pump flow $Q = 10\ \text{L/min} = 1.667\times10^{-4}\ \text{m}^3/\text{s}$
- Stroke $\approx 600\ \text{mm}$ (the platform's lift height)

**Find** — the extend and retract speeds, the times to travel the stroke, and a check that the power matches.

**Assumptions**

- All the pump flow reaches the driven side (no leakage or losses yet — those come in Lesson 03).
- Steady speed along the stroke.

**Solution**

$$ v_\text{ext} = \frac{Q}{A_b} = \frac{1.667\times10^{-4}}{1.9635\times10^{-3}} = 0.085\ \text{m/s} = 85\ \text{mm/s} $$

$$ v_\text{ret} = \frac{Q}{A_r} = \frac{1.667\times10^{-4}}{1.3477\times10^{-3}} = 0.124\ \text{m/s} = 124\ \text{mm/s} $$

$$ t_\text{ext} = \frac{600}{85} \approx 7.1\ \text{s}, \qquad t_\text{ret} = \frac{600}{124} \approx 4.8\ \text{s} $$

Power check, extending: $F_\text{ext}\,v_\text{ext} = (19{,}600)(0.085) \approx 1.67\ \text{kW}$; retracting: $(13{,}500)(0.124) \approx 1.67\ \text{kW}$.

**Result**

$$ \boxed{v_\text{ext} = 85\ \text{mm/s}\ (7.1\ \text{s}) \qquad v_\text{ret} = 124\ \text{mm/s}\ (4.8\ \text{s}) \qquad F\,v \approx 1.67\ \text{kW both ways}} $$

**Engineering Interpretation** — The 85 mm/s extend speed gives the ~7 second lift Module 02 promised — the numbers close, because the flow, the bore, and the stroke were all chosen together. Retract is quicker at 124 mm/s, which is exactly what you want: the platform lowers and resets faster than it lifts. And the power check is the reassurance that nothing was gained for free — extend and retract both carry the same 1.67 kW the fluid delivers. Force and speed are now both known, each way; Lesson 03 asks how much of them survives friction.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson02_speed.html" title="Cylinder speed — extend vs retract from flow" style="width:100%;height:840px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson02_speed.html)

Set the pump flow and compare the strokes. Extending fills the full bore and moves slower; retracting fills the annulus and moves faster — always by the ratio 1.457. Find 10 L/min and confirm 85 mm/s extending and 124 mm/s retracting, and watch the power reading stay put as the speed and force trade against each other.

## 8. Coding Exercise

```python
import math
Ab = math.pi/4 * 0.050**2          # bore area, m^2
Ar = Ab - math.pi/4 * 0.028**2     # annulus area, m^2
Q  = 10 / 60000                    # 10 L/min -> m^3/s

def speed_mm_s(area):
    return Q / area * 1000

print(round(speed_mm_s(Ab), 1), "mm/s extend")     # 84.9
print(round(speed_mm_s(Ar), 1), "mm/s retract")    # 123.7
print(round(speed_mm_s(Ar)/speed_mm_s(Ab), 3))     # 1.457  (= area ratio)
```

**Your task:** confirm 85 mm/s extend and 124 mm/s retract at 10 L/min. Then: if a job needed the platform to *lift* in 4 seconds over the 600 mm stroke, what pump flow would that take — and what would that do to the retract speed?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson02_quiz.html" title="Speed from flow — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson02_quiz.html)

1. Cylinder speed comes from which supply quantity — pressure or flow?
2. Which stroke is faster on the same flow, and why?
3. The force ratio and the speed ratio are both 1.457. Why are they the same number, flipped?
4. Extending at 85 mm/s gives about a 7-second lift. Why is that the number Module 02 expected?
5. Force × speed is about 1.67 kW for both strokes. What does that tell you about the rod?

## 10. Challenge Problem

A customer wants the platform to lift twice as fast without changing the cylinder. Explain what must change on the supply side to double the extend speed, what happens to the retract speed and the lift/lower times as a result, and — using the power check from this lesson — what the faster motion demands of the power unit you will size in Module 05.

## 11. Common Mistakes

- **Thinking pressure sets speed.** Pressure sets force; **flow** sets speed. A higher pressure pushes harder but does not move the piston faster — only more flow does.
- **Expecting the slower stroke to be the weaker one.** It is the opposite: the full bore is *strong and slow*, the annulus *weak and fast*. Area helps force and hurts speed.
- **Forgetting the rod on the return.** Retract speed uses the annulus, not the bore. Using $A_b$ both ways misses the 1.457 difference entirely.
- **Believing the faster stroke gives more power.** It does not — $F\,v = p\,Q$ is the same both ways. More speed is bought with exactly as much less force.

## 12. Key Takeaways

**The decision you can now make:** state the cylinder's extend and retract speeds on the platform's flow, and know they trade force for speed at constant power.

- Speed comes from **flow**, not pressure: $v = Q/A$.
- Extending fills the full bore → **85 mm/s** (~7 s lift); retracting fills the annulus → **124 mm/s** (~4.8 s) — retract is **1.457× faster**, the flipped area ratio.
- The rod makes extend *strong and slow*, retract *weak and fast*: area helps force and hurts speed in equal measure.
- **Power is conserved:** $F\,v = p\,Q \approx 1.67\ \text{kW}$ both ways — the rod trades force for speed, nothing more.
- The cylinder's ideal force and speed are now known each way. **Lesson 03 subtracts the real world — friction and mass** — to find the *usable* force.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — flow into speed

```
Explain, for a hydraulic cylinder, why piston speed equals flow divided by driven area (v = Q/A), and why a double-acting cylinder with a rod extends and retracts at different speeds on the same pump flow. Use the platform's numbers: 10 L/min, bore area 1963.5 mm^2, annulus 1347.7 mm^2. Which stroke is faster, and by what ratio?
```

**Challenge** — the force–speed trade

```
Show that for a hydraulic cylinder, force times speed equals pressure times flow (F*v = p*Q) on both the extend and retract strokes, so the power is the same each way even though force and speed differ. Explain physically why the rod trades force for speed without changing the power the fluid delivers.
```

**Explore** — sizing for a speed

```
If a hydraulic platform must complete its lift in a set time over a known stroke, explain how you work backward from the required speed to the pump flow, and how the extend/retract area ratio then fixes the return speed. What trade-offs appear between speed, pump size, and heat as you demand faster motion?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 04 Lesson 02 — Speed from flow.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The cylinder's ideal force and speed are now known in both directions — strong-and-slow out, weak-and-fast back, at constant power. Next: Lesson 03 — Friction and the usable force, where mass and friction subtract from the ideal to leave what the cylinder really delivers.*
