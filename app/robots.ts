// ═══════════════════════════════════════════════════════════
//  robots.txt  →  https://dainedu.co.kr/robots.txt
//
//  검색엔진(네이버·구글 등)에게 "어디를 수집해도 되는지" 알려주는 파일입니다.
//  관리자 페이지와 내부 API 는 수집에서 제외합니다.
// ═══════════════════════════════════════════════════════════
import type { MetadataRoute } from "next";

const SITE = "https://dainedu.co.kr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
