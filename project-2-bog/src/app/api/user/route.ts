import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Import bcryptjs for password hashing and comparison

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

export const User = mongoose.models.User || mongoose.model("User", userSchema);

// POST handler for login (authentication)
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { email, password } = await request.json();

    // Validate input data
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Compare the password with the hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error: "Failed to log in" }, { status: 500 });
  }
}
