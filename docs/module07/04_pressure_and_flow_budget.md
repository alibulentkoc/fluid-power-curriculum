!!! abstract "You are here"
    **Module 07 — Circuits**  ·  **Unit 1 — The Complete Circuit**  ·  **Lesson 04 — Pressure and flow budget**

# Lesson 04 — Pressure and flow budget

> **Module 07 · Lesson 04** · *Putting numbers on every line.*
> You can trace the three states; now quantify them. This lesson budgets the pressure and flow each line carries in raise, hold, and lower — and checks that nothing exceeds its limit.
>
> **Learning outcome:** Build a pressure-and-flow budget for the platform circuit — compute the flow and pressure on each line in each state, find the worst case per line, and confirm the design stays within the relief setting and sensible line speeds.

---

## 1. Why This Matters

A traced path tells you *where* the oil goes; a budget tells you *how much* and *at what pressure* — and that is what actually sizes the hardware and keeps it safe. Undersize the return line and lowering will spike its back-pressure; misjudge the raise pressure and the relief valve dumps your flow to tank and the platform stalls; forget that the load *assists* on the way down and you will size the cap line for the wrong number entirely. The budget is where the three traces turn into the hose diameters, the relief margin, and the confidence that every state stays inside its limits.

So the decision this lesson makes is: **what flow and pressure does each line carry in each state, what is the worst case per line, and does anything exceed its limit?** The answer is a small table. The surprise in it is that the busiest the cap and return lines ever get is not while *raising* the load but while *lowering* it — because the load pushes the piston down and the large cap area expels more oil than the pump sends in. Size the lines for that, keep the raise pressure under the relief, and the circuit is not just correct but correctly proportioned.

## 2. Physical Intuition

Flow follows area and speed. When the platform **raises**, the pump's 10 L/min fills the big cap chamber, so the piston climbs at 85 mm/s; the smaller rod chamber is squeezed out at the same speed, but because its annulus area is smaller it only expels about 6.9 L/min back to tank. When the platform **lowers**, the picture flips: now the pump's 10 L/min feeds the *rod* chamber, and because that annulus is smaller the piston moves *faster* — about 124 mm/s — which means the big cap chamber empties at about 14.6 L/min. That extra flow, above what the pump delivers, is the load helping itself down under gravity; the counterbalance valve meters it. So the cap and return lines see their heaviest flow while lowering, not raising.

Pressure follows load and losses. Raising has to make the ~100 bar the load demands at the cap, plus the small drops across the directional valve, the counterbalance check, and the lines — call it ~109 bar at the pump, comfortably under the 115 bar relief but not by much. Holding costs almost nothing: the tandem centre lets the pump idle near zero pressure while the counterbalance carries the load. Lowering costs little pressure either — the pump just has to raise the rod line enough to pilot the counterbalance open (~10 bar) while gravity does the work. High flow and modest pressure going down; modest flow and high pressure going up.

## 3. The Idea You Now Need

Flow on a line is area times speed; the two chambers have different areas, so the same piston speed gives different line flows:

$$ Q = v \cdot A, \qquad \frac{A_\text{cap}}{A_\text{rod}} = \frac{1963.5}{1347.7} = 1.46 $$

**Raise** (pump fills the cap): $v = Q_\text{pump}/A_\text{cap} = 85$ mm/s, and the rod expels $Q_\text{rod}=v\,A_\text{rod}\approx 6.9$ L/min. **Lower** (pump fills the rod): $v = Q_\text{pump}/A_\text{rod}\approx 124$ mm/s, and the cap expels

$$ Q_\text{cap} = v \cdot A_\text{cap} = \frac{Q_\text{pump}}{A_\text{rod}}\,A_\text{cap} = Q_\text{pump}\cdot 1.46 \approx 14.6\ \text{L/min} $$

So the cap and return lines are sized for **14.6 L/min** (lowering), the P and rod lines for **10 L/min**. On pressure, the raise path must stay under the relief:

$$ p_\text{pump} = p_\text{load} + \sum \Delta p \approx 100 + 4 + 3 + 2 = 109\ \text{bar} \;<\; 115\ \text{bar (relief)} $$

with ~6 bar of margin. Hold ≈ 0 bar (unloaded); lower needs only the ~10 bar pilot.

## 4. Visual Explanation

<figure markdown>
  ![A budget table over the platform circuit. Rows are the four lines — pressure/supply (P), cap line (A), rod line (B), and return (T); columns are the three states raise, hold, and lower. Each cell gives the flow in litres per minute and the pressure in bar. Raise: P line 10 L/min at ~109 bar, cap line 10 L/min at ~100 bar, rod line 6.9 L/min low, return 6.9 L/min low. Hold: P line 10 L/min at near zero (unloaded), cap line no flow held at 100 bar, rod and return no flow. Lower: P line 10 L/min low, cap line 14.6 L/min metered, rod line 10 L/min low, return 14.6 L/min. The cap and return line worst cases (14.6 L/min, in lowering) and the raise pump pressure with its 6 bar margin under the 115 bar relief are highlighted.](assets/m07-l4-budget.svg){ width="720" }
</figure>

Read down each column to see what a state costs, and across each row to find a line's worst case. Two things jump out. The **cap and return rows peak in the *lower* column** at 14.6 L/min — higher than anywhere in raise — so those lines are sized by lowering. And the **P-line pressure peaks in *raise*** at ~109 bar, sitting just 6 bar under the relief. Everything else is comfortable: holding is nearly free, and lowering is high-flow but low-pressure. The table is the circuit's spec sheet.

## 5. Engineering Example

This is the calculation every hydraulic designer runs before ordering a single hose. On a real lift, the return line is often a size *larger* than the pressure line for exactly the reason this budget shows: the regeneration-like flow when a load lowers can exceed pump flow, and a return line sized only for "pump flow" will throttle the descent and bounce the load. The relief margin matters just as much — six bar is workable but tight, so a designer might drop a line size to cut losses, or accept it knowing the relief will protect against overload. When a platform "won't lift the rated load," the budget is the first thing to revisit: either the pressure demand crept above the relief, or a loss got bigger than budgeted. Numbers on every line turn "it should work" into "it works, with this much margin."

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — pump 10 L/min; cap area 1963.5 mm², rod annulus 1347.7 mm²; load 100 bar; relief 115 bar.

**Find** — the flow on the cap and return lines while lowering, and the raise pump pressure with its margin.

**Assumptions**

- Piston speed set by pump flow into the filling chamber; losses ≈ 4 bar (DCV) + 3 bar (CBV) + 2 bar (lines).

**Solution**

$$ \text{Lower: } v=\frac{Q_\text{pump}}{A_\text{rod}}=\frac{10\text{ L/min}}{1347.7\text{ mm}^2}=124\ \text{mm/s}, \quad Q_\text{cap}=v\,A_\text{cap}=124\times1963.5\approx 14.6\ \text{L/min} $$

$$ \text{Raise: } p_\text{pump}=100+4+3+2=109\ \text{bar}, \quad \text{margin}=115-109=6\ \text{bar} $$

**Result**

$$ \boxed{\text{Cap/return lines: size for 14.6 L/min (lowering); raise pump } \approx 109\text{ bar, 6 bar under relief}} $$

**Engineering Interpretation** — The two headline numbers drive two decisions. The **14.6 L/min** on the cap and return lines — nearly half again the pump flow — is what sizes those hoses; picking them for "10 L/min" would throttle the descent and raise back-pressure, making the platform jerk on the way down. The **6 bar margin** under the relief is the raise safety cushion: enough that normal losses don't trip the relief, but tight enough that a clogged filter or a cold-oil startup could erode it, so it is worth watching. Notice what the budget does *not* flag: holding and the pressure side of lowering are both easy, so nothing there needs attention. That is the value of a budget — it tells you which one or two numbers to care about out of the dozen on the sheet. Lesson 05 uses these to finish the circuit fail-safe.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson04_budget.html" title="Pressure and flow budget — raise, hold, lower" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

Switch between raise, hold, and lower to read the flow and pressure on every line, with the worst-case line and the relief margin called out. Watch the cap and return lines peak in *lower*, and the pump pressure peak in *raise*.

## 8. Coding Exercise

```python
A_cap, A_rod = 1963.5, 1347.7   # mm^2
Q_pump = 10.0                   # L/min
def q(v, A): return v * A / 1e6 * 60          # mm/s, mm^2 -> L/min
def v(Q, A): return Q * 1e6 / 60 / A          # L/min, mm^2 -> mm/s

# RAISE: pump fills the cap
v_up = v(Q_pump, A_cap); print("raise:", round(v_up), "mm/s  cap", Q_pump, "  rod", round(q(v_up, A_rod),1))
# LOWER: pump fills the rod; cap expels more (load assists)
v_dn = v(Q_pump, A_rod); print("lower:", round(v_dn), "mm/s  rod", Q_pump, "  cap", round(q(v_dn, A_cap),1))

p_load, losses, relief = 100, 4+3+2, 115
print("raise pump:", p_load+losses, "bar   margin:", relief-(p_load+losses), "bar")
```

**Your task:** confirm the cap line carries ~14.6 L/min while lowering. Then: if you *doubled* the pump to 20 L/min, which line's worst-case flow would you now size for, and would the raise pressure margin change?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson04_quiz.html" title="Pressure and flow budget — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

1. In which state do the cap and return lines carry their heaviest flow, and roughly how much?
2. Why does the cap line expel more than the pump's 10 L/min while lowering?
3. In which state does the P line reach its highest pressure, and how close is it to the relief?
4. What does the pump do, pressure-wise, while the load is held?
5. Why might the return line be specified a size larger than the pressure line?

## 10. Challenge Problem

A colleague sizes every hose in the platform for "10 L/min, 115 bar" — the pump flow and the relief setting — reasoning that nothing can exceed those. Using the budget, find the case they have missed and explain the consequence: which line is undersized, in which state, by how much, and what the operator would feel. Then propose a fix and state the general rule this reveals about sizing lines on a circuit that lowers a load.

## 11. Common Mistakes

- **Sizing the return for pump flow.** While lowering, the cap expels ~14.6 L/min — more than the 10 L/min pump — so the return and cap lines must be sized for the larger number.
- **Forgetting the load assists downward.** The extra descent flow is gravity, not the pump; it is real flow the lines must carry.
- **Assuming the pump makes full pressure in every state.** It makes ~109 bar to raise, but nearly zero to hold and only a small pilot pressure to lower.
- **Ignoring the relief margin.** Six bar is not much; a dirty filter or cold oil can erode it and trip the relief mid-lift.

## 12. Key Takeaways

**The decision you can now make:** budget the flow and pressure on every line of the platform circuit, find each line's worst case, and confirm nothing exceeds its limit.

- **Flow = area × speed.** Because $A_\text{cap}/A_\text{rod}=1.46$, the same pump gives different line flows in raise vs lower.
- **Cap and return lines peak while *lowering*** at ~14.6 L/min (load assists) — size them for that, not for pump flow.
- **P and rod lines** carry the pump's 10 L/min.
- **P-line pressure peaks while *raising*** at ~109 bar — 6 bar under the 115 bar relief.
- **Hold is nearly free** (pump unloaded); **lower is high-flow, low-pressure**. **Lesson 05 closes the circuit fail-safe** using this budget.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — building the budget

```
Build a pressure-and-flow budget for a hydraulic lift platform: 10 L/min pump, cylinder cap area 1963.5 mm^2, rod annulus 1347.7 mm^2, load ~100 bar, relief 115 bar. For raise, hold, and lower, compute the flow and pressure on the pressure line, cap line, rod line, and return line, and identify the worst case for each line.
```

**Challenge** — the sizing trap

```
Explain why, on a hydraulic circuit that lowers a load, the return and cap lines can carry more flow than the pump delivers, and why sizing every hose for "pump flow" is a mistake. Use cap area 1963.5 mm^2, rod annulus 1347.7 mm^2, and a 10 L/min pump to show the numbers.
```

**Explore** — margins and safety

```
For a hydraulic platform whose raise pressure is ~109 bar against a 115 bar relief, discuss the 6 bar margin: what normal conditions (cold oil, dirty filter, line losses) could erode it, what happens if the relief trips mid-lift, and how a designer might restore margin without changing the load.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 07 Lesson 04 — Pressure and flow budget.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*You can now put numbers on every line of the circuit and confirm it stays within limits. Next: Lesson 05 — The complete fail-safe circuit, where we add the last protections and close Module 07, ready for electrohydraulic control in Module 08.*
