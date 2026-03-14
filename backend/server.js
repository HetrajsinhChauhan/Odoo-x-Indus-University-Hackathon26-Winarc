import dotenv from "dotenv";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from "./config/db.js";
import { app } from "./app.js";
import http from "http";

// Load environment: prefer backend/.env, then fall back to project root .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendEnvPath = path.resolve(__dirname, '.env');
const rootEnvPath = path.resolve(process.cwd(), '.env');
let loadedFrom = null;

if (fs.existsSync(backendEnvPath)) {
  const res = dotenv.config({ path: backendEnvPath });
  if (res.parsed) loadedFrom = backendEnvPath;
}

if (!loadedFrom && fs.existsSync(rootEnvPath)) {
  const res = dotenv.config({ path: rootEnvPath });
  if (res.parsed) loadedFrom = rootEnvPath;
}

if (loadedFrom) {
  console.log(`[env] Loaded environment variables from: ${loadedFrom}`);
} else {
  console.warn('[env] No .env file found (root or backend). Proceeding with process.env only.');
}

// Startup-time sanity checks for Google OAuth
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn('[Google OAuth] GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set — Google login will fail.');
}

const START_PORT = parseInt(process.env.PORT, 10) || 8000;

const listenOnPort = (server, port) => new Promise((resolve, reject) => {
  const onError = (err) => {
    server.removeListener('listening', onListening);
    reject(err);
  };
  const onListening = () => {
    server.removeListener('error', onError);
    resolve(port);
  };
  server.once('error', onError);
  server.once('listening', onListening);
  server.listen(port);
});

const start = async () => {
  await connectDB();

  // ✅ Normal HTTP server only (No Socket)
  const server = http.createServer(app);

  let boundPort = null;
  const maxAttempts = 11;

  for (let i = 0; i < maxAttempts; i++) {
    const tryPort = START_PORT + i;
    try {
      boundPort = await listenOnPort(server, tryPort);
      break;
    } catch (err) {
      if (err && err.code === 'EADDRINUSE') {
        console.warn(`Port ${tryPort} in use, trying ${tryPort + 1}...`);
      } else {
        console.error('Server failed to start:', err);
        process.exit(1);
      }
    }
  }

  if (!boundPort) {
    console.error(`Unable to bind server on ports ${START_PORT}..${START_PORT + maxAttempts - 1}`);
    process.exit(1);
  }

  console.log(`Server running on port ${boundPort}`);
};

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});