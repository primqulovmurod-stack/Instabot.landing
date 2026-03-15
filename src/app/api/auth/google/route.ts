import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const redirectUri = `${baseUrl}/api/auth/google/callback`;
  
  if (!clientId || clientId === "your_google_client_id_here") {
    console.warn("Google Client ID not configured. Entering Demo Mode.");
    // In demo mode, we just redirect directly to the callback with a mock user
    return NextResponse.redirect(`${baseUrl}/api/auth/google/callback?code=mock_code_for_demo`);
  }

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile&access_type=offline&prompt=consent`;

  return NextResponse.redirect(url);
}
