// ═══════════════════════════════════════════════════════════
//  /winter-final  —  2027 윈터스쿨 확장 추가 모집 설명회 (묶음 안내)
//
//  설명회가 학년별 3회차라, 안내는 이 한 페이지에서 하고
//  신청은 각 회차의 원래 예약 페이지(/events/event-…)로 보냅니다.
//  → 예약 폼은 손대지 않으므로 명단·광고 전환이 회차별로 그대로 갈립니다.
//
//  · 윈터스쿨(/winter) 과 같은 디자인 틀(wt-*)을 씁니다.
//  · 이 페이지에만 있는 부분만 wf-* (winterFinalStyles.ts).
//  · 글·일시·주소는 전부 winterFinalData.ts 에 있습니다.
// ═══════════════════════════════════════════════════════════
import Script from "next/script";
import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import PageBand from "../PageBand";
import { quickMenuMarkup } from "../quickMenu";
import { winterScript } from "../winter/winterScript";
import { winterFinalStyles } from "./winterFinalStyles";
import { hero, intro, ROUNDS, facts, points, PLACE, TEL } from "./winterFinalData";

export const metadata: Metadata = {
  title: "2027 윈터스쿨 확장 추가 모집 설명회 — 다인에듀 동탄점",
  description:
    "정원 확장으로 추가 모집을 시작합니다. 예비 고1 11.28(토) 오후 2시 · 예비 고2 11.29(일) 오후 1시 · 예비 고3 11.29(일) 오후 4시 · 다인에듀 6층 본관 The Hall 01.",
};

export default function WinterFinalPage() {
  return (
    <main className="wt wf">
      <style dangerouslySetInnerHTML={{ __html: winterFinalStyles }} />
      <SiteHeader />

      <div id="top">
        <PageBand
          eyebrow="Briefing"
          title="윈터스쿨 확장 추가 모집 설명회"
          crumb={[
            { label: "이벤트 · 설명회", href: "/event" },
            { label: "윈터스쿨 확장 추가 모집 설명회" },
          ]}
        />
      </div>

      {/* ══ 키비주얼 ══ */}
      <section className="wt-kv">
        <div className="wt-kv-box">
          <div className="wt-kv-bg" aria-hidden="true">
            <span className="wt-kv-beam" />
            <span className="wt-kv-orb" />
          </div>

          <div className="wt-kv-in">
            <p className="wt-kv-eyebrow">{hero.eyebrow}</p>
            <p className="wt-kv-title">
              {hero.title[0]}
              <br />
              <em>{hero.title[1]}</em>
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

      {/* ══ 1) 회차 안내 ══ */}
      <section className="wt-sec wt-result" id="rounds">
        <div className="wt-wrap">
          <p className="wt-tag">Schedule</p>
          <h2 className="wt-h2">
            학년에 맞는 회차를<br />
            <em>골라 신청해 주세요</em>
          </h2>
          {intro.map((p) => (
            <p className="wt-lead wt-dark" key={p}>{p}</p>
          ))}

          <div className="wf-rounds">
            {ROUNDS.map((r, i) => (
              <a
                className="wf-round wt-up"
                style={{ transitionDelay: `${i * 110}ms` }}
                href={r.href}
                key={r.href}
              >
                <p className="wf-grade">
                  <b>{r.grade}</b>
                  <span>{r.gradeSub}</span>
                </p>
                <p className="wf-when">
                  <b>{r.day}</b>
                  <span>{r.time}</span>
                </p>
                <p className="wf-msg">{r.message}</p>
                <span className="wf-go">
                  신청하기 <i aria-hidden="true">→</i>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 2) 윈터스쿨에서 안내드리는 것 ══ */}
      <section className="wt-sec wt-faculty" id="points">
        <div className="wt-wrap">
          <p className="wt-tag">What We Cover</p>
          <h2 className="wt-h2">
            설명회에서<br />
            <em>직접 확인하세요</em>
          </h2>

          <div className="wf-points">
            {points.map((p, i) => (
              <article
                className="wf-point wt-up"
                style={{ transitionDelay: `${i * 100}ms` }}
                key={p.no}
              >
                <b>{p.no}</b>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3) 공통 안내 ══ */}
      <section className="wt-sec wt-reform" id="info">
        <div className="wt-wrap">
          <p className="wt-tag wt-tag-inv">Notice</p>
          <h2 className="wt-h2 wt-inv">
            세 회차 모두<br />
            <em>{PLACE} 에서 열립니다</em>
          </h2>

          <dl className="wf-facts wt-up">
            {facts.map((f) => (
              <div className="wf-fact" key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mk-acts" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 30 }}>
            <a className="wt-btn wt-btn-primary" href="#rounds">회차 고르고 신청하기</a>
            <a className="wt-btn wt-btn-ghost" href={`tel:${TEL.replace(/[^0-9]/g, "")}`}>
              전화 문의 {TEL}
            </a>
          </div>
        </div>
      </section>

      {/* ══ 하단 고정바 ══ */}
      <div className="wt-fixed" id="wtFixed">
        <div className="wt-fixed-in">
          <div className="wt-fixed-info">
            <span><b>윈터스쿨</b> 확장 추가 모집 설명회</span>
            <span><b>일시</b> 11.28(토) · 11.29(일) 학년별</span>
          </div>
          <a className="wt-fixed-btn" href="#rounds">회차 고르고 신청</a>
        </div>
      </div>

      <SiteFooter />
      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />

      <Script
        id="winter-final-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: winterScript }}
      />
    </main>
  );
}
