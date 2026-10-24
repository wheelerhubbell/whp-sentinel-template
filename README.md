# WHP Sentinel Template

> **Decision Integrity Protocol**
> **Standing Mark Service**
> **Unilateral Integrity**

`whp-sentinel-template` is the enforcement layer for the Wheeler Hubbell Publishing Decision Integrity Protocol. It operationalizes Unilateral Integrity in repo workflows by requiring claims, agent actions, and critical steps to establish standing before they are accepted.

This repository is the adoption path for teams and autonomous systems that want to plug the Standing Mark Service into GitHub workflows, CI/CD pipelines, and agent execution environments.

## Unified architecture

- Public identity and standards: `wheelerhubbell.github.io`
- Runtime service: `standing-gate`
- Enforcement template: `whp-sentinel-template`
- Agent tooling integration: `agentkit`

The template is not a separate product. It is the easiest way to consume the same service in a repository environment.

## What this template does

Autonomous agents and automated pipelines make claims, execute commands, and trigger irreversible actions. This template enforces decision integrity before those actions are accepted.

It provides:

1. epistemic auditing of claims and assertions
2. fail-closed gate behavior for critical actions
3. verifiable receipts from the Standing Mark Service
4. a default pattern for repo enforcement and agent governance

## Service relationship

The Decision Integrity Protocol defines the standard.
The Standing Mark Service performs the verification.
The Sentinel Template is the operational wrapper that embeds that standard into real repositories.

This is the clean, unified architecture for the service ecosystem.

## Quickstart

1. Use this template to create a repo or workflow integration.
2. Run the included GitHub Action automatically on push or pull request.
3. Default mode is zero-cost structural validation.
4. Add live verification when you are ready to submit signed claims for standing.

## Standard tiers

| Epistemic object | Scope | Live verification path |
| :--- | :--- | :--- |
| Proposition | single atomic assertion | `/v1/ping` |
| Claim | bounded proposition with evidence and source | `/v1/evaluate` |
| Qualification Update | delta or amendment to standing | `/v1/patch` |
| Evidence Graph | multi-source evaluation | `/v1/audit` |
| Dossier | comprehensive, mission-critical review | `/v1/evaluations` |

## Powered by

- Engine: [Wheeler Hubbell Publishing](https://wheelerhubbell.github.io)
- Runtime: [`wheelerhubbell/standing-gate@v0`](https://github.com/wheelerhubbell/standing-gate)
- Client library: `@wheelerhubbell/whp-standing-client`

The Sentinel Template is the repo-level enforcement layer for a single service ecosystem: Decision Integrity Protocol + Standing Mark Service + Unilateral Integrity.

