!!! abstract "You are here"
    **Module 03 — Fluid Fundamentals**  ·  **Unit 1 — The Fluid**  ·  **Lesson 01 — The working fluid**

# Lesson 01 — The working fluid

> **Module 03 · Lesson 01** · *What the fluid must carry, and what it must be.*
> Module 02 left you with a complete, connected set of components — a double-acting cylinder, a power unit, lines and ports, a relief valve, a directional valve, and a filter, all wired into one closed loop. But steel and hose do nothing until the loop is filled. This lesson introduces the fluid that fills it: what it carries, the four jobs it does, and which kind of fluid to choose.
>
> **Learning outcome:** State what the working fluid must carry — the hydraulic power, $P = p\,Q$ — compute it for the platform, and choose the fluid type that can do the job.

---

## 1. Why This Matters

Everything you specified in Module 02 is inert. The pump cannot make pressure against nothing; the cylinder cannot lift without something to push it; the relief valve, the directional valve, the filter — all of them act *on a fluid*. Fill the loop with the right fluid and the platform becomes smooth, stiff, and long-lived. Fill it with the wrong one — or the right one gone bad — and the very same components leak, overheat, sag under the load, and wear out.

So before you can size the actuator in Module 04, you have to answer the question this whole module asks: **what does the platform demand of its fluid, and what fluid can meet it?** The fluid has to survive the 100 bar the load imposes, carry the 10 L/min the pump delivers, and do several other quiet jobs at the same time. This lesson names those jobs and settles the first decision — the kind of fluid.

## 2. Physical Intuition

Think of the fluid as the platform's bloodstream. It is pushed out of the pump under pressure, travels the lines to the cylinder, delivers its push to the load, and returns to be cooled and cleaned — round and round the closed loop. Along the way it does four things at once:

- **Transmits power** — it carries the push from the pump to the load. This is its headline job.
- **Lubricates** — it coats every sliding surface (pump vanes, valve spools, the piston seal) so metal never grinds on metal.
- **Seals** — it fills the tiny clearances inside pumps and valves, so pressure does not simply leak past.
- **Cools** — it soaks up the heat that friction and pressure losses create, and carries it back to the reservoir to shed.

The headline job — transmitting power — depends on **two** things happening together: the fluid must be under **pressure** (so it can push hard) and it must **flow** (so it can move the load). Pressure alone, with no flow, holds but does not lift. Flow alone, at no pressure, moves but does no work. Power is the two multiplied.

## 3. The Idea You Now Need

The power the fluid carries is the pressure it is under times the rate it flows:

$$ P = p \, Q $$

where $p$ is the pressure (in pascals) and $Q$ is the volume flow rate (in cubic metres per second). The result is in watts. This is the hydraulic version of "power = force × velocity": pressure is force spread over an area, and flow is volume swept per second, and their product is energy per second — power.

Both terms are set by the platform, and you already know them. The **pressure** is fixed by the load: lifting two tonnes on a 50 mm bore needs about 100 bar. The **flow** is fixed by the speed: raising the platform in about 7 seconds needs about 10 L/min. Multiply them and you get the power the fluid must carry from the pump to the load — which is exactly the power the motor from Module 02 had to supply.

## 4. Visual Explanation

<figure markdown>
  ![The closed loop with the fluid highlighted, labelled with its four jobs — transmits power from pump to cylinder, lubricates the moving parts, seals the internal clearances, and carries heat back to the reservoir — and the operating point of 100 bar times 10 L/min equals about 1.67 kW](assets/m03-l1-working-fluid.svg){ width="760" }
</figure>

The same closed loop from Module 02, now seen as the fluid sees it. Follow the working line from the pump: the fluid leaves under pressure $p$, at flow $Q$, carrying power $p\,Q$ to the cylinder, where it pushes the load. On the way it lubricates the pump and valve, seals their clearances, and on the return leg carries heat back to the reservoir. For the platform, $p \approx 100$ bar and $Q \approx 10$ L/min, so the fluid carries about **1.67 kW** — the same figure the motor had to deliver.

## 5. Engineering Example

A hydroelectric dam works the fluid the same way. Its power is the water's pressure (set by how high the reservoir sits above the turbine — the "head") times the flow through the turbine. A tall dam with a trickle and a low dam with a torrent can generate the same power, because power is head *times* flow, not either alone. Your platform is the dam in miniature: the pump supplies the head (100 bar of pressure) and the flow (10 L/min), and their product is the power delivered to the load. It is the same physics whether the fluid turns a turbine or lifts a platform.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the platform's operating point, carried over from Module 02:

- Working pressure $p = 100\ \text{bar} = 100 \times 10^5\ \text{Pa}$
- Pump flow $Q = 10\ \text{L/min}$

**Find** — the hydraulic power the fluid must carry from the pump to the load.

**Assumptions**

- Steady lifting at the working point; losses in the lines neglected for this estimate.
- Flow is entirely delivered to the cylinder.

**Solution** — convert the flow to SI, then multiply.

$$ Q = \frac{10\ \text{L/min}}{60{,}000} = 1.67 \times 10^{-4}\ \text{m}^3/\text{s} $$

$$ P = p\,Q = (100 \times 10^5\ \text{Pa}) \times (1.67 \times 10^{-4}\ \text{m}^3/\text{s}) = 1{,}667\ \text{W} $$

**Result**

$$ P \approx 1.67\ \text{kW} $$

**Engineering Interpretation** — The fluid must carry about 1.67 kW from the pump to the load — and this is exactly the power the motor in Module 02 was sized to supply, which is the consistency check that the whole picture holds together. Notice what the number is made of: raise the pressure *or* the flow and the power climbs in step. That is why a fluid that cannot hold the pressure, or cannot pass the flow without choking, fails the platform — and why the properties of the next three lessons (viscosity, stiffness, cleanliness) all matter. First, though, you need a fluid that can do the four jobs at once.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson01_working_fluid.html" title="Hydraulic power — pressure times flow" style="width:100%;height:820px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

Set the pressure and the flow and watch the power the fluid carries, $P = p\,Q$. Find the platform's operating point — 100 bar and 10 L/min — and confirm it lands at about 1.67 kW. Then see how raising either one alone raises the power, and why pressure with no flow (a held load) does no lifting work at all.

## 8. Coding Exercise

```python
# The power the working fluid carries, P = p * Q.
def hydraulic_power_kW(p_bar, Q_Lmin):
    p = p_bar * 1e5          # bar -> Pa
    Q = Q_Lmin / 60000       # L/min -> m^3/s
    return p * Q / 1000      # W -> kW

# the platform's operating point
print(round(hydraulic_power_kW(100, 10), 2), "kW")   # expect 1.67

for p, Q in [(100, 10), (150, 10), (100, 15)]:
    print(p, "bar x", Q, "L/min =", round(hydraulic_power_kW(p, Q), 2), "kW")
```

**Your task:** confirm the operating point prints 1.67 kW. Then answer: if the load grew and the pressure rose to 150 bar while the flow stayed at 10 L/min, how much more power must the fluid carry — and where does that extra power come from?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson01_quiz.html" title="The working fluid — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

1. Hydraulic power is the product of which two quantities?
2. A load is held perfectly still at pressure but nothing moves. How much lifting power is the fluid delivering, and why?
3. Besides transmitting power, name two other jobs the working fluid does inside the platform.
4. The platform runs at 100 bar and 10 L/min. Roughly what power must the fluid carry, and what earlier number should it match?
5. Why is water, despite being cheap and available, a poor choice of working fluid for this platform?

## 10. Challenge Problem

A colleague proposes running the platform on plain water to save money, arguing that water is nearly incompressible and flows easily. Give two distinct reasons — drawn from the fluid's four jobs — why mineral hydraulic oil is chosen instead, and describe one thing you would expect to go wrong with the pump or cylinder within weeks if it ran on water.

## 11. Common Mistakes

- **Treating pressure as power.** A gauge reading 100 bar tells you the push, not the power. With no flow, a fluid at 100 bar lifts nothing — power needs pressure *and* flow together.
- **Forgetting the quiet jobs.** A fluid can carry the right power and still ruin the platform if it does not lubricate, seal, and cool. The headline job is not the only job.
- **Mismatched units.** $P = p\,Q$ gives watts only when $p$ is in pascals and $Q$ in m³/s. Multiplying bar by L/min directly gives a meaningless number.
- **Assuming any oil will do.** Engine oil, gear oil, and hydraulic oil are not interchangeable; hydraulic oil is formulated for the pressures, clearances, and long service this job demands.

## 12. Key Takeaways

**The decision you can now make:** state what the working fluid must carry — the hydraulic power $P = p\,Q$ — and choose the fluid type that can carry it while lubricating, sealing, and cooling.

- The fluid does **four jobs at once**: transmits power, lubricates, seals, and cools.
- The power it carries is $P = p\,Q$ — pressure **and** flow together. Pressure alone holds; flow alone moves; only their product lifts.
- For the platform, $100\ \text{bar} \times 10\ \text{L/min} \approx \mathbf{1.67\ kW}$ — the same power the motor supplies.
- The chosen fluid is **mineral-based hydraulic oil**: it lubricates and seals as it works, resists wear, and stays stable in service — where water would corrode and fail to lubricate.
- The fluid now has a *job* and a *type*. **The next lesson picks its most important property — viscosity** — so it is thick enough to seal yet thin enough to flow.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the four jobs

```
Explain, for a small industrial hydraulic system running at about 100 bar, how the working fluid simultaneously transmits power, lubricates moving parts, seals internal clearances, and carries away heat. For each job, describe what property of the fluid makes it possible and what goes wrong if the fluid cannot do it.
```

**Challenge** — pressure versus power

```
A hydraulic platform holds a heavy load perfectly still: the gauge reads 100 bar but nothing moves. Explain why the fluid is delivering zero lifting power in this moment even though the pressure is high. Then explain what changes the instant the platform starts to rise, in terms of P = p x Q.
```

**Explore** — why oil, not water

```
Compare mineral hydraulic oil with water as a hydraulic working fluid for a system at 100 bar. Cover lubrication, corrosion, sealing, boiling and freezing, and service life. Why is mineral oil the default choice for industrial hydraulics despite water being cheaper?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 03 Lesson 01 — The working fluid.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*Module 03 begins — the loop now has a fluid with a job (carry the power) and a type (mineral hydraulic oil). Next: Lesson 02 — Viscosity, the single property that decides whether the fluid is thick enough to seal yet thin enough to flow.*
