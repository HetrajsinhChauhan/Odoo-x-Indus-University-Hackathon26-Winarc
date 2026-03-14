import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.json(products);
};

export const createProduct = async (req, res) => {
  const { name, sku, category, unit, stock } = req.body;
  if (!name || !sku) return res.status(400).json({ message: 'Name and SKU are required' });
  const existing = await Product.findOne({ sku });
  if (existing) return res.status(400).json({ message: 'SKU must be unique' });
  const p = await Product.create({ name, sku, category, unit, stock: Number(stock) || 0 });
  res.status(201).json(p);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  Object.assign(product, req.body);
  await product.save();
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  await product.remove();
  res.json({ message: 'Product removed' });
};

export const getStats = async (req, res) => {
  const products = await Product.find({});
  const lowStock = products.filter((p) => p.stock <= p.lowStockThreshold).length;
  const outOfStock = products.filter((p) => p.stock <= 0).length;
  res.json({ totalProducts: products.length, lowStockItems: lowStock, outOfStock, pendingReceipts: 0, pendingDeliveries: 0, internalTransfers: 0 });
};
