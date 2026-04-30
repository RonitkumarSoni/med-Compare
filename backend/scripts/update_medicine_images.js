import supabase from '../src/config/supabaseClient.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const VARIATIONS = {
  tablets: [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=600',
    'https://images.unsplash.com/photo-1471864190281-ad5f9f81ce4c?q=80&w=600',
    'https://images.unsplash.com/photo-1628771065518-0d82f159f96d?q=80&w=600'
  ],
  bottle: [
    'https://images.unsplash.com/photo-1550572017-ed200277c639?q=80&w=600',
    'https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=600',
    'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=600'
  ],
  injection: [
    'https://images.unsplash.com/photo-1579154204601-01588f351167?q=80&w=600',
    'https://images.unsplash.com/photo-1603398938378-e54eab446f91?q=80&w=600'
  ],
  inhaler: [
    'https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=600'
  ],
  ointment: [
    'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=600',
    'https://images.unsplash.com/photo-1555633514-abcee6ad93e1?q=80&w=600'
  ]
};

function getHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

async function updateMedicineImagesWithVariety() {
  console.log('🚀 Starting Diverse Medicine Image Update...');

  let totalUpdated = 0;
  let hasMore = true;

  while (hasMore) {
    const { data: medicines, error: fetchError } = await supabase
      .from('medicines')
      .select('id, name, dosage_form')
      .is('image_url', null)
      .limit(1000);

    if (fetchError) {
      console.error('❌ Error fetching:', fetchError.message);
      break;
    }

    if (!medicines || medicines.length === 0) {
      hasMore = false;
      break;
    }

    console.log(`📦 Processing batch of ${medicines.length} medicines...`);

    for (const med of medicines) {
      const name = (med.name || '').toLowerCase();
      const dosage = (med.dosage_form || '').toLowerCase();
      
      const hash = getHash(med.name || '');
      let category = 'tablets';

      if (dosage.includes('syrup') || dosage.includes('bottle') || dosage.includes('liquid') || dosage.includes('suspension')) {
        category = 'bottle';
      } else if (dosage.includes('injection') || dosage.includes('vial') || dosage.includes('ampoule')) {
        category = 'injection';
      } else if (dosage.includes('inhaler') || name.includes('inhaler')) {
        category = 'inhaler';
      } else if (dosage.includes('ointment') || dosage.includes('cream') || dosage.includes('gel')) {
        category = 'ointment';
      }

      const options = VARIATIONS[category];
      const imageUrl = options[hash % options.length];

      const { error: updateError } = await supabase
        .from('medicines')
        .update({ image_url: imageUrl })
        .eq('id', med.id);

      if (!updateError) {
        totalUpdated++;
        if (totalUpdated % 100 === 0) console.log(`✅ Total Progress: ${totalUpdated} records updated.`);
      }
    }
  }

  console.log(`\n🎉 Success! Updated a total of ${totalUpdated} medicines with unique/original images.`);
}

updateMedicineImagesWithVariety();
