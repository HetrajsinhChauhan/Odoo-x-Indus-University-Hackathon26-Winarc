import express from 'express';
import { getWarehouses, createWarehouse } from '../controllers/warehouseController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', protect, getWarehouses);
router.post('/', protect, createWarehouse);
export default router;
