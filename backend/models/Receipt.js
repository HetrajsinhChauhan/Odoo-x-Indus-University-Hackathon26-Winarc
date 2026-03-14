import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema({
  receiptId: { type: String, required: true, unique: true },
  supplier: { type: String, required: true },
  warehouse: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Done'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Receipt', receiptSchema);
