import { NextRequest, NextResponse } from "next/server";
import { IgApiClient } from "instagram-private-api";
import { pendingSessions } from "@/lib/ig-state";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const ig = new IgApiClient();
    ig.state.generateDevice(username);

    try {
      await ig.simulate.preLoginFlow();
      const auth = await ig.account.login(username, password);
      
      return NextResponse.json({ 
        success: true, 
        instagramId: auth.pk.toString(),
        username: auth.username
      });

    } catch (error: any) {
      // 2FA required
      if (error.name === 'IgLoginTwoFactorRequiredError') {
        const state = await ig.state.serialize();
        pendingSessions.set(username, { 
          state, 
          password,
          type: '2fa',
          twoFactorInfo: error.response.body.two_factor_info 
        });

        return NextResponse.json({ 
          requiresVerification: true,
          message: "2FA kodi talab qilinadi."
        });
      }

      // Checkpoint/Challenge triggered
      if (error.name === 'IgCheckpointError') {
        // Automatically request SMS/Email challenge if possible
        await ig.challenge.auto(true); 
        
        const state = await ig.state.serialize();
        pendingSessions.set(username, { 
          state, 
          password,
          type: 'challenge'
        });

        return NextResponse.json({ 
          requiresVerification: true,
          message: "Instagram sizga tasdiqlash kodini yubordi."
        });
      }

      // Specific "Bad Password" or security block
      if (error.name === 'IgLoginBadPasswordError') {
        return NextResponse.json({ 
          error: "Parol xato yoki Instagram xavfsizlik yuzasidan kirishni chekladi. Iltimos, parolingizni tekshiring." 
        }, { status: 401 });
      }

      console.error("IG Login Error Full:", error);
      return NextResponse.json({ 
        error: error.message || "Xatolik yuz berdi. Iltimos, birozdan so'ng urinib ko'ring." 
      }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
