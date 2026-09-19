import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../SiteHeader";
import SiteFooter from "../../SiteFooter";
import PageBand from "../../PageBand";
import { quickMenuMarkup } from "../../quickMenu";
import { noticeScript } from "../noticeScript";
import { findNotice, getAllNotices } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const n = await findNotice(id);
  if (!n) return { title: "공지사항 — 다인교육 동탄점" };
  return {
    title: `${n.title} — 다인교육 동탄점`,
    description: n.content[0] ?? `${n.tag} · ${n.date}`,
  };
}

export default async function NoticeViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [notice, all] = await Promise.all([findNotice(id), getAllNotices()]);
  if (!notice) notFound();

  const index = all.findIndex((n) => n.id === notice.id);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

  return (
    <main className="dn-body nt-page">
      <SiteHeader />

      <PageBand
        eyebrow="Notice"
        title="공지사항"
        crumb={[
          { label: "학원생활" },
          { label: "공지사항", href: "/notices" },
          { label: notice.tag },
        ]}
      />

      <section className="nt-sec">
        <div className="pb-wrap nt-view">
          {/* 제목 */}
          <header className="nt-head">
            <div className="nt-badges">
              {notice.pinned && <em className="nt-pin">고정</em>}
              <span className="nt-tag">{notice.tag}</span>
              {notice.hall !== "둘 다" && <span className="nt-hall">{notice.hall}</span>}
            </div>
            <h2 className="nt-view-title">{notice.title}</h2>
            <p className="nt-view-date">{notice.date}</p>
          </header>

          {/* 본문 */}
          <div className="nt-body">
            {notice.image && (
              <figure className="nt-figure">
                {/* 관리자에서 올린 사진이라 next/image 대신 img 를 씁니다 */}
                {notice.imageHref ? (
                  <a
                    className="nt-figure-link"
                    href={notice.imageHref}
                    target={notice.imageHref.startsWith("http") ? "_blank" : undefined}
                    rel={notice.imageHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={notice.image} alt={notice.title} />
                    <span className="nt-figure-go" aria-hidden="true">자세히 보기 ↗</span>
                  </a>
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={notice.image} alt={notice.title} />
                )}
              </figure>
            )}

            {notice.content.length > 0 ? (
              notice.content.map((p, i) => (
                <p className="nt-p" key={i}>
                  {p}
                </p>
              ))
            ) : (
              <p className="nt-p nt-p-empty">자세한 내용은 대표번호(1644-0224)로 문의해 주세요.</p>
            )}
          </div>

          {/* 이전 · 다음 */}
          <nav className="nt-nav" aria-label="다른 공지">
            {prev ? (
              <Link className="nt-nav-item" href={`/notices/${prev.id}`}>
                <span>이전 글</span>
                <b>{prev.title}</b>
              </Link>
            ) : (
              <span className="nt-nav-item is-off">
                <span>이전 글</span>
                <b>이전 글이 없습니다</b>
              </span>
            )}

            {next ? (
              <Link className="nt-nav-item nt-nav-next" href={`/notices/${next.id}`}>
                <span>다음 글</span>
                <b>{next.title}</b>
              </Link>
            ) : (
              <span className="nt-nav-item nt-nav-next is-off">
                <span>다음 글</span>
                <b>다음 글이 없습니다</b>
              </span>
            )}
          </nav>

          <div className="nt-back">
            <Link className="nt-back-btn" href="/notices">
              목록으로
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />

      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />

      <Script
        id="notice-view-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: noticeScript }}
      />
    </main>
  );
}
