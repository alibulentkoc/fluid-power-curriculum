!!! abstract "You are here"
    **Module 08 — Electrohydraulic Control**  ·  **Unit 2 — Sensing the Platform**  ·  **Lesson 03 — Sensing position**

# Lesson 03 — Sensing position

> **Module 08 · Lesson 03** · *Teaching the platform where it is.*
> Commanding is open-loop — it sets speed, not position. This lesson adds the sensor that measures the platform's height, and works out the range and resolution the ±1 mm goal demands.
>
> **Learning outcome:** Specify a position sensor for the platform — choose a suitable type, set its range to the 600 mm stroke, and size its resolution to the ±1 mm control goal, understanding why you cannot control tighter than you can measure.

---

## 1. Why This Matters

At the end of Lesson 01 the platform was driving blind: a command set its speed, but nothing told the controller *where the platform actually was*, so it could never know when to stop on a target. Sensing is what removes the blindfold. Bolt a position sensor to the cylinder and the platform gains a sense it never had — it can report its height, continuously, as a number a controller can read. Everything that makes the platform precise, safe, and automatic depends on this one measurement existing and being good enough.

So the decision this lesson makes is: **what position sensor does the platform need — what type, what range, and, above all, what resolution?** The range is easy: it must span the 600 mm stroke. The resolution is the subtle part, and it follows an iron rule — *you cannot control tighter than you can sense*. To hold ±1 mm, the sensor must resolve much finer than a millimetre, or the controller is chasing a target it cannot even see clearly. Work that backwards and it sets a concrete requirement: about 0.1 mm resolution, which over 600 mm means at least a 14-bit measurement. Get that right and the platform can know its height to a tenth of a millimetre; get it wrong and no controller, however clever, can hold the millimetre.

## 2. Physical Intuition

Think of the sensor as a ruler the machine can read electronically, laid along the cylinder's travel. The natural place for it on a hydraulic cylinder is *inside* — a magnetostrictive sensor runs a rod down the bore, a magnet rides on the piston, and the electronics time a pulse travelling to the magnet and back to work out exactly where the piston is. It is absolute (it knows the position the instant it powers on, no homing), non-contact (nothing to wear out), and it shrugs off the oil, pressure, and vibration that would kill a delicate external sensor. That is why it is the default on serious hydraulic cylinders — the ruler lives where the motion is.

Now the resolution intuition. Reading that ruler is not infinitely fine: the electronics turn the position into a number with a finite number of steps, and the size of one step is the resolution — the smallest change the platform can notice. If one step is half a millimetre, the platform genuinely cannot tell 0.4 mm of error from zero; it is blind below that. To hold the load inside a ±1 mm window you need steps far smaller than that window — a tenth of a millimetre is a sensible target, giving the controller room to see the error and correct before it grows. Finer is better, up to a point, but coarser is fatal: a controller can never hold tighter than its sensor can see. The sensor's resolution is the floor under everything the platform will ever do.

## 3. The Idea You Now Need

Resolution is the stroke divided by the number of counts, and the counts come from the bit depth of the measurement:

$$ \text{resolution} = \frac{\text{stroke}}{2^{N}} = \frac{600\ \text{mm}}{2^{N}} $$

The control rule of thumb is to sense about ten times finer than you intend to hold, so a ±1 mm goal wants resolution near **0.1 mm**:

$$ \text{require } \frac{600}{2^{N}} \lesssim 0.1\ \text{mm} \;\Rightarrow\; 2^{N} \gtrsim 6000 \;\Rightarrow\; N \geq 13\text{–}14\ \text{bits} $$

Checking the ladder: 12-bit gives $600/4096 = 0.15$ mm (too coarse), 14-bit gives $0.037$ mm (comfortable), 16-bit gives $0.009$ mm. A magnetostrictive sensor's native ~0.01 mm resolution corresponds to the 16-bit end — plenty. The measurement must also be *fast enough*: to catch a 0.1 mm move at the full 85 mm/s the controller samples at least $85/0.1 \approx 850$ Hz, so a ~1 kHz update rate covers both full speed and creep. Range 600 mm, resolution ≤ 0.1 mm (≥14-bit), rate ~1 kHz — that is the sensor spec.

## 4. Visual Explanation

<figure markdown>
  ![On the left, the platform cylinder with a magnetostrictive position sensor built into the rod bore: a magnet on the piston and a waveguide rod, reporting absolute position. An arrow labels the 600 mm stroke. In the centre, the measurement chain: piston position, to sensor, to an analogue signal (4 to 20 mA), to an analogue-to-digital converter, to a digital count the controller reads. On the right, a resolution ladder comparing bit depth to the step size over 600 mm: 10-bit at 0.59 mm and 12-bit at 0.15 mm are marked as too coarse (larger than a tenth of the plus or minus 1 mm band), while 14-bit at 0.037 mm and 16-bit at 0.009 mm sit comfortably below it.](assets/m08-l3-position.svg){ width="720" }
</figure>

Read it left to right, then check the ladder. The **sensor lives in the cylinder** and measures the piston's absolute position over the 600 mm stroke; the **chain** turns that into a digital count the controller can read; the **ladder** shows which bit depths are good enough. The dividing line is ~0.1 mm — a tenth of the ±1 mm band. Below 14 bits the step size is bigger than that line, so the platform is blind to errors it needs to correct; at 14 bits and finer the steps are small enough to see and settle the millimetre. The ruler exists, and it is fine enough — the first half of closing the loop.

## 5. Engineering Example

Magnetostrictive sensors are the workhorse of industrial hydraulic position control precisely because they meet this spec in a hostile place — injection-moulding machines, steel-mill cylinders, mobile-equipment outriggers, and precision presses all use them, mounted in the cylinder, reporting position to a controller thousands of times a second. When an application does not need the ruggedness, cheaper options appear — a linear potentiometer for a slow, forgiving axis, a draw-wire encoder for a retrofit, an external glass scale for a machine tool — but each is chosen against the same three questions this lesson asks: does it span the stroke, does it resolve finely enough for the control goal, and is it fast and robust enough for the environment. Getting a control system to hold a tight tolerance almost always begins here, with a sensor good enough that the tolerance is even visible; teams that skip this step spend weeks tuning a controller that was doomed by a coarse sensor from the start.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — 600 mm stroke; goal to hold ±1 mm; candidate sensors at 12-bit and 14-bit; full speed 85 mm/s.

**Find** — the resolution of each, whether it supports the goal, and the minimum sample rate.

**Assumptions**

- 10:1 rule: sense ~10× finer than the control tolerance, so target ≈ 0.1 mm.

**Solution**

$$ \text{12-bit: } \frac{600}{4096}=0.15\ \text{mm} \;>\; 0.1\ \text{mm (too coarse)} $$
$$ \text{14-bit: } \frac{600}{16384}=0.037\ \text{mm} \;<\; 0.1\ \text{mm (adequate)} $$
$$ \text{rate: } f \geq \frac{v_\text{max}}{\text{resolution}} = \frac{85}{0.1} \approx 850\ \text{Hz} \;\Rightarrow\; \text{use }\sim1\ \text{kHz} $$

**Result**

$$ \boxed{\text{Use }\geq 14\text{-bit } (\leq 0.037\text{ mm}) \text{ over 600 mm, sampled at }\sim1\text{ kHz}} $$

**Engineering Interpretation** — The 12-bit sensor fails not because it is bad but because its 0.15 mm step is bigger than the tenth-of-a-millimetre the goal implies; a controller reading it literally cannot distinguish a 0.1 mm error from perfection, so it can never trim the last fraction and will hunt or settle short. The 14-bit sensor, with a 0.037 mm step, gives the controller a clear view well inside the band — and a magnetostrictive unit at ~0.01 mm has margin to spare. The sample rate matters just as much as the resolution: a perfectly fine sensor read too slowly lets the platform move a visible distance between looks, so ~1 kHz keeps each step small. Note what this lesson still does *not* do — it measures position but does nothing with it yet; the platform can now *see* its height but is not yet *acting* on it. Turning measurement into correction is the closed loop of Module 10; here we have simply guaranteed the measurement is good enough to make that loop possible.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson03_position.html" title="Sensing position — resolution vs the ±1 mm goal" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

Set the sensor's bit depth and read off the resolution over the 600 mm stroke. Watch the resolvable step shrink as bits rise, and see it cross below the 0.1 mm line — the threshold where the sensor becomes fine enough to hold ±1 mm.

## 8. Coding Exercise

```python
stroke, tol, v_max = 600.0, 1.0, 85.0
target_res = tol / 10                       # 10:1 rule -> ~0.1 mm

def resolution(bits):  return stroke / (2**bits)
def ok(bits):          return resolution(bits) <= target_res

for bits in (10, 12, 14, 16):
    r = resolution(bits)
    print(f"{bits:2}-bit: {r:.4f} mm/count  {'OK' if ok(bits) else 'too coarse'}")

min_rate = v_max / target_res               # Hz to catch a 0.1 mm move at full speed
print("min sample rate:", round(min_rate), "Hz  -> use ~1 kHz")
```

**Your task:** find the smallest bit depth that satisfies the ±1 mm goal. Then answer in a comment: if the stroke were 6000 mm instead of 600 mm, how many more bits would you need to keep the same 0.1 mm resolution, and why?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson03_quiz.html" title="Sensing position — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

1. Why must the sensor resolve much finer than the ±1 mm control goal?
2. What resolution, and roughly what bit depth over 600 mm, does a ±1 mm goal imply?
3. Why is a magnetostrictive sensor the usual choice for a hydraulic cylinder?
4. A 12-bit sensor gives 0.15 mm steps — why is that a problem for a ±1 mm goal?
5. Besides resolution, what other sensor property must be adequate, and why?

## 10. Challenge Problem

A team is tuning the platform to hold ±1 mm and cannot get it to settle — it hovers about half a millimetre short of target and occasionally hunts back and forth. They have tried every controller adjustment. Inspecting the hardware, you find a 12-bit position sensor over the 600 mm stroke. Explain why no amount of controller tuning could have fixed this, what the sensor's resolution is and how it relates to the symptom, and what you would specify instead. Then state the general principle this illustrates about the relationship between sensing and control precision.

## 11. Common Mistakes

- **Matching sensor resolution to the tolerance.** Resolving *at* 1 mm is not enough to *hold* ±1 mm; sense ~10× finer.
- **Forgetting the range.** The sensor must span the full 600 mm stroke, not just the working zone.
- **Ignoring sample rate.** A fine sensor read too slowly lets the platform move between looks; size the rate to the speed and resolution.
- **Assuming better sensing fixes a bad controller — or vice versa.** Sensing sets the *floor*; the controller works above it. You need both.

## 12. Key Takeaways

**The decision you can now make:** specify a position sensor for the platform — type, range, resolution, and rate — matched to the ±1 mm goal.

- **You cannot control tighter than you can sense** — this sets the resolution requirement.
- A ±1 mm goal implies **~0.1 mm resolution**, which over 600 mm needs **≥14-bit** (12-bit's 0.15 mm is too coarse).
- The usual hydraulic-cylinder choice is a **magnetostrictive sensor** — absolute, non-contact, in the bore, ~0.01 mm.
- Size the **sample rate** to the speed too: ~1 kHz catches sub-0.1 mm moves at full 85 mm/s.
- The platform can now **know its height** — but doesn't yet act on it. **Lesson 04 adds pressure/load sensing**, and Module 10 closes the loop.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the resolution budget

```
Explain why a position sensor must resolve much finer than the control tolerance ("you cannot control tighter than you can sense"). For a hydraulic platform with a 600 mm stroke and a ±1 mm goal, work out the resolution needed (~0.1 mm) and the bit depth over 600 mm (compare 12-, 14-, and 16-bit), plus the sample rate to catch a 0.1 mm move at 85 mm/s.
```

**Challenge** — the doomed tuning

```
A platform won't settle within ±1 mm - it hovers ~0.5 mm short and hunts - and no controller tuning helps. It uses a 12-bit position sensor over a 600 mm stroke. Explain why the sensor resolution (0.15 mm) caused this, why tuning cannot fix it, and what to specify instead.
```

**Explore** — sensor choices

```
Compare position sensors for a hydraulic cylinder - magnetostrictive, linear potentiometer, draw-wire encoder, external glass scale - on range, resolution, absolute vs incremental, robustness to oil/pressure/vibration, and cost. Why is magnetostrictive the usual choice for industrial hydraulic position control?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 08 Lesson 03 — Sensing position.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The platform can now measure its own height — finely enough to make ±1 mm control possible. Next: Lesson 04 — Sensing pressure and load, reading the force the platform is working against.*
