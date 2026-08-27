import { supabase } from './config/supabase';

async function seedDatabase() {
  console.log('🌱 Seeding company_knowledge table in Supabase...\n');

  const knowledgeEntries = [
    {
      title: 'Payment & 500 Error SOP',
      content: 'Clear browser cache, check gateway webhook logs, or retry with alternate payment gateway.',
      category: 'technical_bug',
    },
    {
      title: 'Billing & Invoice Dispute SOP',
      content: 'Invoices generate on the 1st of every month. For duplicate charges, issue automatic 5-day credit note.',
      category: 'billing',
    },
    {
      title: 'Critical Downtime Escalation SOP',
      content: 'Page the on-call DevOps engineer immediately via PagerDuty and post incident status to status page.',
      category: 'urgent_escalation',
    },
  ];

  const { data, error } = await supabase
    .from('company_knowledge')
    .insert(knowledgeEntries)
    .select();

  if (error) {
    console.error('❌ Error inserting data:', error.message);
    return;
  }

  console.log(`✅ Successfully inserted ${data.length} SOP records into Supabase!`);
}

seedDatabase();