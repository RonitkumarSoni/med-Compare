import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ecenxkosefzhclzwhkve.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjZW54a29zZWZ6aGNsendoa3ZlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzU0NzM4MywiZXhwIjoyMDg5MTIzMzgzfQ.8oFr788I_hE5Y_47L1y5U4_9EWR0824b0-pUe79I6W8'
);

async function test() {
  const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });
  if (error) {
    console.error('❌ Supabase Error:', JSON.stringify(error, null, 2));
  } else {
    console.log('✅ Supabase Connected! User count:', data);
  }
}

test();
