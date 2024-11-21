// app/api/admin/animals/route.ts
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

const animalSchema = new mongoose.Schema({
  name: String,
  breed: String,
  hoursTrained: Number,
  profilePictureUrl: String,
});

const Animal = mongoose.models.Animal || mongoose.model("Animal", animalSchema);

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const animals = await Animal.find({});
    return NextResponse.json(animals, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch animals" },
      { status: 500 }
    );
  }
}