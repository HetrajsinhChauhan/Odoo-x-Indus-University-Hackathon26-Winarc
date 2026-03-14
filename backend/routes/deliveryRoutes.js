import express from 'express';
import { getDeliveryOrders, createDeliveryOrder } from '../controllers/deliveryController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', protect, getDeliveryOrders);
router.post('/', protect, createDeliveryOrder);
export default router;
