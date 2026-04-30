import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import supabase from '../src/config/supabaseClient.js';
import dotenv from 'dotenv';

// Configure dotenv to ensure environment variables are loaded
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const JSON_FILE_PATH = path.join(__dirname, '../scratch/Indian-Medicine-Dataset/DATA/indian_medicine_data.json');
const LIMIT = 2000;

async function seedRealMedicines() {
  console.log(`\n🚀 Starting Real Medicine Data Seeding (Limit: ${LIMIT})...`);

  // 1. Fetch active pharmacies to assign medicines to
  const { data: pharmacies, error: pharmError } = await supabase.from('pharmacies').select('id, shop_name');
  if (pharmError || !pharmacies || pharmacies.length === 0) {
    console.error('❌ Error: No pharmacies found in the database. Run seed_data.js first.');
    return;
  }
  console.log(`✅ Found ${pharmacies.length} pharmacies to map medicines to.`);

  // 2. Read and parse the JSON dataset
  console.log(`\n📂 Reading dataset from ${JSON_FILE_PATH}...`);
  if (!fs.existsSync(JSON_FILE_PATH)) {
     console.error('❌ Error: Dataset file not found. Ensure the repository was cloned successfully.');
     return;
  }

  let rawData;
  try {
    const fileContent = fs.readFileSync(JSON_FILE_PATH, 'utf-8');
    rawData = JSON.parse(fileContent);
  } catch (err) {
    console.error('❌ Error parsing JSON file:', err.message);
    return;
  }

  const itemsToImport = rawData.slice(0, LIMIT);
  console.log(`✅ Loaded ${itemsToImport.length} medicines from dataset.`);

  // 3. Transform data to match Supabase schema
  const transformedData = [];

  for (let i = 0; i < itemsToImport.length; i++) {
    const item = itemsToImport[i];
    
    // Pick a random pharmacy
    const randomPharmacy = pharmacies[Math.floor(Math.random() * pharmacies.length)];
    
    // Calculate prices
    const basePrice = parseFloat(item['price(₹)']) || Math.floor(Math.random() * 500) + 50;
    const discount = Math.floor(Math.random() * 25); // 0% to 24% discount
    const sellingPrice = parseFloat((basePrice - (basePrice * discount / 100)).toFixed(2));
    
    // Format composition
    const comp1 = item.short_composition1 ? item.short_composition1.trim() : '';
    const comp2 = item.short_composition2 ? item.short_composition2.trim() : '';
    const genericName = `${comp1} ${comp2}`.trim() || 'Generic Form';

    transformedData.push({
      pharmacy_id: randomPharmacy.id,
      name: item.name || 'Unknown Medicine',
      brand_name: item.manufacturer_name || 'Generic Manufacturer',
      generic_name: genericName,
      price: basePrice,
      discount_percentage: discount,
      selling_price: sellingPrice,
      available_quantity: Math.floor(Math.random() * 500) + 10,
      expiry_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 2).toISOString().split('T')[0], // 2 years from now
      dosage_form: item.pack_size_label || 'Tablet',
      is_active: item.Is_discontinued === 'FALSE',
      is_approved: true
    });
  }

  // 4. Batch insert into Supabase
  console.log(`\n⏳ Inserting ${transformedData.length} records into Supabase in batches...`);
  const BATCH_SIZE = 500;
  let insertedCount = 0;

  for (let i = 0; i < transformedData.length; i += BATCH_SIZE) {
    const batch = transformedData.slice(i, i + BATCH_SIZE);
    const { error: insertError } = await supabase.from('medicines').insert(batch);
    
    if (insertError) {
      console.error(`❌ Error inserting batch ${i / BATCH_SIZE + 1}:`, insertError.message);
    } else {
      insertedCount += batch.length;
      console.log(`✅ Batch ${i / BATCH_SIZE + 1} inserted successfully (${batch.length} records).`);
    }
  }

  console.log(`\n🎉 Seeding Complete! Successfully inserted ${insertedCount} real medicines into the database.`);
}

seedRealMedicines();
