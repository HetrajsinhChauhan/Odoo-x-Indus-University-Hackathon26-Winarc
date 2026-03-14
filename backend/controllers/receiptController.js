import Receipt from '../models/Receipt.js';
import Product from '../models/Product.js';
import MoveHistory from '../models/MoveHistory.js';

export const getReceipts = async (req, res) => {
  const receipts = await Receipt.find({}).sort({ createdAt: -1 }).populate('product');
  res.json(receipts);
};

export const createReceipt = async (req, res) => {
  const { receiptId, supplier, warehouse, product, quantity, status } = req.body;
  if (!receiptId || !supplier || !warehouse || !product || !quantity) return res.status(400).json({ message: 'Missing fields' });
  const existing = await Receipt.findOne({ receiptId });
  if (existing) return res.status(400).json({ message: 'Receipt ID already exists' });
  const receipt = await Receipt.create({ receiptId, supplier, warehouse, product, quantity, status: status || 'Pending' });

  if (receipt.status === 'Done') {
    const prod = await Product.findById(product);
    if (prod) {
      prod.stock += Number(quantity);
      await prod.save();
      await MoveHistory.create({ product: prod._id, operation: 'Receipt - Done', warehouse, quantityChange: Number(quantity), note: `Receipt ${receiptId}` });
    }
  }

  res.status(201).json(receipt);
};
