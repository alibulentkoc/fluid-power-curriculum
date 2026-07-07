!!! abstract "You are here"
    **Module 08 — Electrohydraulic Control**  ·  **Unit 2 — Sensing the Platform**  ·  **Lesson 04 — Sensing pressure and load**

# Lesson 04 — Sensing pressure and load

> **Module 08 · Lesson 04** · *Feeling how hard the platform is working.*
> Position tells you *where* the platform is; pressure tells you *how hard it is pushing*. This lesson adds pressure transducers, turns the reading into force, and shows what the load and faults look like in pressure.
>
> **Learning outcome:** Specify pressure sensing for the platform — choose where to tap, set the transducer range against the relief and shock limits, convert pressure to load, and read the pressure signatures of normal and fault conditions.

---

## 1. Why This Matters

A position sensor tells the platform where it is, but not how hard it is working or whether anything is wrong. Two tonnes and ten tonnes look identical to a position sensor right up until the moment the overloaded machine fails. Pressure is the missing sense: because force is pressure times area, a pressure reading at the cylinder is a direct, electrical measurement of the load the platform is carrying — a scale built into the hydraulics. And because every fault has a pressure signature — a burst hose collapses the pressure, an overload pins it at the relief, a healthy hold sits steady — pressure sensing is also how the machine watches its own safety.

So the decision this lesson makes is: **what pressure sensing does the platform need — where to tap, what range, and what it reveals?** Tap the cap line and you weigh the load directly: 100 bar across the 1963.5 mm² cap is the ~2-tonne load, read as a number. The transducer's range has to clear not just the 115 bar relief but the ~143 bar shock a hard stop can produce, so a 250 bar full-scale unit is the sensible choice — enough headroom to actually *see* the spike rather than saturate at it. And with that one measurement the platform gains a load reading, an overload alarm, and a fault detector, all from a sensor the size of a thumb.

## 2. Physical Intuition

Picture a pressure transducer screwed into the cap line — a little sensor whose electrical output rises and falls with the oil pressure behind the piston. That pressure is not arbitrary: it is exactly what it takes to hold the load, and force is pressure times piston area. So the transducer is really a load cell in disguise. Lift a two-tonne load and it reads ~100 bar; hang half that and it reads ~50 bar; the reading tracks the weight in real time. Put one on the cap line and the platform can tell you what it is carrying without any separate scale — the hydraulics were measuring the force all along, and the transducer just reads it out.

The same reading is a safety sentinel. A healthy hold shows a steady pressure at the load value. Push past the rated load and the pressure climbs until it hits the relief and pins there — an unmistakable overload signature. Burst the cap hose and the pressure collapses toward zero as the oil escapes. Stall against an obstruction and it jumps to the relief and stays. Each condition writes itself in pressure, so a controller watching the transducer can raise an alarm, refuse to lift, or trip a stop long before a human would notice. Where the position sensor answers "where is it?", the pressure sensor answers "how hard is it pushing, and is that healthy?" — the two questions that together describe the platform's whole state.

## 3. The Idea You Now Need

A pressure reading at the cap converts straight to load through the piston area:

$$ F = p_\text{cap}\,A_\text{cap}, \qquad F = 100\ \text{bar} \times 1963.5\ \text{mm}^2 = 19.6\ \text{kN} \approx 2000\ \text{kg} $$

The transducer's **full-scale range** must clear the highest pressure the circuit can produce — not the working 100 bar, nor even the 115 bar relief, but the shock spike a hard stop can throw:

$$ p_\text{FS} > p_\text{spike} \approx 143\ \text{bar} \;\Rightarrow\; \text{choose } p_\text{FS} \approx 250\ \text{bar} $$

so the sensor has headroom to *record* the spike instead of clipping. Its **accuracy** sets how precisely you can weigh: a typical 0.5% full-scale transducer on 250 bar is ±1.25 bar, which is

$$ \Delta F = \Delta p\,A_\text{cap} = 1.25\ \text{bar}\times1963.5\ \text{mm}^2 \approx 245\ \text{N} \approx 25\ \text{kg} $$

— the platform weighs its load to about ±25 kg. Tap the **cap line** for load and overload, the **rod line** for descent and counterbalance-pilot pressure, and the **P line** for supply pressure and relief health. Range 250 bar, accuracy ~0.5% FS, tapped at the cap — that is the load-sensing spec.

## 4. Visual Explanation

<figure markdown>
  ![The platform circuit with pressure transducers tapped at three points and a load gauge. A transducer on the cap line reads the load-holding pressure; one on the rod line reads descent and counterbalance-pilot pressure; one on the pressure line reads supply pressure and relief health. A conversion arrow shows cap pressure times cap area equals force: 100 bar across 1963.5 mm squared is 19.6 kN, about 2000 kg. A gauge on the right runs from 0 to 250 bar full scale with zones marked: a normal band around 100 bar, a caution band approaching the 115 bar relief, the relief line at 115 bar, and the 143 bar shock-spike point still on-scale because the range has headroom.](assets/m08-l4-pressure.svg){ width="720" }
</figure>

Read the three taps, then the gauge. The **cap-line** transducer is the important one — its pressure times the cap area *is* the load, so the arrow turns 100 bar into ~2 tonnes directly. The **rod** and **P** taps add context: descent pressure and supply health. The **gauge** shows why the range is 250 bar and not 150: the normal load sits near 100 bar, the relief at 115, but a hard stop can spike to ~143 bar, and only a sensor with headroom past that can record the spike instead of saturating. Normal, caution, relief, spike — all visible on one scale. The platform can now feel its load and watch its own limits.

## 5. Engineering Example

Pressure transducers are everywhere a hydraulic machine needs to know its own effort: presses that must hit a force target, cranes and lifts with load-moment protection that refuses to lift beyond a safe limit, injection machines controlling clamp tonnage, and test rigs measuring what they apply. In load-holding equipment the cap-side transducer doubles as the overload guard — the control system reads it continuously and simply will not command a lift if the pressure implies too much weight, a far faster and cheaper safeguard than a mechanical scale. The choice of range and accuracy is exactly the trade this lesson frames: too small a range and the sensor saturates on a spike and misses the very event you most want to catch; too coarse an accuracy and the load reading is too vague to act on. Engineers size the transducer to the worst-case pressure and the needed load precision, then tap it where the quantity of interest actually lives — at the cap for load, on the supply for system health.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — cap area 1963.5 mm²; relief 115 bar; worst shock spike ~143 bar; a 250 bar, 0.5%-FS transducer on the cap line.

**Find** — the load at 100 bar, whether the range is adequate, and the load resolution.

**Assumptions**

- Cap pressure equals the load-holding pressure; accuracy is 0.5% of full scale.

**Solution**

$$ F = 100\ \text{bar}\times1963.5\ \text{mm}^2 = 19.6\ \text{kN} \approx 2000\ \text{kg} $$
$$ p_\text{FS}=250\ \text{bar} > 143\ \text{bar spike} \;\checkmark \quad(\text{headroom to record the spike}) $$
$$ \Delta F = (0.005\times250\ \text{bar})\times1963.5\ \text{mm}^2 = 1.25\ \text{bar}\times A = 245\ \text{N} \approx 25\ \text{kg} $$

**Result**

$$ \boxed{\text{Reads } \approx 2000\text{ kg}; \text{ range clears the spike; weighs to } \pm 25\text{ kg}} $$

**Engineering Interpretation** — One small sensor delivers three capabilities. It **weighs the load** — 100 bar reads as ~2 tonnes — turning the cylinder into a scale accurate to ±25 kg, which is fine for an overload check even if not for trade weighing. It gives the range **headroom**: a 250 bar full scale sits well above the 143 bar spike, so a hard stop is recorded, not clipped — important, because a saturated sensor hides the exact fault you want to diagnose. And it provides a **safety signal**: the control system can compare the reading to a threshold below the relief and refuse an overload before the relief ever trips. If you wanted finer weighing you would pick a 0.25%-FS transducer (~±13 kg) or a lower range where the working pressure allows, trading spike headroom for precision. Note the pattern across this unit: position (Lesson 03) and pressure (this lesson) are the platform's two senses — *where* and *how hard* — and Lesson 05 combines them into the complete driven-and-sensed machine.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson04_pressure.html" title="Sensing pressure and load — pressure to force" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson04_pressure.html)

Change the load on the platform and watch the cap pressure — and the weight the transducer reads — track it, moving through the normal, caution, and overload zones toward the relief. See why the range needs headroom past the relief to catch a spike.

## 8. Coding Exercise

```python
A_cap = 1963.5           # mm^2
def load_kg(p_bar):      return p_bar * 1e5 * A_cap * 1e-6 / 9.81   # bar -> kg
def cap_pressure(kg):    return kg * 9.81 / (A_cap * 1e-6) / 1e5    # kg -> bar

for p in (50, 100, 115):
    print(f"cap {p:3} bar -> {load_kg(p):6.0f} kg")

p_fs, acc, relief, spike = 250, 0.005, 115, 143
dp = p_fs * acc
print("range clears spike:", p_fs > spike, "| load resolution:", round(load_kg(dp)), "kg")
```

**Your task:** confirm 100 bar reads ~2000 kg. Then answer in a comment: if you swapped to a 150 bar full-scale transducer for finer weighing, what would happen to the reading during the 143 bar hard-stop spike, and why is that a problem for fault diagnosis?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson04_quiz.html" title="Sensing pressure and load — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson04_quiz.html)

1. How does a cap-line pressure reading give the load, and what does 100 bar correspond to?
2. Why must the transducer's range clear ~143 bar, not just the 115 bar relief?
3. What load resolution does a 0.5%-FS 250 bar transducer give, and how is it found?
4. What does each tap point — cap, rod, P line — reveal?
5. What pressure signatures distinguish a healthy hold, an overload, and a burst hose?

## 10. Challenge Problem

To weigh the platform's load more precisely, an engineer replaces the 250 bar transducer with a 120 bar full-scale unit, reasoning that the working pressure is only ~100 bar so the smaller range gives better resolution. Weighing does improve — until the day an operator commands a fast stop and the machine logs a fault the engineer cannot diagnose. Explain what happened to the transducer during the event, why the smaller range caused the diagnostic blind spot, and how you would resolve the tension between weighing precision and spike headroom. Relate this to the general principle of sizing a sensor's range to the worst case, not the normal case.

## 11. Common Mistakes

- **Sizing the range to the working pressure.** A 120 bar transducer saturates on a 143 bar spike and hides the fault; size to the worst case, ~250 bar.
- **Confusing pressure with force directly.** Force is pressure *times area*; the same pressure means different forces on the cap and rod sides.
- **Tapping the wrong line.** Load lives at the *cap*; tapping only the rod or supply misses the weight.
- **Ignoring accuracy.** A wide-range sensor with poor accuracy weighs too coarsely to act on; match accuracy to the load precision you need.

## 12. Key Takeaways

**The decision you can now make:** specify pressure sensing for the platform — where, what range, what accuracy — and read load and faults from it.

- **Pressure is force per area**, so a cap-line transducer **weighs the load**: 100 bar ≈ 2000 kg.
- **Range must clear the worst case** (~143 bar spike), not the working 100 bar or the 115 bar relief → **250 bar full-scale**.
- **Accuracy sets weighing precision**: 0.5% FS ≈ ±25 kg.
- **Each tap reveals a different thing**: cap = load/overload, rod = descent/pilot, P = supply/relief health.
- **Faults have pressure signatures** — steady hold, pinned-at-relief overload, collapsing burst. **Lesson 05 combines position and pressure** into the complete driven-and-sensed platform.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — pressure as a load cell

```
Explain how a pressure transducer on a hydraulic cylinder's cap line acts as a load cell: force = pressure x piston area, so cap pressure reads the load directly. Use cap area 1963.5 mm^2 to show 100 bar ~ 2000 kg, and discuss choosing the transducer's full-scale range (against a 115 bar relief and a ~143 bar shock spike) and its accuracy (0.5% FS -> load resolution).
```

**Challenge** — range vs precision

```
An engineer swaps a 250 bar pressure transducer for a 120 bar unit to weigh a hydraulic platform's load more precisely (working pressure ~100 bar). Explain what happens during a 143 bar hard-stop spike, why the smaller range creates a diagnostic blind spot, and how to balance weighing precision against spike headroom.
```

**Explore** — fault signatures

```
Describe how different fault conditions on a hydraulic lift platform show up in the cap-line pressure signal: a healthy hold, an overload, a stall against an obstruction, and a burst hose. How can a controller watching the pressure transducer detect each and respond?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 08 Lesson 04 — Sensing pressure and load.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The platform now senses both where it is and how hard it is working. Next: Lesson 05 — The driven-and-sensed platform, combining command and sensing into the complete electrohydraulic interface that closes Module 08.*
