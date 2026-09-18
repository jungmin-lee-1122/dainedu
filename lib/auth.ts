// ═══════════════════════════════════════════════════════════
//  관리자 로그인 (비밀번호 하나)
//
//  비밀번호는 환경변수 ADMIN_PASSWORD 로 설정합니다.
//  로그인에 성공하면 서명된 쿠키를 심어 두고, 이후 요청에서 확인합니다.
//  쿠키에는 비밀번호가 들어가지 않습니다.
// ═══════════════════════════════════════════════════════════
import { cookies } from "next/headers";

export const SESSION_COOKIE = "dn_admin";

/** 설정된 관리자 비밀번호 (기본값은 개발용) */
function adminPassword() {
  return process.env.ADMIN_PASSWORD || "dain1234";
}

/** 쿠키 서명에 쓰는 열쇠 */
function secret() {
  return process.env.ADMIN_SECRET || adminPassword() + "::dain-edu";
}

/** 문자열을 SHA-256 으로 요약 (Edge·Node 양쪽에서 동작) */
async function digest(text: string) {
  const bytes = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** 로그인 성공 시 심을 쿠키 값 — "만료시각.서명" */
export async function makeToken(days = 7) {
  const exp = Date.now() + days * 86400_000;
  const sig = await digest(`${exp}.${secret()}`);
  return `${exp}.${sig}`;
}

/** 쿠키 값이 유효한지 확인 */
export async function verifyToken(token: string | undefined | null) {
  if (!token) return false;
  const [expRaw, sig] = token.split(".");
  const exp = Number(expRaw);
  if (!exp || !sig) return false;
  if (Date.now() > exp) return false;
  return sig === (await digest(`${exp}.${secret()}`));
}

/** 입력한 비밀번호가 맞는지 */
export function checkPassword(input: string) {
  const expected = adminPassword();
  if (input.length !== expected.length) return false;
  // 길이가 같을 때 글자 수만큼 모두 비교 — 응답 시간으로 추측하지 못하게
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

/** 서버 컴포넌트·라우트에서 현재 로그인 상태 확인 */
export async function isLoggedIn() {
  const store = await cookies();
  return verifyToken(store.get(SESSION_COOKIE)?.value);
}
