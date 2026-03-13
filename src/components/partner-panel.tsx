"use client";

import { Handshake, TrendingUp, Users, DollarSign, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PartnerPanel() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight">Hamkorlik Dasturi</h1>
        <p className="text-muted-foreground uppercase text-[10px] font-black tracking-widest leading-none">
          Birgalikda o&apos;samiz va daromad olamiz
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-[2rem] border-purple-500/20 bg-purple-500/[0.02]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold opacity-60 uppercase tracking-widest">Komissiya stavkasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-purple-600">30%</div>
            <p className="text-xs text-muted-foreground mt-2 font-medium">Har bir muvaffaqiyatli to&apos;lovdan</p>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold opacity-60 uppercase tracking-widest">Hozirgi daromad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">$0.00</div>
            <p className="text-xs text-muted-foreground mt-2 font-medium">To&apos;lovga tayyor: $0.00</p>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold opacity-60 uppercase tracking-widest">Taklif qilinganlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">0</div>
            <p className="text-xs text-muted-foreground mt-2 font-medium">Sotuvlar: 0</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="rounded-[2.5rem] border-white/5 p-4 lg:p-8 bg-white/[0.01]">
          <CardHeader>
            <CardTitle className="text-2xl font-black">Nega biz bilan hamkorlik qilish kerak?</CardTitle>
            <CardDescription>Instabot.AI hamkoriga aylanishning 3 ta asosiy sababi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-2xl bg-green-500/10 flex items-center justify-center shrink-0">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm mb-1">Yuqori daromad</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Har bir taklif qilingan mijozning birinchi va keyingi barcha to&apos;lovlaridan 30% keshbek oling.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm mb-1">Passiv daromad</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Mijoz obunani yangilagan sari, sizning daromadingiz avtomatik ravishda oshib boradi.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <Handshake className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm mb-1">To&apos;liq yordam</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Biz sizga sotuv uchun barcha marketing materiallari va texnik yordamni beramiz.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2.5rem] border-dashed border-white/20 bg-transparent flex flex-col items-center justify-center p-12 text-center group">
          <div className="h-20 w-20 rounded-[2rem] bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
            <Users className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-black mb-2 italic">Referal tizimi yaqin orada...</h3>
          <p className="text-sm text-muted-foreground mb-8 max-w-[250px]">
            Hozirda referal tizimi sozlanmoqda. Tez orada shaxsiy havolangiz orqali odam taklif qilishingiz mumkin bo&apos;ladi.
          </p>
          <Button variant="outline" className="rounded-full px-8 h-12 border-white/10 hover:bg-white/5 font-bold">
            XABAR BERING
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
