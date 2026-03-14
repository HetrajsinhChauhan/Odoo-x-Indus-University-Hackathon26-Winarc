import mongoose from 'mongoose';

const deliveryOrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: { type: String, required: true },
  warehouse: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Done'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('DeliveryOrder', deliveryOrderSchema);
