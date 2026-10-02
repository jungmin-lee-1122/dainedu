// ═══════════════════════════════════════════════════════════
//  방문 기록 받기
//
//  브라우저가 페이지를 열 때 이 주소로 한 번 알려줍니다.
//  도시·지역은 Vercel 이 요청 헤더에 넣어주는 값을 그대로 씁니다.
//  (IP 주소는 저장하지 않습니다)
// ═══════════════════════════════════════════════════════════
import { NextResponse } from "next/server";
import { logVisit } from "@/lib/visits";
import { readGeo } from "@/lib/geo";

export const dynamic = "force-dynamic";

/** 검색 로봇·크롤러인지 (구글·네이버·다음·빙 등) */
const BOT =
  /bot|crawler|crawl|spider|slurp|archiver|facebookexternalhit|lighthouse|headless|preview|monitor|uptime|curl|wget|python-requests|axios|node-fetch|yeti|daum|naver|googleother|adsbot|mediapartners|bingpreview|petalbot|semrush|ahrefs|mj12/i;

function isBot(ua: string) {
  if (!ua) return true; // 브라우저라면 보통 값이 있습니다
  return BOT.test(ua);
}

/** 헤더 값은 한글 도시명이 퍼센트 인코딩되어 올 수 있어 되돌립니다. */
function decode(v: string | null) {
  if (!v) return "";
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

export async function POST(request: Request) {
  const h = request.headers;

  const body = (await request.json().catch(() => ({}))) as {
    path?: unknown;
    referrer?: unknown;
  };

  const path = String(body.path ?? "").slice(0, 300) || "/";
  // 관리자 화면은 기록하지 않습니다.
  if (path.startsWith("/admin")) return NextResponse.json({ ok: true, skipped: true });

  const ua = h.get("user-agent") ?? "";

  // 검색 로봇·크롤러는 방문자가 아니므로 기록하지 않습니다.
  if (isBot(ua)) return NextResponse.json({ ok: true, skipped: "bot" });

  const device = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) ? "모바일" : "PC";

  // 우리 사이트 안에서 이동한 경우는 유입 경로로 치지 않습니다.
  let referrer = String(body.referrer ?? "").slice(0, 300);
  try {
    const host = h.get("host") ?? "";
    if (referrer && host && new URL(referrer).host.includes(host.split(":")[0])) referrer = "";
  } catch {
    /* 주소 형식이 아니면 그대로 둡니다 */
  }

  const geo = readGeo(h);

  await logVisit({
    path,
    city: geo.city,
    region: geo.region,
    country: geo.country,
    device,
    referrer,
  }).catch(() => {
    /* 기록에 실패해도 방문자에게는 아무 영향이 없습니다 */
  });

  return NextResponse.json({ ok: true });
}
