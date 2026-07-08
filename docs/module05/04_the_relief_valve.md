!!! abstract "You are here"
    **Module 05 — Power Units**  ·  **Unit 1 — The Power Unit**  ·  **Lesson 04 — The relief valve**

# Lesson 04 — The relief valve

> **Module 05 · Lesson 04** · *The safety limit on pressure — and the fixed pump's escape route.*
> Lessons 02–03 gave a pump that makes 10 L/min whenever the motor spins, and a motor that spins continuously. But the platform does not always want that flow. When it holds position, the oil has nowhere to go — and pressure would climb until something bursts. The relief valve is what stops that.
>
> **Learning outcome:** Set the relief valve above the working pressure but below the components' limits, explain its two jobs — capping pressure and passing the fixed pump's flow during holds — and quantify the heat that dumping makes.

---

## 1. Why This Matters

A fixed-displacement pump is relentless: every revolution it pushes the same oil, whether the platform needs it or not. While the platform is lifting, that flow goes into the cylinder. But when the platform reaches its height and *holds*, the valve to the cylinder closes and the flow suddenly has nowhere to go. Oil is almost incompressible, so a pump pushing into a closed volume raises the pressure explosively — in a fraction of a second it would exceed the burst rating of a hose, the pump seals, or the cylinder, and something lets go violently.

So the decision this lesson settles is: **at what pressure should a valve open to relieve that trapped flow — high enough that it never interferes with normal work, low enough that it protects every component?** That valve is the relief valve, and its setting is the single most important safety number in the power unit. It also, quietly, becomes the flow path the fixed pump uses every time the platform holds — which turns out to be the unit's biggest source of heat, and the reason Lesson 05's reservoir is sized the way it is.

## 2. Physical Intuition

A relief valve is a spring holding a poppet shut against the pressure line. Below the set pressure, the spring wins and the valve stays closed — all the flow goes to the platform. When pressure rises to the point where it can push the poppet open against the spring, the valve cracks open and lets oil escape to the tank, and it opens just enough to pass whatever flow it must while holding the pressure near the set value. It is the pressure-cooker's weight, the boiler's pop-off valve: a deliberate weak point that vents before anything else can fail.

For this platform it wears two hats. Its **safety** hat is obvious — if the cylinder jams or a valve closes against the pump, the relief caps the pressure and saves the hardware. Its **everyday** hat is subtler: because the pump is fixed-displacement, every time the platform holds position the full 10 L/min has nowhere to go *but* over the relief. All that flow drops from the relief pressure straight to tank, and every bit of that energy becomes heat in the oil. The relief is not just an emergency device; on this machine it is working hard during every hold.

## 3. The Idea You Now Need

The relief opens when the pressure force on its poppet overcomes the spring — so its set pressure is chosen, not calculated, and it must sit in a window:

$$ p_\text{work} < p_\text{relief} < p_\text{limit} $$

Above the working pressure (with a little margin for line losses and transients, so it never opens during normal lifting), and below the pressure rating of the weakest component. A margin of **10–20 % over working** is the norm, so for 100 bar the relief is set around **115 bar**.

The consequence of the fixed pump shows up whenever the platform holds: the entire pump flow crosses the relief, dropping from the set pressure to tank, and that power becomes heat:

$$ P_\text{heat} = p_\text{relief} \times Q = 115\times10^5 \times \frac{10}{60\,000} \approx 1.9\ \text{kW} $$

That is *more* than the 1.67 kW the platform uses when working, and nearly five times the 0.39 kW lost at the working point — so holding, not lifting, is when the unit runs hottest. Lesson 05 sizes the reservoir to shed exactly this.

## 4. Visual Explanation

<figure markdown>
  ![On the left, a relief valve: a spring holding a poppet shut against the pressure line P, with a tank line T; when pressure exceeds the spring's set value the poppet lifts and oil flows to tank. A pressure-versus-flow curve shows the valve shut up to the cracking pressure, then opening to pass full flow while holding the pressure near the 115 bar setting. In the middle, a setting window bar: the 100 bar working pressure at the bottom, the 115 bar relief setting sitting safely above it, and the component pressure limit above that — the relief must lie between. On the right, the hold condition: with the platform holding, the full 10 litres per minute crosses the relief at 115 bar, dumping about 1.9 kilowatts as heat into the oil — more than the platform uses when working.](assets/m05-l4-relief.svg){ width="760" }
</figure>

On the left, the mechanism: a spring holds the poppet shut until pressure lifts it, then oil escapes to tank — the pressure–flow curve stays shut to the cracking point, then opens to pass full flow while pinning the pressure near **115 bar**. In the middle, the setting window: the relief must sit **above** the 100 bar working pressure (so it never opens during a normal lift) and **below** the components' limit (so it protects them) — 115 bar splits the difference. On the right, the everyday reality: during every hold the fixed pump's full 10 L/min crosses the relief and **~1.9 kW becomes heat** — the unit's hottest condition, and the load the reservoir must handle.

## 5. Engineering Example

A domestic hot-water cylinder has a pressure-and-temperature relief valve that most people never see operate — until the day the thermostat sticks and the tank overheats, and that valve dumps scalding water to a drain instead of letting the cylinder explode. It spends years doing nothing, justifying its cost in a single event. The hydraulic relief is the same guardian, but with a second job this one lacks: on a fixed-pump system it also carries the pump's flow every time the machine holds, so it is both the rarely-needed safety valve *and* a hard-working everyday component. Sizing and setting it wrong risks either a burst machine or a platform that quietly cooks its own oil.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the platform's supply and duty:

- Working pressure $p_\text{work} = 100\ \text{bar}$, pump flow $Q = 10\ \text{L/min}$ (fixed displacement)
- Component pressure limits comfortably above 120 bar

**Find** — a sensible relief setting, and the heat dumped when the platform holds.

**Assumptions**

- Relief set at the full-flow (override) pressure; 15 % margin over working.

**Solution**

$$ p_\text{relief} = 1.15 \times 100 = 115\ \text{bar} \quad (\text{between } 100\ \text{bar work and the component limit}) $$

When the platform holds, the whole pump flow crosses the relief:

$$ P_\text{heat} = p_\text{relief}\,Q = 115\times10^5 \times \frac{10}{60\,000} \approx 1\,920\ \text{W} \approx 1.9\ \text{kW} $$

**Result**

$$ \boxed{p_\text{relief} \approx 115\ \text{bar};\quad \text{holding dumps} \approx 1.9\ \text{kW as heat}} $$

**Engineering Interpretation** — 115 bar is the right setting: 15 % above the 100 bar working pressure, so it stays firmly shut through every normal lift (even with line losses and pressure spikes), yet well below the burst ratings of the pump, hoses, and cylinder, so it protects them all. The striking number is the heat: while *holding*, the fixed pump pushes its full 10 L/min over that 115 bar drop, dumping ~1.9 kW straight into the oil — more than the platform uses while working, and about five times the heat made at the working point. This is why a fixed-pump machine that spends time holding runs hot, and it is the number that sizes the reservoir and any cooling in Lesson 05. (It is also the strongest argument for a variable pump — which would simply stop pumping during a hold.)

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson04_relief.html" title="Setting the relief valve" style="width:100%;height:860px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

Slide the relief setting and see whether it lands in the safe window — above the working pressure (or it opens during a lift and starves the platform) and below the component limit (or it fails to protect them). Then watch the heat the fixed pump dumps over it during a hold climb with the setting. Find 115 bar: safely set, ~1.9 kW of hold heat for the reservoir to shed.

## 8. Coding Exercise

```python
def relief_ok(p_relief, p_work=100, p_limit=140):
    return p_work < p_relief < p_limit          # inside the safe window?

def hold_heat_kW(p_relief_bar, Q_Lmin=10):
    return p_relief_bar*1e5 * (Q_Lmin/60000) / 1000

print(relief_ok(115))                 # True
print(round(hold_heat_kW(115), 2))    # ~1.92 kW
print(relief_ok(105), relief_ok(135)) # too-tight vs high-but-ok
```

**Your task:** confirm 115 bar is inside the window and dumps ~1.9 kW when holding. Then: if the platform spends half its time holding, estimate the average heat load over a shift — and explain why that number, not the working power, drives the reservoir size.

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson04_quiz.html" title="The relief valve — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

1. What does a relief valve do, and what would happen without one when the platform holds?
2. Why is the relief set *above* the working pressure rather than at it?
3. Why must it also be set *below* the components' pressure limits?
4. On a fixed-pump system, where does the pump's flow go while the platform is holding?
5. Why does holding, not lifting, make the most heat in this power unit?

## 10. Challenge Problem

Two things can go wrong with the setting. Set the relief at 102 bar and set it at 200 bar, and for each explain what happens: to normal lifting, to the platform's ability to reach full force, to component safety, and to heat. Then, knowing the fixed pump dumps ~1.9 kW every hold, argue whether this platform's duty justifies replacing the relief-and-fixed-pump arrangement with a pressure-compensated variable pump, and what you would need to know about the duty cycle to decide.

## 11. Common Mistakes

- **Setting the relief at the working pressure.** Then it opens during every lift — bleeding flow, starving the platform of force, and wasting energy. It must sit *above* working, with margin.
- **Setting it too high "to be safe."** Above a component's rating it protects nothing; the point is to open *before* the weakest part fails.
- **Forgetting the fixed pump dumps during holds.** The relief is not just an emergency device; on this machine it carries full flow every hold, making ~1.9 kW of heat. Design the reservoir for it.
- **Confusing cracking and full-flow pressure.** A relief opens gradually; the *setting* is the pressure at which it passes full flow, a little above where it first cracks.

## 12. Key Takeaways

**The decision you can now make:** set the relief valve in the safe window, and know the heat the fixed pump makes when the platform holds.

- The relief valve **caps pressure**: without it, a fixed pump pushing into a held (closed) platform would burst something in a fraction of a second.
- Set it in the window $p_\text{work} < p_\text{relief} < p_\text{limit}$ — **~115 bar**, 15 % over the 100 bar working pressure.
- On a **fixed-pump** system it is also the flow path during holds: the full 10 L/min crosses it, dumping $P = p_\text{relief}\,Q \approx \mathbf{1.9\ kW}$ as heat.
- That is **more than the working power and ~5× the working-point loss** — so holding, not lifting, is when the unit runs hottest.
- The power unit is now safe and its worst-case heat is known. **Lesson 05 sizes the reservoir** to hold, cool, and de-aerate the oil against exactly this load.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — how a relief valve works

```
Explain how a direct-acting hydraulic relief valve works: the spring-loaded poppet, the set (cracking) pressure, and the full-flow override pressure. Why is it set above the working pressure but below component limits, and what is a sensible margin (e.g. 10-20%) for a 100 bar system?
```

**Challenge** — the heat of holding

```
On a fixed-displacement hydraulic power unit, explain why the pump's full flow crosses the relief valve whenever the actuator is holding position, and why this dumps P = p_relief * Q as heat. For 115 bar and 10 L/min, compute that heat, compare it to the working power, and explain why it drives reservoir and cooling sizing.
```

**Explore** — fixed pump plus relief vs variable pump

```
Compare a fixed-displacement pump with a relief valve against a pressure-compensated variable-displacement pump for a hydraulic system that spends significant time holding pressure. Explain the energy and heat difference, the cost difference, and what duty cycle justifies each choice.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 05 Lesson 04 — The relief valve.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The power unit is now protected — a relief valve set at 115 bar caps the pressure and carries the fixed pump's flow during holds, at the cost of ~1.9 kW of heat. Next: Lesson 05 — The reservoir and the complete unit, sized to hold, cool, and de-aerate the oil against that heat, and the module's finished power unit.*
