import express from 'express';
import { getMoveHistory } from '../controllers/moveHistoryController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', protect, getMoveHistory);
export default router;
