# Instagram AI Agent: Integration Guide

Ushbu qo'llanma Instagram, n8n va Next.js dashboardini qanday qilib bir butun tizim sifatida bog'lashni tushuntiradi.

## 1. Meta for Developers Sozlamalari
1. [Meta for Developers](https://developers.facebook.com/) portaliga kiring.
2. Yangi ilova (App) yarating: **Business** turini tanlang.
3. **Instagram Graph API** va **Messenger API** mahsulotlarini qo'shing.
4. **Webhooks** bo'limida:
   - Callback URL: `https://your-n8n-instance.com/webhook/instagram`
   - Verify Token: n8n da o'zingiz o'ylagan kod (masalan: `my_secret_token`).
   - Obunalar (Subscriptions): `messages` va `messaging_postbacks` ni belgilang.

## 2. n8n Workflow (Arxitektura)
Sizning n8n workflowingiz quyidagi bloklardan iborat bo'lishi kerak:

### A. Webhook Node (Trigger)
- **Method**: POST
- **Path**: `instagram`
- Bu blok Instagramdan yangi xabar kelganida ishga tushadi.

### B. HTTP Request (Check User Status)
- **URL**: `https://your-nextjs-app.vercel.app/api/user-status?pageId={{ $json.value.id }}`
- **Method**: GET
- Bu blok dashboarddan foydalanuvchi promptingizni va trial muddatini tekshiradi.

### C. AI Agent Node (Gemini/OpenAI)
- **Prompt**: Dashboarddan kelgan `prompt` + Mijozning `message`.
- **Model**: Gemini 1.5 Flash yoki GPT-4o-mini.

### D. Instagram Send Message Node
- **Field**: `recipient.id` = Mijozning ID.
- **Message**: AI tomonidan generatsiya qilingan javob.

### E. HTTP Request (Log Save) - Ixtiyoriy
- **URL**: `https://your-nextjs-app.vercel.app/api/logs`
- **Method**: POST
- **Body**: Chat tafsilotlari (tarixda ko'rinishi uchun).

## 3. Dashboardni Jonli DB ga ulash
Hozircha dashboard simulyatsiyada ishlayapti. Haqiqiy ma'lumotlar uchun:
1. `src/lib/user-context.tsx` dagi holatni (state) API orqali backendga (Supabase) bog'lash kerak.
2. `connectInstagram` funksiyasida Meta OAuth oynasini ochish kodi qo'shiladi.

---
> [!TIP]
> **Beta Test**: n8n workflowingizda "Test" rejimini yoqing va Instagram Messaging sozlamalarida o'z profilingizni "Tester" sifatida qo'shing. Shunda ilova hali LIVE bo'lmasdan turib sinab ko'rishingiz mumkin.
