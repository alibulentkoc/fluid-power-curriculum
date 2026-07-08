!!! abstract "You are here"
    **Module 07 — Circuits**  ·  **Unit 1 — The Complete Circuit**  ·  **Lesson 05 — The complete fail-safe circuit**

# Lesson 05 — The complete fail-safe circuit

> **Module 07 · Lesson 05** · *Making it safe when things break.*
> The circuit works; now make it fail safely. This lesson maps each way the platform could fail — hose burst, power loss, overload, runaway — to the protection that already guards it, and closes Module 07 with the complete, fail-safe schematic.
>
> **Learning outcome:** Explain how the platform circuit protects the load and the machine against hose burst, power loss, overload, and overrunning descent — and identify which component provides each protection and why its placement matters.

---

## 1. Why This Matters

Every machine works on a good day. The measure of a *safe* machine is what it does on a bad one — when a hose splits, the power drops out mid-lift, someone overloads it, or the load tries to run away on the way down. A two-tonne platform that holds fine until the moment something breaks and then drops is not a safe machine; it is an accident waiting for a trigger. The whole point of the valve set you have been building is that the load stays put — or moves only under control — through every one of those failures, without anyone having to react.

So the decision this lesson settles is: **for each way the platform can fail, which protection keeps it safe, and does the circuit already have it?** The satisfying answer is that it mostly does — the choices made in earlier lessons were fail-safe choices, whether or not they were named that way. Putting the counterbalance valve at the cylinder guards against a burst hose; piloting it from the rod line means the load only descends under active command; spring-centring the directional valve means power loss freezes the load; the relief valve caps any overload. This lesson makes those protections explicit, checks that nothing is missing, and closes the circuit.

## 2. Physical Intuition

Think about what each failure *wants* to do, and what stops it. A **burst cap hose** wants to dump the cap oil and drop the load instantly — but the counterbalance valve sits bolted to the cylinder's cap port, *upstream* of the hose, and it is closed unless commanded; the burst simply empties a dead hose while the load hangs safely on a shut valve. **Power loss** wants to leave the valve wherever it was and the load unsupported — but the directional valve is spring-centred, so losing power snaps it back to the blocked tandem centre, and with the pump dead there is no pilot to open the counterbalance; the load freezes. **Overload** wants to drive the pressure up until something bursts — but the relief valve opens at 115 bar and spills the excess to tank, so the pressure never gets there.

The unifying idea is that the load can only move when the circuit is *actively, correctly commanded* — pump running, valve shifted, pilot present. Every passive failure removes one of those conditions, and the counterbalance's default answer to "should I let the load move?" is *no*. That is what fail-safe means here: the safe state is the default state, and it takes deliberate, powered action to leave it. The one thing the operator must still respect is that these protections assume correct installation — the counterbalance at the cylinder, not out at the valve stack — which is why placement, not just presence, is the design.

## 3. The Idea You Now Need

Fail-safe is a **mapping from failure mode to protection**, and each protection is a component you have already placed:

$$ \text{burst} \to \text{CBV at cylinder} \quad\big|\quad \text{power loss} \to \text{spring centre + CBV} \quad\big|\quad \text{overload} \to \text{relief} \quad\big|\quad \text{runaway} \to \text{CBV back-pressure} $$

The counterbalance appears in three of the four — it is the keystone. Two placement rules make it work: it must be **at the cylinder port** (so a burst hose is downstream of it) and **piloted from the rod line** (so it opens only while the pump commands a descent). The relief covers the pressure axis, set at **115 bar**, above the ~109 bar working peak but below anything that would damage the pump or lines. Formally, the load is held whenever

$$ p_\text{pilot} < \frac{p_\text{set}-p_\text{load}}{\text{ratio}}=\frac{130-100}{3}\approx 10\ \text{bar} $$

and every passive failure drives the pilot to zero — so the default is *held*. The circuit is fail-safe because its safe state is its rest state.

## 4. Visual Explanation

<figure markdown>
  ![The complete platform circuit annotated with its fail-safe protections. Four callouts connect a failure mode to the component that guards it. Hose burst points to the counterbalance valve mounted at the cylinder cap port, noting it is upstream of the hose so a burst leaves the load on a shut valve. Power loss points to the spring-centred directional valve returning to the blocked tandem centre and to the counterbalance holding drop-tight with no pilot. Overload points to the relief valve on the pressure line capping the system at 115 bar. Runaway on descent points to the counterbalance valve providing metered back-pressure, opening only with the rod-line pilot. The circuit itself is the same complete schematic from the earlier lessons.](assets/m07-l5-failsafe.svg){ width="720" }
</figure>

Read the four callouts as the circuit's safety case. Three of them point at the **counterbalance valve** — burst, power loss, and runaway all end at that one component, which is why its placement at the cylinder and its rod-line pilot are the most important decisions in the whole circuit. The fourth, **overload**, points at the relief valve on the pressure line. Notice what makes each work: the counterbalance is *upstream* of the burst-prone hose, the directional valve *springs* back to blocked, the relief sits *on the pressure line* where a spike appears. Presence is not enough — placement is the protection.

## 5. Engineering Example

This is why lifting equipment is regulated around exactly these components and their placement. Load-holding valves on cranes, aerial platforms, and telehandlers are required to be integral to or directly mounted on the actuator — bolted to the cylinder, not connected by a hose — for the single reason this circuit demonstrates: a valve out at the manifold cannot protect against a burst between it and the cylinder. Inspectors check for it; standards mandate it. The same logic drives spring-centred or fail-to-neutral directional valves on anything that holds a load overhead, and relief protection on every pressure line. When you see a counterbalance valve screwed directly into a cylinder port on real equipment, you are looking at this lesson made physical — the difference between a platform that holds when a hose lets go and one that does not.

## 6. Worked Example

<div class="worked" markdown="1">

**Given** — the complete platform circuit; four failure modes: burst cap hose, power loss, overload, runaway descent.

**Find** — the protecting component for each, and whether placement matters.

**Assumptions**

- Counterbalance at the cylinder cap port, piloted from the rod line, set 130 bar; relief 115 bar; spring-centred DCV.

**Solution**

$$ \text{burst}\to\text{CBV (at cylinder)}, \quad \text{power loss}\to\text{spring centre}+\text{CBV}, \quad \text{overload}\to\text{relief}, \quad \text{runaway}\to\text{CBV} $$

$$ \text{load held whenever } p_\text{pilot}<\frac{130-100}{3}\approx10\text{ bar}; \quad \text{every passive failure} \Rightarrow p_\text{pilot}=0 $$

**Result**

$$ \boxed{\text{The safe (held) state is the default; only active, commanded pump pressure can move the load}} $$

**Engineering Interpretation** — The circuit's safety rests on one principle expressed through a few components: the load moves only when actively commanded, so any failure that removes the command leaves it safe. The **counterbalance valve is the keystone** — it answers burst, power loss, and runaway — but only if it is mounted **at the cylinder** (a burst must be downstream of it) and **piloted from the rod line** (descent must require live pump pressure). Move it out to the valve stack and the burst protection evaporates even though the part is still "in the circuit." The **relief valve** covers the one failure the counterbalance cannot — an overpressure — by capping the line at 115 bar. And the **spring-centred directional valve** ensures power loss defaults to blocked, not floating. Nothing here is extra hardware added for safety; the fail-safe behaviour is a *consequence* of placing ordinary components correctly. That is the deepest lesson of the module: a good circuit is safe by construction, not by afterthought.

</div>

## 7. Interactive Demonstration

<iframe src="demos/lesson05_failsafe.html" title="The complete fail-safe circuit — failure modes and protections" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

Trigger each failure — burst hose, power loss, overload, runaway — and watch which component holds the line and what happens to the load. Notice that three of the four end at the counterbalance valve, and that the load stays safe in every case.

## 8. Coding Exercise

```python
# map each failure mode to the component that protects the platform
protection = {
    "hose_burst":  ("counterbalance @ cylinder", "upstream of the hose; stays shut with no pilot -> load held"),
    "power_loss":  ("spring-centred DCV + counterbalance", "valve springs to blocked centre; no pump -> no pilot -> held"),
    "overload":    ("relief valve @ 115 bar", "caps system pressure; load cannot over-pressurise the circuit"),
    "runaway":     ("counterbalance back-pressure", "meters descent; opens only with ~10 bar rod-line pilot"),
}
for fault, (part, why) in protection.items():
    print(f"{fault:12} -> {part:38} | {why}")

# the keystone check: is the load held when uncommanded?
def held(pump_on, pilot_bar): return not (pump_on and pilot_bar >= 10)
print("\nuncommanded (pump off, no pilot) held?", held(False, 0))
```

**Your task:** confirm the load is held when uncommanded. Then: move the counterbalance valve from the cylinder to the valve stack (a hose now runs between them) — which single entry in `protection` stops being true, and why?

## 9. Knowledge Check

Formative — unlimited attempts, immediate feedback; does not affect your grade.

<iframe src="quizzes/lesson05_quiz.html" title="The complete fail-safe circuit — knowledge check" style="width:100%;height:900px;border:1px solid #e2e8f0;border-radius:12px"></iframe>

1. If the cap hose bursts, what holds the load, and why does its placement matter?
2. On power loss mid-lift, what returns the directional valve to a safe state, and what keeps the load up?
3. Which failure does the relief valve protect against, and where must it sit?
4. What single principle makes the circuit fail-safe across all these modes?
5. Why must the counterbalance valve be mounted at the cylinder rather than at the valve stack?

## 10. Challenge Problem

A manufacturer, to simplify plumbing, relocates the counterbalance valve from the cylinder cap port out to the valve manifold, running a single hose from the manifold to the cylinder. The platform passes every functional test — it raises, holds, and lowers perfectly. Explain why it has nonetheless become unsafe: which specific failure is no longer protected, exactly what would happen, and why the functional tests did not reveal it. Then state the general principle about safety components that this illustrates, connecting it to why regulations mandate actuator-mounted load-holding valves.

## 11. Common Mistakes

- **Treating the counterbalance as "just a holding valve."** It also provides burst protection and controlled descent — but only mounted at the cylinder.
- **Relocating the counterbalance to the valve stack.** A hose then runs unprotected to the cylinder; a burst there drops the load. Placement is the protection.
- **Assuming a closed-centre valve is fail-safe on power loss.** It must be *spring-centred* to return to the safe blocked state when de-energised.
- **Forgetting the relief covers a failure the counterbalance cannot.** Overpressure needs the relief; the counterbalance does not cap system pressure.

## 12. Key Takeaways

**The decision you can now make:** map every platform failure mode to the protection that keeps it safe, and confirm the circuit provides each by construction.

- **Hose burst → counterbalance at the cylinder** (upstream of the hose; shut without pilot).
- **Power loss → spring-centred DCV + counterbalance** (springs to blocked; no pump means no pilot).
- **Overload → relief valve** on the pressure line, at 115 bar.
- **Runaway descent → counterbalance back-pressure**, opening only with the rod-line pilot.
- **One principle:** the load moves only under active command, so every passive failure leaves it held. **Placement is the protection.**

**Module 07 complete.** You can now read, assemble, trace, budget, and fail-safe a full hydraulic circuit. **Module 08 — Electrohydraulic control** replaces the manual lever with sensors and solenoids, closing the loop so the platform can hold ±1 mm and position itself automatically — built on exactly this circuit.

## AI Learning Companion

Copy a prompt into an AI assistant.

**Deepen** — the safety case

```
Explain how a hydraulic lift-platform circuit (counterbalance valve at the cylinder piloted from the rod line, spring-centred 4/3 directional valve, relief valve on the pressure line) stays safe under each failure: a burst cap hose, loss of power mid-lift, an overload, and an overrunning descent. For each, name the protecting component and why its placement matters.
```

**Challenge** — the relocation trap

```
A counterbalance (load-holding) valve is moved from a cylinder's cap port out to the valve manifold, with a hose between them. The platform still raises, holds, and lowers perfectly. Explain why it is now unsafe, which failure is unprotected, and why functional testing misses it. Relate this to why standards require actuator-mounted load-holding valves.
```

**Explore** — safe-by-construction

```
Discuss the principle that a hydraulic circuit should be 'safe by construction' - its safe state being its default rest state - rather than relying on added safety devices. Use a lift platform (counterbalance, spring-centred valve, relief) as the example, and contrast it with a design that would need active intervention to stay safe.
```

## Global Learning Support

Need this lesson in another language? Copy the prompt into an AI assistant. English remains the authoritative source.

**Supported languages (initial):** English · Español · 中文 (Simplified) · Türkçe

```
I just completed Module 07 Lesson 05 — The complete fail-safe circuit.
Explain this lesson in [Spanish / Simplified Chinese / Turkish], keeping common engineering terms in English where usual.
Then give me: a short summary, three practice questions, and one challenge problem.
```

---

*Module 07 is complete — you can build a full hydraulic circuit and make it safe by construction. Next: Module 08 — Electrohydraulic control, where sensors and solenoids close the loop around this very circuit to hold the platform to ±1 mm.*
