import { NextResponse } from "next/server";

// 온라인 상담 접수 → 구글 시트 저장
// 구글 Apps Script 웹 앱 URL을 환경변수 CONSULT_WEBHOOK_URL 에 넣어야 저장됩니다.
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const name = String(data?.name || "").trim();
    const phone = String(data?.phone || "").trim();
    const title = String(data?.title || "").trim();
    const content = String(data?.content || "").trim();
    const password = String(data?.password || "").trim();
    const email = String(data?.email || "").trim();
    const school = String(data?.school || "").trim();
    const grade = String(data?.grade || "").trim();
    const region = String(data?.region || "").trim();

    if (
      !name ||
      !school ||
      !grade ||
      !region ||
      !/^01[0-9]-[0-9]{4}-[0-9]{4}$/.test(phone) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !title ||
      !content ||
      !/^[0-9]{4}$/.test(password)
    ) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    console.log("[온라인상담]", JSON.stringify({ ...data, password: "****" }));

    const webhook = process.env.CONSULT_WEBHOOK_URL;
    if (!webhook) {
      console.error("CONSULT_WEBHOOK_URL is not set");
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
