import mongoose from 'mongoose';
import slugify from 'slugify';

const MedicineSchema = new mongoose.Schema(
  {
    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pharmacy',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a medicine name'],
      trim: true,
    },
    slug: String,
    brandName: String,
    genericName: String,
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    dosage: String,
    dosageForm: String, // Tablet, Syrup, Injection etc
    packSize: String, // 10 tablets, 100ml etc
    composition: String,
    description: String,
    mrp: {
      type: Number,
      required: [true, 'Please add MRP'],
    },
    sellingPrice: {
      type: Number,
      required: [true, 'Please add selling price'],
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    batchNumber: String,
    manufacturingDate: Date,
    expiryDate: {
      type: Date,
      required: [true, 'Please add expiry date'],
    },
    availableQuantity: {
      type: Number,
      default: 0,
    },
    prescriptionRequired: {
      type: Boolean,
      default: false,
    },
    medicineImages: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    isApproved: {
      type: Boolean,
      default: true, // Should be false in production until admin approves
    },
  },
  {
    timestamps: true,
  }
);

// Create medicine slug from the name
MedicineSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  
  // Calculate discount if not provided
  if (this.mrp && this.sellingPrice) {
    this.discountPercentage = Math.round(((this.mrp - this.sellingPrice) / this.mrp) * 100);
  }
  
  next();
});

export default mongoose.model('Medicine', MedicineSchema);
