import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Foydalanish shartlari</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>Instabot.ai xizmatidan foydalanish orqali siz quyidagilarga rozilik bildirasiz:</p>
          <ul>
            <li>Tizimni qonuniy maqsadlarda ishlatish.</li>
            <li>Spam yoki ruxsat etilmagan reklama tarqatmaslik.</li>
            <li>AI javoblarini nazorat qilib borish.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
