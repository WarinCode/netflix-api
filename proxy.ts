import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "./stack/server";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { ServerUser } from "@stackframe/stack";
import { ApiKey, ApiKeys } from "@/app/_types";

export const config = {
  matcher: "/api/:path*",
};

export async function proxy(request: NextRequest) {
  const headersList: ReadonlyHeaders = await headers();
  const userId: string | null = headersList.get("Netflix-User-ID");
  const apiKey: string | null = headersList.get("Netflix-API-Key");

  try {
    if (!userId || !apiKey)
      return NextResponse.json(
        { message: "ไม่มีการยืนยันตัวตนของผู้ใช้งาน!" },
        { status: 401 }
      );
    if (apiKey.length !== 102)
      return NextResponse.json(
        { message: "API Key ไม่ถูกต้อง!" },
        { status: 403 }
      );

    const user: ServerUser | null = await stackServerApp.getUser(userId);
    if (!user)
      return NextResponse.json(
        { message: "id ยืนยันตัวตนของผู้ใช้งานไม่ถูกต้อง!" },
        { status: 403 }
      );

    const apiKeys: ApiKeys = await user.listApiKeys();
    const matchingKeys: ApiKeys = apiKeys.filter(
      (k: ApiKey): boolean =>
        k.userId === userId &&
        apiKey.length === 102 &&
        apiKey.endsWith(k.value.lastFour)
    );
    const key: ApiKey | undefined = matchingKeys.pop();

    if (key && key.isValid()) return NextResponse.next();

    return NextResponse.json(
      { message: "ไม่รับอนุญาตให้เข้าถึงข้อมูล!" },
      { status: 403 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
