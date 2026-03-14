"use client";

import { useState } from "react";
import { 
  Users, 
  Bot, 
  DollarSign, 
  Settings, 
  Search,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Eye,
  LayoutDashboard,
  CreditCard,
  History,
  TrendingUp,
  Download,
  Filter,
  Plus,
  Moon,
  Sun,
  Power
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/components/theme-provider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const MOCK_USERS = [
  { id: "1", name: "Anvar Dent", email: "info@dent.uz", phone: "+998 90 123 45 67", status: "paid", bot: "active", plan: "Standart", spent: "490,000", joinDate: "2024-02-15" },
  { id: "2", name: "Premium Look", email: "shop@fashion.uz", phone: "+998 93 456 78 90", status: "trial", bot: "active", plan: "Trial", spent: "0", joinDate: "2024-03-10" },
  { id: "3", name: "Bon Cafe", email: "hello@bon.uz", phone: "+998 99 777 88 99", status: "trial", bot: "inactive", plan: "Trial", spent: "0", joinDate: "2024-03-12" },
  { id: "4", name: "Avto Master", email: "service@avto.uz", phone: "+998 91 222 33 44", status: "paid", bot: "active", plan: "Standart", spent: "490,000", joinDate: "2024-03-01" },
  { id: "5", name: "Zuhra Shos", email: "zuhra@gmail.com", phone: "+998 90 999 00 11", status: "expired", bot: "inactive", plan: "None", spent: "490,000", joinDate: "2023-12-20" },
];

const MOCK_PAYMENTS = [
  { id: "p1", date: "Bugun, 14:20", user: "Anvar Dent", type: "Obuna (Standart)", amount: "490,000", method: "Click", status: "success" },
  { id: "p2", date: "Bugun, 10:15", user: "Avto Master", type: "Obuna (Standart)", amount: "490,000", method: "Payme", status: "success" },
  { id: "p3", date: "Kecha, 18:45", user: "Premium Look", type: "Obuna (Pro)", amount: "590,000", method: "Uzum", status: "pending" },
  { id: "p4", date: "12 Mart, 09:30", user: "Zuhra Shos", type: "Obuna (Standart)", amount: "490,000", method: "Click", status: "success" },
  { id: "p5", date: "11 Mart, 16:20", user: "Bon Cafe", type: "Sinov", amount: "0", method: "System", status: "success" },
];

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const { theme, setTheme } = useTheme();
  const [users, setUsers] = useState(MOCK_USERS);
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "", plan: "Standart" });

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === id) {
        const newBotStatus = user.bot === 'active' ? 'inactive' : 'active';
        const newStatus = newBotStatus === 'active' ? 'paid' : 'expired';
        return { ...user, bot: newBotStatus, status: newStatus };
      }
      return user;
    }));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (users.length + 1).toString();
    const newUserEntry = {
      ...newUser,
      id,
      status: "paid",
      bot: "inactive",
      spent: "0",
      joinDate: new Date().toISOString().split('T')[0]
    };
    setUsers([newUserEntry, ...users]);
    setIsNewUserDialogOpen(false);
    setNewUser({ name: "", email: "", phone: "", plan: "Standart" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r bg-card hidden lg:flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Settings className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight leading-none text-primary">ADMIN</span>
            <span className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">Control</span>
          </div>
        </div>

        <nav className="space-y-1.5 flex-1">
          <SidebarItem 
            icon={<LayoutDashboard className="h-4 w-4" />} 
            label="Asosiy panel" 
            active={activeTab === "dashboard"} 
            onClick={() => setActiveTab("dashboard")} 
          />
          <SidebarItem 
            icon={<Users className="h-4 w-4" />} 
            label="Mijozlar" 
            active={activeTab === "users"} 
            onClick={() => setActiveTab("users")} 
          />
          <SidebarItem 
            icon={<CreditCard className="h-4 w-4" />} 
            label="To'lovlar" 
            active={activeTab === "payments"} 
            onClick={() => setActiveTab("payments")} 
          />
          <SidebarItem 
            icon={<History className="h-4 w-4" />} 
            label="Loglar" 
            active={activeTab === "logs"} 
            onClick={() => setActiveTab("logs")} 
          />
          <SidebarItem 
            icon={<Settings className="h-4 w-4" />} 
            label="Sozlamalar" 
            active={activeTab === "settings"} 
            onClick={() => setActiveTab("settings")} 
          />
        </nav>

        <div className="pt-6 border-t mt-auto space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              {theme === 'dark' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
              <span>{theme === 'dark' ? 'Tungi' : 'Kunduzgi'}</span>
            </div>
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
            />
          </div>
          <div className="flex items-center gap-3 px-2">
             <div className="h-10 w-10 rounded-full bg-primary/10 border flex items-center justify-center font-bold text-primary">
               M
             </div>
             <div className="overflow-hidden">
               <p className="text-sm font-bold leading-tight truncate">Murodjon</p>
               <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest truncate">Administrator</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <div className="h-16 border-b bg-card/50 backdrop-blur sticky top-0 z-40 px-6 flex items-center justify-between">
           <div className="relative w-72">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <Input 
               placeholder="Qidirish..." 
               className="pl-9 h-9 bg-muted/50 border-none focus-visible:ring-1"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>
           <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Badge variant="outline" className="h-7 border-sky-500/20 bg-sky-500/10 text-sky-500 text-[10px] font-bold">LIVE</Badge>
           </div>
        </div>

        <div className="p-6 lg:p-10 space-y-8">
          {/* Section Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-black tracking-[0.2em] text-primary uppercase mb-2">Boshqaruv markazi</p>
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                {activeTab === 'dashboard' ? 'Umumiy tahlil' : 
                 activeTab === 'users' ? 'Barcha foydalanuvchilar' : 
                 activeTab === 'payments' ? 'Moliya' : 
                 activeTab === 'settings' ? 'Tizim sozlamalari' : 'Tizim loglari'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 gap-2 font-semibold">
                <Download className="h-4 w-4" /> EKSPORT
              </Button>
              <Dialog open={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen}>
                <DialogTrigger 
                  className={cn(
                    "inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground shadow-xl shadow-primary/20 h-9 gap-2 px-3 text-sm font-semibold transition-all hover:bg-primary/80 active:translate-y-px outline-none"
                  )}
                >
                  <Plus className="h-4 w-4" /> YANGI MIJOZ
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Yangi mijoz qo'shish</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddUser} className="space-y-6 pt-4">
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mijoz nomi/Brend</Label>
                        <Input 
                          id="name" 
                          placeholder="Masalan: Anvar Dent" 
                          required 
                          value={newUser.name}
                          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="info@dent.uz" 
                          required 
                          value={newUser.email}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Telefon</Label>
                        <Input 
                          id="phone" 
                          placeholder="+998 90 123 45 67" 
                          required 
                          value={newUser.phone}
                          onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="plan" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tarif</Label>
                        <Select value={newUser.plan} onValueChange={(v) => setNewUser({...newUser, plan: v ?? "Standart"})}>
                          <SelectTrigger id="plan">
                            <SelectValue placeholder="Tarifni tanlang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Standart">Standart (490k)</SelectItem>
                            <SelectItem value="Pro">Pro (590k)</SelectItem>
                            <SelectItem value="Premium">Premium (990k)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="w-full h-11 font-bold">MIJOZNI SAQLASH</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          <Tabs value={activeTab} className="w-full">
            {/* Dashboard View */}
            <TabsContent value="dashboard" className="space-y-8 mt-0 focus-visible:ring-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard title="Jami Mijozlar" value="1,482" change="+14 yangi" icon={<Users className="text-primary" />} />
                <StatsCard title="Faol Akkauntlar" value="842" change="92% muvaffaqiyat" icon={<Bot className="text-primary" />} />
                <StatsCard title="Haftalik Tushum" value="12.5 M" change="+12% o'sish" icon={<TrendingUp className="text-primary" />} suffix="so'm" />
                <StatsCard title="Sessiya Barqarorligi" value="98.2%" change="Stabil" icon={<CheckCircle2 className="text-primary" />} />
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 px-6 py-4">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Oylik o'sish dinamikasi</CardTitle>
                    <div className="flex gap-1.5">
                       <div className="h-2 w-2 rounded-full bg-primary" />
                       <div className="h-2 w-2 rounded-full bg-muted" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="h-64 flex items-end gap-3 justify-between">
                       {[30, 45, 35, 70, 50, 90, 85].map((h, i) => (
                         <div key={i} className="flex-1 group relative">
                           <div style={{ height: `${h}%` }} className="bg-primary/20 hover:bg-primary rounded-t-lg transition-all duration-500" />
                           <div className="mt-2 text-[10px] text-center font-bold text-muted-foreground">{['D','S','C','P','J','S','Y'][i]}</div>
                         </div>
                       ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex flex-col overflow-hidden">
                  <CardHeader className="border-b bg-muted/20 px-6 py-4">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Statuslar nisbati</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 flex-1 flex flex-col justify-center space-y-6">
                    <ProgressStat label="Premium" value={65} color="bg-primary" />
                    <ProgressStat label="Trial" value={25} color="bg-primary/50" />
                    <ProgressStat label="Expired" value={10} color="bg-muted" />
                    <div className="pt-6 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-muted-foreground">O'rtacha daromad</span>
                        <span className="text-sm font-black">490,000 UZS</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Users View */}
            <TabsContent value="users" className="space-y-6 mt-0">
              <Card className="overflow-hidden border shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 border-b">
                      <tr>
                        <th className="px-6 py-4 font-bold text-muted-foreground uppercase text-[10px] tracking-widest">Mijoz ma'lumotlari</th>
                        <th className="px-6 py-4 font-bold text-muted-foreground uppercase text-[10px] tracking-widest">Telefon</th>
                        <th className="px-6 py-4 font-bold text-muted-foreground uppercase text-[10px] tracking-widest">Tarif</th>
                        <th className="px-6 py-4 font-bold text-muted-foreground uppercase text-[10px] tracking-widest">Holati</th>
                        <th className="px-6 py-4 font-bold text-muted-foreground uppercase text-[10px] tracking-widest">Agent</th>
                        <th className="px-6 py-4 font-bold text-muted-foreground uppercase text-[10px] tracking-widest">Jami to'lov</th>
                        <th className="px-6 py-4 font-bold text-muted-foreground uppercase text-[10px] tracking-widest text-right">Amal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-muted/20 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">
                                {user.name[0]}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold">{user.name}</span>
                                <span className="text-[10px] text-muted-foreground">{user.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-mono text-xs">
                            {user.phone}
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="secondary" className="text-[10px] font-bold px-2 py-0">{user.plan}</Badge>
                          </td>
                          <td className="px-6 py-4">
                            {user.status === "paid" ? (
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                <span className="text-[10px] font-bold uppercase text-green-500">Faol</span>
                              </div>
                            ) : user.status === "trial" ? (
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                <span className="text-[10px] font-bold uppercase text-orange-500">Sinov</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                <span className="text-[10px] font-bold uppercase text-red-500">To'xtagan</span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                             <Badge variant="outline" className={`text-[10px] font-bold ${user.bot === 'active' ? 'border-primary text-primary' : 'text-muted-foreground'}`}>
                               {user.bot === 'active' ? 'RUNNING' : 'STOPPED'}
                             </Badge>
                          </td>
                          <td className="px-6 py-4 font-bold text-xs">
                            {user.spent} <span className="text-[10px] text-muted-foreground">UZS</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className={`h-9 w-9 transition-all ${user.bot === 'active' ? 'text-green-500 bg-green-500/10' : 'text-muted-foreground opacity-40 hover:opacity-100 hover:text-green-500'}`}
                                onClick={() => toggleUserStatus(user.id)}
                                title={user.bot === 'active' ? "Akkauntni o'chirish" : "Akkauntni yoqish"}
                              >
                                <Power className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatsCard title="Jami Daromad" value="48.2 M" change="+8% o'sish" icon={<DollarSign className="text-primary" />} suffix="so'm" />
                <StatsCard title="Oylik kutilayotgan" value="12.5 M" change="Mart oyi uchun" icon={<TrendingUp className="text-primary" />} suffix="so'm" />
                <StatsCard title="O'rtacha chek" value="540,000" change="Stabil" icon={<CreditCard className="text-primary" />} suffix="so'm" />
              </div>

              <Card className="overflow-hidden border shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 border-b">
                      <tr>
                        <th className="px-6 py-4 font-bold text-muted-foreground uppercase text-[10px] tracking-widest">Sana</th>
                        <th className="px-6 py-4 font-bold text-muted-foreground uppercase text-[10px] tracking-widest">Mijoz</th>
                        <th className="px-6 py-4 font-bold text-muted-foreground uppercase text-[10px] tracking-widest">To'lov turi</th>
                        <th className="px-6 py-4 font-bold text-muted-foreground uppercase text-[10px] tracking-widest">Summa</th>
                        <th className="px-6 py-4 font-bold text-muted-foreground uppercase text-[10px] tracking-widest">Usul</th>
                        <th className="px-6 py-4 font-bold text-muted-foreground uppercase text-[10px] tracking-widest text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {MOCK_PAYMENTS.map((payment) => (
                        <tr key={payment.id} className="hover:bg-muted/20 transition-colors group">
                          <td className="px-6 py-4 text-xs text-muted-foreground font-medium">
                            {payment.date}
                          </td>
                          <td className="px-6 py-4 font-bold">
                            {payment.user}
                          </td>
                          <td className="px-6 py-4 text-[10px] font-bold uppercase tracking-tight">
                            {payment.type}
                          </td>
                          <td className="px-6 py-4 font-black">
                            {payment.amount} <span className="text-[10px] text-muted-foreground font-bold">UZS</span>
                          </td>
                          <td className="px-6 py-4">
                             <Badge variant="outline" className="text-[10px] font-bold border-muted-foreground/20">
                               {payment.method}
                             </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                             {payment.status === 'success' ? (
                               <Badge className="bg-green-500 hover:bg-green-600 text-[10px] font-black uppercase">Muvaffaqiyatli</Badge>
                             ) : (
                               <Badge variant="secondary" className="text-[10px] font-black uppercase">Kutilmoqda</Badge>
                             )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="logs" className="py-20 text-center space-y-4">
               <div className="h-20 w-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <History className="h-8 w-8 text-muted-foreground" />
               </div>
               <h3 className="text-xl font-bold">Tizim loglari kutilmoqda</h3>
               <p className="text-muted-foreground text-sm max-w-xs mx-auto">AI agentlarning barcha amallari va tizimdagi xatolar tarixi shu yerda yig'iladi.</p>
            </TabsContent>

            <TabsContent value="settings" className="py-20 text-center space-y-4">
               <div className="h-20 w-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Settings className="h-8 w-8 text-muted-foreground" />
               </div>
               <h3 className="text-xl font-bold">Global sozlamalar</h3>
               <p className="text-muted-foreground text-sm max-w-xs mx-auto">Bu yerda tizim parametrlarini, API kalitlarini va admin akkauntlarini boshqarishingiz mumkin.</p>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
        active 
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatsCard({ title, value, change, icon, suffix = "" }: { title: string, value: string, change: string, icon: React.ReactNode, suffix?: string }) {
  return (
    <Card className="p-6 transition-all hover:shadow-md border-muted/60 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">{title}</p>
      <div className="flex items-baseline gap-2 mb-1">
        <h3 className="text-2xl font-black tracking-tight">{value}</h3>
        {suffix && <span className="text-[10px] text-muted-foreground font-bold uppercase">{suffix}</span>}
      </div>
      <p className={`text-[10px] font-bold flex items-center gap-1 ${change.includes('+') || change.includes('%') ? 'text-primary' : 'text-muted-foreground'}`}>
        {change.includes('+') && <TrendingUp className="h-3 w-3" />}
        {change}
      </p>
    </Card>
  );
}

function ProgressStat({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div style={{ width: `${value}%` }} className={`h-full ${color} rounded-full`} />
      </div>
    </div>
  );
}

