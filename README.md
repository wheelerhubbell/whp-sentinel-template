# WHP Sentinel Template

> Turnkey Epistemic Circuit Breaker & CI/CD Enforcement via Standing Gate for Autonomous Agent Swarms and Production Pipelines.

This repository is the plug-and-play template for engineering teams, agent developers, and critical infrastructure moving $100,000 to $1,000,000+ in consequential decisions. It integrates Wheeler Hubbell Publishing's Decision Integrity Protocol and the live Standing Mark Service as an unbypassable circuit breaker before irreversible execution (code deployment, financial transfers, model routing, autonomous actions).

## Architecture & Enforcement

- **Brand & Authority:** Wheeler Hubbell Publishing (WHP)
- **Governing Source:** *Decision Integrity: The Continuous Work*
- **Sovereign Engine:** Standing Mark Service (`https://api.wheelerhubbellpublishing.com`)
- **CI/CD Enforcement Layer:** Standing Gate (`wheelerhubbell/standing-gate@v0`)
- **Outcome Records:** Cryptographically signed (Ed25519) Standing Mark or Bounded Assessment

---

## Dual Ingress & Payment Rails

1. **Commercial Subscription Rails (CI/CD Teams & Enterprise Swarms):**
   - **Developer Sentinel:** $149/mo (200 evaluations/mo)
   - **Team CI/CD Gateway:** $699/mo (1,000 evaluations/mo)
   - **Institutional Sovereign:** $3,500/mo (6,000 evaluations/mo & dedicated throughput)
   - Provisioned API keys authenticate directly via `WHP_API_KEY` without on-chain signing overhead.
2. **Autonomous M2M Micropayment Rail (Agent-to-Agent):**
   - 1 Base USDC per evaluation via HTTP 402 challenge, EIP-3009 transfer authorization, and keyless facilitator settlement (`0x1050eddd8282623b0c263ed6bdbd42370bbc28d3` / `whpublishing.base.eth`).

---

## Quickstart

1. Click **"Use this template"** to create a repo.
2. Add your authentication secret to GitHub Actions (**Settings -> Secrets and variables -> Actions**):
   - For Subscription users: Add secret `WHP_API_KEY`
   - For Autonomous M2M agents: Add secret `WHP_BUYER_KEY` (32-byte Base wallet private key with USDC balance)
3. The included `.github/workflows/decision-integrity.yml` runs on every push and pull request, halting deployment if epistemic passage is denied.

---

## Workflow Configuration (`.github/workflows/decision-integrity.yml`)

```yaml
name: Decision Integrity Audit

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  epistemic-audit:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Run WHP Standing Gate
        uses: wheelerhubbell/standing-gate@v0
        with:
          api_key: ${{ secrets.WHP_API_KEY }}
          subject: ${{ github.repository }}@${{ github.sha }}
          claim: "Release commit conforms to declared authority, invariants, and source provenance"
          provenance: ${{ github.server_url }}/${{ github.repository }}/commit/${{ github.sha }}
          buyer_key: ${{ secrets.WHP_BUYER_KEY }}
        env:
          WHP_API_KEY: ${{ secrets.WHP_API_KEY }}
          WHP_BUYER_KEY: ${{ secrets.WHP_BUYER_KEY }}
```

---

## Manual Execution via CLI Runner

```bash
# Authenticated via Subscription API Key
WHP_API_KEY=whp_live_... node evaluate.mjs --claim "Authorize $250,000 treasury rebalance"

# Authenticated via Autonomous M2M Keyless Base USDC Rail
WHP_BUYER_KEY=0x... node evaluate.mjs --live --claim "Execute automated liquidity settlement"
```

---

## Epistemic Decision Boundary

Payment purchases substantive, bounded evaluation under published protocol rules, **never an unearned favorable outcome**. If submitted claims strip qualifiers, leak authority, commit coherent substitution, or drift from the governed object, the Standing Mark is withheld and the gate halts execution closed.
