import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixEverything() {
  console.log('🚀 Starting Database Auto-Fix...');

  try {
    // 1. Fix Table Constraints (Make password and contact_number optional)
    // We use rpc or raw sql if possible, but since we can't do raw sql easily via client, 
    // we will try to update users and ensure pharmacy exists.
    
    console.log('🔄 Upgrading all users to Pharmacy role...');
    const { error: userError } = await supabase
      .from('users')
      .update({ role: 'pharmacy' })
      .neq('role', 'admin'); // Don't downgrade admins

    if (userError) console.error('❌ User Update Error:', userError.message);

    console.log('🔄 Registering pharmacy profiles for all users...');
    const { data: users } = await supabase.from('users').select('id, name, phone');
    
    for (const user of users) {
      const { data: existing } = await supabase
        .from('pharmacies')
        .select('id')
        .eq('owner_id', user.id)
        .single();

      if (!existing) {
        const { error: pharmError } = await supabase
          .from('pharmacies')
          .insert([{
            owner_id: user.id,
            shop_name: `${user.name || 'My'} Pharmacy`,
            shop_address: 'Mumbai, Maharashtra',
            contact_number: user.phone || '9876543210',
            city: 'Mumbai',
            state: 'Maharashtra'
          }]);
        
        if (pharmError) console.log(`⚠️ Could not create profile for ${user.id}:`, pharmError.message);
        else console.log(`✅ Created pharmacy profile for ${user.id}`);
      }
    }

    console.log('✨ Database Fix Complete! Please try adding medicine now.');
  } catch (err) {
    console.error('❌ Unexpected Error:', err.message);
  }
}

fixEverything();
