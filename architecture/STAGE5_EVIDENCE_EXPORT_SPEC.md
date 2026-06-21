# STAGE 5 — EVIDENCE EXPORT LAYER SPECIFICATION

**Project:** Fluid-Powered Physical AI Platform
**Document type:** Implementation specification (Stage 5 of the EXTEND build)
**Version:** 1.0
**Last updated:** 2026-06-21
**Authority:** Master Implementation Directive Stage 5 · `CERTIFICATION_FRAMEWORK.md` · `CREDIT_FRAMEWORK.md`
**Consumes (read-only):** Stage 3 `workcell_state` (artifacts + `state.benchmarks` from Stage 4)
**Status:** Specification only. **No code.** Defines `src/evidence-export/`.

---

## 0. Context and constraints (binding)

Stage 5 produces a **credential-ready evidence bundle** from a learner's state — durable,
attributable, reproducible — that the **optional external service (Stage 6)** ingests to issue a
credential. It is bound by:

- **Offline** — no network, no backend; sealing uses **built-in** Web Crypto (`crypto.subtle`),
  which is present in both the browser and Node, so **zero dependencies** (Dependency Stability
  Directive).
- **Reproducible** — the same `workcell_state` yields the same sealed content hash (export
  timestamp excluded from the hash).
- **Tamper-evident** — any change to the bundle content invalidates its hash.
- **`calculate()` / engine untouched**; reads state read-only; persists via the **Stage 3 adapter**
  (no new persistence).
- **Honest maturity** — the bundle carries every benchmark record as-is (pass / fail /
  `not_available`) plus provisional-parameter flags; it never upgrades incomplete evidence.

### What "signed" means here (honest)
A purely offline tool **cannot safely hold a private signing key** (a key shipped in the artifact
is not secret), so the Trainer does **tamper-evident hashing**, not cryptographic authorship.
Concretely: Stage 5 **seals** the bundle with a SHA-256 content hash (integrity + reproducibility).
**Cryptographic attribution / non-repudiation is conferred by the Stage 6 external service**, which
verifies the hash and signs/attests it into a credential. An *optional* detached-signature hook is
specified for the case where an instructor supplies a key out-of-band; the default offline path is
hash-sealing. This keeps the core offline and resolves OD-2 without a backend in the Trainer.

---

## 1. Purpose

Serialize a learner's summative evidence — artifacts + benchmark results + provenance — into a
**sealed, reproducible, offline** bundle that:
1. includes the parameter version, benchmark results, artifact references, and timestamps;
2. is tamper-evident (hash-sealed) and reproducible (deterministic);
3. is the **input** the Stage 6 service verifies and signs into a credential.

Non-goals: issuing credentials (Stage 6 / certification); cryptographic authorship inside the
offline core; changing artifacts or scores.

---

## 2. Module boundaries

```
src/evidence-export/
  bundle.js        # assemble the content bundle from workcell_state (artifacts + benchmarks + provenance)
  canonicalize.js  # deterministic, stable JSON serialization (sorted keys) for reproducible hashing
  seal.js          # SHA-256 content hash via crypto.subtle; seal() + verify()
  index.js         # exportEvidence(state, canonical) -> sealed bundle; verifyBundle(bundle) -> {ok, reason}
```
- **Pure, offline, zero-dep.** Reads state read-only; returns a bundle object/string.
- Persisted via the **Stage 3 adapter's** `export()` (no new persistence path).
- Does **not** touch `calculate()`/engine, artifact slots, or scores.

---

## 3. The evidence bundle

### 3.1 Content (deterministic, hashed)
```js
content = {
  schema: 'evidence-bundle/1',
  learner_id: <opaque>,
  params_version: 'wp-1.0.0',
  params_checksum: '124a71360b0c9d7d',     // from Stage 2 generated module
  state_version: 'ws-1.0.0',
  artifacts: {                              // references/summaries of populated slots (not full trajectories)
    twin: { status:'populated', owner_module:'M04', params_version, provenance },
    fluid: { ... },
    // ... only populated slots
  },
  benchmarks: {                             // verbatim Stage 4 records (pass | fail | not_available)
    positioning: { status, pass, measured, criterion, provisional, ... },
    force: { status:'not_available', reason, ... },
    autonomous: { status:'not_available', reason, ... },
  },
  provisional: [ ... ],                     // union of provisional-parameter flags across evidence
}
```

### 3.2 Envelope (sealed)
```js
bundle = {
  format_version: 'evidence-bundle/1',
  content,
  content_sha256: '<hex>',                  // = sha256(canonicalize(content))
  exported_at: <ISO>,                       // informational; NOT part of the hash
  signature: null,                          // optional detached signature (Stage 6 / instructor key)
}
```
- **Artifact references, not bulk data:** the bundle stores slot summaries + provenance, not full
  trajectories, keeping it small and credential-focused. (Full data stays in `workcell_state`.)

---

## 4. Sealing and reproducibility

- `canonicalize(content)` produces a **stable** serialization (recursively sorted keys), so the
  hash is independent of property order — the basis of reproducibility.
- `content_sha256 = SHA-256(canonicalize(content))` via `crypto.subtle.digest` (async; built-in;
  offline; zero-dep).
- **`exported_at` is excluded from the hash**, so re-exporting the same state yields the **same**
  `content_sha256` (reproducible) even though the envelope timestamp differs.
- `verify(bundle)` recomputes the hash over `content` and compares — any tampering with `content`
  (a flipped pass, an edited score, a swapped version) breaks the match.

---

## 5. What the bundle includes (directive requirements → fields)

| Directive requirement | Bundle field |
|-----------------------|--------------|
| evidence bundle | the whole sealed object |
| parameter version | `content.params_version` (+ `params_checksum`) |
| benchmark results | `content.benchmarks` (verbatim Stage 4 records) |
| artifact references | `content.artifacts` (slot summaries + provenance) |
| timestamps | `exported_at` (envelope) + each record's `produced_at` |
| reproducible | deterministic `content_sha256` (§4) |
| usable offline | self-contained JSON; built-in hashing; no network |

---

## 6. Verification strategy

Extend the chained gate (after `verify-benchmarks.mjs`):

- **shape** — export a scored state; bundle carries `params_version`, `params_checksum`,
  `state_version`, artifacts, benchmark records, timestamps, and a `content_sha256`.
- **reproducibility** — two exports of the same state produce the **same** `content_sha256`
  (different `exported_at`).
- **tamper-evidence** — mutate a field in `content` (e.g. flip positioning `pass`) → `verifyBundle`
  returns `{ ok:false }`.
- **honesty** — `not_available` and `fail` records are present and unaltered; provisional flags
  carried; no record silently upgraded.
- **offline** — runs with no network; hashing via built-in `crypto.subtle`.
- **round-trip** — `JSON.parse(JSON.stringify(bundle))` re-verifies (`ok:true`).

**Smoke:** export a state with a positioning pass; bundle verifies offline.

---

## 7. Failure modes (fail loud)

| Failure mode | Handling |
|--------------|----------|
| No evidence in state (empty `benchmarks`) | export still succeeds but `content.benchmarks` is empty and a `warning:'no benchmark evidence'` is set; never a false "complete" bundle |
| Missing `params_version` | refuse to export (evidence must be traceable) |
| Hash mismatch on verify | `{ ok:false, reason:'content hash mismatch' }` |
| `crypto.subtle` unavailable | refuse with a clear message (no silent unsealed bundle) |
| Tampered envelope (`content_sha256` edited) | recomputation over `content` still catches it |
| Provisional-heavy evidence | exported with `provisional[]` populated; maturity visible to the credential layer |

Principle: a bundle is either sealed-and-verifiable or it is not produced — never an unsealed or
silently-altered artifact.

---

## 8. Interaction with prior stages and Stage 6

- **`calculate()`/engine:** untouched.
- **State (Stage 3):** read-only; the bundle references artifacts + `state.benchmarks`; persisted
  via the existing adapter `export()`.
- **Canonical (Stage 2):** `params_version` + `params_checksum` embedded for traceability.
- **Benchmarks (Stage 4):** records embedded verbatim.
- **Stage 6 (external, optional):** ingests the bundle, **verifies `content_sha256`**, then
  **signs/attests** it into a credential. The Trainer stays offline; authorship lives outside it.
  The optional `signature` field is where an external/instructor signature attaches.

---

## 9. Definition of done (Stage 5)

1. `src/evidence-export/` exists: bundle, canonicalize, seal, index — pure, offline, zero-dep.
2. `exportEvidence(state, canonical)` produces a sealed bundle with all §5 fields.
3. **Reproducible:** same state → same `content_sha256`; **tamper-evident:** any content edit fails
   `verifyBundle`.
4. Honest maturity: pass/fail/`not_available` and provisional flags carried verbatim.
5. Offline (built-in `crypto.subtle`); persisted via the Stage 3 adapter; `calculate()`/engine
   byte-identical; zero external dependencies.
6. Verify + smoke gates pass; bundle round-trips.

When 1–6 hold, Stage 5 is complete: the platform emits reproducible, tamper-evident, offline
credential evidence — and Stage 6 (the optional external verification/credential service) can issue
credentials from it without ever putting a backend inside the Trainer.

---

*End of Stage 5 Evidence Export Layer Specification v1.0. Defines the sealed evidence bundle, the
honest offline "signing" semantics (tamper-evident hashing now; cryptographic attribution at Stage 6),
reproducibility, included fields, verification, and failure modes. No code. Awaiting approval to
implement.*
