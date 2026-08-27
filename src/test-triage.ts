import { triageAgent } from './agents/triageAgent';

async function runTest() {
  console.log('🤖 Testing Triage Agent with sample query...\n');
  
  const sampleQuery = "The checkout page is throwing a 500 internal server error when clicking pay!";
  console.log(`User Message: "${sampleQuery}"`);
  
  const result = await triageAgent({ userQuery: sampleQuery });
  console.log('\n🎯 Triage Agent Decision:');
  console.log(result);
}

runTest();