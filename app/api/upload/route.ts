// ═══════════════════════════════════════════════════════════
//  이미지 업로드 (Vercel Blob)
//  관리자 화면에서 사진을 고르면 여기로 올라가고, 주소를 돌려줍니다.
//  환경변수 BLOB_READ_WRITE_TOKEN 이 필요합니다.
// ═══════════════════════════════════════════════════════════
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isLoggedIn } from "@/lib/session";

export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

export async function POST(request: Request) {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "no_file" }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { ok: false, error: "type", message: "이미지 파일만 올릴 수 있습니다." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: "size", message: "8MB 이하 이미지만 올릴 수 있습니다." },
      { status: 400 }
    );
  }

  const folder = String(form?.get("folder") || "uploads");
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const key = `${folder}/${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  try {
    // 사이트 방문자가 볼 사진이므로 반드시 public 저장소여야 합니다.
    const blob = await put(key, file, { access: "public", addRandomSuffix: false });
    return NextResponse.json({ ok: true, url: blob.url });
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    let message = "사진을 올리지 못했습니다. " + detail;

    if (/no token|BLOB_READ_WRITE_TOKEN|not found/i.test(detail)) {
      message =
        "사진 저장소가 연결되지 않았습니다. Vercel → Storage 에서 Blob 저장소를 " +
        "public 으로 만들고 프로젝트에 연결한 뒤 다시 배포해 주세요.";
    } else if (/private/i.test(detail)) {
      message =
        "연결된 Blob 저장소가 private 입니다. 사이트에 보이는 사진은 public 저장소에 " +
        "올려야 합니다. public 저장소를 새로 만들어 연결해 주세요.";
    }

    console.error("[사진 업로드 실패]", detail);
    return NextResponse.json({ ok: false, error: "upload", message }, { status: 502 });
  }
}
