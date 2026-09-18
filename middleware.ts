// ═══════════════════════════════════════════════════════════
//  /admin 경로 보호
//  로그인하지 않았으면 /admin/login 으로 보냅니다.
// ═══════════════════════════════════════════════════════════
import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifyToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ok = await verifyToken(request.cookies.get(SESSION_COOKIE)?.value);

  // 로그인 페이지 — 이미 로그인했으면 관리자 홈으로
  if (pathname === "/admin/login") {
    if (ok) return NextResponse.redirect(new URL("/admin", request.url));
    return NextResponse.next();
  }

  if (!ok) {
    const to = new URL("/admin/login", request.url);
    return NextResponse.redirect(to);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
