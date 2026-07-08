!!! abstract "You are here"
    **Module 05 — Power Units**  ·  **Unit 1 — The Power Unit**  ·  **Lesson 05 — The reservoir and the complete unit**

# Lesson 05 — The reservoir and the complete unit

> **Module 05 · Lesson 05** · *Where the oil lives — and the finished power unit.*
> Lessons 01–04 built the active parts: a pump, a motor, a relief valve. All of them draw from and return to one place — the reservoir — which holds the oil, lets it breathe, lets it settle, and sheds its heat. This lesson sizes that tank against the ~1.9 kW of hold heat from Lesson 04, then assembles the complete power unit and closes Module 05.
>
> **Learning outcome:** Size the reservoir for volume, de-aeration, and cooling; decide when the hold heat forces an added cooler; and name every part of the finished power unit that supplies the platform.

---

## 1. Why This Matters

Every component so far moves oil *through* itself; the reservoir is the one place the oil simply *is*. It is not a passive bucket. It holds enough oil that the pump never runs dry even as the cylinder's rod swallows and returns volume; it gives returning oil time to let its air bubbles rise out before that oil is drawn back into the pump; it lets dirt and water settle to the bottom instead of recirculating; and its walls are the main way the whole unit sheds the heat the relief valve makes. Undersize it and the oil foams, the pump cavitates, contamination recirculates, and the temperature climbs until the oil degrades.

So the decision this lesson settles is: **how large must the reservoir be to hold, de-aerate, settle, and cool the oil — and does the ~1.9 kW of hold heat force an added cooler?** Answer that and the last component is specified. Then the module's real deliverable is in hand: a complete power unit — pump, motor, relief, reservoir, plus the filter and oil from earlier modules — that turns wall electricity into exactly the pressurised, clean, cool oil the cylinder needs.

## 2. Physical Intuition

Give returning oil a big, calm pool to sit in and good things happen on their own. Bubbles, being lighter than oil, float up and break at the surface — so a few minutes of dwell time de-aerates the oil, protecting the stiffness you fought for in Module 03. Heavy dirt and water sink to the bottom, away from the suction. And a large surface of oil-warmed metal, sitting in room air, radiates and convects heat away. A **baffle** plate between the return and the suction forces the oil to take the long way across the tank, maximising all three effects — dwell, settling, and cooling — before it is drawn back into the pump.

Two limits set the size. The **volume** must be several times the pump's per-minute flow, so the oil dwells long enough to de-aerate and settle — the classic rule is three to five times, giving a few minutes of residence. The **surface area** must be enough to shed the heat, and here is the catch from Lesson 04: a tank sized by the volume rule can passively lose the modest heat of *working*, but nowhere near the ~1.9 kW dumped while *holding*. If the platform holds for long stretches, the tank alone cannot keep up and an oil cooler must be added — a fan-blown radiator or a water heat exchanger — to carry away what the walls cannot.

## 3. The Idea You Now Need

Size the volume by the residence-time rule — three to five times the pump flow:

$$ V = (3\text{–}5)\,Q = (3\text{–}5)\times 10 \approx 40\ \text{L}, \qquad \text{dwell} = \frac{V}{Q} = \frac{40}{10} = 4\ \text{min} $$

Four minutes of dwell is ample for bubbles to rise and dirt to settle. For the heat, the tank sheds roughly by natural convection and radiation from its surface:

$$ P_\text{diss} = h\,A\,\Delta T $$

with $h \approx 15\ \text{W/m}^2\text{K}$. A ~40 L tank has about $0.7\ \text{m}^2$ of surface, so at a 40 °C rise above ambient it sheds ~0.45 kW — comfortably more than the 0.39 kW lost at the working point, but far short of the **1.9 kW** of hold heat. Passively shedding 1.9 kW would need an impossible ~170 °C rise, so **sustained holding demands an added oil cooler**; brief, occasional holds the tank can ride out on its thermal mass.

## 4. Visual Explanation

<figure markdown>
  ![On the left, a reservoir cutaway: an oil-filled tank with a filler-breather on top, a return line entering through a diffuser on one side, a baffle plate across the middle, and the pump suction leaving low on the other side, so returning oil takes the long path — air bubbles rise to the surface, dirt settles to the bottom, and heat radiates from the walls. Labels note 40 litres, about 4 minutes dwell, and roughly 0.45 kilowatts shed passively at a 40 degree rise, with a cooler added if holding is sustained. On the right, the complete power unit as an assembled stack: the 40 litre reservoir at the base, a 2.2 kilowatt motor driving a 7.5 cubic-centimetre-per-rev pump above it, the 115 bar relief valve, the return filter holding ISO 18/16/13 cleanliness, and ISO VG 46 oil — together turning wall electricity into clean, cool, pressurised oil for the cylinder.](assets/m05-l5-reservoir.svg){ width="760" }
</figure>

On the left, the reservoir doing its four jobs: returning oil enters through a diffuser, is forced the long way by the **baffle**, and gives up its air (bubbles rise), its dirt (settles low), and its heat (through the walls) before the **suction** draws it back — the tank sized to **40 L** for a **4-minute** dwell, shedding **~0.45 kW** passively (enough for working, not for sustained holding). On the right, the **complete power unit**: the reservoir, the 2.2 kW motor and 7.5 cm³/rev pump, the 115 bar relief, the return filter holding ISO 18/16/13, and ISO VG 46 oil — every decision from Modules 03–05 assembled into the box that feeds the platform.

## 5. Engineering Example

A car shows the whole power unit in miniature. The oil sump is the reservoir — sized to hold enough oil, let it drain back and de-aerate between the pump's passes, and cool through its finned surface. The oil pump is the pump; the pressure-relief valve caps the gallery pressure; and when the engine works hard enough that the sump alone cannot cope, a separate **oil cooler** is plumbed in — exactly the decision this lesson reaches for a hold-heavy platform. Engineers did not invent the hydraulic power unit from nothing; they reused the same four jobs — pump, pressure limit, reservoir, cooling — that every fluid machine needs, and that you have now specified from first principles.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the supply and its heat, from earlier lessons:

- Pump flow $Q = 10\ \text{L/min}$; working-point loss 0.39 kW; hold heat ~1.9 kW
- Tank dissipation coefficient $h \approx 15\ \text{W/m}^2\text{K}$; a 40 L tank has $A \approx 0.7\ \text{m}^2$

**Find** — the reservoir volume and dwell, the heat it sheds, and whether a cooler is needed.

**Assumptions**

- Volume rule 3–5× flow; passive dissipation at a 40 °C rise above ambient.

**Solution**

$$ V = 4Q = 40\ \text{L}, \qquad \text{dwell} = \frac{40}{10} = 4\ \text{min} $$

$$ P_\text{diss} = h\,A\,\Delta T = 15 \times 0.7 \times 40 \approx 420\ \text{W} \approx 0.45\ \text{kW} $$

Compare: 0.45 kW shed vs 0.39 kW working loss (fine) vs **1.9 kW hold heat** (not fine).

**Result**

$$ \boxed{V \approx 40\ \text{L},\ 4\ \text{min dwell};\ \text{sheds}\ \sim0.45\ \text{kW};\ \text{add a cooler for sustained holds}} $$

**Engineering Interpretation** — A 40 L reservoir gives the oil a four-minute dwell — plenty of time for air to rise out (protecting the 1.8 GPa stiffness of Module 03) and dirt to settle (helping hold ISO 18/16/13). Its surface passively sheds about 0.45 kW, which covers the heat made while the platform is *working*. But it cannot touch the ~1.9 kW made while *holding* — so if the platform's duty includes long holds, an oil cooler is not optional. With the reservoir specified, the power unit is complete: a 2.2 kW motor turning a 7.5 cm³/rev pump, a 115 bar relief, a 40 L reservoir (with a cooler if the duty needs it), the return filter holding ISO 18/16/13, and ISO VG 46 oil — the whole box that makes the platform's 10 L/min at 100 bar.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson05_reservoir.html" title="Sizing the reservoir — volume, dwell, and cooling" style="width:100%;height:860px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

Set the reservoir volume and see the dwell time it buys and the heat its surface can shed, against the two heat loads — working (0.39 kW) and holding (1.9 kW). Find ~40 L: a comfortable 4-minute dwell that passively handles the working heat, but watch the hold heat stay stubbornly above the line — the demo shows exactly when an added cooler becomes unavoidable.

## 8. Coding Exercise

```python
def reservoir(Q_Lmin=10, mult=4, h=16, dT=40):
    V = mult * Q_Lmin                      # litres
    dwell = V / Q_Lmin                     # minutes
    A = 0.06 * V**(2/3)                    # ~surface area, m^2 (cubic tank, 6 faces)
    P_diss = h * A * dT / 1000             # kW shed
    return V, dwell, round(P_diss, 2)

V, dwell, P = reservoir()
print(f"{V} L, {dwell} min dwell, sheds ~{P} kW")   # ~0.45 kW
print("working 0.39 kW ->", "OK" if P >= 0.39 else "cooler")
print("hold 1.9 kW ->", "OK" if P >= 1.9 else "needs a cooler")
```

**Your task:** confirm ~40 L gives ~4 min dwell and sheds enough for the working heat but not the hold heat. Then: how large would a passive tank have to be to shed the full 1.9 kW at a 40 °C rise — and why is adding a cooler far more sensible than that?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson05_quiz.html" title="The reservoir and complete unit — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

1. Name the reservoir's four jobs beyond simply holding oil.
2. What does the volume rule (3–5× flow) actually buy you?
3. What is a baffle for?
4. A 40 L tank sheds ~0.45 kW passively. Why is that fine for working but not for holding?
5. What are the parts of the complete power unit you have now specified?

## 10. Challenge Problem

A platform identical to this one is redeployed on a job where it holds a load steady for 50 minutes of every hour, moving only briefly. Explain why the 40 L reservoir is now badly undersized *thermally* even though its volume is fine, estimate the cooling shortfall, and specify what you would add and how you would size it. Then reflect: how would switching to a pressure-compensated variable pump (from Lesson 02) change this entire problem?

## 11. Common Mistakes

- **Treating the reservoir as just a bucket.** It de-aerates, settles, and cools — undersize it and you lose oil stiffness, cleanliness, and temperature control at once.
- **Sizing only by volume and forgetting heat.** The 3–5× rule gives dwell, not cooling. A tank can have ample volume and still overheat on a hold-heavy duty.
- **Assuming the tank can shed any heat load.** Passive dissipation is modest (~0.45 kW here); the 1.9 kW hold heat needs an active cooler. Know which regime your duty is in.
- **Omitting the breather or baffle.** No breather and the tank cannot accommodate the rod's volume changes without pulling a vacuum; no baffle and return oil short-circuits straight to the suction, carrying its air and dirt with it.

## 12. Key Takeaways

**The decision you can now make:** size the reservoir for volume, de-aeration, and cooling, add a cooler when the hold heat demands it, and name the complete power unit.

- The reservoir does four jobs: **hold** the oil, **de-aerate** it, **settle** dirt, and **cool** it.
- Size the volume by **3–5× flow → ~40 L**, giving a **4-minute dwell** to de-aerate and settle.
- Its surface sheds **~0.45 kW** passively — enough for the 0.39 kW working loss, but **not** the ~1.9 kW hold heat, so **sustained holding needs an added cooler**.
- **The complete power unit** is now specified: 2.2 kW motor, 7.5 cm³/rev pump, 115 bar relief, ~40 L reservoir (± cooler), the M02 filter holding ISO 18/16/13, and M03's ISO VG 46 oil.
- **Module 05 is complete** — the platform has a supply that makes clean, cool, pressurised oil. **Module 06 adds the valves** that direct it to raise, lower, and hold.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the reservoir's jobs

```
Explain the four functions of a hydraulic reservoir beyond storing oil: de-aeration (letting entrained air rise out), settling of contaminants and water, heat dissipation through the walls, and accommodating volume changes. Why is the tank sized at 3-5 times the pump flow, and what does the resulting dwell time (e.g. 4 minutes for 40 L at 10 L/min) achieve?
```

**Challenge** — when the tank can't cool

```
A hydraulic power unit's reservoir sheds about 0.45 kW passively, but a fixed pump dumps ~1.9 kW over the relief valve whenever the actuator holds. Explain why the reservoir cannot passively shed the hold heat, estimate the impossible tank size that would be required, and describe how an oil cooler (air-blast or water heat exchanger) is added and sized instead.
```

**Explore** — the complete power unit

```
Walk through a complete hydraulic power unit and how its parts fit together: reservoir, electric motor, pump, relief valve, return filter, and oil. Using the platform's numbers (2.2 kW motor, 7.5 cc/rev pump, 115 bar relief, 40 L reservoir, ISO 18/16/13 cleanliness, ISO VG 46 oil), explain how wall electricity becomes clean, cool, pressurised oil at 10 L/min and 100 bar.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 05 Lesson 05 — The reservoir and the complete unit.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*Module 05 is complete — the platform has a full power unit: a 2.2 kW motor and 7.5 cm³/rev pump making 10 L/min, a 115 bar relief, a ~40 L reservoir, all running clean ISO VG 46 oil. Next: Module 06 — Valves & Control, where the valves that direct this flow to raise, lower, and hold the platform are chosen.*
