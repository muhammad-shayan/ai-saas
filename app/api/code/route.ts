import { IncreaseCount, checkApiLimitCount } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(config);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations. ",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;
    if (!userId) {
      return new NextResponse("Not authorized", { status: 401 });
    }
    if (!config.apiKey) {
      return new NextResponse("OpenAPI key not configured", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("Messages are required", { status: 500 });
    }
    const limit = await checkApiLimitCount();

    if (!limit) {
      return new NextResponse("Free API limits exceeded", { status: 403 });
    }
    const response = await openai.createChatCompletion({
      messages: [instructionMessage, ...messages],
      model: "gpt-3.5-turbo",
    });
    await IncreaseCount();
    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
