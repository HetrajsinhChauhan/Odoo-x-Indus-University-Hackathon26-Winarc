import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import dns from "node:dns/promises";
import { DB_NAME } from "../../constants.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const connectDB = async () => {
  try {

    // Fix DNS only for local development
    if (process.env.NODE_ENV === "development") {
      dns.setServers(["8.8.8.8", "8.8.4.4"]);
    }

    // Safety check
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI not found in environment variables");
    }

    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URI,
      {
        dbName: DB_NAME,
        serverSelectionTimeoutMS: 5000,
        family: 4
      }
    );

    console.log(`🚀 MongoDB Connected: ${connectionInstance.connection.host}`);

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB; 