!!! abstract "You are here"
    **Module 11 — The Live Digital Model**  ·  **Unit 2 — From Signal to Diagnosis**  ·  **Lesson 03 — Detecting and diagnosing faults**

# Lesson 03 — Detecting and diagnosing faults

> **Module 11 · Lesson 03** · *Not just that something is wrong — what.*
> A single residual tells you the machine has changed. This lesson uses the pattern across several residuals — position, pressure, and resonance — to tell one fault from another, and to distinguish a real fault from a failing sensor.
>
> **Learning outcome:** Diagnose the platform's faults from the distinct signatures they leave across multiple residuals, and use cross-checks between signals to separate genuine machine faults from sensor faults.

---

## 1. Why This Matters

Detecting that something is wrong is only half the job — the other half is knowing *what* is wrong, because the response to a leak, a friction increase, and a sensor failure could not be more different. A single residual on position can tell you the machine has diverged from its design, but it cannot, by itself, say whether oil is leaking, a seal is dragging, air has entered the fluid, or the position sensor itself has failed. Acting on a bare "something changed" means shutting down and hunting blindly; acting on "the cap-side seal is leaking" means a targeted repair. The difference between a detector and a diagnostic tool is the difference between an alarm and an answer, and it comes from reading not one residual but the *pattern* across several.

So the decision this lesson makes is: **how do we tell one fault from another — and tell a real fault from a failing sensor?** The key is that the platform exposes several signals — position, pressure (the load, from Module 08), and the oil-spring resonance frequency — and each fault disturbs them in a distinct combination. A leak makes the platform sag and its holding pressure bleed away, while the resonance is untouched. Added friction demands more pressure to move the same way, but leaves the resonance alone. Entrained air softens the oil spring and drops the resonance frequency, while steady position and pressure stay near normal. And a sensor fault shows up as a position residual that fires while the pressure signal says the load is perfectly normal — an *inconsistency* that fingers the sensor rather than the machine. Reading which residuals moved and which stayed quiet is exactly differential diagnosis: the combination localizes the cause, turning the live model from a fault detector into a fault *identifier*.

## 2. Physical Intuition

Think like a doctor with a patient. A single symptom — a fever — tells you something is wrong but not what; it takes the *pattern* of symptoms, and crucially which possible symptoms are *absent*, to narrow it to a diagnosis. The platform is the same. Each fault pushes on the machine in its own way, and because you are watching several independent signals, each fault produces a characteristic combination of which residuals grow and which stay flat. A leak drains holding pressure, so the platform sags and the pressure needed to hold it falls away — but a leak does nothing to the stiffness of the oil, so the resonance is unchanged. That specific combination — position drifting, pressure dropping, resonance normal — is the leak's fingerprint, and no other fault produces quite the same one.

Added friction has a different signature entirely: to move the platform against extra seal drag, the controller must push with more pressure, so the pressure residual rises even as the resonance stays put. Entrained air is different again: it does not much change the steady position or pressure, but it softens the oil spring, so the ringing frequency drops — a resonance that used to sit at twelve hertz now rings at eight, a signature nothing else produces. And the sensor fault is the cleverest to catch: if the position sensor lies, its residual grows, but the pressure sensor still reports the true, normal load — and a machine that has really moved off target would show *both*, so a position residual with a calm pressure residual is a contradiction that can only mean the sensor itself has failed. This is the power of watching multiple signals: not just detecting the disturbance, but reading its fingerprint to name its cause, and using the disagreements between signals to catch the sensors that are lying.

## 3. The Idea You Now Need

A single residual **detects**; the **pattern across several residuals diagnoses**. The platform exposes three: position $r_x$, pressure $r_p$ (the load), and the resonance frequency shift $\Delta f_n$. Each fault leaves a distinct signature:

| Fault | Position $r_x$ | Pressure $r_p$ | Resonance $\Delta f_n$ | Cross-check |
|---|---|---|---|---|
| **Internal leak** | drifts down | hold pressure drops | — | consistent (real) |
| **Added friction** | sluggish / lags | rises (+~10 bar / +2 kN) | — | consistent (real) |
| **Entrained air** | transient ringing | — | drops (12→8 Hz) | consistent (real) |
| **Sensor fault** | jumps / drifts | **normal** | — | **inconsistent → sensor** |

The physics behind each entry is from earlier modules. Friction needs extra pressure to move: $\Delta p = \Delta F/A = 2\ \text{kN}/1963.5\ \text{mm}^2 \approx 10$ bar. Air softens the oil spring, dropping resonance as $f_n\propto\sqrt{\beta_\text{eff}}$: a $\beta_\text{eff}$ at 44% of pure oil gives $12\sqrt{0.44}\approx8$ Hz. A leak bleeds holding pressure, so the platform sags and the pressure to hold falls. And the **cross-check** is decisive for sensor faults: a genuine position change also changes the load-bearing pressure, so a position residual with a *normal* pressure residual is a contradiction — the machine has not moved, the sensor is lying. Reading the combination — which fired, which stayed quiet, whether the signals agree — names the fault.

## 4. Visual Explanation

<figure markdown>
  ![A fault-signature matrix. Rows are four faults: internal leak, added friction, entrained air, and position-sensor fault. Columns are the residuals watched: position, pressure, resonance frequency, and a cross-check consistency flag. Each cell is marked to show that fault's effect: the leak row shows position drifting down and pressure dropping, resonance blank, cross-check consistent; the friction row shows position lagging and pressure rising about 10 bar, resonance blank, consistent; the entrained-air row shows resonance dropping from 12 to 8 hertz with position and pressure near normal, consistent; the sensor-fault row shows position jumping but pressure normal, and the cross-check flagged inconsistent, pointing to the sensor. A caption explains: a single residual detects that something changed; the pattern of which residuals moved and which stayed quiet identifies which fault, and a position change with normal pressure is the contradiction that reveals a sensor fault.](assets/m11-l3-diagnosis.svg){ width="720" }
</figure>

The matrix is the whole lesson: faults down the side, watched signals across the top, and each row a distinct fingerprint. Read across the **leak** row — position down, pressure dropping, resonance untouched — and it looks like nothing else. The **friction** row raises pressure instead of dropping it, and leaves position merely sluggish rather than drifting. The **entrained-air** row is the only one that moves the resonance, dropping it from 12 to 8 Hz while position and pressure sit near normal. And the **sensor-fault** row is caught by the last column: position fires, but pressure is normal, and those two disagreeing is a contradiction a real fault could never produce — so the fault is the sensor. Reading down any column tells you what one signal sees; reading across any row tells you a fault's signature; and the pattern together is the diagnosis. Detection needs one residual; diagnosis needs the matrix.

## 5. Engineering Example

Multi-signal fault diagnosis is the heart of real condition-monitoring and of the field called fault detection and isolation: detection says a fault exists, isolation says which one, and isolation almost always requires several signals because one signal rarely distinguishes causes. The signature-matrix approach shown here — enumerate the faults, predict each one's effect on every measured signal, and match the observed pattern to a row — is a standard diagnostic method, used from aircraft engine health monitoring to chemical-plant supervision. The cross-check idea is equally important in practice and is a form of analytical redundancy: instead of duplicating a sensor with a second physical sensor, you check whether independent signals that *should* agree actually do, and a disagreement localizes a sensor fault without any extra hardware — here, position and load-bearing pressure must move together, so their disagreement reveals a lying position sensor. This is why instrumenting a machine with a few diverse sensors, rather than many copies of one, is so valuable: diversity is what lets the pattern discriminate causes and lets consistency checks catch the sensors themselves. The discipline scales directly: the same logic that separates a leak from friction on one cylinder separates a failing bearing from an unbalanced load on a turbine, given the right signals and their predicted signatures.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the live model producing three residuals (position, pressure, resonance). Two observations: (A) position drifts down, pressure-to-hold drops, resonance normal; (B) position jumps to a new value, but pressure and load stay exactly normal.

**Find** — the fault behind each observation, and the reasoning.

**Assumptions**

- Signatures per the matrix; a real position change also changes load-bearing pressure.

**Solution**

$$ \text{(A) position}\downarrow,\ \text{pressure}\downarrow,\ \text{resonance normal} \;\Rightarrow\; \textbf{internal leak} $$
$$ \text{(B) position jumps but pressure normal} \Rightarrow \text{inconsistent} \Rightarrow \textbf{sensor fault (not the machine)} $$

**Result**

$$ \boxed{\text{(A) leak — bleeds holding pressure, platform sags; (B) sensor fault — signals disagree}} $$

**Engineering Interpretation** — Observation A matches the leak fingerprint exactly: a leak lets the pressurized oil escape, so the platform sags (position drifts down) and the pressure available to hold it falls, while the oil's stiffness — and thus the resonance — is untouched. No other fault produces that specific trio, so the diagnosis is a leak, and the response is a targeted seal or line inspection, not a blind shutdown. Observation B is the subtle and important one. Taken alone, a position residual jumping looks like the platform lurched — alarming. But a real lurch of a loaded platform would change the load-bearing pressure too, and here the pressure is dead normal. Those two facts contradict each other: the machine cannot have moved and not moved at once. The only consistent explanation is that the *position sensor* is reporting a move that did not happen — a sensor fault. Catching this prevents a serious error: reacting to a phantom position jump by driving the platform could actually cause the accident the reading falsely implied. This is why diagnosis reads patterns and cross-checks, not single residuals — it names the true fault and refuses to be fooled by a lying sensor. Lesson 04 goes further, using the model to *estimate* quantities no sensor measures at all.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson03_diagnosis.html" title="Detecting and diagnosing faults — the signature matrix" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

Inject each fault — leak, friction, entrained air, or a sensor fault — and watch the three residual indicators light up in that fault's characteristic pattern, with the diagnosis and the cross-check verdict. See how the combination, not any single signal, names the cause.

## 8. Coding Exercise

```python
# Signature matrix: each fault's effect on (position, pressure, resonance) and consistency
signatures = {
    "leak":     {"position": "down",    "pressure": "drop",   "resonance": "none", "consistent": True},
    "friction": {"position": "lag",     "pressure": "rise",   "resonance": "none", "consistent": True},
    "air":      {"position": "ring",    "pressure": "none",   "resonance": "drop", "consistent": True},
    "sensor":   {"position": "jump",    "pressure": "none",   "resonance": "none", "consistent": False},
}

def diagnose(position, pressure, resonance, consistent):
    obs = {"position": position, "pressure": pressure, "resonance": resonance, "consistent": consistent}
    for fault, sig in signatures.items():
        if sig == obs:
            return fault
    return "unknown / multiple"

print(diagnose("down", "drop", "none", True))   # -> leak
print(diagnose("jump", "none", "none", False))  # -> sensor
```

**Your task:** confirm the two observations diagnose to leak and sensor. Then answer in a comment: why is a position residual with a *normal* pressure residual a contradiction, and what does that contradiction reveal?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson03_quiz.html" title="Detecting and diagnosing faults — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

1. What is the difference between detecting and diagnosing a fault?
2. What is the signature of an internal leak across the three residuals?
3. Why does entrained air drop the resonance frequency while a leak does not?
4. How does a cross-check between position and pressure reveal a sensor fault?
5. Why does diagnosis require multiple diverse signals rather than one?

## 10. Challenge Problem

The platform's live model reports a growing position residual, and an operator is about to command a large corrective move to bring it back to target. Before acting, the model's other residuals are checked: pressure is normal, resonance is normal. Explain what this pattern most likely means, why acting on the position residual alone would be dangerous, and how the cross-check changes the correct response. Then design the minimal set of signals you would monitor to distinguish all four faults in this lesson from one another, and explain why removing any one of them would leave two faults indistinguishable.

## 11. Common Mistakes

- **Acting on one residual.** A single residual detects but cannot diagnose; the pattern across signals names the fault.
- **Ignoring which residuals stayed quiet.** The *absent* signatures are as diagnostic as the present ones — a normal resonance rules out air.
- **Trusting a sensor because its own reading looks plausible.** Cross-checks against independent signals catch a lying sensor a single reading cannot.
- **Assuming every residual means a machine fault.** A position residual with normal pressure is a sensor fault, not a machine fault.

## 12. Key Takeaways

**The decision you can now make:** diagnose a fault from its signature across multiple residuals, and use cross-checks to catch a failing sensor.

- A single residual **detects**; the **pattern across position, pressure, and resonance diagnoses**.
- **Leak**: position down, pressure drops, resonance normal. **Friction**: pressure up ~10 bar, sluggish. **Air**: resonance 12→8 Hz.
- The **cross-check** catches sensor faults: a position residual with **normal pressure** is a contradiction → the sensor, not the machine.
- Diagnosis needs **diverse signals**; removing one can make two faults indistinguishable.
- This is **fault detection and isolation** with **analytical redundancy**. **Lesson 04 estimates quantities no sensor measures.**

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the signature matrix

```
Explain diagnosing a hydraulic platform's faults from residual signatures across position, pressure, and resonance. Give the fingerprint of each: internal leak (position down, pressure drops, resonance normal), added friction (pressure +~10 bar, sluggish), entrained air (resonance 12->8 Hz), and a position-sensor fault (position fires but pressure normal -> inconsistent). Explain why the pattern, not one residual, identifies the fault.
```

**Challenge** — the lying sensor

```
A hydraulic platform's live model shows a growing position residual, but pressure and resonance are normal. Explain why this pattern points to a sensor fault rather than a machine fault, why acting on the position residual alone would be dangerous, and how a cross-check between position and load-bearing pressure (analytical redundancy) catches the lying sensor without a duplicate sensor.
```

**Explore** — fault detection and isolation

```
Explain fault detection and isolation (FDI): detection says a fault exists, isolation says which one, and isolation needs multiple diverse signals whose predicted signatures form a matrix. Relate to analytical redundancy (consistency checks vs duplicate sensors) and to real applications like engine or plant monitoring. Why does sensor diversity matter more than sensor count?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 11 Lesson 03 — Detecting and diagnosing faults.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*A single residual detects; the pattern across position, pressure, and resonance diagnoses — and cross-checks catch a lying sensor. Next: Lesson 04 — Estimating hidden state, using the model to see quantities no sensor measures directly.*
