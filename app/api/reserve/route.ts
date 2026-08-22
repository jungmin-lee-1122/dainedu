import { NextResponse } from "next/server";

// 항상 실시간으로 실행 (빌드 시점에 고정되지 않도록)
export const dynamic = "force-dynamic";

/**
 * 설정 점검용
 *  /api/reserve        → 환경변수 상태만 확인
 *  /api/reserve?test=1 → 실제로 시트에 테스트 한 줄을 보내보고 결과를 알려줍니다
 */
export async function GET(request: Request) {
  const url = (process.env.RESERVE_WEBHOOK_URL || "").trim();
  const wantTest = new URL(request.url).searchParams.get("test") === "1";

  const out: Record<string, unknown> = {
    웹훅주소설정됨: Boolean(url),
    주소형태: url
      ? url.includes("/exec")
        ? "정상 (/exec)"
        : "잘못됨 — 끝이 /exec 이어야 합니다"
      : "환경변수 RESERVE_WEBHOOK_URL 이 비어 있습니다",
    주소앞부분: url ? url.slice(0, 45) + "…" : "",
  };

  if (!wantTest) {
    out.안내 = "실제 저장까지 시험하려면 주소 뒤에 ?test=1 을 붙여 다시 여세요.";
    return NextResponse.json(out);
  }

  if (!url) {
    out.시험결과 = "환경변수가 없어 시험할 수 없습니다.";
    return NextResponse.json(out);
  }

  const 테스트값 = {
    eventId: "0",
    eventTitle: "[테스트] 연결 확인",
    eventDate: "테스트",
    who: "학부모",
    name: "연결테스트",
    phone: "010-0000-0000",
    school: "테스트고등학교",
    grade: "고3",
    track: "인문",
    companion: "본인만 참석",
    source: "기타",
    agreeMarketing: "미동의",
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(테스트값),
      redirect: "follow",
    });
    const text = await res.text();
    let parsed: unknown = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = null;
    }

    out.시험결과 = {
      상태코드: res.status,
      최종주소: res.url,
      구글응답: parsed ?? text.slice(0, 400),
      판정:
        parsed && (parsed as { ok?: boolean }).ok === true
          ? "성공 — 시트에 [테스트] 줄이 들어갔는지 확인해 보세요."
          : text.includes("<html") || text.includes("<!DOCTYPE")
            ? "실패 — 구글 로그인 페이지가 돌아왔습니다. Apps Script 액세스 권한을 '모든 사용자'로 바꾸고 새 버전으로 다시 배포하세요."
            : "실패 — 위 '구글응답' 내용이 원인입니다.",
    };
  } catch (e) {
    out.시험결과 = { 오류: String(e), 판정: "실패 — 주소로 연결 자체가 되지 않습니다." };
  }

  return NextResponse.json(out);
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

    // 붙여넣을 때 앞뒤 공백·줄바꿈이 딸려오는 경우가 잦아 잘라냅니다.
    const webhook = (process.env.RESERVE_WEBHOOK_URL || "").trim();
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
