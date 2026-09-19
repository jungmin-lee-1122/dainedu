// ═══════════════════════════════════════════════════════════
//  이미지 업로드 토큰 발급 (Vercel Blob Client Upload)
//  사진 본문은 이 API를 거치지 않고 브라우저에서 Blob으로 바로 올라갑니다.
//  환경변수 BLOB_READ_WRITE_TOKEN 이 필요합니다.
// ═══════════════════════════════════════════════════════════
import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isLoggedIn } from "@/lib/session";

export const dynamic = "force-dynamic";

const MAX_BYTES = 25 * 1024 * 1024; // 원본 사진도 받을 수 있도록 25MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const SAFE_PATH = /^(teachers|events|notices|media)\/[a-z0-9-]+\.(jpe?g|png|webp|gif|avif)$/i;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HandleUploadBody;
    if (body.type === "blob.generate-client-token" && !(await isLoggedIn())) {
      return NextResponse.json(
        { error: "unauthorized", message: "로그인이 만료되었습니다. 관리자 페이지에 다시 로그인해 주세요." },
        { status: 401 }
      );
    }

    const response = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname) => {
        if (!(await isLoggedIn())) throw new Error("unauthorized");
        if (!SAFE_PATH.test(pathname)) throw new Error("invalid_path");

        return {
          allowedContentTypes: ALLOWED,
          maximumSizeInBytes: MAX_BYTES,
          addRandomSuffix: false,
          tokenPayload: pathname,
        };
      },
      // 주소는 관리자 폼이 업로드 직후 직접 저장하므로 후처리가 필요 없습니다.
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(response);
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    let message = `사진을 올리지 못했습니다. ${detail}`;

    if (/unauthorized/i.test(detail)) {
      message = "로그인이 만료되었습니다. 관리자 페이지에 다시 로그인해 주세요.";
    } else if (/invalid_path/i.test(detail)) {
      message = "허용되지 않은 업로드 경로입니다.";
    } else if (/no token|BLOB_READ_WRITE_TOKEN|not found/i.test(detail)) {
      message =
        "사진 저장소가 연결되지 않았습니다. Vercel → Storage 에서 Blob 저장소를 " +
        "public 으로 만들고 프로젝트에 연결한 뒤 다시 배포해 주세요.";
    } else if (/private/i.test(detail)) {
      message =
        "연결된 Blob 저장소가 private 입니다. 사이트에 보이는 사진은 public 저장소에 " +
        "올려야 합니다. public 저장소를 새로 만들어 연결해 주세요.";
    }

    console.error("[사진 업로드 실패]", detail);
    return NextResponse.json({ error: "upload", message }, { status: 400 });
  }
}
