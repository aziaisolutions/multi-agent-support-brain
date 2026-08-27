export interface TriageResult {
  category: 'technical_bug' | 'billing' | 'general_query' | 'urgent_escalation';
  confidenceScore: number;
}

export async function triageAgent(state: { userQuery: string }): Promise<TriageResult> {
  const query = state.userQuery.toLowerCase();

  // Urgent Escalation Patterns
  if (query.includes('security') || query.includes('breach') || query.includes('hacked') || query.includes('legal')) {
    return { category: 'urgent_escalation', confidenceScore: 0.98 };
  }

  // Technical Bug Patterns
  if (query.includes('500') || query.includes('error') || query.includes('crash') || query.includes('bug') || query.includes('broken') || query.includes('failed')) {
    return { category: 'technical_bug', confidenceScore: 0.95 };
  }

  // Billing Patterns
  if (query.includes('invoice') || query.includes('charge') || query.includes('payment') || query.includes('refund') || query.includes('pricing') || query.includes('subscription')) {
    return { category: 'billing', confidenceScore: 0.92 };
  }

  // Default General Query
  return { category: 'general_query', confidenceScore: 0.85 };
}