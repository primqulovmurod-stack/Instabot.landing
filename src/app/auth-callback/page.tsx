"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const userId = searchParams.get("userId");
    const error = searchParams.get("error");

    if (userId) {
      localStorage.setItem("instabot_user_id", userId);
      router.push("/partner");
    } else if (error) {
      router.push("/?error=" + error);
    } else {
      router.push("/");
    }
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="space-y-4 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <h2 className="text-xl font-bold">Avtorizatsiyadan o'tilmoqda...</h2>
        <p className="text-muted-foreground">Iltimos, kuting.</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <AuthCallbackContent />
    </Suspense>
  );
}
