# Visual Standard v1.0

*The visual companion to the Global Curriculum Production Standard. Governs every figure (SVG) and interactive demonstration in the Fluid Power Systems Engineering course. Promoted from the Module 01 Lesson 01 reference, which is the worked example of this standard.*

---

## 1. Design tokens

**Palette (hydraulic identity)**

| Token | Hex | Use |
|-------|-----|-----|
| Ink | `#0C2235` | titles, primary strokes |
| Steel | `#1B3A55` | component bodies, parameters |
| Teal | `#0E7E8C` / `#1FB6AE` | fluid, section titles, flow |
| Amber | `#DD841A` / `#F4A93C` | load, force, the "output" |
| Slate | `#586876` | annotations, captions |
| Alert red | `#C2463B` | gauge needles, warnings |
| Surfaces | `#FFFFFF` cards on `#F7F9FB`/`#EBEFF4` | panels |

**Type families:** `IBM Plex Sans` for labels; `IBM Plex Mono` for all numeric values and units.

---

## 2. Figure type hierarchy (mandatory)

Every figure uses exactly these four tiers. They must be visually distinct so no two roles compete (the defect that prompted this rule: a parameter sized like a section title).

| Level | Role | Spec | Example |
|-------|------|------|---------|
| **L1** | Figure title | 26 px · 700 · Ink | "The machine you are building" |
| **L2** | Section / component name | 15 px · 700 · letter-spacing 1.2 · Teal · UPPERCASE | POWER UNIT, CYLINDER |
| **L3** | Parameter / value | 13 px · 600 · Mono · Steel | 100 bar |
| **L4** | Annotation / caption | 12 px · 400 · Slate | motor + pump, pressure becomes force |
| *callout* | Value on an object | 20 px · 700 · Mono · on the object's fill | 2 t (on the load) |

Rule of thumb: a **parameter (L3) is always visually subordinate to a section title (L2)**. Numbers are data, not headers.

---

## 3. Figure consistency (every figure tells the same story as the text)

The reader must never have to decide which is correct — the figure or the prose. Match on all five:
load direction · flow direction · force direction · component labels · operating state.

Reference: the M01 L01 figure — fluid enters the cap side, the piston and rod move **up**, the load sits **above** the cylinder, and the lift arrow points **up**. Every cue agrees with "lift two tonnes."

---

## 4. Multi-width review (mandatory before ship)

Render and inspect every SVG at **desktop (~1200 px), tablet (~760 px), and mobile (~380 px)**. A figure that looks right at 1200 px often fails on a phone.

**Load-bearing rule:** the figure's core message must live in L1–L3 (title, component names, key values), because L4 annotations become hard to read at mobile size. If a label is essential to understanding, it cannot be an L4 annotation.

---

## 5. Demo realism ladder

Interactive demos resemble real hydraulic systems and show **machine behavior**, not just numbers (pistons that move, gauges that read, loads that rise).

| Stage | Modules | Representation |
|-------|---------|----------------|
| **Pictorial** | 01–02 (intro) | Labeled, recognizable components — cylinders, pistons, hoses, a dial gauge, a load. The M01 L01 hydraulic jack is the reference. |
| **Schematic** | advanced (valves, circuits onward) | **ISO 1219** standard symbols — proper gauge, directional valve, relief, pump/motor symbols, full hydraulic schematics. |

ISO 1219 symbols are **deferred to advanced modules**; introductory modules stay pictorial so beginners recognize physical parts first.

---

## 6. Open item — the single consistent machine (decide before Module 03)

The course currently describes "a machine that lifts two tonnes." That framing is strong, but the curriculum needs **one consistent machine** that grows module to module, named before Module 03–04 so later figures, demos, and worked examples all depict the same system.

Candidates to choose from: a **lift / hoist**, a **press**, a **manipulator/arm**, a **loader**, a **forklift**. No decision is forced now; this is a tracked requirement with a Module-03 deadline. Recommendation when ready: pick the machine whose canonical parameters (50 mm bore, 100 bar) and positioning task already match — i.e. a compact **lift/positioning actuator** — so the existing figures and numbers carry forward unchanged.

---

## 7. Conformance

A figure or demo is done only when it satisfies §2 (hierarchy), §3 (consistency), §4 (multi-width), and — for demos — §5 (realism). The M01 L01 figure and jack demo are the reference implementations of v1.0.
