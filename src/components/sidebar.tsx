"use client";

import { useState } from "react";
import { useUser } from "@/lib/user-context";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  TestTube,
  Moon,
  Sun,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Send,
  Zap,
  Handshake,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobile?: boolean;
}

const navItems = [
  { id: "dashboard", label: "Boshqaruv paneli", icon: LayoutDashboard },
  { id: "chat-test", label: "AI Sinov", icon: TestTube },
  { id: "logs", label: "Xabarlar", icon: MessageSquare },
  { id: "partner", label: "Hamkorlar", icon: Handshake },
  { id: "settings", label: "Sozlamalar", icon: Settings },
];

export function Sidebar({ activeTab, onTabChange, isMobile = false }: SidebarProps) {
  const { user } = useUser();
  const { resolvedTheme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(user.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentCollapsed = isMobile ? false : collapsed;

  return (
    <aside
      className={`
        flex flex-col h-full
        bg-background text-foreground
        border-r transition-all duration-300
        ${isMobile ? "w-full border-r-0" : currentCollapsed ? "w-16 fixed" : "w-64 fixed"}
      `}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-2 px-4 py-6 h-16">
        <div className="flex-shrink-0 w-8 h-8 rounded bg-primary flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary-foreground fill-current" />
        </div>
        {(!currentCollapsed || isMobile) && (
          <span className="font-bold text-lg tracking-tight uppercase">Instabot</span>
        )}
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          if (currentCollapsed && !isMobile) {
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger
                  onClick={() => onTabChange(item.id)}
                  className={`
                    w-full flex items-center justify-center p-2 rounded-md
                    ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}
                  `}
                >
                  <Icon className="w-5 h-5" />
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}
              `}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer Area */}
      <div className="p-3 border-t space-y-2 mt-auto">
        {/* User Card */}
        <div className={`flex items-center p-2 rounded-md bg-muted/50 ${currentCollapsed && !isMobile ? "justify-center" : "gap-3"}`}>
          <Avatar className="w-8 h-8 rounded">
            <AvatarFallback className="rounded bg-primary text-primary-foreground text-xs">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {(!currentCollapsed || isMobile) && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold truncate leading-none mb-1">{user.name}</p>
              <div className="flex items-center gap-1 opacity-60">
                <span className="text-[10px] font-mono truncate">{user.id}</span>
                <button onClick={copyId} className="hover:text-primary transition-colors">
                  {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Trial/Status */}
        {(!currentCollapsed || isMobile) && !user.isPaid && (
          <div className="px-3 py-2 rounded-md bg-orange-500/10 border border-orange-500/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">Trial</span>
              <span className="text-[10px] text-orange-600 font-medium">{user.trialDaysLeft} kun qoldi</span>
            </div>
            <div className="w-full bg-orange-200 dark:bg-orange-950 h-1 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: `${(user.trialDaysLeft / 7) * 100}%` }} />
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-1">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="flex-1 flex items-center justify-center p-2 rounded-md border hover:bg-accent transition-colors"
            title="Mavzuni o'zgartirish"
          >
            {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          {!isMobile && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex-1 flex items-center justify-center p-2 rounded-md border hover:bg-accent transition-colors"
              title={collapsed ? "Kengaytirish" : "Yig'ish"}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          )}
        </div>
        
        {(!currentCollapsed || isMobile) && (
          <a
            href="https://t.me/primkulovmurod"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-9 flex items-center justify-center gap-2 rounded bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
          >
            <Send className="w-3 h-3" />
            To&apos;lov
          </a>
        )}
      </div>
    </aside>
  );
}
