import Script from "next/script";
import type { Metadata } from "next";
import { spaceScript } from "./spaceScript";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import { quickMenuMarkup } from "../quickMenu";
import { intros, halls, renderings } from "./spaceData";

const SEMINAR = "https://dain-edu.higgsfield.app/seminar";

export const metadata: Metadata = {
  title: "시설 안내 — 다인교육 동탄점",
  description:
    "180평이 어떻게 나뉘고 어떻게 쓰이는지, 공사 전에 먼저 보여드립니다. 다인교육 동탄점 시설 미리보기.",
};

export default function SpacePage() {
  return (
    <main className="dn-body sp-page">
      <SiteHeader />

      {/* ── 히어로 ── */}
      <section className="sp-hero">
        <div className="sp-wrap">
          <p className="sp-eyebrow">The Campus</p>
          <h1 className="sp-title">
            시설 <em>미리보기</em>
          </h1>
          <p className="sp-sub">
            180평이 어떻게 나뉘고 어떻게 쓰이는지, 공사 전에 먼저 보여드립니다.
          </p>
        </div>
      </section>

      {/* ── 인사 영상 ── */}
      <section className="sp-intro">
        <div className="sp-wrap">
          <div className="sp-intro-grid">
            {intros.map((v) => (
              <figure className="sp-video sp-up" key={v.name}>
                <video
                  src={v.src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`${v.name} 인사 영상`}
                />
                <button className="sp-mute is-off" type="button" aria-label="소리 켜기">
                  <span className="sp-mute-on" aria-hidden="true">🔈</span>
                  <span className="sp-mute-off" aria-hidden="true">🔇</span>
                </button>
                <figcaption>{v.name}</figcaption>
              </figure>
            ))}
          </div>
          <p className="sp-intro-note">다인교육의 직원 다인, 다온이가 시설을 안내합니다</p>
        </div>
      </section>

      {/* ── 한 층, 네 개의 관 ── */}
      <section className="sp-layout">
        <div className="sp-wrap">
          <p className="sp-eyebrow sp-eyebrow-inv">Layout</p>
          <h2 className="sp-h2 sp-inv">한 층, 네 개의 관</h2>
          <p className="sp-lead">
            강의동과 자습동을 분리 설계해 수업 소음이 자습 공간에 닿지 않습니다.
          </p>
          <div className="sp-halls">
            {halls.map((h, i) => (
              <article className="sp-hall sp-up" style={{ transitionDelay: `${i * 80}ms` }} key={h.name}>
                <span className="sp-hall-no">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="sp-hall-name">{h.name}</h3>
                <p className="sp-hall-desc">{h.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 공간 미리보기 ── */}
      <section className="sp-render">
        <div className="sp-wrap">
          <p className="sp-eyebrow">Renderings</p>
          <h2 className="sp-h2">공간 미리보기</h2>
          <p className="sp-lead sp-dark">
            인테리어 설계 도면을 기준으로 한 이미지이며, 실제 시공 과정은 오픈 후 공개합니다.
          </p>

          <div className="sp-tabs" id="spTabs">
            {renderings.map((r, i) => (
              <button
                className={`sp-tab${i === 0 ? " is-on" : ""}`}
                type="button"
                data-tab={r.tab}
                key={r.tab}
              >
                {r.tab}
              </button>
            ))}
          </div>

          {renderings.map((r, i) => (
            <div className={`sp-panel${i === 0 ? " is-on" : ""}`} data-panel={r.tab} key={r.tab}>
              <figure className="sp-shot">
                <img src={r.img} alt={r.title} />
              </figure>
              <div className="sp-shot-text">
                <b>{r.title}</b>
                <p>{r.desc}</p>
              </div>
            </div>
          ))}

          <p className="sp-note">※ 도면 기준 이미지로 실제 시공 결과와 세부 마감은 달라질 수 있습니다.</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sp-cta">
        <div className="sp-wrap">
          <p className="sp-eyebrow">See it for real</p>
          <h2 className="sp-h2">완성된 공간, 가장 먼저 보실 분</h2>
          <p className="sp-cta-desc">사전등록자는 오픈 전 프리뷰 투어에 먼저 초청해 드립니다.</p>
          <a className="sp-cta-btn" href={SEMINAR}>설명회 참석예약 하기</a>
        </div>
      </section>

      <SiteFooter />

      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />

      <Script id="space-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: spaceScript }} />
    </main>
  );
}
