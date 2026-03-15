import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    let googleUser;

    if (code === "mock_code_for_demo") {
      googleUser = {
        email: "demo@instabot.uz",
        name: "Dev Demo User",
      };
    } else {
      // 1. Exchange code for tokens
      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          client_id: clientId!,
          client_secret: clientSecret!,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      });

      const tokens = await tokenRes.json();
      if (!tokenRes.ok) throw new Error(tokens.error_description || "Token exchange failed");

      // 2. Get user info from Google
      const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });

      googleUser = await userRes.json();
      if (!userRes.ok) throw new Error("Failed to get user info");
    }

    // 3. Find or create user in DB
    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    if (!user) {
      const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
      const externalId = `USR-${randomSuffix}`;

      user = await prisma.user.create({
        data: {
          externalId,
          email: googleUser.email,
          name: googleUser.name,
          registrationMethod: "google",
          trialExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days trial
        },
      });
    }

    // 4. Redirect to client-side callback handler to set localStorage
    const response = NextResponse.redirect(new URL(`/auth-callback?userId=${user.externalId}`, req.url));
    return response;

  } catch (error: any) {
    console.error("🔥 GOOGLE AUTH CRITICAL ERROR:", error.message || error);
    return NextResponse.redirect(new URL("/?error=auth_failed&reason=server_error", req.url));
  }
}
