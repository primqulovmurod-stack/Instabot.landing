import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DeletionPage() {
  return (
    <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Ma&apos;lumotlarni o&apos;chirish bo&apos;yicha ko&apos;rsatma</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>Instabot.ai tizimidan ma&apos;lumotlaringizni o&apos;chirish uchun quyidagi qadamlarni bajaring:</p>
          <ol>
            <li>Hamkor sahifasiga kiring.</li>
            <li>&quot;Integratsiya&quot; bo&apos;limidan &quot;Ulanishni uzish&quot; tugmasini bosing.</li>
            <li>Barcha saqlangan tokenlar va ID lar zudlik bilan bazadan o&apos;chiriladi.</li>
          </ol>
          <p>Agar savollaringiz bo&apos;lsa, @primkulovmurod Telegrami orqali bog&apos;laning.</p>
        </CardContent>
      </Card>
    </div>
  );
}
