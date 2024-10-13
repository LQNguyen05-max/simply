"use server";

import { NextRequest, NextResponse } from "next/server";

async function run(model: any, input: any) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/b30b8a18e7f0cb22913f615425ee49d3/ai/run/${model}`,
    {
      headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
      method: "POST",
      body: JSON.stringify(input),
    }
  );
  const result = await response.json();
  return result;
}

export async function POST(request: NextRequest) {
  try {
    // get data
    const reqBody = await request.json();
    const { desiredGradeLevel, prompt, base64Image } = reqBody;

    if (!desiredGradeLevel)
      return NextResponse.json({
        message: "must have a grade level selected",
        success: false,
      });
    if (!prompt)
      return NextResponse.json({
        message: "must have a prompt",
        success: false,
      });
    // Run the Llama model using the run() function
    const response = await run("@cf/meta/llama-3-8b-instruct", {
      messages: [
        {
          role: "system",
          // lol i hate this prompt.... we are going to run out of our free tier
          content: `Your task is to explain if it is a singular ward or rephrase if it is a sentance/definition: ${prompt} to a ${desiredGradeLevel} + grader, keep it short and precise! Make sure not to ask questions in the end. Don't add new line characters or any characters besides alphabet and punctuation or numbers but be more detailed and go more in depth on grades above 10th grade"}`,
        },
      ],
      // messages: [
      //   {
      //     role: "system",
      //     // lol i hate this prompt.... we are going to run out of our free tier
      //     content: `Your review the image that is in base64 form and analyze it: and explain it to a ${desiredGradeLevel} + grader, keep it short and precise! Make sure not to ask questions in the end. Don't add new line characters or any characters besides alphabet and punctuation or numbers but you can use exclamation marks to sound more enthusiastic towards the earlier grades"}`,
      //   },
      //   {
      //     role: "user",
      //     content: base64Image, // This is where the image is passed as a base64 string
      //   },
      // ],
    });

    console.log(response.result.response);

    // Return a success response
    return NextResponse.json({
      message: "Successfully simplified task",
      success: true,
      response: response?.result?.response,
    });
  } catch (error: any) {
    console.error("Error in POST handler:", error);

    // Return a failure response
    return NextResponse.json(
      {
        message: "Failed to simplify task",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
