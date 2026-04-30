import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const CATEGORIES = {
  TABLETS: [
    'https://images.unsplash.com/photo-1550572017-ed200277c639?q=80&w=600',
    'https://images.unsplash.com/photo-1631549916768-4119b295f789?q=80&w=600',
    'https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=600',
    'https://images.unsplash.com/photo-1628771065518-0d82f159f96d?q=80&w=600'
  ],
  SYRUPS: [
    'https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=600',
    'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=600',
    'https://images.unsplash.com/photo-1555633514-abcee6ad93e1?q=80&w=600'
  ],
  INJECTIONS: [
    'https://images.unsplash.com/photo-1579154204601-01588f351167?q=80&w=600',
    'https://images.unsplash.com/photo-1603398938378-e54eab446f91?q=80&w=600'
  ],
  INHALERS: [
    'https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=600'
  ]
};

function getHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

async function advancedFix() {
  console.log('🚀 Starting Advanced Medicine-Matching Image Update...');
  
  let allMedicines = [];
  let from = 0;
  const step = 1000;
  let hasMore = true;

  while (hasMore) {
    const { data: medicines, error } = await supabase
      .from('medicines')
      .select('id, name, dosage_form')
      .range(from, from + step - 1);

    if (error) return console.error(error);
    if (medicines.length < step) hasMore = false;
    
    allMedicines = [...allMedicines, ...medicines];
    from += step;
  }

  console.log(`✅ Loaded ${allMedicines.length} medicines. Processing...`);

  const updates = [];

  for (const med of allMedicines) {
    const name = (med.name || '').toLowerCase();
    const dosage = (med.dosage_form || '').toLowerCase();
    const hash = getHash(med.name || '');

    let category = 'TABLETS';
    if (dosage.includes('syrup') || dosage.includes('bottle') || dosage.includes('liquid') || dosage.includes('suspension')) {
      category = 'SYRUPS';
    } else if (dosage.includes('injection') || dosage.includes('vial') || dosage.includes('ampoule')) {
      category = 'INJECTIONS';
    } else if (dosage.includes('inhaler') || name.includes('inhaler')) {
      category = 'INHALERS';
    }

    const options = CATEGORIES[category];
    const imageUrl = options[hash % options.length];

    updates.push({
        id: med.id,
        image_url: imageUrl
    });
  }

  // 2. Perform updates in batches
  console.log(`⏳ Updating ${updates.length} records in batches...`);
  const BATCH_SIZE = 100;
  for (let i = 0; i < updates.length; i += BATCH_SIZE) {
    const batch = updates.slice(i, i + BATCH_SIZE);
    
    // We have to update one by one or use a clever RPC if we want it to be fast.
    // Since exec_sql didn't work, I'll use Promise.all for each batch.
    await Promise.all(batch.map(item => 
      supabase.from('medicines').update({ image_url: item.image_url }).eq('id', item.id)
    ));
    
    if ((i + BATCH_SIZE) % 500 === 0) {
      console.log(`✅ Progress: ${i + BATCH_SIZE} records updated.`);
    }
  }

  console.log('\n🎉 ADVANCED IMAGE UPDATE COMPLETE!');
}

advancedFix();
