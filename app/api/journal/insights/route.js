import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Journal from "@/app/models/Journal";

export async function POST(req) {
  try {

    await connectDB();

    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      );
    }

    // user ke sare entries lao
    const entries = await Journal.find({ userId });

    const totalEntries = entries.length;

    if (totalEntries === 0) {
      return NextResponse.json({
        totalEntries: 0,
        topEmotion: null,
        mostUsedAmbience: null,
        recentKeywords: [],
      });
    }

    // emotion count
    const emotionCount = {};

    // ambience count
    const ambienceCount = {};

    // keywords collect
    const keywords = [];

    entries.forEach((entry) => {

      if (entry.emotion) {
        emotionCount[entry.emotion] =
          (emotionCount[entry.emotion] || 0) + 1;
      }

      if (entry.ambience) {
        ambienceCount[entry.ambience] =
          (ambienceCount[entry.ambience] || 0) + 1;
      }

      if (entry.keywords && entry.keywords.length > 0) {
        keywords.push(...entry.keywords);
      }

    });

    // top emotion
    const topEmotion = Object.keys(emotionCount).reduce(
      (a, b) =>
        emotionCount[a] > emotionCount[b] ? a : b,
      Object.keys(emotionCount)[0]
    );

    // most used ambience
    const mostUsedAmbience = Object.keys(ambienceCount).reduce(
      (a, b) =>
        ambienceCount[a] > ambienceCount[b] ? a : b,
      Object.keys(ambienceCount)[0]
    );

    // recent keywords
    const recentKeywords = [...new Set(keywords)].slice(0, 5);

    return NextResponse.json({
      totalEntries,
      topEmotion,
      mostUsedAmbience,
      recentKeywords,
    });

  } catch (error) {

    console.error("Insights API Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );

  }
}