!!! abstract "You are here"
    **Module 11 — The Live Digital Model**  ·  **Unit 2 — From Signal to Diagnosis**  ·  **Lesson 04 — Estimating hidden state**

# Lesson 04 — Estimating hidden state

> **Module 11 · Lesson 04** · *Seeing what no sensor measures.*
> The platform measures position and pressure — but not velocity, internal states, or the parameters that drift. This lesson fuses the model with the measurements in an observer, to estimate the quantities no sensor reads directly.
>
> **Learning outcome:** Explain how a state observer fuses model and measurement to estimate unmeasured quantities and track drifting parameters, and how the observer gain trades model trust against measurement trust.

---

## 1. Why This Matters

So far the live model has run in parallel with the machine, predicting from commands alone. But a model can do something more powerful: it can be *corrected* by the measurements as it runs, and in doing so reveal quantities the sensors never measure. The platform has a position sensor and a pressure sensor — but it does not directly measure velocity, or the internal chamber states, or the true friction, or how much the oil stiffness has drifted as it warmed. These hidden quantities matter — velocity for smooth control, friction and stiffness for health — yet no sensor reports them. Trying to get them crudely fails badly: differentiate the noisy position to get velocity and the noise explodes to tens of millimetres per second, swamping the real signal. The model, fused with the measurements, is what lets you see the unseen cleanly.

So the decision this lesson makes is: **how do we estimate the quantities no sensor measures — velocity, internal states, drifting parameters?** The answer is a *state observer*: run the model, but at every step nudge its internal states toward reality using the gap between what it predicts and what the sensors measure. The observer gets the best of both worlds — the model supplies the quantities the sensors miss and smooths the noise, while the measurements keep the model from drifting away from the real machine, correcting any error and even a wrong starting guess. A single tuning knob, the observer gain, sets the balance: trust the model more for a smooth but slowly-correcting estimate, trust the measurements more for a fast but noisier one, with the Kalman filter setting that balance optimally from the known noise levels. And the same machinery, extended to treat slow-drifting parameters as extra states, turns the monitor from one that *detects* a fault into one that *quantifies* it — reporting not "friction has risen" but "friction is now 2.1 kN."

## 2. Physical Intuition

The core trick is a running collaboration between the model and the sensors, each covering the other's weakness. Left alone, the model drifts — small errors in its parameters or initial state accumulate, and after a while its predictions wander from the real machine. Left alone, the sensors are noisy and incomplete — they measure position but jitter, and they do not measure velocity or internal states at all. The observer marries them: it runs the model forward, and at every instant it looks at the gap between the model's predicted position and the measured position, and feeds a fraction of that gap back to correct the model's states. When the model runs ahead of reality, the measurement pulls it back; when the measurement is just noise, the model's momentum smooths it out. The result is an estimate steadier than the raw sensor and truer than the free-running model.

Because the observer maintains the model's *entire* internal state, not just the measured part, it delivers the hidden quantities as a by-product. Velocity is a state the model integrates, so the observer reports a clean velocity — far better than differentiating the jittery position, which would amplify the noise beyond use. The same is true of internal pressures or any state the model carries. The observer gain sets the personality of this collaboration: crank it up and the estimate leans on the measurements, snapping to reality quickly but inheriting its noise; turn it down and the estimate leans on the model, gliding smoothly but correcting sluggishly. And there is a beautiful extension: treat a slowly-drifting parameter — the oil stiffness as it warms, the friction as seals wear — as just another state to be estimated, and the observer will *track* it, following the parameter as it changes. That is how the live model stops merely flagging that something drifted and starts telling you exactly what it drifted to.

## 3. The Idea You Now Need

A **state observer** runs the model and corrects it with the measurement error at every step:

$$ \dot{\hat{x}} = f(\hat{x}, u) + L\,(y_\text{measured} - \hat{y}), \qquad \hat{y} = \text{model's predicted measurement} $$

The correction term $L(y-\hat y)$ pulls the estimate toward reality. It **converges even from a wrong start**: beginning 50 mm off, the estimate is pulled to truth in about a second. And it delivers **hidden states cleanly** — velocity comes from the model's integrated state, not from differentiating noisy position:

$$ \text{differentiate position: } \sigma_v = \frac{\sigma_x\sqrt2}{dt} \approx 28\ \text{mm/s (useless)} \quad\to\quad \text{observer velocity: clean} $$

The **gain $L$ trades model trust against measurement trust**:

$$ L\ \text{small} \to \text{trust model (smooth, slow to correct)}; \quad L\ \text{large} \to \text{trust measurement (fast, noisy)} $$

The **Kalman filter** sets $L$ optimally from the model and sensor noise levels. Extending the idea, adding slow-drifting **parameters** (stiffness $\beta_\text{eff}$, friction, leak rate) to the estimated state lets the observer **track** them online — turning "a fault exists" into "friction is now +2.1 kN," or following the oil-stiffness drift as the resonance shifts with temperature. Estimation is how the model sees what the sensors cannot.

## 4. Visual Explanation

<figure markdown>
  ![A state observer fusing model and measurement. At the centre, the model runs on the command u and produces a predicted position; the real machine, on the same command, produces a measured position. The two are subtracted to form the error, which is multiplied by the observer gain L and fed back to correct the model's states — a correction loop around the model. Out of the corrected model come the estimated states, including hidden ones like velocity that no sensor measures. Below, two small plots: the first shows an estimate starting 50 mm wrong and converging onto the true position within about a second as the correction pulls it in. The second shows the observer gain trade-off — a low gain giving a smooth but slowly-correcting estimate, a high gain giving a fast but noisy one — with a note that the Kalman filter sets the gain optimally. A side note: add drifting parameters as states and the observer tracks them, turning detection into measurement.](assets/m11-l4-observer.svg){ width="720" }
</figure>

The centre is the observer itself: the model running on the command, its prediction compared to the machine's measurement, and the error — scaled by the gain $L$ — fed back to correct the model's states continuously. That correction loop is what keeps the model locked to reality, and because the loop maintains the model's full state, the **hidden states** (velocity, internal pressures) come out cleanly, without differentiating noise. The lower-left plot shows the observer's self-correcting nature: even starting 50 mm wrong, it is pulled to the true position within about a second. The lower-right plot shows the one design choice — the gain: low for a smooth estimate that trusts the model, high for a responsive one that trusts the measurement, with the Kalman filter choosing optimally. And the extension noted alongside is the powerful one: fold a drifting parameter into the estimated state, and the observer *tracks* it, so the monitor reports the fault's magnitude, not just its presence.

## 5. Engineering Example

State observers and Kalman filters are among the most widely used tools in all of engineering — in every inertial navigation system, spacecraft attitude estimator, robot, and motor drive — precisely because real systems never measure everything and always measure noisily. The pattern is universal: a model provides structure and fills in the unmeasured states, measurements anchor the model to reality, and a gain balances the two according to how much each is trusted. Motor drives estimate rotor position and velocity this way; aircraft fuse inertial sensors and GPS this way; the platform estimates velocity and internal states the same way. The parameter-tracking extension is the basis of *adaptive* systems and of advanced condition monitoring: by estimating parameters like friction, stiffness, or leak rate as they slowly change, a system can both compensate for them in its control and report their drift for maintenance — the difference between a controller that degrades silently as its plant ages and one that notices and adapts. For the platform, an observer that tracks the oil stiffness as it warms could even feed the control tuning, keeping the gain margin of Module 10 intact as the resonance shifts. The deep lesson is that a validated model is not just for prediction or monitoring — fused with measurement, it becomes a lens that reveals the machine's full internal state and the slow changes within it, from a handful of noisy sensors.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the platform measures position (noise $\sigma_x=0.02$ mm) but not velocity; an observer $\dot{\hat x}=f(\hat x,u)+L(y-\hat y)$ started 50 mm off; and a slow oil-stiffness drift as the machine warms.

**Find** — why differentiating position fails for velocity, how the observer performs, and what parameter tracking adds.

**Assumptions**

- Position sampled at 1 kHz; observer gain moderate; Kalman sets $L$ optimally.

**Solution**

$$ \text{differentiate: } \sigma_v=\frac{0.02\sqrt2}{0.001}\approx28\ \text{mm/s} \gg \text{clean signal — useless} $$
$$ \text{observer: converges from 50 mm error in }\sim1\ \text{s; velocity estimate clean (model state)} $$
$$ \text{parameter tracking: } \beta_\text{eff}\ \text{as a state} \Rightarrow \text{follows the resonance drift with temperature} $$

**Result**

$$ \boxed{\text{Observer gives clean hidden states and, extended, tracks drifting parameters}} $$

**Engineering Interpretation** — The velocity example shows why you cannot just differentiate: position noise of 20 microns, differentiated at a millisecond timestep, becomes velocity noise of 28 mm/s — a third of the full-speed signal, drowning it. The observer sidesteps this entirely: velocity is a state the model integrates from the command, and the observer keeps that state honest by correcting position against the measurement, so the velocity estimate is as clean as the model and as true as the sensor allows — the best of both. The convergence from a 50 mm error demonstrates the observer's robustness: it does not need a correct starting guess, because the correction term relentlessly pulls the estimate toward whatever the measurements say is real. The gain is the one judgement call — lean on the model for smoothness or the measurement for speed — and the Kalman filter makes that call optimally when the noise levels are known. The parameter-tracking extension is where this becomes transformative for monitoring: instead of the previous lesson's *detection* that stiffness dropped, an observer with $\beta_\text{eff}$ in its state *reports the value*, following it down as the oil warms and air enters. That closes the loop on diagnosis — not just which fault, but how far advanced — and it is the foundation for the complete monitored platform of Lesson 05, where all of this runs together beside the real machine.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson04_observer.html" title="Estimating hidden state — the observer" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson04_observer.html)

Start the observer with a wrong initial guess and watch it converge onto the true position. Adjust the observer gain to trade smoothness against speed, and compare the observer's clean velocity estimate with the noisy result of differentiating the position directly.

## 8. Coding Exercise

```python
import random, math
random.seed(4)
vmax, dt, sigma_x = 85.0, 1e-3, 0.02

def observer(L=8.0, x0_err=50.0, T=6.0):
    xt = 0.0                      # true position
    xh = x0_err                   # estimate starts WRONG
    t = 0.0; conv = None
    while t < T:
        u  = max(-1, min(1, 0.02*(300.0 - xt)))
        xt += vmax*u*dt                             # true machine
        y   = xt + random.gauss(0, sigma_x)         # noisy measurement
        xh += vmax*u*dt + L*(y - xh)*dt             # model step + correction
        if conv is None and abs(xh - xt) < 0.1: conv = t
        t += dt
    return conv

print("differentiated velocity noise:", round(sigma_x*math.sqrt(2)/dt), "mm/s (useless)")
for L in (2, 8, 30):
    print(f"L={L}: converges in {observer(L):.2f} s")
```

**Your task:** confirm a higher gain converges faster. Then answer in a comment: why does the observer give a clean velocity while differentiating the position does not, and what does raising the gain cost?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson04_quiz.html" title="Estimating hidden state — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson04_quiz.html)

1. What is a state observer, and what does the correction term do?
2. Why does differentiating noisy position fail to give a usable velocity?
3. How does the observer deliver a clean velocity estimate instead?
4. What does the observer gain trade off, and what sets it optimally?
5. How does adding a drifting parameter as a state turn detection into measurement?

## 10. Challenge Problem

An engineer needs the platform's velocity for a control improvement but finds that differentiating the position sensor gives a signal too noisy to use. Explain why differentiation fails here in terms of the noise and timestep, and how a state observer produces a clean velocity from the same noisy position. Then explain the trade-off in choosing the observer gain, what happens at the two extremes, and how you would extend the observer to also report the oil-stiffness drift as the machine warms — and why that estimate could be fed back to keep the Module 10 controller's stability margin intact.

## 11. Common Mistakes

- **Differentiating noisy signals for rates.** Differentiation amplifies noise; an observer estimates rates cleanly from the model.
- **Setting the gain too high.** High gain tracks fast but lets measurement noise into the estimate; balance against the model.
- **Setting the gain too low.** Too much model trust corrects drift and errors sluggishly; the estimate lags reality.
- **Forgetting the observer needs a good model.** The estimate is only as trustworthy as the validated model underneath it.

## 12. Key Takeaways

**The decision you can now make:** estimate unmeasured quantities and track drifting parameters by fusing the model with measurements in an observer.

- A **state observer** runs the model and corrects it with the measurement error: $\dot{\hat x}=f(\hat x,u)+L(y-\hat y)$.
- It **delivers hidden states cleanly** (velocity from the model, not from differentiating noise) and **converges from a wrong start**.
- The **gain $L$ trades model trust vs measurement trust**; the **Kalman filter** sets it optimally from noise levels.
- Adding **drifting parameters as states** lets the observer **track** them — turning detection into measurement ("friction is +2.1 kN").
- A validated model fused with measurement is a **lens on the full internal state**. **Lesson 05 assembles the complete monitored platform.**

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the observer

```
Explain a state observer for a hydraulic platform: run the model and correct it with the measurement error, xhat' = f(xhat,u) + L*(y_measured - yhat). Explain why it converges even from a wrong initial guess, how it gives a clean velocity estimate (a model state) where differentiating noisy position fails (28 mm/s noise), and how the gain L trades model trust vs measurement trust, with the Kalman filter setting it optimally.
```

**Challenge** — velocity and parameter tracking

```
An engineer needs a hydraulic platform's velocity but differentiating the noisy position sensor is too noisy. Explain why differentiation fails (noise/timestep), how a state observer gives clean velocity from the same signal, the gain trade-off and its extremes, and how to extend the observer to track oil-stiffness drift as the machine warms - and why feeding that back preserves the controller's stability margin.
```

**Explore** — Kalman filters everywhere

```
Explain why state observers and Kalman filters are ubiquitous (navigation, spacecraft, robots, motor drives): real systems measure incompletely and noisily, so a model fills unmeasured states and measurements anchor the model, with a gain balancing trust. Relate to adaptive control and condition monitoring via online parameter estimation.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 11 Lesson 04 — Estimating hidden state.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The observer fuses model and measurement to reveal hidden states and track drifting parameters — the model as a lens on the machine's interior. Next: Lesson 05 — The monitored platform, assembling the complete live model beside the running machine to close the curriculum.*
