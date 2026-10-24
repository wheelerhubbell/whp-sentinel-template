# WHP Sentinel Template

> Plug-and-play template for the Decision Integrity Protocol, the Standing Mark Service, and CI/CD enforcement via Standing Gate.

This repository is a starter template for teams building AI agents, autonomous pipelines, and critical software systems. It enables projects to integrate with Wheeler Hubbell Publishing's Decision Integrity Protocol and the Standing Mark Service without re-implementing the operational pattern from scratch.

The canonical architecture is:

- Wheeler Hubbell Publishing — public brand and research layer
- Decision Integrity Protocol — governing framework and ruleset
- Unilateral Integrity — principle that a claim or action may not exceed the authority and provenance that justify it
- Standing Mark Service — operational evaluation runtime
- Standing Gate — enforcement layer for CI/CD and automated execution
- Standing Mark / Standing Assessment — issued outcomes

## What This Template Does

Autonomous agents and automated workflows often make claims without sufficient grounding. This template gives you a ready-made integration point for enforcing decision integrity before irreversible actions proceed.

It provides:

1. A repository-level gate for claim evaluation and CI/CD enforcement
2. A dry-run path for structural validation without payment
3. A live evaluation path for paid protocol execution through the Standing Mark Service
4. A clean pattern for wrapping autonomous actions with fail-closed checks

## Quickstart

1. Click "Use this template" to create a project from this repository.
2. The included GitHub Action will run automatically on push or pull request.
3. By default, the workflow runs in structural dry-run mode for zero-cost validation.
4. When you are ready for live evaluation, add your repository secret and proceed under the published Decision Integrity Protocol.

## Manual Evaluation via CLI

```bash
# Structural Dry Run — zero cost
node evaluate.mjs --claim "Agent release conforms to specification"

# Live Evaluation — paid under the Decision Integrity Protocol
WHP_PAYMENT_KEY=0x... node evaluate.mjs --live --claim "Deploying treasury rebalance"
```

## Canonical Terminology

Use these terms consistently:

- Brand: Wheeler Hubbell Publishing
- Framework: Decision Integrity Protocol
- Principle: Unilateral Integrity
- Runtime: Standing Mark Service
- Enforcement: Standing Gate
- Positive outcome: Standing Mark
- Negative outcome: Standing Assessment
- Free validation: Structural Dry Run
- Paid evaluation: Live Evaluation

## Pricing and Terms

Pricing is workload-based and outcome-independent. Payment buys evaluation under published rules, not a favorable outcome.

A Standing Mark is issued only when the claim is genuinely established under the protocol. A Standing Assessment is issued when the claim exceeds its authority, evidence, or admissible provenance.

## Archive and Canonical Boundary

The live canonical machine is:

- Wheeler Hubbell Publishing
- Decision Integrity Protocol
- Unilateral Integrity
- Standing Mark Service
- Standing Gate
- Standing Mark / Standing Assessment

Anything outside this live machine is archival context, not the current canonical system.

## Powered By

- Brand: [Wheeler Hubbell Publishing](https://wheelerhubbell.github.io)
- Framework: Decision Integrity Protocol
- Runtime: Standing Mark Service
- Enforcement: Standing Gate
- Client library: `@wheelerhubbell/whp-standing-client`

## Summary

This template is the adoption layer for the Decision Integrity Protocol. It brings the public research, the protocol, the live evaluation runtime, and the enforcement gate into a clean, repo-ready workflow for automated systems.
