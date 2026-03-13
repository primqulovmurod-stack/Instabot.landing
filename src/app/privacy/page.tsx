import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Maxfiylik siyosati</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>Instabot.ai foydalanuvchilarning maxfiyligini hurmat qiladi.</p>
          <h3>1. Ma'lumotlarni yig'ish</h3>
          <p>Biz faqat Instagram integratsiyasi uchun zarur bo'lgan Facebook Page ID va Access Token ma'lumotlarini saqlaymiz.</p>
          <h3>2. Ma'lumotlardan foydalanish</h3>
          <p>Sizning ma'lumotlaringiz faqat AI agentingiz xabarlarga javob berishi uchun ishlatiladi.</p>
          <h3>3. Ma'lumotlarni o'chirish</h3>
          <p>Siz xohlagan vaqtda sozlamalar bo'limidan barcha ma'lumotlaringizni o'chirib tashlashingiz mumkin.</p>
        </CardContent>
      </Card>
    </div>
  );
}
