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
import PwIcon from "./PwIcon";
import { winterScript } from "../winter/winterScript";
import { trackScript } from "./trackScript";
import {
  hero,
  intro,
  warmup,
  tracks,
  refund,
  benefit,
  closing,
  fixedBar,
} from "./preWinterData";

const CONSULT = "/consult";

export const metadata: Metadata = {
  title: "PRE 윈터스쿨 — 다인에듀 동탄점",
  description:
    "예비 고1(현 중3) 대상 PRE 윈터스쿨. 윈터스쿨보다 한 달 먼저 공통수학 1·2 와 통합과학을 시작합니다.",
  /* 내용이 확정될 때까지 검색에 잡히지 않게 합니다.
     공개할 때 이 robots 줄을 지우고, SiteHeader 의 SHOW_PRE_WINTER 를 true 로 바꾸세요. */
  robots: { index: false, follow: false },
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

          <div className="pw-cards">
            {intro.points.map((p, i) => (
              <article
                className="pw-card wt-up"
                style={{ transitionDelay: `${i * 140}ms` }}
                key={p.no}
              >
                <span className="pw-card-ico" aria-hidden="true">
                  <PwIcon name={p.icon} />
                </span>
                <span className="pw-card-no">{p.no}</span>
                {"target" in p && p.target && (
                  <span className="pw-card-target">{p.target}</span>
                )}
                <b className="pw-card-t">{p.t}</b>
                <p className="pw-card-d">{p.d}</p>
                {"href" in p && p.href && (
                  <a className="pw-card-go" href={p.href}>
                    과정 자세히 보기 <i aria-hidden="true">›</i>
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 2-1) 윈터스쿨로 이어지는 흐름 ══ */}
      <section className="pw-warm">
        <div className="wt-wrap">
          <p className="pw-warm-small">{warmup.small}</p>
          <h2 className="pw-warm-big">
            {warmup.big}
            <br />
            <em>{warmup.bigEm}</em>
          </h2>
          <p className="pw-warm-desc">{warmup.desc}</p>

          <ol className="pw-flow">
            {warmup.steps.map((st, i) => {
              const inner = (
                <>
                  <span className="pw-flow-tag">{st.tag}</span>
                  <b className="pw-flow-title">{st.title}</b>
                  <span className="pw-flow-desc">{st.desc}</span>
                </>
              );
              return (
                <li
                  className={`pw-flow-step wt-up${st.now ? " is-now" : ""}`}
                  style={{ transitionDelay: `${i * 160}ms` }}
                  key={st.tag}
                >
                  {st.href ? (
                    <a className="pw-flow-in" href={st.href}>
                      {inner}
                      <span className="pw-flow-go" aria-hidden="true">›</span>
                    </a>
                  ) : (
                    <div className="pw-flow-in">{inner}</div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ══ 3) 과정 안내 — 대상별 탭 ══ */}
      <section className="wt-sec pw-facts-sec" id="info">
        <div className="wt-wrap">
          <p className="wt-tag">Course</p>
          <h2 className="wt-h2">대상별 과정 안내</h2>

          {/* 탭 — 누르면 아래 내용이 바뀝니다 */}
          <div className="pw-tabs" role="tablist" aria-label="대상 선택">
            {tracks.map((t, i) => (
              <button
                className={`pw-tab${i === 0 ? " is-on" : ""}`}
                type="button"
                role="tab"
                aria-selected={i === 0}
                data-track-tab={t.id}
                key={t.id}
              >
                <b>{t.tab}</b>
                <span>{t.target}</span>
              </button>
            ))}
          </div>

          {tracks.map((t, i) => (
            <div
              className="pw-panel"
              data-track-panel={t.id}
              hidden={i !== 0}
              role="tabpanel"
              key={t.id}
            >
              <div className="pw-panel-head">
                <h3 className="pw-panel-title">
                  {t.title} <em>{t.titleEm}</em>
                </h3>
                <p className="pw-panel-lead">{t.lead}</p>
                <div className="pw-panel-chips">
                  {t.chips.map((c) => (
                    <span className="pw-chip" key={c}>{c}</span>
                  ))}
                </div>
              </div>

              {/* 한눈에 보는 과정 */}
              <dl className="pw-facts">
                {t.facts.map((f) => (
                  <div
                    className={`pw-fact${f.accent ? " is-accent" : ""}${f.wide ? " is-wide" : ""}`}
                    key={f.k}
                  >
                    <dt>{f.k}</dt>
                    <dd>
                      <b>{f.v}</b>
                      {f.sub && <span className="pw-fact-sub">{f.sub}</span>}
                    </dd>
                  </div>
                ))}
                <div className="pw-fact pw-fact-refund">
                  <dt>환불 규정</dt>
                  <dd><b>{refund}</b></dd>
                </div>
              </dl>

              {/* 시간표 */}
              <div className="pw-tt-head">
                <b>시간표 및 일과</b>
                <span>{t.timetableCap}</span>
              </div>
              <div className="pw-day">
                <table className="pw-tt">
                  <thead>
                    <tr>
                      <th>{t.id === "go23" ? "회차" : "교시"}</th>
                      <th>{t.id === "go23" ? "날짜" : "시간"}</th>
                      <th>수업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.timetable.map((r) => (
                      <tr key={r.period + r.title}>
                        <th scope="row">{r.period}</th>
                        <td className="pw-tt-time">{r.time}</td>
                        <td>
                          <b>{r.title}</b>
                          {r.desc && <span>{r.desc}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="pw-note pw-note-list">
                {t.timetableNote.map((n) => <li key={n}>{n}</li>)}
                <li>모집정원이 충원되면 조기 마감됩니다. (수강료 납부 또는 예약금 납부자만 모집정원으로 포함)</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 4) 수강 혜택 — 두 과정 공통 ══ */}
      <section className="wt-sec pw-benefit-sec" id="benefit">
        <div className="wt-wrap">
          <p className="wt-tag wt-tag-inv">{benefit.tag}</p>
          <h2 className="wt-h2 wt-inv">
            {benefit.title}
            <br />
            <em>{benefit.titleEm}</em>
          </h2>
          <p className="pw-benefit-lead">{benefit.lead}</p>

          <div className="pw-tiers">
            {benefit.tiers.map((t, i) => (
              <article
                className="pw-tier wt-up"
                style={{ transitionDelay: `${i * 130}ms` }}
                key={t.count}
              >
                <span className="pw-tier-count">{t.count} 신청</span>
                <p className="pw-tier-pct">
                  <b className="wt-num" data-num={t.percent}>0</b>
                  <i>%</i>
                </p>
                <span className="pw-tier-cap">할인</span>
              </article>
            ))}
          </div>

          <ul className="pw-tier-notes">
            {benefit.notes.map((n) => <li key={n}>{n}</li>)}
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
        id="pre-winter-track-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: trackScript }}
      />
      <Script
        id="pre-winter-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: winterScript }}
      />
    </main>
  );
}
