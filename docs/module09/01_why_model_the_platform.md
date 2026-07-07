!!! abstract "You are here"
    **Module 09 — Modeling & Simulation**  ·  **Unit 1 — The Modeling Mindset**  ·  **Lesson 01 — Why model the platform**

# Lesson 01 — Why model the platform

> **Module 09 · Lesson 01** · *Predict before you build.*
> Before wrapping a controller around a two-tonne machine, build a model of it. This lesson makes the case for simulation and defines what a model is: equations that turn a command into predicted motion.
>
> **Learning outcome:** Explain why a model is built before hardware, describe what a model of the platform is (a map from command to predicted position and pressure), and distinguish a simple kinematic estimate from a dynamic model.

---

## 1. Why This Matters

You now have a plant — command in, position and pressure out — and a clear next goal: make it hold ±1 mm. The tempting move is to build the controller straight onto the real machine and tune by trial. That is slow, expensive, and, with two tonnes moving, unsafe: every experiment risks the hardware and the people near it, and every design change means physical rework. There is a better order of operations. Build a *model* of the platform first — a set of equations that reproduce how the real machine turns a command into motion — and do the experimenting in software, where a mistake costs a re-run, not a rebuild.

So the decision this lesson makes is: **should we model the platform before building and controlling it, and what exactly is that model?** The answer is yes, and the model is a map: give it a command over time and it predicts the position and pressure over time, the same signals the real plant reports. With that map you can answer the mission question — *will it raise the load the required height in the required time, without exceeding its pressure limits?* — before anything is built, and later you can design and tune the controller against the model instead of the machine. The model is the machine made cheap to experiment on.

## 2. Physical Intuition

A model is just the physics you already know, written down so a computer can step it forward in time. You know the command sets a flow, the flow drives the piston, the piston carries the two-tonne load, and the pressure is what it takes to move that load. Put those cause-and-effect links into equations and you have a little virtual platform: type in a command history and it plays out the resulting motion, exactly as the real one would, but in milliseconds and with no risk. Change the load, the flow, the command — the virtual platform responds, and you learn what the real one would do without touching it.

The subtlety is *how much* physics to include. The simplest model ignores mass entirely: command 100% and the platform instantly moves at 85 mm/s, so raising it 500 mm just takes 500/85 ≈ 5.9 s. That kinematic estimate is often close — but it hides the fact that a two-tonne mass cannot start instantly; it must *accelerate*, and the pressure must build to push it. A dynamic model adds Newton's law and the pressure build-up, and now the platform ramps up to speed over a tenth of a second before cruising. For this platform the difference is tiny (5.93 s vs 5.9 s), but the dynamic model is the one that also predicts the pressure peaks, the response lag, and how the platform will behave under a controller — the things the kinematic guess cannot see. Choosing the right fidelity is the modeler's craft: as simple as possible, but no simpler than the question demands.

## 3. The Idea You Now Need

A model is a function from a command history to predicted outputs:

$$ u(t) \;\longmapsto\; \big(x(t),\ p(t)\big) $$

The **kinematic** model keeps only the flow-to-speed link and integrates it:

$$ v = v_\text{max}\,u, \qquad x(t) = \int_0^t v\,dt', \qquad t_\text{reach} = \frac{h}{v_\text{max}\,u} = \frac{500\ \text{mm}}{85\ \text{mm/s}} \approx 5.9\ \text{s} $$

The **dynamic** model adds Newton's law for the mass and the hydraulics for pressure, so the platform accelerates rather than jumping to speed:

$$ m\,\ddot{x} = p\,A_\text{cap} - m g - F_\text{fric}, \qquad a_\text{max}=\frac{p A_\text{cap}-mg}{m}\approx\frac{1782\ \text{N}}{2000\ \text{kg}}\approx 0.9\ \text{m/s}^2 $$

The mass reaches 85 mm/s in $v_\text{max}/a \approx 0.1$ s over ~4 mm, then cruises — giving ~5.93 s to climb 500 mm, barely different from the kinematic 5.9 s here, but now with pressure and transient predicted too. The rule of fidelity: use the **kinematic** model for a quick arrival-time sanity check, the **dynamic** model when pressure, transients, or control behaviour matter — which they will, in Module 10.

## 4. Visual Explanation

<figure markdown>
  ![Two panels. On the left, the modeling loop: the physical platform is abstracted into model equations (Newton's law for the mass plus hydraulics for flow and pressure); the equations are run as a simulation; the simulation predicts position and pressure over time; and those predictions are checked against the real platform, feeding back to refine the equations. On the right, a plot of predicted height versus time for a 500 mm raise: the kinematic model is a straight line from the origin reaching 500 mm at about 5.9 seconds, while the dynamic model is the same line but with a brief curved acceleration at the start, reaching 500 mm at about 5.93 seconds; the two are nearly on top of each other, with a callout noting the dynamic model also predicts the pressure and transient the kinematic one cannot.](assets/m09-l1-model.svg){ width="720" }
</figure>

The left panel is the whole discipline in a loop: **abstract** the machine into equations, **run** them as a simulation, **predict** the motion, and **check** against reality to refine. The right panel shows why fidelity is a choice: for a simple arrival-time question the kinematic straight line and the dynamic curve are almost identical — the two-tonne mass accelerates so quickly here that the transient is a blip. But only the dynamic model carries the extra information — the pressure history, the startup lag — that a controller will need. Same mission, two models: pick the simplest one that answers your question, and reach for the richer one when the question gets harder.

## 5. Engineering Example

Simulating before building is standard practice across engineering precisely because the alternative is so costly: aircraft flight-control laws, car suspensions, robot arms, and hydraulic machines are all modeled and simulated long before a prototype exists. Teams run thousands of virtual missions — full loads, cold oil, failed sensors, aggressive commands — catching problems that would be dangerous or ruinous to discover on hardware, and sizing components against the worst case the simulation reveals. When the controller is finally written, it is developed and tuned against the model first, so the first time it touches the real machine it already roughly works. The payoff is not just safety and cost; it is *speed*: a parameter that takes a day to change in steel takes a second in simulation, so a team can explore a hundred designs in the time one physical build would take. The model is where the engineering thinking happens; the hardware is where it is confirmed.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — raise the 2 t load 500 mm at full command; $v_\text{max}=85$ mm/s; working pressure ~109 bar; cap area 1963.5 mm².

**Find** — the kinematic arrival time, the acceleration and its duration, and the dynamic arrival time.

**Assumptions**

- Full command holds 85 mm/s once up to speed; net force accelerates the mass to that speed.

**Solution**

$$ t_\text{kin} = \frac{500\ \text{mm}}{85\ \text{mm/s}} = 5.9\ \text{s} $$
$$ a = \frac{pA_\text{cap}-mg}{m} = \frac{21402-19620}{2000} = 0.89\ \text{m/s}^2,\quad t_\text{acc}=\frac{0.085}{0.89}=0.10\ \text{s},\quad d_\text{acc}=\tfrac12 a t_\text{acc}^2 \approx 4\ \text{mm} $$
$$ t_\text{dyn} = t_\text{acc} + \frac{500-4}{85} = 0.10 + 5.83 = 5.93\ \text{s} $$

**Result**

$$ \boxed{\text{Kinematic } 5.9\text{ s; dynamic } 5.93\text{ s — the transient adds }\sim0.1\text{ s and }\sim4\text{ mm}} $$

**Engineering Interpretation** — For the arrival-time question, the kinematic model is entirely adequate: 5.9 s versus 5.93 s is a rounding error, because a two-tonne mass with ~1800 N of spare force accelerates to speed in a tenth of a second. That is a genuine finding, not a shortcut — it tells you the platform is *flow-limited*, not force-limited, so its speed is set by the pump, not the load, and a bigger motor would not make it faster. But notice what the kinematic model stayed silent about: the pressure during acceleration (higher than the 100 bar hold, because it takes extra force to accelerate), and how the platform responds when a controller starts nudging the command. Those are exactly the questions Module 10 will ask, and only the dynamic model answers them. So this lesson's real lesson is about *matching model to question*: the kinematic model already told us the mission is feasible in time; the dynamic model — built next — will tell us how to control it. Building both, and knowing which to trust when, is the modeling skill.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson01_model.html" title="Why model — kinematic vs dynamic prediction" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson01_model.html)

Set the raise height and command, and compare the kinematic and dynamic predictions of the arrival time and the motion. Watch the dynamic model's brief acceleration and see how close the two agree — and where the dynamic one carries extra information the kinematic one cannot.

## 8. Coding Exercise

```python
v_max, m, g, A = 0.085, 2000.0, 9.81, 1963.5e-6   # SI
p_work = 109e5

def t_kinematic(h, u=1.0):  return h / (v_max * u)          # ignores mass

def t_dynamic(h, u=1.0):                                     # adds acceleration
    a = (p_work*A - m*g) / m
    t_acc = v_max*u / a
    d_acc = 0.5 * a * t_acc**2
    return t_acc + (h - d_acc) / (v_max*u)

for h in (0.10, 0.50):
    print(f"h={h*1000:3.0f} mm:  kinematic {t_kinematic(h):.2f}s   dynamic {t_dynamic(h):.2f}s")
```

**Your task:** confirm the two models agree within ~0.1 s for a 500 mm raise. Then answer in a comment: for what kind of question would the small difference between them actually matter, and why?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson01_quiz.html" title="Why model the platform — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson01_quiz.html)

1. Why build a model before building and controlling the real platform?
2. What is a model of the platform, in terms of inputs and outputs?
3. What does the kinematic model include and ignore, and what arrival time does it give for a 500 mm raise?
4. What does the dynamic model add, and why is the difference small here?
5. When should you reach for the dynamic model rather than the kinematic one?

## 10. Challenge Problem

A colleague argues that since the kinematic and dynamic models agree within 0.1 s for the 500 mm raise, the dynamic model is a waste of effort and the team should skip straight to building. Give two distinct scenarios where the kinematic model's agreement is misleading and the dynamic model is essential — one involving the platform's pressure, one involving the controller to be built in Module 10 — and explain what the kinematic model structurally cannot represent. Then state the principle for choosing model fidelity.

## 11. Common Mistakes

- **Building first, modeling never.** Tuning a controller on a two-tonne machine is slow, costly, and unsafe; model first.
- **Assuming more fidelity is always better.** A needlessly complex model is harder to build, run, and trust; match fidelity to the question.
- **Trusting the kinematic model for dynamics.** It cannot represent acceleration, pressure transients, or control response — reach for the dynamic model there.
- **Forgetting the model must match *this* machine.** A model with wrong parameters predicts the wrong platform; it must use the real numbers.

## 12. Key Takeaways

**The decision you can now make:** decide to model the platform before building it, and choose the fidelity the question demands.

- **Model first, build second** — experiment in software where mistakes cost a re-run, not a rebuild, and the machine stays safe.
- A **model** maps a command history to predicted outputs: $u(t)\mapsto(x(t),p(t))$.
- The **kinematic** model ($v=85u$) answers arrival time — ~5.9 s for 500 mm — but ignores mass and pressure.
- The **dynamic** model (Newton + hydraulics) adds acceleration and pressure; here it barely changes the time (~5.93 s) but carries what a controller needs.
- **Match fidelity to the question.** **Lesson 02 builds the dynamic equations of motion.**

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — model before machine

```
Explain why engineers build and simulate a mathematical model of a hydraulic platform before building and controlling the real machine. What does a model let you do (predict arrival time and pressures, test control safely, iterate cheaply) that build-and-test cannot? Use a 2-tonne, 500 mm, 85 mm/s raise as the example.
```

**Challenge** — kinematic vs dynamic

```
For a hydraulic platform raising 2 t by 500 mm at 85 mm/s, a kinematic model gives ~5.9 s and a dynamic model (Newton + hydraulics) gives ~5.93 s. Explain what each model includes and ignores, why they agree so closely here (the platform is flow-limited), and two situations where only the dynamic model suffices.
```

**Explore** — model fidelity

```
Discuss how to choose the fidelity of an engineering model: as simple as possible but no simpler than the question demands. Use a hydraulic lift platform to contrast a kinematic model (speed = command x max) with a dynamic model (mass acceleration + pressure build-up), and explain what each is good and bad for.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 09 Lesson 01 — Why model the platform.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*A model is the platform made cheap to experiment on — a map from command to predicted motion. Next: Lesson 02 — The equations of motion, where we write Newton's law and the hydraulics that make the model dynamic.*
