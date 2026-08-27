import { supabase } from './config/supabase';

async function testConnection() {
  console.log('🔄 Checking Supabase connection...');
  const { data, error } = await supabase.from('company_knowledge').select('count', { count: 'exact' });

  if (error) {
    console.error('❌ Database connection failed:', error.message);
  } else {
    console.log('✅ Supabase connected successfully! Total rows in company_knowledge:', data);
  }
}

testConnection();