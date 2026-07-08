!!! abstract "You are here"
    **Module 05 — Power Units**  ·  **Unit 1 — The Power Unit**  ·  **Lesson 02 — The pump**

# Lesson 02 — The pump

> **Module 05 · Lesson 02** · *The component that turns shaft rotation into flow.*
> Lesson 01 fixed the demand: 10 L/min at 100 bar, 1.67 kW. The pump is what makes that flow — a fixed scoop of oil on every turn of a shaft. This lesson sizes it (how big a scoop) and picks its type.
>
> **Learning outcome:** Size the pump's displacement to deliver 10 L/min at the motor's speed, find the shaft power and torque it demands, and choose a pump type suited to the platform's low-flow, high-pressure signature.

---

## 1. Why This Matters

The power unit's job is to produce a stream of pressurised oil, and the pump is the part that produces the *stream*. A pump does not "make pressure" — it makes **flow**; pressure only appears when that flow meets resistance (the load, downstream). What a pump guarantees is a fixed volume of oil moved per revolution of its shaft — its **displacement** — so its flow is simply that displacement times how fast you spin it. Choose the displacement and the drive speed and you have chosen the flow.

So the decision this lesson settles is: **how large a pump displacement delivers the platform's 10 L/min at the speed the motor will spin it, and what type of pump best fits the job?** Get the displacement right and the platform gets exactly the flow it needs; the same calculation hands the shaft power and torque straight to Lesson 03, where the motor is chosen to drive it. The pump is where "how much fluid power" becomes a real, turning piece of iron.

## 2. Physical Intuition

Think of a bicycle pump: each stroke pushes a fixed volume of air, so the faster you pump, the more air per minute — the volume per stroke never changes, only the rate. A hydraulic pump is the same idea made continuous: it has a fixed **displacement**, a volume of oil it carries from inlet to outlet on every revolution, and spinning it faster simply repeats that scoop more often. Ten litres a minute from a small scoop just means spinning it fast; from a big scoop, spinning it slowly.

The commonest way to build that scoop is a pair of meshing gears: oil is trapped in the tooth gaps, carried around the outside from inlet to outlet, and squeezed out as the teeth re-mesh. It is simple, robust, and cheap — and it displaces the same volume every turn regardless of pressure. That last point matters: a **fixed-displacement** pump always delivers its full flow whenever it spins, whether the platform needs it or not. When the platform is just holding position and needs no flow, that oil has nowhere to go but over the relief valve — a thread we pick up in Lesson 04.

## 3. The Idea You Now Need

A pump's delivered flow is its displacement times its speed, reduced a little by internal leakage:

$$ Q = D\,n\,\eta_\text{vol} $$

Turn that around to size the pump — what displacement gives 10 L/min at the motor's 1450 rpm, given ~92 % volumetric efficiency:

$$ D = \frac{Q}{n\,\eta_\text{vol}} = \frac{10\,000\ \text{cm}^3/\text{min}}{1450\ \text{rpm} \times 0.92} \approx 7.5\ \text{cm}^3/\text{rev} $$

The pressure the pump works against sets the **torque** it demands from the motor, and hence the shaft power:

$$ T = \frac{D\,\Delta p}{2\pi\,\eta_\text{mech}}, \qquad P_\text{shaft} = \frac{P_\text{hyd}}{\eta_\text{pump}} $$

For the platform that is about **12 N·m** of torque and **1.85 kW** of shaft power — the load the motor in Lesson 03 must be sized to turn, continuously, at 1450 rpm.

## 4. Visual Explanation

<figure markdown>
  ![On the left, an external gear pump: two meshing gears in a housing, oil drawn in at the inlet, trapped in the tooth gaps, carried around the outside to the outlet, and pushed out as the teeth re-mesh — a fixed volume, the displacement, moved every revolution. A label shows displacement 7.5 cubic centimetres per revolution times 1450 rpm times 92 percent equals 10 litres per minute. On the right, a comparison of three pump types across pressure capability, efficiency, cost and flow smoothness: gear pumps cheap and robust to about 250 bar with some ripple; vane pumps quiet to about 175 bar; piston pumps highest pressure and efficiency and available as variable displacement, but costliest. A marker shows the platform's 100 bar / 10 L/min point sitting comfortably in gear-pump territory.](assets/m05-l2-pump.svg){ width="760" }
</figure>

On the left, the mechanism: meshing gears carry trapped oil from inlet to outlet, displacing a fixed **7.5 cm³ every revolution**; spun at 1450 rpm with 92 % volumetric efficiency that is exactly the **10 L/min** the platform needs. On the right, the type choice: gear pumps are cheap, robust, and good to ~250 bar (with some flow ripple); vane pumps are quieter to ~175 bar; piston pumps reach the highest pressures and efficiencies and can vary their displacement, but cost the most. The platform's modest **100 bar / 10 L/min** sits comfortably in gear-pump territory — so a fixed-displacement gear pump is the sensible, economical choice.

## 5. Engineering Example

The pump-type decision is a cost-versus-need judgement engineers make constantly. A machine that runs at 350 bar, or that spends most of its time holding pressure with no flow, earns its keep with an expensive variable-displacement piston pump: it only moves the oil actually needed, wasting little as heat. The platform is the opposite case — moderate pressure, and it is moving most of the time it is on — so the simplest positive-displacement pump, a gear pump, is the right answer. Paying for a piston pump here would buy efficiency the duty cycle never cashes in. Good engineering is matching the pump to the demand, not buying the fanciest one.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the platform's demand and a standard drive speed:

- Flow $Q = 10\ \text{L/min}$, working pressure $\Delta p = 100\ \text{bar}$
- Motor speed $n = 1450\ \text{rpm}$ (4-pole induction motor), $\eta_\text{vol} = 0.92$, $\eta_\text{pump} = 0.90$

**Find** — the pump displacement, the flow it actually delivers, and the shaft power and torque it demands.

**Assumptions**

- Steady operation at the working point; nominal efficiencies.

**Solution**

$$ D = \frac{Q}{n\,\eta_\text{vol}} = \frac{10\,000}{1450 \times 0.92} \approx 7.5\ \text{cm}^3/\text{rev} $$

Delivered flow, checking back:

$$ Q = D\,n\,\eta_\text{vol} = 7.5 \times 1450 \times 0.92 / 1000 \approx 10.0\ \text{L/min} \checkmark $$

$$ P_\text{shaft} = \frac{P_\text{hyd}}{\eta_\text{pump}} = \frac{1.67}{0.90} \approx 1.85\ \text{kW}, \qquad T = \frac{P_\text{shaft}}{\omega} = \frac{1852}{151.8} \approx 12.2\ \text{N·m} $$

**Result**

$$ \boxed{D \approx 7.5\ \text{cm}^3/\text{rev (fixed-displacement gear pump)};\quad P_\text{shaft} \approx 1.85\ \text{kW at }12\ \text{N·m}} $$

**Engineering Interpretation** — A 7.5 cm³/rev pump at 1450 rpm delivers the platform's 10 L/min almost exactly, the volumetric efficiency already accounted for. Because 100 bar is well within a gear pump's comfort zone and the platform runs most of the time, a fixed-displacement **gear pump** is the economical, reliable choice — no need for a variable pump's cost. The two numbers to carry forward are the **shaft power (1.85 kW)** and **torque (12 N·m)**: those are the load on the motor, and Lesson 03 sizes the motor to turn them continuously. Note the consequence of "fixed displacement": when the platform holds and needs no flow, the pump still delivers 10 L/min, which must escape over the relief valve — the subject of Lesson 04.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson02_pump.html" title="Sizing the pump — displacement, speed, flow" style="width:100%;height:840px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

Set the displacement and drive speed and watch the delivered flow. Find the pair that lands on 10 L/min — a small 7.5 cm³/rev pump at 1450 rpm — and see how a bigger scoop needs less speed and vice versa. Switch pump type and watch its pressure ceiling move against the platform's 100 bar operating point.

## 8. Coding Exercise

```python
def pump_flow(D_cc, n_rpm, eta_vol=0.92):
    return D_cc * n_rpm * eta_vol / 1000        # L/min

def size_displacement(Q_Lmin, n_rpm, eta_vol=0.92):
    return Q_Lmin * 1000 / (n_rpm * eta_vol)     # cc/rev

D = size_displacement(10, 1450)
print(round(D, 2), "cc/rev needed")              # ~7.5
print(round(pump_flow(D, 1450), 2), "L/min")     # ~10.0
print(round(pump_flow(D, 1450) , 2))             # delivered check
```

**Your task:** confirm ~7.5 cc/rev gives 10 L/min at 1450 rpm. Then: if you drove the same pump at 2900 rpm (a 2-pole motor) instead, what displacement would you need for 10 L/min — and what would that do to the pump's size, noise, and wear?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson02_quiz.html" title="The pump — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

1. Does a pump make pressure or flow? Where does pressure come from?
2. What is a pump's "displacement," and how does it set the flow?
3. Why does the pump need ~7.5 cm³/rev rather than exactly 6.9 to make 10 L/min at 1450 rpm?
4. Why is a fixed-displacement gear pump a sensible choice for this platform?
5. What happens to the pump's flow when the platform is just holding position and needs none?

## 10. Challenge Problem

A colleague proposes swapping the gear pump for a pressure-compensated variable-displacement piston pump, arguing it will save energy. For the platform's duty — moving most of the time at 100 bar, holding occasionally — quantify roughly when each pump wastes energy, explain where the fixed-displacement pump's wasted flow goes and what it becomes, and decide whether the variable pump's extra cost is justified here. What duty cycle would flip your answer?

## 11. Common Mistakes

- **Thinking the pump makes pressure.** It makes flow; pressure is what the flow meets. A pump pushing into an open line makes almost no pressure at all.
- **Sizing displacement without volumetric efficiency.** Use $D = Q/n$ and you will fall ~8 % short; leakage means you need $D = Q/(n\,\eta_\text{vol})$, about 7.5 not 6.9 cm³/rev.
- **Buying more pump than the duty needs.** A variable piston pump is superb at 350 bar or long holds, but wasted money on a moderate-pressure platform that runs most of the time.
- **Forgetting the fixed pump always delivers.** At hold it still pushes 10 L/min; that flow must go over the relief as heat. Design for it (Lessons 04–05), do not be surprised by it.

## 12. Key Takeaways

**The decision you can now make:** size the pump's displacement for the platform's flow, know the shaft power and torque it demands, and choose a pump type matched to the duty.

- A pump makes **flow, not pressure**: $Q = D\,n\,\eta_\text{vol}$.
- The platform needs $D = Q/(n\,\eta_\text{vol}) \approx \mathbf{7.5\ cm^3/rev}$ at 1450 rpm to deliver 10 L/min.
- That demands **~1.85 kW of shaft power at ~12 N·m** — the load handed to the motor in Lesson 03.
- A **fixed-displacement gear pump** fits the platform's moderate pressure and mostly-moving duty; a variable piston pump would be costly overkill here.
- Fixed displacement means the pump **always delivers its full flow** — at hold that flow escapes over the relief valve. **Lesson 03 sizes the motor** to drive this pump.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — displacement and flow

```
Explain how a positive-displacement hydraulic pump works and why its flow is Q = D * n * eta_vol (displacement times speed times volumetric efficiency). Using the platform's demand of 10 L/min at 1450 rpm and 92% volumetric efficiency, size the displacement, and explain why you need about 7.5 cc/rev rather than the ideal 6.9.
```

**Challenge** — pump types

```
Compare gear, vane, and axial-piston hydraulic pumps on pressure capability, efficiency, flow ripple, cost, and fixed-versus-variable displacement. For a machine needing 10 L/min at 100 bar that runs most of the time, explain why a fixed-displacement gear pump is usually the right choice, and what duty would justify a variable piston pump instead.
```

**Explore** — torque and power

```
Show how the pressure a hydraulic pump works against sets the torque it demands, T = D*dp/(2*pi*eta_mech), and how that relates to the shaft power P = P_hyd/eta_pump. For 7.5 cc/rev at 100 bar and 1450 rpm, compute the torque and shaft power, and explain how these become the specification for the electric motor that drives the pump.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 05 Lesson 02 — The pump.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The pump is sized and chosen — a 7.5 cm³/rev gear pump making 10 L/min, demanding 1.85 kW at 12 N·m. Next: Lesson 03 — The electric motor, the prime mover sized to turn this pump continuously.*
