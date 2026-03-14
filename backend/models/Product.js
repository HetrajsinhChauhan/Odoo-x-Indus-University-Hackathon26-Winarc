import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String },
  unit: { type: String, default: 'pcs' },
  stock: { type: Number, default: 0 },
  lowStockThreshold: { type: Number, default: 5 }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
