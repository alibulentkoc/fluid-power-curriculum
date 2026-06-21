# CERTIFICATION_FRAMEWORK.md

**Project:** Fluid-Powered Physical AI Curriculum
**Document type:** Certification framework (Certification Framework requirement, Directive v3.0)
**Version:** 1.0
**Last updated:** 2026-06-20
**Consumes:** `LEARNER_JOURNEY.md`, `COMPETENCY_MAP.md`, `ASSESSMENT_MAP.md`, `TRAINER_INTEGRATION_ARCHITECTURE.md`, `ARCHITECT_DECISIONS.md`
**Resolves:** OD-2, OD-5, OD-6, OD-8, OD-9, OD-10
**Status:** Authoritative for credentials and how they are earned. Does **not** grant academic credit (future `CREDIT_FRAMEWORK.md`).

---

## 0. Purpose and authority

This framework issues **credentials from evidence**. It consumes the evidence bundles already defined in `ASSESSMENT_MAP.md` §9 and the identity checkpoints in `LEARNER_JOURNEY.md` §5, and turns them into a credential structure with explicit rules for the four learner paths, placement, retention, and re-attempts.

It **invents nothing**: no new competency (the five in `COMPETENCY_MAP.md`), no new assessment (A1–A5 in `ASSESSMENT_MAP.md`), no new benchmark task (the three in the Trainer). A credential is a named bundle of *existing* evidence, nothing more.

Vocabulary is the canonical set fixed in `ARCHITECT_DECISIONS.md` §5 (H-3): **certification framework**, **credential**, **evidence bundle**, **certificate**, **summative evidence**.

---

## 1. Design principles

1. **Evidence-only.** A credential is earned by summative evidence (Trainer artifacts + benchmark scores). Never by quiz completion, attendance, or time spent.
2. **Formative never credentials.** The formative/summative boundary (`ASSESSMENT_MAP.md` §8) is absolute: formative results are invisible to this framework.
3. **One evidence model, four paths.** All four learner paths read the *same* evidence bundles. Paths differ in persistence, issuance, target subset, and instructor involvement — never in the assessments themselves.
4. **Stackable and progressive.** Each credential stands alone and is also a level of one progressive certification.
5. **Reproducible and attributable.** Credential-bearing evidence must be durable, attributable, timestamped, and re-runnable from a pinned parameter version.
6. **Credit-compatible, credit-free.** This framework produces the evidence a future credit framework consumes; it does not itself grant credit.

---

## 2. Credential structure (resolves OD-5 and OD-10)

**OD-5 resolution — four stackable credentials that are also four levels of one progressive certification.** Both models at once: each checkpoint issues a standalone credential (stackable, so a learner may stop and still hold something real), and holding all four constitutes the full *Fluid-Powered Physical AI* certification (progressive, for the full arc). Rationale: the directive requires stackable checkpoints *and* a progression; the Learner Journey already defined exactly four checkpoints mapped to identities.

| Level | Credential | Identity (Learner Journey) | Competencies required | Prerequisite |
|-------|-----------|----------------------------|------------------------|--------------|
| 1 | **Fluid Power Analyst** | Analyst | **C1 + C2 (joint)** | — |
| 2 | **Fluid Power Designer** | Designer | C3 | Level 1 |
| 3 | **Electrohydraulic Systems Engineer** | Electrohydraulic Eng | C4 | Level 2 |
| 4 | **Physical AI Systems Engineer** | Physical AI Eng | C5 | Level 3 |
| — | **Full certification** | (whole arc) | all four levels held | Levels 1–4 |

**OD-10 resolution — C1 and C2 are credentialed JOINTLY at the Analyst level.** A credential maps to an *identity*, not a single competency, and the Analyst identity encompasses both modelling (C1) and performance analysis (C2). A learner who can model but not analyze is not yet a Fluid Power Analyst. Rationale: keeps the credential set aligned 1:1 with the four identity checkpoints; avoids a credential that maps to no identity.

A credential is **Earned** when its evidence bundle (§3) is complete, passing, and stored durably and attributably (§7).

---

## 3. Evidence bundles per credential

Taken directly from `ASSESSMENT_MAP.md` §9 (the bundles are defined there; here they are the credential requirements). Status reflects current executability.

| Credential | Required evidence bundle | Executable now? |
|------------|--------------------------|-----------------|
| Fluid Power Analyst | A1 (C1, ✅) + A2 (C2, sim form) + analyst artifacts (`concept`, `hardware`, `fluid`, `twin.cylinder`) | **Partially** — A1 fully; A2 in simulation form (measured-position confirmation lands with M09) |
| Fluid Power Designer | A3 (C3) + design artifacts (`power_unit`, `motion_control`, `actuator`, `circuit`) + A2 measured | No (M05–08 planned) |
| Electrohydraulic Engineer | A4 (C4) + `sensors` + `control` artifacts | No (M09–10 planned) |
| Physical AI Engineer | A5 (C5) + `integrated_twin` + capstone + twin-residual record | No (M11–12 planned) |

**Evidence-maturity note.** The Analyst bundle's A2 positioning is currently simulation-scored; it gains measured-position confirmation once M09 adds a real sensor. This nuance is where the deferred *Evidence Maturity* enhancement (`ARCHITECT_DECISIONS.md` D7 / master_progress A7) will eventually attach a maturity tag to each bundle. Recorded, not built here.

---

## 4. The four learner paths (one evidence model)

All paths earn the same credentials from the same bundles. The table is the whole design; the differences are deliberately narrow.

| Path | Who | Entry | Evidence persistence | Issuance | Target | Instructor | Re-attempts |
|------|-----|-------|----------------------|----------|--------|------------|-------------|
| **Self-Paced Learner** | independent | Beginning Student (or placement, §6) | account-backed for credentials; local for practice | credential record | any stacked credential | none | unlimited (§8) |
| **Certificate Learner** | wants an issued certificate | same | account-backed + identity-verified | credential **+ certificate** | chosen credential(s) | none (optional proctored capstone) | unlimited |
| **Workforce Development Learner** | technician / employer-sponsored | Beginning Student or placement | account-backed | credential (+ workplace-capability mapping, `COMPETENCY_MAP.md` §7) | usually Analyst/Designer subset | optional cohort facilitator | unlimited |
| **Academic Credit Learner** | for-credit student | per institution | account-backed + identity-verified | credential **+ credit eligibility record** | per syllabus | **required** (credit framework) | may be **constrained** by credit framework |

**Key facts:**
- The assessments (A1–A5), competencies (C1–C5), and benchmarks (three) are identical across all four paths.
- Only the **Academic Credit** path adds instructor evaluation and may constrain re-attempts/placement — and those additions are owned by the future `CREDIT_FRAMEWORK.md`, not defined here. This framework only guarantees the path is supported and the evidence is exposed.
- The **Certificate** path differs from Self-Paced only by formal certificate issuance and identity verification for attribution.
- The **Workforce** path differs by target subset and optional facilitation; depth-vs-stop-point tiering is owned by the workforce framework (OD-7, adjacent).

---

## 5. Stackable credential checkpoints

The four credentials are the four checkpoints from `LEARNER_JOURNEY.md` §5. Stackability rules:

- Each credential is independently **Earned** and independently meaningful (a learner may stop after Analyst and hold a real, defensible credential).
- Credentials accumulate; the prerequisite chain (§2) means higher levels presume the lower (held or tested-out, §6).
- The full certification is simply the state of holding all four; it is not a separate assessment.

This is what makes the framework serve self-paced and workforce learners without redesigning anything: the curriculum's natural identity transitions *are* the credential boundaries.

---

## 6. Placement and test-out (resolves OD-6)

**OD-6 resolution — placement and test-out are the same mechanism: earn the prior credential by evidence, without the lessons.** Because credentials are defined purely by their evidence bundle, a learner entering above Beginning Student simply produces the summative evidence for the earlier stage(s) directly in the Trainer. There is **no separate placement exam** — the existing evidence bundles serve. Rationale: evidence-driven by construction; inventing a placement test would violate "no new assessments."

Rules:
- To be placed at entry to Level N, a learner must **hold or earn-by-evidence** credentials 1…N−1.
- Test-out evidence is identical to credential evidence — same bundles, same acceptance, same Trainer runners.
- A practicing engineer may attempt the Analyst bundle directly; passing it both **earns the Analyst credential** and **places them at Designer entry**. Placement and credential are the same event.

---

## 7. Evidence retention and attribution (resolves OD-2)

**OD-2 resolution (requirement side) — credential-bearing evidence must be account-backed, durable, attributable, timestamped, and reproducible.** This framework states the *requirement*; the Trainer build (OD-1, OD-4) supplies the *mechanism*.

A credential's evidence is valid only if it is:
1. **Durable** — persists beyond the session that produced it.
2. **Attributable** — bound to an identified learner (hence account-backed, not browser-local, for any credential-bearing run).
3. **Timestamped** — each summative run carries a time and the `params_version` it ran against.
4. **Reproducible** — re-runnable from the stored state + pinned parameters to the same result (the canonical-model determinism).
5. **Retained** — kept for the credential's stated validity period (default: indefinite for the credential record; raw run logs retained at least long enough to support re-verification — exact period a credit/institutional setting).

**Consequence for persistence (informs OD-1/OD-4):** formative practice may remain browser-local, but the moment a learner pursues a credential, the evidence run must be account-backed and attributable. The Trainer build must provide this for credential mode.

---

## 8. Re-attempt policy (resolves OD-9)

**OD-9 resolution — unlimited summative re-attempts at the certification layer; every attempt is logged; the credential records the passing run.** Rationale: benchmark runs are deterministic given state + parameters and require the machine to *actually* meet the criteria, so re-attempts cannot "game" a bundle the way a quiz bank could — passing means the system genuinely performs. There is therefore no integrity reason to cap attempts for self-paced, certificate, or workforce paths.

- Formative: unlimited, unlogged-for-credit (unchanged).
- Summative: unlimited; each attempt produces a timestamped, attributable evidence record; the credential references the passing run.
- **Academic Credit path exception:** the credit framework **may** impose attempt limits, cooldowns, or proctoring for academic-integrity reasons. Certification permits this overlay; it does not define it.

---

## 9. Enabling-competency coverage (resolves OD-8)

**OD-8 resolution — ALL enabling competencies must be covered, verified holistically through the integrating artifact and benchmark, not via separate per-enabling tests.** Rationale: `COMPETENCY_MAP.md` established that an integrating artifact cannot exist unless each enabling step produced its piece (e.g., the validated coupled simulation requires the valve model, force balance, and pressure dynamics). Coverage is therefore enforced *structurally* by the evidence, not by a checklist of sub-tests. This achieves full coverage without fragmenting assessment or inventing new tests.

- A summative pass requires the integrating evidence (the artifact + its benchmark score) defined for the competency.
- No separate enabling-competency assessment exists or is created.

---

## 10. Formative / summative boundary (preserved)

Restating, because it is the integrity of every credential: formative results (quizzes, coding-exercise practice, challenge problems) are **never** read by this framework. A learner may pass every quiz and hold no credential; they hold a credential only when the summative evidence bundle exists, passes, and is retained per §7. This is unchanged from `ASSESSMENT_MAP.md` §8.

---

## 11. Compatibility with a future credit framework (not written here)

This framework is built to be consumed by `CREDIT_FRAMEWORK.md` without modification. The Academic Credit path (§4) is the seam. The credit framework will add, **on top of** the credential evidence:

- instructor evaluation / sign-off,
- institutional compliance and academic-integrity controls (which may constrain re-attempts/placement, §8),
- mapping of credentials to credit hours and ABET student outcomes,
- a learning-outcomes crosswalk.

What this framework guarantees for that future work: a credential is a durable, attributable, reproducible evidence record (§7) with a defined competency basis (§2–3) — exactly the verifiable input academic credit requires. No credit logic is defined here.

---

## 12. Decisions resolved (summary)

| OD | Decision | Resolution |
|----|----------|------------|
| OD-2 | Evidence persistence/attribution | Credential evidence must be account-backed, durable, attributable, timestamped, reproducible (§7) |
| OD-5 | Credential structure | Four stackable credentials = four levels of one progressive certification (§2) |
| OD-6 | Placement / test-out | Same as earning the prior credential by evidence; no separate exam (§6) |
| OD-8 | Enabling-competency coverage | All, verified holistically via the integrating artifact + benchmark (§9) |
| OD-9 | Re-attempt policy | Unlimited at certification layer, logged; credit path may constrain (§8) |
| OD-10 | C1/C2 at Analyst | Joint — Analyst credential requires both (§2) |

Adjacent, not resolved here (correctly): **OD-7** (workforce depth-vs-stop-point) — owned by the workforce framework; this framework supports path tiering by allowing target subsets (§4). **OD-1, OD-3, OD-4** — Trainer-build-owned; §7 states the persistence *requirement* they must satisfy.

---

## 13. Consistency with prior architecture

- **Credentials ↔ identities:** the four credentials are the four `LEARNER_JOURNEY.md` checkpoints. ✓
- **Credentials ↔ competencies:** Analyst = C1+C2, Designer = C3, Electrohydraulic = C4, Physical AI = C5 — exactly `COMPETENCY_MAP.md`. ✓
- **Evidence ↔ assessments:** bundles are `ASSESSMENT_MAP.md` §9 verbatim; A1–A5 only. ✓
- **Benchmarks:** the three only; none added. ✓
- **Truth source:** acceptance criteria trace to `CANONICAL_PARAMETER_MODEL.md` via the assessments. ✓
- **Vocabulary:** the H-3 canonical terms. ✓

No prior architecture is reopened; no contradiction found.

---

## 14. Exists / preserve / modify / create

- **Exists:** the four checkpoints (Learner Journey), the evidence bundles (Assessment Map), the competencies and benchmarks.
- **Preserve:** all of the above unchanged; the formative/summative boundary.
- **Modify:** nothing in prior documents (consumes only).
- **Create:** the credential ladder, the four-path table, placement-as-evidence, retention requirements, the re-attempt policy, and the credit-compatibility seam.

---

## 15. Open items remaining (not certification's to resolve)

| ID | Item | Owner |
|----|------|-------|
| OD-1, OD-4 | Trainer extend-vs-rehost; tech stack (must satisfy §7 persistence) | Trainer build |
| OD-3 | Sandbox vs canonical state for practice | Trainer build |
| OD-7 | Workforce depth-vs-stop-point tiering | Workforce framework |
| Credit overlay | Instructor eval, ABET mapping, credit hours, integrity controls | `CREDIT_FRAMEWORK.md` |

Certification is structurally complete: every certification-owned decision is resolved, and the remaining items are explicitly other frameworks' to own.

---

## 16. Acceptance criteria

1. Credentials are earned only from summative evidence bundles; formative is never read.
2. No new competency, assessment, or benchmark is introduced.
3. Four stackable credentials map 1:1 to the four identity checkpoints and to C1+C2 / C3 / C4 / C5.
4. All four learner paths are supported by one evidence model.
5. OD-2, OD-5, OD-6, OD-8, OD-9, OD-10 are each resolved with rationale.
6. Placement/test-out adds no new assessment.
7. The framework is consumable by a future credit framework without modification.

---

*End of `CERTIFICATION_FRAMEWORK.md` v1.0. Phase 3A. Six certification-owned decisions resolved; four learner paths on one evidence model; credentials from evidence, never quizzes; credit-compatible, credit-free. Awaiting review before any credit-framework work.*
