import Transfer from '../models/Transfer.js';
import Product from '../models/Product.js';
import MoveHistory from '../models/MoveHistory.js';

export const getTransfers = async (req, res) => {
  const transfers = await Transfer.find({}).sort({ createdAt: -1 }).populate('product');
  res.json(transfers);
};

export const createTransfer = async (req, res) => {
  const { fromWarehouse, toWarehouse, product, quantity } = req.body;
  if (!fromWarehouse || !toWarehouse || !product || !quantity) return res.status(400).json({ message: 'Missing fields' });
  const transfer = await Transfer.create({ fromWarehouse, toWarehouse, product, quantity });
  const prod = await Product.findById(product);
  if (prod) {
    prod.stock = Math.max(0, prod.stock - Number(quantity));
    await prod.save();
    await MoveHistory.create({ product: prod._id, operation: 'Transfer', warehouse: `${fromWarehouse} -> ${toWarehouse}`, quantityChange: -Number(quantity), note: 'Internal transfer' });
    await MoveHistory.create({ product: prod._id, operation: 'Transfer arrival', warehouse: toWarehouse, quantityChange: Number(quantity), note: 'Internal transfer arrival' });
  }
  res.status(201).json(transfer);
};
