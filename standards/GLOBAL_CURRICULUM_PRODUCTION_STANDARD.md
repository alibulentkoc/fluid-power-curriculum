# Global Curriculum Production Standard

*Version 1.1. The governing standard for all curriculum content production in the Fluid Power Systems Engineering course. It combines the Engineering Content Quality Directive (presentation quality) with five learning-quality rules. Every lesson, figure, demo, worked example, and quiz must satisfy it. The Trainer Architecture and the approved Frameworks remain authoritative and are not affected by this document.*

The standard answers two questions at once. Not only **"Does it look professional?"** but **"Does it teach engineering?"**

---

## Part A — Presentation Quality

### A1. Formulas
All equations render professionally through MathJax / LaTeX. Never publish an equation as raw text such as `[ F = p × A ]` or `[ A = π/4(0.050)^2 ]`. Worked calculations appear publication-ready, never as draft-note text blocks.

### A2. Diagram Consistency
**Every figure must tell the same story as the text. The reader should never have to decide which one is correct.** A figure must agree with the prose on:
- load direction
- flow direction
- force direction
- component labels
- operating state

If the text says the cylinder lifts a load upward, the figure shows fluid entering the cap side, the piston and rod moving up, and the load and force arrows pointing up. No mismatch, ever.

### A3. SVG Quality
Every SVG must be publication quality:
- text fits inside its boxes
- no labels touch borders
- no labels cross lines
- consistent font hierarchy
- readable when printed

Figures follow the four-tier type hierarchy (L1 title, L2 section, L3 parameter, L4 annotation) of **Visual Standard v1.0**, so a parameter never competes with a section title. **Multi-width review is mandatory.** Every SVG is reviewed at **desktop, tablet, and mobile width** before it ships, because a diagram that looks right at 1400 px often becomes unreadable on a phone. Practical rule: **load-bearing labels must live in the primary type tier** (titles, component names, key values), never in tiny secondary captions — so the figure's core message survives at mobile size.

### A4. Quizzes
The Module 01 Lesson 01 quiz is the standard. Every quiz preserves:
- immediate feedback
- a short explanation for each answer
- unlimited attempts
- concise engineering questions

Apply this style everywhere.

---

## Part B — Learning Quality

### B1. Engineering Decision Rule
Every lesson must answer: **what engineering decision becomes possible after this lesson?** The learner must leave with a **capability, not merely information**. A lesson that only conveys facts has not met the standard; it must end the learner able to *make a choice* they could not make before.

### B2. Machine-First Rule
Every lesson begins with, in this order, **before any formula appears**:
1. a machine
2. a problem
3. a decision

The learner must *need* the lesson before receiving it. Equations are tools introduced only once the need is felt — never as the opening move.

### B3. Realism Rule
Interactive demonstrations and figures should **resemble actual hydraulic systems** whenever practical. Students should recognize real components.
- **Prefer:** pumps, cylinders, hoses, gauges, valves, actuators, reservoirs.
- **Avoid:** abstract sliders alone, floating boxes, generic shapes.

A demo should show **machine behavior**, not just numerical behavior — pistons that move, gauges that read, loads that rise.

### B4. Worked Example Template
Every worked example follows this structure, in order:

1. **Given** — the known quantities, with units.
2. **Find** — the single thing being determined.
3. **Assumptions** — the simplifications that make the calculation valid (e.g. lossless, steady-state, full-bore pressure).
4. **Solution** — the steps, as rendered equations.
5. **Result** — the answer, stated cleanly with units.
6. **Engineering Interpretation** — what the number *means* for the machine and the decision at hand.

The Assumptions and Interpretation steps are what turn a calculation into engineering thinking; they are not optional.

### B5. Learner Language Rule
Use plain engineering language first. **Do not assume students understand internal curriculum vocabulary.** In lesson prose, avoid:
- twin
- artifact
- benchmark
- competency
- workcell
- state, pipeline

Introduce a specialized term only in the lesson that formally teaches it, and define it when you do. Until then, use the plain word: *digital model* (not twin), *design / report* (not artifact), *test* (not benchmark), *skill* (not competency), *machine* (not workcell).

### B6. Engineering Narrative Continuity Rule
Every module must clearly answer four questions, so the learner never feels modules are independent topics:

1. **What machine are we building?**
2. **What part of the machine is being designed now?**
3. **How does this module connect to the previous module?**
4. **What new engineering decision becomes possible because of this module?**

Each module advances the construction, understanding, or control of **the same machine**. The machine is the central story of the curriculum — the sequence must read as *machine → machine → machine → machine*, never *topic → topic → topic → topic*. (This is the rule that prevents the drift that damaged the earlier curriculum.)

---

## Part C — Definition of Done

A piece of curriculum content is complete only when all of the following hold:

| # | Check |
|---|-------|
| 1 | Opens machine → problem → decision, before any equation (B2) |
| 2 | States the engineering decision the learner can now make (B1) |
| 3 | Every figure agrees with the text on all five consistency points (A2) |
| 4 | Every SVG reviewed and readable at desktop, tablet, and mobile (A3) |
| 5 | Interactive demo resembles a real hydraulic system and shows machine behavior (B3) |
| 6 | Worked example follows the six-part template including Assumptions (B4) |
| 7 | All equations rendered, none as raw text (A1) |
| 8 | Quiz follows the Module 01 standard (A4) |
| 9 | No internal curriculum vocabulary in learner-facing prose (B5) |
| 10 | Module states the machine, the part being designed, the link to the previous module, and the new decision it unlocks (B6) |

Content that fails any line is not done. With these rules, the instruction to Claude is no longer only *"make it look professional"* — it is *"make it feel like engineering."*
