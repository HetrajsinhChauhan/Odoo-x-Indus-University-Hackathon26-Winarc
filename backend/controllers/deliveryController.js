import DeliveryOrder from '../models/DeliveryOrder.js';
import Product from '../models/Product.js';
import MoveHistory from '../models/MoveHistory.js';

export const getDeliveryOrders = async (req, res) => {
  const orders = await DeliveryOrder.find({}).sort({ createdAt: -1 }).populate('product');
  res.json(orders);
};

export const createDeliveryOrder = async (req, res) => {
  const { orderId, customer, warehouse, product, quantity, status } = req.body;
  if (!orderId || !customer || !warehouse || !product || !quantity) return res.status(400).json({ message: 'Missing fields' });
  const existing = await DeliveryOrder.findOne({ orderId });
  if (existing) return res.status(400).json({ message: 'Order ID exists' });
  const order = await DeliveryOrder.create({ orderId, customer, warehouse, product, quantity, status: status || 'Pending' });
  if (order.status === 'Done') {
    const prod = await Product.findById(product);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - Number(quantity));
      await prod.save();
      await MoveHistory.create({ product: prod._id, operation: 'Delivery - Done', warehouse, quantityChange: -Number(quantity), note: `Delivery ${orderId}` });
    }
  }
  res.status(201).json(order);
};
