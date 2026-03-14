import mongoose from 'mongoose';

const moveHistorySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  operation: { type: String, required: true },
  warehouse: { type: String, required: true },
  quantityChange: { type: Number, required: true },
  note: { type: String }
}, { timestamps: true });

export default mongoose.model('MoveHistory', moveHistorySchema);
