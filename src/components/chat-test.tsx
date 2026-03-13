"use client";

import { useState, useRef, useEffect } from "react";
import { useUser } from "@/lib/user-context";
import type { ChatMessage } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Bot,
  User,
  Trash2,
} from "lucide-react";

export function ChatTest() {
  const { user } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "w1",
      role: "assistant",
      content: "Assalomu alaykum! Men sizning AI yordamchingizman. Savol bering, qo'limdan kelgancha javob beraman.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);



  const handleSend = async () => {
    if (!input.trim()) return;
    const uMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: input.trim(), timestamp: new Date().toISOString() };
    setMessages((p) => [...p, uMsg]);
    setInput("");
    setIsTyping(true);
    
    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: uMsg.content,
          aiPrompt: user.aiPrompt,
          activityType: user.activityType,
        }),
      });

      if (!response.ok) throw new Error("API call failed");
      const data = await response.json();
      
      setMessages((p) => [...p, { 
        id: (Date.now()+1).toString(), 
        role: "assistant", 
        content: data.text, 
        timestamp: new Date().toISOString() 
      }]);
    } catch (error) {
      setMessages((p) => [...p, { 
        id: (Date.now()+1).toString(), 
        role: "assistant", 
        content: "Kechirasiz, tizimda xatolik yuz berdi. n8n ulanishini tekshiring.", 
        timestamp: new Date().toISOString() 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] lg:h-[calc(100vh-180px)] flex flex-col gap-4 lg:gap-6 pb-4">
      <div className="flex flex-col gap-1 px-4 lg:px-0">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">AI Sinov</h1>
        <p className="text-xs lg:text-sm text-muted-foreground">AI agentingiz bilan jonli muloqot qilib ko&apos;ring.</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border shadow-sm mx-4 lg:mx-0">
        <CardHeader className="py-3 px-4 border-b flex flex-row items-center justify-between bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            <span className="text-[11px] font-black uppercase tracking-widest opacity-70">AI Agent Faol</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setMessages([])} className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-colors">
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 p-0 bg-muted/10 relative">
          <ScrollArea className="h-full" ref={scrollRef}>
            <div className="p-4 space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[90%] sm:max-w-[80%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ${m.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-background border"}`}>
                      {m.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div className={`rounded-2xl px-4 py-2 text-sm shadow-sm leading-relaxed ${m.role === "assistant" ? "bg-background border rounded-tl-none" : "bg-primary text-primary-foreground rounded-tr-none"}`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-sm"><Bot className="w-4 h-4" /></div>
                  <div className="bg-background border rounded-2xl rounded-tl-none px-4 py-3 flex gap-1.5 items-center shadow-sm">
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>

        <div className="p-4 border-t bg-background">
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Xabar yozing..."
              className="flex-1 h-11 px-4 rounded-xl border bg-muted/20 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <Button type="submit" size="icon" disabled={!input.trim()} className="h-11 w-11 rounded-xl shadow-lg">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
