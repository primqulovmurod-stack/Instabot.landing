"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  Instagram, 
  Zap, 
  ShieldCheck, 
  MessageCircle, 
  BarChart3,
  MousePointer2,
  Clock,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#BEF264] overflow-x-hidden">
      {/* Top Banner */}
      <div className="bg-[#121212] text-white py-2 text-center text-[10px] md:text-xs font-bold tracking-widest uppercase px-4">
        <span className="bg-[#BEF264] text-black px-2 py-0.5 rounded-sm mr-2 italic">YANGI</span>
        Instagram AI Agent - 2024-yilning eng yaxshi yashirin quroli →
      </div>

      {/* Navigation */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black flex items-center justify-center rounded-xl transform -rotate-6">
              <Zap className="h-6 w-6 text-[#BEF264] fill-current" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter italic">INSTABOT</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-tight">
            <a href="#features" className="hover:text-gray-500 transition-colors">Imkoniyatlar</a>
            <a href="#pricing" className="hover:text-gray-500 transition-colors">Narxlar</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer">
                  <User className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <Button className="bg-black text-white hover:bg-gray-800 rounded-full font-black px-6 md:px-8 h-10 md:h-12 text-sm md:text-base transition-all hover:scale-105 active:scale-95">
                  Bepul sinab ko&apos;rish
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h1 className="text-3xl md:text-8xl font-black leading-[1.1] md:leading-[0.95] tracking-tight text-[#0A0A0A]">
            Instagramda <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">hamma narsani</span> <br />
            avtomatlashtiring
          </h1>
          
          <p className="text-sm md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed px-4">
            AI agentlar mijozlar bilan muloqot qiladi, sotuvlarni oshiradi va 
            obunachilar bilan 24/7 aloqada bo&apos;ladi. Sinab ko&apos;rish mutlaqo bepul.
          </p>

          <div className="flex flex-col items-center justify-center pt-8">
            <Link href="/dashboard">
              <Button className="bg-[#BEF264] hover:bg-[#A8E24A] text-black h-14 md:h-20 px-8 md:px-16 rounded-full text-lg md:text-2xl font-black shadow-[0_10px_40px_rgba(190,242,100,0.3)] hover:shadow-[0_15px_50px_rgba(190,242,100,0.4)] transition-all hover:-translate-y-1 group border-4 border-white">
                HOZIROQ BOSHLASH
                <div className="ml-3 md:ml-4 h-8 w-8 md:h-10 md:w-10 bg-black rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="h-4 w-4 md:h-6 md:w-6 text-white" />
                </div>
              </Button>
            </Link>
            <p className="text-gray-400 text-xs mt-6 font-bold tracking-widest uppercase">
              Ro&apos;yxatdan o&apos;tish shart emas • 7 kun mutlaqo bepul
            </p>
          </div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="bg-[#F8F8F8] py-8 md:py-16 border-y border-gray-100 overflow-hidden">
        <div className="flex gap-10 md:gap-20 animate-marquee whitespace-nowrap px-4 font-black text-2xl md:text-6xl text-gray-200">
           <span>STOMATOLOGIYA</span>
           <span className="text-gray-900">RESTORAN</span>
           <span>DO&apos;KON</span>
           <span className="text-gray-900">AGENTLIK</span>
           <span>BLOGER</span>
           <span className="text-gray-900">KLINIKA</span>
           <span>AVTOSERVISLAR</span>
           <span className="text-gray-900">XIZMAT KO&apos;RSATISH</span>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<MessageCircle className="h-8 w-8" />}
            title="DM Avtomatizatsiyasi"
            description="Har bir kelgan xabarga AI agentingiz professional va xushmuomala tarzda darhol javob beradi."
          />
          <FeatureCard 
            icon={<Zap className="h-8 w-8" />}
            title="Tezkor Ulanish"
            description="Murakkab Facebook sozlamalarisiz, to&apos;g&apos;ridan-to&apos;g&apos;ri Instagram loginsiz bilan 1 daqiqada ishga tushiring."
          />
          <FeatureCard 
            icon={<BarChart3 className="h-8 w-8" />}
            title="Sotuv Analitikasi"
            description="AI qaysi mijozlar bilan gaplashgani va qaysilariga yordam berganini batafsil kuzatib boring."
          />
          <FeatureCard 
            icon={<ShieldCheck className="h-8 w-8" />}
            title="Xavfsiz Tizim"
            description="Sizning ma&apos;lumotlaringiz shifrlangan va xavfsiz holatda saqlanadi. Instagram qoidalariga to&apos;liq mos."
          />
          <FeatureCard 
            icon={<MousePointer2 className="h-8 w-8" />}
            title="Oson Boshqaruv"
            description="Hech qanday dasturlash bilimi kerak emas. Dashboard orqali hamma narsani osongina sozlang."
          />
          <FeatureCard 
            icon={<Clock className="h-8 w-8" />}
            title="24/7 Tayyor"
            description="Siz uxlab yotganingizda ham botingiz mijozlaringizga xizmat ko&apos;rsatadi va buyurtmalar qabul qiladi."
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Narxlar</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs md:text-sm">Biznesingiz uchun eng mos tarifni tanlang</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Standard Tier */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-black text-[#BEF264] px-6 py-2 font-black text-[10px] tracking-widest uppercase origin-bottom-left rotate-45 translate-x-3 translate-y-[-5px]">Hamyonbop</div>
               <div className="space-y-2">
                 <h3 className="text-xl md:text-2xl font-black uppercase">Standart</h3>
                 <p className="text-gray-400 text-sm font-bold uppercase tracking-widest leading-none">Kichik bizneslar uchun</p>
               </div>
               <div className="flex items-baseline gap-1">
                 <span className="text-4xl md:text-5xl font-black tracking-tighter">490</span>
                 <span className="text-lg md:text-xl font-black uppercase">ming/oy</span>
               </div>
               <ul className="space-y-4 flex-1">
                 {["AI Agent (24/7)", "DM Avtomatizatsiyasi", "Tezkor Ulanish", "Haftalik Analitika"].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm font-bold opacity-70">
                     <div className="h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                     {item}
                   </li>
                 ))}
               </ul>
               <Link href="/dashboard">
                 <Button className="w-full h-14 bg-black text-white hover:bg-gray-800 rounded-full font-black text-lg transition-all">
                   BOSHLASH
                 </Button>
               </Link>
            </div>

            {/* Pro Tier - Coming Soon */}
            <div className="bg-white/50 p-8 md:p-10 rounded-[2.5rem] border-2 border-gray-200 border-dashed flex flex-col space-y-8 opacity-60">
               <div className="space-y-2">
                 <h3 className="text-xl md:text-2xl font-black uppercase text-gray-400">Pro</h3>
                 <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">O&apos;sayotgan jamoalar uchun</p>
               </div>
               <div className="flex items-baseline gap-1">
                 <span className="text-4xl md:text-5xl font-black tracking-tighter text-gray-300">590</span>
                 <span className="text-lg md:text-xl font-black uppercase text-gray-300">ming/oy</span>
               </div>
               <div className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-gray-100 rounded-3xl bg-gray-50/50">
                  <span className="font-black italic text-gray-400 uppercase tracking-widest text-lg">Tez kunda...</span>
               </div>
               <Button disabled className="w-full h-14 bg-gray-100 text-gray-400 rounded-full font-black text-lg">
                 KUTILMOQDA
               </Button>
            </div>

            {/* Business Tier - Coming Soon */}
            <div className="bg-white/50 p-8 md:p-10 rounded-[2.5rem] border-2 border-gray-200 border-dashed flex flex-col space-y-8 opacity-60">
               <div className="space-y-2">
                 <h3 className="text-xl md:text-2xl font-black uppercase text-gray-400">Premium</h3>
                 <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Yirik korxonalar uchun</p>
               </div>
               <div className="flex items-baseline gap-1">
                 <span className="text-4xl md:text-5xl font-black tracking-tighter text-gray-300">990</span>
                 <span className="text-lg md:text-xl font-black uppercase text-gray-300">ming/oy</span>
               </div>
               <div className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-gray-100 rounded-3xl bg-gray-50/50">
                  <span className="font-black italic text-gray-400 uppercase tracking-widest text-lg">Tez kunda...</span>
               </div>
               <Button disabled className="w-full h-14 bg-gray-100 text-gray-400 rounded-full font-black text-lg">
                 KUTILMOQDA
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Final */}
      <section className="bg-black text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-10 left-10 w-96 h-96 bg-[#BEF264] rounded-full blur-[150px]" />
           <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-black leading-tight italic">Ko&apos;proq pul topishga tayyormisiz?</h2>
          <p className="text-xl text-gray-400 font-medium">Boshlash uchun bor-yo&apos;g&apos;i 30 soniya vaqt ketadi.</p>
          <Link href="/dashboard">
            <Button className="bg-[#BEF264] hover:bg-[#A8E24A] text-black h-16 px-12 rounded-full text-xl font-black transition-all">
              BEPUL BOSHLASH
            </Button>
          </Link>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-gray-100 text-center">
        <div className="flex items-center justify-center gap-2 mb-6 opacity-30">
          <Zap className="h-5 w-5 text-black" />
          <span className="font-black italic">INSTABOT</span>
        </div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">© 2024 Instabot.AI - Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 md:p-10 rounded-[2.5rem] bg-[#F9F9F9] hover:bg-black hover:text-white transition-all duration-500 group">
      <div className="mb-8 p-4 rounded-2xl bg-white w-fit shadow-sm group-hover:bg-[#1A1A1A] transition-colors">
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-black mb-4 tracking-tight uppercase">{title}</h3>
      <p className="text-gray-500 font-medium leading-relaxed group-hover:text-gray-400">{description}</p>
    </div>
  );
}
