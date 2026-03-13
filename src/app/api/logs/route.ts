import { NextResponse } from 'next/server';

// n8n javob yuborgandan keyin shu API'ni chaqiradi
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pageId, senderId, senderName, message, aiResponse } = body;

    if (!pageId || !message || !aiResponse) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log(`[LOG] Recieved message from ${senderName} on page ${pageId}`);
    
    // Kelajakda bu yerda DB'ga save qilish bo'ladi:
    // await db.chat_logs.create({ data: { ... } });

    return NextResponse.json({ success: true, message: 'Log saved' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
