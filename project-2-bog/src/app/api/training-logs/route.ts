import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let isConnected = false;

const connectToDatabase = async () => {
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

export async function POST(request: NextRequest) {
  try {
    const newLog = await request.json();
    await connectToDatabase();
    const trainingLog = new TrainingLog(newLog);
    await trainingLog.save();
    return NextResponse.json(trainingLog, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create training log" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedLog = await request.json();
    await connectToDatabase();
    const trainingLog = await TrainingLog.findByIdAndUpdate(
      updatedLog._id,
      updatedLog,
      { new: true }
    );
    return NextResponse.json(trainingLog, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update training log" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await connectToDatabase();
    await TrainingLog.findByIdAndDelete(id);
    return NextResponse.json({ message: "Training log deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete training log" },
      { status: 500 }
    );
  }
}