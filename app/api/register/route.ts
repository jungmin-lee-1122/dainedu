import { NextResponse } from "next/server";

// 사전등록 폼 접수 → 구글 시트 저장.
// 구글 Apps Script 웹 앱 URL을 환경변수 SHEET_WEBHOOK_URL 에 넣어야 저장됩니다.
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 최소 검증
    const name = String(data?.name || "").trim();
    const phone = String(data?.phone || "").trim();
    if (!name || !/^01[0-9][0-9-]{7,11}$/.test(phone)) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    console.log("[사전등록]", JSON.stringify(data));

    const webhook = process.env.SHEET_WEBHOOK_URL;
    if (!webhook) {
      // 환경변수가 비어있음 → 저장 불가 (솔직하게 실패 반환)
      console.error("SHEET_WEBHOOK_URL is not set");
      return NextResponse.json({ ok: false, error: "no_webhook" }, { status: 500 });
    }

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      redirect: "follow",
    });

    const text = await res.text();
    let sheetOk = false;
    try {
      sheetOk = JSON.parse(text)?.ok === true;
    } catch {
      sheetOk = false;
    }

    if (!res.ok || !sheetOk) {
      console.error("Sheet save failed:", res.status, text.slice(0, 300));
      return NextResponse.json({ ok: false, error: "sheet" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
