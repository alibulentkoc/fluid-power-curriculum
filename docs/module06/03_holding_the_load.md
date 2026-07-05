!!! abstract "You are here"
    **Module 06 — Valves & Control**  ·  **Unit 1 — Commanding the Flow**  ·  **Lesson 03 — Holding the load**

# Lesson 03 — Holding the load

> **Module 06 · Lesson 03** · *A leak-free lock, so the load does not drift.*
> Lesson 02's tandem centre holds the load and unloads the pump — but its spool blocks the ports with a sliding fit, not a seal, so oil weeps past and a heavy load slowly sinks. For a platform that must hold to ±1 mm, "slowly" is not good enough. This lesson adds the valve that holds the load drift-free.
>
> **Learning outcome:** Show why a spool centre cannot hold a load to ±1 mm, specify a pilot-operated check valve that seals drop-tight, and find the pilot pressure that releases it for a controlled descent.

---

## 1. Why This Matters

The tandem centre from Lesson 02 looked like a complete answer: it holds the load and unloads the pump. But "holds" was optimistic. A spool seals a port the way a piston seals a bore — with a close sliding *fit*, a gap of a few microns, not a positive seal. Under the ~100 bar the load puts on the trapped oil, that gap weeps. The oil has to go somewhere, so the piston sinks, and the platform drifts down. For most machines that creep is a nuisance; for one specified to hold ±1 mm, it is a failure that arrives in seconds.

So the decision this lesson settles is: **how do you hold the load so it does not drift at all?** A blocked spool is not enough — you need a component that seals *positively*, like a valve on its seat, yet still lets you lower the load on command. That component is the **pilot-operated check valve**: drop-tight when holding, and opened by a pilot signal when it is time to descend. Getting it right is what lets the platform reach a height and simply *stay* there, indefinitely, within its millimetre.

## 2. Physical Intuition

Picture the difference between two ways of blocking a pipe. A **spool** slides a land across the opening — snug, but a thin film of oil always creeps around it, the way a well-fitted drawer still lets air past. A **check valve** presses a hardened poppet onto a matching seat — metal on metal (or metal on elastomer), a true seal that holds pressure with essentially no leak, the way a cork stops a bottle. To hold two tonnes without drift, you want the cork, not the drawer.

But a plain check valve has a fatal flaw for this job: it seals in one direction and would trap the load *forever*, with no way to lower it. The fix is the **pilot-operated** check valve. It behaves as a normal check — free flow in to raise, drop-tight seal to hold — until a **pilot** pressure line is energised, which mechanically pushes the poppet off its seat and lets the trapped oil out in a controlled way, so the platform can descend. And because it seals the load side directly, it is mounted right at the cylinder port: even if a hose bursts, the poppet slams shut and the load cannot fall. It is a lock with a deliberate, pilot-operated key.

## 3. The Idea You Now Need

The load sets the pressure the hold must contain — the cap side carries the whole weight:

$$ p_\text{hold} = \frac{F}{A_\text{cap}} = \frac{19\,600}{1963.5\times10^{-6}} \approx 100\ \text{bar} $$

Any leak past the seal drains the cap side, and the piston sinks at a rate set by that leak over the piston area:

$$ v_\text{drift} = \frac{Q_\text{leak}}{A_\text{cap}} $$

A spool centre leaking a modest ~10 cm³/min gives $v_\text{drift} \approx 0.085\ \text{mm/s}$ — it crosses the ±1 mm band in about **12 seconds**. A pilot-operated check valve is essentially **drop-tight** ($Q_\text{leak} \approx 0$), so $v_\text{drift} \approx 0$ and the hold lasts indefinitely. To release it, the pilot must unseat the poppet against the load pressure; with a pilot **ratio** $R = A_\text{pilot}/A_\text{poppet}$ (typically 3:1), the pilot pressure needed is

$$ p_\text{pilot} \ge \frac{p_\text{load}}{R} = \frac{100}{3} \approx 33\ \text{bar} $$

— a modest signal the system already has, so lowering stays fully under command.

## 4. Visual Explanation

<figure markdown>
  ![On the left, a spool centre holding the load: the spool blocks ports A and B, but arrows show oil weeping through the few-micron sliding gap, and the piston creeping downward, labelled leaks about 10 cubic centimetres per minute so it drifts past plus or minus 1 millimetre in about 12 seconds. On the right, a pilot-operated check valve mounted at the cylinder cap port: a poppet pressed onto its seat seals drop-tight so the load is held with no drift, while a pilot line, when pressurised to about 33 bar, pushes the poppet off its seat to let the load down in a controlled way. Below, a drift-versus-time chart: the spool line climbs steadily out of the plus or minus 1 millimetre band within seconds, while the pilot-operated check valve line stays flat on zero.](assets/m06-l3-holding.svg){ width="760" }
</figure>

On the left, the problem: a spool blocks the ports but seals only with a sliding fit, so oil weeps past and the piston creeps — a ~10 cm³/min leak drifts the platform out of its ±1 mm band in about 12 seconds. On the right, the fix: a **pilot-operated check valve** at the cylinder port presses a poppet onto a seat, **drop-tight**, so the load is held with no measurable drift; a pilot pressure of ~33 bar (a 3:1 ratio against the 100 bar load) unseats the poppet to lower the platform on command. The chart makes it plain — the spool hold walks out of tolerance in seconds; the check-valve hold stays flat.

## 5. Engineering Example

This is exactly why a car parked on a hill uses a **parking pawl** — a positive tooth that locks the transmission — and not just "leaving it in gear." A meshed gear or a hydraulic spool holds *mostly*, but a heavy enough load creeps past it; a pawl or a seated poppet holds *absolutely*. The same logic governs any hydraulic load that must not fall: aerial platforms, press rams, vehicle lifts all carry a **load-holding (pilot-operated check) valve bolted straight to the cylinder**, precisely so a burst hose or a leaking spool cannot let the load drop. It is a safety component as much as a precision one — the difference between a platform that holds its height and one that slowly, dangerously, sinks.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the platform holding its load:

- Load $F = 19.6\ \text{kN}$ on a 50 mm bore, $A_\text{cap} = 1963.5\ \text{mm}^2$
- Spool leakage ~10 cm³/min; pilot-operated check valve leakage ≈ 0; pilot ratio $R = 3$

**Find** — the holding pressure, the drift each option gives, and the pilot pressure to lower.

**Assumptions**

- Isothermal oil; leakage steady at holding pressure; ±1 mm tolerance.

**Solution**

$$ p_\text{hold} = \frac{19\,600}{1963.5\times10^{-6}} \approx 100\ \text{bar} $$

$$ v_\text{spool} = \frac{10\times10^{-6}/60}{1963.5\times10^{-6}} \approx 0.085\ \text{mm/s} \Rightarrow \pm1\ \text{mm in} \approx 12\ \text{s} $$

$$ v_\text{POCV} \approx 0 \quad(\text{drop-tight}); \qquad p_\text{pilot} \ge \frac{100}{3} \approx 33\ \text{bar} $$

**Result**

$$ \boxed{\text{Spool centre drifts out of }\pm1\text{ mm in }\sim12\text{ s};\ \text{a POCV holds indefinitely, opened by }\sim33\text{ bar pilot}} $$

**Engineering Interpretation** — The load holds the cap side at ~100 bar, and that pressure is relentless: a mere 10 cm³/min weeping past the spool sinks the platform 0.085 mm every second, breaching the ±1 mm spec in about twelve seconds. No spool tolerance realistically fixes that. A **pilot-operated check valve** seals on a seat instead of a sliding fit, so its leakage is effectively zero and the platform holds its height for as long as you like — while a 33 bar pilot signal (easily supplied) unseats it for a controlled descent. Bolted at the cylinder port, it doubles as a safety lock against hose failure. The valve package now *holds*; what remains is to make the *motion* — up and down — smooth and precise, which is metering, the subject of Lesson 04.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson03_holding.html" title="Holding the load — spool drift vs pilot-operated check valve" style="width:100%;height:860px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this demo in a new tab ↗](demos/lesson03_holding.html)

Choose the hold — a blocked spool centre or a pilot-operated check valve — and set the leakage. Watch the drift rate and the time to breach the ±1 mm band: the spool walks the platform out of tolerance in seconds, worse the more it leaks, while the check valve stays flat on zero however long you wait.

## 8. Coding Exercise

```python
A_cap = 1963.5e-6            # m^2 (50 mm bore)

def drift_mm_s(Q_leak_ccmin):
    Q = Q_leak_ccmin*1e-6/60          # m^3/s
    return Q/A_cap*1000               # mm/s

def time_to_1mm(Q_leak_ccmin):
    v = drift_mm_s(Q_leak_ccmin)
    return float('inf') if v==0 else 1.0/v   # s

print(round(drift_mm_s(10), 3), "mm/s spool drift")   # ~0.085
print(round(time_to_1mm(10), 1), "s to +/-1 mm")      # ~12
print(time_to_1mm(0), "s for a drop-tight POCV")       # inf
```

**Your task:** confirm a 10 cm³/min spool leak breaches ±1 mm in ~12 s and a drop-tight valve never does. Then: what leakage would a spool need to stay within ±1 mm for a full 10-minute hold — and is that realistic for a sliding fit at 100 bar?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson03_quiz.html" title="Holding the load — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

[Open this quiz in a new tab ↗](quizzes/lesson03_quiz.html)

1. Why can't a blocked spool centre hold the load to ±1 mm?
2. How does a check valve seal differently from a spool, and why does that matter?
3. Why won't a *plain* check valve work for a platform that must also lower?
4. What does the pilot pressure do, and roughly how much is needed here?
5. Why is the load-holding valve mounted right at the cylinder port?

## 10. Challenge Problem

A designer proposes saving cost by relying on a high-quality "zero-leak" spool valve instead of a separate load-holding valve. Argue the two reasons this is risky for the platform: the drift budget (what leakage the ±1 mm hold actually permits over a realistic hold time), and safety (what happens to a spool-held load if a supply hose bursts versus a POCV-held one). Then explain the trade-off in choosing the pilot ratio: what does a higher ratio (say 4:1 vs 3:1) buy and cost?

## 11. Common Mistakes

- **Trusting a spool centre to hold precisely.** It blocks, it does not seal — a heavy load creeps past the sliding fit and out of a tight tolerance in seconds.
- **Using a plain check valve.** It holds drop-tight but traps the load forever; lowering needs the *pilot-operated* version.
- **Mounting the holding valve away from the cylinder.** Put it at the cylinder port, or a hose failure between valve and cylinder drops the load — defeating its safety purpose.
- **Forgetting the pilot must overcome the load.** The poppet is pressed shut by the load pressure; the pilot must supply enough (≈ load/ratio) to unseat it, or the platform will not lower.

## 12. Key Takeaways

**The decision you can now make:** hold the load drift-free with a pilot-operated check valve, and release it on command.

- A spool centre only **blocks** (sliding fit); at ~100 bar hold pressure a ~10 cm³/min leak drifts the platform out of **±1 mm in ~12 s**.
- A **pilot-operated check valve** seals **drop-tight** on a seat: leakage ≈ 0, so drift ≈ 0 and the hold lasts indefinitely.
- Free flow *in* to raise; a **pilot** pressure (≈ load/ratio ≈ **33 bar** at 3:1) unseats the poppet to lower under control.
- Mounted **at the cylinder port**, it is also a safety lock — a burst hose cannot drop the load.
- The platform now holds its height precisely and safely. **Lesson 04 makes the motion smooth** — metering flow with a proportional valve for controlled speed and ±1 mm positioning.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — why spools drift

```
Explain why a hydraulic spool valve cannot hold a load without drift: the spool seals a port with a close sliding clearance (a few microns), not a positive seal, so oil leaks past under load pressure. For a 50 mm bore cylinder holding 19.6 kN (~100 bar) with ~10 cc/min of spool leakage, compute the drift rate and the time to move 1 mm.
```

**Challenge** — the pilot-operated check valve

```
Describe a pilot-operated check valve for load holding: how it allows free flow in to raise, seals drop-tight to hold, and is opened by a pilot pressure to lower. Explain the pilot ratio (A_pilot/A_poppet) and compute the pilot pressure needed to unseat it against a 100 bar load at a 3:1 ratio. Why is it mounted at the cylinder port?
```

**Explore** — holding versus metering

```
For a hydraulic platform that must hold a load to +/-1 mm and also raise and lower it smoothly, explain the difference between the *holding* problem (drift-free lock) and the *metering* problem (controlled speed). Why are these solved by different valves - a pilot-operated check valve for holding, and a proportional valve for metering?
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 06 Lesson 03 — Holding the load.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*The load is now held drift-free — a pilot-operated check valve seals it on a seat, and a pilot signal releases it to descend. Next: Lesson 04 — Metering flow: the proportional valve, where the orifice law becomes smooth, precise control of speed and position.*
