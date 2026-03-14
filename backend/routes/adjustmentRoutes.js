import express from 'express';
import { getAdjustments, createAdjustment } from '../controllers/adjustmentController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', protect, getAdjustments);
router.post('/', protect, createAdjustment);
export default router;
