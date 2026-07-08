!!! abstract "You are here"
    **Module 06 — Valves & Control**  ·  **Unit 1 — Commanding the Flow**  ·  **Lesson 01 — What the valves must do**

# Lesson 01 — What the valves must do

> **Module 06 · Lesson 01** · *Turning a stream of oil into commands.*
> Module 05 delivered a power unit that makes 10 L/min at 100 bar, all day. But that flow, left to itself, does nothing — it just circulates. The valves are what turn a stream of oil into *raise*, *lower*, and *hold*. This lesson names those jobs and introduces the valve that gives them.
>
> **Learning outcome:** State the three commands the platform needs, describe the directional control valve that routes flow to deliver them, and see how a valve is really a controllable orifice whose opening meters the flow.

---

## 1. Why This Matters

A power unit on its own is like an engine with no gearbox or pedals: plenty of energy, no way to direct it. The pump pushes 10 L/min out of the port whether the platform should be rising, falling, or standing still. To make a *machine*, something has to decide where that oil goes and how fast — to send it to the cap side to lift, to the rod side to lower, to block it entirely to hold, and to throttle it for a controlled speed. Those decisions are the job of the valves.

So the decision this lesson settles is the framing one for the whole module: **what, exactly, must the valves do for this platform, and what single component gives the basic commands?** The platform needs three actions — raise, lower, hold — plus fine control of speed for its ±1 mm precision, plus safe lowering of a load that gravity is only too happy to drop. This lesson establishes those requirements and introduces the **directional control valve** at the centre of them; the rest of the module makes each one precise and safe.

## 2. Physical Intuition

Think of the directional control valve as a sliding switch in the oil's path. Inside a bored body, a **spool** slides between positions; each position lines up internal passages differently, connecting the pump and tank lines to the two sides of the cylinder in different ways. Slide it one way and pump pressure reaches the cap side while the rod side drains to tank — the platform **rises**. Slide it the other way and the connections swap — the platform **lowers**. Centre it and the passages close — the oil is blocked and the platform **holds**. One spool, three commands, chosen by how far and which way it moves.

There is a second idea hiding in that spool. Where it opens a passage, it does not open it fully all at once — it opens a *gap*, and the size of that gap controls how much oil squeezes through. A valve, at heart, is a **controllable orifice**: a small opening throttles flow, a large one passes it freely. That is how the same valve that chooses *direction* can also choose *speed* — by how far it opens. It is the steering wheel and the throttle in one piece, and understanding it as an orifice is the key to everything that follows.

## 3. The Idea You Now Need

The platform's basic commands come from a **4/3 directional control valve** — *four ports, three positions*. The four ports are the pump supply **P**, the tank return **T**, and the two lines to the cylinder, **A** (cap side) and **B** (rod side). The three positions route them:

| Command | Spool position | Connections |
|---------|----------------|-------------|
| **Raise** | shifted one way | P→A, B→T (oil to cap side, rod side drains) |
| **Lower** | shifted the other | P→B, A→T (oil to rod side, cap side drains) |
| **Hold**  | centre | ports blocked — oil trapped, load held |

And wherever the spool opens a passage, that passage is an orifice, so the flow through it follows the orifice law:

$$ Q = C_d\,A(u)\,\sqrt{\frac{2\,\Delta p}{\rho}} $$

where $A(u)$ is the opening set by the spool command $u$, $\Delta p$ is the pressure drop across the valve, $\rho$ the oil density (~870 kg/m³), and $C_d \approx 0.65$ a discharge coefficient. That single equation — the spine of this module — says flow rises with opening and with the square root of the pressure drop. To pass the platform's 10 L/min at a modest 5 bar valve drop needs an opening of only about **7.6 mm²**.

## 4. Visual Explanation

<figure markdown>
  ![A 4/3 directional control valve shown as three side-by-side boxes for its three positions, connected to the four ports P (pump), T (tank), A (cap side) and B (rod side) and to the cylinder. In the raise position, arrows route P to A and B to T so the piston extends; in the lower position, P to B and A to T so it retracts; in the centre hold position, all four ports are blocked and the load is trapped. Below, a detail shows the valve as a controllable orifice: a spool edge opening a gap of area A(u), with the orifice law Q equals C_d times A(u) times the square root of two delta-p over rho, noting that about a 7.6 square-millimetre opening passes 10 litres per minute at a 5 bar drop.](assets/m06-l1-valve-functions.svg){ width="760" }
</figure>

The three boxes are the valve's three positions, each routing the four ports differently: **raise** sends pump flow to the cap side (P→A) and drains the rod side (B→T); **lower** swaps them (P→B, A→T); **hold** blocks all four so the trapped oil holds the load. The detail below is the second, subtler point — every passage the spool opens is an **orifice**, so the flow through it obeys $Q = C_d A(u)\sqrt{2\Delta p/\rho}$. Direction comes from *which* passages open; speed comes from *how far* they open. One valve, both jobs.

## 5. Engineering Example

A kitchen mixer tap is the same device you are about to specify. Which way you turn it chooses *direction* — hot side, cold side, or off in the middle — exactly like the directional valve's three positions. How far you turn it chooses *rate* — a trickle or a gush — exactly like the spool opening a larger or smaller orifice. And you feel the trade-offs a hydraulic engineer designs around: open it a crack against high pressure and you get a thin, fast jet; open it wide and the flow is generous but gentler. The platform's valve is a tap for oil, sized and shaped so that its "off" truly holds two tonnes and its "on" meters flow finely enough for millimetre precision.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the platform's flow through its directional valve:

- Flow to pass $Q = 10\ \text{L/min} = 1.667\times10^{-4}\ \text{m}^3/\text{s}$
- Oil density $\rho = 870\ \text{kg/m}^3$, discharge coefficient $C_d = 0.65$, valve drop $\Delta p = 5\ \text{bar}$

**Find** — the spool opening needed to pass the flow, and what the valve drop costs the platform.

**Assumptions**

- Sharp-edged orifice; steady flow; nominal $C_d$.

**Solution**

$$ A = \frac{Q}{C_d\sqrt{2\Delta p/\rho}} = \frac{1.667\times10^{-4}}{0.65\sqrt{2(5\times10^5)/870}} = \frac{1.667\times10^{-4}}{0.65\times33.9} \approx 7.6\ \text{mm}^2 $$

The 5 bar drop is a loss: of the 100 bar the pump supplies, ~5 bar is spent pushing oil through the valve, so the cylinder sees ~95 bar.

**Result**

$$ \boxed{A \approx 7.6\ \text{mm}^2 \text{ opening at }5\text{ bar drop};\quad \text{cylinder sees }\approx 95\text{ bar}} $$

**Engineering Interpretation** — A surprisingly small opening — under 8 mm² — passes the platform's whole flow, because 5 bar of pressure drives oil through an orifice at nearly 34 m/s. That is the valve's leverage: a tiny, precisely-controlled gap governs the entire 10 L/min. The flip side is the 5 bar it costs: valve drops are a real loss, taken off the pressure the cylinder can use, so a controller must not over-throttle. This one equation — opening and pressure drop setting the flow — is the tool for every remaining lesson: sizing the directional valve, metering for smooth speed, and taming the load on the way down.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson01_valve_functions.html" title="What the valves must do — raise, lower, hold" style="width:100%;height:860px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

Switch the directional valve between raise, lower, and hold and watch the flow path light up and the cylinder respond — P→A to extend, P→B to retract, all blocked to hold. Then open the spool a little or a lot and see the orifice law set the flow: a small gap meters a trickle, a wider one passes the full 10 L/min.

## 8. Coding Exercise

```python
import math
rho, Cd = 870.0, 0.65

def orifice_flow_Lmin(A_mm2, dP_bar):
    A = A_mm2 * 1e-6
    Q = Cd * A * math.sqrt(2 * dP_bar*1e5 / rho)   # m^3/s
    return Q * 60000                                # L/min

def opening_for(Q_Lmin, dP_bar):
    Q = Q_Lmin/60000
    A = Q / (Cd * math.sqrt(2*dP_bar*1e5/rho))
    return A*1e6                                    # mm^2

print(round(opening_for(10, 5), 1), "mm^2 to pass 10 L/min at 5 bar")   # ~7.6
print(round(orifice_flow_Lmin(7.6, 5), 1), "L/min through 7.6 mm^2")    # ~10
```

**Your task:** confirm ~7.6 mm² passes 10 L/min at a 5 bar drop. Then: if the spool opens only half that area, what flow (and so what cylinder speed) results at the same pressure drop — and is the relationship linear?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson01_quiz.html" title="What the valves must do — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

1. What three commands must the platform's valves provide?
2. In a 4/3 directional valve, what are the four ports and the three positions?
3. How does the same valve control both direction and speed?
4. In the orifice law, what two things set the flow through a valve opening?
5. Why is the valve's pressure drop a cost, not just a number?

## 10. Challenge Problem

Sketch what goes wrong if the platform had *only* a simple directional valve and nothing else. Consider: the load slowly sinking while the valve is centred (leakage), the platform lurching as the valve opens against high pressure, and the two-tonne load accelerating out of control as the valve opens to lower it. For each, name the extra kind of valve the platform will need — and note which later lesson in this module addresses it.

## 11. Common Mistakes

- **Thinking a valve only changes direction.** The same spool opening also *meters* flow — direction and speed are one component's two jobs.
- **Ignoring the valve's pressure drop.** Every open passage is an orifice with a real Δp; that drop is pressure the cylinder no longer has. Over-throttling starves the platform.
- **Assuming "centre" means "held perfectly".** A plain closed centre blocks flow, but valve leakage still lets a heavy load creep — which is why Lesson 03 adds a proper lock.
- **Forgetting gravity on the way down.** Lowering a load is not just "raise in reverse": the load's weight can drive the cylinder faster than the pump feeds it, needing special control (Lesson 05).

## 12. Key Takeaways

**The decision you can now make:** state the control jobs the platform needs, and recognise the directional valve — a controllable orifice — as the component that gives its basic commands.

- The valves turn a stream of oil into commands: **raise, lower, hold** — plus metered speed for precision.
- A **4/3 directional control valve** (ports P, T, A, B; three positions) routes flow: P→A to raise, P→B to lower, centre to hold.
- Every valve opening is a **controllable orifice**: $Q = C_d\,A(u)\sqrt{2\Delta p/\rho}$ — direction from *which* passage opens, speed from *how far*.
- A modest **~7.6 mm²** opening passes the platform's 10 L/min at a 5 bar drop; that drop is a real loss (~95 bar reaches the cylinder).
- Three jobs remain to make this safe and precise — **holding without drift, metering for ±1 mm, and taming the load on the way down**. **Lesson 02 details the directional valve itself.**

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the directional valve

```
Explain a 4/3 hydraulic directional control valve: its four ports (P, T, A, B) and three spool positions, and how each position routes flow to extend, retract, or hold a double-acting cylinder. Why is it called "4/3", and what does the spool physically do?
```

**Challenge** — the valve as an orifice

```
Explain why a hydraulic valve is fundamentally a controllable orifice governed by Q = C_d * A(u) * sqrt(2*dP/rho). Using rho = 870 kg/m^3 and C_d = 0.65, find the opening area needed to pass 10 L/min at a 5 bar pressure drop, and explain how the same equation lets one valve set both direction and speed.
```

**Explore** — the whole control problem

```
For a hydraulic platform that must raise, lower, and hold a two-tonne load to +/-1 mm, list every control job the valves must perform beyond simple direction: holding without drift, metering speed smoothly, and controlling an overrunning (gravity-driven) load on the way down. What kind of valve solves each, and why can't one simple directional valve do it all?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 06 Lesson 01 — What the valves must do.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The control problem is framed: the platform needs a directional valve to raise, lower, and hold, plus metering for precision and safe lowering. Next: Lesson 02 — The directional control valve, its ports, positions, and how it routes the flow in detail.*
