!!! abstract "You are here"
    **Module 03 — Fluid Fundamentals**  ·  **Unit 1 — The Fluid**  ·  **Lesson 04 — Fluid cleanliness**

# Lesson 04 — Fluid cleanliness

> **Module 03 · Lesson 04** · *Keeping the fluid fit for the job.*
> You have specified the fluid completely: mineral hydraulic oil, ISO VG 46, stiff at 1.8 GPa with the air kept out. One thing can quietly undo all of it — dirt. This lesson sets how clean the oil must be kept, and closes Module 03.
>
> **Learning outcome:** Set the platform's cleanliness target as an ISO 4406 code, read a cleanliness reading against it, and explain how the filter holds the oil to that target.

---

## 1. Why This Matters

Every property you chose in this module assumes clean oil. The right viscosity seals only if the sealing surfaces are not scored; the 1.8 GPa stiffness holds only if the pump and valves have not worn loose. Yet the oil runs endlessly past pump vanes, valve spools, and the cylinder seal — components whose working clearances are just a few **micrometres** wide. A speck of grit larger than that clearance does not pass politely; it jams, scratches, and tears, and every scratch becomes a leak path that bleeds away pressure and precision. Contamination is, by a wide margin, the leading cause of hydraulic failure.

So the decision this lesson settles is: **how clean must the oil be kept, and how do you say so precisely?** "Clean enough" is not a specification a supplier or a filter can meet. Engineers state cleanliness as a number — an ISO code — and hold the system to it. This lesson gives the platform its cleanliness target and shows how the filter you already put in the circuit keeps it there.

## 2. Physical Intuition

Picture the inside of the directional valve: a polished spool sliding in a bore, separated by an oil film only a few micrometres thick. Now picture a grain of fine dust — 15 micrometres across, far too small to see — carried into that gap. It is wider than the gap. It wedges, scores the spool as it drags, and either sticks the valve or leaves a groove that leaks forever after. The same story plays out at every tight clearance in the system. The particles that matter most are the ones near or above the clearance size; smaller ones mostly pass, larger ones are caught by the filter, and the ones in between do the damage.

That is why cleanliness is not about how the oil *looks*. Oil that looks perfectly clear can carry tens of thousands of these invisible particles per millilitre. You cannot judge it by eye; you have to **count** it — by particle size — and keep the counts below a stated limit. Keeping the oil clean is not tidiness; it is what protects every other property you specified, over the whole life of the platform.

## 3. The Idea You Now Need

Cleanliness is measured by the **ISO 4406** code — three numbers that report how many particles per millilitre exceed three sizes: **≥4 µm**, **≥6 µm**, and **≥14 µm**. Each number is a *code*, and each step up the code scale roughly **doubles** the particle count it allows, so a small code difference is a big cleanliness difference. Higher numbers mean dirtier oil.

The platform's target is:

$$ \text{ISO } 18/16/13 $$

which, read out, is a hard ceiling on the counts:

$$ \le 2500 \;(\ge 4\,\mu\text{m}), \qquad \le 640 \;(\ge 6\,\mu\text{m}), \qquad \le 80 \;(\ge 14\,\mu\text{m}) \quad \text{particles/mL} $$

The last number is the one to watch: the **≥14 µm** count, because those are the particles big enough to bridge the valve and pump clearances. Meeting ISO 18/16/13 is exactly what the platform's proportional valve needs to move smoothly and hold the load — and it is the job of the return-line filter to keep the oil there.

## 4. Visual Explanation

<figure markdown>
  ![A fluid sample shown as a field of dots of three sizes, sorted into three columns for particles greater than 4, 6, and 14 micrometres, each column labelled with its ISO 4406 code and count ceiling: code 18 up to 2500 per millilitre at 4 micrometres, code 16 up to 640 at 6 micrometres, and code 13 up to 80 at 14 micrometres. To the right, a close-up of a valve spool in its bore shows a 14-micrometre particle wedged in the few-micrometre clearance, scoring the spool — illustrating why the largest-size count is the critical one.](assets/m03-l4-cleanliness.svg){ width="760" }
</figure>

The three columns are the three counts behind the code ISO 18/16/13: many small particles are tolerated (up to 2500/mL at ≥4 µm), far fewer large ones (only 80/mL at ≥14 µm). The close-up on the right shows why the large-particle limit is so tight: a 14 µm particle is wider than the valve's working clearance, so it wedges and scores instead of passing. Keep the ≥14 µm count under 80 per millilitre and those clearance-bridging particles are rare; let it climb and the valve starts to stick and wear.

## 5. Engineering Example

A wristwatch and a hydraulic valve fail the same way. A mechanical watch keeps time because its jewelled bearings turn on clearances measured in microns; let one grain of dust in and it drags, loses time, and eventually stops. Watchmakers work in filtered air and sealed cases for exactly that reason. Your platform's proportional valve is a watch that carries two tonnes: the same micron clearances, the same intolerance of grit — except the "sealed case" is a filter in the return line and a cleanliness code on the spec sheet. Clean oil is not a luxury here; it is the only thing keeping the precision you built.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — a particle-count reading from the platform's oil (particles per mL):

- ≥4 µm: **2100**  ·  ≥6 µm: **500**  ·  ≥14 µm: **65**
- Target: **ISO 18/16/13**

**Find** — does the oil meet the target? And what does the filter have to do if it does not?

**Assumptions**

- Counts come from a calibrated particle counter on a representative sample.
- ISO 4406 codes are read from the standard count-to-code table (each step ≈ doubles the count).

**Solution** — convert each count to its ISO code, then compare to the target.

$$ 2100 \to \text{code } 18, \qquad 500 \to \text{code } 16, \qquad 65 \to \text{code } 13 $$

So the sample is **ISO 18/16/13** — it meets the target exactly. Now suppose the oil drifted dirtier, to ≥14 µm = **190/mL**: that is code 15, so the reading would be worse than 13 on the critical size, and the oil would be **out of spec**. To recover, the filter must cut the ≥14 µm count from about 190 back below 80 — roughly a **2.5× reduction** — which is what a filter of the right rating does on each pass as the oil circulates.

**Result**

$$ \boxed{\text{Sample ISO } 18/16/13 = \text{target} \;\checkmark \qquad (\ge 14\,\mu\text{m at }190/\text{mL} \Rightarrow \text{code }15,\ \text{out of spec})} $$

**Engineering Interpretation** — Cleanliness is a number you can check, not a judgement you make by eye: three counts, three codes, compared to a target. The ≥14 µm count is the one that decides whether the valve stays healthy, because those particles are the ones that bridge its clearances. The filter is not decoration — it is the component that holds this number for the life of the platform, pass after pass, against the dirt that constantly enters through seals, new oil, and normal wear.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson04_cleanliness.html" title="ISO 4406 cleanliness — reading the code" style="width:100%;height:860px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson04_cleanliness.html)

Dirty the oil or clean it up and watch the three ISO codes rise and fall. The reading meets **ISO 18/16/13** only when all three codes are at or below the target — and the ≥14 µm count is the first to fail. See how much filtration it takes to pull a dirty sample back into spec.

## 8. Coding Exercise

```python
# ISO 4406 cleanliness code from a particle count (per mL), and a target check.
UPPER = {10:10,11:20,12:40,13:80,14:160,15:320,16:640,17:1300,18:2500,
         19:5000,20:10000,21:20000,22:40000,23:80000,24:160000}
def iso_code(count):
    for c in sorted(UPPER):
        if count <= UPPER[c]:
            return c
    return 25

def meets(counts, target=(18,16,13)):
    codes = tuple(iso_code(n) for n in counts)      # (>=4um, >=6um, >=14um)
    return codes, all(c <= t for c, t in zip(codes, target))

print(meets((2100, 500, 65)))     # -> ((18,16,13), True)
print(meets((4800, 1200, 190)))   # -> ((19,17,15), False)
```

**Your task:** confirm the first sample meets ISO 18/16/13 and the second does not. Then answer: for the second sample, which single size fails by the most codes, and why is that the size the filter must attack first?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson04_quiz.html" title="Fluid cleanliness — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson04_quiz.html)

1. What do the three numbers in an ISO 4406 code like 18/16/13 count?
2. Does a higher ISO code mean cleaner or dirtier oil?
3. Why is the ≥14 µm count the one that matters most for the valve?
4. Why can't you judge hydraulic oil cleanliness by how clear it looks?
5. Which component's job is it to hold the oil at ISO 18/16/13 over the platform's life?

## 10. Challenge Problem

A platform that has run perfectly for a year develops a proportional valve that occasionally sticks and hunts, and its holding accuracy has drifted outside ±1 mm. The oil is the correct VG 46, the bulk modulus is fine, and there is no visible dirt. Explain why contamination is the prime suspect, which ISO 4406 number you would expect to have crept up, how you would confirm it, and what you would change so the problem does not simply return.

## 11. Common Mistakes

- **Judging cleanliness by appearance.** Clear oil can carry tens of thousands of invisible particles per millilitre. Only a particle count tells the truth.
- **Watching the wrong number.** The ≥4 µm count is large but forgiving; the **≥14 µm** count is small and decisive, because those particles bridge the clearances. Read all three, but respect the last.
- **Treating the filter as fit-and-forget.** Dirt enters constantly — through seals, new oil, and wear — so the filter holds the target only if it is the right rating and is maintained. A blocked or bypassed filter silently loses the spec.
- **Setting no target at all.** "Keep it clean" cannot be met or verified. A number — ISO 18/16/13 — is what makes cleanliness a real, checkable requirement.

## 12. Key Takeaways

**The decision you can now make:** state the platform's cleanliness target as an ISO 4406 code, check a reading against it, and rely on the filter to hold it.

- **Contamination** is the leading cause of hydraulic failure: micron-scale particles wreck the micron-scale clearances that every other property depends on.
- Cleanliness is measured by the **ISO 4406** code — particle counts at ≥4, ≥6, and ≥14 µm — where each step ≈ doubles the count and **higher means dirtier**.
- The platform's target is **ISO 18/16/13** (≤2500 / ≤640 / ≤80 particles per mL), set by what its proportional valve needs. The **≥14 µm** count is the critical one.
- Cleanliness is **counted, not eyeballed**, and the **return-line filter** is the component that holds the target for the platform's life.
- **Module 03 is complete.** The fluid is fully specified — mineral hydraulic oil, ISO VG 46, 1.8 GPa and air-free, held to ISO 18/16/13. **Module 04 now turns that fluid into the cylinder's force and speed.**

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — reading the code

```
Explain the ISO 4406 hydraulic fluid cleanliness code (for example 18/16/13): what the three numbers count, the particle sizes (>=4, >=6, >=14 micrometres), how the code scale relates to particles per millilitre, and why each step up roughly doubles the count. Why is the >=14 micrometre number usually the critical one for servo and proportional valves?
```

**Challenge** — contamination detective

```
A hydraulic system's proportional valve starts sticking and its positioning accuracy drifts, though the oil is the correct grade and looks clean. Walk through how contamination could cause this, which ISO 4406 number you'd expect to have risen, how a particle counter would confirm it, and the sources of ingress you would investigate.
```

**Explore** — holding the target

```
Explain how engineers achieve and hold a hydraulic cleanliness target like ISO 18/16/13: filter placement (return, pressure, off-line), filter rating and beta ratio, reservoir breathers, sealing against ingress, flushing new systems, and monitoring. How does each measure keep the particle counts below the target over time?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 03 Lesson 04 — Fluid cleanliness.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*Module 03 is complete — the platform's fluid is fully specified: mineral hydraulic oil, ISO VG 46, stiff at 1.8 GPa with the air kept out, and held clean to ISO 18/16/13. Next: Module 04 — Actuators, where that fluid becomes the cylinder's force and speed.*
