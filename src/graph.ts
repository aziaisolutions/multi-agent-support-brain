import { StateGraph, END, START } from '@langchain/langgraph';
import { AgentStateAnnotation, StateType } from './state';
import { triageAgent } from './agents/triageAgent';
import { dataAgent } from './agents/dataAgent';
import { actionAgent } from './agents/actionAgent';

// Triage Step
async function triageNode(state: StateType) {
  const result = await triageAgent({ userQuery: state.userQuery });
  return {
    category: result.category,
    confidenceScore: result.confidenceScore,
  };
}

// Data Retrieval Step
async function dataNode(state: StateType) {
  const result = await dataAgent({
    userQuery: state.userQuery,
    category: state.category,
  });
  return {
    retrievedContext: result.retrievedContext,
    status: result.status,
  };
}

// Action & Logging Step
async function actionNode(state: StateType) {
  const result = await actionAgent({
    customerEmail: state.customerEmail,
    userQuery: state.userQuery,
    category: state.category,
    retrievedContext: state.retrievedContext,
  });
  return {
    finalResponse: result.finalResponse,
    ticketId: result.ticketId,
    status: result.status,
  };
}

// StateGraph Initialization (Object channel syntax)
const workflow = new StateGraph(AgentStateAnnotation)
  .addNode('triage', triageNode)
  .addNode('data', dataNode)
  .addNode('action', actionNode)
  .addEdge(START, 'triage')
  .addEdge('triage', 'data')
  .addEdge('data', 'action')
  .addEdge('action', END);

export const appGraph = workflow.compile();