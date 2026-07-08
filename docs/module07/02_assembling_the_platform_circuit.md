!!! abstract "You are here"
    **Module 07 — Circuits**  ·  **Unit 1 — The Complete Circuit**  ·  **Lesson 02 — Assembling the platform circuit**

# Lesson 02 — Assembling the platform circuit

> **Module 07 · Lesson 02** · *Wiring the parts into one schematic.*
> You can read the symbols; now connect them. This lesson joins the Module 05 power unit and the Module 06 valve set into a single ISO 1219 schematic — the complete circuit that raises, lowers, and holds the platform.
>
> **Learning outcome:** Assemble the platform's hydraulic circuit — decide which port connects to which, place the counterbalance valve and its pilot correctly, and read the finished schematic as one machine.

---

## 1. Why This Matters

A pile of correct components is not a machine. The pump, motor, relief valve, filter, directional valve, counterbalance valve, and cylinder are each right on their own, but they only *do* something once they are plumbed together in the right order, with the right port going to the right place. Connect the counterbalance valve to the wrong line and the load will not hold; forget where its pilot comes from and it will never lower; tee the relief valve in the wrong spot and it protects nothing. The circuit is where all the earlier decisions either cohere into a working platform or fall apart.

So the decision this lesson settles is: **how do the parts connect — which port joins which, and where do the counterbalance valve and its pilot sit?** The answer is a specific topology: the pump feeds the directional valve's pressure port, the return threads back through a filter to tank, the actuator ports run to the cylinder with the counterbalance valve guarding the cap line, and a pilot tapped from the rod line lets that valve release the load on command. Draw it once, correctly, and you have the schematic that the rest of the module traces, budgets, and makes fail-safe.

## 2. Physical Intuition

Think of the directional valve as the **hub** of the circuit. Below it sits the power unit: the motor spins the pump, the pump draws from the reservoir and pushes oil up the pressure line, the relief valve teed off that line caps the pressure, and the return line drops back through a filter to the tank. Those two lines — pressure and return — meet the valve at its **P** and **T** ports. Above the valve sits the actuator: its two working ports, **A** and **B**, run up to the cylinder, A to the cap side and B to the rod side. Turn the valve and it decides which of A or B gets pressure and which goes to tank — that is how the same pump drives the platform up or down.

The subtlety is the **counterbalance valve**, and it belongs in one specific place: in the **cap line**, right at the cylinder, between port A and the cap port. That is the line that holds the load's weight, so that is the line that must be locked. And its **pilot** must come from the **rod line** (B): when you command *down*, the pump pressurises the rod side, and that same pressure signals the counterbalance valve to open, letting the trapped cap oil out in a controlled way. Pilot from the rod line means the valve only releases while the pump is actively driving the descent — lose the pump and the load stays put. Every connection has a reason; the schematic makes them all visible at once.

## 3. The Idea You Now Need

The circuit is fully described by its **connection map** — which port joins which:

$$ \text{pump} \to \text{P} \quad\big|\quad \text{T} \to \text{filter} \to \text{tank} \quad\big|\quad \text{A} \to \text{CBV} \to \text{cap} \quad\big|\quad \text{B} \to \text{rod} $$

with the relief valve teed off the pressure line to tank, and the counterbalance **pilot tapped from the B (rod) line**. Because the lines carry the pressures from earlier modules, the map also tells you what each line holds: the P line up to **115 bar** (relief cap), the cap line **~100 bar** (the load), the counterbalance set at **130 bar**, and the rod-line pilot **~10 bar** to open it. And flow is continuous along every working line — the same **10 L/min** the pump delivers threads through the valve, the counterbalance, and the cylinder:

$$ Q_\text{pump} = Q_\text{P} = Q_\text{A} = Q_\text{cap} = 10\ \text{L/min} \quad(\text{along the active path}) $$

Get the map right and the machine is assembled; the next lessons trace flow through it and budget its pressures.

## 4. Visual Explanation

<figure markdown>
  ![The complete ISO 1219 schematic of the platform. At the bottom, the power unit: a reservoir with an electric motor driving a fixed-displacement pump that draws from it; a pressure relief valve teed off the pump's pressure line back to tank, set at 115 bar; and a return filter to the reservoir. The pressure line rises to the P port of a 4/3 proportional directional valve with a tandem centre; the valve's T port returns through the filter to tank. The valve's A port rises through a counterbalance valve mounted at the cylinder cap port, and its B port runs to the cylinder rod port. A dashed pilot line taps the B (rod) line and runs to the counterbalance valve, so rod-side pressure opens it to lower the load. At the top, the double-acting cylinder raises the 2-tonne load. Solid lines carry the working flow; the dashed line is the pilot.](assets/m07-l2-circuit.svg){ width="640" }
</figure>

This is the platform, whole. Read it from the bottom: the **motor** drives the **pump**, which draws from the **reservoir** and feeds the **pressure line**; the **relief valve** caps that line at 115 bar; the line reaches the directional valve's **P** port. The valve routes flow to **A** (cap, through the **counterbalance valve**) or **B** (rod), sending the other port back through **T** and the **filter** to tank. The **counterbalance valve** sits in the cap line to hold the load, and its **dashed pilot** comes from the rod line so a *down* command releases it. Every component you built now has a place and a connection; this single drawing is the machine.

## 5. Engineering Example

Assembling this circuit is exactly like plumbing a building from a set of fixtures: the boiler, radiators, pump, and valves are useless in their boxes, but connected in the right order — supply here, return there, a pressure-relief on the hot line, a valve at each radiator — they become a heating system. The schematic is the plumber's drawing that says what pipe goes where, and it is what lets a second engineer service the system years later without guessing. Hydraulic machines live or die by this drawing: an excavator, a press, an aircraft actuator each ships with its circuit diagram precisely because the *connections* — not just the parts — are the design. Get the topology right and the machine works; get one line wrong and it fails in a way no single good component can fix.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the platform's parts: power unit (pump, motor, relief, filter, reservoir), 4/3 tandem-centre directional valve, counterbalance valve, and double-acting cylinder.

**Find** — the connection for each port, and a check that raise, hold, and lower are all possible.

**Assumptions**

- Ports P, T, A, B on the valve; cap and rod ports on the cylinder; counterbalance ports 1 (cap) and 2 (valve) plus a pilot.

**Solution**

Connect: pump → P; T → filter → tank; A → counterbalance(2), counterbalance(1) → cap; B → rod; **pilot: B line → counterbalance pilot**; relief teed off the P line → tank.

$$ \text{Raise: } \text{P}\!\to\!\text{A}\!\to\!\text{CBV(free)}\!\to\!\text{cap}, \quad \text{rod}\!\to\!\text{B}\!\to\!\text{T} $$
$$ \text{Hold: centre blocks A,B; CBV drop-tight.} \quad \text{Lower: } \text{P}\!\to\!\text{B}\!\to\!\text{rod (+pilot opens CBV)}, \ \text{cap}\!\to\!\text{CBV}\!\to\!\text{A}\!\to\!\text{T} $$

**Result**

$$ \boxed{\text{All three states exist: the counterbalance in the cap line with a rod-line pilot is what makes them work}} $$

**Engineering Interpretation** — The connection map is not arbitrary: each state the platform needs corresponds to a path that must exist in the circuit. **Raise** needs pressure to reach the cap through the counterbalance's free-flow check while the rod drains — so A feeds the cap via the CBV, and B returns to tank. **Hold** needs the cap locked — so the CBV sits in the cap line, drop-tight when the centre blocks the ports. **Lower** needs the cap oil released under control — so pressurising the rod (B) both drives the descent and, through the pilot tap, opens the CBV. Put the counterbalance anywhere else, or pilot it from anywhere else, and one of these states breaks. The schematic is correct precisely because all three paths are present. Lesson 03 walks the oil through each of them in turn.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson02_assemble.html" title="Assembling the platform circuit — the connection map" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

Select each line of the circuit — supply, return, cap, rod, pilot — to highlight it and see what it connects and what it carries. Notice where the counterbalance valve sits (the cap line) and where its pilot comes from (the rod line): the two connections that make holding and lowering work.

## 8. Coding Exercise

```python
# the platform circuit as a connection map (port -> port)
circuit = {
    "pump.out": "dcv.P",
    "dcv.T":    "filter->tank",
    "dcv.A":    "cbv.2",
    "cbv.1":    "cyl.cap",
    "dcv.B":    "cyl.rod",
    "cbv.pilot":"dcv.B(line)",     # rod pressure opens the CBV to lower
    "relief.P": "P(line)", "relief.T": "tank",
}

def path_exists(state):
    if state=="raise": return "dcv.A" in circuit and circuit["cbv.1"]=="cyl.cap"
    if state=="hold":  return "cbv.1" in circuit                     # CBV in the cap line
    if state=="lower": return circuit["cbv.pilot"]=="dcv.B(line)"    # pilot from rod line
    return False

for s in ("raise","hold","lower"):
    print(s, "->", "path exists" if path_exists(s) else "MISSING")
```

**Your task:** confirm all three states resolve to "path exists." Then: change `cbv.pilot` to tap the *P* line instead of the rod line — why would lowering then misbehave (the valve could open whenever the pump runs, even when you mean to hold or raise)?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson02_quiz.html" title="Assembling the platform circuit — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

1. Which valve is the "hub" of the circuit, and what do its P, T, A, B ports connect to?
2. In which line does the counterbalance valve belong, and why there?
3. Where does the counterbalance valve's pilot come from, and why?
4. Where is the relief valve connected, and what does it protect?
5. Why must the same flow be continuous along the active path?

## 10. Challenge Problem

A colleague wires the counterbalance valve into the **rod** line instead of the cap line, and pilots it from the **pressure (P)** line. Explain, connection by connection, what goes wrong: whether the load still holds, whether it lowers under control, and whether a pump start could drop or jerk the load unexpectedly. Then state the two rules this reveals about placing a counterbalance valve and routing its pilot, and why they follow from what the cap line and rod line each do.

## 11. Common Mistakes

- **Counterbalance in the wrong line.** It must sit in the **cap** line — the line holding the load — not the rod line, or it locks nothing.
- **Piloting from the wrong place.** The pilot must come from the **rod** line, so the valve opens only while the pump drives the descent; piloting from P can release the load whenever the pump runs.
- **Relief teed downstream of the valve.** The relief belongs on the **pump pressure line**, protecting the whole system; downstream of the DCV it cannot cap a blocked-centre pressure spike.
- **Forgetting the return path.** Every actuator port that gets pressure needs the *other* port routed to tank, or the cylinder cannot move.

## 12. Key Takeaways

**The decision you can now make:** connect the platform's parts into one correct circuit — the topology that makes raise, hold, and lower all possible.

- The **directional valve is the hub**: **P** from the pump, **T** to tank (via filter), **A** to the cap line, **B** to the rod line.
- The **counterbalance valve sits in the cap line** (it holds the load), with its **pilot tapped from the rod line** (so a *down* command releases it).
- The **relief valve** tees off the **pressure line** to tank, protecting the whole system at 115 bar.
- **Flow is continuous** along the active path — the pump's 10 L/min threads unbroken through the valve, counterbalance, and cylinder.
- The machine is now assembled as one schematic. **Lesson 03 traces the oil** through it for each of the three operating states.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the connection map

```
Describe how to connect a hydraulic lift-platform circuit: a fixed pump driven by a motor drawing from a reservoir, a relief valve teed off the pressure line, a return filter, a 4/3 tandem-centre directional valve (ports P, T, A, B), a counterbalance valve, and a double-acting cylinder. State which port connects to which, where the counterbalance valve sits, and where its pilot is tapped from - and why each choice is made.
```

**Challenge** — why the topology is forced

```
For a hydraulic platform that must raise, hold, and lower a load, explain why the counterbalance valve must be in the cap (load-holding) line and its pilot must come from the rod line. Show what breaks in the raise, hold, and lower states if the valve or its pilot is connected elsewhere.
```

**Explore** — reading a full schematic

```
Walk through reading a complete hydraulic circuit schematic from the tank up: reservoir, motor-driven pump, relief valve, filter, directional valve, counterbalance valve, and cylinder. Explain how to identify the pressure line, the return line, the actuator lines, and the pilot line, and how the drawing shows the way the parts connect.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 07 Lesson 02 — Assembling the platform circuit.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The platform is assembled — one schematic, every part connected: pump to valve, valve to cylinder, counterbalance in the cap line, pilot from the rod. Next: Lesson 03 — Tracing the operating states, where we follow the oil through the circuit to raise, hold, and lower the load.*
