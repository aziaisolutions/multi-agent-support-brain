import { supabase } from './config/supabase';

async function testInsert() {
  console.log('🧪 Testing direct insert into support_tickets...');

  const { data, error } = await supabase
    .from('support_tickets')
    .insert([
      {
        customer_email: 'test@domain.com',
        query: 'Sample database test query',
        category: 'technical_bug',
        resolution: 'Test resolution SOP steps.',
        status: 'resolved',
      },
    ])
    .select();

  if (error) {
    console.error('❌ Insert Failed:', error);
  } else {
    console.log('✅ Insert Success! Inserted row:', data);
  }
}

testInsert();