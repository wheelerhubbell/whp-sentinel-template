#!/usr/bin/env node
/**
 * WHP Decision Integrity Auditor Runner
 * Evaluates claims against Wheeler Hubbell Publishing runtime.
 */

const WHP_URL = process.env.WHP_URL || 'https://standing-guard-service.lovable.app';
const args = process.argv.slice(2);
const isLive = args.includes('--live');
const claimIndex = args.indexOf('--claim');
const claim = claimIndex !== -1 && args[claimIndex + 1] ? args[claimIndex + 1] : 'Autonomous workflow execution claim';

async function main() {
  console.log(`[WHP Sentinel] Evaluating claim: "${claim}"`);
  console.log(`[WHP Sentinel] Mode: ${isLive ? 'LIVE (x402 Base settlement)' : 'MOCK (dry-run structural check)'}`);

  const payload = {
    subject: 'whp-sentinel-execution',
    claim: claim,
    provenance: 'https://github.com/wheelerhubbell/whp-sentinel-template',
    timestamp: new Date().toISOString()
  };

  const headers = { 'Content-Type': 'application/json' };
  if (!isLive) {
    headers['X-Mock'] = 'true';
  } else if (process.env.WHP_PAYMENT_KEY) {
    headers['X-Payment-Key'] = process.env.WHP_PAYMENT_KEY;
  }

  try {
    const res = await fetch(`${WHP_URL}/v1/evaluate`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log(`[WHP Sentinel] HTTP Status: ${res.status}`);
    console.log(`[WHP Sentinel] Verdict:`, JSON.stringify(data, null, 2));

    if (res.ok) {
      console.log('✅ Audit successful.');
      process.exit(0);
    } else {
      console.error('❌ Audit returned error / payment required.');
      process.exit(1);
    }
  } catch (err) {
    console.error(`❌ Execution failed: ${err.message}`);
    process.exit(1);
  }
}

main();
