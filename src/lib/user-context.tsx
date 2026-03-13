"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { User, Message } from "@/lib/types";

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  connectInstagram: () => void;
  disconnectInstagram: () => void;
  updatePrompt: (prompt: string) => void;
  toggleAI: () => void;
  isTrialExpired: boolean;
}

const defaultUser: User = {
  id: "USR-7D2K9X",
  name: "",
  email: "",
  instagramConnected: false,
  activityType: "",
  aiPrompt: "",
  aiEnabled: false,
  isPaid: false,
  trialStartDate: new Date().toISOString(),
  trialDaysLeft: 7,
  createdAt: new Date().toISOString(),
};

const sampleMessages: Message[] = [
  {
    id: "msg-1",
    senderId: "ig-user-1",
    senderName: "Alisher",
    content: "Salom, tish plomba narxi qancha?",
    aiResponse:
      "Assalomu alaykum, Alisher! Tish plomba xizmatimiz 150,000 dan 300,000 so'mgacha. Plomba turi va tishning holatiga qarab narx o'zgarishi mumkin. Konsultatsiyaga yozilmoqchimisiz? 😊",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: "replied",
  },
  {
    id: "msg-2",
    senderId: "ig-user-2",
    senderName: "Madina",
    content: "Ish vaqtingiz qachandan qachagacha?",
    aiResponse:
      "Assalomu alaykum, Madina! Bizning ish vaqtimiz: Dushanba-Shanba, 9:00 dan 18:00 gacha. Yakshanba kuni dam olamiz. Qaysi kunga yozilmoqchisiz? 📅",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    status: "replied",
  },
  {
    id: "msg-3",
    senderId: "ig-user-3",
    senderName: "Jasur",
    content: "Implant o'rnatish mumkinmi?",
    aiResponse:
      "Assalomu alaykum, Jasur! Ha, albatta! Implant xizmatimiz mavjud. Narxi 3,000,000 dan 5,000,000 so'mgacha. Avval konsultatsiya o'tkaziladi va sizga mos implant turi tanlanadi. Qo'shimcha savollaringiz bormi? 🦷",
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    status: "delivered",
  },
  {
    id: "msg-4",
    senderId: "ig-user-4",
    senderName: "Nilufar",
    content: "Manzilga qanday borish mumkin?",
    aiResponse:
      "Assalomu alaykum, Nilufar! Bizning manzilimiz: Toshkent shahri, Amir Temur ko'chasi 100-uy. Biz Amir Temur metro bekatidan 5 daqiqalik yurish masofasida joylashganmiz. 📍",
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    status: "read",
  },
  {
    id: "msg-5",
    senderId: "ig-user-5",
    senderName: "Bobur",
    content: "Breketlar necha oyda natija beradi?",
    aiResponse:
      "Assalomu alaykum, Bobur! Breketlar odatda 12-24 oy davomida natija beradi. Bu tishlarning holati va tuzatish darajasiga bog'liq. Bizning narxlarimiz 5,000,000 dan 10,000,000 so'mgacha. Birinchi konsultatsiyani belgilasak, aniqroq muddatni ayta olamiz! 😊",
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    status: "replied",
  },
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Handle OAuth callback parameters
  useEffect(() => {
    const connected = searchParams.get("connected");
    const instagramId = searchParams.get("instagramId");
    const pageId = searchParams.get("pageId");

    if (connected === "true") {
      setUser((prev: User) => ({
        ...prev,
        instagramConnected: true,
        instagramId: instagramId || prev.instagramId,
        pageId: pageId || prev.pageId,
      }));
      
      // Clean up URL
      const newUrl = window.location.pathname;
      router.replace(newUrl);
    }
  }, [searchParams, router]);

  const connectInstagram = useCallback(() => {
    setUser((prev: User) => ({
      ...prev,
      instagramConnected: true,
    }));
  }, []);

  const disconnectInstagram = useCallback(() => {
    setUser((prev: User) => ({
      ...prev,
      instagramConnected: false,
      instagramId: undefined,
      pageId: undefined,
      aiEnabled: false,
    }));
  }, []);

  const updatePrompt = useCallback((prompt: string) => {
    setUser((prev: User) => ({ ...prev, aiPrompt: prompt }));
  }, []);

  const toggleAI = useCallback(() => {
    setUser((prev: User) => ({ ...prev, aiEnabled: !prev.aiEnabled }));
  }, []);

  const isTrialExpired = !user.isPaid && user.trialDaysLeft <= 0;

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        messages,
        setMessages,
        connectInstagram,
        disconnectInstagram,
        updatePrompt,
        toggleAI,
        isTrialExpired,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
