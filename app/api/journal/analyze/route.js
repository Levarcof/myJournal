import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Journal from "@/app/models/Journal";

export async function POST(req) {

  try {

    await connectDB();

    const { text, documentId } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are an emotion analysis AI. Return only JSON."
          },
          {
            role: "user",
            content: `Analyze the emotion from this text and return JSON:

{
"emotion":"",
"keywords":[],
"summary":""
}

Text: ${text}`
          }
        ]
      })
    });

    const data = await response.json();

    let result = data.choices[0].message.content;

    // agar ```json ``` format aaye to remove kar do
    result = result.replace(/```json|```/g, "");

    const parsed = JSON.parse(result);

    const { emotion, keywords, summary } = parsed;

    // document update
    const updatedJournal = await Journal.findByIdAndUpdate(
      documentId,
      {
        emotion,
        keywords,
        summary
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedJournal
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Error analyzing journal"
    });

  }

}