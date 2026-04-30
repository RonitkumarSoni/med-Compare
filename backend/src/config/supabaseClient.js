import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role for backend operations

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials missing in .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
