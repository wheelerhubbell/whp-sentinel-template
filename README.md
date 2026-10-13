# WHP Sentinel Template

> **Automated Decision Integrity & Claim Auditing for Autonomous Agents and CI/CD**

This repository is a plug-and-play template for teams building AI agents, autonomous pipelines, and critical software systems. It integrates Wheeler Hubbell Publishing's **Decision Integrity Engine** and **Standing Gate** directly into your repository.

---

## What This Does

Autonomous agents make assertions, commit code, and trigger financial or operational workflows. This template enforces **epistemic standing and claim verification** before actions are accepted:

1. **Epistemic Auditing:** Evaluates whether propositions, claims, and actions are grounded in valid authority, admissible sources, and bounded scope.
2. **Circuit Breaker Gate:** Halts hallucinated or unverified automated agent steps before they execute irreversible changes.
3. **Verifiable Receipts:** Verifies Ed25519-signed Standing Marks (`ESTABLISHED`) or paid baseline assessments (`NOT_ESTABLISHED`).

---

## Quickstart (30 Seconds)

1. Click **"Use this template"** above to create your own copy.
2. The included GitHub Action (`.github/workflows/decision-integrity.yml`) will run automatically on push or pull request.
3. By default, it runs in **Dry-Run Mode (`mock: 'true'`)** at zero cost.
4. When you are ready for cryptographically signed, paid live verification on Base (x402 USDC), add your EVM private key as a repository secret: `WHP_PAYMENT_KEY`.

---

## Manual Verification via CLI

You can evaluate any claim or agent output locally or in your scripts:

```bash
# Dry run check (zero cost)
node evaluate.mjs --claim "Agent release conforms to specification"

# Live paid check (settles 1 USDC on Base via x402)
WHP_PAYMENT_KEY=0x... node evaluate.mjs --live --claim "Deploying treasury rebalance"
```

---

## Standard Tiers

| Epistemic Object | Scope | Live Verification Path |
| :--- | :--- | :--- |
| **Proposition** | Single atomic assertion / sanity check | `/v1/ping` |
| **Claim** | Bounded proposition with cited evidence & source | `/v1/evaluate` |
| **Qualification Update** | Delta or amendment on active standing | `/v1/patch` |
| **Evidence Graph** | Multi-source topological evaluation | `/v1/audit` |
| **Dossier** | Exhaustive regulatory / mission-critical audit | `/v1/evaluations` |

*Pricing is strictly based on submitted payload and workload scope. Payment purchases rigorous evaluation under published rules—a favorable outcome (`ESTABLISHED`) cannot be bought.*

---

## Powered By
- **Engine:** [Wheeler Hubbell Publishing](https://wheelerhubbell.github.io)
- **GitHub Action:** [`wheelerhubbell/standing-gate@v0`](https://github.com/marketplace/actions/standing-gate)
- **Client Library:** `@wheelerhubbell/whp-standing-client`
