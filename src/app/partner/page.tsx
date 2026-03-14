"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { PartnerView } from "@/components/partner-view";
import { ChatTest } from "@/components/chat-test";
import { MessageLogs } from "@/components/message-logs";
import { SettingsPanel } from "@/components/settings-panel";
import { PartnerPanel } from "@/components/partner-panel";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("partner");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "partner":
        return <PartnerView />;
      case "chat-test":
        return <ChatTest />;
      case "logs":
        return <MessageLogs />;
      case "partner":
        return <PartnerPanel />;
      case "settings":
        return <SettingsPanel />;
      default:
        return <PartnerView />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "partner":
        return "Hamkor paneli";
      case "chat-test":
        return "AI Sinov Rejimi";
      case "logs":
        return "Xabarlar";
      case "partner":
        return "Hamkorlik";
      case "settings":
        return "Sozlamalar";
      default:
        return "Hamkor paneli";
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Responsive Header */}
        <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-lg lg:ml-64 lg:has-[+[aside.w-16]]:ml-16">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Trigger */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                }
              />
                <SheetContent side="left" className="p-0 w-64 border-r-0">
                  <SheetTitle className="sr-only">Navigatsiya menyusi</SheetTitle>
                  <Sidebar activeTab={activeTab} onTabChange={handleTabChange} isMobile />
                </SheetContent>
              </Sheet>
              <h1 className="text-lg font-semibold truncate">{getPageTitle()}</h1>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 lg:ml-64 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
