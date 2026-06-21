!!! abstract "You are here"
    **Module 02 — Fluid Power Components**  ·  **Unit 1 — The Working Parts**  ·  **Lesson 03 — Lines, fittings, and ports**

# Lesson 03 — Lines, fittings, and ports

> **Module 02 · Lesson 03** · *The conductors that carry the flow.*
> Lesson 02 sized the power unit: a pump that delivers about 10 L/min at the 100 bar the load demands. But that flow still has to travel from the pump to the cylinder — through hoses, fittings, and the ports where they join. This lesson sizes those conductors so they carry the flow without choking it.
>
> **Learning outcome:** Size the lines, fittings, and ports that must carry the pump's flow to the cylinder, by choosing a bore that keeps the fluid velocity in a safe band.

---

## 1. Why This Matters

The power unit makes the flow and the cylinder uses it, but in between sits everything that actually carries the fluid: the pressure line out of the pump, the suction line feeding it, the fittings at every joint, and the ports drilled into the components. Pick these too small and the fluid is forced to rush through a narrow bore — friction bleeds pressure away as heat, the lift loses force, and the line runs hot and noisy. Pick them needlessly large and you pay in weight, cost, and a system slow to fill and bleed.

So the decision this lesson gives you is concrete: for the 10 L/min the platform's pump delivers, **what bore must each line be — and what size must the fittings and ports be — to carry that flow without choking it?** It comes down to one quantity you can already compute: how fast the fluid moves.

## 2. Physical Intuition

The flow is fixed. The power unit delivers about 10 L/min, and every drop of it has to pass through whatever line you choose. The one thing you control is the **bore** — the inside diameter of the path. And bore sets **velocity**: squeeze the same flow through a narrower bore and the fluid must move faster to get through; open the bore and it slows down.

Velocity is what you are really sizing for. Fast fluid drags against the walls, and that drag is friction you pay for in lost pressure — pressure that turns straight into heat. So a line is "right-sized" when its bore keeps the fluid velocity inside a sensible band. The band depends on the line's job: a **pressure line** can run fairly fast, around 5 m/s, because it is already under high pressure and a small loss is tolerable; a **suction line** must run slow, around 1 m/s, or the pump cannot pull fluid in fast enough and starves. Same flow, different jobs, different bores.

## 3. The Idea You Now Need

The fluid velocity in a line is simply the flow divided by the bore's cross-sectional area:

$$ v = \frac{Q}{A}, \qquad A = \frac{\pi}{4} d^2 $$

To *size* a line you turn that around: given the flow and the fastest velocity you will allow, the smallest bore that works is

$$ d_{\min} = \sqrt{\frac{4 Q}{\pi\, v_{\max}}} $$

One rule ties the whole path together. The fluid must pass through the hose, then a fitting, then a port — and the **smallest bore anywhere along that path sets the real velocity**. A perfect hose is wasted behind a pinched fitting or an undersized port. So every joint must be at least as wide as the line it carries.

## 4. Visual Explanation

<figure markdown>
  ![The flow path from the pump's pressure port through a hose and fitting into the cylinder's cap port, comparing a right-sized line where the fluid flows calmly with little pressure lost, against a pinched line where the same flow is forced to rush and pressure is bled away as heat](assets/m02-l3-lines-ports.svg){ width="760" }
</figure>

Follow the fluid from the **pressure port** on the power unit, along the hose, through the **fitting**, and into the **cap port** of the cylinder. In the right-sized line the fluid flows calmly and almost all of the 100 bar reaches the cylinder. In the pinched line the same 10 L/min is forced through a narrow bore, the velocity climbs, and a chunk of the pressure is lost to friction before it ever does any lifting. The narrowest bore in the path — here the pinched fitting — is what sets the velocity.

## 5. Engineering Example

Two lines on the very same machine, carrying the very same 10 L/min, end up completely different sizes. The **pressure line** running from the pump to the cylinder is already under high pressure, so it can tolerate fast flow — around 5 m/s — and a modest bore of about 8 mm does the job. The **suction line** feeding the pump from the reservoir is the opposite: pull fluid through it too fast and the pump cannot keep its inlet full, the fluid flashes into vapour, and the pump cavitates. So the suction line must stay near 1 m/s, which forces a much larger bore — around 16 mm. The flow never changed; the allowable velocity did, and the bore followed.

## 6. Worked Example

<div class="worked" markdown="1">

**Given**

- The flow the power unit delivers $Q = 10\ \text{L/min} = 1.667\times10^{-4}\ \text{m}^{3}/\text{s}$
- The fastest velocity allowed in a pressure line $v_{\max} = 5\ \text{m/s}$

**Find** — the minimum bore for the pressure line, and the actual velocity once a standard size is chosen.

**Assumptions**

- All of the flow passes through this one line (no branch, no leak).
- The bore is round, and the fittings and cap port are at least as wide as the line, so the line itself sets the velocity.
- This is a pressure line, so the 5 m/s band applies (a suction line would use a slower band).

**Solution**

$$ d_{\min} = \sqrt{\frac{4 Q}{\pi\, v_{\max}}} = \sqrt{\frac{4\,(1.667\times10^{-4})}{\pi\,(5)}} = 6.5\times10^{-3}\ \text{m} = 6.5\ \text{mm} $$

The nearest standard bore above 6.5 mm is **8 mm**. Check the velocity it actually gives:

$$ v = \frac{Q}{A} = \frac{1.667\times10^{-4}}{\frac{\pi}{4}(0.008)^2} = 3.3\ \text{m/s} $$

**Result**

$$ d_{\min} \approx 6.5\ \text{mm} \;\Rightarrow\; \text{choose an 8 mm bore}, \qquad v \approx 3.3\ \text{m/s} $$

**Engineering Interpretation** — An 8 mm line carries the platform's 10 L/min at about **3.3 m/s**, comfortably inside the pressure-line band, and loses under **1 bar** of the 100 bar to friction over a typical 2 m run. Squeeze the same flow into a **6 mm** line and the velocity climbs to about 5.9 m/s and the loss nearly **triples to ~2.9 bar** — every lost bar becoming heat. And remember the path rule: a fitting or cap port narrower than 8 mm would re-introduce the choke no matter how good the hose is. Size the whole path, not just the hose.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson03_lines_ports.html" title="Line bore, velocity, and choke — interactive demo" style="width:100%;height:820px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson03_lines_ports.html)

Set the line bore and watch two numbers respond: the fluid velocity and the pressure lost to friction. At 8 mm the flow is calm and the loss is small. Pinch it toward 5 mm and the line **chokes** — the velocity and the loss jump together, and the platform feels it as lost lifting pressure. Open it toward 16 mm and the flow barely whispers.

## 8. Coding Exercise

```python
import math

def line_bore_mm(Q_Lmin, v_max):
    """Minimum line bore (mm) to carry a flow without exceeding a velocity."""
    Q = Q_Lmin / 60000          # L/min -> m^3/s
    d = math.sqrt(4 * Q / (math.pi * v_max))
    return d * 1000             # m -> mm

print(f"{line_bore_mm(10, 5):.1f} mm")     # pressure line, expect: 6.5 mm
```

**Your task:** confirm the 6.5 mm pressure-line bore, then size the **suction line** for the same 10 L/min at a 1.2 m/s limit. Notice how much larger it must be — and explain why the same flow needs a fatter pipe on the way *in* to the pump.

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson03_quiz.html" title="Lines, fittings, and ports — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson03_quiz.html)

1. The flow through a line is fixed. What sets the fluid velocity?
2. Why must a pressure line not be sized too small?
3. Why must a suction line be sized larger than a pressure line for the same flow?
4. In a path of hose, fitting, and port, which one sets the real velocity?
5. What does the pressure lost to friction in a line turn into?

## 10. Challenge Problem

You have correctly sized an 8 mm hose for the pressure line — but the only cylinder you can buy has a 5 mm cap port. Explain what happens to the fluid velocity and the pressure loss at that port, and why upgrading the hose to an even larger bore does **not** fix the problem. Then name the one change that actually would.

## 11. Common Mistakes

- **Sizing the hose and forgetting the rest.** A narrow fitting or port re-chokes the flow behind a perfect hose. The smallest bore in the path wins — size every joint.
- **Using the pressure-line velocity for the suction line.** Pull fluid into the pump too fast and it cavitates. The suction line needs a slower band and a bigger bore.
- **Dismissing pressure drop as "small."** On a long run, a line one size too narrow can quietly waste several bar, all of it turning to heat the cooler then has to remove.
- **Assuming bigger is always better.** Oversized lines are heavy, costly, and slow to fill and bleed. Right-sized means *in band*, not *as large as possible*.

## 12. Key Takeaways

**The decision you can now make:** size the lines, fittings, and ports that carry the pump's flow to the cylinder, by choosing a bore that keeps the fluid velocity in a safe band.

- Flow is fixed; **bore sets velocity**: $v = Q / A$, so a smaller bore means faster fluid and more pressure lost to friction.
- Size from the velocity limit: $d_{\min} = \sqrt{4Q / (\pi v_{\max})}$ — about 6.5 mm for the platform's pressure line, so choose an 8 mm bore (~3.3 m/s).
- A pressure line tolerates ~5 m/s; a suction line must stay near ~1 m/s, so it needs a much larger bore for the same flow.
- The **smallest bore anywhere in the path** sets the real velocity — size the hose, the fittings, and the ports together.
- The platform's parts are now all specified. Lesson 04 assembles them into the **complete component set** the rest of the course will build, drive, and control.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — how lines are really made

```
Explain the practical difference between hydraulic hose, rigid steel tube, and a drilled manifold block as ways to carry fluid between components. For a pressure line carrying about 10 L/min at 100 bar, how would I read a hose's bore size and pressure rating (e.g. SAE dash sizes), and how do I make sure a fitting does not become the narrowest bore in the path?
```

**Challenge** — trace the loss

```
For the lift platform's pressure line (10 L/min, 100 bar, 8 mm bore, a 2 m run of hydraulic oil), walk through how to estimate the pressure dropped to friction and the heat it produces. Show the velocity, the Reynolds number, whether the flow is laminar or turbulent, and the pressure drop — with numbers. Then show how the loss changes if the bore is reduced to 6 mm.
```

**Explore** — why suction must be slow

```
Explain, with everyday analogies, why the suction line into a hydraulic pump must run much slower than the pressure line out of it. What is cavitation, why does pulling fluid too fast cause it, and what damage does it do to a pump over time?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 02 Lesson 03 — Lines, fittings, and ports.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*Next lesson: 04 — The complete component set (assembling the sized cylinder, power unit, and lines into the full parts list the platform is built from).*
