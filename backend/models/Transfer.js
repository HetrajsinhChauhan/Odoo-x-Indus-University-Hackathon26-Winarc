import mongoose from 'mongoose';

const transferSchema = new mongoose.Schema({
  fromWarehouse: { type: String, required: true },
  toWarehouse: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Transfer', transferSchema);
