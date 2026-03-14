import mongoose from 'mongoose';

const warehouseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  manager: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Warehouse', warehouseSchema);
