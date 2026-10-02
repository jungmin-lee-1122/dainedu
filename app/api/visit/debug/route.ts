// ═══════════════════════════════════════════════════════════
//  지역 정보 진단 — 지금 내 접속에 어떤 지역 헤더가 들어오는지
//  관리자로 로그인한 경우에만 볼 수 있습니다.
// ═══════════════════════════════════════════════════════════
import { NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/session";
import { readGeo, geoHeaders } from "@/lib/geo";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const h = request.headers;
  return NextResponse.json({
    ok: true,
    판정: readGeo(h),
    들어온_헤더: geoHeaders(h),
  });
}
