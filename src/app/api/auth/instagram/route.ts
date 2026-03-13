import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    console.error("Meta OAuth Error:", error);
    return NextResponse.redirect(new URL("/?error=auth_failed", req.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const appId = process.env.NEXT_PUBLIC_META_APP_ID;
    const appSecret = process.env.META_APP_SECRET;
    const redirectUri = `${new URL(req.url).origin}/api/auth/instagram`;

    // 1. Exchange code for Short-Lived User Access Token
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&client_secret=${appSecret}&code=${code}`
    );

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error("Token Exchange Error:", tokenData.error);
      return NextResponse.redirect(new URL("/?error=token_exchange_failed", req.url));
    }

    const shortLivedToken = tokenData.access_token;

    // 2. (Optional but Recommended) Exchange for Long-Lived User Access Token (60 days)
    const longLivedResponse = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLivedToken}`
    );
    const longLivedData = await longLivedResponse.json();
    const accessToken = longLivedData.access_token || shortLivedToken;

    // 3. Get User's Pages to find Instagram-linked page
    const pagesResponse = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?access_token=${accessToken}`
    );
    const pagesData = await pagesResponse.json();
    
    // For demo purposes, we'll just take the first page that has an instagram_business_account
    // In a real app, you'd show a list to the user
    let instagramId = null;
    let pageId = null;

    for (const page of pagesData.data || []) {
      const igResponse = await fetch(
        `https://graph.facebook.com/v19.0/${page.id}?fields=instagram_business_account&access_token=${accessToken}`
      );
      const igData = await igResponse.json();
      if (igData.instagram_business_account) {
        instagramId = igData.instagram_business_account.id;
        pageId = page.id;
        break;
      }
    }

    // Redirect back to dashboard with success status
    // In a real app, you'd save these to a database here
    const redirectUrl = new URL("/", req.url);
    redirectUrl.searchParams.set("connected", "true");
    if (instagramId) redirectUrl.searchParams.set("instagramId", instagramId);
    if (pageId) redirectUrl.searchParams.set("pageId", pageId);

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error("OAuth Catch Error:", err);
    return NextResponse.redirect(new URL("/?error=internal_error", req.url));
  }
}
