# STAGE 6 — OPTIONAL EXTERNAL CREDENTIAL SERVICE SEAM SPECIFICATION

**Project:** Fluid-Powered Physical AI Platform
**Document type:** Implementation specification (Stage 6 of the EXTEND build — the final stage)
**Version:** 1.0
**Last updated:** 2026-06-21
**Authority:** Master Implementation Directive Stage 6 · `CERTIFICATION_FRAMEWORK.md` · `CREDIT_FRAMEWORK.md`
**Consumes (one-way, read-only):** a sealed Stage 5 evidence bundle (`evidence-bundle/1`)
**Status:** Specification only. **No code.** Defines an **external** service `credential-service/`,
outside the Trainer.

---

## 0. Context and constraints (binding)

Stage 6 is the seam by which an **external** service verifies a sealed evidence bundle and issues a
credential. It is the place where the **cryptographic non-repudiation that Stage 5 deferred** is
conferred — a controlled service *can* hold a signing key, which an offline artifact cannot. It is
bound by:

- **External only.** The service does **not** live inside the offline Trainer. It is a separate
  module/deployable; nothing in it is imported by `dist/hydraulic_trainer.html`.
- **Trainer core untouched.** No backend added to the Trainer; the **single-file offline invariant**
  is preserved; `calculate()` and Stage 1–5 logic unchanged.
- **One-way seam.** Evidence flows Trainer → service (export → ingest). The service never calls back
  into the Trainer and is **never a runtime dependency** of it.
- **Optionality.** The Trainer is fully usable with the service absent. Credentialing is an opt-in
  layer on top of self-contained evidence.
- **Evidence-driven.** The service reads sealed evidence; it **never re-runs scoring or simulation**
  (it does not import the Stage 1/Stage 4 engines).
- **Apply, don't define.** The service applies **credential rules** from the certification framework;
  it defines no new competencies, assessments, or benchmarks.
- **Shared verification core.** Hash verification reuses Stage 5's **pure, zero-dependency**
  `canonicalize` + `seal` logic, so the service recomputes `content_sha256` with byte-identical
  semantics to how the Trainer sealed it. (The service may carry its own deployment dependencies for
  storage/identity, but the *verification* path stays dependency-free and portable.)

---

## 1. Purpose and role

Ingest a sealed bundle, **verify** it, **decide** whether it satisfies an approved credential rule,
optionally **verify identity**, **issue** (or **reject**) a credential record, and **audit** the
outcome — without ever rewriting the evidence and without touching the Trainer.

```
Stage 1 computes → 2 one truth source → 3 stores → 4 scores → 5 seals  | seam |  6 verifies + credentials
                                          (inside the offline Trainer)              (external, optional)
```

---

## 2. Module boundary and location

```
credential-service/                 # EXTERNAL — never imported by the Trainer
  verify/                           # reuses Stage 5 canonicalize + seal (pure, zero-dep)
  rules/                            # credential-rule definitions (from CERTIFICATION_FRAMEWORK)
  identity/                         # optional, pluggable identity verifier (no-op by default)
  issue/                           # credential-record builder + issuer signature
  audit/                           # append-only audit log writer
  index                            # ingestBundle(bundle, opts) -> { result, credential?, audit }
```
- Lives **outside** `src/` and `dist/` of the Trainer. The Trainer's build, gates, and offline
  invariant are unaffected.
- The shared verification core is a copy/import of Stage 5's `canonicalize.js` + the hash routine —
  the **only** code shared across the seam, keeping the hash definition single-sourced.

---

## 3. Inputs

**Accepts:**
- the sealed evidence bundle (`format_version`, `content`, `content_sha256`, `exported_at`, `signature`),
- the embedded content hash, parameter version, benchmark records, artifact references,
- *optional* learner-identity metadata (opaque id → real identity), supplied out-of-band,
- *optional* issuing-authority metadata (issuer id, key reference).

**Rejects (fail loud, §9):** malformed bundles, hash mismatches, incomplete evidence, and bundles
that do not match an approved credential rule.

---

## 4. Outputs

- **Credential record** — `{ credential_id, learner_ref, bundle_hash, params_version, issued_at,
  issuer, issuer_signature, evidence_summary }`. References the bundle hash; never embeds or rewrites
  the bundle.
- **Verification result** — `{ ok, decision: 'issued' | 'rejected', reasons[] }` (deterministic; §7).
- **Audit record** — `{ event, bundle_hash, policy_id, decision, reasons[], at, issuer }`, append-only.
- **Issue timestamp**, **issuer identity**, **referenced bundle hash** — all in the credential + audit.

The service **only validates and records**; it never edits the Trainer evidence bundle.

---

## 5. Credential-rule model (apply, don't define)

A credential rule is a pure predicate over bundle content, sourced from `CERTIFICATION_FRAMEWORK.md`:
```js
rule = {
  credential_id: 'fpa-positioning-1',
  requires: {
    benchmarks: { positioning: 'pass' },          // required pass(es)
    artifacts:  ['twin'],                          // required populated slots
  },
  maturity_policy: { allow_provisional: true | false },  // how provisional params are treated
  params_policy:   { allow_stale: false },               // reject stale parameter versions if set
}
```
- **Issuable today:** the positioning-based credential (C1) — the only competency demonstrable now.
- **Defined but not yet satisfiable:** force/autonomous-dependent credentials evaluate to
  `rejected` (`reason: 'positioning pass present but force/autonomous not_available'`) until M07/M09/
  M10/M11 land — the same honest maturity that runs through the whole platform. The service never
  fabricates satisfaction.
- Rules are **data**, versioned alongside the framework; the service evaluates, it does not invent
  standards.

---

## 6. Verification pipeline (deterministic)

1. **Parse / shape** — reject malformed bundle (`reason: malformed`).
2. **Hash verify** — recompute `content_sha256` over the normalized payload (timestamps excluded, per
   Stage 5); mismatch → reject (`reason: hash mismatch`). *This is the integrity gate.*
3. **Completeness** — required artifacts/benchmark records present and non-empty per the rule;
   else reject (`reason: incomplete evidence`).
4. **Policy match** — evaluate the credential rule: required passes present, maturity/params policy
   satisfied; else reject with specific reasons.
5. **Identity (optional)** — if enabled, verify learner-identity metadata via the pluggable verifier;
   mismatch → reject (`reason: identity mismatch`). Default verifier is a no-op (identity not required).
6. **Issue / reject** — on full pass, build the credential record and **sign it with the issuer key**
   (the real attestation Stage 5 deferred); otherwise produce a rejection result.
7. **Audit** — append an audit record for the outcome (issued *or* rejected) — always.

Steps 1–5 are a **pure verdict function** of `(bundle, rule, identity_policy)`. Step 6's signing and
timestamp and step 7's logging are the only non-deterministic/side-effecting parts, kept separate so
the **verdict** is reproducible.

---

## 7. Determinism

Same bundle + same policy ⇒ same verdict (`ok`, `decision`, `reasons`). Issuer signature, `issued_at`,
and audit metadata are envelope concerns outside the verdict, exactly as `exported_at` sits outside
the Stage 5 hash. This makes verification **independently re-checkable**: anyone with the bundle, the
rule, and the issuer's public key can confirm both the verdict and the signature.

---

## 8. Privacy (data minimization)

- The bundle's `learner_id` is **opaque**; the service stores only what credential issuance requires.
- The credential record references the **bundle hash**, not the full evidence; audit stores hash +
  verdict + reasons, **not** the full bundle.
- Identity metadata (if used) is held per the issuer's policy and not duplicated into the audit log.
- In an education setting (e.g. FERPA-style obligations), this keeps the service's footprint to the
  minimum needed to issue and later verify a credential. *(General design guidance, not legal advice.)*

---

## 9. Failure modes (fail loud — never coerce or repair)

| Failure | Handling |
|---------|----------|
| Hash mismatch | reject `hash mismatch`; audit; never issue |
| Stale parameter version (if policy rejects) | reject `stale params`; audit |
| Incomplete evidence bundle | reject `incomplete evidence`; audit |
| Unsupported / unknown credential rule | reject `unsupported credential rule`; audit |
| Identity mismatch (if identity enabled) | reject `identity mismatch`; audit |
| Corrupted / unparseable payload | reject `corrupted payload`; audit |
| Required benchmark `not_available` | reject with the specific missing benchmark; never upgrade |

The service **does not silently coerce or repair** bad evidence. A bundle is credentialed or it is
rejected with reasons — both audited.

---

## 10. What Stage 6 is NOT

Not a new curriculum, assessment, or simulation layer; not a replacement for Stage 5; not a mandatory
cloud backend; not a runtime dependency of the Trainer. It is a thin, optional, external
verify-and-issue seam.

---

## 11. Interaction across the seam

- **Trainer (Stages 1–5):** unchanged; exports a sealed bundle (file/clipboard/upload — transport is
  the operator's choice, out of scope here).
- **Service:** ingests the bundle, runs §6, emits credential + audit. The `bundle.signature` field
  Stage 5 left null is where the **issuer signature** attaches once issued — but on the *credential
  record*, leaving the original sealed bundle untouched.
- **No callback:** the Trainer never learns about, depends on, or waits for the service.

---

## 12. Implementation approach (when approved)

Following the established pattern, a **reference implementation** of the seam will be built and run in
the sandbox — outside the Trainer's `src/`/`dist/` — demonstrating ingest → hash-verify → completeness
→ policy → (optional identity) → issue/reject → audit, reusing Stage 5's pure verification core, with
a `verify`/`smoke` gate proving: a valid positioning bundle issues a signed credential; a tampered
bundle is rejected (`hash mismatch`); an incomplete bundle is rejected; a force/autonomous credential
is rejected as not-yet-satisfiable; the verdict is deterministic; and an audit record is written for
both issue and reject. The Trainer's full chain remains byte-identical and zero-dependency.

---

## 13. Acceptance criteria

Stage 6 is complete when:
- the service can **verify** a Stage 5 bundle (hash + completeness + policy);
- the service can **issue or reject** a credential record (with a real issuer signature on issuance);
- the **Trainer remains offline and unchanged** (single-file invariant intact; `calculate()` and
  Stage 1–5 logic byte-identical);
- **audit logs** are produced for every outcome;
- **no new dependency is introduced into the Trainer core**.

When these hold, the pipeline is end-to-end: the Trainer produces sealed, reproducible, honest
evidence offline, and an optional external service turns that evidence into a verifiable, signed
credential — with curriculum, assessment, and credentialing cleanly separated, and the offline
constitution never violated.

---

*End of Stage 6 Optional External Credential Service Seam Specification v1.0. Defines the external,
optional verify-and-issue service: one-way seam, shared zero-dep verification core, credential-rule
model (apply not define), deterministic verdict, privacy minimization, audit, real issuer signing
(the non-repudiation Stage 5 deferred), and fail-loud rejection. The Trainer core is untouched and
remains offline. No code. Awaiting approval to implement.*
