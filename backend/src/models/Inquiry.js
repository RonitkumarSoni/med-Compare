import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pharmacy',
      required: true,
    },
    medicinesRequested: [
      {
        medicineName: String,
        quantity: Number,
      },
    ],
    prescriptionImage: String,
    message: String,
    status: {
      type: String,
      enum: ['pending', 'responded', 'rejected', 'completed'],
      default: 'pending',
    },
    pharmacyResponse: String,
    quotedPrice: Number,
    pickupAvailable: {
      type: Boolean,
      default: false,
    },
    deliveryAvailable: {
      type: Boolean,
      default: false,
    },
    estimatedReadyTime: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Inquiry', InquirySchema);
