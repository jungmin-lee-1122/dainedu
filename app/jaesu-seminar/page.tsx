// ═══════════════════════════════════════════════════════════
//  /jaesu-seminar  —  2028 재수선행반 설명회 (1차 · 2차)
//
//  설명회 상세페이지(/events/event-…) 와 같은 화면 틀이고,
//  오른쪽 신청서 칸에서 회차(1차 · 2차)를 누르면 그 자리에서 신청서가 펼쳐집니다.
//  윈터 FINAL 설명회(/winter-final) 와 같은 방식이라 그 스타일 · 스크립트를 그대로 씁니다.
//
//  · 신청서는 설명회 상세페이지와 같은 폼입니다. 보내는 항목과 주소(/api/reserve)가
//    같아서 같은 구글 시트에 쌓이고, eventId 로 1차 · 2차가 갈립니다.
//  · 글 · 일시 · eventId 는 전부 jaesuSeminarData.ts 에 있습니다.
// ═══════════════════════════════════════════════════════════
import Script from "next/script";
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import { quickMenuMarkup } from "../quickMenu";
import { reserveModalMarkup } from "../event/reserveModal";
import { winterFinalStyles } from "../winter-final/winterFinalStyles";
import { winterFinalScript } from "../winter-final/winterFinalScript";
import { hero, intro, program, ROUNDS, notice, PLACE, TEL, TARGETS } from "./jaesuSeminarData";

export const metadata: Metadata = {
  title: "2028 재수선행반 설명회 — 다인에듀 동탄점",
  description:
    "달라진 수능에 맞춘 재도전의 시작. 1차 12월 5일(토) 오후 2시 · 2차 12월 12일(토) 오후 2시 · 다인에듀 동탄 6층 본관 · 2028학년도 수능 재도전 수험생 및 학부모 대상.",
};

/** 한 페이지에 폼이 2개 — 겹치지 않게 id 에만 회차 꼬리표를 붙입니다(name 은 그대로) */
const FORM_IDS = [
  "reserve", "rvHeading", "rvForm", "rvName", "rvPhone", "rvSchool",
  "rvGrade", "rvCompanion", "rvSource", "rvAgreeAll", "rvMsg", "rvSubmit",
  "rvDone", "rvDoneHeading",
];
function withSuffix(html: string, sfx: string) {
  let out = html;
  for (const id of FORM_IDS) {
    out = out.split(`id="${id}"`).join(`id="${id}-${sfx}"`);
    out = out.split(`for="${id}"`).join(`for="${id}-${sfx}"`);
  }
  return out;
}

/** 진행 순서(1차 · 2차 동일) 표를 보여 줄지 — 지금은 숨김 */
const SHOW_PROGRAM: boolean = false;

export default function JaesuSeminarPage() {
  return (
    <main className="dn-body ev-page ev-view wf-page">
      <style dangerouslySetInnerHTML={{ __html: winterFinalStyles }} />
      <SiteHeader />

      {/* ── 상단 키비주얼 ── */}
      <section className="ev-kv">
        <div className="ev-wrap">
          <nav className="ev-crumb ev-crumb-inv" aria-label="현재 위치">
            <Link href="/">홈</Link>
            <span aria-hidden="true">›</span>
            <Link href="/event">이벤트 · 설명회</Link>
            <span aria-hidden="true">›</span>
            <b>설명회</b>
          </nav>

          <div className="ev-kv-badges">
            <span className="ev-state ev-state-open">접수중</span>
            <span className="ev-kind ev-kind-inv">설명회</span>
            {TARGETS.map((t) => (
              <span className="ev-badge ev-badge-inv" key={t}>{t}</span>
            ))}
          </div>

          <h1 className="ev-kv-title">{hero.title}</h1>
          <p className="ev-kv-lead">{hero.lead}</p>
        </div>
      </section>

      {/* ── 요약표 ── */}
      <section className="ev-sec ev-sec-tight">
        <div className="ev-wrap">
          <div className="ev-summary">
            <dl className="ev-summary-grid">
              <div>
                <dt>일시</dt>
                <dd>1차 12.5(토) 오후 2시 · 2차 12.12(토) 오후 2시</dd>
              </div>
              <div>
                <dt>대상</dt>
                <dd>2028학년도 수능 재도전 수험생 및 학부모</dd>
              </div>
              <div>
                <dt>장소</dt>
                <dd>{PLACE}</dd>
              </div>
              <div>
                <dt>정원</dt>
                <dd>사전 예약제 · 선착순 모집</dd>
              </div>
            </dl>

            <div className="ev-summary-act">
              <a className="ev-book-btn" href="#reserve">예약하기</a>
              <p className="ev-summary-help">
                1차 · 2차 중 편한 날짜를 고르세요 · 좌석이 차면 접수가 마감됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 본문 ── */}
      <section className="ev-sec">
        <div className="ev-wrap ev-body-grid">
          <div className="ev-body-main">
            <figure className="ev-poster">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/poster-jaesu-sem.jpg" alt={`${hero.short} 안내 포스터`}
                   loading="lazy" decoding="async" />
            </figure>

            <div className="ev-block">
              <h2 className="ev-h2">설명회 안내</h2>
              <p className="ev-p"><b>{intro.head}</b></p>
              {intro.body.map((p, i) => (
                <p className="ev-p" key={i}>{p}</p>
              ))}
              <p className="ev-p">{intro.closing}</p>
            </div>

            {/* 진행 순서 — 잠시 숨겨 두었습니다. 다시 보이게 하려면 위 SHOW_PROGRAM 을 true 로 */}
            {SHOW_PROGRAM && (
            <div className="ev-block">
              <h2 className="ev-h2">진행 순서 <small style={{ fontSize: ".62em", fontWeight: 600, color: "#8A8F98" }}>1차 · 2차 동일</small></h2>
              <ol className="ev-program">
                {program.map((p) => (
                  <li key={p.time}>
                    <span className="ev-program-time">{p.time}</span>
                    <span className="ev-program-desc">{p.desc}</span>
                  </li>
                ))}
              </ol>
            </div>
            )}

            <div className="ev-block">
              <h2 className="ev-h2">유의사항</h2>
              <ul className="ev-notice">
                {notice.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── 우측 — 예약 신청서 (회차를 누르면 그 자리에서 펼쳐집니다) ── */}
          <aside className="ev-aside">
            <div className="ev-aside-card wf-pick" id="reserve">
              <span className="ev-state ev-state-open">접수중</span>
              <h3 className="ev-aside-title">예약 신청서</h3>
              <p className="ev-aside-desc wf-warn">
                ※ 1차와 2차는 같은 내용입니다. 편한 날짜를 골라 신청해 주세요.
              </p>

              <div className="wf-rounds">
                {ROUNDS.map((r) => (
                  <div className="wf-item" key={r.key}>
                    <button
                      className="wf-round"
                      type="button"
                      aria-expanded="false"
                      aria-controls={`wfPanel-${r.key}`}
                    >
                      <span className="wf-grade">
                        <b>{r.name}</b>
                      </span>
                      <span className="wf-when">
                        <b>{r.day}</b>
                        <span>{r.time}</span>
                      </span>
                      <span className="wf-go">
                        예약 신청서 열기 <i aria-hidden="true">˅</i>
                      </span>
                    </button>

                    <div className="wf-panel" id={`wfPanel-${r.key}`} hidden>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: withSuffix(
                            reserveModalMarkup({
                              id: r.eventId,
                              title: `${hero.short} — ${r.name}`,
                              date: `2026.${r.day} ${r.time}`,
                              targets: "2028학년도 수능 재도전 수험생 및 학부모",
                              place: PLACE,
                            }),
                            r.key
                          ),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="wf-tel">
                문의 <a href={`tel:${TEL.replace(/[^0-9]/g, "")}`}>{TEL}</a>
              </p>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />

      {/* 모바일 하단 고정 버튼 */}
      <div className="ev-fixcta">
        <span className="ev-fixcta-info">
          <b>12.5(토) · 12.12(토)</b>
          <em>오후 2시 · 1차 · 2차</em>
        </span>
        <a className="ev-book-btn" href="#reserve">예약하기</a>
      </div>

      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />

      <Script
        id="jaesu-seminar-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: winterFinalScript }}
      />
    </main>
  );
}
