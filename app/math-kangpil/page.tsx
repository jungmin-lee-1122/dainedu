// ═══════════════════════════════════════════════════════════
//  /math-kangpil  —  수학 특강 : 강필 선생님 (다인에듀 × 수놀음)
//
//  · 윈터스쿨(/winter) · PRE 윈터스쿨(/pre-winter) 과 같은 디자인 틀(wt-*)
//    을 그대로 씁니다 — 헤더밴드 → 키비주얼 → 섹션 내비 → 본문 → 하단 고정바.
//    색·글꼴·버튼·여백·스크롤 등장이 자동으로 같아집니다.
//  · 이 페이지에만 있는 부분만 mk-* (kangpilStyles.ts).
//  · 글은 전부 kangpilData.ts 에 있습니다. 거기만 고치세요.
//
//  ※ 지금은 초안입니다 — 개강일·대상이 비어 있어 검색에 잡히지 않게
//    noindex 를 걸어 두었습니다. 확정되면 IS_DRAFT 를 false 로 바꾸고
//    메뉴(모집안내)에 연결하세요.
// ═══════════════════════════════════════════════════════════
import Script from "next/script";
import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import PageBand from "../PageBand";
import { quickMenuMarkup } from "../quickMenu";
import { winterScript } from "../winter/winterScript";
import { kangpilStyles } from "./kangpilStyles";
import {
  HERO, PROFILE, NICKNAME, PHILOSOPHY, PRINCIPLES, DISCOVERY, QUOTES, SUNOREUM, OPEN,
} from "./kangpilData";

/** 개강일·대상이 확정되고 메뉴에 걸 준비가 되면 false 로 바꾸세요 */
const IS_DRAFT = true;

/** 상담 신청 */
const CONSULT = "/consult";

const SECTION_NAV = [
  { href: "#profile", label: "강사 소개" },
  { href: "#philosophy", label: "교육 철학" },
  { href: "#how", label: "세 가지 원칙" },
  { href: "#discovery", label: "수업 방식" },
  { href: "#sunoreum", label: "수놀음" },
  { href: "#apply", label: "수강 안내" },
];

export const metadata: Metadata = {
  title: "수학 특강 · 강필 — 다인에듀 동탄점",
  description:
    "다인에듀 × 수놀음 수능교육센터. ‘걸어다니는 평가원’ 강필 선생님의 수능 수학 특강 — 교과서 개념에서 출발해 평가원 기준으로 공부합니다.",
  ...(IS_DRAFT ? { robots: { index: false, follow: false } } : {}),
};

export default function MathKangpilPage() {
  return (
    <main className="wt mk">
      <style dangerouslySetInnerHTML={{ __html: kangpilStyles }} />
      <SiteHeader />

      <div id="top">
        <PageBand
          eyebrow="Math Special"
          title="수학 특강 · 강필"
          crumb={[
            { label: "포르타 고등전문관", href: "/porta" },
            { label: "수학 특강 · 강필" },
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
            <p className="wt-kv-eyebrow">{HERO.label}</p>
            <p className="wt-kv-title">
              {HERO.tag[0]}
              <br />
              <em>{HERO.tag[1]}</em>
            </p>
            <p className="wt-kv-sub">{HERO.sub[0]}</p>
            <div className="wt-kv-chips">
              {HERO.chips.map((c) => (
                <span className="wt-chip" key={c}>{c}</span>
              ))}
            </div>
          </div>

          {/* 인물 — 넓은 화면에서는 키비주얼 오른쪽, 모바일에서는 아래로 */}
          <div className="mk-kv-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO.photo} alt="강필 선생님" decoding="async" />
          </div>
        </div>

        <div className="wt-kvnav">
          <div className="wt-kvnav-in">
            {SECTION_NAV.map((s) => (
              <a href={s.href} key={s.href}>{s.label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 1) 강사 소개 ══ */}
      <section className="wt-sec wt-result" id="profile">
        <div className="wt-wrap">
          <p className="wt-tag">Profile</p>
          <h2 className="wt-h2">
            걸어다니는 평가원,<br />
            <em>강필 선생님</em>
          </h2>
          <p className="wt-lead wt-dark">{NICKNAME.body}</p>

          <dl className="mk-prof wt-up">
            {PROFILE.map((row) => (
              <div className="mk-prow" key={row.label}>
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

      {/* ══ 2) 교육 철학 ══ */}
      <section className="wt-sec wt-reform" id="philosophy">
        <div className="wt-wrap">
          <p className="wt-tag wt-tag-inv">Philosophy</p>
          <blockquote className="mk-quote is-inv wt-up">
            {PHILOSOPHY.quote.map((line) => <p key={line}>{line}</p>)}
          </blockquote>
          <p className="wt-lead" style={{ marginTop: 26 }}>{PHILOSOPHY.body}</p>
        </div>
      </section>

      {/* ══ 3) 세 가지 원칙 ══ */}
      <section className="wt-sec wt-faculty" id="how">
        <div className="wt-wrap">
          <p className="wt-tag">How We Study</p>
          <h2 className="wt-h2">
            강필 수학의<br />
            <em>세 가지 원칙</em>
          </h2>

          <div className="mk-grid3">
            {PRINCIPLES.map((p, i) => (
              <article
                className="mk-col wt-up"
                style={{ transitionDelay: `${i * 120}ms` }}
                key={p.no}
              >
                <span className="mk-col-no">{p.no}</span>
                <h3>
                  {p.title.map((line) => <span key={line}>{line}</span>)}
                </h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4) 수업 방식 — 발견적 과정 ══ */}
      <section className="wt-sec wt-result" id="discovery">
        <div className="wt-wrap">
          <p className="wt-tag">{DISCOVERY.eyebrow}</p>
          <h2 className="wt-h2">
            {DISCOVERY.title[0]}<br />
            <em>{DISCOVERY.title[1]}</em>
          </h2>

          <ul className="mk-steps wt-up">
            {DISCOVERY.steps.map((s) => (
              <li key={s.label}>
                <b>{s.label}</b>
                <span>{s.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ 5) 강필 어록 ══ */}
      <section className="wt-sec wt-space" id="says">
        <div className="wt-wrap">
          <p className="wt-tag wt-tag-inv">Quotes</p>
          <h2 className="wt-h2 wt-inv">
            수강생이 기억하는<br />
            <em>한 마디</em>
          </h2>

          <div className="mk-says">
            {QUOTES.map((q, i) => (
              <div
                className="mk-say wt-up"
                style={{ transitionDelay: `${i * 90}ms` }}
                key={q.title}
              >
                <b>{q.title}</b>
                <span>{q.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6) 수놀음 ══ */}
      <section className="wt-sec wt-faculty" id="sunoreum">
        <div className="wt-wrap">
          <p className="wt-tag">{SUNOREUM.eyebrow} · {SUNOREUM.since}</p>
          <h2 className="wt-h2">
            배우는 학생,<br />
            <em>가르치는 강사 모두를 위해</em>
          </h2>

          <div className="mk-grid3">
            {SUNOREUM.items.map((it, i) => (
              <article
                className="mk-col wt-up"
                style={{ transitionDelay: `${i * 120}ms` }}
                key={it.title}
              >
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7) 수강 안내 ══ */}
      <section className="wt-sec wt-reform" id="apply">
        <div className="wt-wrap">
          <p className="wt-tag wt-tag-inv">다인에듀에서 만나는 강필 수학</p>
          <h2 className="wt-h2 wt-inv">
            {OPEN.title[0]}<br />
            <em>{OPEN.title[1]}</em>
          </h2>

          <dl className="mk-facts wt-up">
            <div className="mk-fact">
              <dt>개강</dt>
              <dd className={OPEN.startDate ? undefined : "is-soon"}>
                {OPEN.startDate || "추후 공개"}
              </dd>
            </div>
            <div className="mk-fact">
              <dt>대상</dt>
              <dd className={OPEN.target ? undefined : "is-soon"}>
                {OPEN.target || "추후 공개"}
              </dd>
            </div>
            <div className="mk-fact">
              <dt>문의</dt>
              <dd>{OPEN.tel}</dd>
            </div>
            <div className="mk-fact">
              <dt>장소</dt>
              <dd>{OPEN.place}</dd>
            </div>
          </dl>

          <div className="mk-acts">
            <a className="wt-btn wt-btn-primary" href={CONSULT}>수강 상담 신청</a>
            <a className="wt-btn wt-btn-ghost" href={`tel:${OPEN.tel.replace(/[^0-9]/g, "")}`}>
              전화 문의 {OPEN.tel}
            </a>
          </div>
        </div>
      </section>

      {IS_DRAFT && (
        <p className="mk-draft">
          <b>초안입니다.</b> 개강일 · 대상이 비어 있어 검색에 잡히지 않게 해 두었고,
          메뉴에도 아직 넣지 않았습니다.
          <br />
          글은 <b>app/math-kangpil/kangpilData.ts</b> 에서 고치고, 공개할 때는
          같은 폴더 page.tsx 의 <b>IS_DRAFT</b> 를 false 로 바꾸세요.
          <br />
          원본 슬라이드의 “강의 영상 · 필기에서 핵심 단계와 대표 예제 추가 예정”
          자리는 자료를 받으면 채워 넣겠습니다.
        </p>
      )}

      {/* ══ 하단 고정바 ══ */}
      <div className="wt-fixed" id="wtFixed">
        <div className="wt-fixed-in">
          <div className="wt-fixed-info">
            <span><b>수학 특강</b> 강필 선생님</span>
            <span><b>개강</b> {OPEN.startDate || "추후 공개"}</span>
          </div>
          <a className="wt-fixed-btn" href={CONSULT}>수강 상담 신청</a>
        </div>
      </div>

      <SiteFooter />
      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />

      <Script
        id="kangpil-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: winterScript }}
      />
    </main>
  );
}
