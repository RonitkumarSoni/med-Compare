import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import { uploadImage, uploadImages } from '../controllers/uploadController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();
const upload = multer({ storage });

router.post('/image', protect, upload.single('image'), uploadImage);
router.post('/images', protect, upload.array('images', 5), uploadImages);
router.post('/prescription', protect, upload.single('prescription'), uploadImage);

export default router;
