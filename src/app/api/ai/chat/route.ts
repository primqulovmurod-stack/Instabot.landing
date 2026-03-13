import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, aiPrompt, activityType } = await req.json();

    const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

    if (!n8nWebhookUrl) {
      console.error("N8N_WEBHOOK_URL is not defined");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Call n8n Webhook
    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        aiPrompt,
        activityType,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n responded with ${response.status}`);
    }

    const data = await response.json();

    // Assuming n8n returns { response: "AI text here" }
    return NextResponse.json({
      text: data.response || data.text || "AI agent hozirda band, iltimos keyinroq urinib ko'ring.",
    });

  } catch (error: any) {
    console.error("AI Proxy Error:", error);
    return NextResponse.json(
      { error: "AI agent bilan bog'lanishda xatolik yuz berdi." },
      { status: 500 }
    );
  }
}
