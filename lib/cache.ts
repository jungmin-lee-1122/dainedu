// ═══════════════════════════════════════════════════════════
//  DB 조회 결과를 잠시 기억해 두는 곳
//
//  같은 내용을 방문할 때마다 DB 에 다시 묻지 않도록 60초간 보관합니다.
//  관리자에서 내용을 고치면 곧바로 지워지므로, 수정은 바로 반영됩니다.
//  (DB 가 설정되어 있지 않으면 아무 일도 하지 않습니다)
// ═══════════════════════════════════════════════════════════
import { unstable_cache, revalidateTag } from "next/cache";
import { listContents, type ContentRow } from "./db";

/** 종류별 꼬리표 — 이 꼬리표를 지우면 해당 목록만 새로 읽습니다. */
export function contentTag(resource: string) {
  return `content:${resource}`;
}

/** 한 종류의 콘텐츠를 가져옵니다. 60초간 기억해 둡니다. */
export async function listContentsCached(resource: string): Promise<ContentRow[]> {
  const run = unstable_cache(
    () => listContents(resource),
    ["contents", resource],
    { revalidate: 60, tags: [contentTag(resource)] },
  );
  return run();
}

/** 관리자에서 내용을 고쳤을 때 기억해 둔 것을 지웁니다. */
export function clearContentCache(resource: string) {
  try {
    revalidateTag(contentTag(resource), "max");
  } catch {
    /* 캐시를 못 지워도 60초 뒤에는 자동으로 새로 읽습니다 */
  }
}
