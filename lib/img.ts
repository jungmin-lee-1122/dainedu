// ═══════════════════════════════════════════════════════════
//  사진 주소를 "화면에 필요한 크기"로 바꿔줍니다.
//
//  관리자에서 올린 사진은 원본이 커서(1440px · 1~2MB) 그대로 쓰면 느립니다.
//  아래를 거치면 Next 가 알아서 줄이고 webp 로 바꿔 내보냅니다.
//  (원본 파일은 건드리지 않습니다 — 보여줄 때만 줄입니다)
// ═══════════════════════════════════════════════════════════

/** 줄여서 쓸 수 있는 주소인지 (관리자 업로드 사진) */
function optimizable(src: string) {
  return /^https:\/\/[^/]+\.public\.blob\.vercel-storage\.com\//.test(src);
}

/**
 * @param src 원본 주소
 * @param w   화면에 보여줄 가로 크기(px). 2배(레티나)까지 자동으로 챙깁니다.
 */
export function photo(src: string | undefined, w: number): string {
  if (!src) return "";
  if (!optimizable(src)) return src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=72`;
}

/** 고해상도 화면용 2배 주소까지 함께 (srcSet 에 넣어 쓰세요) */
export function photoSet(src: string | undefined, w: number): string | undefined {
  if (!src || !optimizable(src)) return undefined;
  const two = Math.min(w * 2, 1920);
  return `${photo(src, w)} 1x, ${photo(src, two)} 2x`;
}
