import { supabase } from '../config/supabase';

export interface ActionAgentInput {
  customerEmail: string;
  userQuery: string;
  category: string;
  retrievedContext: string[];
}

export interface ActionAgentResult {
  finalResponse: string;
  ticketId: string;
  status: 'resolved' | 'escalated';
}

export async function actionAgent(state: ActionAgentInput): Promise<ActionAgentResult> {
  const isUrgent = state.category === 'urgent_escalation';
  const ticketStatus = isUrgent ? 'escalated' : 'resolved';

  let finalResponse = '';
  if (isUrgent) {
    finalResponse = 'Your request has been prioritized as URGENT. Tier-3 engineering is reviewing it immediately.';
  } else {
    const contextSummary = state.retrievedContext.join('\n');
    finalResponse = `Hello, regarding your query: "${state.userQuery}"\n\nRecommended Action:\n${contextSummary}\n\nThank you for reaching out to support.`;
  }

  // Supabase support_tickets table mein insert karein
  const { data, error } = await supabase
    .from('support_tickets')
    .insert([
      {
        customer_email: state.customerEmail,
        query: state.userQuery,
        category: state.category,
        resolution: finalResponse,
        status: ticketStatus,
      },
    ])
    .select('id')
    .single();

  if (error) {
    console.error('⚠️ Supabase Ticket Insert Error:', error.message);
  }

  return {
    finalResponse,
    ticketId: data?.id ? String(data.id) : `TICK-${Date.now().toString().slice(-4)}`,
    status: ticketStatus,
  };
}