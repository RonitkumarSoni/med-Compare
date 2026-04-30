import express from 'express';
import {
  getDashboardStats,
  getAllPharmacies,
  updatePharmacyStatus,
  getAllUsers
} from '../controllers/adminController.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getDashboardStats);
router.get('/pharmacies', getAllPharmacies);
router.put('/pharmacies/:id/verify', updatePharmacyStatus);
router.get('/users', getAllUsers);

export default router;
