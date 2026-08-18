import Script from "next/script";
import type { Metadata } from "next";
import { teachersScript } from "./teachersScript";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import { quickMenuMarkup } from "../quickMenu";
import { subjects, teachers } from "./teachersData";

const SEMINAR = "https://dain-edu.higgsfield.app/seminar";

export const metadata: Metadata = {
  title: "강사진 소개 — 다인교육 동탄점",
  description:
    "대치·목동·평촌에서 검증된 강사진을 한 분씩 소개합니다. 전원 공개는 설명회 현장에서.",
};

const revealedCount = teachers.filter((t) => t.revealed).length;

export default function TeachersPage() {
  return (
    <main className="dn-body tc-page">
      <SiteHeader />

      {/* ── 히어로 ── */}
      <section className="tc-hero">
        <div className="tc-wrap">
          <p className="tc-eyebrow">Faculty</p>
          <h1 className="tc-title">
            최고의 강사진,<br />
            <em>여러분과 함께 합니다</em>
          </h1>
          <p className="tc-sub">대치 · 목동 · 평촌에서 검증된 강사진을 한 분씩 소개합니다.</p>
          <div className="tc-counter">
            <b>
              <span id="tcCount">{revealedCount}</span> / {teachers.length}
            </b>
            <span>공개</span>
            <i>전체 명단은 설명회 현장에서 발표됩니다</i>
          </div>
        </div>
      </section>

      {/* ── 과목 필터 + 카드 ── */}
      <section className="tc-sec">
        <div className="tc-wrap">
          <div className="tc-filter" id="tcFilter">
            {subjects.map((s, i) => (
              <button
                className={`tc-filter-btn${i === 0 ? " is-on" : ""}`}
                type="button"
                data-subject={s}
                key={s}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="tc-grid" id="tcGrid">
            {teachers.map((t, i) => (
              <article
                className={`tc-card tc-up${t.revealed ? " is-open" : ""}`}
                data-subject={t.subject}
                style={{ transitionDelay: `${(i % 4) * 70}ms` }}
                key={i}
              >
                <div className="tc-card-top">
                  <span className="tc-badge">{t.subject}</span>
                  <span className="tc-open">{t.openAt}</span>
                </div>
                <div className="tc-face" aria-hidden="true">
                  {t.revealed && t.photo ? (
                    <img src={t.photo} alt={t.name} />
                  ) : (
                    <span className="tc-face-q">?</span>
                  )}
                </div>
                <h3 className="tc-name">{t.name}</h3>
                <p className="tc-copy">{t.copy}</p>
                <ul className="tc-career">
                  {t.career.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="tc-note">※ 강사진 정보는 계약 및 출강 사실이 확인된 내용만 게시합니다.</p>
        </div>
      </section>

      {/* ── 라인업 안내 ── */}
      <section className="tc-lineup">
        <div className="tc-wrap tc-lineup-in">
          <div>
            <p className="tc-eyebrow tc-eyebrow-inv">Line-up</p>
            <h2 className="tc-h2">과목별 라인업</h2>
            <p className="tc-lineup-desc">
              전 과목 정규 강사진을 자체 편성했습니다.<br />
              출강 이력과 담당 과정을 함께 공개합니다.
            </p>
          </div>
          <div className="tc-lineup-tags">
            {subjects.slice(1).map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="tc-cta">
        <div className="tc-wrap">
          <p className="tc-eyebrow">Meet them</p>
          <h2 className="tc-h2">가장 먼저 알고 싶다면</h2>
          <p className="tc-cta-desc">
            사전등록자에게 공개 소식을 먼저 보내드립니다.<br />
            전원 공개는 설명회 현장에서.
          </p>
          <a className="tc-cta-btn" href={SEMINAR}>공개 소식 먼저 받기</a>
        </div>
      </section>
      <SiteFooter />

      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />

      <Script id="teachers-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: teachersScript }} />
    </main>
  );
}
