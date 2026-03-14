import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import connectDB from './config/db.js';
import { app } from './app.js';

const rootEnv = path.resolve(process.cwd(), '.env');
const backendEnv = path.resolve(process.cwd(), 'backend', '.env');
if (fs.existsSync(backendEnv)) dotenv.config({ path: backendEnv });
else if (fs.existsSync(rootEnv)) dotenv.config({ path: rootEnv });

const PORT = Number(process.env.PORT || 5000);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

start().catch((err) => {
  console.error('Server failed:', err);
  process.exit(1);
});