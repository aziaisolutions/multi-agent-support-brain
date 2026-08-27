import { dataAgent } from './agents/dataAgent';

async function testDataPipeline() {
  console.log('🔍 Testing Data Agent RAG Retrieval...\n');

  const testInput = {
    userQuery: '500 error during checkout payment',
    category: 'technical_bug',
  };

  const result = await dataAgent(testInput);
  console.log('📄 Retrieved Context:');
  console.log(result.retrievedContext);
  console.log('\n📊 Pipeline Status:', result.status);
}

testDataPipeline();