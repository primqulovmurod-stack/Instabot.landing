import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, activityType } = body;

    // Generate a unique externalId like USR-XXXX
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const externalId = `USR-${randomSuffix}`;

    const user = await prisma.user.create({
      data: {
        externalId,
        name,
        email: email || undefined,
        phone: phone || undefined,
        activityType: activityType || "other",
        registrationMethod: phone ? "phone" : "email",
        trialExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days trial
      },
    });

    return NextResponse.json({ success: true, userId: user.externalId });
  } catch (error: any) {
    console.error("Registration error:", error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Ushbu email yoki telefon allaqachon ro'yxatdan o'tgan." }, { status: 400 });
    }
    return NextResponse.json({ error: "Ro'yxatdan o'tishda xatolik yuz berdi." }, { status: 500 });
  }
}
