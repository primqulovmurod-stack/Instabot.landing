export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  instagramConnected: boolean;
  instagramId?: string;
  instagramUsername?: string;
  pageId?: string;
  accessToken?: string;
  activityType: string;
  aiPrompt: string;
  aiEnabled: boolean;
  isPaid: boolean;
  trialStartDate: string;
  trialDaysLeft: number;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  aiResponse: string;
  timestamp: string;
  status: 'delivered' | 'read' | 'replied';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const ACTIVITY_TYPES = [
  { value: 'Stomatologiya', label: 'Stomatologiya 🦷', icon: '🦷' },
] as const;

export const DEFAULT_PROMPTS: Record<string, string> = {
  Stomatologiya: `Siz malakali stomatologiya klinikasi yordamchisisiz. Sizning vazifangiz mijozlarga quyidagi ma'lumotlarni taqdim etish:

🏥 Klinika: Premium Dental Clinic
📍 Manzil: Toshkent shahri, Amir Temur ko'chasi 100-uy
📞 Tel: +998 90 123 45 67
⏰ Ish vaqti: Dushanba-Shanba, 9:00 - 18:00

💰 Xizmatlar va narxlar:
- Konsultatsiya: 50,000 so'm
- Tish plomba: 150,000 - 300,000 so'm
- Tish olib tashlash: 200,000 - 500,000 so'm
- Tish oqartirish: 500,000 so'm
- Implant: 3,000,000 - 5,000,000 so'm
- Braces (Breketlar): 5,000,000 - 10,000,000 so'm

Doimo xushmuomala va professional tarzda javob bering. Mijozni qo'rqitmang, aksincha ishonch hosil qiling. Savol tushunarsiz bo'lsa, aniqlashtiruvchi savol bering.`,
};
