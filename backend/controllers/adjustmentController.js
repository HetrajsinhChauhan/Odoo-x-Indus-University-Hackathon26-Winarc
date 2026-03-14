import Adjustment from '../models/Adjustment.js';
import Product from '../models/Product.js';
import MoveHistory from '../models/MoveHistory.js';

export const getAdjustments = async (req, res) => {
  const adjustments = await Adjustment.find({}).sort({ createdAt: -1 }).populate('product');
  res.json(adjustments);
};

export const createAdjustment = async (req, res) => {
  const { product, warehouse, countedStock, note } = req.body;
  if (!product || !warehouse || countedStock === undefined) return res.status(400).json({ message: 'Missing fields' });
  const prod = await Product.findById(product);
  if (!prod) return res.status(404).json({ message: 'Product not found' });
  const previous = prod.stock;
  const diff = Number(countedStock) - Number(previous);
  prod.stock = Number(countedStock);
  await prod.save();
  const adjustment = await Adjustment.create({ product, warehouse, countedStock, note });
  await MoveHistory.create({ product: prod._id, operation: 'Adjustment', warehouse, quantityChange: diff, note: note || 'Inventory adjustment' });
  res.status(201).json(adjustment);
};
