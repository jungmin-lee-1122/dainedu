import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import PageBand from "../PageBand";
import { quickMenuMarkup } from "../quickMenu";
import { noticeScript } from "./noticeScript";
import { getAllNotices } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "공지사항 — 다인교육 동탄점",
  description: "다인교육 동탄점의 모집 안내, 학사 일정, 입시 소식을 전해드립니다.",
};

export default async function NoticeListPage() {
  const notices = await getAllNotices();

  return (
    <main className="dn-body nt-page">
      <SiteHeader />

      <PageBand
        eyebrow="Notice"
        title="공지사항"
        sub={["모집 안내와 학사 일정, 입시 소식을 전해드립니다.", "중요한 공지는 목록 맨 위에 고정됩니다."]}
        crumb={[{ label: "학원생활" }, { label: "공지사항" }]}
      >
        <span className="pb-chip">
          전체 <b>{notices.length}</b>건
        </span>
        <span className="pb-tel">
          문의 <a href="tel:16448022">1644-8022</a>
        </span>
      </PageBand>

      <section className="nt-sec">
        <div className="pb-wrap">
          {notices.length === 0 ? (
            <p className="nt-empty">등록된 공지사항이 없습니다.</p>
          ) : (
            <ul className="nt-list">
              {notices.map((n, i) => {
                const external = Boolean(n.href);
                const href = n.href || `/notices/${n.id}`;
                const inner = (
                  <>
                    <span className="nt-no">{notices.length - i}</span>
                    <span className="nt-main">
                      <span className="nt-badges">
                        {n.pinned && <em className="nt-pin">고정</em>}
                        <span className="nt-tag">{n.tag}</span>
                      </span>
                      <b className="nt-title">
                        {n.title}
                        {n.image && <i className="nt-clip" aria-label="첨부 사진 있음">🖼</i>}
                      </b>
                    </span>
                    <span className="nt-date">{n.date}</span>
                    <span className="nt-go" aria-hidden="true">›</span>
                  </>
                );

                return (
                  <li className="nt-item" key={n.id}>
                    {external ? (
                      <a className="nt-row" href={href} target="_blank" rel="noopener noreferrer">
                        {inner}
                      </a>
                    ) : (
                      <Link className="nt-row" href={href}>
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          <p className="nt-note">※ 문의사항은 대표번호 1644-8022 또는 온라인 상담으로 남겨주세요.</p>
        </div>
      </section>

      <SiteFooter />

      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />

      <Script
        id="notice-list-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: noticeScript }}
      />
    </main>
  );
}
