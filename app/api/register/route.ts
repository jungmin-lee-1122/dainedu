import { NextResponse } from "next/server";

// 사전등록 폼 접수 → 구글 시트 저장.
// 구글 Apps Script 웹 앱 URL을 환경변수 SHEET_WEBHOOK_URL 에 넣어두면,
// 접수가 들어올 때마다 시트에 한 줄씩 자동 기록됩니다.
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 최소 검증
    const name = String(data?.name || "").trim();
    const phone = String(data?.phone || "").trim();
    if (!name || !/^01[0-9][0-9-]{7,11}$/.test(phone)) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    // 접수 로그 (Vercel Logs에서도 확인 가능)
    console.log("[사전등록]", JSON.stringify(data));

    const webhook = process.env.SHEET_WEBHOOK_URL;
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        return NextResponse.json({ ok: false, error: "sheet" }, { status: 502 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
