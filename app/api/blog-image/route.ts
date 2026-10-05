// ═══════════════════════════════════════════════════════════
//  블로그 사진 중계
//
//  네이버 이미지 서버는 외부 사이트에서 직접 불러오는 것을 막습니다.
//  그래서 우리 서버가 대신 받아와 전달합니다.
//  (네이버 이미지 주소만 허용 — 아무 주소나 중계하지 않습니다)
// ═══════════════════════════════════════════════════════════
import { NextResponse } from "next/server";

export const revalidate = 86400;

const ALLOWED = /(^|\.)(pstatic\.net|naver\.net|naver\.com)$/i;

export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("u") ?? "";
  if (!raw) return new NextResponse("no url", { status: 400 });

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return new NextResponse("bad url", { status: 400 });
  }
  if (target.protocol !== "https:" || !ALLOWED.test(target.hostname)) {
    return new NextResponse("not allowed", { status: 403 });
  }

  try {
    const res = await fetch(target.toString(), {
      headers: {
        // 네이버에서 온 요청처럼 보여야 사진을 내어 줍니다
        Referer: "https://blog.naver.com/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
        Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
      },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return new NextResponse("upstream " + res.status, { status: 502 });

    const type = res.headers.get("content-type") ?? "image/jpeg";
    if (!type.startsWith("image/")) return new NextResponse("not image", { status: 415 });

    return new NextResponse(res.body, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable",
      },
    });
  } catch {
    return new NextResponse("fetch failed", { status: 502 });
  }
}
