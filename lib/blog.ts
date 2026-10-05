// ═══════════════════════════════════════════════════════════
//  네이버 블로그 글 가져오기 (입시자료 섹션)
//
//  블로그가 원본입니다. 글을 올리면 자동으로 사이트에 나타나고,
//  네이버에서 지우면 사이트에서도 사라집니다.
//  "우리 홈페이지에서만 숨기기" 는 관리자에서 따로 관리합니다.
// ═══════════════════════════════════════════════════════════
import { unstable_cache } from "next/cache";
import { listContents } from "./db";

/** 블로그 아이디 — 바꾸려면 이 한 줄만 고치면 됩니다. */
export const BLOG_ID = "dainacademy_official";
export const BLOG_URL = `https://blog.naver.com/${BLOG_ID}`;
const RSS_URL = `https://rss.blog.naver.com/${BLOG_ID}.xml`;

export type BlogPost = {
  /** 글 주소에서 뽑은 고유 번호 */
  id: string;
  title: string;
  link: string;
  /** 2026. 10. 05 형태 */
  date: string;
  /** 정렬용 원본 시각 */
  at: number;
  summary: string;
  image: string;
  category: string;
};

/* ───────── XML 에서 값 꺼내기 ───────── */

function unwrap(v: string) {
  return v
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}

function tag(block: string, name: string) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m ? unwrap(m[1]) : "";
}

function stripTags(v: string) {
  return v.replace(/<[^>]+>/g, " ").replace(/\s{2,}/g, " ").trim();
}

function firstImage(v: string) {
  const m = v.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : "";
}

/** 글 주소 끝의 숫자(logNo)를 고유 번호로 씁니다. */
function postId(link: string) {
  const m = link.match(/(\d{8,})/);
  return m ? m[1] : link;
}

function ymd(v: string) {
  const t = Date.parse(v);
  if (Number.isNaN(t)) return { date: "", at: 0 };
  const d = new Date(t);
  const f = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
  return { date: f.replace(/\.$/, ""), at: t };
}

/* ───────── 블로그에서 받아오기 ───────── */

async function fetchFeed(): Promise<BlogPost[]> {
  const res = await fetch(RSS_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; DainEduSite/1.0)" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`RSS ${res.status}`);
  const xml = await res.text();

  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  const posts: BlogPost[] = [];

  for (const b of blocks) {
    const link = tag(b, "link");
    if (!link) continue;
    const descRaw = b.match(/<description[^>]*>([\s\S]*?)<\/description>/i)?.[1] ?? "";
    const desc = unwrap(descRaw);
    const when = ymd(tag(b, "pubDate") || tag(b, "dc:date"));
    posts.push({
      id: postId(link),
      title: tag(b, "title") || "제목 없음",
      link,
      date: when.date,
      at: when.at,
      summary: stripTags(desc).slice(0, 120),
      image: firstImage(desc),
      category: tag(b, "category"),
    });
  }

  return posts.sort((a, b) => b.at - a.at);
}

/** 15분간 기억해 둡니다. (블로그에 매번 묻지 않도록) */
const cachedFeed = unstable_cache(fetchFeed, ["naver-blog-feed"], {
  revalidate: 900,
  tags: ["blog-feed"],
});

/** 블로그 글 전체 — 실패하면 빈 배열 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return await cachedFeed();
  } catch {
    return [];
  }
}

/* ───────── 홈페이지에서만 숨긴 글 ───────── */

export async function getHiddenIds(): Promise<Set<string>> {
  try {
    const rows = await listContents("blogHidden");
    return new Set(rows.map((r) => r.id));
  } catch {
    return new Set();
  }
}

/**
 * 사이트에 실제로 보여줄 글.
 * @param limit 최대 개수 (입시자료 섹션은 6개)
 */
export async function getVisiblePosts(limit = 6): Promise<BlogPost[]> {
  const [posts, hidden] = await Promise.all([getBlogPosts(), getHiddenIds()]);
  return posts.filter((p) => !hidden.has(p.id)).slice(0, limit);
}
