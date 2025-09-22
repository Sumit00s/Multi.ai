import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { model, msg, parentModel } = await req.json();

  const response = await axios.post(
    "https://kravixstudio.com/api/v1/chat",
    {
      message: msg,
      aiModel: model,
      outputType: "text", // 'text' or 'json'
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.MODELS_API_KEY,
      },
    }
  );

  console.log(response.data);
  return NextResponse.json({
    ...response.data,
    model: parentModel,
  });
}
