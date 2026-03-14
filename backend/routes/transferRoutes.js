import express from 'express';
import { getTransfers, createTransfer } from '../controllers/transferController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', protect, getTransfers);
router.post('/', protect, createTransfer);
export default router;
