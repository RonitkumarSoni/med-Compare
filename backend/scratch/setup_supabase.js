import supabase from '../src/config/supabaseClient.js';

async function setupDatabase() {
  console.log('🚀 Setting up Supabase Tables...');

  // Note: Supabase doesn't allow creating tables via the JS client easily (it's SQL based).
  // But we can try to insert a dummy record to see if the table exists or just assume it does.
  // In a real scenario, the user would run SQL in the Supabase dashboard.
  
  console.log('💡 Note: Please run the following SQL in your Supabase SQL Editor:');
  console.log(`
    -- Create Users table
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      role TEXT DEFAULT 'user',
      city TEXT,
      state TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- Create Medicines table
    CREATE TABLE IF NOT EXISTS medicines (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT NOT NULL,
      pharmacy_id UUID,
      price DECIMAL(10,2),
      expiry_date DATE,
      in_stock BOOLEAN DEFAULT true,
      image TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- Create Pharmacies table
    CREATE TABLE IF NOT EXISTS pharmacies (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT NOT NULL,
      address TEXT,
      phone TEXT,
      rating DECIMAL(3,2),
      verified BOOLEAN DEFAULT false,
      image TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

setupDatabase();
