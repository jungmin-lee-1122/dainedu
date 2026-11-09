// ═══════════════════════════════════════════════════════════
//  /math-kangpil  —  수학 특강 : 강필 선생님 (다인에듀 × 수놀음)
//
//  원본 "강필 선생님 홍보 슬라이드.pdf" 9쪽을 다인에듀 톤으로 옮긴 페이지입니다.
//  · 문구는 app/math-kangpil/kangpilData.ts 한 곳에서만 고칩니다.
//  · 스타일은 kangpilStyles.ts 안에만 있습니다 (globals.css 무관).
//
//  ※ 지금은 초안입니다 — 개강일·대상이 비어 있어 검색에 잡히지 않게
//    noindex 를 걸어 두었습니다. 내용이 확정되면 IS_DRAFT 를 false 로
//    바꾸고 메뉴에 연결하세요.
// ═══════════════════════════════════════════════════════════
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import { kangpilStyles } from "./kangpilStyles";
import { kangpilScript } from "./kangpilScript";
import {
  HERO, PROFILE, NICKNAME, PHILOSOPHY, PRINCIPLES, DISCOVERY, QUOTES, SUNOREUM, OPEN,
} from "./kangpilData";

/** 개강일·대상이 확정되고 메뉴에 걸 준비가 되면 false 로 바꾸세요 */
const IS_DRAFT = true;

export const metadata: Metadata = {
  title: "수학 특강 — 생각하는 수학, 강필 | 다인에듀 동탄점",
  description:
    "다인에듀 × 수놀음 수능교육센터. ‘걸어다니는 평가원’ 강필 선생님의 수능 수학 특강 — 교과서 개념에서 출발해 평가원 기준으로 공부합니다.",
  ...(IS_DRAFT ? { robots: { index: false, follow: false } } : {}),
};

export default function MathKangpilPage() {
  return (
    <main className="dn-body kp">
      <style dangerouslySetInnerHTML={{ __html: kangpilStyles }} />
      <SiteHeader />

      {/* ── 인트로 (8번 시안) ──
          딥네이비 + 샴페인 골드. 사이트의 딥네이비 섹션과 같은 계열입니다. */}
      <header className="kp-kv">
        <div className="kp-kv-in">
          <div className="kp-kv-copy">
            <p className="kp-kv-label">
              PROFILE <i aria-hidden="true" /> 걸어다니는 평가원
            </p>
            <h1 className="kp-kv-name">{HERO.name}</h1>
            <div className="kp-kv-rule" aria-hidden="true" />

            <p className="kp-kv-tag">
              {HERO.tag[0]}
              <em>{HERO.tag[1]}</em>
            </p>
            <p className="kp-kv-sub">
              {HERO.sub.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < HERO.sub.length - 1 && <br />}
                </span>
              ))}
            </p>

            <div className="kp-kv-cols">
              <div className="kp-kv-col">
                <h2>약력</h2>
                <ul>
                  {HERO.career.map((v) => <li key={v}>{v}</li>)}
                </ul>
              </div>
              <div className="kp-kv-col">
                <h2>저서</h2>
                <ul>
                  {HERO.books.map((v) => <li key={v}>{v}</li>)}
                </ul>
              </div>
            </div>

            <p className="kp-kv-foot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/dain-icon-light.png" alt="다인에듀" decoding="async" />
              <span>{HERO.foot}</span>
            </p>
          </div>

          <div className="kp-kv-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO.photo} alt="강필 선생님" decoding="async" />
          </div>
        </div>
      </header>

      {/* ── 프로필 ── */}
      <section className="kp-sec">
        <div className="kp-wrap kp-up">
          <p className="kp-eyebrow">PROFILE</p>
          <h2 className="kp-h2">강필 선생님은</h2>

          <dl className="kp-profile">
            {PROFILE.map((row) => (
              <div className="kp-prow" key={row.label}>
                <dt>{row.label}</dt>
                <dd>
                  <ul>
                    {row.items.map((v) => <li key={v}>{v}</li>)}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 학생들이 부르는 이름 ── */}
      <section className="kp-sec is-deep">
        <div className="kp-wrap kp-nick kp-up">
          <p className="kp-eyebrow">{NICKNAME.eyebrow}</p>
          <h2>{NICKNAME.title}</h2>
          <p className="kp-lead">{NICKNAME.body}</p>
        </div>
      </section>

      {/* ── 교육 철학 ── */}
      <section className="kp-sec">
        <div className="kp-wrap kp-up">
          <p className="kp-eyebrow">PHILOSOPHY</p>
          <blockquote className="kp-quote">
            {PHILOSOPHY.quote.map((line) => <p key={line}>{line}</p>)}
            <p className="kp-lead">{PHILOSOPHY.body}</p>
          </blockquote>
        </div>
      </section>

      {/* ── 세 가지 원칙 ── */}
      <section className="kp-sec is-warm">
        <div className="kp-wrap kp-up">
          <p className="kp-eyebrow">HOW WE STUDY</p>
          <h2 className="kp-h2">강필 수학의 세 가지 원칙</h2>

          <div className="kp-grid3">
            {PRINCIPLES.map((p) => (
              <article className="kp-card" key={p.no}>
                <span className="kp-card-no">{p.no}</span>
                <h3>
                  {p.title.map((line) => <span key={line}>{line}</span>)}
                </h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 발견적 과정 문제 해결 ── */}
      <section className="kp-sec">
        <div className="kp-wrap kp-up">
          <p className="kp-eyebrow">{DISCOVERY.eyebrow}</p>
          <h2 className="kp-h2">
            {DISCOVERY.title.map((line) => <span key={line}>{line}<br /></span>)}
          </h2>

          <ul className="kp-steps">
            {DISCOVERY.steps.map((s) => (
              <li key={s.label}>
                <b>{s.label}</b>
                <span>{s.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 강필 어록 ── */}
      <section className="kp-sec is-deep">
        <div className="kp-wrap kp-up">
          <p className="kp-eyebrow">강필 어록</p>
          <h2 className="kp-h2">수강생이 기억하는 한 마디</h2>

          <div className="kp-grid2">
            {QUOTES.map((q) => (
              <div className="kp-say" key={q.title}>
                <b>{q.title}</b>
                <span>{q.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 수놀음 ── */}
      <section className="kp-sec is-warm">
        <div className="kp-wrap kp-up">
          <p className="kp-eyebrow">{SUNOREUM.eyebrow}</p>
          <h2 className="kp-h2">
            {SUNOREUM.title}
            <span className="kp-since">{SUNOREUM.since}</span>
          </h2>

          <ul className="kp-sn">
            {SUNOREUM.items.map((i) => (
              <li key={i.title}>
                <b>{i.title}</b>
                <span>{i.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 수강 안내 ── */}
      <section className="kp-sec is-deep">
        <div className="kp-wrap kp-cta kp-up">
          <p className="kp-eyebrow">다인에듀에서 만나는 강필 수학</p>
          <h2>
            {OPEN.title.map((line) => <span key={line}>{line}</span>)}
          </h2>

          <dl className="kp-facts">
            <div className="kp-fact">
              <dt>개강</dt>
              <dd className={OPEN.startDate ? undefined : "is-soon"}>
                {OPEN.startDate || "추후 공개"}
              </dd>
            </div>
            <div className="kp-fact">
              <dt>대상</dt>
              <dd className={OPEN.target ? undefined : "is-soon"}>
                {OPEN.target || "추후 공개"}
              </dd>
            </div>
            <div className="kp-fact">
              <dt>문의</dt>
              <dd>{OPEN.tel}</dd>
            </div>
            <div className="kp-fact">
              <dt>장소</dt>
              <dd>{OPEN.place}</dd>
            </div>
          </dl>

          <div className="kp-acts">
            <Link className="kp-btn" href="/consult">수강 상담 신청</Link>
            <a className="kp-btn is-ghost" href={`tel:${OPEN.tel.replace(/[^0-9]/g, "")}`}>
              전화 문의 {OPEN.tel}
            </a>
          </div>
        </div>
      </section>

      {IS_DRAFT && (
        <p className="kp-draft">
          <b>초안입니다.</b> 개강일 · 대상이 비어 있어 검색에 잡히지 않게 해 두었고,
          메뉴에도 아직 넣지 않았습니다.
          <br />
          내용은 <b>app/math-kangpil/kangpilData.ts</b> 에서 고치고, 공개할 때는
          같은 폴더 page.tsx 의 <b>IS_DRAFT</b> 를 false 로 바꾸세요.
          <br />
          원본 슬라이드 6쪽의 “강의 영상 · 필기에서 핵심 단계와 대표 예제 추가 예정”
          자리는 자료를 받으면 채워 넣겠습니다.
        </p>
      )}

      <SiteFooter />

      <Script id="kangpil-reveal" strategy="afterInteractive">
        {kangpilScript}
      </Script>
    </main>
  );
}
