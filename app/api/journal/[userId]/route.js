import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Journal from "@/app/models/Journal";

export async function GET(req, { params }) {
    try {
        await connectDB();

        const { userId } = await params;

        if (!userId) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        const entries = await Journal.find({ userId }).sort({ createdAt: -1 });

        return NextResponse.json(entries, { status: 200 });

    } catch (error) {
        console.error("Fetch Journal Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
