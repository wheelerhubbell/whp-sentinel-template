> Current integration: [developer onboarding](https://wheelerhubbellpublishing.com/developers.html) and [current SDKs](https://github.com/wheelerhubbell/standing-mark). This page describes a legacy integration. Host links have been corrected, but compatibility with the current payment and record contract is not established.

# WHP Sentinel Template

This repository is the existing GitHub Actions reference consumer for Standing Gate. Its workflow invokes `wheelerhubbell/standing-gate@v0` against the WHP service. It is a client example, not a separate evaluator or proof that a particular workflow run completed a paid examination.

## Service boundary

The workflow uses Standing Gate against the single evaluation door at `POST /v1/evaluate`. It emits an object-bound, Ed25519-signed `WHP-STANDING-MARK-v1` record (`POSITIVE_STANDING_MARK` with outcome `ESTABLISHED`, or `NEGATIVE_STANDING_FINDING` with outcome `NOT_ESTABLISHED`). A workflow's configured allowlist controls client reception; it is not evaluator authorization to deploy, merge, spend, or otherwise execute a consequential action.

Read current terms and fields from the live sources before use:

- Contract: <https://decisionintegrity.wheelerhubbellpublishing.com/v1/contract>
- Discovery: <https://decisionintegrity.wheelerhubbellpublishing.com/.well-known/whp-standing.json>
- Front-door description: <https://decisionintegrity.wheelerhubbellpublishing.com/v1/evaluate>
- Standing Gate: <https://github.com/wheelerhubbell/standing-gate>

## Run the existing workflow

The workflow is configured for push, pull request, and manual dispatch. It submits the repository, commit, claim, and provenance to Standing Gate. To receive a live response, configure an authorized credential using GitHub's repository Actions secrets settings:

- `WHP_API_KEY`: only if WHP has provisioned a subscription API key for this repository; or
- `WHP_BUYER_KEY`: only if the repository owner explicitly authorizes an appropriately funded Base wallet for the supported front-door x402 flow, after reviewing the live challenge and spending limits.

Never put a private key in workflow YAML, a commit, issue, or log. Do not create, fund, or infer authorization for a wallet as part of setup. If no authorized credential is configured, a live 402 Payment Required response is expected and the gate fails closed. Do not set mock mode to make the live workflow appear successful.

GitHub's instructions for adding a repository Actions secret are at <https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets>.

## What the result means

Standing Gate preserves the returned evaluation record, hash and signature verification status, and emits a separate client reception event. A verified signature supports record integrity under the discovered key; it does not establish the truth of claims, external authority, or permission to deploy. The client allowlist controls only its workflow disposition. It is not evaluator authorization for a consequential action.

The workflow may be used to demonstrate integration once an authorized credential is configured and a run actually completes. Unit tests, a 402 challenge, or a successful build do not demonstrate payment settlement, a completed live evaluation, a sealed Mark, independent verification, or production deployment.
