import { supabase } from '../config/supabase';

export interface DataRetrievalResult {
  retrievedContext: string[];
  status: 'resolved' | 'escalated' | 'in_progress';
}

export async function dataAgent(state: { userQuery: string; category: string }): Promise<DataRetrievalResult> {
  const queryKeywords = state.userQuery.toLowerCase().split(' ');

  // Supabase se company_knowledge fetch karein
  const { data, error } = await supabase
    .from('company_knowledge')
    .select('title, content')
    .limit(5);

  if (error || !data || data.length === 0) {
    // Agar DB empty ho toh standard fallback knowledge base return karein
    return {
      retrievedContext: [
        'Payment/500 Error SOP: Ask customer to clear browser cache or check gateway status.',
        'Technical SOP: Restart the service worker and inspect console logs for failing endpoint.',
      ],
      status: 'in_progress',
    };
  }

  // Matching records filter karein
  const matchedDocs = data
    .filter((doc) =>
      queryKeywords.some(
        (kw) =>
          doc.title.toLowerCase().includes(kw) ||
          doc.content.toLowerCase().includes(kw)
      )
    )
    .map((doc) => `${doc.title}: ${doc.content}`);

  return {
    retrievedContext: matchedDocs.length > 0 ? matchedDocs : [data[0].content],
    status: 'in_progress',
  };
}