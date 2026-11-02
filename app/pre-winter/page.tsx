// ═══════════════════════════════════════════════════════════
//  PRE 윈터스쿨 상세 페이지  (/pre-winter)
//
//  · 윈터스쿨(/winter) 과 같은 디자인 틀(wt-*)을 그대로 씁니다.
//    색·글꼴·버튼·여백이 자동으로 같아집니다.
//  · 이 페이지 전용 부분만 pw-* 를 씁니다 (globals.css 65번 구역).
//  · 글과 숫자는 전부 preWinterData.ts 에 있습니다. 거기만 고치세요.
// ═══════════════════════════════════════════════════════════
import Script from "next/script";
import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import PageBand from "../PageBand";
import { quickMenuMarkup } from "../quickMenu";
import { winterScript } from "../winter/winterScript";
import {
  hero,
  intro,
  facts,
  refund,
  factNote,
  timetable,
  timetableNote,
  dayPhotos,
  closing,
  fixedBar,
} from "./preWinterData";

/** 하루 모습 사진 — 전용 사진이 준비되면 true 로 바꾸세요. */
const SHOW_DAY_PHOTOS = false;

const CONSULT = "/consult";

export const metadata: Metadata = {
  title: "PRE 윈터스쿨 — 다인에듀 동탄점",
  description:
    "예비 고1(현 중3) 대상 PRE 윈터스쿨. 윈터스쿨보다 한 달 먼저 공통수학 1·2 와 통합과학을 시작합니다.",
};

export default function PreWinterPage() {
  return (
    <main className="wt pw-page">
      <SiteHeader current="porta" />

      <div id="top">
        <PageBand
          eyebrow="Pre Winter School"
          title="PRE 윈터스쿨"
          crumb={[
            { label: "포르타 고등전문관", href: "/porta" },
            { label: "PRE 윈터스쿨" },
          ]}
        />
      </div>

      {/* ══ 1) 인트로 — 키비주얼 ══ */}
      <section className="wt-kv">
        <div className="wt-kv-box">
          <div className="wt-kv-bg" aria-hidden="true">
            <span className="wt-kv-beam" />
            <span className="wt-kv-orb" />
          </div>
          <div className="wt-kv-in">
            <p className="wt-kv-eyebrow">{hero.eyebrow}</p>
            <p className="wt-kv-title">
              {hero.titleTop}
              <br />
              <em>{hero.titleBottom}</em>
            </p>
            <p className="wt-kv-sub">{hero.sub}</p>
            <div className="wt-kv-chips">
              {hero.chips.map((c) => (
                <span className="wt-chip" key={c}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2) 왜 한 달 먼저인가 ══ */}
      <section className="wt-sec wt-result" id="why">
        <div className="wt-wrap">
          <p className="wt-tag">{intro.tag}</p>
          <h2 className="wt-h2">
            {intro.title}
            <br />
            <em>{intro.titleEm}</em>
          </h2>
          <p className="wt-lead">{intro.lead}</p>

          <div className="wt-why-grid">
            {intro.points.map((p, i) => (
              <article
                className="wt-why-card wt-up"
                style={{ transitionDelay: `${i * 80}ms` }}
                key={p.no}
              >
                <span className="wt-why-no">{p.no}</span>
                <b className="wt-why-t">{p.t}</b>
                <p className="wt-why-d">{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3) 한눈에 보는 과정 ══ */}
      <section className="wt-sec pw-facts-sec" id="info">
        <div className="wt-wrap">
          <p className="wt-tag">Course</p>
          <h2 className="wt-h2">한눈에 보는 과정</h2>

          <dl className="pw-facts wt-up">
            {facts.map((f) => (
              <div className={`pw-fact${f.accent ? " is-accent" : ""}`} key={f.k}>
                <dt>{f.k}</dt>
                <dd>
                  <b>{f.v}</b>
                  {f.sub && <span className="pw-fact-sub">{f.sub}</span>}
                </dd>
              </div>
            ))}

            <div className="pw-fact pw-fact-refund">
              <dt>환불 규정</dt>
              <dd>
                <b>{refund}</b>
              </dd>
            </div>
          </dl>

          <p className="pw-note">{factNote}</p>
        </div>
      </section>

      {/* ══ 4) 시간표 및 일과 ══ */}
      <section className="wt-sec pw-day-sec" id="timetable">
        <div className="wt-wrap">
          <p className="wt-tag">Daily</p>
          <h2 className="wt-h2">
            시간표 및 일과 <small className="pw-h2-sub">월요일 – 금요일</small>
          </h2>

          <div className={`pw-day${SHOW_DAY_PHOTOS ? " has-photos" : ""}`}>
            <table className="pw-tt wt-up">
              <thead>
                <tr>
                  <th>교시</th>
                  <th>시간</th>
                  <th>수업</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((t) => (
                  <tr key={t.period + t.title}>
                    <th scope="row">{t.period}</th>
                    <td className="pw-tt-time">{t.time}</td>
                    <td>
                      <b>{t.title}</b>
                      {t.desc && <span>{t.desc}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {SHOW_DAY_PHOTOS && (
              <div className="pw-shots">
                {dayPhotos.map((p) => (
                  <figure className="pw-shot wt-up" key={p.no}>
                    <span className="pw-shot-no">{p.no}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.cap} loading="lazy" decoding="async" />
                    <figcaption>{p.cap}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>

          <ul className="pw-note pw-note-list">
            {timetableNote.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ 5) 아웃트로 ══ */}
      <section className="wt-close">
        <div className="wt-wrap">
          <p className="wt-close-small">{closing.small}</p>
          <h2 className="wt-close-big">
            {closing.big}
            <br />
            <em>{closing.bigEm}</em>
          </h2>
          <div className="wt-close-btns">
            <a className="wt-btn wt-btn-primary" href={CONSULT}>사전 예약 신청</a>
            <a className="wt-btn wt-btn-ghost" href="tel:16448022">전화 문의 1644-8022</a>
          </div>
          <p className="wt-sign">DAIN EDUCATION</p>
        </div>
      </section>

      <SiteFooter />

      {/* ══ 하단 고정 띠 ══ */}
      <div className="wt-fixed" id="wtFixed">
        <div className="wt-fixed-in">
          <div className="wt-fixed-info">
            {fixedBar.rows.map((r) => (
              <span key={r.k}>
                <b>{r.k}</b> {r.v}
              </span>
            ))}
          </div>
          <a className="wt-fixed-btn" href={CONSULT}>{fixedBar.cta}</a>
        </div>
      </div>

      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />

      {/* 윈터스쿨과 같은 스크립트 — 등장 애니메이션·고정 띠를 함께 씁니다 */}
      <Script
        id="pre-winter-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: winterScript }}
      />
    </main>
  );
}
