import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/lib/user-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InstaBot AI — Instagram Chat Agent",
  description:
    "Instagram biznes akkauntlari uchun sun'iy intellekt asosida avtomatlashtirilgan chat-agent. Mijozlar savollariga real vaqtda javob bering.",
  keywords: [
    "Instagram",
    "AI",
    "chat-agent",
    "chatbot",
    "automation",
    "stomatologiya",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Suspense fallback={null}>
            <UserProvider>
              <TooltipProvider>
                {children}
              </TooltipProvider>
            </UserProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
