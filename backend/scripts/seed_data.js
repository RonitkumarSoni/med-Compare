import supabase from '../src/config/supabaseClient.js';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Seeding database...');

  // 1. Clear existing data (Optional, be careful)
  // await supabase.from('medicines').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  // await supabase.from('pharmacies').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  // await supabase.from('users').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  // 2. Create Users
  const { data: users, error: userError } = await supabase.from('users').insert([
    { name: 'Admin User', email: 'admin@medcompare.com', password: hashedPassword, role: 'admin', city: 'Mumbai', state: 'Maharashtra' },
    { name: 'Sanjeev Kumar', email: 'sanjeev@pharmacy.com', password: hashedPassword, role: 'pharmacy', city: 'Delhi', state: 'Delhi' },
    { name: 'Priya Sharma', email: 'priya@pharmacy.com', password: hashedPassword, role: 'pharmacy', city: 'Mumbai', state: 'Maharashtra' },
    { name: 'Rahul Verma', email: 'rahul@user.com', password: hashedPassword, role: 'user', city: 'Pune', state: 'Maharashtra' }
  ]).select();

  if (userError) {
    console.error('Error seeding users:', userError);
    return;
  }
  console.log('✅ Users seeded');

  const pharmacyOwners = users.filter(u => u.role === 'pharmacy');

  // 3. Create Pharmacies
  const { data: pharmacies, error: pharmError } = await supabase.from('pharmacies').insert([
    { 
      owner_id: pharmacyOwners[0].id, 
      shop_name: 'Sanjeevani Health Clinic', 
      shop_address: 'Shop 4, MG Road, Sector 15, Rohini, Delhi', 
      contact_number: '9876543210', 
      verification_status: 'verified', 
      city: 'Delhi', 
      state: 'Delhi' 
    },
    { 
      owner_id: pharmacyOwners[1].id, 
      shop_name: 'City Medicos Mumbai', 
      shop_address: '12, Linking Road, Bandra West, Mumbai', 
      contact_number: '9123456789', 
      verification_status: 'verified', 
      city: 'Mumbai', 
      state: 'Maharashtra' 
    }
  ]).select();

  if (pharmError) {
    console.error('Error seeding pharmacies:', pharmError);
    return;
  }
  console.log('✅ Pharmacies seeded');

  // 4. Create Medicines
  const medicinesData = [
    { name: 'Paracetamol 500mg', brand_name: 'Crocin', generic_name: 'Paracetamol', price: 30.00, discount_percentage: 10, selling_price: 27.00, available_quantity: 100, expiry_date: '2025-12-31', dosage_form: 'Tablet', pharmacy_id: pharmacies[0].id },
    { name: 'Amoxicillin 500mg', brand_name: 'Novamox', generic_name: 'Amoxicillin', price: 120.00, discount_percentage: 15, selling_price: 102.00, available_quantity: 50, expiry_date: '2025-10-15', dosage_form: 'Capsule', pharmacy_id: pharmacies[0].id },
    { name: 'Metformin 500mg', brand_name: 'Glycomet', generic_name: 'Metformin', price: 50.00, discount_percentage: 5, selling_price: 47.50, available_quantity: 200, expiry_date: '2026-05-20', dosage_form: 'Tablet', pharmacy_id: pharmacies[1].id },
    { name: 'Atorvastatin 10mg', brand_name: 'Lipvas', generic_name: 'Atorvastatin', price: 150.00, discount_percentage: 20, selling_price: 120.00, available_quantity: 30, expiry_date: '2025-08-10', dosage_form: 'Tablet', pharmacy_id: pharmacies[1].id },
    { name: 'Cough Syrup', brand_name: 'Benadryl', generic_name: 'Diphenhydramine', price: 95.00, discount_percentage: 8, selling_price: 87.40, available_quantity: 45, expiry_date: '2026-01-01', dosage_form: 'Syrup', pharmacy_id: pharmacies[0].id }
  ];

  const { error: medError } = await supabase.from('medicines').insert(medicinesData);

  if (medError) {
    console.error('Error seeding medicines:', medError);
    return;
  }
  console.log('✅ Medicines seeded');

  console.log('🚀 Seeding complete!');
}

seed();
