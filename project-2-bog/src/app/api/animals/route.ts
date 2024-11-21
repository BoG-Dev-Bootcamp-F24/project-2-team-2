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

export async function POST(request: NextRequest) {
  try {
    const newAnimal = await request.json();
    await connectToDatabase();
    const animal = new Animal(newAnimal);
    await animal.save();
    return NextResponse.json(animal, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create animal" },
      { status: 500 }
    );
  }
}
export async function PATCH(request: NextRequest) {
  try {
    const { animalName, breed, hours } = await request.json();
    await connectToDatabase();

    // Find the animal by name and breed
    const animal = await Animal.findOne({ name: animalName });

    if (!animal) {
      return NextResponse.json(
        { error: "Animal not found" },
        { status: 404 }
      );
    }

    // Convert hours to number if it's a string and add to existing hours
    const hoursNumber = typeof hours === 'string' ? parseInt(hours) : hours;
    animal.hoursTrained = (animal.hoursTrained || 0) + hoursNumber;

    // Save the updated animal
    await animal.save();

    return NextResponse.json(animal, { status: 200 });
  } catch (error) {
    console.error("Error updating animal hours:", error);
    return NextResponse.json(
      { error: "Failed to update animal hours" },
      { status: 500 }
    );
  }
}
