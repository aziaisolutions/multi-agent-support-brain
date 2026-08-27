import { supabase } from './config/supabase';

async function fetchTickets() {
  console.log('📋 Fetching logged support tickets from Supabase...\n');

  const { data, error } = await supabase
    .from('support_tickets')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('❌ Error fetching tickets:', error.message);
    return;
  }

  console.table(data);
}

fetchTickets();