"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Zap, X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ isOpen, onOpenChange }: AuthModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onOpenChange]);

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    router.push("/api/auth/google");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.phone || formData.phone.length < 9) {
      setError("Telefon raqamni to'liq kiriting (kamida 9 raqam)");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: "+998" + formData.phone,
          name: "Foydalanuvchi",
          activityType: "other",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("instabot_user_id", data.userId);
        onOpenChange(false);
        router.push("/partner");
      } else {
        setError(data.error || "Xatolik yuz berdi.");
      }
    } catch (err) {
      setError("Server bilan ulanishda xatolik.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-[420px] bg-background rounded-[2rem] shadow-2xl ring-1 ring-primary/10 animate-in zoom-in-95 fade-in-0 duration-200 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="p-10 space-y-8">
            {/* Header */}
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="bg-primary/10 p-4 rounded-3xl border border-primary/20 relative z-10">
                    <Zap className="h-8 w-8 text-primary fill-current" />
                  </div>
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full -z-0 opacity-50" />
                </div>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">
                Instabot-ga qo&apos;shiling
              </h2>
            </div>

            <div className="space-y-6">
              {/* Google Button */}
              <Button
                variant="outline"
                onClick={handleGoogleLogin}
                className="w-full h-12 rounded-xl border bg-white hover:bg-gray-50 font-medium text-gray-700 flex items-center justify-center gap-3 shadow-sm transition-all dark:bg-white dark:text-gray-700 dark:hover:bg-gray-100"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google orqali davom etish
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground font-medium">yoki</span>
                </div>
              </div>

              {/* Phone form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-muted-foreground ml-1">
                    Telefon raqam orqali
                  </Label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                      +998
                    </span>
                    <Input
                      type="text"
                      placeholder="90 123 45 67"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ phone: e.target.value });
                        setError(null);
                      }}
                      className="h-14 pl-16 pr-6 rounded-2xl border-muted bg-muted/30 focus-visible:ring-primary/20 font-bold"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs font-bold text-destructive text-center">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={loading || formData.phone.length < 9}
                  className="w-full h-14 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 bg-primary hover:bg-primary/90 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    "RO'YXATDAN O'TISH"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
