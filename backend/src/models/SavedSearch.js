import mongoose from 'mongoose';

const SavedSearchSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    medicineName: {
      type: String,
      required: true,
    },
    targetPrice: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('SavedSearch', SavedSearchSchema);
