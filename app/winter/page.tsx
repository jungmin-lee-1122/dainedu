import Script from "next/script";
import type { Metadata } from "next";
import { winterScript } from "./winterScript";
import {
  sectionNav,
  hero,
  benefitTimeline,
  benefitCards,
  reforms,
  whyStats,
  resultBanner,
  stories,
  spaces,
  manageTabs,
  manageGroups,
  curriculumTabs,
  curriculum,
  timetable,
  scholarship,
  admission,
  process,
  faqs,
} from "./winterData";

const CONSULT = "/consult";

export const metadata: Metadata = {
  title: "2027 윈터스쿨 — 다인교육 동탄점",
  description:
    "기준이 바뀌는 겨울, 준비도 바뀌어야 합니다. 2028 개편 입시를 준비하는 다인교육 2027 윈터스쿨 선착순 모집.",
};

export default function WinterPage() {
  return (
    <main className="wt">
      {/* ══ 사이트 공통 헤더 ══ */}
      <a className="dn-topbar" href="https://dain-edu.higgsfield.app/seminar" aria-label="설명회 사전등록 안내">
        <span className="dn-topbar-mark">※</span>
        <span className="dn-entry-badge">9/19 SAT</span>
        <h3 className="dn-topbar-title">설명회 사전등록</h3>
        <span className="dn-topbar-desc">
          그랜드 오픈 설명회 <b>좌석을 먼저 확보</b>하세요.
        </span>
      </a>
      <nav className="dn-nav" aria-label="주 메뉴">
        <a className="dn-nav-brand" href="/">
          <img src="/dain-icon.png" alt="다인교육" className="dn-nav-icon" />
          <span className="dn-nav-brandtext">
            <b className="dn-nav-name">DAIN EDU</b>
            <span className="dn-nav-line" />
            <span className="dn-nav-clock js-clock">00:00:00</span>
          </span>
        </a>
        <ul className="dn-gnb">
          <li className="dn-gnb-item">
            <a href="/#about">학원소개</a>
            <div className="dn-gnb-sub">
              <a href="/#about">인사말</a>
              <a href="/#about">시설 안내</a>
              <a href="/#about">오시는 길</a>
              <a href="/#system">운영시스템</a>
            </div>
          </li>
          <li className="dn-gnb-item">
            <a href="/clavis#teachers">강사진 소개</a>
            <div className="dn-gnb-sub">
              <a href="/clavis#teachers">국어</a>
              <a href="/clavis#teachers">수학</a>
              <a href="/clavis#teachers">영어</a>
              <a href="/clavis#teachers">탐구</a>
            </div>
          </li>
          <li className="dn-gnb-item">
            <a href="/clavis">모집안내</a>
            <div className="dn-gnb-sub">
              <a href="/clavis">고등 클라비스</a>
              <a href="/aurum">N수 아우룸</a>
              <a href="/winter">2027 윈터스쿨</a>
            </div>
          </li>
          <li className="dn-gnb-item">
            <a href="/#contents">콘텐츠</a>
            <div className="dn-gnb-sub">
              <a href="/#contents">영단어 데일리 테스트</a>
              <a href="/#contents">빈칸·순서·삽입 데일리 훈련</a>
              <a href="/#contents">학과 적성 찾기</a>
            </div>
          </li>
          <li className="dn-gnb-item">
            <a href="/#life">학원생활</a>
            <div className="dn-gnb-sub">
              <a href="/#life">하루 일과</a>
              <a href="/#life">급식·편의</a>
              <a href="/consult">상담 문의</a>
            </div>
          </li>
        </ul>
        <span className="dn-navcta dn-dday" aria-label="수능 디데이">
          <span className="cta-label" id="dnDdayCap">수능</span>
          <span className="cta-badge" id="dnDdayNum">D-…</span>
        </span>
      </nav>

      {/* ══ 페이지 타이틀 · 경로 ══ */}
      <div className="wt-head" id="top">
        <div className="wt-wrap wt-head-in">
          <h1 className="wt-head-title">2027 윈터스쿨</h1>
          <nav className="wt-crumb" aria-label="현재 위치">
            <a href="/">홈</a>
            <i aria-hidden="true">›</i>
            <a href="/clavis">고등 클라비스</a>
            <i aria-hidden="true">›</i>
            <span>2027 윈터스쿨</span>
          </nav>
        </div>
      </div>

      {/* ══ 1) 키비주얼 배너 + 세부 탭 ══ */}
      <section className="wt-kv">
        <div className="wt-wrap">
          <div className="wt-kv-box">
            <img className="wt-kv-img" src="/winter/kv.png" alt="2027 다인교육 윈터스쿨" />
            <div className="wt-kv-in">
              <p className="wt-kv-eyebrow">{hero.eyebrow}</p>
              <p className="wt-kv-title">
                {hero.title[0]}<br />
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

          <div className="wt-kvnav">
            {sectionNav.slice(0, 4).map((s) => (
              <a href={s.href} key={s.href}>{s.label}</a>
            ))}
            <a className="wt-kvnav-cta" href={CONSULT}>접수하기</a>
          </div>
        </div>
      </section>

      {/* ══ 섹션 내비 (고정) ══ */}
      <nav className="wt-snav" id="wtSnav" aria-label="섹션 이동">
        <div className="wt-snav-in">
          {sectionNav.map((s) => (
            <a href={s.href} key={s.href}>{s.label}</a>
          ))}
        </div>
      </nav>

      {/* ══ 2) 등록 혜택 ══ */}
      <section className="wt-sec wt-benefit" id="benefit">
        <div className="wt-wrap">
          <p className="wt-tag">등록 혜택</p>
          <h2 className="wt-h2">
            흔들리지 않으려면,<br />
            <em>가장 먼저 시작하세요</em>
          </h2>

          <div className="wt-timeline">
            {benefitTimeline.map((t) => (
              <div className="wt-tl-card wt-up" key={t.tag}>
                <span className="wt-tl-tag">{t.tag}</span>
                <b className="wt-tl-title">{t.title}</b>
                <dl className="wt-tl-rows">
                  {t.rows.map((r) => (
                    <div key={r.k}>
                      <dt>{r.k}</dt>
                      <dd>{r.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <div className="wt-bcards">
            {benefitCards.map((b) => (
              <article className="wt-bcard wt-up" key={b.badge}>
                <div className="wt-bcard-head">
                  <span className="wt-bcard-badge">{b.badge}</span>
                  <b className="wt-bcard-lead">{b.lead}</b>
                </div>
                <div className="wt-bcard-body">
                  <p className="wt-bcard-when">{b.when}</p>
                  <p className="wt-bcard-pct">
                    <span>최대</span>
                    <b className="wt-num" data-num={b.percent}>0</b>
                    <i>%</i>
                    <span>할인</span>
                  </p>
                </div>
                <ul className="wt-bcard-notes">
                  {b.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3) 입시 개편 ══ */}
      <section className="wt-sec wt-reform" id="reform">
        <div className="wt-wrap">
          <p className="wt-tag wt-tag-inv">2028학년도 대입 개편</p>
          <h2 className="wt-h2 wt-inv">
            2027년, 내신도 수능도<br />
            <em>바뀌는 첫 겨울</em>
          </h2>
          <p className="wt-lead">검증된 길이 아직 없어, 불안이 전략을 흔드는 겨울입니다.</p>

          <div className="wt-reforms">
            {reforms.map((r, i) => (
              <article className="wt-rcard wt-up" style={{ transitionDelay: `${i * 90}ms` }} key={r.no}>
                <span className="wt-rcard-no">{r.no}</span>
                <p className="wt-rcard-title">
                  {r.from && <s>{r.from}</s>}
                  <b>{r.to}</b>
                </p>
                <p className="wt-rcard-desc">{r.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 브리지 ══ */}
      <section className="wt-bridge">
        <div className="wt-wrap">
          <p className="wt-bridge-small wt-up">흔들리는 건 제도입니다</p>
          <p className="wt-bridge-big wt-up">
            다인교육 학생의 하루는<br />흔들리지 않았습니다
          </p>
        </div>
      </section>

      {/* ══ 4) WHY DAIN ══ */}
      <section className="wt-sec wt-why" id="why">
        <div className="wt-wrap">
          <p className="wt-tag">WHY DAIN</p>
          <h2 className="wt-h2">
            흔들리지 않는 건,<br /><em>데이터입니다</em>
          </h2>
          <p className="wt-lead wt-dark">겨울 두 달, 성적이 오른 학생들의 공통 행동 패턴</p>

          <div className="wt-stats">
            {whyStats.map((s, i) => (
              <div className="wt-stat wt-up" style={{ transitionDelay: `${i * 70}ms` }} key={s.label}>
                <span className="wt-stat-label">
                  {s.label.split("\n").map((l, j) => (
                    <span key={j}>{l}<br /></span>
                  ))}
                </span>
                <b className="wt-stat-value">
                  <span className="wt-num" data-num={s.value}>0</span>
                  <i>{s.unit}</i>
                </b>
              </div>
            ))}
          </div>
          <p className="wt-note">※ 2026년 다인교육 동탄점 겨울 프로그램 재원생 기준</p>
        </div>
      </section>

      {/* ══ 5) 합격 실적 · 후기 ══ */}
      <section className="wt-sec wt-result" id="result">
        <div className="wt-wrap">
          <p className="wt-tag">성장 기록</p>
          <h2 className="wt-h2">
            겨울의 두 달은<br /><em>결과로 남습니다</em>
          </h2>

          <div className="wt-rbanner wt-up">
            <span className="wt-rbanner-label">{resultBanner.label}</span>
            <p className="wt-rbanner-main">
              <b className="wt-num" data-num={resultBanner.percent}>0</b>
              <i>%</i>
              <span>{resultBanner.text}</span>
            </p>
          </div>

          <div className="wt-stories" id="wtStories">
            <div className="wt-stories-track">
              {stories.map((s) => (
                <article className="wt-story" key={s.who}>
                  <b className="wt-story-title">
                    {s.title.split("\n").map((l, i) => (
                      <span key={i}>{l}<br /></span>
                    ))}
                  </b>
                  <p className="wt-story-univ">{s.univ}</p>
                  <p className="wt-story-body">{s.body}</p>
                  <p className="wt-story-who">{s.who}</p>
                </article>
              ))}
            </div>
            <div className="wt-stories-ctrl">
              <button className="wt-arrow" type="button" data-dir="prev" aria-label="이전">‹</button>
              <button className="wt-arrow" type="button" data-dir="next" aria-label="다음">›</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6) 학습 공간 ══ */}
      <section className="wt-sec wt-space" id="space">
        <div className="wt-wrap">
          <p className="wt-tag wt-tag-inv">프리미엄 학습 공간</p>
          <h2 className="wt-h2 wt-inv">
            환경이 다르면,<br /><em>집중력도 다릅니다</em>
          </h2>
        </div>
        <div className="wt-space-scroll" id="wtSpace">
          <div className="wt-space-track">
            {spaces.map((s) => (
              <figure className="wt-space-card" key={s.name}>
                <img src={s.img} alt={s.name} />
                <figcaption>
                  <b>{s.name}</b>
                  <span>
                    {s.tags.map((t) => (
                      <i key={t}>{t}</i>
                    ))}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7) 관리 시스템 ══ */}
      <section className="wt-sec wt-manage" id="system">
        <div className="wt-wrap">
          <p className="wt-tag">관리 시스템</p>
          <h2 className="wt-h2">
            생활부터 입시까지,<br /><em>하나로 관리합니다</em>
          </h2>

          <div className="wt-mtabs" id="wtManageTabs">
            {manageTabs.map((t, i) => (
              <button className={`wt-mtab${i === 0 ? " is-on" : ""}`} type="button" data-tab={t} key={t}>
                {t}
              </button>
            ))}
          </div>

          {manageTabs.map((t, i) => (
            <div className={`wt-mpanel${i === 0 ? " is-on" : ""}`} data-panel={t} key={t}>
              <p className="wt-mpanel-lead">{manageGroups[t].lead}</p>
              <div className="wt-mgrid">
                {manageGroups[t].items.map((it) => (
                  <div className="wt-mitem" key={it.no}>
                    <span className="wt-mitem-no">{it.no}</span>
                    <b className="wt-mitem-title">{it.title}</b>
                    <ul>
                      {it.lines.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 8) 커리큘럼 + 하루 ══ */}
      <section className="wt-sec wt-cur">
        <div className="wt-wrap wt-cur-grid">
          <div>
            <p className="wt-tag">WINTER CURRICULUM</p>
            <h2 className="wt-h2">
              과목별로, 학년별로<br /><em>필요한 준비는 다릅니다</em>
            </h2>
            <div className="wt-ctabs" id="wtCurTabs">
              {curriculumTabs.map((t, i) => (
                <button className={`wt-ctab${i === 1 ? " is-on" : ""}`} type="button" data-subject={t} key={t}>
                  {t}
                </button>
              ))}
            </div>
            {curriculumTabs.map((t) => (
              <div className={`wt-cpanel${t === "수학" ? " is-on" : ""}`} data-panel={t} key={t}>
                <p className="wt-cflow">
                  <b>{curriculum[t].en}</b>
                  <span>{curriculum[t].flow.join(" → ")}</span>
                </p>
                <div className="wt-cgrid">
                  {curriculum[t].grades.map((g) => (
                    <div className="wt-ccard" key={g.grade}>
                      <b>{g.grade}</b>
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

          <aside className="wt-day">
            <p className="wt-tag">A DAY</p>
            <h3 className="wt-h3">몰입은 의지가 아니라<br />루틴에서 만들어집니다</h3>
            <ul className="wt-time">
              {timetable.map((t) => (
                <li key={t.time}>
                  <span>{t.time}</span>
                  <b>{t.what}</b>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ══ 9) 장학 ══ */}
      <section className="wt-sec wt-scholar">
        <div className="wt-wrap">
          <p className="wt-tag wt-tag-inv">다인 장학</p>
          <h2 className="wt-h2 wt-inv">
            흔들리지 않을 이유를<br /><em>하나 더 드립니다</em>
          </h2>
          <div className="wt-scholar-grid">
            {scholarship.map((s, i) => (
              <div className="wt-scholar-item wt-up" style={{ transitionDelay: `${i * 80}ms` }} key={s.label}>
                <b>
                  <span className="wt-num" data-num={s.value}>0</span>
                  <i>{s.unit}</i>
                </b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <p className="wt-note wt-note-inv">※ 장학 세부 기준은 상담 시 안내드립니다.</p>
        </div>
      </section>

      {/* ══ 10) 모집 안내 + FAQ ══ */}
      <section className="wt-sec wt-adm" id="admission">
        <div className="wt-wrap">
          <p className="wt-tag">모집 안내</p>
          <h2 className="wt-h2">
            2027 윈터스쿨<br /><em>선착순 모집</em>
          </h2>

          <div className="wt-adm-grid">
            <dl className="wt-adm-list">
              {admission.map((a) => (
                <div key={a.k}>
                  <dt>{a.k}</dt>
                  <dd>{a.v}</dd>
                </div>
              ))}
            </dl>
            <ol className="wt-process">
              {process.map((p) => (
                <li key={p.no}>
                  <span className="wt-process-no">{p.no}</span>
                  <b>{p.t}</b>
                </li>
              ))}
            </ol>
          </div>

          <div className="wt-faq" id="wtFaq">
            <h3 className="wt-faq-head">자주 묻는 질문</h3>
            {faqs.map((f, i) => (
              <div className="wt-faq-item" key={i}>
                <button className="wt-faq-q" type="button">
                  <span>{f.q}</span>
                  <i aria-hidden="true">+</i>
                </button>
                <div className="wt-faq-a">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 11) 클로징 ══ */}
      <section className="wt-close">
        <div className="wt-wrap">
          <p className="wt-close-small">2028학년도 처음 열리는 입시</p>
          <h2 className="wt-close-big">
            흔들릴 시간 없이,<br /><em>이번 겨울 다인교육에서</em>
          </h2>
          <div className="wt-close-btns">
            <a className="wt-btn wt-btn-primary" href={CONSULT}>입학 상담 신청</a>
            <a className="wt-btn wt-btn-ghost" href="tel:03180030221">전화 문의 031-8003-0221</a>
          </div>
          <p className="wt-sign">DAIN EDUCATION</p>
        </div>
      </section>

      {/* ══ 하단 고정 CTA ══ */}
      <div className="wt-fixed" id="wtFixed">
        <div className="wt-fixed-in">
          <div className="wt-fixed-info">
            <span><b>모집기간</b> 2026.10.01(목) ~ 선착순 마감</span>
            <span><b>입학일</b> 각 학교 방학일로부터 2일 이내</span>
          </div>
          <a className="wt-fixed-btn" href={CONSULT}>선착순 예약하기</a>
        </div>
      </div>

      <Script id="winter-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: winterScript }} />
    </main>
  );
}
