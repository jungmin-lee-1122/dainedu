import { NextResponse } from "next/server";

// 설정 점검용 — 브라우저에서 /api/reserve 주소를 열면 상태를 알려줍니다.
export async function GET() {
  const url = process.env.RESERVE_WEBHOOK_URL || "";
  return NextResponse.json({
    ok: true,
    웹훅주소설정됨: Boolean(url),
    주소형태: url
      ? url.includes("/exec")
        ? "정상 (/exec)"
        : "잘못됨 — 끝이 /exec 이어야 합니다"
      : "환경변수 RESERVE_WEBHOOK_URL 이 비어 있습니다",
    주소앞부분: url ? url.slice(0, 45) + "…" : "",
  });
}

// 설명회 예약 접수 → 구글 시트 저장
// 구글 Apps Script 웹 앱 URL을 환경변수 RESERVE_WEBHOOK_URL 에 넣어야 저장됩니다.
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const eventTitle = String(data?.eventTitle || "").trim();
    const who = String(data?.who || "").trim();
    const name = String(data?.name || "").trim();
    const phone = String(data?.phone || "").trim();
    const school = String(data?.school || "").trim();
    const grade = String(data?.grade || "").trim();
    const track = String(data?.track || "").trim();
    const companion = String(data?.companion || "").trim();
    const source = String(data?.source || "").trim();

    if (
      !eventTitle ||
      !who ||
      !name ||
      !school ||
      !grade ||
      !track ||
      !companion ||
      !source ||
      !/^01[0-9]-[0-9]{3,4}-[0-9]{4}$/.test(phone)
    ) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    console.log("[설명회예약]", JSON.stringify(data));

    const webhook = process.env.RESERVE_WEBHOOK_URL;
    if (!webhook) {
      console.error("RESERVE_WEBHOOK_URL is not set");
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
      return NextResponse.json(
        { ok: false, error: "sheet", status: res.status, detail: text.slice(0, 200) },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
