!!! abstract "You are here"
    **Module 05 — Power Units**  ·  **Unit 1 — The Power Unit**  ·  **Lesson 03 — The electric motor**

# Lesson 03 — The electric motor

> **Module 05 · Lesson 03** · *The prime mover that drives the pump.*
> Lesson 02 sized the pump and found what it demands: 1.85 kW of shaft power at 12 N·m, turning at 1450 rpm. Something has to turn it, continuously, for years. This lesson chooses that something — the electric motor — and closes the loop from the wall socket to the fluid.
>
> **Learning outcome:** Match an electric motor to the pump's power, torque, and speed; pick the next standard motor size with sensible margin; and account for the electrical power it draws and the heat it adds.

---

## 1. Why This Matters

The pump is a passive lump of iron until something spins its shaft. That something is the electric motor — the *prime mover* that takes electrical energy from the supply and delivers rotating mechanical power to the pump. It is the first component in the whole chain that touches the wall, and the last degree of freedom in the power train: choose it and the path from mains electricity to pressurised oil is complete.

So the decision this lesson settles is: **what motor will turn this pump — how much power, at what speed, with what margin — and how much electricity will it draw?** The pump already told you its appetite: 1.85 kW at 1450 rpm. The motor must supply that continuously, with enough headroom to start the pump and ride out the moments the platform works hardest, without being so oversized that it wastes money and runs inefficiently. Getting it right finishes the energy story that began with 1.67 kW of fluid power in Lesson 01.

## 2. Physical Intuition

An electric motor trades electricity for torque at a speed. Two things about it decide the choice. First, its **speed** is set mostly by how it is built and the mains frequency: a common four-pole induction motor settles at about 1450 rpm on 50 Hz mains — which is exactly why Lesson 02 sized the pump at 1450 rpm. The motor and pump share one shaft, so their speeds are the same; you pick the motor's pole count to get the speed you want, then size the pump's displacement to that speed. Second, its **power** must at least equal what the pump draws, with margin: the motor has to not only run the pump steadily but also *start* it — overcoming stiction and inertia — which briefly needs more torque than running does.

Motors do not come in every size; they come in a standard ladder — 0.75, 1.1, 1.5, 2.2, 3.0 kW and so on. You do not order "1.85 kW"; you take the **next size up** that covers the demand, which here is 2.2 kW. That step gives you starting torque and a safety margin for free, at the cost of running a little below the motor's rated point — a good trade. And because the motor is only about 90 % efficient, it draws more electricity than it delivers, the difference becoming heat.

## 3. The Idea You Now Need

The motor must **output** the pump's shaft power at the pump's speed, so its rated torque comes from the same relation as before:

$$ T = \frac{P}{\omega}, \qquad \omega = \frac{2\pi n}{60} $$

The pump demands 1.85 kW at 1450 rpm ($\omega = 151.8\ \text{rad/s}$), i.e. 12.2 N·m. Choosing the **next standard size at or above 1.85 kW** gives a 2.2 kW motor, whose rated torque is

$$ T_\text{rated} = \frac{2200}{151.8} = 14.5\ \text{N·m} \quad (\text{vs. } 12.2\ \text{N·m load} \Rightarrow 1.19\times\ \text{margin}) $$

Because the motor is ~90 % efficient, the electrical power it draws from the supply is its output divided by efficiency:

$$ P_\text{elec} = \frac{P_\text{shaft}}{\eta_\text{motor}} = \frac{1852}{0.90} \approx 2.06\ \text{kW} $$

— the same 2 kW Lesson 01 predicted. The 0.21 kW the motor loses, plus the 0.19 kW the pump loses, is the 0.39 kW of heat the reservoir must shed.

## 4. Visual Explanation

<figure markdown>
  ![On the left, the power train from the wall: 2.06 kilowatts of electrical power enters a 2.2 kilowatt four-pole motor, which outputs 1.85 kilowatts of shaft power at 1450 rpm through a coupling to the pump, which delivers 1.67 kilowatts of hydraulic power; the small losses, 0.21 kilowatts at the motor and 0.19 at the pump, leave as 0.39 kilowatts of heat. On the right, the standard motor-size ladder — 0.75, 1.1, 1.5, 2.2, 3.0 kilowatts — with the pump's 1.85 kilowatt demand landing between 1.5 and 2.2, so the 2.2 kilowatt size is chosen, and a torque bar shows its 14.5 newton-metre rating comfortably above the 12.2 newton-metre load.](assets/m05-l3-motor.svg){ width="760" }
</figure>

On the left, the finished power train: **2.06 kW** enters the motor from the wall, **1.85 kW** leaves its shaft to the pump, and **1.67 kW** of fluid power reaches the cylinder — the losses along the way (0.21 kW motor, 0.19 kW pump) summing to the **0.39 kW of heat** from Lesson 01. On the right, the choice itself: the pump's 1.85 kW demand falls between the 1.5 and 2.2 kW standard sizes, so you take **2.2 kW**; its 14.5 N·m rated torque clears the 12.2 N·m load with room to start the pump. The motor is the piece that finally connects the wall to the ±1 mm platform.

## 5. Engineering Example

Picking the next size up is the same instinct that stops you buying an engine that can *just* pull a full trailer on the flat. You size for the hard moment — the hill start, the cold morning, the maximum load — not the easy cruise, because a prime mover with no margin stalls exactly when you need it. For the motor, the hard moment is **starting**: an induction motor must break the pump's stiction and accelerate its inertia, briefly demanding well above its running torque. A 2.2 kW motor's healthy starting torque handles that; a motor sized to exactly 1.85 kW might struggle to start on a cold day with thick oil. Margin is not waste — it is the difference between a unit that always starts and one that sometimes does not.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the pump's demand from Lesson 02:

- Shaft power $P_\text{shaft} = 1.85\ \text{kW}$ at $n = 1450\ \text{rpm}$, load torque 12.2 N·m
- Motor efficiency $\eta_\text{motor} \approx 0.90$; standard sizes 0.75, 1.1, 1.5, **2.2**, 3.0 kW

**Find** — the motor size, its rated torque and margin, and the electrical power it draws.

**Assumptions**

- Four-pole induction motor (~1450 rpm on 50 Hz), continuous (S1) duty.

**Solution**

Next standard size at or above 1.85 kW is **2.2 kW**. Its rated torque:

$$ T_\text{rated} = \frac{2200}{151.8} = 14.5\ \text{N·m} \quad\Rightarrow\quad \frac{14.5}{12.2} = 1.19\times\ \text{the load} $$

Electrical draw at the operating load (not the rating):

$$ P_\text{elec} = \frac{1852}{0.90} \approx 2058\ \text{W} \approx 2.06\ \text{kW} $$

**Result**

$$ \boxed{\text{2.2 kW, 4-pole, }\sim1450\ \text{rpm, continuous};\quad \text{draws }\approx2.06\ \text{kW},\ 1.19\times\ \text{torque margin}} $$

**Engineering Interpretation** — A 2.2 kW four-pole induction motor is the answer: it outputs the pump's 1.85 kW comfortably, its 14.5 N·m rated torque clears the 12.2 N·m load with enough left to start the pump against cold oil, and it settles at the ~1450 rpm the pump was sized for. It draws about 2.06 kW from the wall at load — precisely Lesson 01's prediction — losing ~0.21 kW as heat, which with the pump's ~0.19 kW makes the 0.39 kW the reservoir must handle. The power train is now complete from socket to cylinder: 2.06 kW electrical in, 1.67 kW hydraulic out. What remains is to protect it (the relief valve) and to hold and cool the oil (the reservoir).

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson03_motor.html" title="Sizing the motor — standard sizes and margin" style="width:100%;height:840px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

Set the pump's shaft-power demand and watch which standard motor size is selected — always the next rung up — with its torque margin and the electrical power it draws. Find the platform's 1.85 kW and confirm a 2.2 kW motor, 1.19× torque margin, and ~2.06 kW at the wall. Push the demand just over a rung and watch the choice jump to the next size.

## 8. Coding Exercise

```python
import math
STD = [0.75, 1.1, 1.5, 2.2, 3.0, 4.0, 5.5, 7.5]   # standard motor sizes, kW

def choose_motor(P_shaft_kW, n_rpm=1450, eta_motor=0.90):
    size = next(s for s in STD if s >= P_shaft_kW)   # next size up
    w = n_rpm * 2*math.pi/60
    T_rated = size*1000 / w
    P_elec  = P_shaft_kW/eta_motor
    return size, round(T_rated,1), round(P_elec,2)

print(choose_motor(1.85))     # (2.2, 14.5, 2.06)
```

**Your task:** confirm 1.85 kW selects a 2.2 kW motor drawing ~2.06 kW. Then: at what pump shaft power would the choice jump to 3.0 kW, and what flow or pressure increase (from Lessons 01–02) would push it there?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson03_quiz.html" title="The electric motor — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

1. What must the motor's output power at least equal, and why pick the next standard size up?
2. Why is the pump driven at 1450 rpm — where does that number come from?
3. The pump needs 1.85 kW. Why draw ~2.06 kW from the wall?
4. Why does the motor need torque margin beyond the running load?
5. Where does the ~0.39 kW of heat in the power unit come from?

## 10. Challenge Problem

A technician fits a 1.5 kW motor "to save energy," reasoning that the pump only needs 1.85 kW briefly. Explain what will actually happen — at start-up on a cold morning, and during continuous running — and why this is a false economy. Then explain the opposite error: why fitting a 5.5 kW motor is also wrong, considering efficiency, power factor, and cost. What makes 2.2 kW the right answer?

## 11. Common Mistakes

- **Sizing the motor to the exact demand.** 1.85 kW is a demand, not a motor size. Take the next standard rung (2.2 kW) for starting torque and margin.
- **Confusing the motor's rating with its draw.** A 2.2 kW motor loaded to 1.85 kW draws ~2.06 kW, not 2.44 kW — power drawn follows the *load*, divided by efficiency.
- **Ignoring starting torque.** Running torque is not the worst case; starting the pump against cold, thick oil is. A motor with no margin can fail to start.
- **Forgetting the motor makes heat too.** Motor losses (~0.21 kW) add to pump losses (~0.19 kW); the reservoir must shed both.

## 12. Key Takeaways

**The decision you can now make:** choose the motor that drives the pump — its power, speed, and margin — and know the electricity it draws.

- The motor is the **prime mover**: it outputs the pump's shaft power (**1.85 kW**) at the pump's speed (**1450 rpm**, set by its 4 poles).
- Motors come in standard sizes; take the **next rung up** → a **2.2 kW** motor, with 14.5 N·m rated torque vs the 12.2 N·m load (**1.19× margin** to start and run).
- At load it **draws ~2.06 kW** from the wall (output ÷ 0.90) — exactly Lesson 01's figure.
- Motor loss (~0.21 kW) + pump loss (~0.19 kW) = the **0.39 kW of heat** the reservoir must shed.
- The power train is complete — **2.06 kW electrical in → 1.67 kW hydraulic out**. **Lesson 04 protects it with the relief valve.**

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — sizing the motor

```
Explain how to size an electric motor to drive a hydraulic pump: why the motor's output power must at least equal the pump's shaft power, how the speed is set by pole count and mains frequency (e.g. 4-pole ~1450 rpm at 50 Hz), and why you pick the next standard size up. Use a pump needing 1.85 kW at 1450 rpm and show why a 2.2 kW motor is chosen.
```

**Challenge** — rating versus draw

```
Clarify the difference between an electric motor's power *rating* and the power it *draws* under a given load. A 2.2 kW motor drives a pump needing 1.85 kW of shaft power at 90% motor efficiency. How much does it draw from the supply, how much heat does it make, and why is drawing 2.06 kW (not 2.44 kW) the correct figure?
```

**Explore** — starting torque and duty

```
Explain why an electric motor driving a hydraulic pump needs torque margin above the running load, focusing on starting torque against stiction, inertia, and cold thick oil. What is continuous (S1) duty, and why does a hydraulic power-unit motor need it? How do these considerations guide the choice between motor sizes?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 05 Lesson 03 — The electric motor.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The power train is complete — a 2.2 kW motor turns the pump at 1450 rpm, drawing ~2 kW from the wall to deliver 1.67 kW of fluid power. Next: Lesson 04 — The relief valve, the safety limit that caps the pressure and catches the flow the platform is not using.*
