#!/usr/bin/env node
/**
 * WHP Decision Integrity Sentinel Runner
 * Evaluates claims against Wheeler Hubbell Publishing runtime.
 * Supports dual ingress:
 *  1. Commercial Subscription API Key (Developer $149, Team $699, Institutional $3,500/mo)
 *  2. Autonomous M2M Micropayment Rail (1 Base USDC via x402 / EIP-3009)
 */

const WHP_URL = process.env.WHP_URL || 'https://api.wheelerhubbellpublishing.com';
const args = process.argv.slice(2);
const claimIndex = args.indexOf('--claim');
const claim = claimIndex !== -1 && args[claimIndex + 1] ? args[claimIndex + 1] : 'Autonomous workflow execution claim';

async function main() {
  console.log(`[WHP Sentinel] Target Runtime: ${WHP_URL}`);
  console.log(`[WHP Sentinel] Evaluating claim: "${claim}"`);

  const payload = {
    subject: process.env.WHP_SUBJECT || (process.env.GITHUB_REPOSITORY ? `${process.env.GITHUB_REPOSITORY}@${process.env.GITHUB_SHA || 'head'}` : 'whp-sentinel-execution'),
    claim: claim,
    provenance: {
      source: process.env.GITHUB_SERVER_URL ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}` : 'https://github.com/wheelerhubbell/whp-sentinel-template',
      authority: 'repository-sentinel',
      evidence: [{
        repository: process.env.GITHUB_REPOSITORY || 'wheelerhubbell/whp-sentinel-template',
        sha: process.env.GITHUB_SHA || 'head',
        actor: process.env.GITHUB_ACTOR || 'workflow-runner',
        timestamp: new Date().toISOString()
      }]
    }
  };

  const headers = { 'Content-Type': 'application/json' };
  const apiKey = (process.env.WHP_API_KEY || '').trim();
  const buyerKey = (process.env.WHP_BUYER_KEY || '').trim();
  const rawPayment = (process.env.WHP_PAYMENT || process.env.WHP_PAYMENT_KEY || '').trim();

  if (apiKey) {
    console.log('[WHP Sentinel] Authenticating via provisioned WHP_API_KEY rail');
    headers['Authorization'] = `Bearer ${apiKey}`;
    headers['x-api-key'] = apiKey;
  } else if (rawPayment) {
    console.log('[WHP Sentinel] Authenticating via payment credential');
    headers['Authorization'] = rawPayment.startsWith('Bearer ') ? rawPayment : `Bearer ${rawPayment}`;
    headers['PAYMENT-SIGNATURE'] = rawPayment;
  } else if (!buyerKey) {
    console.error('❌ Authentication required:');
    console.error(' - Set WHP_API_KEY for subscription rail ($149 / $699 / $3,500)');
    console.error(' - Or set WHP_BUYER_KEY for autonomous 1 Base USDC EIP-3009 signing');
    console.error('For CI/CD pipelines, use the canonical GitHub Action: `uses: wheelerhubbell/standing-gate@v0`');
    process.exit(1);
  }

  try {
    let res = await fetch(`${WHP_URL}/v1/evaluate`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    // Handle 402 challenge if buyerKey is provided
    if (res.status === 402 && buyerKey) {
      console.log('[WHP Sentinel] Received HTTP 402 payment challenge. Preparing autonomous EIP-3009 signing...');
      try {
        const viemAccounts = await import('viem/accounts');
        const key = buyerKey.startsWith('0x') ? buyerKey : '0x' + buyerKey;
        const acct = viemAccounts.privateKeyToAccount(key);
        const challenge = await res.json();
        const reqs = challenge.accepts?.[0] || challenge.purchase?.requirements || {};
        
        const now = Math.floor(Date.now() / 1000);
        const authorization = {
          from: acct.address.toLowerCase(),
          to: (reqs.payTo || '0x1050eddd8282623b0c263ed6bdbd42370bbc28d3').toLowerCase(),
          value: String(reqs.amount || '1000000'),
          validAfter: String(Math.max(0, now - 60)),
          validBefore: String(now + 300),
          nonce: '0x' + Array.from(crypto.getRandomValues(new Uint8Array(32)), b => b.toString(16).padStart(2, '0')).join('')
        };

        const typedData = {
          domain: {
            name: reqs.extra?.name || 'USD Coin',
            version: reqs.extra?.version || '2',
            chainId: 8453,
            verifyingContract: (reqs.asset || '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913').toLowerCase()
          },
          types: {
            TransferWithAuthorization: [
              { name: 'from', type: 'address' },
              { name: 'to', type: 'address' },
              { name: 'value', type: 'uint256' },
              { name: 'validAfter', type: 'uint256' },
              { name: 'validBefore', type: 'uint256' },
              { name: 'nonce', type: 'bytes32' }
            ]
          },
          primaryType: 'TransferWithAuthorization',
          message: {
            ...authorization,
            value: BigInt(authorization.value),
            validAfter: BigInt(authorization.validAfter),
            validBefore: BigInt(authorization.validBefore)
          }
        };

        const signature = await acct.signTypedData(typedData);
        const submission = {
          x402Version: 2,
          resource: challenge.resource,
          accepted: reqs,
          payload: { signature, authorization }
        };
        const paymentHeader = Buffer.from(JSON.stringify(submission)).toString('base64');
        headers['PAYMENT-SIGNATURE'] = paymentHeader;

        res = await fetch(`${WHP_URL}/v1/evaluate`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });
      } catch (signErr) {
        console.error('❌ Autonomous signing failed:', signErr.message);
        process.exit(1);
      }
    }

    const data = await res.json();
    console.log(`[WHP Sentinel] HTTP Status: ${res.status}`);

    if (res.ok) {
      const outcome = data.record?.determination?.outcome || data.payload?.decision_record?.outcome || 'ACCEPTED';
      const hash = data.record_hash || data.payload?.decision_record_ref || 'verified';
      console.log(`✅ Sentinel cleared: ${outcome} (hash: ${hash})`);
      process.exit(0);
    } else {
      console.error(`❌ Sentinel blocked (HTTP ${res.status}):`, data.error || data.message || 'Evaluation failed');
      process.exit(1);
    }
  } catch (err) {
    console.error(`❌ Execution error: ${err.message}`);
    process.exit(1);
  }
}

main();
