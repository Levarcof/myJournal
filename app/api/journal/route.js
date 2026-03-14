import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Journal from "@/app/models/Journal";
export async function POST(req) {

  try {

    await connectDB();

    const body = await req.json();

    const { userId, ambience, text } = body;

    // Validation
    if (!userId || !ambience || !text) {
      return NextResponse.json(
        { message: "userId, ambience and text are required" },
        { status: 400 }
      );
    }

    // Create journal entry
    const entry = await Journal.create({
      userId,
      ambience,
      text
    });

    return NextResponse.json(
      {
        success: true,
        message: "Journal entry created successfully",
        data: entry
      },
      { status: 201 }
    );

  } catch (error) {

    console.error("Journal API Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );

  }

}