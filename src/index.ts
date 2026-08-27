import { appGraph } from './graph';

async function main() {
  console.log('🚀 Starting Multi-Agent AI Workflow...\n');

  const incomingTicket = {
    customerEmail: 'client@company.com',
    userQuery: 'The checkout page throws a 500 server error on payment submission.',
  };

  console.log('📥 Incoming Ticket:', incomingTicket);
  console.log('--------------------------------------------------');

  const finalState = await appGraph.invoke(incomingTicket);

  console.log('✅ Multi-Agent Workflow Completed Successfully!\n');
  console.log('🏷️ Classified Category :', finalState.category);
  console.log('🎯 Confidence Score     :', finalState.confidenceScore);
  console.log('🎫 Ticket ID            :', finalState.ticketId);
  console.log('📌 Pipeline Status      :', finalState.status);
  console.log('\n💬 Final Customer Response:\n' + finalState.finalResponse);
}

main();