import { NextResponse } from 'next/server';

// Bu yerda kelajakda DB (Supabase/Prisma) bilan ulanish bo'ladi
// Hozircha n8n uchun mock API tayyorlaymiz

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');

  if (!pageId) {
    return NextResponse.json({ error: 'pageId is required' }, { status: 400 });
  }

  // Simulyatsiya: Haqiqiy DB dan ma'lumot olish o'rniga
  const mockUser = {
    instagram_page_id: pageId,
    ai_enabled: true,
    is_paid: false, // Beta testi uchun
    trial_start_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 kun oldin boshlangan
    ai_prompt: "Siz malakali stomatologiya klinikasi yordamchisisiz...",
    activity_type: 'stomatologiya'
  };

  // Trial hisoblash (7 kun)
  const startDate = new Date(mockUser.trial_start_date);
  const now = new Date();
  const diffDays = Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const trialDaysLeft = 7 - diffDays;
  const isExpired = !mockUser.is_paid && trialDaysLeft <= 0;

  return NextResponse.json({
    active: mockUser.ai_enabled && !isExpired,
    trialDaysLeft: Math.max(0, trialDaysLeft),
    isPaid: mockUser.is_paid,
    prompt: mockUser.ai_prompt,
    isExpired: isExpired
  });
}
