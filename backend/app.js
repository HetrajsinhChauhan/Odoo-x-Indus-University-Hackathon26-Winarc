import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import receiptRoutes from './routes/receiptRoutes.js';
import deliveryRoutes from './routes/deliveryRoutes.js';
import transferRoutes from './routes/transferRoutes.js';
import adjustmentRoutes from './routes/adjustmentRoutes.js';
import warehouseRoutes from './routes/warehouseRoutes.js';
import moveHistoryRoutes from './routes/moveHistoryRoutes.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'IMS API running' }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/adjustments', adjustmentRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/moves', moveHistoryRoutes);

export { app };