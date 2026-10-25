#!/usr/bin/env node
/**
 * WHP Decision Integrity Auditor Runner
 * Evaluates claims against Wheeler Hubbell Publishing runtime.
 * Supports dual ingress: Commercial WHP_API_KEY or Autonomous x402 Base payment.
 */

const WHP_URL = process.env.WHP_URL || 'https://api.wheelerhubbellpublishing.com';
const args = process.argv.slice(2);
const isLive = args.includes('--live');
const claimIndex = args.indexOf('--claim');
const claim = claimIndex !== -1 && args[claimIndex + 1] ? args[claimIndex + 1] : 'Autonomous workflow execution claim';

async function main() {
  console.log(`[WHP Sentinel] Evaluating claim: "${claim}"`);

  const payload = {
    subject: process.env.WHP_SUBJECT || 'whp-sentinel-execution',
    claim: claim,
    provenance: {
      source: process.env.GITHUB_SERVER_URL ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}` : 'https://github.com/wheelerhubbell/whp-sentinel-template',
      authority: 'repository-sentinel',
      evidence: [{
        sha: process.env.GITHUB_SHA || 'head',
        timestamp: new Date().toISOString()
      }]
    }
  };

  const headers = { 'Content-Type': 'application/json' };
  const apiKey = (process.env.WHP_API_KEY || '').trim();
  const paymentKey = (process.env.WHP_PAYMENT_KEY || process.env.WHP_PAYMENT || '').trim();

  if (apiKey) {
    console.log('[WHP Sentinel] Authenticating via provisioned WHP_API_KEY rail');
    headers['Authorization'] = `Bearer ${apiKey}`;
    headers['x-api-key'] = apiKey;
  } else if (paymentKey) {
    console.log('[WHP Sentinel] Authenticating via payment credential');
    headers['Authorization'] = paymentKey.startsWith('Bearer ') ? paymentKey : `Bearer ${paymentKey}`;
    headers['PAYMENT-SIGNATURE'] = paymentKey;
  } else if (!isLive) {
    headers['X-Mock'] = 'true';
  }

  try {
    const res = await fetch(`${WHP_URL}/v1/evaluate`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log(`[WHP Sentinel] HTTP Status: ${res.status}`);
    console.log(`[WHP Sentinel] Determination:`, JSON.stringify(data, null, 2));

    if (res.ok) {
      const outcome = data.record?.determination?.outcome || data.payload?.decision_record?.outcome || 'ACCEPTED';
      console.log(`✅ Sentinel cleared: ${outcome}`);
      process.exit(0);
    } else {
      console.error(`❌ Sentinel blocked (HTTP ${res.status}):`, data.error || 'Failed');
      process.exit(1);
    }
  } catch (err) {
    console.error(`❌ Execution error: ${err.message}`);
    process.exit(1);
  }
}

main();
