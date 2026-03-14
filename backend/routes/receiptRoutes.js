import express from 'express';
import { getReceipts, createReceipt } from '../controllers/receiptController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', protect, getReceipts);
router.post('/', protect, createReceipt);
export default router;
