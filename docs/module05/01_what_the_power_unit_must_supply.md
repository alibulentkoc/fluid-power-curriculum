!!! abstract "You are here"
    **Module 05 — Power Units**  ·  **Unit 1 — The Power Source**  ·  **Lesson 01 — What the power unit must supply**

# Lesson 01 — What the power unit must supply

> **Module 05 · Lesson 01** · *The demand the power unit has to meet.*
> Every number in Module 04 assumed fluid arriving at 100 bar and 10 L/min. Nothing in the machine makes that happen yet. This lesson states exactly what the power unit must deliver — flow, pressure, and power — and names the four parts you will size to deliver it.
>
> **Learning outcome:** State the flow, pressure, and power the platform's power unit must supply, convert the fluid power into the electrical power the unit will draw, and identify the four components that make up the unit.

---

## 1. Why This Matters

Everything you have built so far consumes fluid power; nothing produces it. The cylinder lifts because oil arrives under pressure at a steady rate — but a cylinder cannot pressurise its own oil any more than an engine can fuel itself. Something upstream has to take electrical power from the wall and turn it into a stream of pressurised oil, on demand, for years. That something is the **hydraulic power unit**.

So the decision this lesson settles, before you can choose a pump or a motor, is one question answered exactly: **how much flow, at how much pressure, does this platform actually demand — and how much electrical power will it take to supply it?** Get the demand right and every later choice follows from it; guess it and you either starve the platform or pay for a unit twice the size it needs. This lesson reads the demand straight from the work you have already done, and lays out the four parts that will meet it.

## 2. Physical Intuition

Think of the power unit as the platform's heart and circulation. The **electric motor** is the muscle that never tires; it spins the **pump**, which is the heart — it pushes oil out into the lines at a rate set by how fast it turns. The **relief valve** is a pressure-safety valve, standing ready to dump flow if the pressure ever climbs too high, so nothing bursts. And the **reservoir** is the blood store — a tank that holds the oil, lets it cool, and lets trapped air settle out before the pump draws it back in.

The unit's whole job is a conversion: electrical power in, hydraulic power out. Hydraulic power is the pressure times the flow — the same $p\,Q$ you met with the fluid — and to produce it the unit draws somewhat *more* electrical power, because no pump or motor is perfect and the difference becomes heat. So the demand has two faces: the **fluid power** the cylinder needs, and the **electrical power** the unit pulls from the wall to make it. You size the parts against the first and pay the bill on the second.

## 3. The Idea You Now Need

The fluid power the platform demands is the working pressure times the flow rate:

$$ P_\text{hyd} = p\,Q = (100\times10^5\ \text{Pa})\left(\frac{10}{60\,000}\ \text{m}^3/\text{s}\right) \approx 1.67\ \text{kW} $$

That is the useful power delivered to the load side. But the motor must draw more than that, because the pump and the motor each lose a little to friction, leakage, and heat. If the pump is about 90 % efficient and the motor about 90 %, the overall efficiency is their product, and the electrical power is the fluid power divided by it:

$$ P_\text{elec} = \frac{P_\text{hyd}}{\eta_\text{pump}\,\eta_\text{motor}} = \frac{1.67}{0.90\times0.90} \approx 2.06\ \text{kW} $$

So the platform demands **10 L/min at 100 bar** — about **1.67 kW of fluid power**, drawn as roughly **2 kW of electrical power**. Those three numbers — flow, pressure, and power — are the specification the whole power unit is built to meet, and each of the four parts is sized against them in the lessons that follow.

## 4. Visual Explanation

<figure markdown>
  ![A block diagram of the hydraulic power unit as an energy path. On the left, about 2 kilowatts of electrical power from the wall enters the electric motor; the motor spins the pump, which converts it to about 1.67 kilowatts of hydraulic power — 10 litres per minute at 100 bar — flowing out to the cylinder. A relief valve branches off the pressure line as a safety limit, and a reservoir below holds the oil, feeding the pump's suction and receiving the return. The small loss between 2 kilowatts in and 1.67 kilowatts out is shown as heat. The four parts — motor, pump, relief valve, reservoir — are each labelled with the lesson that sizes them.](assets/m05-l1-power-unit.svg){ width="760" }
</figure>

Follow the energy left to right: about **2 kW** of electrical power enters the **motor**, which spins the **pump**, which delivers about **1.67 kW** of hydraulic power — 10 L/min at 100 bar — out to the cylinder. The gap between them is lost as heat, the price of the conversion. The **relief valve** sits on the pressure line as a safety cap, and the **reservoir** underneath holds the oil, feeds the pump's suction, and takes the return. Four parts, one demand: the rest of Module 05 sizes each part against the flow, pressure, and power fixed here.

## 5. Engineering Example

A home's water supply is the same idea in reverse scale. You do not think about the pump at the utility, the pressure in the main, or the flow your taps can draw — until you open two showers and a dishwasher at once and the pressure sags. The utility sized its pumps against the *demand* of all the homes: peak flow, at a guaranteed pressure. A hydraulic power unit is your platform's private utility, sized against exactly one machine's demand. Read the demand wrong and you get the sagging-shower problem — the cylinder starved mid-lift — or an oversized, wasteful unit humming away far below its capacity.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the platform's demand, carried from Module 04:

- Working pressure $p = 100\ \text{bar}$, flow $Q = 10\ \text{L/min}$
- Assume pump efficiency $\eta_\text{pump} \approx 0.90$, motor efficiency $\eta_\text{motor} \approx 0.90$

**Find** — the hydraulic power the unit must deliver, and the electrical power it will draw.

**Assumptions**

- Steady operation at the working point.
- Efficiencies are representative nominal values (refined when the real parts are chosen).

**Solution**

$$ Q = \frac{10}{60\,000} = 1.667\times10^{-4}\ \text{m}^3/\text{s} $$

$$ P_\text{hyd} = p\,Q = (100\times10^5)(1.667\times10^{-4}) = 1\,667\ \text{W} \approx 1.67\ \text{kW} $$

$$ P_\text{elec} = \frac{P_\text{hyd}}{\eta_\text{pump}\,\eta_\text{motor}} = \frac{1667}{0.81} \approx 2\,058\ \text{W} \approx 2.06\ \text{kW} $$

**Result**

$$ \boxed{\text{demand: }10\ \text{L/min at }100\ \text{bar} = 1.67\ \text{kW hydraulic},\ \approx 2\ \text{kW electrical}} $$

**Engineering Interpretation** — The platform's appetite is modest in flow but firm in pressure: 10 L/min is a trickle, but at 100 bar it carries 1.67 kW to the load, and the wall must supply about 2 kW to make it, the extra ~0.4 kW leaving as heat the reservoir has to shed. This low-flow, high-pressure signature is exactly what will point you to a particular *kind* of pump in Lesson 02. Everything downstream — pump displacement, motor rating, relief setting, tank size — is now anchored to these three numbers. The demand drives the design, not a catalogue.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson01_power_demand.html" title="The power-unit demand — flow, pressure, power" style="width:100%;height:840px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson01_power_demand.html)

Set the flow and pressure and watch the hydraulic power the unit must deliver, and the electrical power it draws once efficiency is included. Find the platform's operating point — 10 L/min and 100 bar — and confirm 1.67 kW of fluid power for about 2 kW at the wall. See how raising pressure or flow raises both, and how a less efficient unit widens the gap between them.

## 8. Coding Exercise

```python
def power_unit_demand(Q_Lmin, p_bar, eta_pump=0.90, eta_motor=0.90):
    Q = Q_Lmin / 60000            # L/min -> m^3/s
    p = p_bar * 1e5               # bar -> Pa
    P_hyd  = p * Q                # hydraulic (fluid) power, W
    P_elec = P_hyd / (eta_pump * eta_motor)
    return P_hyd/1000, P_elec/1000

hyd, elec = power_unit_demand(10, 100)
print(round(hyd, 2), "kW hydraulic;", round(elec, 2), "kW electrical")   # 1.67 ; 2.06
```

**Your task:** confirm 1.67 kW hydraulic and ~2 kW electrical at the operating point. Then: if the whole unit were only 70 % efficient instead of 81 %, how much more electrical power would the same demand draw — and where does that extra power go?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson01_quiz.html" title="What the power unit must supply — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson01_quiz.html)

1. What three numbers make up the platform's demand on its power unit?
2. What are the four parts of a hydraulic power unit, and what does each do?
3. Why is the electrical power drawn larger than the hydraulic power delivered?
4. The platform needs only 10 L/min but at 100 bar. Why does that combination matter for the design?
5. Where does the difference between electrical power in and hydraulic power out actually go?

## 10. Challenge Problem

A colleague proposes buying a 5 kW power unit "to be safe," reasoning that more power never hurts. Explain what the platform actually demands, why a 5 kW unit is the wrong choice even though it would certainly move the load, and what specific penalties — cost, heat, efficiency, size — an oversized unit brings. What size would you specify instead, and against which three numbers?

## 11. Common Mistakes

- **Sizing on flow alone.** 10 L/min sounds tiny, but at 100 bar it is 1.67 kW. Flow without pressure — or pressure without flow — tells you nothing about the power; you need both.
- **Forgetting the efficiency gap.** The motor draws more than the fluid power delivered. Size the electrical supply to the ~2 kW drawn, not the 1.67 kW delivered.
- **Confusing the four parts' jobs.** The pump makes flow, the motor drives the pump, the relief caps pressure, the reservoir stores and conditions the oil. Each is sized against a different aspect of the same demand.
- **Reaching for a catalogue first.** Picking a pump that "looks about right" before computing the demand is backwards. The three demand numbers come first; the parts are selected against them.

## 12. Key Takeaways

**The decision you can now make:** state the flow, pressure, and power the platform demands of its power unit, and name the four parts that will supply it.

- The platform demands **10 L/min at 100 bar** — about **1.67 kW of hydraulic power**.
- Losses in the pump and motor mean the unit draws more: **≈ 2 kW of electrical power**, the difference lost as heat.
- The power unit has **four parts**: the **pump** (makes flow), the **motor** (drives the pump), the **relief valve** (caps pressure), and the **reservoir** (holds and conditions the oil).
- The demand — three numbers — **drives every later choice**; the parts are sized against it, not picked from a catalogue.
- The demand is fixed. **The next lesson sizes the first part — the pump** — to deliver 10 L/min at the speed the motor turns.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the energy path

```
Trace the energy path through a hydraulic power unit: electrical power into the motor, mechanical power on the pump shaft, and hydraulic power (pressure times flow) out to the actuator. For a unit delivering 1.67 kW of fluid power at about 81% overall efficiency, explain where the electrical input goes and why the difference becomes heat the reservoir must shed.
```

**Challenge** — flow vs pressure

```
Explain why a hydraulic demand of 10 L/min at 100 bar (about 1.67 kW) is a very different design problem from, say, 100 L/min at 10 bar (also about 1.67 kW), even though the power is the same. How does the flow-versus-pressure split influence the choice of pump, motor, and reservoir?
```

**Explore** — the four parts

```
Describe the four core components of a hydraulic power unit — electric motor, pump, relief valve, and reservoir — and how each is sized: the pump against required flow, the motor against power, the relief against safe pressure, and the reservoir against flow, cooling, and de-aeration. How do they work together as a system?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 05 Lesson 01 — What the power unit must supply.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The demand is fixed — 10 L/min at 100 bar, 1.67 kW of fluid power, about 2 kW at the wall — and the four parts are named. Next: Lesson 02 — The pump, sized to deliver that flow at the speed the motor turns.*
