import mongoose from 'mongoose';

const adjustmentSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  warehouse: { type: String, required: true },
  countedStock: { type: Number, required: true },
  note: { type: String }
}, { timestamps: true });

export default mongoose.model('Adjustment', adjustmentSchema);
