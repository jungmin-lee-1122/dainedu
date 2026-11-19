import { NextResponse } from "next/server";

// ═══════════════════════════════════════════════════════════
//  2028 재수선행반 — 첫 화면 간편 상담 신청 → 구글 시트 저장
//
//  온라인 상담(/api/consult)과 같은 방식으로 보냅니다.
//   · 재수선행반 전용 시트: 환경변수 JAESU_CONSULT_WEBHOOK_URL
//     (없으면 온라인 상담 시트 CONSULT_WEBHOOK_URL 로 보냅니다)
//   · 다만 입력 항목이 적어서 검사 기준만 따로 둡니다
//     (온라인 상담 API 는 이메일·주소·비밀번호 등이 필수라 그대로는 못 씁니다)
//   · sheetTab: "재수선행반" 을 함께 보내, 시트의 "재수선행반" 탭에 쌓이게 합니다
//     → 시트 쪽 Apps Script 가 sheetTab 을 읽도록 한 번 갱신되어 있어야 합니다
//       (google-apps-script-consult.gs 참고). 갱신 전에는 기존 상담 탭에
//       관심과정 "2028 재수선행반" 으로 들어갑니다.
//
//  ※ 기존 /api/consult 는 손대지 않았습니다.
// ═══════════════════════════════════════════════════════════
const ROLES = ["학부모", "학생"];
const GRADES = ["고3", "재수", "N수"];

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const role = String(data?.role || "").trim();
    const name = String(data?.name || "").trim().slice(0, 40);
    const phone = String(data?.phone || "").trim();
    const grade = String(data?.grade || "").trim();
    const content = String(data?.content || "").trim().slice(0, 1000);
    const agree = data?.agree === true || data?.agree === "on";

    if (
      !ROLES.includes(role) ||
      !name ||
      !/^01[0-9]-[0-9]{3,4}-[0-9]{4}$/.test(phone) ||
      !GRADES.includes(grade) ||
      !agree
    ) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    // 재수선행반 전용 시트 주소가 있으면 그쪽으로, 없으면 온라인 상담 시트로 보냅니다.
    const webhook = (
      process.env.JAESU_CONSULT_WEBHOOK_URL ||
      process.env.CONSULT_WEBHOOK_URL ||
      ""
    ).trim();
    if (!webhook) {
      console.error("JAESU_CONSULT_WEBHOOK_URL / CONSULT_WEBHOOK_URL is not set");
      return NextResponse.json({ ok: false, error: "no_webhook" }, { status: 500 });
    }

    // 온라인 상담과 같은 항목 이름으로 보냅니다(없는 항목은 빈 칸).
    const payload = {
      sheetTab: "재수선행반",
      role,
      name,
      gender: "",
      phone,
      email: "",
      grade,
      region: "",
      school: "",
      zipcode: "",
      address: "",
      addressDetail: "",
      course: "2028 재수선행반",
      source: "재수선행반 페이지",
      password: "",
      title: "[2028 재수선행반] 상담 신청",
      content,
    };

    console.log("[재수선행반 상담]", JSON.stringify({ role, grade, hasContent: !!content }));

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
