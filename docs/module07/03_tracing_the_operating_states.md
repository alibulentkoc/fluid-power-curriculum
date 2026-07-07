!!! abstract "You are here"
    **Module 07 — Circuits**  ·  **Unit 1 — The Complete Circuit**  ·  **Lesson 03 — Tracing the operating states**

# Lesson 03 — Tracing the operating states

> **Module 07 · Lesson 03** · *Following the oil through the circuit.*
> You assembled the circuit; now make it move. This lesson traces the flow through the finished schematic for each of the platform's three states — raise, hold, and lower — and shows how one valve position produces each.
>
> **Learning outcome:** Trace the flow path for raise, hold, and lower through the platform circuit — name which directional-valve position is active, which lines carry flow, and how the counterbalance valve behaves in each.

---

## 1. Why This Matters

A circuit that can only do one thing is not a machine — the platform has to go *up*, *stay*, and *come down*, on command, safely. All three come from the **same** hardware you wired in Lesson 02; what changes between them is only which way the directional valve is shifted and, as a consequence, which lines carry flow and how the counterbalance valve responds. If you can trace the oil for each state, you can predict what the machine will do, size the lines, and — most importantly — see *why* it stays up when it should and comes down under control rather than dropping.

So the decision this lesson makes concrete is: **for each command — raise, hold, lower — which valve position is active, and what path does the oil take?** The answer is three traces through one circuit. Raise sends pressure to the cap through the counterbalance's free-flow check while the rod drains to tank. Hold centres the valve, unloading the pump and locking the load drop-tight. Lower pressurises the rod, which both drives the descent and pilots the counterbalance open so the trapped cap oil escapes in a controlled way. Same circuit, three paths.

## 2. Physical Intuition

Picture the directional valve as a track switch with three settings. In **raise**, it connects the pump to the cap line and the rod line to tank: oil flows pump → P → A, up through the counterbalance's check valve (which opens freely in this direction) into the cap, and the piston rises; the shrinking rod chamber pushes its oil out through B back to tank. In **hold**, the valve sits centred: with the tandem centre, the pump loops straight back to tank at low pressure (no wasted heat), and both actuator lines are blocked — but blocking alone would let the load creep out through tiny leaks, so the counterbalance valve holds the cap oil drop-tight and the platform stays put.

In **lower**, the valve shifts the other way: the pump now feeds the *rod* line, and that same rod pressure is tapped as a pilot to the counterbalance valve. The counterbalance will not let the load down until it sees that pilot — so the load can only descend while the pump is actively commanding it. When the pilot arrives, the counterbalance cracks open and meters the cap oil out through A to tank, and the platform sinks smoothly instead of dropping. Three commands, three flow paths, one circuit — and the counterbalance is the part that behaves differently in each.

## 3. The Idea You Now Need

Each state is a **path through the circuit**, set by the active valve position:

$$ \textbf{Raise: } \text{P}\!\to\!\text{A}\!\to\!\text{CBV}_\text{check}\!\to\!\text{cap} \;\;\big|\;\; \text{rod}\!\to\!\text{B}\!\to\!\text{T}, \qquad p_\text{cap}=\frac{F}{A_\text{cap}}=\frac{19.6\ \text{kN}}{1963.5\ \text{mm}^2}\approx 100\ \text{bar} $$

$$ \textbf{Hold: } \text{centre} \Rightarrow \text{P}\!\to\!\text{T (unloaded)},\ \text{A,B blocked},\ \text{CBV drop-tight} $$

$$ \textbf{Lower: } \text{P}\!\to\!\text{B}\!\to\!\text{rod} \;(\text{+ pilot}\!\to\!\text{CBV}) \;\;\big|\;\; \text{cap}\!\to\!\text{CBV}_\text{relief}\!\to\!\text{A}\!\to\!\text{T} $$

The counterbalance is set at **130 bar** (1.3× the ~100 bar load), and with a **3:1** pilot it cracks when the rod-line pilot reaches about $(130-100)/3 \approx 10$ bar. So raising needs ~100 bar at the cap; holding needs no pump pressure at all; lowering needs the rod pressurised enough (~10 bar of pilot) to open the counterbalance. Same 10 L/min threads whichever path is active.

## 4. Visual Explanation

<figure markdown>
  ![Three copies of the platform circuit side by side, one per operating state, with the active flow path drawn bold and the idle lines greyed. Raise: the pump feeds the pressure line to the directional valve, which routes it to port A, up through the counterbalance valve's free-flow check to the cylinder cap, while the rod line returns through port B to tank; the piston and load rise. Hold: the directional valve is centred, so the pump loops back to tank through the tandem centre while ports A and B are blocked and the counterbalance valve holds the cap oil drop-tight; the load is stationary. Lower: the pump feeds port B and the rod line, a dashed pilot from the rod line opens the counterbalance valve, and the cap oil is metered out through the counterbalance and port A back to tank; the piston and load descend under control.](assets/m07-l3-states.svg){ width="720" }
</figure>

Read the three panels as one machine in three settings. In **raise**, follow the bold line from the pump up to the cap through the counterbalance's check — the rod side (also bold) drains to tank. In **hold**, the bold path is just the pump looping back to tank; the actuator lines are quiet and the counterbalance is locked. In **lower**, the bold path feeds the rod, the dashed pilot reaches across to the counterbalance, and the cap oil traces back out through the counterbalance to tank. The only thing that moved between panels is the directional-valve position; everything else follows from it.

## 5. Engineering Example

This is exactly how an operator's three controls map onto one hydraulic circuit on real equipment — a scissor lift, a tailgate, a press ram. The lever has three positions, and each throws the directional valve to one of these envelopes; the plumbing does the rest. When a service technician troubleshoots "the load drifts down when held" or "it drops too fast when lowering," they trace precisely these paths: drift points at the counterbalance's drop-tightness (the hold trace), a fast drop points at the counterbalance's metering or a mis-routed pilot (the lower trace). The circuit diagram plus these three traces is the diagnostic tool — you reason about the machine by following the oil, state by state.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the assembled platform circuit; commands raise, hold, lower.

**Find** — the active valve position and flow path for each, and the pressure each needs.

**Assumptions**

- Load 19.6 kN; cap area 1963.5 mm²; counterbalance 130 bar, 3:1 pilot; pump 10 L/min.

**Solution**

$$ \textbf{Raise: } \text{P}\!\to\!\text{A}\!\to\!\text{cap},\ \text{rod}\!\to\!\text{B}\!\to\!\text{T}; \quad p_\text{cap}=\tfrac{19.6\text{ kN}}{1963.5\text{ mm}^2}=100\ \text{bar} $$
$$ \textbf{Hold: } \text{centre}; \ p_\text{pump}\approx 0\ (\text{unloaded}),\ \text{CBV drop-tight} $$
$$ \textbf{Lower: } \text{P}\!\to\!\text{B}\!\to\!\text{rod}; \ p_\text{pilot}=\tfrac{130-100}{3}\approx 10\ \text{bar to crack CBV};\ \text{cap}\!\to\!\text{CBV}\!\to\!\text{A}\!\to\!\text{T} $$

**Result**

$$ \boxed{\text{Raise needs ~100 bar at the cap; hold needs no pressure; lower needs ~10 bar of rod-line pilot}} $$

**Engineering Interpretation** — The three states cost very different things. **Raising** works the pump hardest — it must make the full ~100 bar to lift the load, at the 85 mm/s the 10 L/min gives. **Holding** is nearly free: the tandem centre lets the pump idle at almost no pressure while the counterbalance, not the pump, carries the load — which is why the platform can hold all day without cooking the oil. **Lowering** barely taxes the pump either; it only needs to raise the rod line enough to crack the counterbalance (~10 bar of pilot), and gravity does the rest while the counterbalance meters the descent. Reading the circuit this way tells you not just *whether* each state works but what it costs — the foundation for the pressure-and-flow budget in Lesson 04.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson03_states.html" title="Tracing the operating states — raise, hold, lower" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson03_states.html)

Switch between **raise**, **hold**, and **lower** to shift the directional valve and light up the active flow path through the circuit. Watch where pressure goes, what the counterbalance valve does, and how the same hardware produces all three motions.

## 8. Coding Exercise

```python
# trace the active path for each command through the platform circuit
def trace(state):
    if state == "raise":
        return ["pump", "P", "A", "CBV.check(free)", "cap ↑"], "rod → B → T"
    if state == "hold":
        return ["pump", "P", "T (tandem, unloaded)"], "A,B blocked; CBV drop-tight"
    if state == "lower":
        return ["pump", "P", "B", "rod ↓  (+pilot → CBV)"], "cap → CBV.relief → A → T"

for s in ("raise", "hold", "lower"):
    main, other = trace(s)
    print(f"{s:6}: {' → '.join(main)}   |   {other}")
```

**Your task:** confirm each state prints a complete path. Then answer in a comment: in **lower**, what happens if the pilot line is disconnected — does the load come down at all, and is that failure safe or unsafe?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson03_quiz.html" title="Tracing the operating states — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson03_quiz.html)

1. In **raise**, which path does the oil take from the pump to the cap, and where does the rod oil go?
2. In **hold**, what does the tandem centre do with the pump flow, and what actually holds the load?
3. In **lower**, what must happen at the counterbalance valve before the load can descend?
4. Why does lowering need only ~10 bar of pilot when the counterbalance is set at 130 bar?
5. Which single component changes its behaviour across all three states?

## 10. Challenge Problem

An operator reports that the platform *raises* and *holds* correctly, but when they command *lower*, nothing happens — the load stays up. Using the three traces, localise the fault: which state's path is broken, which line or component is the likely culprit, and why do raise and hold still work while lower does not? Then state whether this failure mode is safe or unsafe, and relate it to the design choice of piloting the counterbalance from the rod line.

## 11. Common Mistakes

- **Thinking "blocked" means "held."** Centring the valve blocks A and B, but tiny leaks would still let the load creep — the **counterbalance** is what actually holds it drop-tight.
- **Expecting the pump to hold the load.** In hold, the tandem centre *unloads* the pump; the load is carried by the trapped cap oil, not by pump pressure.
- **Forgetting the pilot in lower.** Pressurising the rod line alone does not lower the load until that pressure also **pilots the counterbalance open**.
- **Confusing raise and lower flow at the cap.** In raise, cap oil flows *in* through the check; in lower, cap oil flows *out* through the relief element — opposite directions through the same valve.

## 12. Key Takeaways

**The decision you can now make:** trace the flow for raise, hold, and lower through the platform circuit, and name the valve position and counterbalance behaviour for each.

- **Raise** = pump → P → A → cap (through the counterbalance's free-flow check); rod → B → T. Needs ~100 bar.
- **Hold** = centre: pump → T (unloaded, low heat); A, B blocked; the **counterbalance holds the load drop-tight**.
- **Lower** = pump → B → rod (+ pilot → counterbalance); cap → counterbalance (metered) → A → T. Needs ~10 bar of pilot.
- The **counterbalance valve behaves differently in every state** — free-flow check when raising, drop-tight lock when holding, metered relief when lowering.
- The same 10 L/min threads whichever path is active. **Lesson 04 budgets the pressures and flows** along these paths.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the three traces

```
Trace the flow through a hydraulic lift-platform circuit (motor-driven pump, relief valve, 4/3 tandem-centre directional valve, counterbalance valve on the cap line piloted from the rod line, double-acting cylinder) for three commands: raise, hold, and lower. For each, name the active valve position, the path the oil takes, and what the counterbalance valve does.
```

**Challenge** — fault localisation

```
A hydraulic platform raises and holds correctly but will not lower on command - the load stays up. Using the raise, hold, and lower flow paths, localise the fault: which path is broken, which component is the likely culprit, and why the other two states still work. Is this failure mode safe?
```

**Explore** — energy across states

```
Compare how hard the pump works in each state of a counterbalance-controlled lift platform: raising the load, holding it, and lowering it. Explain why a tandem centre makes holding nearly free and why lowering needs only a small pilot pressure rather than full system pressure.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 07 Lesson 03 — Tracing the operating states.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*You can now make the platform raise, hold, and lower — and trace the oil for each. Next: Lesson 04 — Pressure and flow budget, where we put numbers on every line of these three paths and check nothing exceeds its limit.*
