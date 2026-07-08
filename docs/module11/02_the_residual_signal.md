!!! abstract "You are here"
    **Module 11 — The Live Digital Model**  ·  **Unit 1 — Model Meets Machine**  ·  **Lesson 02 — The residual signal**

# Lesson 02 — The residual signal

> **Module 11 · Lesson 02** · *The health signal, examined.*
> The residual is never exactly zero, even when the machine is healthy. This lesson examines what shapes its healthy band — noise and model error — and how to set a threshold that catches real faults without crying wolf.
>
> **Learning outcome:** Characterize the residual's healthy band from sensor noise and model error, set a threshold that balances false alarms against detection, and use filtering to expose slow drifts hidden in the noise.

---

## 1. Why This Matters

Lesson 01 established the residual as the health signal, but treated it a little too cleanly: healthy meant "small," faulty meant "big." The reality is that even a perfectly healthy machine produces a residual that is never zero — the sensor jitters, and no model is exact. That healthy residual has a characteristic size and shape, and understanding it is what separates a useful monitor from a useless one. Set the alarm threshold too close to the healthy noise and it fires constantly on nothing, and operators learn to ignore it; set it too far above the noise and it misses real faults until they are severe. The whole value of the live model rides on placing that line well, and placing it well requires knowing exactly what the healthy residual is made of.

So the decision this lesson makes is: **what shapes the healthy residual band, and where do we set the threshold to catch real faults without false alarms?** The healthy residual is two things: sensor noise, which scatters it randomly around zero, and model error, which offsets it by a small persistent bias — together an RMS of a couple of hundredths of a millimetre for this platform. The threshold goes above that band by a chosen margin, measured in standard deviations: a three-sigma line sits at about 0.07 mm, fires falsely on only about a quarter of a percent of samples, and reliably catches faults larger than about 0.06 mm. And for faults too subtle to clear the raw noise, filtering the residual — averaging over a window — shrinks the noise by the square root of the window length, dropping the detectable level severalfold at the cost of a slower response. Characterize the band, threshold above it, filter to reach the subtle drifts: that is how the residual becomes a signal you can trust.

## 2. Physical Intuition

Watch the healthy residual closely and it is not a flat line at zero — it is a fuzzy band, jittering rapidly from the sensor's noise and sitting slightly off-centre from a small, steady model error. This band is the machine's healthy signature: a known amount of scatter around a known small offset. Everything about detecting faults comes down to distinguishing a genuine change from this normal fuzz. A gross fault like a leak shoves the residual far outside the band almost instantly — no subtlety needed, it is obviously abnormal. But a slow, subtle fault — a bearing just beginning to drag, a seal barely weeping — nudges the residual by an amount comparable to the noise itself, and there it hides, indistinguishable from a random jitter on any single sample.

Two tools pull the subtle fault out of hiding. The first is a well-placed threshold: knowing the band's width in standard deviations, you set the line a few sigma above it, high enough that random noise almost never reaches it but low enough that a real shift does. Move the line and you trade the two errors against each other — too low and you get false alarms, too high and you miss faults — and the right place depends on how costly each mistake is. The second tool is filtering: a single noisy sample cannot distinguish a 0.02 mm drift from noise, but average a hundred samples and the random noise largely cancels while the persistent drift survives, so the drift emerges from a band that is now several times narrower. The price is patience — averaging takes time, so you detect the slow fault a little later — but for slow faults that is exactly the right trade. The residual is not just "big or small"; it is a signal with known statistics, and reading it well means using those statistics.

## 3. The Idea You Now Need

The healthy residual combines **sensor noise** (random, standard deviation $\sigma$) and **model error** (a small persistent bias $\mu$):

$$ r_\text{healthy} \sim \mu + \mathcal{N}(0,\sigma), \qquad \mu\approx0.01\ \text{mm}, \;\sigma\approx0.02\ \text{mm} $$

The **threshold** sits $k$ standard deviations above the band, trading false alarms against sensitivity:

$$ \text{threshold} = \mu + k\sigma \;:\quad 3\sigma \approx 0.07\ \text{mm},\ \text{false-alarm} \approx 0.27\%,\ \text{detects} \gtrsim 0.06\ \text{mm} $$

A lower $k$ catches smaller faults but false-alarms more (2σ → 4.6%); a higher $k$ is quieter but misses subtle ones (4σ → 0.01%). For faults too small to clear the raw band, **filtering** averages the residual over $W$ samples, shrinking the noise by $\sqrt{W}$:

$$ \sigma_\text{filtered} = \frac{\sigma}{\sqrt{W}} \;:\quad W=50 \Rightarrow \sigma\to0.003\ \text{mm},\ \text{threshold}\to\sim0.008\ \text{mm} $$

so a slow 0.05 mm/s drift, invisible in the raw noise, emerges after averaging — at the cost of a slower response ($W$ samples of delay). A gross leak (6 mm/s) crosses even the raw threshold in ~10 ms; a subtle drift needs the filter. Characterizing $\mu,\sigma$ from healthy data and choosing $k$ and $W$ for the fault sizes and speeds that matter is the design of the monitor.

## 4. Visual Explanation

<figure markdown>
  ![The residual signal and its statistics. On the left, the healthy residual over time: a fuzzy band jittering around a small nonzero mean, with the sensor noise as the scatter and the model error as the offset from zero; a shaded band shows plus or minus one and three sigma. A dashed threshold line sits at three sigma above the mean. On the right, two panels: the top shows the k-sigma trade-off as a curve of false-alarm rate falling steeply as the threshold moves from 2 to 4 sigma, annotated 2 sigma 4.6 percent, 3 sigma 0.27 percent, 4 sigma 0.01 percent; the bottom shows filtering, with a raw noisy residual and, overlaid, a smooth averaged version whose band is several times narrower, so a slow drift that hid in the raw noise now rises clearly above the tightened threshold. A caption: characterize the band, threshold a few sigma above it, filter to reach slow faults.](assets/m11-l2-residual.svg){ width="720" }
</figure>

The left panel is the healthy residual as it really is: a band, not a line, jittering from sensor noise around a small model-error offset, with the ±1σ and ±3σ envelopes drawn. The threshold sits at 3σ — high enough that the noise almost never reaches it. The right-top panel is the core trade-off: as the threshold rises from 2σ to 4σ, the false-alarm rate plunges from 4.6% to 0.01%, but the smallest detectable fault grows in step — you cannot have both quiet and sensitive, and you choose where to sit based on the cost of each error. The right-bottom panel is filtering's payoff: the raw residual hides a slow drift inside its noise, but the averaged residual has a band several times narrower, and the drift now rises clearly above the tightened threshold. Together they are the residual monitor's design knobs: the threshold height $k$ and the filter window $W$, both set from the healthy band's known statistics.

## 5. Engineering Example

Every practical condition-monitoring system does exactly this statistical characterization, because the alternative — a threshold picked by guesswork — either floods operators with false alarms or misses the faults it was installed to catch. The standard practice is to collect a baseline of healthy-machine residuals, measure their mean and standard deviation, and set alarms in units of sigma so the false-alarm rate is known and controlled — a three-sigma limit is a common default, with tighter or looser limits where the cost of a missed fault or a false alarm justifies it. Filtering is equally standard: raw residuals are almost always smoothed, because unfiltered signals are too noisy to reveal the slow degradation that matters most, and the window length is chosen to match how fast the fault of concern develops. The deep point is that a fault-detection threshold is a statistical decision under uncertainty, with two error types — false alarm and missed detection — that trade against each other, and good monitoring makes that trade deliberately rather than by accident. The same logic recurs across quality control, medical diagnostics, and signal detection generally; the platform's residual is one clean instance of a universal problem, and the sigma-and-filter discipline here is exactly what scales to monitoring an entire plant.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — healthy residual with model bias $\mu=0.01$ mm and sensor noise $\sigma=0.02$ mm; a gross leak growing the residual at 6 mm/s; a subtle drift of 0.05 mm/s.

**Find** — the 3σ threshold and its false-alarm rate, the smallest detectable fault, and how filtering exposes the subtle drift.

**Assumptions**

- Gaussian noise; threshold $\mu+k\sigma$; filtering over $W$ samples gives $\sigma/\sqrt{W}$.

**Solution**

$$ \text{3σ threshold} = 0.01 + 3(0.02) = 0.07\ \text{mm}, \quad \text{false-alarm} \approx 0.27\%,\ \text{detects} \gtrsim 0.06\ \text{mm} $$
$$ \text{leak: } 6\ \text{mm/s crosses } 0.07\ \text{mm in } \sim10\ \text{ms — obvious} $$
$$ \text{subtle drift } 0.05\ \text{mm/s: hidden in } \sigma=0.02;\ W=50 \Rightarrow \sigma\to0.003 \Rightarrow \text{emerges} $$

**Result**

$$ \boxed{\text{3σ} = 0.07\text{ mm (0.27\% false); gross leak instant; subtle drift needs } W{=}50\text{ filter}} $$

**Engineering Interpretation** — The 3σ threshold is the workhorse choice: at 0.07 mm it false-alarms on only about a quarter of a percent of samples — rare enough that an alarm means something — while catching any fault that shifts the residual more than about 0.06 mm. The gross leak is trivial to catch: growing at 6 mm/s it blows through the threshold in ten milliseconds, no cleverness required. The subtle 0.05 mm/s drift is the interesting case — it is *smaller than the noise* on any single sample, so raw thresholding at any sensible level either misses it or false-alarms constantly. Filtering resolves the dilemma: averaging 50 samples shrinks the noise sevenfold to 0.003 mm, so the persistent drift, which survives averaging while the random noise cancels, rises clearly above a threshold now tightened to under 0.01 mm. The cost is a detection delay of 50 samples — trivial for a fault developing over seconds. This is the essential craft of residual monitoring: match the threshold height and the filter window to the size and speed of the faults you care about, using the healthy band's measured statistics as the ruler. Lesson 03 uses these calibrated residuals to not just detect faults but tell them apart.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson02_residual.html" title="The residual signal — threshold and filtering" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

Adjust the threshold in sigma and the filter window, with a subtle drift developing in the residual. Watch the false-alarm rate trade against detection as you move the threshold, and see filtering pull the slow drift out of the noise.

## 8. Coding Exercise

```python
import random, math
random.seed(5)
mu, sigma = 0.01, 0.02                       # model bias, sensor noise (mm)

def healthy_band(n=5000):
    data = [mu + random.gauss(0, sigma) for _ in range(n)]
    m = sum(data)/n
    sd = (sum((x-m)**2 for x in data)/n)**0.5
    return m, sd

def threshold(k, sd):     return mu + k*sd
def false_alarm(k):       return 1 - math.erf(k/2**0.5)   # per sample, two-sided
def filtered_sigma(sd, W): return sd/ W**0.5

m, sd = healthy_band()
print(f"healthy: mean {m:.3f}, std {sd:.3f} mm")
for k in (2, 3, 4):
    print(f"{k}s threshold {threshold(k,sd):.3f} mm, false-alarm {false_alarm(k)*100:.2f}%")
print("filtered std (W=50):", round(filtered_sigma(sd, 50), 4), "mm")
```

**Your task:** confirm the 3σ threshold and the √W noise reduction. Then answer in a comment: why does averaging expose a slow drift but do nothing for a one-sample glitch, and what does filtering cost you?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson02_quiz.html" title="The residual signal — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

1. What are the two components of the healthy residual band?
2. What does the threshold's height in sigma trade off?
3. How does filtering the residual expose slow drifts?
4. What does filtering cost, and when is that cost acceptable?
5. Why must the healthy band be characterized from real healthy-machine data?

## 10. Challenge Problem

A monitoring system on the platform is set with a very tight threshold — just above the healthy mean — so it will catch even the smallest fault. In service it alarms several times an hour, always resolving to nothing, and operators begin ignoring it. Explain, in terms of the residual's statistics, why the tight threshold produces these false alarms, what the real cost of the ignored-alarm situation is, and how you would re-set the threshold and add filtering to catch genuine faults while making alarms trustworthy again. Then explain why you cannot simply make the monitor both perfectly sensitive and perfectly quiet, and what information you need to choose the balance well.

## 11. Common Mistakes

- **Treating the healthy residual as zero.** It has a real size (noise + model error); the threshold must sit above that band, not at zero.
- **Setting the threshold at the noise floor.** Tight thresholds false-alarm constantly and train operators to ignore them.
- **Skipping filtering for slow faults.** Subtle drifts hide in raw noise; averaging exposes them at the cost of some delay.
- **Filtering so hard the response is too slow.** Over-long windows delay detection; match the window to the fault's speed.

## 12. Key Takeaways

**The decision you can now make:** characterize the healthy residual band and set a threshold and filter that catch real faults without false alarms.

- The **healthy residual** is **sensor noise** ($\sigma\approx0.02$ mm) plus **model error** (bias $\approx0.01$ mm) — a real band, not zero.
- The **threshold** $\mu+k\sigma$ trades **false alarms against sensitivity**: 3σ ≈ 0.07 mm, ~0.27% false, detects ≳0.06 mm.
- **Filtering** averages the residual, shrinking noise by $\sqrt{W}$, to **expose slow drifts** — at the cost of detection delay.
- A **gross leak crosses instantly**; a **subtle drift needs the filter** to rise out of the noise.
- Detection is a **statistical decision** with two error types; set $k$ and $W$ deliberately. **Lesson 03 tells faults apart.**

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the healthy band

```
Explain the residual signal for a hydraulic platform's live model: the healthy residual is sensor noise (sigma ~0.02 mm) plus model error (bias ~0.01 mm), a real band around a small nonzero mean. Explain setting the threshold at mu + k*sigma (3-sigma ~0.07 mm, ~0.27% false alarm), the k-sigma trade-off between false alarms and sensitivity, and how filtering over W samples reduces noise by sqrt(W) to expose slow drifts.
```

**Challenge** — the false-alarm trap

```
A platform monitor is set with a threshold just above the healthy residual mean and alarms several times an hour, always false, so operators ignore it. Explain in terms of residual statistics why this happens, the real cost of ignored alarms, how to re-set the threshold and add filtering, and why you cannot be both perfectly sensitive and perfectly quiet.
```

**Explore** — detection as decision

```
Explain fault detection as a statistical decision under uncertainty with two error types (false alarm, missed detection) that trade off. Relate the residual threshold (in sigma) and filter window to this trade, and to the same problem in quality control, medical testing, and signal detection. What information sets the right balance?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 11 Lesson 02 — The residual signal.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The residual is a signal with known statistics: a healthy band of noise and model error, a threshold set in sigma above it, and filtering to reach slow faults. Next: Lesson 03 — Detecting and diagnosing faults, using the calibrated residual to tell one fault from another.*
