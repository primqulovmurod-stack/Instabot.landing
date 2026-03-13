"use client";

import { useUser } from "@/lib/user-context";
import type { Message } from "@/lib/types";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Bot,
  User,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export function MessageLogs() {
  const { messages } = useUser();

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8 pb-10">
      <div className="flex flex-col gap-1 px-4 lg:px-0">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Xabarlar</h1>
        <p className="text-sm lg:text-base text-muted-foreground">Oxirgi muloqotlar va AI agent javoblari tarixi.</p>
      </div>

      <Card className="rounded-xl border shadow-sm mx-4 lg:mx-0 overflow-hidden">
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-220px)] lg:h-[calc(100vh-280px)]">
            <div className="flex flex-col">
              {messages.map((m: Message) => (
                <div key={m.id} className="flex flex-col p-4 border-b last:border-0 hover:bg-muted/30 transition-colors gap-4">
                  {/* Header: User Info + Time */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 rounded-lg shadow-sm border">
                        <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-[10px] font-black">
                          {m.senderName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold tracking-tight">{m.senderName}</span>
                        <div className="flex items-center gap-1.5 opacity-60">
                          <span className="text-[10px] font-bold uppercase tracking-widest">{formatTime(m.timestamp)}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                          <span className="text-[10px] font-bold">Instagram foydalanuvchisi</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="h-6 text-[9px] font-black uppercase tracking-tighter border-success/30 text-success bg-success/5 px-2">
                      Javob berilgan
                    </Badge>
                  </div>

                  {/* Body: Exchanges */}
                  <div className="space-y-4 pl-1">
                    {/* User Question */}
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-5 h-5 rounded bg-muted flex items-center justify-center flex-shrink-0 opacity-40">
                        <User className="w-3 h-3" />
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/80 font-medium">{m.content}</p>
                    </div>

                    {/* AI Answer */}
                    <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-muted/20 border border-dashed relative group">
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 hidden lg:block opacity-20 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-4 h-4 text-primary" />
                      </div>
                      <div className="mt-0.5 w-6 h-6 rounded-lg bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 shadow-md">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <p className="text-sm leading-relaxed italic opacity-90">{m.aiResponse}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
