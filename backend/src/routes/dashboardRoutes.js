import express from 'express';
import { getDashboardStats, getWatchlist } from '../controllers/dashboardController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/stats', protect, getDashboardStats);
router.get('/watchlist', protect, getWatchlist);

export default router;
