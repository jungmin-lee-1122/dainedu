// ═══════════════════════════════════════════════════════════
//  블로그 연동 관리 — 글 목록 보기 / 홈페이지에서만 숨기기
//
//  네이버 원글은 건드리지 않습니다. 우리 쪽에 "숨김 표시"만 남깁니다.
// ═══════════════════════════════════════════════════════════
import { NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/session";
import { hasDb, saveContent, deleteContent } from "@/lib/db";
import { getBlogPosts, getHiddenIds, BLOG_URL } from "@/lib/blog";
import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

async function guard() {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  return null;
}

/** 목록 — 블로그 글 + 숨김 여부 */
export async function GET() {
  const bad = await guard();
  if (bad) return bad;

  const [posts, hidden] = await Promise.all([getBlogPosts(), getHiddenIds()]);
  return NextResponse.json({
    ok: true,
    blogUrl: BLOG_URL,
    hasDb: hasDb(),
    items: posts.map((p) => ({ ...p, hidden: hidden.has(p.id) })),
  });
}

/** 숨기기 / 다시 보이기 */
export async function POST(request: Request) {
  const bad = await guard();
  if (bad) return bad;
  if (!hasDb()) {
    return NextResponse.json(
      { ok: false, error: "no_db", message: "DATABASE_URL 이 설정되지 않았습니다." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    id?: unknown;
    title?: unknown;
    hidden?: unknown;
  } | null;

  const id = String(body?.id ?? "").trim();
  if (!id) return NextResponse.json({ ok: false, error: "no_id" }, { status: 400 });

  if (body?.hidden) {
    await saveContent("blogHidden", id, { title: String(body.title ?? "") }, 0);
  } else {
    await deleteContent("blogHidden", id);
  }

  try {
    revalidateTag("blog-feed", "max");
  } catch {
    /* 캐시를 못 지워도 15분 뒤 자동으로 갱신됩니다 */
  }

  return NextResponse.json({ ok: true });
}

/** 블로그에서 지금 바로 다시 읽어오기 */
export async function PATCH() {
  const bad = await guard();
  if (bad) return bad;
  try {
    revalidateTag("blog-feed", "max");
  } catch {
    /* 무시 */
  }
  return NextResponse.json({ ok: true });
}
