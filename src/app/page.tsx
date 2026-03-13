"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  Check, 
  Instagram, 
  Zap, 
  ShieldCheck, 
  MessageCircle, 
  BarChart3,
  MousePointer2,
  Clock,
  Sparkles,
  Users,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LandingV2Page() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 overflow-x-hidden">
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-[10px] md:text-xs font-medium tracking-tight px-4">
        Yangi: Instagram AI Agent - 2024-yilning eng yaxshi yashirin quroli. 
        <Link href="https://instabot-partner.vercel.app" className="ml-2 underline font-bold">Hoziroq sinab ko&apos;ring →</Link>
      </div>

      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Zap className="h-5 w-5 text-primary-foreground fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight">INSTABOT<span className="text-primary">.AI</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Imkoniyatlar</a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Narxlar</a>
            <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="https://instabot-partner.vercel.app">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                <Button className="rounded-full font-bold px-6 h-10 transition-all hover:scale-105 active:scale-95">
                  Bepul sinab ko&apos;rish
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 md:px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-[0.03] dark:opacity-[0.05]">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border-primary/20">
            <Sparkles className="h-3 w-3 mr-2 text-primary fill-current" />
            7 kun mutlaqo bepul
          </Badge>
          
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-balance">
            Instagramda hamma narsani <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              avtomatlashtiring
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            AI agentlar mijozlar bilan muloqot qiladi, sotuvlarni oshiradi va 
            obunachilar bilan 24/7 aloqada bo&apos;ladi. Hech qanday murakkab sozlamalarsiz.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="https://instabot-partner.vercel.app" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-10 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 transition-transform hover:-translate-y-1">
                BEPUL BOSHLASH
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-10 rounded-2xl text-lg font-bold border-2">
              Xizmatlar bilan tanishish
            </Button>
          </div>

          <div className="pt-8 flex items-center justify-center gap-8 text-muted-foreground/60 overflow-hidden">
             <div className="flex items-center gap-2 shrink-0">
               <ShieldCheck className="h-5 w-5" />
               <span className="text-xs font-bold uppercase tracking-widest">Xavfsiz ulanish</span>
             </div>
             <div className="flex items-center gap-2 shrink-0">
               <Clock className="h-5 w-5" />
               <span className="text-xs font-bold uppercase tracking-widest">24/7 Avtopilotingiz</span>
             </div>
             <div className="flex items-center gap-2 shrink-0 hidden sm:flex">
               <Users className="h-5 w-5" />
               <span className="text-xs font-bold uppercase tracking-widest">100+ Bizneslar</span>
             </div>
          </div>
        </div>
      </section>

      {/* Industry Marquee (Simulated with Shadcn cards) */}
      <section className="bg-muted/30 py-12 overflow-hidden border-y">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 md:gap-16 animate-marquee whitespace-nowrap">
            {["STOMATOLOGIYA", "RESTORAN", "DO'KON", "AGENTLIK", "BLOGER", "KLINIKA", "AVTOSERVISLAR", "TADBIRLAR"].map((text, i) => (
              <span key={i} className="text-2xl md:text-4xl font-extrabold opacity-20 hover:opacity-100 transition-opacity cursor-default">
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Nega aynan biz?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Sizning biznesingiz uchun eng kuchli avtomatizatsiya vositalari</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCardV2 
            icon={<MessageCircle className="h-6 w-6 text-primary" />}
            title="DM Avtomatizatsiyasi"
            description="Har bir kelgan xabarga AI agentingiz professional tarzda darhol javob beradi."
          />
          <FeatureCardV2 
            icon={<Zap className="h-6 w-6 text-primary" />}
            title="Tezkor Ulanish"
            description="Meta azobisiz, to&apos;g&apos;ridan-to&apos;g&apos;ri Instagram orqali 1 daqiqada ulaning."
          />
          <FeatureCardV2 
            icon={<BarChart3 className="h-6 w-6 text-primary" />}
            title="Sotuv Analitikasi"
            description="AI qaysi mijozlar bilan gaplashgani haqida batafsil ma&apos;lumot oling."
          />
          <FeatureCardV2 
            icon={<ShieldCheck className="h-6 w-6 text-primary" />}
            title="Xavfsiz Tizim"
            description="Instagram qoidalariga to&apos;liq rioya qilgan holda xavfsiz ish faoliyati."
          />
          <FeatureCardV2 
            icon={<MousePointer2 className="h-6 w-6 text-primary" />}
            title="Oson Boshqaruv"
            description="Soddalashtirilgan dashboard orqali hamma narsani osongina sozlang."
          />
          <FeatureCardV2 
            icon={<Clock className="h-6 w-6 text-primary" />}
            title="24/7 Faollik"
            description="Siz uxlab yotganingizda ham botingiz mijozlaringizga xizmat ko&apos;rsatadi."
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 md:px-6 bg-muted/20 border-y">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">Tariflar</h2>
            <p className="text-muted-foreground">O&apos;zingizga mos keladigan rejani tanlang</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Standard Tier */}
            <Card className="relative border-primary shadow-2xl transition-all hover:scale-[1.02]">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">Eng mashhur</div>
              <CardHeader>
                <CardTitle className="text-xl uppercase tracking-tighter">Standart</CardTitle>
                <CardDescription>Kichik va o&apos;rta bizneslar uchun</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tighter">490</span>
                  <span className="text-muted-foreground font-medium uppercase text-xs tracking-widest">ming / oy</span>
                </div>
                <div className="space-y-4">
                  {["AI Agent (24/7)", "DM Avtomatizatsiyasi", "Tezkor Ulanish", "Haftalik Analitika"].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-medium">
                      <div className="rounded-full bg-primary/20 p-0.5">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="https://instabot-partner.vercel.app" className="w-full">
                  <Button className="w-full rounded-xl font-bold py-6">TANLASH</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Pro Tier - Coming Soon */}
            <Card className="opacity-70 border-dashed bg-background/50">
              <CardHeader>
                <CardTitle className="text-xl uppercase tracking-tighter text-muted-foreground">Pro</CardTitle>
                <CardDescription>O&apos;sayotgan jamoalar uchun</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline gap-1 text-muted-foreground/50">
                  <span className="text-5xl font-bold tracking-tighter">590</span>
                  <span className="font-medium uppercase text-xs tracking-widest">ming / oy</span>
                </div>
                <div className="h-[120px] flex items-center justify-center border-2 border-dashed rounded-2xl bg-muted/30">
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground italic">Tez kunda...</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled variant="secondary" className="w-full rounded-xl font-bold py-6 italic">KUTILMOQDA</Button>
              </CardFooter>
            </Card>

            {/* Premium Tier - Coming Soon */}
            <Card className="opacity-70 border-dashed bg-background/50">
              <CardHeader>
                <CardTitle className="text-xl uppercase tracking-tighter text-muted-foreground">Premium</CardTitle>
                <CardDescription>Yirik korxonalar uchun</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline gap-1 text-muted-foreground/50">
                  <span className="text-5xl font-bold tracking-tighter">990</span>
                  <span className="font-medium uppercase text-xs tracking-widest">ming / oy</span>
                </div>
                <div className="h-[120px] flex items-center justify-center border-2 border-dashed rounded-2xl bg-muted/30">
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground italic">Tez kunda...</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled variant="secondary" className="w-full rounded-xl font-bold py-6 italic">KUTILMOQDA</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Hero-like CTA */}
      <section className="py-24 px-4 text-center space-y-8 bg-background relative overflow-hidden">
        <h2 className="text-3xl md:text-6xl font-extrabold italic tracking-tight">Ko&apos;proq pul topishga tayyormisiz?</h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">Biznesingizni avtopilotga qo&apos;ying va sotuvlaringizni oshiring.</p>
        <Link href="https://instabot-partner.vercel.app" className="block">
          <Button size="lg" className="h-16 px-16 rounded-full text-xl font-bold shadow-2xl transition-all hover:scale-105">
            BEPUL BOSHLASH
          </Button>
        </Link>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t text-center bg-muted/10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-primary" />
          <span className="font-bold tracking-tighter">INSTABOT.AI</span>
        </div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest italic">© 2024 - Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  );
}

function FeatureCardV2({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-none bg-muted/40 hover:bg-muted/60 transition-colors duration-300">
      <CardHeader className="space-y-4">
        <div className="p-3 bg-background rounded-xl w-fit shadow-sm border">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold uppercase tracking-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed text-sm font-medium">{description}</p>
      </CardContent>
    </Card>
  );
}
