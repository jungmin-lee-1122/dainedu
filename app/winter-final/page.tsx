// ═══════════════════════════════════════════════════════════
//  /winter-final  —  2027 윈터스쿨 확장 추가 모집 설명회 (묶음 안내)
//
//  설명회가 학년별 3회차라, 안내는 이 한 페이지에서 하고
//  신청은 각 회차의 원래 예약 페이지(/events/event-…)로 보냅니다.
//  → 예약 폼(구글 시트 연동)은 손대지 않으므로 명단과 광고 전환이
//    회차별로 그대로 갈립니다.
//
//  · 화면 틀은 설명회 상세(/events/event-…) 와 똑같은 ev-* 를 씁니다.
//    오른쪽 예약 신청서 자리에만 "회차 고르기" 카드 3개가 들어갑니다.
//  · 이 페이지에만 있는 부분만 wf-* (winterFinalStyles.ts).
//  · 글·일시·주소는 전부 winterFinalData.ts 에 있습니다.
// ═══════════════════════════════════════════════════════════
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import { quickMenuMarkup } from "../quickMenu";
import { winterFinalStyles } from "./winterFinalStyles";
import {
  hero, intro, ROUNDS, points, notice, PLACE, PLACE_SUB, TEL, TARGETS,
} from "./winterFinalData";

export const metadata: Metadata = {
  title: "2027 윈터스쿨 확장 추가 모집 설명회 — 다인에듀 동탄점",
  description:
    "정원 확장으로 추가 모집을 시작합니다. 예비 고1 11.28(토) 오후 2시 · 예비 고2 11.29(일) 오후 1시 · 예비 고3 11.29(일) 오후 4시 · 다인에듀 6층 본관 The Hall 01.",
};

export default function WinterFinalPage() {
  return (
    <main className="dn-body ev-page ev-view">
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
                <dt>접수</dt>
                <dd>사전 예약제 · 선착순 마감</dd>
              </div>
            </dl>

            <div className="ev-summary-act">
              <a className="ev-book-btn" href="#rounds">회차 고르고 예약하기</a>
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
              <img src="/poster-wfinal.jpg" alt={`${hero.title} 안내 포스터`}
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
                  <li key={r.href}>
                    <span className="ev-program-time">{r.day} {r.time}</span>
                    <span className="ev-program-desc">
                      <b>{r.grade}</b>({r.gradeSub}) — {r.message}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="ev-block">
              <h2 className="ev-h2">설명회에서 확인하실 수 있습니다</h2>
              <ul className="wf-points">
                {points.map((p) => (
                  <li key={p.no}>
                    <b>{p.no}</b>
                    <strong>{p.title}</strong>
                    <span>{p.desc}</span>
                  </li>
                ))}
              </ul>
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

          {/* 우측 — 회차 고르기 (각 회차의 예약 신청서로 이동) */}
          <aside className="ev-aside">
            <div className="ev-aside-card wf-pick" id="rounds">
              <span className="ev-state ev-state-open">접수중</span>
              <h3 className="ev-aside-title">회차를 골라 주세요</h3>
              <p className="ev-aside-desc">
                학년마다 설명회 일정이 다릅니다. 해당 학년을 누르면 예약 신청서가 열립니다.
              </p>

              <div className="wf-rounds">
                {ROUNDS.map((r) => (
                  <a className="wf-round" href={r.href} key={r.href}>
                    <p className="wf-grade">
                      <b>{r.grade}</b>
                      <span>{r.gradeSub}</span>
                    </p>
                    <p className="wf-when">
                      <b>{r.day}</b>
                      <span>{r.time}</span>
                    </p>
                    <p className="wf-msg">{r.message}</p>
                    <span className="wf-go">예약 신청서 열기 <i aria-hidden="true">→</i></span>
                  </a>
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
        <a className="ev-book-btn" href="#rounds">회차 고르기</a>
      </div>

      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />
    </main>
  );
}
