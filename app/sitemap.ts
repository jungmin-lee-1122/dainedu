// ═══════════════════════════════════════════════════════════
//  sitemap.xml  →  https://dainedu.co.kr/sitemap.xml
//
//  검색엔진에게 "우리 사이트에 어떤 페이지가 있는지" 목록으로 알려줍니다.
//  페이지를 새로 만들면 아래 PAGES 에 한 줄 추가해 주세요.
// ═══════════════════════════════════════════════════════════
import type { MetadataRoute } from "next";

const SITE = "https://dainedu.co.kr";

/** [주소, 중요도(0~1), 갱신 주기] */
const PAGES: [string, number, "daily" | "weekly" | "monthly"][] = [
  ["/", 1.0, "daily"],
  ["/winter", 0.9, "weekly"],
  ["/porta", 0.9, "weekly"],
  ["/clavis", 0.9, "weekly"],
  ["/teachers", 0.8, "weekly"],
  ["/greeting", 0.6, "monthly"],
  ["/space", 0.6, "monthly"],
  ["/about/location", 0.6, "monthly"],
  ["/schedule", 0.6, "weekly"],
  ["/notices", 0.7, "daily"],
  ["/event", 0.7, "daily"],
  ["/consult", 0.7, "monthly"],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.map(([path, priority, changeFrequency]) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
