"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/lib/user-context";
import { ACTIVITY_TYPES, DEFAULT_PROMPTS, type User } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; // Just in case, or I'll use styled input if it errors
import {
  Instagram,
  Copy,
  Shield,
  Activity,
  AlertTriangle,
  Bot,
  FileText,
  Zap,
  Link2,
  Check,
  Loader2,
  Lock,
  User as UserIcon,
} from "lucide-react";

export function Dashboard() {
  const {
    user,
    setUser,
    connectInstagram,
    disconnectInstagram,
    updatePrompt,
    toggleAI,
    isTrialExpired,
    saveSettings,
  } = useUser();

  const [wordCount, setWordCount] = useState(0);
  const [connecting, setConnecting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // New states for Login/Password flow
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginStep, setLoginStep] = useState<"login" | "verify">("login");
  const [credentials, setCredentials] = useState({ username: "", password: "", code: "" });
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const words = user.aiPrompt.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [user.aiPrompt]);

  const handleSave = async () => {
    await saveSettings({ aiPrompt: user.aiPrompt });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleActivityChange = async (value: string | null) => {
    if (!value) return;
    const defaultPrompt = DEFAULT_PROMPTS[value];
    const newPrompt = !user.aiPrompt ? defaultPrompt : user.aiPrompt;
    
    await saveSettings({ 
      activityType: value,
      aiPrompt: newPrompt
    });
  };

  const handleConnectInstagram = () => {
    const appId = process.env.NEXT_PUBLIC_META_APP_ID;
    // Scopes needed for Instagram Messaging
    const scopes = [
      "instagram_basic",
      "instagram_manage_messages",
      "pages_manage_metadata",
      "pages_show_list",
      "pages_read_engagement",
      "business_management"
    ].join(",");
    
    // Pass externalId in state to identify user on callback
    const state = user.id;
    const redirectUri = `${window.location.origin}/api/auth/instagram`;
    
    const oauthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&display=page&extras={"setup":{"supported_configurations":["instagram_messaging"]}}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&state=${state}&response_type=code`;
    
    setConnecting(true);
    window.location.href = oauthUrl;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      if (loginStep === "login") {
        // Step 1: Login
        const response = await fetch("/api/auth/instagram-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            username: credentials.username, 
            password: credentials.password 
          }),
        });

        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || "Login xatosi");

        if (data.requiresVerification) {
          setLoginStep("verify");
        } else {
          // Success
          setUser((prev: User) => ({
            ...prev,
            instagramConnected: true,
            instagramId: data.instagramId,
            instagramUsername: data.username || credentials.username
          }));
          setIsLoginOpen(false);
        }
      } else {
        // Step 2: Verify Code
        const response = await fetch("/api/auth/instagram-login/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            username: credentials.username, 
            code: credentials.code 
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Kod xatosi");

        setUser((prev: User) => ({
          ...prev,
          instagramConnected: true,
          instagramId: data.instagramId,
          instagramUsername: data.username || credentials.username
        }));
        setIsLoginOpen(false);
      }
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDefaultPrompt = () => {
    const prompt = DEFAULT_PROMPTS[user.activityType];
    if (prompt) updatePrompt(prompt);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8 pb-10 px-0 lg:px-4">
      {/* Header section like official Shadcn docs */}
      <div className="flex flex-col gap-1 px-4 lg:px-0">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Boshqaruv paneli</h1>
        <p className="text-sm lg:text-base text-muted-foreground">
          AI Agent holati va Instagram integratsiyasini boshqarish.
        </p>
      </div>

      {/* Stats Grid - 1 col on mobile, 2 col on md, 4 col on lg */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 lg:px-0">
        <Card className="rounded-xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Instagram</CardTitle>
            <Instagram className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">
                  {user.instagramConnected ? "Faol" : "O'chiq"}
                </div>
                {user.instagramConnected && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                    <Link2 className="h-3 w-3 text-green-500" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {user.instagramConnected ? "Instagramga ulangan" : "Ulanmagan"}
              </p>
            </div>
            <Switch 
              checked={user.instagramConnected} 
              onCheckedChange={() => user.instagramConnected ? disconnectInstagram() : handleConnectInstagram()} 
              disabled={connecting}
            />
          </CardContent>
        </Card>
        <Card className="rounded-xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Agent</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">
                  {user.aiEnabled ? "Yoqilgan" : "O'chirilgan"}
                </div>
                {user.aiEnabled && (
                  <div className="flex items-center px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Javob berish rejimi
              </p>
            </div>
            <Switch 
              disabled={!user.instagramConnected || isTrialExpired} 
              checked={user.aiEnabled} 
              onCheckedChange={toggleAI} 
            />
          </CardContent>
        </Card>
        <Card className="rounded-xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Obuna</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-2">
            <div>
              <div className="text-2xl font-bold">
                {user.isPaid ? "Premium" : "Bepul"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {user.isPaid ? "Cheksiz foydalanish" : `Sinov muddati: ${user.trialDaysLeft} kun qoldi`}
              </p>
            </div>
            {!user.isPaid && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-[10px] font-bold"
                onClick={() => window.open("https://t.me/primkulovmurod", "_blank")}
              >
                To&apos;lash
              </Button>
            )}
          </CardContent>
        </Card>
        <Card className="rounded-xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Siz haqingizdagi ma&apos;lumot</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wordCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Joriy so&apos;zlar soni
            </p>
          </CardContent>
        </Card>
      </div>

      {isTrialExpired && (
        <div className="mx-4 lg:mx-0 p-4 rounded-lg border bg-destructive/5 text-destructive flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <div className="text-sm font-medium">
              Trial muddati tugagan. AI javob berishdan to&apos;xtadi.
            </div>
          </div>
          <Button 
            variant="destructive" 
            size="sm" 
            className="w-full sm:w-auto"
            onClick={() => window.open("https://t.me/primkulovmurod", "_blank")}
          >
            Hozir to&apos;lash
          </Button>
        </div>
      )}

      {/* Main Grid - Stacked on mobile/tablet, side-by-side on large screens */}
      <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-7 px-4 lg:px-0">
        {/* Main Settings - Knowledge Base */}
        <Card className="lg:col-span-4 rounded-xl border shadow-sm">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-xl">Siz haqingizdagi ma&apos;lumotlar bazasi</CardTitle>
            <CardDescription className="text-sm">
              AI mijoz nomidan qanday javob berishi kerakligi (narxlar, manzil, xizmatlar) yoziladi.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 space-y-4 pt-0 lg:pt-0">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="ai-prompt" className="text-sm font-semibold">Ma&apos;lumot matni</Label>
                <Button variant="outline" size="sm" onClick={loadDefaultPrompt} className="h-8 text-[11px] font-bold uppercase tracking-wider px-3">
                  Shablon
                </Button>
              </div>
              <Textarea
                id="ai-prompt"
                placeholder="Bu yerga instruktsiyalarni yozing..."
                value={user.aiPrompt}
                onChange={(e) => updatePrompt(e.target.value)}
                className="min-h-[250px] lg:min-h-[350px] resize-none border-dashed bg-muted/20"
              />
              <div className="flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                <span>Max 1000 so&apos;z</span>
                <span className={wordCount > 900 ? "text-destructive" : ""}>{wordCount} / 1000</span>
              </div>
            </div>
            <Button 
              onClick={handleSave} 
              className={`w-full lg:w-auto px-10 h-10 font-bold uppercase tracking-widest text-xs transition-all ${isSaved ? "bg-green-600 hover:bg-green-700" : ""}`}
            >
              {isSaved ? (
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Saqlandi!
                </span>
              ) : (
                "Saqlash"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Sidebar settings in dashboard */}
        <div className="lg:col-span-3 space-y-6 lg:space-y-8">
          {/* Integratsiya Card */}
          <Card className="rounded-xl border shadow-sm">
            <CardHeader className="p-4 lg:p-6">
              <CardTitle className="text-lg flex items-center gap-2">
                <Link2 className="h-4 w-4" />
                Integratsiya
              </CardTitle>
              <CardDescription className="text-sm text-balance">Instagram hisobingizni boshqaring.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 lg:p-6 space-y-4 pt-0 lg:pt-0">
              {!user.instagramConnected ? (
                <Button 
                  onClick={handleConnectInstagram} 
                  disabled={connecting}
                  className="w-full flex gap-3 h-11 font-bold bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 border-0"
                >
                  {connecting ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Instagram className="h-5 w-5" />
                  )}
                  {connecting ? "Ulanmoqda..." : "Instagramga ulanish"}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl border bg-success/5 border-success/20">
                    <div className="flex items-center gap-3">
                      <Instagram className="h-5 w-5 text-success" />
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-bold text-success uppercase tracking-wider">Faol</div>
                        <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                      </div>
                    </div>
                    <Badge variant="outline" className="border-success/30 text-success text-[10px] font-black">ULANGAN</Badge>
                  </div>
                  <div className="flex flex-col gap-1.5 px-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                      {user.instagramUsername ? "Instagram Nik" : "Page ID"}
                    </span>
                    <div className="flex items-center justify-between p-2.5 rounded-lg border bg-background group">
                      <code className="text-[11px] font-mono font-bold tracking-tight">
                        {user.instagramUsername ? `@${user.instagramUsername}` : user.pageId}
                      </code>
                      <Button variant="ghost" size="icon" className="h-7 w-7 opacity-50 group-hover:opacity-100 transition-opacity">
                        <Copy className="h-3.5 w-3.5"/>
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" onClick={disconnectInstagram} className="w-full h-10 text-destructive border-destructive/20 hover:bg-destructive/5 text-xs font-bold uppercase tracking-widest">
                    Ulanishni uzish
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sozlamalar Card */}
          <Card className="rounded-xl border shadow-sm">
            <CardHeader className="p-4 lg:p-6">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Sozlamalar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 lg:p-6 space-y-6 pt-0 lg:pt-0">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider opacity-60">Faoliyat turi</Label>
                <Select value={user.activityType} onValueChange={handleActivityChange}>
                  <SelectTrigger className="h-10 min-w-[150px]">
                    <SelectValue placeholder={ACTIVITY_TYPES.find(t => t.value === user.activityType)?.label || "Tanlang..."} />
                  </SelectTrigger>
                  <SelectContent>
                    {ACTIVITY_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>

      {/* Instagram Login Dialog - Simulated Native Auth Flow */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-0">
          <div className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 h-2 w-full" />
          <div className="p-6">
            <DialogHeader className="text-center space-y-4 flex flex-col items-center pb-6">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 p-1">
                <div className="w-full h-full bg-background rounded-[20px] flex items-center justify-center">
                  <Instagram className="h-8 w-8 text-foreground" />
                </div>
              </div>
              <DialogTitle className="text-2xl font-bold">
                {loginStep === "login" ? "Instagram bilan davom etish" : "Tasdiqlash kodi"}
              </DialogTitle>
              <DialogDescription className="text-center">
                {loginStep === "login" 
                  ? "Instagram profilingizni Instabot.ai ga bog'lash uchun ruxsat bering."
                  : "Instagram profilingizga yoki SMS orqali kelgan tasdiqlash kodini kiriting."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {loginStep === "login" ? (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                       <Label htmlFor="username" className="text-xs uppercase tracking-wider text-muted-foreground">Instagram Login</Label>
                       <div className="relative">
                         <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                         <Input 
                           id="username"
                           placeholder="username" 
                           className="pl-9 bg-muted/50 border-transparent focus:border-primary"
                           required
                           value={credentials.username}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCredentials(p => ({...p, username: e.target.value}))}
                         />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground">Parol</Label>
                       <div className="relative">
                         <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                         <Input 
                           id="password" 
                           type="password"
                           placeholder="••••••••" 
                           className="pl-9 bg-muted/50 border-transparent focus:border-primary"
                           required
                           value={credentials.password}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCredentials(p => ({...p, password: e.target.value}))}
                         />
                       </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-center block text-sm">6-raqamli kodni kiriting</Label>
                  <Input 
                    id="code" 
                    placeholder="123 456" 
                    className="text-center text-3xl tracking-[0.5em] font-bold h-16 bg-muted/50"
                    required
                    maxLength={6}
                    value={credentials.code}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCredentials(p => ({...p, code: e.target.value}))}
                  />
                </div>
              )}

              {loginError && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2 font-medium">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  <p>{loginError}</p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 font-bold text-base bg-blue-500 hover:bg-blue-600 text-white shadow-lg transition-transform active:scale-[0.98]" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  loginStep === "login" ? (credentials.username ? `Davom etish: @${credentials.username}` : "Davom etish") : "Tasdiqlash"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Bu funksiya vaqtinchalik test rejimida ishlaydi (Localhost). <br/> Hech qanday ma'lumot saqlanmaydi.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

