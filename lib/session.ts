// ═══════════════════════════════════════════════════════════
//  로그인 상태 확인 (서버 전용)
//  next/headers 를 쓰기 때문에 미들웨어에서는 불러올 수 없습니다.
// ═══════════════════════════════════════════════════════════
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifyToken } from "./auth";

export async function isLoggedIn() {
  const store = await cookies();
  return verifyToken(store.get(SESSION_COOKIE)?.value);
}
