import Script from "next/script";
import type { Metadata } from "next";
import { clavisScript } from "../clavis/clavisScript";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import { quickMenuMarkup } from "../quickMenu";
import {
  heroSlides,
  teacherTabs,
  teachers,
  notices,
  lectures,
  reviews,
  sideBanners,
} from "./aurumData";

/** 본문 표시 여부 — 임시로 숨겨둠. true 로 바꾸면 다시 나옵니다. */
const SHOW_BODY = true;

export const metadata: Metadata = {
  title: "N수 아우룸 — 다인교육 동탄점",
  description: "빛나는 황금기를 여는 재도전 시스템. 다인교육 동탄점 N수 아우룸.",
};

export default function AurumPage() {
  return (
    <main className="dn-body cv-page">
      <SiteHeader current="aurum" />


      {/* ══════════ 본문 임시 숨김 — 다시 보이려면 위쪽 SHOW_BODY 를 true 로 ══════════ */}
      {SHOW_BODY && (
        <>
      {/* ── 1) 메인 롤링 배너 ── */}
      <section className="cv-main-bn" id="top">
        <div className="cv-wrap">
          <div className="cv-hero" id="cvHero">
            <div className="cv-hero-track">
              {heroSlides.map((s, i) => (
                <a className="cv-hero-slide" href={s.href} key={i}>
                  <picture>
                    <source media="(max-width:900px)" srcSet={s.img.replace(".png", "-m.png")} />
                    <img src={s.img} alt={s.alt} />
                  </picture>
                </a>
              ))}
            </div>
            <div className="cv-hero-tabs" role="tablist">
              {heroSlides.map((s, i) => (
                <button
                  className="cv-hero-tab"
                  type="button"
                  data-idx={i}
                  key={i}
                >
                  {s.tab}
                </button>
              ))}
              <span className="cv-hero-count">
                <b className="cv-cur">1</b> / <span className="cv-tot">{heroSlides.length}</span>
              </span>
              <button className="cv-hero-play" type="button" aria-label="자동재생 정지">
                <span className="cv-ico-pause">❚❚</span>
                <span className="cv-ico-play">▶</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 그랜드 오픈 배너 ── */}
      <section className="cv-stats-sec">
        <div className="cv-wrap">
          <a className="cv-statsbn" href="https://dain-edu.higgsfield.app/seminar" aria-label="다인에듀 동탄점 09.21 그랜드 오픈">
            <picture>
              <source media="(max-width:900px)" srcSet="/clavis/stats-banner-m.png" />
              <img src="/clavis/stats-banner.png" alt="다인에듀 동탄점 09.21 GRAND OPEN" />
            </picture>
            <span className="cv-statsbn-sheen" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* ── 3) 선생님 ── */}
      <section className="cv-teacher" id="teachers">
        <div className="cv-wrap">
          <div className="cv-sec-head">
            <h2 className="cv-sec-title">선생님</h2>
            <div className="cv-tabs" id="cvTeacherTabs">
              {teacherTabs.map((t, i) => (
                <button className="cv-tab" type="button" data-subject={t} key={i}>
                  {t}
                </button>
              ))}
            </div>
            <a className="cv-more" href="#teachers" aria-label="전체보기">+</a>
          </div>
          <div className="cv-teacher-slider" id="cvTeacher">
            <div className="cv-teacher-track">
              {teachers.map((t, i) => (
                <a className="cv-teacher-card" href="#teachers" data-subject={t.subject} key={i}>
                  <div className="cv-teacher-info">
                    <div className="cv-teacher-grades">
                      {t.grades.map((g, j) => (
                        <span className="cv-grade" key={j}>{g}</span>
                      ))}
                    </div>
                    <span className="cv-teacher-subject">{t.subject}</span>
                    <b className="cv-teacher-name">
                      {t.name}
                      {t.isNew && <i className="cv-new">N</i>}
                    </b>
                  </div>
                  <img className="cv-teacher-photo" src={t.img} alt={`${t.subject} ${t.name} 선생님`} />
                </a>
              ))}
            </div>
            <button className="cv-arrow cv-arrow-prev" type="button" data-dir="prev" aria-label="이전">‹</button>
            <button className="cv-arrow cv-arrow-next" type="button" data-dir="next" aria-label="다음">›</button>
          </div>
        </div>
      </section>

      {/* ── 4) 공지사항 · 설명회 ── */}
      <section className="cv-board" id="notice">
        <div className="cv-wrap cv-board-grid">
          <div className="cv-notice">
            <div className="cv-sec-head">
              <h2 className="cv-sec-title">공지사항</h2>
              <a className="cv-more" href="#notice" aria-label="전체보기">+</a>
            </div>
            <ul className="cv-notice-list">
              {notices.map((n, i) => (
                <li key={i}>
                  <a href={n.href}>
                    <span className="cv-notice-tag">【{n.tag}】</span>
                    <span className="cv-notice-title">{n.title}</span>
                    <span className="cv-notice-date">{n.date}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="cv-lecture">
            <div className="cv-sec-head">
              <h2 className="cv-sec-title">설명회·공개특강</h2>
              <a className="cv-more" href="#notice" aria-label="전체보기">+</a>
            </div>
            <div className="cv-lecture-list">
              {lectures.map((l, i) => (
                <a className="cv-lecture-item" href={l.href} key={i}>
                  <div className="cv-lecture-main">
                    <div className="cv-lecture-top">
                      {l.badges.map((b, j) => (
                        <span className="cv-badge" key={j}>{b}</span>
                      ))}
                      <b className="cv-lecture-title">{l.title}</b>
                    </div>
                    <div className="cv-lecture-meta">
                      <span>· 일시 <b>{l.date}</b></span>
                      <span>· 장소 <b>{l.place}</b></span>
                    </div>
                  </div>
                  <span className="cv-lecture-btn">{l.status}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5) 성공수기 + 사이드 배너 ── */}
      <section className="cv-bottom" id="review">
        <div className="cv-wrap cv-bottom-grid">
          <div className="cv-review">
            <div className="cv-sec-head">
              <h2 className="cv-sec-title">성공수기</h2>
              <div className="cv-dots" id="cvReviewDots" />
            </div>
            <div className="cv-review-slider" id="cvReview">
              <div className="cv-review-track">
                {reviews.map((r, i) => (
                  <a className="cv-review-card" href={r.href} key={i}>
                    <img src={r.img} alt={r.alt} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="cv-side">
            <div className="cv-side-slider" id="cvSide">
              <div className="cv-side-track">
                {sideBanners.map((b, i) => (
                  <a className="cv-side-slide" href={b.href} key={i}>
                    <img src={b.img} alt={b.alt} />
                  </a>
                ))}
              </div>
              <div className="cv-side-ctrl">
                <div className="cv-dots" id="cvSideDots" />
                <button className="cv-side-play" type="button" aria-label="자동재생 정지">
                  <span className="cv-ico-pause">❚❚</span>
                  <span className="cv-ico-play">▶</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

        </>
      )}
      <SiteFooter />

      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />

      <Script id="aurum-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: clavisScript }} />
    </main>
  );
}
