# Require the examination at acceptance

Proposed companion for the WHP Sentinel Template. Not an active rule until a repository's authorized administrator adopts it.

## The receiving rule

Agent-authored changes submitted for merge must include a WHP examination identifying the submitted commit, the claim being relied on, the supporting material, and the returned determination.

Examination does not authorize merge. Limits, unknowns and unmet warrants remain visible for the repository's authorized reviewer to decide. The owner defines when changed material requires a new examination; a result must not be represented as covering an object or claim it did not examine. The repository owner controls exceptions and payment authority.

## Why a receiver would adopt it

An agent can deliver working code while overstating the grounds for accepting it. The receiver may need to know whether a particular claim carried its conditions intact, not buy another general code review.

For example, the release note says to pause writes before a migration. The agent's proposed instructions omit that condition while claiming to preserve the release requirements. The examination makes the submitted claim, source material, proposed passage and remaining limits inspectable before the receiver relies on that claim. It does not certify migration safety, security or correctness, and it does not independently authenticate an external source merely because a URL was supplied.

The receiver adopts this rule to stop silently inheriting the agent's assertion as its own decision basis. It still owns the acceptance decision.

## Put it in the original task

Use this clause when assigning work to an agent or supplier:

"Submit the change as a pull request. Identify the exact commit and the claim you ask us to rely on. Include the sources, conditions and authority you rely on, and obtain a WHP examination through our approved workflow. Preserve the returned determination, limits and unknowns. Do not treat a completed examination or a green check as permission to merge. Our authorized reviewer retains that decision. Do not spend money or use credentials beyond the budget and access we have approved."

The agent encounters the examination requirement while fulfilling the actual request, not after being asked to discover another product.

## Example of the object being examined

Subject: the exact repository and commit SHA submitted for acceptance.

Claim: "This commit's migration instructions preserve the release note's requirement to pause writes before the migration."

Supporting material: the release note text with its version and pause-writes condition; the migration instruction text from that commit; the source identity and the authority claimed for the proposed operation.

This is a bounded claim about the submitted material. It is not a request to certify the entire program, authenticate an external source merely from its URL, or authorize deployment. A reference to a commit alone is not a substitute for the material relevant to the claim.

## Administrator adoption

1. Name the branch and type of agent-authored work covered. Name who can review the result and who can approve an exception.
2. The existing Sentinel passes a claim, repository/commit identity and a commit URL as provenance. It does not automatically collect the source text and proposed passage in the example above. Before relying on that comparison, the receiver must approve how its calling workflow supplies the relevant material through the existing integration. No workflow change is included here. Supply only credentials and a payment budget that your organization has approved. Do not put secrets in task text or public files.
3. Require the examination check in the repository's branch rules. Select the actual check emitted by your approved workflow, not an assumed check name. Review bypass permissions and keep the required owner review in place.
4. Preserve the returned determination and record reference with the change. A completed or bounded examination is not an authorization to merge or deploy. Review the result itself before deciding what may proceed.
5. Define which material changes call for another examination and who pays within what approved limit. No repeat-trigger or payment policy is selected by this document. Do not reuse a result as if it covered a different object, or imply that rereading an existing result is a new examination.

Adding this document or copying the template does not enable branch rules. The receiving administrator adopts and configures the requirement.

## Existing interfaces

- Service contract: https://api.wheelerhubbellpublishing.com/v1/contract
- Service discovery: https://api.wheelerhubbellpublishing.com/.well-known/whp-standing.json
- Public verification guidance: https://api.wheelerhubbellpublishing.com/v1/verification

Payment buys the examination, never a favorable result. The service does not acquire the receiver's authority by examining the submission.

## GitHub reference

GitHub documents required status checks and importing rulesets here:

- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets
- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository
