import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fix() {
  console.log('🚀 Starting Instant Bulk SQL Image Update...');
  
  const updates = [
    {
      label: 'Tablets & Capsules',
      sql: "UPDATE medicines SET image_url = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600' WHERE dosage_form ILIKE '%tablet%' OR dosage_form ILIKE '%capsule%';"
    },
    {
      label: 'Syrups & Liquids',
      sql: "UPDATE medicines SET image_url = 'https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=600' WHERE dosage_form ILIKE '%syrup%' OR dosage_form ILIKE '%bottle%' OR dosage_form ILIKE '%liquid%';"
    },
    {
      label: 'Injections',
      sql: "UPDATE medicines SET image_url = 'https://images.unsplash.com/photo-1579154204601-01588f351167?q=80&w=600' WHERE dosage_form ILIKE '%injection%' OR dosage_form ILIKE '%vial%';"
    },
    {
      label: 'Inhalers',
      sql: "UPDATE medicines SET image_url = 'https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=600' WHERE dosage_form ILIKE '%inhaler%';"
    },
    {
      label: 'Fallbacks (Nulls)',
      sql: "UPDATE medicines SET image_url = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600' WHERE image_url IS NULL;"
    }
  ];

  for (const update of updates) {
    console.log(`⏳ Updating ${update.label}...`);
    const { error } = await supabase.rpc('exec_sql', { sql: update.sql });
    if (error) {
      console.error(`❌ Error updating ${update.label}:`, error.message);
    } else {
      console.log(`✅ ${update.label} updated successfully.`);
    }
  }

  console.log('\n🎉 ALL IMAGES FIXED INSTANTLY!');
}

fix();
