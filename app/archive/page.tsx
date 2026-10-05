// ═══════════════════════════════════════════════════════════
//  입시자료 (/archive)
//
//  네이버 블로그 글을 그대로 가져와 보여줍니다.
//  글쓰기·수정·삭제는 블로그에서, 숨기기는 관리자 → 입시자료·블로그 에서.
// ═══════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import PageBand from "../PageBand";
import { quickMenuMarkup } from "../quickMenu";
import { landingScript } from "../landingScript";
import { getVisiblePosts, BLOG_URL } from "@/lib/blog";

// 15분마다 블로그를 다시 확인합니다.
export const revalidate = 900;

export const metadata: Metadata = {
  title: "입시자료 — 다인에듀 동탄점",
  description:
    "다인에듀가 정리한 입시 소식과 학습 자료. 수능·내신·수시 전략을 꾸준히 전해드립니다.",
};

export default async function ArchivePage() {
  const posts = await getVisiblePosts(60);

  return (
    <main className="dn-body ar-page">
      <SiteHeader />

      <PageBand
        eyebrow="Archive"
        title="입시자료"
        sub={[
          "입시의 흐름과 공부의 기준을 정리해 전해드립니다.",
          "다인에듀가 직접 쓰는 글입니다.",
        ]}
        crumb={[{ label: "설명회 · 입시" }, { label: "입시자료" }]}
      />

      <section className="ar-sec">
        <div className="ev-wrap">
          <div className="ar-head">
            <div>
              <p className="ev-eyebrow">Latest</p>
              <h2 className="ar-title">최근 올라온 글</h2>
              <p className="ar-desc">제목을 누르면 블로그에서 전체 내용을 보실 수 있습니다.</p>
            </div>
            <a className="ar-more" href={BLOG_URL} target="_blank" rel="noopener noreferrer">
              블로그에서 더 보기 ↗
            </a>
          </div>

          {posts.length === 0 ? (
            <p className="ar-empty">
              아직 불러온 글이 없습니다. 블로그에 글이 올라오면 이곳에 자동으로 표시됩니다.
            </p>
          ) : (
            <ul className="ar-grid">
              {posts.map((p) => (
                <li key={p.id}>
                  <a className="ar-card" href={p.link} target="_blank" rel="noopener noreferrer">
                    <div className="ar-thumb">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt="" loading="lazy" decoding="async" />
                      ) : (
                        <span aria-hidden="true">DAIN</span>
                      )}
                    </div>
                    <div className="ar-body">
                      <span className="ar-date">{p.date}</span>
                      <h3 className="ar-card-title">{p.title}</h3>
                      {p.summary && <p className="ar-sum">{p.summary}</p>}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <SiteFooter />
      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />
      <Script id="archive-script" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: landingScript }} />
    </main>
  );
}
