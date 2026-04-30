import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fix() {
  console.log('🚀 Starting Batch Image Update...');
  
  const updates = [
    {
      label: 'Tablets',
      url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600',
      filter: (q) => q.ilike('dosage_form', '%tablet%')
    },
    {
        label: 'Capsules',
        url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600',
        filter: (q) => q.ilike('dosage_form', '%capsule%')
    },
    {
      label: 'Syrups & Liquids',
      url: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=600',
      filter: (q) => q.or('dosage_form.ilike.%syrup%,dosage_form.ilike.%bottle%,dosage_form.ilike.%liquid%')
    },
    {
      label: 'Injections',
      url: 'https://images.unsplash.com/photo-1579154204601-01588f351167?q=80&w=600',
      filter: (q) => q.or('dosage_form.ilike.%injection%,dosage_form.ilike.%vial%')
    },
    {
      label: 'Inhalers',
      url: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=600',
      filter: (q) => q.ilike('dosage_form', '%inhaler%')
    }
  ];

  for (const update of updates) {
    console.log(`⏳ Updating ${update.label}...`);
    let query = supabase.from('medicines').update({ image_url: update.url });
    query = update.filter(query);
    
    const { error } = await query;
    if (error) {
      console.error(`❌ Error updating ${update.label}:`, error.message);
    } else {
      console.log(`✅ ${update.label} updated successfully.`);
    }
  }

  // Final catch-all for anything still null
  console.log('⏳ Updating remaining nulls...');
  const { error: finalError } = await supabase.from('medicines')
    .update({ image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600' })
    .is('image_url', null);
  
  if (finalError) console.error('❌ Error updating nulls:', finalError.message);
  else console.log('✅ All remaining nulls updated.');

  console.log('\n🎉 ALL IMAGES FIXED!');
}

fix();
