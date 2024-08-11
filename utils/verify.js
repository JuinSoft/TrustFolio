"use server";

const VerificationLevel = require("@worldcoin/idkit-core").VerificationLevel;
const verifyCloudProof = require("@worldcoin/idkit-core/backend").verifyCloudProof;

const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID;
const action = process.env.NEXT_PUBLIC_WLD_ACTION;

async function verify(proof, signal) {
  const verifyRes = await verifyCloudProof(proof, app_id, action, signal);
  if (verifyRes.success) {
    return { success: true };
  } else {
    return { success: false, code: verifyRes.code, attribute: verifyRes.attribute, detail: verifyRes.detail };
  }
}

export default verify;