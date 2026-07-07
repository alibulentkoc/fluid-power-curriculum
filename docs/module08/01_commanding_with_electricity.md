!!! abstract "You are here"
    **Module 08 — Electrohydraulic Control**  ·  **Unit 1 — Driving the Platform Electrically**  ·  **Lesson 01 — Commanding with electricity**

# Lesson 01 — Commanding with electricity

> **Module 08 · Lesson 01** · *Putting a wire where the lever was.*
> The circuit is complete and manually driven. This lesson replaces the operator's hand with a current signal: how an electrical command becomes spool position, flow, and platform speed through a proportional solenoid.
>
> **Learning outcome:** Trace the command chain from an electrical signal to platform motion — current to solenoid force to spool position to metered flow to speed — and predict the platform speed for a given command.

---

## 1. Why This Matters

Everything you have built so far waits for a human. A person reads the height, decides to nudge the platform up, and pushes a lever a certain amount for a certain time. That works, but it cannot hold two tonnes to a millimetre, it cannot react in ten milliseconds, and it cannot run unattended. To get there, the first thing that has to change is the *command*: the lever has to become a wire, and the amount-of-push has to become an amount-of-current. Once a number can command the valve, a computer can command the valve — and everything downstream (sensing, control, automation) becomes possible.

So the decision this lesson makes is: **how does an electrical command turn into platform motion — what is the chain from current to speed, and how much speed does a given command produce?** The answer is a short causal chain running through a *proportional solenoid*: the command current sets a force, the force sets the spool position, the spool position meters the flow, and the flow sets the speed. Each link is roughly proportional, so the whole chain is roughly proportional — a command of *x* percent gives about *x* percent of full speed. That single fact is what makes the platform controllable by a number instead of a hand.

## 2. Physical Intuition

A proportional solenoid is an electromagnet designed to push with a force that tracks its current — double the current, double the push — over its working range. Bolt one to the end of the valve spool, opposed by a centring spring, and you have converted "current" into "position": the spool slides until the solenoid's push balances the spring's resistance, and that balance point moves in proportion to the current. Send a little current and the spool cracks open a little; send more and it opens more. The manual lever did exactly this mechanically — your hand's push against a detent — and the solenoid just does it electrically.

From there, the hydraulics you already know take over. The spool's opening is a metering orifice, so a wider opening passes more flow, and more flow into the cylinder means more speed — the very relationship from the metering lesson, $v \approx 85\,u$ mm/s. So the command threads all the way through: a current becomes a force, a force becomes an opening, an opening becomes a flow, a flow becomes a speed. Because each step is close to linear, a 50% command gives roughly half speed and a 5% command gives a slow, controllable creep — the fine motion you will need to settle onto a target. The lever is gone; a number now drives the machine.

## 3. The Idea You Now Need

The command chain is a product of near-linear links from current $I$ to speed $v$:

$$ I \;\xrightarrow{\;F=K_s I\;}\; F_\text{sol} \;\xrightarrow{\;x=F/k\;}\; x_\text{spool} \;\xrightarrow{\;Q=C_d A(x)\sqrt{2\Delta p/\rho}\;}\; Q \;\xrightarrow{\;v=Q/A_\text{cap}\;}\; v $$

Rolling the near-linear links together and writing the command as a fraction $u = I/I_\text{max}\in[0,1]$ of full scale gives the working relationship:

$$ v(u) \approx v_\text{max}\,u, \qquad v_\text{max} = \frac{Q_\text{max}}{A_\text{cap}} = \frac{10\ \text{L/min}}{1963.5\ \text{mm}^2} \approx 85\ \text{mm/s} $$

So full command (100%) drives 85 mm/s; half command drives ~42 mm/s; a 5% command gives a **4.2 mm/s creep** for fine positioning. The command is a pure number now — a fraction, a voltage (say 0–10 V), or a current (say 4–20 mA) — and it maps straight to speed. That is the whole point: a controller that outputs a number can drive the platform to any speed from creep to full, just by choosing $u$.

## 4. Visual Explanation

<figure markdown>
  ![The electrohydraulic command chain, left to right. A command source (a dial or controller) outputs a current signal. The current drives a proportional solenoid whose force is proportional to current. The solenoid pushes the valve spool against a centring spring, so the spool position is proportional to the force. The spool opening meters flow to the cylinder. The flow sets the cylinder speed. Below the chain, a graph plots command u from 0 to 100 percent against platform speed from 0 to 85 mm per second as a straight line, with 5 percent marked at a 4.2 mm per second creep and 100 percent at 85 mm per second full speed.](assets/m08-l1-command.svg){ width="720" }
</figure>

Read the chain left to right: **command → current → solenoid force → spool position → flow → speed**. Each arrow is a near-proportional conversion, so the whole chain is near-proportional, which is why the graph beneath is essentially a straight line from the origin. The two marked points are the ones that matter in practice: **5% command → 4.2 mm/s**, the slow creep you will use to settle onto a target, and **100% command → 85 mm/s**, full traverse speed. Everywhere in between, the platform speed is just the command times 85 mm/s. The lever's feel has become a line on a graph.

## 5. Engineering Example

This is the interface behind every electrically-controlled hydraulic machine — CNC press brakes, injection-moulding clamps, aircraft flight-control actuators, excavator fine-grade systems. In each, a controller outputs a small current or voltage and a proportional (or servo) valve turns it into precisely metered flow. The reason the whole industry moved from levers to signals is exactly the chain above: once motion is commanded by a number, you can store it, compute it, ramp it, and close a loop around it. A machine operator setting a press speed on a keypad is choosing a $u$; the valve does the rest. The same proportional valve already sits in the platform circuit — this lesson simply names the wire going into it and what that wire commands.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — proportional valve on the platform; full command gives 10 L/min; cap area 1963.5 mm². Command is 0–100%.

**Find** — the platform speed at 100%, 30%, and 5% command, and the command needed for a 20 mm/s approach.

**Assumptions**

- Chain is linear over the range: $v(u)=v_\text{max}u$.

**Solution**

$$ v_\text{max}=\frac{10\ \text{L/min}}{1963.5\ \text{mm}^2}=85\ \text{mm/s} $$
$$ v(1.0)=85,\quad v(0.30)=25.5,\quad v(0.05)=4.2\ \text{mm/s} $$
$$ u\ \text{for}\ 20\ \text{mm/s} = \frac{20}{85}=0.235 = 23.5\% $$

**Result**

$$ \boxed{85 / 25.5 / 4.2\ \text{mm/s at }100/30/5\%; \quad 20\ \text{mm/s needs }\approx 24\%\ \text{command}} $$

**Engineering Interpretation** — The linear map makes the platform trivially commandable: pick a speed, divide by 85 mm/s, and you have the command. The 5% creep at 4.2 mm/s is the important one — it shows the valve can command motion slow enough to position finely, which is what a millimetre-level target will demand. Note what this lesson does *and does not* give you: it gives an **open-loop** command — tell the valve 24% and it moves at ~20 mm/s — but it does not yet *know* whether the platform actually reached the target, because nothing is measuring position. Real proportional valves also have small non-idealities (a dead-band near zero, slight non-linearity, hysteresis) that blur the perfect line, which is another reason the platform will eventually need to *sense* its position and correct — the measurement chain of the coming lessons, and the closed loop of Module 10.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson01_command.html" title="Commanding with electricity — command to speed" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson01_command.html)

Sweep the command from 0 to 100% and watch the solenoid drive the spool, the spool meter the flow, and the platform speed follow — a straight line from creep to full traverse. Find the command for a target speed and see the whole chain respond.

## 8. Coding Exercise

```python
Q_max, A_cap = 10.0, 1963.5           # L/min, mm^2
v_max = Q_max * 1e6 / 60 / A_cap      # mm/s at full command

def speed(u):      return v_max * u          # command fraction -> mm/s
def command(v):    return v / v_max          # target speed -> command fraction

for u in (1.0, 0.30, 0.05):
    print(f"command {u*100:5.1f}%  ->  {speed(u):5.1f} mm/s")
print("command for 20 mm/s:", round(command(20)*100, 1), "%")
```

**Your task:** confirm 5% command gives ~4.2 mm/s. Then answer in a comment: with only this open-loop command (no position sensor), if the platform is 10 mm below target, can the controller know when to *stop*? What would it need?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson01_quiz.html" title="Commanding with electricity — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson01_quiz.html)

1. What does a proportional solenoid convert the command current into, and how?
2. Name the four links of the chain from current to platform speed.
3. At 5% command, roughly how fast does the platform move, and why does that matter?
4. What command gives full traverse speed, and what is that speed?
5. What can this open-loop command *not* do on its own, and what is missing?

## 10. Challenge Problem

A technician wires the platform's proportional valve to a controller and commands a steady 50% to raise the load a known distance, timing it with a stopwatch to decide when to stop. It works — until the oil warms up and thins, and the same 50% command now moves the platform noticeably faster, overshooting the stop. Explain, using the command chain, why a fixed command does not guarantee a fixed *result*, which links are affected by temperature, and what the machine fundamentally lacks that a stopwatch-and-command scheme can never fix. Connect your answer to why the next lessons add sensing.

## 11. Common Mistakes

- **Confusing command with position.** The command sets *speed* (through flow), not position; to reach a position you must command speed for the right time — or measure position.
- **Assuming perfect linearity.** Real proportional valves have a dead-band near zero and some hysteresis; the straight line is an approximation.
- **Forgetting the load and pressure.** The metering flow depends on the pressure drop too; the clean $v=85u$ assumes the supply holds up under load.
- **Thinking a signal alone closes the loop.** Commanding is open-loop; without a position sensor the controller is driving blind.

## 12. Key Takeaways

**The decision you can now make:** predict platform motion from an electrical command, and explain the chain that produces it.

- A **proportional solenoid** turns command current into spool position (force ∝ current, position ∝ force).
- The chain is **current → force → spool → flow → speed**, each link near-linear.
- The working map is **$v(u)\approx 85\,u$ mm/s**: 100% → 85 mm/s, 5% → 4.2 mm/s creep.
- The command is now a **pure number** — a controller can drive the platform to any speed.
- But commanding is **open-loop** — it sets speed, not position, and cannot tell if the target was reached. **Lesson 03 adds the position sensor** that closes that gap.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the command chain

```
Explain how an electrical command drives a hydraulic proportional valve: current through a proportional solenoid produces a force, the force positions the spool against a spring, the spool meters flow, and the flow sets actuator speed. Use a platform with 10 L/min full flow and a 1963.5 mm^2 cap area to show that command maps to speed as v ~ 85*u mm/s.
```

**Challenge** — open-loop limits

```
A hydraulic platform is driven by a proportional valve with a fixed 50% command for a timed duration to reach a height. Explain why oil temperature, load, and valve hysteresis make a fixed command give a variable result, and why open-loop commanding cannot guarantee position without sensing.
```

**Explore** — from lever to signal

```
Discuss why electrically-controlled hydraulic machines replaced manual levers with proportional/servo valves driven by current or voltage signals. What does representing the command as a number (rather than a hand motion) enable - storage, computation, ramping, closed-loop control?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 08 Lesson 01 — Commanding with electricity.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The lever is now a wire: a current commands the platform's speed through the proportional solenoid. Next: Lesson 02 — On/off vs proportional, the two kinds of electrical valve and why the platform needs the proportional one.*
