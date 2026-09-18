// ═══════════════════════════════════════════════════════════
//  관리자 콘텐츠 공용 API
//  GET    /api/admin/teachers        → 목록
//  POST   /api/admin/teachers        → 추가/수정 (id 있으면 수정)
//  DELETE /api/admin/teachers?id=... → 삭제
//  PATCH  /api/admin/teachers        → 순서 변경 { ids: [...] }
// ═══════════════════════════════════════════════════════════
import { NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/session";
import {
  listContents,
  saveContent,
  deleteContent,
  reorderContents,
  newId,
  hasDb,
} from "@/lib/db";
import { seedFor } from "@/lib/seed";

export const dynamic = "force-dynamic";

/** 관리 가능한 종류 — 여기 없는 이름은 거부합니다. */
const RESOURCES: Record<string, string> = {
  teachers: "teacher",
  events: "event",
  notices: "notice",
  media: "media",
};

async function guard(resource: string) {
  if (!RESOURCES[resource]) {
    return NextResponse.json({ ok: false, error: "unknown_resource" }, { status: 404 });
  }
  if (!(await isLoggedIn())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!hasDb()) {
    return NextResponse.json(
      { ok: false, error: "no_db", message: "DATABASE_URL 이 설정되지 않았습니다." },
      { status: 503 }
    );
  }
  return null;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resource: string }> }
) {
  const { resource } = await params;
  const bad = await guard(resource);
  if (bad) return bad;

  const rows = await listContents(resource);
  return NextResponse.json({
    ok: true,
    items: rows.map((r) => ({ id: r.id, ...r.data })),
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ resource: string }> }
) {
  const { resource } = await params;
  const bad = await guard(resource);
  if (bad) return bad;

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const { id: rawId, ...data } = body as Record<string, unknown>;
  const id = typeof rawId === "string" && rawId ? rawId : newId(RESOURCES[resource]);

  const existing = await listContents(resource);
  const found = existing.findIndex((r) => r.id === id);
  const sort = found >= 0 ? existing[found].sort : existing.length;

  const row = await saveContent(resource, id, data, sort);
  return NextResponse.json({ ok: true, item: { id: row.id, ...row.data } });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ resource: string }> }
) {
  const { resource } = await params;
  const bad = await guard(resource);
  if (bad) return bad;

  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "no_id" }, { status: 400 });

  await deleteContent(resource, id);
  return NextResponse.json({ ok: true });
}

/**
 * PUT — "현재 사이트 내용 불러오기"
 * 코드에 있는 기본 내용을 DB 로 옮깁니다. 이미 항목이 있으면 거절합니다.
 */
export async function PUT(
  _req: Request,
  { params }: { params: Promise<{ resource: string }> }
) {
  const { resource } = await params;
  const bad = await guard(resource);
  if (bad) return bad;

  const existing = await listContents(resource);
  if (existing.length > 0) {
    return NextResponse.json(
      { ok: false, error: "not_empty", message: "이미 등록된 항목이 있어 불러오지 않았습니다." },
      { status: 409 }
    );
  }

  const rows = seedFor(resource);
  for (let i = 0; i < rows.length; i++) {
    await saveContent(resource, rows[i].id, rows[i].data, i);
  }
  return NextResponse.json({ ok: true, count: rows.length });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ resource: string }> }
) {
  const { resource } = await params;
  const bad = await guard(resource);
  if (bad) return bad;

  const body = await request.json().catch(() => null);
  const ids = (body as { ids?: unknown })?.ids;
  if (!Array.isArray(ids)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  await reorderContents(resource, ids.map(String));
  return NextResponse.json({ ok: true });
}
