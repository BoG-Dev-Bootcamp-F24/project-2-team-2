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

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});


const animalSchema = new mongoose.Schema({
  name: String,
  owner: String,
  breed: String,
  hoursTrained: Number,
  profilePictureUrl: String,
});

const Animal = mongoose.models.Animal || mongoose.model("Animal", animalSchema);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { fullName, email, password, confirmPassword, isAdmin } = await request.json();

    console.log('Received data:', { fullName, email, password, confirmPassword, isAdmin }); // Log the request data

    // Validate input data
    if (!fullName || !email || !password || !confirmPassword) {
      console.log('Validation failed: Missing required fields');
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if the passwords match
    if (password !== confirmPassword) {
      console.log('Validation failed: Passwords do not match');
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Validation failed: Email is already in use');
      return NextResponse.json({ error: "Email is already in use" }, { status: 400 });
    }

    // Create a new user with the plain text password
    const newUser = new User({
      fullName,
      email,
      password, // Storing password as plain text (for simplicity)
      isAdmin,
    });

    // Save the new user to the database
    await newUser.save();

    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return NextResponse.json(userWithoutPassword, { status: 201 }); // Created
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
