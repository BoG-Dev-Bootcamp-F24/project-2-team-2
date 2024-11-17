import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI; 

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable inside .env.local not defined");
}

let isConnected = false; 

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);  
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
