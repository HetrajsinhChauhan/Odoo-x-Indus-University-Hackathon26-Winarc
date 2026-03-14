import Warehouse from '../models/Warehouse.js';

export const getWarehouses = async (req, res) => {
  const warehouses = await Warehouse.find({}).sort({ createdAt: -1 });
  res.json(warehouses);
};

export const createWarehouse = async (req, res) => {
  const { name, location, manager } = req.body;
  if (!name || !location || !manager) return res.status(400).json({ message: 'All fields required' });
  const warehouse = await Warehouse.create({ name, location, manager });
  res.status(201).json(warehouse);
};
