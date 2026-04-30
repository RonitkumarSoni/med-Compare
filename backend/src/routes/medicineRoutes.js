import express from 'express';
import {
  addMedicine,
  getMedicines,
  getMedicine,
  updateMedicine,
  deleteMedicine,
  compareMedicines,
  getNearbyMedicines
} from '../controllers/medicineController.js';
import { protect, authorize } from '../middlewares/auth.js';
import { medicineValidation, validate } from '../validations/index.js';

const router = express.Router();

router.get('/compare', compareMedicines);
router.get('/nearby', getNearbyMedicines);

router.route('/')
  .get(getMedicines)
  .post(protect, authorize('pharmacy', 'admin'), medicineValidation, validate, addMedicine);

router.route('/:id')
  .get(getMedicine)
  .put(protect, authorize('pharmacy', 'admin'), updateMedicine)
  .delete(protect, authorize('pharmacy', 'admin'), deleteMedicine);

export default router;
