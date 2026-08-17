import Script from "next/script";
import type { Metadata } from "next";
import { winterScript } from "./winterScript";
import {
  navItems,
  changes,
  systemSteps,
  programs,
  roadmap,
  manageItems,
  curriculumTabs,
  curriculum,
  timetable,
  spaces,
  whyDain,
  admission,
  process,
  faqs,
} from "./winterData";

const SEMINAR = "https://dain-edu.higgsfield.app/seminar";

export const metadata: Metadata = {
  title: "2027 윈터스쿨 — 다인교육 동탄점",
  description:
    "달라진 입시의 첫 겨울, 준비의 기준도 달라져야 합니다. 2028 개편 입시를 위한 다인교육 겨울 전략 프로그램.",
};

export default function WinterPage() {
  return (
    <main className="wt-page">
      {/* ══ 헤더 ══ */}
      <nav className="wt-nav" aria-label="윈터스쿨 메뉴">
        <a className="wt-nav-brand" href="/">DAIN EDUCATION</a>
        <ul className="wt-nav-menu">
          {navItems.map((n) => (
            <li key={n.label}>
              <a href={n.href}>{n.label}</a>
            </li>
          ))}
        </ul>
        <a className="wt-nav-cta" href="/consult">상담 신청</a>
      </nav>

      {/* ══ 1) 히어로 ══ */}
      <section className="wt-hero" id="top">
        <img className="wt-hero-bg" src="/winter/hero.png" alt="" aria-hidden="true" />
        <div className="wt-hero-inner">
          <p className="wt-hero-kicker">2027 DAIN WINTER SCHOOL</p>
          <h1 className="wt-hero-title">
            달라진 입시의 첫 겨울,<br />
            준비의 기준도<br />
            달라져야 합니다.
          </h1>
          <p className="wt-hero-sub">
            2028 개편 입시를 위한<br />
            다인교육 겨울 전략 프로그램
          </p>
          <p className="wt-hero-target">예비고1 · 예비고2 · 예비고3</p>
          <div className="wt-hero-btns">
            <a className="wt-btn wt-btn-gold" href="#admission">WINTER SCHOOL 모집요강</a>
            <a className="wt-btn wt-btn-line" href="/consult">입학 상담 신청</a>
          </div>
          <a className="wt-scroll" href="#program">
            SCROLL TO DISCOVER <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="wt-hero-side" aria-hidden="true">
          <span>DAIN</span>
          <span>WINTER</span>
          <span>SCHOOL</span>
          <span>2027</span>
        </div>
      </section>

      {/* ══ 2) 바뀌는 입시 ══ */}
      <section className="wt-standard" id="program">
        <div className="wt-wrap wt-standard-grid">
          <div className="wt-reveal">
            <p className="wt-eyebrow">THE NEW STANDARD</p>
            <h2 className="wt-h2">
              2027년 겨울,<br />입시의 기준이 바뀝니다.
            </h2>
            <p className="wt-body">
              고교학점제와 내신 체제 변화,<br />통합형 수능까지.
            </p>
            <p className="wt-body">
              다가오는 입시는<br />이전과 같은 준비만으로<br />대응하기 어렵습니다.
            </p>
          </div>
          <div className="wt-change-list">
            {changes.map((c, i) => (
              <div className="wt-change wt-reveal" style={{ transitionDelay: `${i * 90}ms` }} key={c.no}>
                <span className="wt-change-no">{c.no}</span>
                <b className="wt-change-title">{c.title}</b>
                <p className="wt-change-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3) 인용 밴드 ══ */}
      <section className="wt-quote">
        <div className="wt-wrap">
          <p className="wt-quote-text wt-reveal">
            <span className="wt-quote-mark">“</span>
            입시의 규칙이 바뀌면,<br />
            준비의 순서도 바뀌어야 합니다.
            <span className="wt-quote-mark">”</span>
          </p>
        </div>
      </section>

      {/* ══ 4) 운영 시스템 ══ */}
      <section className="wt-system" id="system">
        <div className="wt-wrap wt-system-grid">
          <div className="wt-reveal">
            <p className="wt-eyebrow wt-gold">DAIN EDUCATION SYSTEM</p>
            <h2 className="wt-h2 wt-inv">
              겨울 두 달을<br />단순한 선행으로<br />끝내지 않습니다.
            </h2>
            <p className="wt-body wt-inv-soft">
              현재 위치를 진단하고,<br />
              목표를 설계하고,<br />
              실행을 관리하고,<br />
              결과를 다시 점검합니다.
            </p>
          </div>
          <div className="wt-steps" id="wtSteps">
            {systemSteps.map((s, i) => (
              <button
                className={`wt-step${i === 0 ? " is-on" : ""}`}
                type="button"
                data-idx={i}
                key={s.no}
              >
                <span className="wt-step-no">{s.no}</span>
                <span className="wt-step-main">
                  <span className="wt-step-en">{s.en}</span>
                  <span className="wt-step-ko">{s.ko}</span>
                </span>
                <span className="wt-step-desc">{s.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5) CLAVIS WINTER ══ */}
      <section className="wt-program">
        <div className="wt-wrap wt-program-grid">
          <div className="wt-reveal">
            <p className="wt-eyebrow">DAIN SIGNATURE PROGRAM</p>
            <h2 className="wt-serif">
              CLAVIS<br />WINTER
            </h2>
            <p className="wt-body">성적을 만드는<br />겨울의 열쇠</p>
          </div>
          {programs.map((p, i) => (
            <div className="wt-prog wt-reveal" style={{ transitionDelay: `${i * 90}ms` }} key={p.en}>
              <b className="wt-prog-en">{p.en}</b>
              <p className="wt-prog-ko">{p.ko}</p>
              <ul className="wt-prog-list">
                {p.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <span className="wt-prog-arrow" aria-hidden="true">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 6) 로드맵 ══ */}
      <section className="wt-roadmap">
        <div className="wt-wrap">
          <div className="wt-roadmap-head wt-reveal">
            <p className="wt-eyebrow">DAIN WINTER ROADMAP</p>
            <h2 className="wt-h2">
              한 학생의 겨울은<br />이렇게 설계됩니다.
            </h2>
          </div>
          <div className="wt-road">
            <span className="wt-road-start">START</span>
            <div className="wt-road-track">
              <span className="wt-road-line" aria-hidden="true" />
              {roadmap.map((r, i) => (
                <div className="wt-road-item wt-reveal" style={{ transitionDelay: `${i * 70}ms` }} key={r.step}>
                  <span className="wt-road-step">{r.step}</span>
                  <b className="wt-road-title">{r.title}</b>
                  <span className="wt-road-dot" aria-hidden="true" />
                  <img className="wt-road-img" src={r.img} alt={r.title} />
                </div>
              ))}
            </div>
            <span className="wt-road-end">NEW SEMESTER</span>
          </div>
        </div>
      </section>

      {/* ══ 7) 관리 시스템 + 커리큘럼 ══ */}
      <section className="wt-mix" id="curriculum">
        <div className="wt-mix-left">
          <div className="wt-mix-inner">
            <p className="wt-eyebrow wt-gold">MANAGEMENT SYSTEM</p>
            <h2 className="wt-h2 wt-inv">
              공부만 시키는 관리가 아니라,<br />공부가 이어지게 만드는 관리.
            </h2>
            <div className="wt-manage-grid">
              <ol className="wt-manage-list" id="wtManage">
                {manageItems.map((m, i) => (
                  <li className={i === 0 ? "is-on" : ""} key={m}>
                    <span className="wt-manage-no">{String(i + 1).padStart(2, "0")}</span>
                    {m}
                  </li>
                ))}
              </ol>
              <img className="wt-manage-img" src="/winter/manage.png" alt="관리 시스템" />
              <p className="wt-manage-desc">
                등원부터 하원까지<br />
                학습 루틴을 관리하여<br />
                규칙적인 학습 습관을<br />
                만들어갑니다.
              </p>
            </div>
          </div>
        </div>
        <div className="wt-mix-right">
          <div className="wt-mix-inner">
            <p className="wt-eyebrow">WINTER CURRICULUM</p>
            <h2 className="wt-h2">
              과목별로, 학년별로,<br />필요한 준비는 다릅니다.
            </h2>
            <div className="wt-cur-tabs" id="wtCurTabs">
              {curriculumTabs.map((t, i) => (
                <button className={`wt-cur-tab${i === 1 ? " is-on" : ""}`} type="button" data-subject={t} key={t}>
                  {t}
                </button>
              ))}
            </div>
            {curriculumTabs.map((t) => (
              <div
                className={`wt-cur-panel${t === "수학" ? " is-on" : ""}`}
                data-panel={t}
                key={t}
              >
                <p className="wt-cur-en">
                  {curriculum[t].en}
                  <span className="wt-cur-flow">{curriculum[t].flow.join(" → ")}</span>
                </p>
                <div className="wt-cur-grid">
                  {curriculum[t].grades.map((g) => (
                    <div className="wt-cur-card" key={g.grade}>
                      <b className="wt-cur-grade">{g.grade}</b>
                      <ul>
                        {g.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8) 하루 · 공간 · WHY ══ */}
      <section className="wt-trio" id="space">
        <div className="wt-wrap wt-trio-grid">
          <div className="wt-day wt-reveal">
            <p className="wt-eyebrow">A DAY AT DAIN</p>
            <h3 className="wt-h3">
              몰입은 의지가 아니라<br />루틴에서 만들어집니다.
            </h3>
            <div className="wt-day-body">
              <ul className="wt-time">
                {timetable.map((t) => (
                  <li key={t.time}>
                    <span className="wt-time-h">{t.time}</span>
                    <span className="wt-time-w">{t.what}</span>
                  </li>
                ))}
              </ul>
              <img className="wt-day-img" src="/winter/day.png" alt="하루 일과" />
            </div>
          </div>

          <div className="wt-space wt-reveal">
            <p className="wt-eyebrow">SPACE FOR FOCUS</p>
            <h3 className="wt-h3">공부에 필요한 것만<br />남긴 공간.</h3>
            <p className="wt-body wt-sm">
              수업부터 상담, 자기주도학습까지.<br />
              학생의 하루가 하나의 공간 안에서 자연스럽게 이어집니다.
            </p>
            <div className="wt-space-grid">
              {spaces.map((s) => (
                <figure className={`wt-space-item${s.big ? " is-big" : ""}`} key={s.name}>
                  <img src={s.img} alt={s.name} />
                  <figcaption>{s.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="wt-why wt-reveal">
            <p className="wt-eyebrow">WHY DAIN</p>
            <h3 className="wt-h3">
              학생 한 명의 변화까지<br />놓치지 않는 교육.
            </h3>
            <ol className="wt-why-list">
              {whyDain.map((w) => (
                <li key={w.no}>
                  <span className="wt-why-no">{w.no}</span>
                  {w.text}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ══ 9) 모집 안내 + FAQ ══ */}
      <section className="wt-admission" id="admission">
        <div className="wt-wrap wt-adm-grid">
          <div className="wt-adm-left">
            <p className="wt-eyebrow wt-gold">2027 WINTER SCHOOL</p>
            <h2 className="wt-h2 wt-inv">2027 윈터스쿨<br />모집 안내</h2>
            <dl className="wt-adm-list">
              {admission.map((a) => (
                <div className="wt-adm-row" key={a.label}>
                  <dt>{a.label}</dt>
                  <dd>{a.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="wt-adm-mid">
            <p className="wt-eyebrow wt-gold">REGISTRATION PROCESS</p>
            <ol className="wt-process">
              {process.map((p, i) => (
                <li key={p}>
                  <span className="wt-process-ico" aria-hidden="true">{i + 1}</span>
                  <span className="wt-process-t">{p}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="wt-faq">
            <p className="wt-eyebrow">FAQ</p>
            <h3 className="wt-faq-title">
              <b>WINTER SCHOOL</b> 자주 묻는 질문
            </h3>
            <div className="wt-faq-list" id="wtFaq">
              {faqs.map((f, i) => (
                <div className="wt-faq-item" key={i}>
                  <button className="wt-faq-q" type="button">
                    {f.q}
                    <span className="wt-faq-mark" aria-hidden="true">+</span>
                  </button>
                  <div className="wt-faq-a">
                    <p>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 10) 클로징 ══ */}
      <section className="wt-closing">
        <div className="wt-wrap wt-closing-grid">
          <div>
            <p className="wt-eyebrow wt-gold">2027 DAIN WINTER SCHOOL</p>
            <h2 className="wt-h2 wt-inv">
              이번 겨울이<br />다음 학년의 기준이 됩니다.
            </h2>
          </div>
          <div className="wt-closing-mid">
            <p className="wt-closing-note">
              2028 입시를 준비하는 가장 중요한 겨울,<br />
              다인교육에서 시작하세요.
            </p>
            <p className="wt-closing-strong">
              2027 WINTER SCHOOL<br />선착순 모집
            </p>
          </div>
          <div className="wt-closing-btns">
            <a className="wt-btn wt-btn-gold" href="/consult">입학 상담 신청</a>
            <a className="wt-btn wt-btn-line" href="tel:03180030221">전화 문의 031-8003-0221</a>
            <a className="wt-btn wt-btn-ghost" href={SEMINAR}>설명회 참석 예약</a>
          </div>
        </div>
        <p className="wt-sign">DAIN EDUCATION</p>
      </section>

      <Script id="winter-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: winterScript }} />
    </main>
  );
}
