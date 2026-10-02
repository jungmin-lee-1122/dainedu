"use client";

// ═══════════════════════════════════════════════════════════
//  방문 기록 보내기
//
//  페이지가 열릴 때 주소와 유입 경로만 서버에 알려줍니다.
//  도시·지역은 서버가 직접 알아내므로 여기서 보내지 않습니다.
//  같은 페이지를 연달아 새로고침해도 30분에 한 번만 보냅니다.
// ═══════════════════════════════════════════════════════════
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GAP_MS = 30 * 60 * 1000;

export default function VisitLogger() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;

    const key = "dnVisit:" + pathname;
    try {
      const last = Number(sessionStorage.getItem(key) || 0);
      if (Date.now() - last < GAP_MS) return;
      sessionStorage.setItem(key, String(Date.now()));
    } catch {
      /* 저장이 막혀 있어도 기록은 보냅니다 */
    }

    const body = JSON.stringify({ path: pathname, referrer: document.referrer || "" });
    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      /* 실패해도 화면에는 영향이 없습니다 */
    });
  }, [pathname]);

  return null;
}
