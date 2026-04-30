import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Pharmacy from '../models/Pharmacy.js';
import Medicine from '../models/Medicine.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Pharmacy.deleteMany();
    await Medicine.deleteMany();

    console.log('Data cleared...');

    // Create Admin
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@medcompare.com',
      password: 'password123',
      phone: '1234567890',
      role: 'admin',
    });

    // Create Pharmacy Owners
    const owner1 = await User.create({
      name: 'Rajesh Sharma',
      email: 'rajesh@pharmacy.com',
      password: 'password123',
      phone: '9876543210',
      role: 'pharmacy',
    });

    const owner2 = await User.create({
      name: 'Amit Patel',
      email: 'amit@pharmacy.com',
      password: 'password123',
      phone: '8765432109',
      role: 'pharmacy',
    });

    // Create Regular Users
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'password123',
      phone: '7654321098',
      role: 'user',
    });

    // Create Pharmacies
    const pharmacy1 = await Pharmacy.create({
      owner: owner1._id,
      shopName: 'City Wellness Pharmacy',
      legalName: 'City Wellness Pvt Ltd',
      address: '123 Market St, New Delhi',
      city: 'New Delhi',
      phone: '011-2345678',
      coordinates: [77.209, 28.6139], // Delhi
      verificationStatus: 'verified',
    });

    const pharmacy2 = await Pharmacy.create({
      owner: owner2._id,
      shopName: 'Green Cross Medicals',
      legalName: 'Green Cross Health',
      address: '456 Garden Rd, Mumbai',
      city: 'Mumbai',
      phone: '022-8765432',
      coordinates: [72.8777, 19.076], // Mumbai
      verificationStatus: 'verified',
    });

    // Create Medicines for Pharmacy 1
    await Medicine.create([
      {
        pharmacy: pharmacy1._id,
        name: 'Paracetamol 500mg',
        brandName: 'Crocin',
        genericName: 'Paracetamol',
        category: 'Pain Relief',
        mrp: 30,
        sellingPrice: 25,
        expiryDate: new Date('2026-12-31'),
        availableQuantity: 100,
      },
      {
        pharmacy: pharmacy1._id,
        name: 'Amoxicillin 250mg',
        brandName: 'Mox',
        genericName: 'Amoxicillin',
        category: 'Antibiotics',
        mrp: 120,
        sellingPrice: 105,
        expiryDate: new Date('2025-06-30'),
        availableQuantity: 50,
        prescriptionRequired: true,
      },
      {
        pharmacy: pharmacy1._id,
        name: 'Cetirizine 10mg',
        brandName: 'Okacet',
        genericName: 'Cetirizine',
        category: 'Allergy',
        mrp: 40,
        sellingPrice: 35,
        expiryDate: new Date('2026-03-15'),
        availableQuantity: 80,
      }
    ]);

    // Create Medicines for Pharmacy 2
    await Medicine.create([
      {
        pharmacy: pharmacy2._id,
        name: 'Paracetamol 500mg',
        brandName: 'Dolo 650',
        genericName: 'Paracetamol',
        category: 'Pain Relief',
        mrp: 35,
        sellingPrice: 28,
        expiryDate: new Date('2026-10-20'),
        availableQuantity: 200,
      },
      {
        pharmacy: pharmacy2._id,
        name: 'Ibuprofen 400mg',
        brandName: 'Brufen',
        genericName: 'Ibuprofen',
        category: 'Pain Relief',
        mrp: 45,
        sellingPrice: 40,
        expiryDate: new Date('2025-12-01'),
        availableQuantity: 150,
      }
    ]);

    console.log('Data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
