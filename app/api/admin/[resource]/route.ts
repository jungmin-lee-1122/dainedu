// ═══════════════════════════════════════════════════════════
//  관리자 콘텐츠 공용 API
//  GET    /api/admin/teachers        → 목록
//  POST   /api/admin/teachers        → 추가/수정 (id 있으면 수정)
//  DELETE /api/admin/teachers?id=... → 삭제
//  PATCH  /api/admin/teachers        → 순서 변경 { ids: [...] }
// ═══════════════════════════════════════════════════════════
import { NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import {
  listContents,
  saveContent,
  deleteContent,
  reorderContents,
  newId,
  hasDb,
} from "@/lib/db";

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
