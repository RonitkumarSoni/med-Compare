import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials missing in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
  console.log('Testing Supabase connection...');
  try {
    // Try to fetch something simple or just check if URL is reachable
    const { data, error } = await supabase.from('_test_connection').select('*').limit(1);
    
    // Even if table doesn't exist, if it returns an error other than 'network error', the connection works
    if (error && error.message.includes('FetchError')) {
      console.error('❌ Supabase Connection Failed (Network Error)');
    } else {
      console.log('✅ Supabase is Reachable!');
      console.log('Note: Table error is expected if database is not set up yet, but the API is working.');
    }
  } catch (err) {
    console.error('❌ Unexpected Error:', err.message);
  }
}

testSupabase();
