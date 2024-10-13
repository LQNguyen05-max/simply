import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Card from "@/models/Card";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const cards = await Card.aggregate([
      {
        $match: { user: email }, // Match documents with the specified email
      },
    ]);

    console.log(cards);
    if (!cards) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "cards found",
      success: true,
      response: cards,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
