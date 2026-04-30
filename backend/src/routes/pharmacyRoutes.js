import express from 'express';
import {
  registerPharmacy,
  getPharmacies,
  getPharmacy,
  updatePharmacy,
  getPharmacyAnalytics,
  getMyPharmacyAnalytics
} from '../controllers/pharmacyController.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.get('/my-analytics', protect, authorize('pharmacy'), getMyPharmacyAnalytics);

router.route('/')
  .get(getPharmacies)
  .post(protect, authorize('pharmacy', 'admin'), registerPharmacy);

router.route('/:id')
  .get(getPharmacy)
  .put(protect, authorize('pharmacy', 'admin'), updatePharmacy);

router.get('/:id/analytics', protect, authorize('pharmacy', 'admin'), getPharmacyAnalytics);

export default router;
