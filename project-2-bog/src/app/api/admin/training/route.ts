// app/api/admin/training/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

const trainingLogSchema = new mongoose.Schema({
  date: String,
  title: String,
  animal: String,
  hours: String,
  description: String,
}, {
  timestamps: true
});

const TrainingLog = mongoose.models.TrainingLog || mongoose.model("TrainingLog", trainingLogSchema);

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const trainingLogs = await TrainingLog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(trainingLogs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch training logs" },
      { status: 500 }
    );
  }
}