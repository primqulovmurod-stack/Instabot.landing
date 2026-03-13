import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');
  const externalId = searchParams.get('externalId') || "USR-7D2K9X";

  try {
    let user = await prisma.user.findFirst({
      where: pageId ? { instagramId: pageId } : { externalId: externalId }
    });

    if (!user) {
      // Auto-create user if not found (first time load)
      user = await prisma.user.create({
        data: {
          externalId: externalId,
          aiPrompt: "",
          aiEnabled: false,
          activityType: "other",
          trialExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      });
    }

    // Trial calculation
    const now = new Date();
    const expiresAt = new Date(user.trialExpiresAt);
    const trialDaysLeft = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const isExpired = !user.isPaid && trialDaysLeft <= 0;

    return NextResponse.json({
      success: true,
      active: user.aiEnabled && !isExpired && user.instagramConnected,
      instagramConnected: user.instagramConnected,
      aiEnabled: user.aiEnabled,
      trialDaysLeft: Math.max(0, trialDaysLeft),
      isPaid: user.isPaid,
      prompt: user.aiPrompt,
      activityType: user.activityType,
      isExpired: isExpired,
      instagramUsername: user.username
    });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { externalId, aiPrompt, aiEnabled, activityType, instagramConnected } = body;

    const user = await prisma.user.upsert({
      where: { externalId: externalId || "USR-7D2K9X" },
      update: {
        aiPrompt,
        aiEnabled,
        activityType,
        instagramConnected
      },
      create: {
        externalId: externalId || "USR-7D2K9X",
        aiPrompt: aiPrompt || "",
        aiEnabled: aiEnabled || false,
        activityType: activityType || "other",
        instagramConnected: instagramConnected || false,
        trialExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Default 7 days trial
      }
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
