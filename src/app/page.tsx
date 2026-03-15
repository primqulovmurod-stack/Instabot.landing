"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, MessageCircle, Zap, ShieldCheck, Clock, Users, ArrowRight, BarChart3, MousePointer2, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { AuthModal } from "@/components/auth-modal";

export default function LandingV2Page() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const openAuth = () => setIsAuthOpen(true);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 overflow-x-hidden">
      <AuthModal isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} />
      
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-[10px] md:text-xs font-medium tracking-tight px-4 flex flex-wrap items-center justify-center gap-1">
        <span>Yangi: Instagram AI Agent - 2024-yilning eng yaxshi yashirin quroli.</span>
        <button onClick={openAuth} className="underline font-bold text-white whitespace-nowrap">Hoziroq sinab ko&apos;ring →</button>
      </div>

      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Zap className="h-5 w-5 text-primary-foreground fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight">INSTABOT</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Imkoniyatlar</a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Narxlar</a>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={openAuth} className="rounded-full font-bold px-4 sm:px-6 h-9 sm:h-10 text-xs sm:text-sm transition-all hover:scale-105 active:scale-95">
              BOSHLASH
            </Button>
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
            7 kun bepul sinov
          </Badge>
          
          <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-7xl font-extrabold tracking-tighter leading-[1.2] sm:leading-[1.1] text-balance px-4">
            Instagramda hamma narsani <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              avtomatlashtiring
            </span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed px-6 sm:px-0">
            AI agentlar mijozlar bilan muloqot qiladi, sotuvlarni oshiradi va 
            obunachilar bilan 24/7 aloqada bo&apos;ladi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 px-4 sm:px-0">
            <Button onClick={openAuth} size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 rounded-2xl text-base sm:text-lg font-bold shadow-xl shadow-primary/20 transition-transform hover:-translate-y-1">
              BEPUL BOSHLASH
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <a href="#pricing" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="glass-button w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 rounded-2xl text-base sm:text-lg font-bold border-2">
                Tariflar bilan tanishish
              </Button>
            </a>
          </div>

          <div className="pt-8 flex items-center justify-center gap-8 text-muted-foreground/60 overflow-hidden">
             <div className="flex items-center gap-2 shrink-0">
               <ShieldCheck className="h-5 w-5" />
               <span className="text-xs font-bold uppercase tracking-widest">Xavfsiz</span>
             </div>
             <div className="flex items-center gap-2 shrink-0">
               <Clock className="h-5 w-5" />
               <span className="text-xs font-bold uppercase tracking-widest">24/7 Avtopilot</span>
             </div>
             <div className="flex items-center gap-2 shrink-0 hidden sm:flex">
               <Users className="h-5 w-5" />
               <span className="text-xs font-bold uppercase tracking-widest">100+ Bizneslar</span>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 md:px-6 max-w-7xl mx-auto border-t">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">Imkoniyatlar</h2>
          <p className="text-muted-foreground">Biznesingiz uchun eng kuchli vositalar</p>
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
            description="Kodni bilish shart emas. 1 daqiqada ulaning."
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
            description="Soddalashtirilgan hamkor paneli orqali hamma narsani osongina sozlang."
          />
          <FeatureCardV2 
            icon={<Clock className="h-6 w-6 text-primary" />}
            title="24/7 Faollik"
            description="Bot hech qachon charchamaydi va dam olmaydi."
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
            {/* Start Tier */}
            <Card className="relative border shadow-xl transition-all hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="text-xl uppercase tracking-tighter">Boshlash</CardTitle>
                <CardDescription>Yangi boshlovchilar uchun</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tighter">90</span>
                  <span className="text-muted-foreground font-medium uppercase text-xs tracking-widest">ming / oy</span>
                </div>
                <div className="space-y-4">
                  {["Cheklangan AI javoblar", "DM Avtomatizatsiyasi", "1 ta profil", "Asosiy analitika"].map((feature, i) => (
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
                <Button onClick={openAuth} variant="outline" className="w-full rounded-xl font-bold py-6">TANLASH</Button>
              </CardFooter>
            </Card>

            {/* Standard Tier */}
            <Card className="relative border-primary border-2 shadow-2xl transition-all hover:scale-[1.02] z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">Eng mashhur</div>
              <CardHeader>
                <CardTitle className="text-xl uppercase tracking-tighter">Standart</CardTitle>
                <CardDescription>O&apos;rta bizneslar uchun</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline gap-1 text-primary">
                  <span className="text-5xl font-bold tracking-tighter">490</span>
                  <span className="font-medium uppercase text-xs tracking-widest">ming / oy</span>
                </div>
                <div className="space-y-4">
                  {["Cheksiz AI javoblar", "To'liq avtomatizatsiya", "3 ta profil", "Kengaytirilgan analitika"].map((feature, i) => (
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
                <Button onClick={openAuth} className="glass-button w-full rounded-xl font-bold py-6 shadow-lg shadow-primary/20">TANLASH</Button>
              </CardFooter>
            </Card>

            {/* Pro Tier */}
            <Card className="relative border shadow-xl transition-all hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="text-xl uppercase tracking-tighter">Pro</CardTitle>
                <CardDescription>Yirik korxonalar uchun</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tighter">890</span>
                  <span className="text-muted-foreground font-medium uppercase text-xs tracking-widest">ming / oy</span>
                </div>
                <div className="space-y-4">
                  {["Barcha imkoniyatlar", "Maxsus AI Agentlar", "10 profil", "VIP Qo'llab-quvvatlash"].map((feature, i) => (
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
                <Button onClick={openAuth} variant="outline" className="w-full rounded-xl font-bold py-6">TANLASH</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Hero-like CTA */}
      <section className="py-20 sm:py-24 px-4 text-center space-y-8 bg-background relative overflow-hidden">
        <h2 className="text-2xl sm:text-3xl md:text-6xl font-extrabold italic tracking-tight uppercase leading-tight sm:leading-normal">Vaqtni tejashni boshlang</h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto px-4">Biznesingizni avtopilotga qo&apos;ying va sotuvlaringizni oshiring.</p>
        <div className="flex justify-center">
          <Button onClick={openAuth} size="lg" className="h-14 sm:h-16 px-8 sm:px-16 w-full sm:w-auto rounded-full text-lg sm:text-xl font-bold shadow-2xl transition-all hover:scale-105">
            BEPUL BOSHLASH
          </Button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t text-center bg-muted/10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-primary" />
          <span className="font-bold tracking-tighter">INSTABOT</span>
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
