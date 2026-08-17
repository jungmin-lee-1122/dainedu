// (사용하지 않음) 학교 검색 API — 지역/학년 드롭다운 + 학교명 직접 입력 방식으로 변경되어 비활성화했습니다.
// 필요 없으면 app/api/schools 폴더를 통째로 지우셔도 됩니다.
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: false, error: "disabled" }, { status: 404 });
}
