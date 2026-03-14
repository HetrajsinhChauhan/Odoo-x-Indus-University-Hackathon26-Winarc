import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct, getStats } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', protect, getProducts);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);
router.get('/stats', protect, getStats);
export default router;
