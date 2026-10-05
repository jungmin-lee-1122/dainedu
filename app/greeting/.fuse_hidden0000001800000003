import Script from "next/script";
import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import { quickMenuMarkup } from "../quickMenu";
import { greetingScript } from "./greetingScript";
import { hero, letter, system, closing } from "./greetingData";
import PillarArt from "./PillarArt";

export const metadata: Metadata = {
  title: "인사말 — 다인교육 동탄점",
  description:
    "프리미엄 강의, 프리미엄 관리. 두 축이 완성하는 겨울. 다인아카데미는 2026년 10월 문을 엽니다.",
};

export default function GreetingPage() {
  return (
    <main className="dn-body gr-page">
      <SiteHeader />

      {/* ── 히어로 ── */}
      <section className="gr-hero">
        <div className="gr-hero-photo">
          <picture>
            <source media="(max-width:900px)" srcSet={hero.imgMobile} />
            <img src={hero.img} alt={hero.alt} />
          </picture>
          <span className="gr-hero-veil" aria-hidden="true" />
        </div>

        <div className="gr-wrap gr-hero-in">
          <p className="gr-eyebrow">{hero.eyebrow}</p>
          <p className="gr-eyebrow-ko">{hero.eyebrowKo}</p>
          <h1 className="gr-hero-title">
            {hero.titleLines.map((line, i) => (
              <span
                className="gr-hero-line"
                key={i}
                style={{ transitionDelay: `${i * 110}ms` }}
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
          </h1>
          <p className="gr-hero-meta">{hero.meta}</p>
        </div>
      </section>

      {/* ── 인사말 본문 ── */}
      <section className="gr-letter">
        <div className="gr-wrap gr-letter-grid">
          <div className="gr-letter-side gr-up">
            <p className="gr-letter-label">{letter.label}</p>
            <span className="gr-letter-rule" aria-hidden="true" />
            <h2 className="gr-letter-title">
              {letter.title.map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </h2>
            <p className="gr-letter-sub">{letter.sub}</p>
          </div>

          <div className="gr-letter-body">
            {letter.paragraphs.map((para, i) => (
              <p className="gr-p gr-up" style={{ transitionDelay: `${i * 90}ms` }} key={i}>
                {para.map((line, j) => (
                  <span className="gr-p-line" key={j}>
                    {line}
                  </span>
                ))}
              </p>
            ))}
            <p className="gr-sign">
              <span className="gr-sign-rule" aria-hidden="true" />
              {letter.sign}
            </p>
          </div>
        </div>
      </section>

      {/* ── 두 축 ── */}
      <section className="gr-system">
        <div className="gr-wrap">
          <p className="gr-eyebrow gr-eyebrow-inv">
            {system.eyebrow}
            <span className="gr-eyebrow-rule" aria-hidden="true" />
          </p>
          <h2 className="gr-sys-title gr-up">{system.title}</h2>
          <p className="gr-sys-sub gr-up">{system.sub}</p>

          <div className="gr-pillars">
            {system.pillars.map((p, i) => (
              <article className="gr-pillar gr-up" style={{ transitionDelay: `${i * 120}ms` }} key={p.no}>
                <div className="gr-pillar-in">
                  <div className="gr-pillar-head">
                    <span className="gr-pillar-no">{p.no}</span>
                    <span className="gr-pillar-label">{p.label}</span>
                  </div>
                  <h3 className="gr-pillar-title">{p.title}</h3>
                  <p className="gr-pillar-desc">
                    {p.desc.map((d, j) => (
                      <span key={j}>{d}</span>
                    ))}
                  </p>
                </div>
                <PillarArt kind={p.art} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 마무리 ── */}
      <section className="gr-closing">
        <div className="gr-wrap">
          <h2 className="gr-closing-title gr-up">{closing.title}</h2>
          <div className="gr-closing-act gr-up">
            {closing.buttons.map((b) => (
              <a
                className={`gr-btn${b.primary ? " gr-btn-fill" : " gr-btn-line"}`}
                href={b.href}
                key={b.href}
              >
                {b.label}
                <i aria-hidden="true">→</i>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />

      <Script
        id="greeting-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: greetingScript }}
      />
    </main>
  );
}
