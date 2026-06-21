# CREDIT_FRAMEWORK.md

**Project:** Fluid-Powered Physical AI Curriculum
**Document type:** Academic-credit framework (Credit-Bearing Framework requirement, Directive v3.0)
**Version:** 1.0
**Last updated:** 2026-06-20
**Consumes:** `CERTIFICATION_FRAMEWORK.md`, `COMPETENCY_MAP.md`, `ASSESSMENT_MAP.md`, `LEARNER_JOURNEY.md`
**Status:** Authoritative for the academic-credit overlay. **Separate from lesson content** (directive requirement). Does **not** itself confer credit — institutions do, under their own authority.

---

## 0. Purpose and authority

This framework defines how the program's credentials become a basis for **academic credit**. The directive requires four things for credit: *competency verification, assessment evidence, instructor evaluation, institutional compliance.* The first two already exist (certification provides them); this document adds the remaining two as an **overlay** and keeps the whole thing separate from lesson content.

It **redefines nothing**: no new competency, assessment, or benchmark. It consumes the certification credential and its evidence bundle and wraps academic machinery around it. Credit is conferred by an institution, not by this framework; this framework makes the program *credit-ready*.

Vocabulary is the canonical set in `ARCHITECT_DECISIONS.md` §5.

---

## 1. Design principles

1. **Credit overlays evidence; it does not replace it.** The competency basis stays exactly as certification defines it.
2. **Separate from lesson content.** Per the directive, credit requirements live here, not inside lessons. A lesson never changes because a learner is on the credit path.
3. **Instructor judgment is the added human element.** Everything else is automated evidence; credit adds qualified human evaluation and institutional accountability.
4. **Institution-agnostic core, institution-specific configuration.** The framework is general; per-institution policy (catalog, grading scale, accreditation) is configured at adoption.
5. **Honest about dependencies.** Credit-hour justification needs workload data the program has not yet produced; this is flagged, not faked.

---

## 2. The overlay model

```
        CERTIFICATION (exists)                 CREDIT OVERLAY (this document)
   ┌──────────────────────────────┐      ┌────────────────────────────────────┐
   │ Credential (Analyst…Phys AI)  │      │ + Instructor evaluation / sign-off │
   │ Evidence bundle (A1…A5)       │ ───► │ + Academic-integrity controls      │ ───► Academic credit
   │ Competency basis (C1…C5)      │      │ + ABET outcome mapping             │      (conferred by institution)
   │ Durable, attributable (§7)    │      │ + Credit-hour justification        │
   └──────────────────────────────┘      └────────────────────────────────────┘
                                                 separate from lesson content
```

The **Academic Credit learner path** (`CERTIFICATION_FRAMEWORK.md` §4) is the seam. A credit learner earns the credential by evidence exactly like everyone else, then the overlay adds instructor evaluation and institutional processing on top.

---

## 3. What credit adds (the four directive requirements)

| Requirement | Source | Status |
|-------------|--------|--------|
| Competency verification | Certification credential (C1–C5) | **Provided** — reused unchanged |
| Assessment evidence | Evidence bundles (A1–A5, Trainer) | **Provided** — reused unchanged |
| Instructor evaluation | §6 (this document) | **Added here** |
| Institutional compliance | §8 (this document) | **Added here** (configured per institution) |

Only the bottom two are new work; the top two are consumed.

---

## 4. Competency → ABET student-outcome mapping

For ABET-accredited engineering programs, competencies map to ABET EAC **Student Outcomes (1–7)**. The strongest alignments:

| Competency | ABET outcomes (primary) | Basis |
|------------|-------------------------|-------|
| C1 Model Hydraulic Systems | 1, 7 | Applies math/science/engineering to model a system; acquires/applies new knowledge |
| C2 Analyze System Performance | 1, 6 | Problem-solving; develops/analyzes/interprets (simulated then measured) data |
| C3 Design Fluid Power Solutions | 2, 1 | Engineering design meeting needs with realistic constraints |
| C4 Create Electrohydraulic Controllers | 1, 6 | Engineering judgment; experimentation/validation of control |
| C5 Build Physical AI Systems | 2, 6, 7 | Integrated design, validation against a twin, new-technology mastery |
| Documentation across modules | 3 | Effective communication (lesson reports, capstone documentation) |

**Verification flag (CR-2):** ABET Student Outcomes 1–7 are stated from the established EAC general criteria; the adopting program must confirm them against the **current ABET accreditation cycle** before relying on this mapping. Outcomes 4 (ethics) and 5 (teamwork) are not strongly covered by the current single-builder arc and would need explicit course elements if required.

---

## 5. Credit-hour justification (workload model)

Academic credit is justified by learner **workload**, not topics. A standard reference: roughly **45 hours of total student work per credit hour** (Carnegie-unit equivalent: ~1 contact hour + ~2 out-of-class hours per week over a ~15-week term).

The program's credit value is therefore: *(estimated total time-on-task across the credentialed modules) ÷ (~45 hours/credit)*.

**Dependency flag (CR-1) — blocking for credit-hour assignment.** This calculation requires **per-module time-on-task estimates, which the program has not yet produced** (the gap recorded in the Transformation Plan §3). Until those estimates exist, this framework defines the *method* but cannot assign a defensible credit-hour number. Producing time-on-task estimates is a credit-owned prerequisite (CR-1), not a value to invent here.

Provisional structure (numbers pending CR-1):

| Credential | Credentialed modules | Credit basis |
|------------|----------------------|--------------|
| Fluid Power Analyst | M01–M04 | workload(M01–04) ÷ 45 |
| Fluid Power Designer | M05–M08 | workload(M05–08) ÷ 45 |
| Electrohydraulic Engineer | M09–M10 | workload(M09–10) ÷ 45 |
| Physical AI Engineer | M11–M12 | workload(M11–12) ÷ 45 |
| Full certification | M01–M12 | sum ÷ 45 |

---

## 6. Instructor evaluation layer

Credit adds the human judgment automated evidence cannot supply. The instructor does **not** re-grade the benchmark (the Trainer already scored it deterministically); the instructor verifies what evidence alone cannot:

- **Authenticity/attribution** — the evidence is the learner's own work (identity-verified, per certification §7).
- **Process and reasoning** — the learner can explain the design choices behind the artifact (an oral or written check; communication, ABET 3).
- **Academic-integrity compliance** — within the institution's rules (§7).
- **Sign-off** — the instructor attests the credential meets the course's learning outcomes.

The instructor's sign-off, plus the certification credential, is what the institution records as credit. This is the only place a human judgment enters; it sits *on top of* the evidence, never replacing it.

---

## 7. Academic-integrity controls (overlay on certification policy)

The Academic Credit path is where certification's permissive defaults may be tightened (`CERTIFICATION_FRAMEWORK.md` §8 explicitly permits this):

- **Re-attempts** may be limited or cooldown-gated (vs unlimited for self-paced).
- **Proctoring / supervised capstone** may be required for the Physical AI credential.
- **Identity verification** is required (already implied by attributable evidence).
- **Originality** of design choices is checked via the instructor's process review (§6).

These controls are configured per institution; the framework provides the hooks, not a fixed policy.

---

## 8. Institutional compliance (configured per adoption)

Institution-specific, configured at adoption — **not defined here**, to keep the framework general:

- catalog placement, course numbering, prerequisites;
- **grading model** — competency evidence is intrinsically pass/fail (a benchmark is met or not), so the natural transcript form is **mastery / pass-fail**; an institution requiring letter grades maps evidence completeness + instructor evaluation to its scale (§9);
- transcripting and credit award;
- accreditation alignment (ABET, §4) and program-learning-outcome crosswalk;
- residency/transfer rules.

A reference instance (e.g., a specific university's catalog and academic policies) is supplied at adoption; the framework names the slots it must fill.

---

## 9. Grading model

- **Native form:** mastery-based pass/fail. A credential is earned or not; there is no partial benchmark.
- **If letter grades are required:** an institution maps (a) credential completeness and (b) the instructor evaluation (§6) to its scale — e.g., all evidence + strong process review → A; evidence met, adequate review → B; etc. This mapping is an institutional choice; the framework keeps the underlying evidence binary and reproducible.
- Formative results are **never** part of the grade (the boundary holds into the credit layer).

---

## 10. Compatibility and boundaries

- **Does not alter** competencies (C1–C5), assessments (A1–A5), benchmarks (three), or the certification evidence bundles. It consumes them.
- **Does not confer credit** by itself — an institution does, using this framework.
- **Stays out of lesson content** — a lesson is identical whether or not a learner pursues credit.
- **Builds on** the certification credential as its sole competency input.

No prior architecture is reopened; no contradiction introduced.

---

## 11. Open items and dependencies

| ID | Item | Type | Blocks |
|----|------|------|--------|
| **CR-1** | Per-module time-on-task estimates | Dependency | Credit-hour assignment (§5) |
| **CR-2** | Confirm ABET outcomes against current accreditation cycle | Verification | ABET mapping reliability (§4) |
| **CR-3** | Institution-specific compliance configuration | Configuration | Adoption at a given institution (§8) |
| **CR-4** | Optional course elements for ABET 4 (ethics) / 5 (teamwork) if required | Scope | Full ABET coverage (§4) |

CR-1 is the one true blocker for assigning credit hours; the rest are verification/configuration. None require changing certification or earlier architecture.

---

## 12. Exists / preserve / modify / create

- **Exists:** the certification credential + evidence (consumed); the competency basis; the Academic Credit path.
- **Preserve:** all of it unchanged; the formative/summative boundary into the grade.
- **Modify:** nothing in prior documents.
- **Create:** the overlay model, ABET mapping, credit-hour *method* (not numbers), instructor-evaluation layer, integrity controls, institutional-compliance slots, grading model.

---

## 13. Acceptance criteria

1. Credit consumes the certification credential and evidence; redefines no competency, assessment, or benchmark.
2. Credit requirements are separate from lesson content.
3. The four directive requirements (competency verification, assessment evidence, instructor evaluation, institutional compliance) are all present — two consumed, two added.
4. Credit-hour justification uses a defensible workload method (numbers pending CR-1, not invented).
5. Institution-specific policy is configurable, not hard-coded.
6. The formative/summative boundary holds through grading.

---

*End of `CREDIT_FRAMEWORK.md` v1.0. Academic-credit overlay defined on certification evidence; instructor evaluation and institutional compliance added; competencies/assessments/benchmarks untouched; credit-hour numbers honestly deferred to CR-1. With this document, all nine directive-required architecture documents now exist. Awaiting review.*
