// ═══════════════════════════════════════════════════════════
//  사진 주소를 "화면에 필요한 크기"로 바꿔줍니다.
//
//  관리자에서 올린 사진은 원본이 커서(1440px · 1~2MB) 그대로 쓰면 느립니다.
//  아래를 거치면 Next 가 알아서 줄이고 webp 로 바꿔 내보냅니다.
//  (원본 파일은 건드리지 않습니다 — 보여줄 때만 줄입니다)
// ═══════════════════════════════════════════════════════════

/**
 * 사진 줄이기 기능 켜고 끄기.
 *
 * false 면 원본을 그대로 씁니다(지금 상태 — 무조건 보입니다).
 * next.config 설정이 제대로 먹는 것을 확인한 뒤 true 로 바꾸세요.
 */
const OPTIMIZE = false;

/** 줄여서 쓸 수 있는 주소인지 (관리자 업로드 사진) */
function optimizable(src: string) {
  if (!OPTIMIZE) return false;
  return /^https:\/\/[^/]+\.public\.blob\.vercel-storage\.com\//.test(src);
}

/**
 * Next 가 허용하는 가로 크기 목록.
 * 이 목록에 없는 숫자를 쓰면 사진이 아예 나오지 않습니다(400 오류).
 * next.config 의 imageSizes + deviceSizes 기본값과 같아야 합니다.
 */
const ALLOWED = [
  16, 32, 48, 64, 96, 128, 256, 384,
  640, 750, 828, 1080, 1200, 1920, 2048, 3840,
];

/** 원하는 크기보다 같거나 큰 것 중 가장 작은 값으로 맞춥니다. */
function snap(w: number) {
  return ALLOWED.find((v) => v >= w) ?? ALLOWED[ALLOWED.length - 1];
}

/**
 * @param src 원본 주소
 * @param w   화면에 보여줄 가로 크기(px). 허용 크기로 알아서 맞춰집니다.
 */
export function photo(src: string | undefined, w: number): string {
  if (!src) return "";
  if (!optimizable(src)) return src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${snap(w)}&q=72`;
}

/** 고해상도 화면용 2배 주소까지 함께 (srcSet 에 넣어 쓰세요) */
export function photoSet(src: string | undefined, w: number): string | undefined {
  if (!src || !optimizable(src)) return undefined;
  const one = snap(w);
  const two = snap(Math.min(w * 2, 1920));
  if (one === two) return undefined;
  return `${photo(src, one)} 1x, ${photo(src, two)} 2x`;
}
