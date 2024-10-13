import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import Card from "@/models/Card";
import { connectDB } from "@/lib/mongodb";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, prompt, definition } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newCard = new Card({
      prompt,
      definition,
      user: email,
    });
    const savedCard = await newCard.save();

    if (savedCard) {
      user.cards.push(savedCard);
      await user.save();
    }

    return NextResponse.json({
      message: "Card saved successfully",
      success: true,
      savedCard,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
