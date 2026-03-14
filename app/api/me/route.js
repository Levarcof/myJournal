import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    // cookie se token lo
    const token = req.cookies.get("token")?.value;

    // agar token nahi hai
    if (!token) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    // token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // userId return karo
    return NextResponse.json(
      {
        success: true,
        userId: decoded.userId,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("ME API Error:", error);

    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}