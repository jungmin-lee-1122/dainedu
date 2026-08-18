import Script from "next/script";
import type { Metadata } from "next";
import { portaScript } from "../porta/portaScript";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import { quickMenuMarkup } from "../quickMenu";
import {
  heroSlides,
  teacherTabs,
  teachers,
  notices,
  lectures,
  clips,
  sideBanners,
} from "./clavisData";

/** 본문 표시 여부 — 임시로 숨겨둠. true 로 바꾸면 다시 나옵니다. */
const SHOW_BODY = true;

/** 선생님 섹션 표시 여부 — 임시로 숨김 */
const SHOW_TEACHERS = false;

export const metadata: Metadata = {
  title: "N수 클라비스 — 다인교육 동탄점",
  description: "빛나는 황금기를 여는 재도전 시스템. 다인교육 동탄점 N수 클라비스.",
};

export default function ClavisPage() {
  return (
    <main className="dn-body cv-page">
      <SiteHeader current="clavis" />


      {/* ══════════ 본문 임시 숨김 — 다시 보이려면 위쪽 SHOW_BODY 를 true 로 ══════════ */}
      {SHOW_BODY && (
        <>
      {/* ── 1) 메인 롤링 배너 ── */}
      <section className="cv-main-bn" id="top">
        <div className="cv-wrap">
          <div className="cv-hero" id="cvHero">
            <div className="cv-hero-track cv-hero-track2">
              <div className="cv-hero-strip">
              {heroSlides.map((s, i) => (
                <a className="cv-hero-slide" href={s.href} key={i}>
                  <picture>
                    <source media="(max-width:900px)" srcSet={s.img.replace(".png", "-m.png")} />
                    <img src={s.img} alt={s.alt} />
                  </picture>
                </a>
              ))}
              </div>
            </div>
            <div className="dn-slider-ctrl">
              <button className="dn-slider-btn" type="button" data-dir="prev" aria-label="이전 슬라이드">‹</button>
              <button className="dn-slider-btn" type="button" data-dir="next" aria-label="다음 슬라이드">›</button>
              <span className="dn-slider-count">
                <b className="dn-cur">01</b>
                <span className="dn-line"><i className="dn-line-fill" /></span>
                <span className="dn-total">0{heroSlides.length}</span>
              </span>
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

      {/* ── 3) 선생님 — 임시 숨김 (SHOW_TEACHERS 를 true 로 바꾸면 다시 나옵니다) ── */}
      {SHOW_TEACHERS && (
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

      )}

      {/* ── 4) 공지사항 · 설명회 ── */}
      <section className="cv-board" id="board">
        <div className="cv-wrap cv-board-grid">
          <div className="cv-notice cv-anchor" id="notice">
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
          <div className="cv-lecture cv-anchor" id="event">
            <div className="cv-sec-head">
              <h2 className="cv-sec-title">이벤트 · 설명회</h2>
              <a className="cv-more" href="#event" aria-label="전체보기">+</a>
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
              <h2 className="cv-sec-title">선생님 클립영상</h2>
              <div className="cv-dots" id="cvReviewDots" />
            </div>
            <div className="cv-review-slider" id="cvReview">
              <div className="cv-review-track">
                {clips.map((c, i) => (
                <div className="cv-review-card cv-clip" data-yt={c.id} key={i}>
                  <button className="cv-clip-btn" type="button" aria-label={`${c.title} 재생`}>
                    <img
                      className="cv-clip-thumb"
                      src={`https://i.ytimg.com/vi/${c.id}/hqdefault.jpg`}
                      alt={c.title}
                      loading="lazy"
                    />
                    <span className="cv-clip-play" aria-hidden="true">
                      <svg viewBox="0 0 68 48"><path d="M66.5 7.7a8.6 8.6 0 0 0-6-6C55.2 0 34 0 34 0S12.8 0 7.5 1.7a8.6 8.6 0 0 0-6 6A89.5 89.5 0 0 0 0 24a89.5 89.5 0 0 0 1.5 16.3 8.6 8.6 0 0 0 6 6C12.8 48 34 48 34 48s21.2 0 26.5-1.7a8.6 8.6 0 0 0 6-6A89.5 89.5 0 0 0 68 24a89.5 89.5 0 0 0-1.5-16.3z" fill="#FF0000"/><path d="M27 34l18-10-18-10z" fill="#fff"/></svg>
                    </span>
                    <span className="cv-clip-title">{c.title}</span>
                  </button>
                </div>
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

      <Script id="clavis-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: portaScript }} />
    </main>
  );
}
