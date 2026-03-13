import { NextRequest, NextResponse } from "next/server";
import { IgApiClient } from "instagram-private-api";
import { pendingSessions } from "@/lib/ig-state";

export async function POST(req: NextRequest) {
  try {
    const { username, code } = await req.json();

    if (!username || !code) {
      return NextResponse.json({ error: "Username and code required" }, { status: 400 });
    }

    const session = pendingSessions.get(username);
    if (!session) {
      return NextResponse.json({ error: "Sessiya muddati o'tgan. Qaytadan kiring." }, { status: 400 });
    }

    const ig = new IgApiClient();
    await ig.state.deserialize(session.state);

    try {
      let auth;
      if (session.type === '2fa') {
        auth = await ig.account.twoFactorLogin({
          username,
          verificationCode: code,
          twoFactorIdentifier: session.twoFactorInfo.two_factor_identifier,
          verificationMethod: '1', // SMS
          trustThisDevice: '1',
        });
      } else {
        // Challenge verification
        await ig.challenge.sendSecurityCode(code);
        // After verifying challenge, we usually need to login again
        auth = await ig.account.login(username, session.password);
      }

      pendingSessions.delete(username);

      return NextResponse.json({ 
        success: true, 
        instagramId: auth.pk.toString(),
        username: auth.username
      });

    } catch (error: any) {
      console.error("IG Verify Error:", error);
      return NextResponse.json({ error: "Kod noto'g'ri kiritildi." }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
