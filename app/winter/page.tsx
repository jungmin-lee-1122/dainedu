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
  whyReasons,
  resultBanner,
  stories,
  careLead,
  careFormula,
  recordLead,
  recordCards,
  recordChips,
  recordQuote,
  aiLead,
  aiSteps,
  aiPhoto,
  aiTablet,
  aiQuote,
  careCards,
  faculty,
  spaces,
  manageTabs,
  manageGroups,
  gradeTabs,
  gradeHours,
  gradeHoursNotes,
  curriculumTabs,
  curriculum,
  dayTable,
  scholarship,
  admission,
  admissionNote,
  process,
  faqs,
} from "./winterData";
import SiteHeader from "../SiteHeader";
import ReformArt from "./ReformArt";
import PageBand from "../PageBand";
import SiteFooter from "../SiteFooter";

const CONSULT = "/consult";

export const metadata: Metadata = {
  title: "2027 윈터스쿨 — 다인교육 동탄점",
  description:
    "기준이 바뀌는 겨울, 준비도 바뀌어야 합니다. 2028 개편 입시를 준비하는 다인교육 2027 윈터스쿨 선착순 모집.",
};

/** 강사진 섹션의 학원가 4개 카드 표시 여부 — 다시 보이려면 true */
const SHOW_FACULTY_AREAS = false;

/** 예전 관리 시스템 탭(생활·학습·입시·멘탈) 표시 여부 — 다시 보이려면 true */
const SHOW_MANAGE_TABS = false;

/** 합격 실적 · 재원생 후기 섹션 — 실제 데이터가 생기면 true */
const SHOW_RESULT = false;

/** 장학 섹션 — 장학 제도가 확정되면 true */
const SHOW_SCHOLAR = false;

/** 등록 혜택 섹션 — 혜택이 확정되면 true */
const SHOW_BENEFIT = false;

/** 흰색 섹션 내비 — 상단 다크 탭바와 중복이라 숨김. 다시 보이려면 true */
const SHOW_SNAV = false;

/** 키비주얼 배경에 이미지(kv.png)를 쓸지 여부 — 글자 없는 이미지가 준비되면 true */
const SHOW_KV_IMG = false;

/** 과목별 커리큘럼(구 버전) 표시 여부 — 학년별 시수표로 대체 */
const SHOW_CURRICULUM = false;

/** 표 머리글에서 '권장필수 / 선택' 을 같은 것끼리 묶어 줍니다. */
function kindRuns(cols: { pick?: boolean }[]) {
  const out: { pick: boolean; span: number }[] = [];
  cols.forEach((c) => {
    const pick = Boolean(c.pick);
    const last = out[out.length - 1];
    if (last && last.pick === pick) last.span += 1;
    else out.push({ pick, span: 1 });
  });
  return out;
}

/** 모집요강 브로슈어 (public/winter 에 있습니다) */
const BROCHURE = "/winter/2027-winter-brochure.pdf";

export default function WinterPage() {
  return (
    <main className="wt">
      <SiteHeader />

      {/* ══ 페이지 타이틀 · 경로 — 다른 상세페이지와 같은 공용 헤더밴드 ══ */}
      <div id="top">
        <PageBand
          eyebrow="Winter School"
          title="2027 윈터스쿨"
          crumb={[{ label: "포르타 고등전문관", href: "/porta" }, { label: "2027 윈터스쿨" }]}
        />
      </div>

      {/* ══ 1) 키비주얼 배너 + 세부 탭 ══ */}
      <section className="wt-kv">
        <div className="wt-kv-box">
          {/* 배경 — 글자 없는 그러데이션 (이미지를 쓰려면 SHOW_KV_IMG 를 true 로) */}
          {SHOW_KV_IMG ? (
            <img className="wt-kv-img" src="/winter/kv.png" alt="2027 다인교육 윈터스쿨" />
          ) : (
            <div className="wt-kv-bg" aria-hidden="true">
              <span className="wt-kv-beam" />
              <span className="wt-kv-orb" />
            </div>
          )}
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
          <div className="wt-kvnav-in">
            {sectionNav.map((s) => (
              <a href={s.href} key={s.href}>{s.label}</a>
            ))}
            <a className="wt-kvnav-cta" href={BROCHURE} target="_blank" rel="noopener noreferrer">
              <svg className="wt-pdf-ico" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M13.5 3H7.5A2 2 0 0 0 5.5 5v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8z"
                  fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"
                />
                <path d="M13.5 3v5h5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                <path
                  d="M12 11v5m0 0-2-2m2 2 2-2"
                  fill="none" stroke="currentColor" strokeWidth="1.7"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
              모집요강 PDF
            </a>
          </div>
          <p className="wt-scroll-hint wt-kvnav-hint">
            <span aria-hidden="true">←</span> 좌우로 밀어 메뉴를 확인하세요 <span aria-hidden="true">→</span>
          </p>
        </div>
      </section>

      {/* ══ 섹션 내비 (고정) ══ */}
      {SHOW_SNAV && (
      <nav className="wt-snav" id="wtSnav" aria-label="섹션 이동">
        <div className="wt-snav-in">
          {sectionNav.map((s) => (
            <a href={s.href} key={s.href}>{s.label}</a>
          ))}
        </div>
      </nav>
      )}

      {/* ══ 3) 입시 개편 ══ */}
      <section className="wt-sec wt-reform" id="reform">
        <div className="wt-wrap">
          <p className="wt-tag wt-tag-inv">Admission Reform</p>
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
                <ReformArt kind={r.art} />
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
            다인교육 학생의 하루는<br />흔들리지 않습니다
          </p>
        </div>
      </section>

      {/* ══ 4) 다인아카데미를 선택하는 이유 ══ */}
      <section className="wt-sec wt-result" id="result">
        <div className="wt-wrap">
          <p className="wt-tag">Why DAIN</p>
          <h2 className="wt-h2">
            이번 겨울,<br /><em>다인아카데미를 선택하는 이유</em>
          </h2>

          <div className="wt-why-grid">
            {whyReasons.map((r, i) => (
              <article className="wt-why-card wt-up" style={{ transitionDelay: `${i * 80}ms` }} key={r.no}>
                <span className="wt-why-no">{r.no}</span>
                <b className="wt-why-t">{r.t}</b>
                <p className="wt-why-d">{r.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4-2) 우리가 지키는 기준 ══ */}
      <section className="wt-sec wt-why" id="why">
        <div className="wt-wrap">
          <p className="wt-tag">Our Standard</p>
          <h2 className="wt-h2">
            결과를 말하기 전에,<br /><em>기준을 먼저 지킵니다</em>
          </h2>
          <p className="wt-lead wt-dark">2027 윈터스쿨에서 학생 한 명에게 약속드리는 관리의 기준입니다.</p>

          <div className="wt-stats">
            {whyStats.map((s, i) => (
              <div className="wt-stat wt-up" style={{ transitionDelay: `${i * 70}ms` }} key={s.label}>
                <span className="wt-stat-label">{s.label}</span>
                <b className="wt-stat-value">
                  <span className="wt-num" data-num={s.value}>0</span>
                  <i>{s.unit}</i>
                </b>
              </div>
            ))}
          </div>
          <p className="wt-note">※ 2027 윈터스쿨 운영 기준이며, 학사 일정에 따라 조정될 수 있습니다.</p>
        </div>
      </section>

      {/* ══ 5) 합격 실적 · 후기 — 개원 후 실제 데이터가 쌓이면 true 로 바꿔 주세요 */}
      {SHOW_RESULT && (
      <section className="wt-sec wt-result">
        <div className="wt-wrap">
          <p className="wt-tag">Growth Record</p>
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
      )}

      {/* ══ 6) 강사진 ══ */}
      <section className="wt-sec wt-faculty" id="faculty">
        <div className="wt-wrap">
          <p className="wt-tag">Faculty</p>
          <h2 className="wt-h2">
            학원가가 증명한<br /><em>강사진</em>
          </h2>
          <p className="wt-lead wt-dark">
            {faculty.lead.map((l, i) => (
              <span className="wt-fc-leadline" key={i}>{l}</span>
            ))}
          </p>

          {SHOW_FACULTY_AREAS && (
          <div className="wt-fc-grid">
            {faculty.areas.map((a, i) => (
              <article className="wt-fc-item wt-up" style={{ transitionDelay: `${i * 80}ms` }} key={a.name}>
                <b className="wt-fc-area">{a.name}</b>
                <p className="wt-fc-desc">{a.desc}</p>
              </article>
            ))}
          </div>
          )}

          {faculty.photo && (
            <figure className="wt-fc-photo wt-up">
              <img src={faculty.photo} alt="다인아카데미 윈터스쿨 강사진" />
            </figure>
          )}

          <div className="wt-fc-note wt-up">
            <span className="wt-fc-shine" aria-hidden="true" />
            <span className="wt-fc-punch-rule" aria-hidden="true" />
            <p className="wt-fc-punch">
              전과목 <em>학원가 대표 강사</em> 출강!
            </p>
          </div>
        </div>
      </section>

      {/* ══ 6) 학습 공간 ══ */}
      <section className="wt-sec wt-space" id="space">
        <div className="wt-wrap">
          <p className="wt-tag wt-tag-inv">Campus</p>
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
          <p className="wt-tag">Management</p>
          <h2 className="wt-h2">
            완벽한 성장을 위한<br /><em>4대 밀착 케어 시스템</em>
          </h2>
          <p className="wt-lead wt-dark">
            {careLead.map((l, i) => (
              <span className="wt-fc-leadline" key={i}>{l}</span>
            ))}
          </p>

          <div className="wt-care-grid">
            {careCards.map((c, i) => (
              <article className="wt-care wt-up" style={{ transitionDelay: `${i * 90}ms` }} key={c.no}>
                <div className="wt-care-head">
                  <span className="wt-care-no">{c.no}</span>
                  <span className="wt-care-ttl">
                    <b>{c.name}</b>
                    <i>{c.en}</i>
                  </span>
                </div>
                <p className="wt-care-lead">{c.lead}</p>
                <ul className="wt-care-list">
                  {c.items.map((it) => (
                    <li key={it.t}>
                      <b>{it.t}</b>
                      {it.d && <span>{it.d}</span>}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="wt-formula wt-up">
            <b>{careFormula.a}</b>
            <i aria-hidden="true">+</i>
            <b>{careFormula.b}</b>
            <i aria-hidden="true">=</i>
            <em>{careFormula.result}</em>
          </p>

          {SHOW_MANAGE_TABS && (
          <>
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
          </>
          )}
        </div>
      </section>

      {/* ══ 7-2) 보이지 않던 공부까지 ══ */}
      <section className="wt-sec wt-record">
        <div className="wt-wrap">
          <p className="wt-tag">Daily Record</p>
          <h2 className="wt-h2">
            보이지 않던 공부까지<br /><em>관리합니다</em>
          </h2>
          <p className="wt-lead wt-dark">
            {recordLead.map((l, i) => (
              <span className="wt-fc-leadline" key={i}>{l}</span>
            ))}
          </p>

          <div className="wt-rec-grid">
            {recordCards.map((c, i) => (
              <article className="wt-rec wt-up" style={{ transitionDelay: `${i * 80}ms` }} key={c.no}>
                <span className="wt-rec-no">{c.no}</span>
                <b className="wt-rec-name">{c.name}</b>
                <span className="wt-rec-en">{c.en}</span>
                <p className="wt-rec-desc">{c.desc}</p>
              </article>
            ))}
          </div>

          <ul className="wt-chips">
            {recordChips.map((c, i) => (
              <li className="wt-up" style={{ transitionDelay: `${i * 70}ms` }} key={c.t}>
                <b>{c.t}</b>
                <span>{c.d}</span>
              </li>
            ))}
          </ul>

          <p className="wt-quote wt-up">{recordQuote}</p>
        </div>
      </section>

      {/* ══ 7-3) AI 분석 + 태블릿 관리 ══ */}
      <section className="wt-sec wt-ai">
        <div className="wt-wrap">
          <p className="wt-tag wt-tag-inv">AI + Teacher</p>
          <h2 className="wt-h2 wt-inv">
            AI가 분석하고,<br /><em>선생님이 완성합니다</em>
          </h2>
          <p className="wt-lead">
            {aiLead.map((l, i) => (
              <span className="wt-fc-leadline" key={i}>{l}</span>
            ))}
          </p>

          <ol className="wt-flow">
            {aiSteps.map((st, i) => (
              <li className="wt-up" style={{ transitionDelay: `${i * 90}ms` }} key={st.no}>
                <span className="wt-flow-no">{st.no}</span>
                <b>{st.t}</b>
              </li>
            ))}
          </ol>

          <div className="wt-tab-block">
            {aiPhoto && (
              <figure className="wt-tab-photo wt-up">
                <img src={aiPhoto} alt="다인에듀 태블릿으로 학습하는 모습" />
              </figure>
            )}
            <div className="wt-tab-side">
              <h3 className="wt-h3 wt-inv">{aiTablet.title}</h3>
              <p className="wt-tab-lead">{aiTablet.lead}</p>
              <ul className="wt-tab-list">
                {aiTablet.items.map((it, i) => (
                  <li key={it.t}>
                    <span className="wt-tab-no">{String(i + 1).padStart(2, "0")}</span>
                    <span className="wt-tab-txt">
                      <b>{it.t}</b>
                      <span>{it.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="wt-report">
            <span className="wt-report-head">
              <i className="wt-report-en">Daily Report</i>
              <b className="wt-report-ttl">하루의 학습이, 매일의 리포트로</b>
            </span>
            <ul>
              {aiTablet.report.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>

          <p className="wt-quote wt-quote-inv wt-up">{aiQuote}</p>
        </div>
      </section>

      {/* ══ 8) 학년별 주당 수업 시수 + 하루 ══ */}
      <section className="wt-sec wt-cur">
        <div className="wt-wrap">
          <p className="wt-tag">Winter Curriculum</p>
          <h2 className="wt-h2">
            학년마다,<br /><em>필요한 준비는 다릅니다</em>
          </h2>
          <p className="wt-lead wt-dark">맞춤선택형 — 학생의 현재 수준에서 가장 필요한 학습을 설계합니다.</p>

          <div className="wt-gtabs" id="wtGradeTabs" role="tablist" aria-label="학년 선택">
            {gradeTabs.map((g, i) => (
              <button
                className={`wt-gtab${i === 0 ? " is-on" : ""}`}
                type="button"
                data-grade={g}
                role="tab"
                aria-selected={i === 0}
                key={g}
              >
                {g}
              </button>
            ))}
          </div>

          {gradeTabs.map((g, i) => (
            <div className={`wt-gpanel${i === 0 ? " is-on" : ""}`} data-panel={g} key={g}>
              <p className="wt-gpanel-head">
                <b>주당 수업 시수</b>
                <span>{gradeHours[g].lead}</span>
              </p>

              {gradeHours[g].blocks.map((block, bi) => (
                <div className="wt-hour-scroll" key={bi}>
                  <table className="wt-hour">
                    <thead>
                      <tr>
                        {block.map((grp) => (
                          <th className="wt-hour-grp" colSpan={grp.cols.length} key={grp.group}>
                            {grp.group}
                          </th>
                        ))}
                      </tr>
                      <tr>
                        {block.flatMap((grp) =>
                          kindRuns(grp.cols).map((r, ri) => (
                            <th
                              className={`wt-hour-kind${r.pick ? " is-pick" : ""}`}
                              colSpan={r.span}
                              key={`${grp.group}-k${ri}`}
                            >
                              {r.pick ? "선택" : "권장필수"}
                            </th>
                          )),
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {block.flatMap((grp) =>
                          grp.cols.map((c, ci) => (
                            <td className={`wt-hour-name${c.pick ? " is-pick" : ""}`} key={`${grp.group}-n${ci}`}>
                              {c.name}
                            </td>
                          )),
                        )}
                      </tr>
                      <tr>
                        {block.flatMap((grp) =>
                          grp.cols.map((c, ci) => (
                            <td className={`wt-hour-num${c.pick ? " is-pick" : ""}`} key={`${grp.group}-h${ci}`}>
                              {c.hours}
                            </td>
                          )),
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}

              <ul className="wt-hour-notes">
                {gradeHoursNotes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>

              {/* 상세 과목별 요강 — 눌러서 펼치면 브로슈어 해당 면이 열립니다 */}
              <details className="wt-fold">
                <summary className="wt-fold-head">
                  <span className="wt-fold-t">
                    <b>{g}</b> 상세 과목별 요강
                  </span>
                  <span className="wt-fold-act">
                    <i className="wt-fold-ico" aria-hidden="true" />
                  </span>
                </summary>
                <div className="wt-fold-body">
                  <iframe
                    className="wt-fold-frame"
                    data-src={`${gradeHours[g].pdf}#view=FitH&toolbar=0`}
                    title={`${g} 상세 과목별 요강`}
                  />
                  <p className="wt-fold-alt">
                    <a href={gradeHours[g].pdf} target="_blank" rel="noopener noreferrer">새 창에서 보기 ↗</a>
                    <a href={gradeHours[g].pdf} download>PDF 내려받기 ↓</a>
                  </p>
                </div>
              </details>
            </div>
          ))}
        </div>

      {/* 과목별 커리큘럼 — 학년별 시수표로 대체해 숨김 */}
      {SHOW_CURRICULUM && (
        <div className="wt-wrap wt-cur-grid">
          <div>
            <p className="wt-tag">Winter Curriculum</p>
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
        </div>
      )}

        {/* 하루 시간표 */}
        <div className="wt-wrap">
          <section className="wt-day">
            <p className="wt-tag">A Day</p>
            <h3 className="wt-h3">몰입은 의지가 아니라 루틴에서 만들어집니다</h3>
            <p className="wt-scroll-hint wt-table-scroll-hint">
              <span aria-hidden="true">←</span> 표를 좌우로 밀어 시간표를 확인하세요 <span aria-hidden="true">→</span>
            </p>

            <div className="wt-tt-scroll">
              <table className="wt-tt">
                <thead>
                  <tr>
                    {dayTable.head.map((h, i) => (
                      <th key={h} className={i < 2 ? "wt-tt-hd" : undefined} scope="col">
                        {i === 0 ? "" : h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dayTable.rows.map((r) => (
                    <tr key={r.label}>
                      <th className="wt-tt-lb" scope="row">{r.label}</th>
                      <td className="wt-tt-time">{r.time}</td>
                      {r.cells.map((c, i) => (
                        <td
                          key={`${r.label}-${i}`}
                          colSpan={c.cs}
                          rowSpan={c.rs}
                          className={c.tone === "meal" ? "wt-tt-meal" : c.tone === "pick" ? "wt-tt-pick" : undefined}
                        >
                          {c.t}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="wt-tt-note">※ 일정은 학사 운영에 따라 조정될 수 있습니다.</p>
          </section>
        </div>
      </section>

      {/* ══ 9) 장학 ══ */}
      {/* 장학 — 제도가 확정되면 true 로 바꿔 주세요 */}
      {SHOW_SCHOLAR && (
      <section className="wt-sec wt-scholar">
        <div className="wt-wrap">
          <p className="wt-tag wt-tag-inv">Scholarship</p>
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
      )}

      {/* ══ 10) 모집 안내 + FAQ ══ */}
      <section className="wt-sec wt-adm" id="admission">
        <div className="wt-wrap">
          <p className="wt-tag">Admission</p>
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
              <p className="wt-adm-note">{admissionNote}</p>

              <div className="wt-doc">
                <a className="wt-doc-btn" href={BROCHURE} target="_blank" rel="noopener noreferrer">
                  모집요강 바로보기
                  <i aria-hidden="true">↗</i>
                </a>
                <a className="wt-doc-btn wt-doc-line" href={BROCHURE} download>
                  PDF 내려받기
                  <i aria-hidden="true">↓</i>
                </a>
              </div>
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
        </div>
      </section>

      {/* ══ 10) 등록 혜택 ══ */}
      {/* 등록 혜택 — 다시 보이려면 SHOW_BENEFIT 을 true 로 */}
      {SHOW_BENEFIT && (
      <section className="wt-sec wt-benefit" id="benefit">
        <div className="wt-wrap">
          <p className="wt-tag">Benefit</p>
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
      )}

      {/* ══ 11) 자주 묻는 질문 ══ */}
      <section className="wt-sec wt-faqsec">
        <div className="wt-wrap">
          <div className="wt-faq" id="wtFaq">
            <p className="wt-tag">FAQ</p>
            <h2 className="wt-h2">자주 묻는 질문</h2>
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

      {/* ══ 12) 클로징 ══ */}
      <section className="wt-close">
        <div className="wt-wrap">
          <p className="wt-close-small">2028학년도 처음 열리는 입시</p>
          <h2 className="wt-close-big">
            흔들릴 시간 없이,<br /><em>이번 겨울 다인교육에서</em>
          </h2>
          <div className="wt-close-btns">
            <a className="wt-btn wt-btn-primary" href={CONSULT}>입학 상담 신청</a>
            <a className="wt-btn wt-btn-ghost" href="tel:16440224">전화 문의 1644-0224</a>
          </div>
          <p className="wt-sign">DAIN EDUCATION</p>
        </div>
      </section>

      <SiteFooter />

      {/* ══ 하단 고정 CTA ══ */}
      <div className="wt-fixed" id="wtFixed">
        <div className="wt-fixed-in">
          <div className="wt-fixed-info">
            <span><b>개강일</b> 2027.01.04(월)</span>
            <span><b>교육 기간</b> 2027.01.04 ~ 02.19</span>
          </div>
          <a className="wt-fixed-btn" href={CONSULT}>선착순 예약하기</a>
        </div>
      </div>

      <Script id="winter-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: winterScript }} />
    </main>
  );
}
