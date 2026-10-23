import Script from "next/script";
import type { Metadata } from "next";
import { portaScript } from "../porta/portaScript";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import TeacherStrip from "../TeacherStrip";
import { quickMenuMarkup } from "../quickMenu";
import { teacherStripScript } from "../teacherStripScript";
import { archiveStripScript } from "../archiveStripScript";
import {
  heroSlides,
  teacherTabs,
  teachers,
  clips as seedClips,
  sideBanners,
} from "./clavisData";
import { getClips, getTeachers, getEvents } from "@/lib/content";
import { getVisiblePosts } from "@/lib/blog";

/** 여러 형태의 날짜 문구에서 "월.일 / 요일 · 시각" 을 뽑아냅니다.
 *  예) "2026.11.15 오전 11:00"  "2026-10-31 11:00"  "2026. 10. 18 (일) 오후 2시" */
function semDate(startAt?: string, fallback?: string) {
  const raw = String(startAt || fallback || "").trim();
  const ymd = raw.match(/(\d{4})\s*[.\-/]\s*(\d{1,2})\s*[.\-/]\s*(\d{1,2})/);
  if (!ymd) return { md: "", sub: raw };

  const [, y, mo, da] = ymd;
  const dt = new Date(Number(y), Number(mo) - 1, Number(da));
  const dow = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"][dt.getDay()];

  /* 시각 — 오전/오후, "2시", "14:00" 모두 처리 */
  const t = raw.replace(ymd[0], "").match(/(오전|오후)?\s*(\d{1,2})\s*(?::|시)\s*(\d{1,2})?/);
  let time = "";
  if (t) {
    let hh = Number(t[2]);
    const mi = t[3] ? t[3].padStart(2, "0") : "00";
    if (t[1] === "오후" && hh < 12) hh += 12;
    if (t[1] === "오전" && hh === 12) hh = 0;
    time = `${String(hh).padStart(2, "0")}:${mi}`;
  }

  return {
    md: `${mo.padStart(2, "0")}.${da.padStart(2, "0")}`,
    sub: time ? `${dow} · ${time}` : dow,
  };
}

/** 대상 배지를 짧게 — "예비고1(현 중3) 학생 및 학부모" → "예비고1 학생 및 학부모"
 *  괄호만 지우고 앞뒤 띄어쓰기는 살립니다. */
function shortTarget(v: string) {
  return (
    v
      .replace(/\s*\([^)]*\)\s*/g, " ") // 괄호 자리를 한 칸으로
      .replace(/\s{2,}/g, " ")
      .trim() || v
  );
}

// 60초마다 새로 만들어 둡니다. 관리자에서 고친 내용은 1분 안에 반영됩니다.
// (매 방문마다 DB 를 조회하던 force-dynamic 을 걷어내 첫 화면이 훨씬 빨라집니다)
export const revalidate = 60;

/** 본문 표시 여부 — 임시로 숨겨둠. true 로 바꾸면 다시 나옵니다. */
const SHOW_BODY = true;

/** 선생님 섹션 표시 여부 — 임시로 숨김 */
const SHOW_TEACHERS = false;

/** 공지사항 · 설명회 섹션 표시 여부 */
const SHOW_BOARD = true;

export const metadata: Metadata = {
  title: "클라비스 N수전문관 — 다인에듀 동탄점",
  description: "합격의 문을 열어낼 단 하나의 열쇠를 쥐다. 다인에듀 동탄점 클라비스 N수전문관.",
};

export default async function ClavisPage() {
  // 세 가지를 동시에 불러옵니다 (하나씩 기다리면 그만큼 느려집니다)
  const [clips, facultyList, events, posts] = await Promise.all([
    getClips(seedClips),
    getTeachers(),
    getEvents(),
    getVisiblePosts(3),
  ]);
  /* 이벤트·설명회 페이지(/event) 맨 위 2개를 그대로 가져옵니다.
     순서를 바꾸려면 관리자 → 이벤트·설명회에서 항목 순서를 조정하세요. */
  const lectures = events.slice(0, 2);

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
              {heroSlides.map((s, i) => {
                const inner = (
                  <picture>
                    <source media="(max-width:900px)" srcSet={s.img.replace(/\.(png|jpg|jpeg|webp)$/i, "-m.$1")} />
                    <img src={s.img} alt={s.alt} />
                  </picture>
                );
                /* href 가 비어 있으면 클릭되지 않는 이미지로만 보여줍니다 */
                return s.href ? (
                  <a className="cv-hero-slide" href={s.href} key={i}>{inner}</a>
                ) : (
                  <div className="cv-hero-slide" key={i}>{inner}</div>
                );
              })}
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
          <a className="cv-statsbn" href="/event" aria-label="다인에듀 동탄점 09.21 그랜드 오픈">
            <picture>
              <source media="(max-width:900px)" srcSet="/clavis/stats-banner-m.png" />
              <img src="/clavis/stats-banner.png" alt="다인에듀 동탄점 09.21 GRAND OPEN" />
            </picture>
            <span className="cv-statsbn-sheen" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* ── 3) 입시설명회 (숨기려면 위쪽 SHOW_BOARD 를 false 로) ── */}
      {SHOW_BOARD && lectures.length > 0 && (
        <section className="cv-sem" id="event">
          <div className="cv-wrap">
            <div className="cv-sec-head">
              <h2 className="cv-sec-title">입시설명회</h2>
              <a className="cv-more" href="/event" aria-label="전체보기">+</a>
            </div>

            <ul className="cv-sem-list">
              {lectures.map((l) => {
                const d = semDate(l.startAt, l.date);
                return (
                  <li key={l.id}>
                    <a className="cv-sem-item" href={`/events/${l.id}`}>
                      <div className="cv-sem-date">
                        <b>{d.md}</b>
                        <span>{d.sub}</span>
                      </div>

                      <div className="cv-sem-main">
                        <div className="cv-sem-tags">
                          <span className={`cv-sem-status is-${l.status === "마감" ? "closed" : "open"}`}>
                            {l.status}
                          </span>
                          {l.targets.map((t) => (
                            <span className="cv-sem-target" key={t}>{shortTarget(t)}</span>
                          ))}
                        </div>
                        <h3 className="cv-sem-title">{l.title}</h3>
                        <div className="cv-sem-meta">
                          <span><em>일시</em> {l.date}</span>
                          <span><em>장소</em> {l.place}</span>
                        </div>
                      </div>

                      <span className="cv-sem-btn">
                        {l.status === "마감" ? "내용 보기" : "예약하기"} <i aria-hidden="true">→</i>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* ── 3) 선생님 띠 — 자동 슬라이드 ── */}
      <TeacherStrip teachers={facultyList} />

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

      {/* ── 4-2) 입시자료 · 소식 (네이버 블로그 연동) ── */}
      {posts.length > 0 && (
        <section className="cv-arc" id="archive">
          <div className="cv-wrap">
            <div className="cv-arc-head">
              <div>
                <p className="cv-arc-eyebrow">Archive</p>
                <h2 className="cv-sec-title">입시자료 · 소식</h2>
              </div>
              <a className="cv-arc-more" href="/archive">전체 보기 →</a>
            </div>

            <ul className="cv-arc-list">
              {posts.map((p) => (
                <li key={p.id}>
                  <a className="cv-arc-row" href={p.link} target="_blank" rel="noopener noreferrer">
                    <div className="cv-arc-th">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt="" loading="lazy" decoding="async" />
                      ) : null}
                    </div>
                    <div className="cv-arc-txt">
                      <span className="cv-arc-d-m">{p.date}</span>
                      <h3 className="cv-arc-t">{p.title}</h3>
                      {p.summary && <p className="cv-arc-s">{p.summary}</p>}
                    </div>
                    <span className="cv-arc-d">{p.date}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

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
                    <picture>
                      <source media="(max-width:900px)" srcSet={b.imgM || b.img} />
                      <img src={b.img} alt={b.alt} />
                    </picture>
                  </a>
                ))}
              </div>
              <div className="cv-side-ctrl">
                <div className="cv-dots" id="cvSideDots" />
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
      <Script id="clavis-archive-strip" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: archiveStripScript }} />
      <Script
        id="teacher-strip-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: teacherStripScript }}
      />
    </main>
  );
}
