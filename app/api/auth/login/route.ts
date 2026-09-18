import { NextResponse } from "next/server";
import { SESSION_COOKIE, checkPassword, makeToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    if (typeof password !== "string" || !checkPassword(password)) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: SESSION_COOKIE,
      value: await makeToken(),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 86400,
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
