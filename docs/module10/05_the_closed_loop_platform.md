!!! abstract "You are here"
    **Module 10 — Control Systems**  ·  **Unit 3 — Making It Robust**  ·  **Lesson 05 — The closed-loop platform**

# Lesson 05 — The closed-loop platform

> **Module 10 · Lesson 05** · *±1 mm, held.*
> Everything comes together: the driven-and-sensed platform, the validated model, and the tuned controller. This lesson runs the full closed-loop mission — reaching the commanded height and holding it to ±1 mm — and closes Module 10.
>
> **Learning outcome:** Run the complete closed-loop platform through its mission — reaching a commanded height, holding it to ±1 mm, and rejecting a load disturbance — and confirm the curriculum's central goal is met.

---

## 1. Why This Matters

This is the moment the whole curriculum has been building toward. Every module added a piece: the fluid and the cylinder that make force and motion, the power unit and valves that supply and direct it, the circuit that assembles them, the electrical command and sensing that make it a plant, the model that predicts it, and the controller that governs it. Now they run together as one closed-loop machine, and the question is simply whether it does the job — raise two tonnes to a commanded height and hold it to ±1 mm, the specification set at the very start. Seeing the complete loop meet that number, end to end, is the payoff of everything that came before.

So the decision this lesson makes is: **does the fully controlled platform meet its ±1 mm target — reaching the commanded height and holding it, even under disturbance?** Running the closed loop, the answer is yes. The controller drives the platform along a smooth motion profile to 500 mm, arriving in about six seconds and settling to within a hundredth of a millimetre — not the fifteen-millimetre miss of the open-loop machine, but dead on target. Then, when a load disturbance shoves it downward mid-hold, the integral action quietly winds in the extra command and returns it to target with zero steady error. Reaches the height, holds it far inside ±1 mm, rejects the disturbance, and stays stable with the margin from tuning: the platform does exactly what it was designed to do. What leaves this module is not just a working controller but a complete, controlled machine — ready for Module 11 to watch it run with a live digital model.

## 2. Physical Intuition

Watch the full mission play out. The controller does not simply slam the command to full and hope — it follows a planned motion profile, easing the platform up to speed, cruising at 85 mm/s, and easing back down as it nears the target, so it arrives gently rather than overshooting. All the while the feedback loop trims any small error between where the profile says it should be and where the sensor says it is. The result is a clean approach: the platform glides to 500 mm and stops, settled within a hundredth of a millimetre, without the ringing the raw oil spring would give or the overshoot a careless controller would cause. This is the combination of everything — a smooth plan for the gross motion, feedback for the precision.

Then comes the real test: holding. A two-tonne load does not sit politely; seals leak, temperature shifts, and here a deliberate disturbance pushes the platform down. Open-loop, it would simply sag and stay sagged. Closed-loop, the moment the position drifts below target the error grows, the proportional term pushes back immediately, and the integral term accumulates until it supplies exactly the extra holding command the disturbance demands — and the platform returns precisely to target, error driven to zero. The derivative term keeps that correction from overshooting, and the tuning margin means none of this tips into oscillation. What you are watching is the difference between a machine that goes roughly where told and one that holds exactly where commanded against whatever the world does to it. That difference — ±1 mm, held and defended — is the entire point of control, and of this curriculum.

## 3. The Idea You Now Need

The complete closed loop combines a **motion profile** (feedforward) with **PID feedback**, tracking a moving setpoint $x_\text{sp}(t)$:

$$ u = \underbrace{\frac{v_\text{sp}}{v_\text{max}}}_{\text{feedforward}} + \underbrace{K_p e + K_i\!\int e\,dt + K_d\frac{de}{dt}}_{\text{feedback trim}}, \qquad e = x_\text{sp}(t)-x $$

Because the profile ramps the setpoint gently to 500 mm, the error stays small throughout and the platform arrives without overshoot:

$$ \text{reaches } \pm1\ \text{mm at } t\approx6.1\ \text{s}, \qquad \text{hold error} \le 0.02\ \text{mm} \;(\ll\pm1\ \text{mm}) $$

Under a sustained load disturbance mid-hold, the integral drives the steady error to zero:

$$ \text{disturbance } -4\ \text{mm/s at hold} \;\Rightarrow\; \text{recovers to } 0.00\ \text{mm} $$

with the tuned gains $K_p=0.15,K_i=0.4,K_d=0.01$ and their 2.7× gain margin keeping it stable. Compare the open-loop result from Module 09:

$$ \text{open-loop: } \sim15\ \text{mm off, drifts} \quad\longrightarrow\quad \text{closed-loop: on target, holds } \pm1\ \text{mm, rejects load} $$

The specification set at the start of the curriculum — raise 2 t to a commanded height, hold ±1 mm — is met.

## 4. Visual Explanation

<figure markdown>
  ![The complete closed-loop platform running its mission. At the top, the full control loop: a motion-profile setpoint enters a summing junction, the error feeds the PID controller (Kp 0.15, Ki 0.4, Kd 0.01), which commands the valve and platform; the position sensor feeds back, and a feedforward path adds the profile velocity. Below, the mission trajectory over about eleven seconds: position rises smoothly along the profile to 500 mm and settles exactly on target within a narrow plus-or-minus 1 mm band, far tighter than the band; at about 8 seconds a downward load disturbance dips the position briefly below target, and the controller returns it to target within a second. An inset compares open-loop, arriving 15 mm high and drifting, with closed-loop, holding dead on target. A verdict panel: reaches height tick, holds plus or minus 1 mm tick (0.01 mm actual), rejects disturbance tick, stable with 2.7 times margin tick.](assets/m10-l5-closed-loop.svg){ width="720" }
</figure>

The top shows the complete loop, every block earned across the curriculum: the motion profile for the planned move, the PID for the trim, the valve and platform as the plant, the sensor closing the loop, and feedforward smoothing the whole. The trajectory below is the proof: the position rides the profile up to 500 mm and settles *inside* a ±1 mm band so tightly the line barely leaves the centre — a hundredth of a millimetre, not the band's full width. When the load disturbance hits, the position dips, and the loop drives it straight back to target. The open-loop-versus-closed-loop inset is the before-and-after of the entire control module: 15 mm off and drifting becomes dead-on and held. The verdict panel collects the win — reaches, holds, rejects, stable — the ±1 mm specification met on every count.

## 5. Engineering Example

A complete position servo like this — motion profile for the gross move, PID with feedforward for precision, tuned with margin against the plant's resonance — is the standard architecture for precision hydraulic and electric motion everywhere: machine-tool axes, robotic joints, injection-moulding, material-test frames, and precision lifts. The two-part structure is deliberate and universal: feedforward (the profile) handles the large, predictable motion efficiently, while feedback (the PID) handles the small, unpredictable errors — disturbances, model inaccuracy, drift — that feedforward alone cannot. Splitting the job this way is what lets a machine be both fast on the gross move and exact on the final hold, and it is why raw feedback with no profile tends to overshoot while raw feedforward with no feedback drifts. The disturbance-rejection behaviour shown here is the property that matters most in service: a machine that holds position under changing load, temperature, and wear, without a human touching it, is the whole promise of automatic control. The platform now embodies that promise — and the same architecture, understood here on one lift, scales to any motion system the engineer will meet.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the tuned closed loop ($K_p=0.15,K_i=0.4,K_d=0.01$, 2.7× margin) with a motion profile to 500 mm; a −4 mm/s load disturbance applied during the hold.

**Find** — the arrival time and hold error, the disturbance recovery, and the contrast with open-loop.

**Assumptions**

- Profile ramps the setpoint to target; PID trims; anti-windup during the move.

**Solution**

$$ \text{arrival: } t\approx6.1\ \text{s}, \qquad \text{hold error} \le 0.02\ \text{mm} \ll \pm1\ \text{mm} $$
$$ \text{disturbance } -4\ \text{mm/s} \Rightarrow \text{position dips, integral restores it to } 0.00\ \text{mm} $$
$$ \text{open-loop } \sim15\ \text{mm off} \;\longrightarrow\; \text{closed-loop on target} $$

**Result**

$$ \boxed{\text{Reaches } 500\text{ mm in } 6.1\text{ s, holds } \le0.02\text{ mm, rejects load} \to \pm1\text{ mm met}} $$

**Engineering Interpretation** — Every design choice across the module shows up in this one run. The **motion profile** gives the clean, overshoot-free arrival — without it, the full-speed approach would overshoot ~2 mm as the mass coasts past target. The **proportional** term gives the immediate stiffness that resists the disturbance the instant it appears. The **integral** term does the decisive work of holding: it winds in exactly the extra command the −4 mm/s load demands, driving the steady error to zero where proportional alone would leave a droop. The **derivative** term and the **tuning margin** keep all of this damped and stable, so the correction settles cleanly rather than ringing. The contrast with the open-loop machine from Module 09 — 15 mm off and drifting versus dead-on and held — is the measure of what feedback bought: not a small improvement but a categorical one, from *approximately* to *exactly*. The ±1 mm specification that opened the curriculum is now met by a complete, controlled machine, achieved by understanding every layer beneath it. What remains is not to make it work but to watch it work: Module 11 places a live digital model beside the running platform to confirm, continuously, that the real machine behaves as this one was designed to.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson05_closed_loop.html" title="The closed-loop platform — run the full mission" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson05_closed_loop.html)

Run the full closed-loop mission: watch the platform track its profile to 500 mm and settle inside ±1 mm. Then hit it with a load disturbance and see the controller drive it straight back to target — the curriculum's goal, in action.

## 8. Coding Exercise

```python
vmax, wn, zeta, dt = 85.0, 77.0, 0.12, 1e-4
Kp, Ki, Kd, target = 0.15, 0.4, 0.01, 500.0

def profile(t, tr=0.3):                              # trapezoidal setpoint 0 -> target
    a = vmax/tr; dr = 0.5*a*tr*tr; tc = (target-2*dr)/vmax
    if t < tr:        return 0.5*a*t*t, a*t
    if t < tr+tc:     return dr+vmax*(t-tr), vmax
    if t < 2*tr+tc:   td=t-tr-tc; return dr+vmax*tc+vmax*td-0.5*a*td*td, vmax-a*td
    return target, 0.0

def mission(dist_at=8.0, dist=-4.0, T=12.0):
    x=v=w=I=t=0.0; eprev=0.0; hold=0.0
    while t < T:
        xsp, vsp = profile(t); e = xsp - x; de=(e-eprev)/dt; eprev=e
        d = dist if t >= dist_at else 0.0
        u = vsp/vmax + Kp*e + Ki*I + Kd*de
        u = max(-1, min(1, u))
        if abs(u) < 0.999: I += e*dt                 # anti-windup
        dv, dw = w, wn*wn*(vmax*u + d - v) - 2*zeta*wn*w
        v+=dv*dt; w+=dw*dt; x+=v*dt; t+=dt
        if t > 6.5 and t < dist_at: hold = max(hold, abs(target-x))
    return hold, target-x

hold, final = mission()
print(f"hold error {hold:.3f} mm (<1), final after disturbance {final:.3f} mm")
```

**Your task:** confirm the platform holds inside ±1 mm and recovers from the disturbance. Then answer in a comment: which single term does the decisive work of returning the platform to target after the load hits, and why?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson05_quiz.html" title="The closed-loop platform — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson05_quiz.html)

1. What two parts make up the complete closed-loop controller, and what does each handle?
2. Why does the motion profile prevent the arrival overshoot?
3. How does the platform recover from a load disturbance during the hold?
4. How does the closed-loop result compare with the open-loop machine of Module 09?
5. What does this complete, controlled platform hand to Module 11?

## 10. Challenge Problem

The closed-loop platform holds ±1 mm and rejects disturbances beautifully in simulation. A skeptic argues that since it works so well, the earlier modeling and tuning work was unnecessary — you could have just added a controller to the real machine and adjusted it. Explain what the model and the tuning margin bought that trial-and-error on hardware could not, using the specific risks of doing control design on a two-tonne machine. Then explain why, even with this excellent simulated result, Module 11's live digital model is still valuable once the real platform is running — what can it catch that the pre-build simulation cannot?

## 11. Common Mistakes

- **Feedback without a profile.** Raw feedback on a big move overshoots; the motion profile gives a clean approach.
- **Profile without feedback.** Feedforward alone drifts under disturbance and model error; feedback trims it.
- **Declaring success at the nominal condition.** Hold and disturbance rejection must be checked, not just arrival; the hold is the hard part.
- **Forgetting the margin earned it.** The clean, stable result depends on the tuning margin; at the edge it would ring.

## 12. Key Takeaways

**The decision you can now make:** run the complete closed-loop platform and confirm it meets ±1 mm — reaching, holding, and rejecting disturbance.

- The complete controller is **motion profile (feedforward) + PID feedback**: the plan for the move, the trim for precision.
- The platform **reaches 500 mm in ~6 s and holds ≤0.02 mm** — far inside ±1 mm, no overshoot.
- A **load disturbance is rejected** to zero steady error by the integral term, damped by derivative, stable by margin.
- Versus open-loop's **~15 mm drift**, the closed loop is **dead-on and held** — the curriculum's ±1 mm goal, met.
- **Module 10 complete.** The controlled platform hands off to **Module 11**, which runs a live digital model beside the machine.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the complete loop

```
Explain the complete closed-loop control of a hydraulic platform: a trapezoidal motion profile (feedforward) for the gross move to 500 mm, plus PID feedback (Kp=0.15, Ki=0.4, Kd=0.01) to trim errors, tuned with a 2.7x gain margin. Show how it reaches target in ~6 s with <0.02 mm hold error and rejects a -4 mm/s load disturbance to zero, versus ~15 mm open-loop drift.
```

**Challenge** — why model and tune first

```
A skeptic says a hydraulic platform's excellent closed-loop result means the prior modeling and tuning were unnecessary - just tune on the real machine. Explain what the model and the gain margin bought that hardware trial-and-error could not (given a 2-tonne machine), and why a live digital model is still valuable once the machine runs.
```

**Explore** — feedforward plus feedback

```
Explain the two-part architecture of precision motion control: feedforward (a motion profile) for the large predictable motion, and feedback (PID) for small unpredictable errors. Why does feedback-only overshoot and feedforward-only drift, and how does combining them give both speed and precision? Use a hydraulic lift holding ±1 mm as the example.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 10 Lesson 05 — The closed-loop platform.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*Module 10 is complete — the platform reaches its commanded height and holds ±1 mm, rejecting disturbances: the specification that opened the curriculum, met by a fully controlled machine. Next: Module 11 — a live digital model running beside the platform to confirm it behaves as designed.*
