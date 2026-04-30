import mongoose from 'mongoose';

const PharmacySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    shopName: {
      type: String,
      required: [true, 'Please add a shop name'],
      trim: true,
    },
    legalName: {
      type: String,
      required: [true, 'Please add legal business name'],
    },
    description: String,
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    whatsappNumber: String,
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    city: String,
    state: String,
    country: {
      type: String,
      default: 'India',
    },
    pincode: String,
    coordinates: {
      type: [Number], // [lng, lat]
      index: '2dsphere',
    },
    deliveryAvailable: {
      type: Boolean,
      default: false,
    },
    timings: {
      open: String,
      close: String,
    },
    profileImage: String,
    shopImages: [String],
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    licenseDocument: String,
    gstDocument: String,
    trustScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Pharmacy', PharmacySchema);
