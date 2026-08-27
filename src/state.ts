import { Annotation } from '@langchain/langgraph';

export const AgentStateAnnotation = Annotation.Root({
  customerEmail: Annotation<string>(),
  userQuery: Annotation<string>(),
  category: Annotation<string>({
    reducer: (_, next) => next,
    default: () => 'general_query',
  }),
  confidenceScore: Annotation<number>({
    reducer: (_, next) => next,
    default: () => 0.8,
  }),
  retrievedContext: Annotation<string[]>({
    reducer: (prev, next) => (next ? prev.concat(next) : prev),
    default: () => [],
  }),
  finalResponse: Annotation<string>({
    reducer: (_, next) => next,
    default: () => '',
  }),
  ticketId: Annotation<string>({
    reducer: (_, next) => next,
    default: () => '',
  }),
  status: Annotation<string>({
    reducer: (_, next) => next,
    default: () => 'in_progress',
  }),
});

export type StateType = typeof AgentStateAnnotation.State;