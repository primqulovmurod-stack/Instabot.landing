"use client";

import { useUser } from "@/lib/user-context";
import { type User as UserType } from "@/lib/types";
import { useTheme } from "@/components/theme-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  User as UserIcon,
  Shield,
  Palette,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";

export function SettingsPanel() {
  const { user, setUser } = useUser();
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8 pb-10">
      <div className="flex flex-col gap-1 px-4 lg:px-0">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Sozlamalar</h1>
        <p className="text-sm lg:text-base text-muted-foreground">Profil va tizim parametrlarini boshqarish.</p>
      </div>

      <div className="space-y-6 px-4 lg:px-0">
        {/* Profile */}
        <Card className="rounded-xl border shadow-sm">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-lg flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Profil ma&apos;lumotlari
            </CardTitle>
            <CardDescription className="text-sm">Boshqa foydalanuvchilar sizni qanday ko&apos;rishini boshqaring.</CardDescription>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 space-y-4 pt-0 lg:pt-0">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-sm font-semibold">To&apos;liq ismingiz</Label>
              <input
                id="name"
                value={user.name}
                placeholder="Ismingizni kiriting..."
                onChange={(e) => setUser((p: UserType) => ({...p, name: e.target.value}))}
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all placeholder:opacity-50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-semibold">Email manzili</Label>
              <input
                id="email"
                value={user.email}
                placeholder="email@misol.uz"
                onChange={(e) => setUser((p: UserType) => ({...p, email: e.target.value}))}
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all placeholder:opacity-50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="rounded-xl border shadow-sm">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Mavzu (Appearance)
            </CardTitle>
            <CardDescription className="text-sm">Tizim ranglarini o&apos;zgartirish.</CardDescription>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 lg:pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { v: "light", icon: Sun, label: "Light" },
                { v: "dark", icon: Moon, label: "Dark" },
                { v: "system", icon: Monitor, label: "System" },
              ].map((m) => (
                <button
                  key={m.v}
                  onClick={() => setTheme(m.v as any)}
                  className={`flex flex-row sm:flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === m.v ? "border-primary bg-primary/5 text-primary" : "border-transparent bg-muted/30 hover:bg-muted text-muted-foreground"}`}
                >
                  <m.icon className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-widest text-[10px] sm:text-xs">{m.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demo Admin */}
        <Card className="rounded-xl border border-primary/20 bg-primary/5 shadow-none">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-lg text-primary flex items-center gap-2 font-black tracking-tight">
              <Shield className="h-5 w-5" />
              DEMO / ADMIN PANEL
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 space-y-6 pt-0 lg:pt-0">
            <div className="flex items-center justify-between p-4 rounded-xl border bg-background">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold">Pro Rejim</Label>
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none mt-1">Status: {user.isPaid ? 'Active' : 'Inactive'}</p>
              </div>
              <Switch checked={user.isPaid} onCheckedChange={(v) => setUser((p: UserType) => ({...p, isPaid: v}))} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60 px-1">
                <span>Sinov Muddati</span>
                <span>{user.trialDaysLeft} / 7 kun</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" onClick={() => setUser((p: UserType) => ({...p, trialDaysLeft: 0}))} className="h-9 font-bold text-[10px] uppercase tracking-wider">Expire Now</Button>
                <Button variant="outline" size="sm" onClick={() => setUser((p: UserType) => ({...p, trialDaysLeft: 7}))} className="h-9 font-bold text-[10px] uppercase tracking-wider">Reset (7 Days)</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border shadow-sm">
          <CardHeader className="p-4 lg:p-6 pb-2">
             <CardTitle className="text-sm font-bold uppercase tracking-widest opacity-60">Hisob ma&apos;lumotlari</CardTitle>
          </CardHeader>
          <CardContent className="px-4 lg:px-6 pb-4 lg:pb-6 space-y-2">
             <div className="flex items-center justify-between py-2.5 border-b text-xs">
                <span className="text-muted-foreground font-medium">User ID</span>
                <span className="font-mono font-bold">{user.id}</span>
             </div>
             <div className="flex items-center justify-between py-2.5 text-xs">
                <span className="text-muted-foreground font-medium">Ro&apos;yxatdan o&apos;tgan</span>
                <span className="font-bold">{new Date(user.createdAt).toLocaleDateString("uz-UZ")}</span>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
