// ═══════════════════════════════════════════════════════════
//  /winter-final  —  2027 윈터스쿨 확장 추가 모집 설명회 (묶음 페이지)
//
//  설명회 상세페이지(/events/event-…) 와 똑같은 화면 틀입니다.
//  다른 점은 오른쪽 칸 하나뿐 — 예약 신청서가 하나가 아니라
//  회차 3개가 접힌 채로 있고, 누르면 그 자리에서 펼쳐집니다.
//
//  · 신청서는 상세페이지에서 쓰는 것과 같은 폼입니다.
//    보내는 항목(eventId · name · phone …)과 주소(/api/reserve)가 같아서
//    구글 시트 명단과 광고 전환이 회차별로 그대로 갈립니다.
//  · 한 페이지에 폼이 3개라 id 만 회차별로 다르게 붙입니다(-go1/-go2/-go3).
//    name 과 eventId 는 건드리지 않습니다.
//  · 글·일시·주소는 전부 winterFinalData.ts 에 있습니다.
// ═══════════════════════════════════════════════════════════
import Script from "next/script";
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import { quickMenuMarkup } from "../quickMenu";
import { reserveModalMarkup } from "../event/reserveModal";
import { winterFinalStyles } from "./winterFinalStyles";
import { winterFinalScript } from "./winterFinalScript";
import {
  hero, intro, ROUNDS, notice, PLACE, PLACE_SUB, TEL, TARGETS,
} from "./winterFinalData";

export const metadata: Metadata = {
  title: "2027 윈터스쿨 확장 추가 모집 설명회 — 다인에듀 동탄점",
  description:
    "정원 확장으로 추가 모집을 시작합니다. 예비 고1 11.28(토) 오후 2시 · 예비 고2 11.29(일) 오후 1시 · 예비 고3 11.29(일) 오후 4시 · 다인에듀 6층 본관 The Hall 01.",
};

/** 한 페이지에 폼이 3개 — 겹치지 않게 id 에만 회차 꼬리표를 붙입니다 */
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

export default function WinterFinalPage() {
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
                <dd>학년별 상이 · 11.28(토) · 11.29(일)</dd>
              </div>
              <div>
                <dt>대상</dt>
                <dd>{TARGETS.join(" · ")}</dd>
              </div>
              <div>
                <dt>장소</dt>
                <dd>
                  {PLACE}
                  <em> {PLACE_SUB}</em>
                </dd>
              </div>
              <div>
                <dt>정원</dt>
                <dd>사전 예약제 · 선착순 마감</dd>
              </div>
            </dl>

            <div className="ev-summary-act">
              <a className="ev-book-btn" href="#reserve">예약하기</a>
              <p className="ev-summary-help">
                학년별로 회차가 다릅니다 · 정원이 차면 접수가 마감됩니다.
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
              <img src="/poster-wfinal.jpg?v=2" alt={`${hero.title} 안내 포스터`}
                   loading="lazy" decoding="async" />
            </figure>

            <div className="ev-block">
              <h2 className="ev-h2">설명회 안내</h2>
              {intro.map((p, i) => (
                <p className="ev-p" key={i}>{p}</p>
              ))}
            </div>

            <div className="ev-block">
              <h2 className="ev-h2">회차 안내</h2>
              <ol className="ev-program">
                {ROUNDS.map((r) => (
                  <li key={r.key}>
                    <span className="ev-program-time">{r.day} {r.time}</span>
                    <span className="ev-program-desc">
                      <b>{r.grade}</b>({r.gradeSub}) — {r.message}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

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
                ※ 학년마다 설명회 일정이 다르니 꼭 확인하시고 신청 바랍니다.
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
                        <b>{r.grade}</b>
                        <span>{r.gradeSub}</span>
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
                              title: `${hero.title} — ${r.grade}(${r.gradeSub})`,
                              date: `2026.${r.day} ${r.time}`,
                              targets: `${r.grade}(${r.gradeSub})`,
                              place: `${PLACE} · ${PLACE_SUB}`,
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
          <b>11.28(토) · 11.29(일)</b>
          <em>학년별 회차</em>
        </span>
        <a className="ev-book-btn" href="#reserve">예약하기</a>
      </div>

      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />

      <Script
        id="winter-final-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: winterFinalScript }}
      />
    </main>
  );
}
