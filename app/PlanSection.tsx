// ═══════════════════════════════════════════════════════════
//  연간 계획서 — 다인에듀 공통 서식 (화면)
//
//  선생님마다 서식이 제각각이라, 받은 자료에서 겹치는 항목만 추려
//  다섯 칸(연간로드맵 / 단계별과정 / 주간운영 / 관리·피드백 / 안내)으로
//  통일했습니다. 내용은 lib/planDoc.ts 에.
//
//  ※ 학력·약력은 바로 위 프로필 카드에 이미 나오므로 여기서는 빼 둡니다.
//
//  쓰는 곳
//   · 강사 상세페이지 (/teachers/[id]) — 큰 애니메이션 바로 아래
//   · /plan-lab (서식 미리보기 테스트)
//
//  ※ 스타일은 lib/planDocStyles.ts 안에만 있습니다(globals.css 무관).
//    바깥에 .pl 클래스를 한 번 걸어 주면 그 안에서만 적용됩니다.
// ═══════════════════════════════════════════════════════════
import type { CSSProperties } from "react";
import Script from "next/script";
import type { PlanDoc } from "@/lib/planDoc";
import { planRevealScript } from "@/lib/planRevealScript";

export default function PlanSection({
  doc,
  /** 상세페이지에서는 제목을 한 번 더 크게 보여 줍니다 */
  showTitle = false,
}: {
  doc: PlanDoc;
  showTitle?: boolean;
}) {
  const cols = doc.roadmap.months.length;
  const grid = { gridTemplateColumns: `116px repeat(${cols}, minmax(0,1fr))` };

  return (
    <div className="pl-doc">
      {showTitle && (
        <div className="pl-doc-head">
          <p className="pl-kicker">ANNUAL PLAN</p>
          <h2 className="pl-doc-title">
            {doc.year} <em>{doc.subject}</em> 연간 계획서
          </h2>
          {doc.tagline && <p className="pl-sub">{doc.tagline}</p>}
          <div className="pl-meta">
            <span>{doc.target}</span>
            <span>{doc.subject}</span>
            <span>{doc.teacher} 선생님</span>
          </div>
        </div>
      )}

      {/* ── 01 연간 로드맵 ──
          간트 차트: 과정마다 "시작 달 → 끝 달" 을 하나로 이어진 바로 그립니다.
          머리줄(월) · 세로 가이드 · 바가 모두 같은 grid 를 쓰므로 정확히 맞습니다.
          데이터(lib/planDoc.ts)는 그대로이고 보여 주는 방식만 바꿨습니다. */}
      <section className="pl-sec">
        <p className="pl-sec-no"><b>01</b><s aria-hidden="true" />CURRICULUM ROADMAP</p>
        <h3 className="pl-h2">연간 학습 로드맵</h3>
        <p className="pl-lead">
          기초부터 실전까지, 단계적으로 완성하는 1년의 학습 과정입니다.
        </p>

        <div className="rm" style={{ "--cols": cols } as CSSProperties}>
          <div className="rm-scroll">
            <div className="rm-grid">
              {/* 머리줄 — 월 */}
              <div className="rm-head">
                <div className="rm-head-label">COURSE</div>
                <div className="rm-head-track">
                  {doc.roadmap.months.map((m) => (
                    <span className="rm-month" key={m}>{m}</span>
                  ))}
                </div>
              </div>

              <div className="rm-body">
                {/* 세로 가이드라인 — 한 겹만 깔립니다 */}
                <div className="rm-guides" aria-hidden="true">
                  {Array.from({ length: cols }, (_, i) => <i key={i} />)}
                </div>

                {doc.roadmap.rows.map((row, ri) => (
                  <div className="rm-row" key={row.label}>
                    <div className="rm-label">{row.label}</div>
                    <div className="rm-track">
                      {row.bars.map((b, bi) => {
                        const span = b.to - b.from + 1;
                        return (
                          <div
                            className={
                              "rm-bar" +
                              (b.tone === "line" ? " is-line" : "") +
                              (span === 1 ? " is-short" : "")
                            }
                            style={{
                              "--from": b.from,
                              "--span": span,
                              /* 왼쪽 → 오른쪽, 위 → 아래 순서로 열립니다 */
                              "--d": ri * 1.5 + b.from,
                            } as CSSProperties}
                            title={b.text}
                            key={bi}
                          >
                            {b.text}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="rm-foot">
            <span className="rm-key"><i aria-hidden="true" />정규 수업 과정</span>
            <span className="rm-key is-line"><i aria-hidden="true" />병행 · 대비 구간</span>
            <span className="rm-hint">화면이 좁으면 표를 옆으로 밀어서 보실 수 있습니다.</span>
          </p>
        </div>
      </section>

      {/* ── 02 단계별 과정 ── */}
      <section className="pl-sec">
        <p className="pl-sec-no"><b>02</b><s aria-hidden="true" />PROGRAM BY STAGE</p>
        <h3 className="pl-h2">단계별 과정</h3>
        <p className="pl-lead">각 단계의 기간과 사용 교재, 도달 목표입니다.</p>

        <div className="pl-steps">
          {doc.steps.map((s) => (
            <article className={`pl-step${s.tone === "extra" ? " is-extra" : ""}`} key={s.no}>
              <div className="pl-step-side">
                <span className="pl-step-no">{s.no}</span>
                <span className="pl-step-name">{s.name}</span>
                {s.period && <span className="pl-step-period">{s.period}</span>}
              </div>
              <div className="pl-step-body">
                {s.books && s.books.length > 0 && (
                  <ul className="pl-books">
                    {s.books.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                )}
                <p className="pl-step-goal">{s.goal}</p>
                {s.detail && <p className="pl-step-detail">{s.detail}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── 03 주간 운영 ── */}
      <section className="pl-sec">
        <p className="pl-sec-no"><b>03</b><s aria-hidden="true" />WEEKLY OPERATION</p>
        <h3 className="pl-h2">한 주는 이렇게 돌아갑니다</h3>
        <p className="pl-lead">수업 · 테스트 · 과제의 주 단위 운영 방식입니다.</p>

        <div className="pl-weekly">
          {doc.weekly.map((w) => (
            <div className="pl-week" key={w.label}>
              <b>{w.label}</b>
              <strong>{w.value}</strong>
              {w.note && <p>{w.note}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ── 04 관리 · 피드백 ── */}
      <section className="pl-sec">
        <p className="pl-sec-no"><b>04</b><s aria-hidden="true" />CARE & FEEDBACK</p>
        <h3 className="pl-h2">관리 · 피드백</h3>
        <p className="pl-lead">결석 보강부터 상담까지, 수업 밖에서 챙기는 것들입니다.</p>

        <ul className="pl-care">
          {doc.care.map((c) => (
            <li key={c.label}>
              <b>{c.label}</b>
              <span>{c.desc}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 스크롤해서 보이면 띠가 차례로 차오릅니다 */}
      <Script id="plan-reveal" strategy="afterInteractive">
        {planRevealScript}
      </Script>

      {/* ── 05 안내 ── */}
      <section className="pl-sec">
        <p className="pl-sec-no"><b>05</b><s aria-hidden="true" />NOTICE</p>
        <h3 className="pl-h2">안내 사항</h3>
        <ul className="pl-notes">
          {doc.notes.map((n) => <li key={n}>{n}</li>)}
        </ul>
      </section>
    </div>
  );
}
