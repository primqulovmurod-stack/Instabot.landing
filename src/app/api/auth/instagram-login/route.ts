import { NextRequest, NextResponse } from "next/server";
import { IgApiClient } from "instagram-private-api";
import { pendingSessions } from "@/lib/ig-state";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const ig = new IgApiClient();
    ig.state.generateDevice(username);

    // MOCK LOGIN FOR TESTING LOCALLY TO BYPASS INSTAGRAM BLOCKS
    if (password.endsWith("__test")) {
      const instagramId = "1234567890_" + username.length;
      console.log(`[DEBUG] Mock login for ${username}, id: ${instagramId}`);
      
      try {
        // Save to Database even in mock mode
        const updatedUser = await prisma.user.upsert({
          where: { externalId: "USR-7D2K9X" },
          update: {
            instagramConnected: true,
            instagramId: instagramId,
            username: username
          },
          create: {
            externalId: "USR-7D2K9X",
            instagramConnected: true,
            instagramId: instagramId,
            username: username
          }
        });
        console.log(`[DEBUG] DB Update Success:`, updatedUser);
      } catch (dbError) {
        console.error(`[DEBUG] DB Update Failed:`, dbError);
      }

      return NextResponse.json({ 
        success: true, 
        instagramId: instagramId,
        username: username
      });
    }

    try {
      await ig.simulate.preLoginFlow();
      const auth = await ig.account.login(username, password);
      
      // Success - Save to Database
      try {
        await prisma.user.upsert({
          where: { externalId: "USR-7D2K9X" },
          update: {
            instagramConnected: true,
            instagramId: auth.pk.toString(),
            username: auth.username
          },
          create: {
            externalId: "USR-7D2K9X",
            instagramConnected: true,
            instagramId: auth.pk.toString(),
            username: auth.username
          }
        });
        console.log(`[DEBUG] Real login DB update success for ${auth.username}`);
      } catch (dbError) {
        console.error(`[DEBUG] Real login DB update failed:`, dbError);
      }
      
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
          error: "Instagram shubxali faollik sifiqatda blokladi yoki parol xato. Telefoningizda Instagramni ochib 'Bu men edim' tugmasini bosing yoki parol oxiriga __test qo'shib sinab ko'ring." 
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
