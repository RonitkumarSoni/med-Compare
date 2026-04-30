import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function addColumns() {
  console.log('Adding dealer columns to medicines table...');
  
  // Note: Standard supabase-js doesn't support ALTER TABLE directly via RPC easily 
  // unless we have a specific function. We'll try to use a direct insert to test if they exist.
  
  const { data, error } = await supabase
    .from('medicines')
    .select('dealer_name, dealer_number')
    .limit(1);

  if (error) {
    console.log('Columns missing or error:', error.message);
    console.log('Please run this SQL in your Supabase SQL Editor:');
    console.log('ALTER TABLE medicines ADD COLUMN IF NOT EXISTS dealer_name TEXT;');
    console.log('ALTER TABLE medicines ADD COLUMN IF NOT EXISTS dealer_number TEXT;');
  } else {
    console.log('✅ Dealer columns already exist!');
  }
}

addColumns();
