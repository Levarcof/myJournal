import { connectDB } from "@/app/lib/db";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { userId, password } = await req.json();

    // 1. Validation check (agar input khali ho)
    if (!userId || !password) {
      return NextResponse.json(
        { message: "UserId and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ userId });

    // Response.json ko NextResponse.json se replace kiya consistent rakhne ke liye
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    // 2. JWT Secret check (Yeh akshar Internal Error ka karan banta hai)
    if (!process.env.JWT_SECRET) {
      console.error("CRITICAL ERROR: JWT_SECRET is not defined in .env file");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      {
        id: user._id,
        userId: user.userId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🍪 Store in cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: { id: user._id, userId: user.userId } // Optional: user data frontend ke liye
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    // Yeh terminal me real error dikhayega jisse debug karna aasan hoga
    console.error("Login API Error Detail:", error);
    
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message }, // error.message daala hai taaki debug ho sake
      { status: 500 }
    );
  }
}
