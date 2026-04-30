import express from 'express';
import {
  createInquiry,
  getMyInquiries,
  getPharmacyInquiries,
  respondToInquiry
} from '../controllers/inquiryController.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', createInquiry);
router.get('/my', getMyInquiries);
router.get('/pharmacy', authorize('pharmacy', 'admin'), getPharmacyInquiries);
router.put('/:id/respond', authorize('pharmacy', 'admin'), respondToInquiry);

export default router;
