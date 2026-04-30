import supabase from '../src/config/supabaseClient.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const RELIABLE_IMAGES = [
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600', // Tablets
  'https://images.unsplash.com/photo-1550572017-ed200277c639?q=80&w=600', // Bottle
  'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=600', // Tablets 2
  'https://images.unsplash.com/photo-1471864190281-ad5f9f81ce4c?q=80&w=600', // Pills
  'https://images.unsplash.com/photo-1628771065518-0d82f159f96d?q=80&w=600', // Pills 2
  'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=600', // Syrup
  'https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=600', // Bottle blue
  'https://images.unsplash.com/photo-1603398938378-e54eab446f91?q=80&w=600'  // Injection
];

function getHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

async function fixImagesSuperFast() {
  console.log('🚀 Starting Super Fast Image Fix for ALL records...');

  let totalFetched = 0;
  let totalUpdated = 0;
  let hasMore = true;

  while (hasMore) {
    const { data: medicines, error: fetchError } = await supabase
      .from('medicines')
      .select('id, name')
      .range(totalFetched, totalFetched + 999);

    if (fetchError || !medicines || medicines.length === 0) {
      hasMore = false;
      break;
    }

    console.log(`📦 Fetched ${medicines.length} medicines. Grouping...`);
    totalFetched += medicines.length;

    const groups = RELIABLE_IMAGES.map(() => []);
    for (const med of medicines) {
      const hash = getHash(med.name || med.id);
      groups[hash % RELIABLE_IMAGES.length].push(med.id);
    }

    for (let i = 0; i < groups.length; i++) {
      const ids = groups[i];
      if (ids.length === 0) continue;

      const chunkSize = 200;
      for (let j = 0; j < ids.length; j += chunkSize) {
        const chunk = ids.slice(j, j + chunkSize);
        const { error } = await supabase.from('medicines').update({ image_url: RELIABLE_IMAGES[i] }).in('id', chunk);
        if (!error) totalUpdated += chunk.length;
      }
    }
    
    console.log(`✅ Current total updated: ${totalUpdated}`);
  }

  console.log(`\n🎉 DONE! Total updated: ${totalUpdated}`);
}

fixImagesSuperFast();
