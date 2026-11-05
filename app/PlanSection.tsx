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
import type { PlanDoc } from "@/lib/planDoc";

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

      {/* ── 01 연간 로드맵 ── */}
      <section className="pl-sec">
        <p className="pl-sec-no">01</p>
        <h3 className="pl-h2">연간 로드맵</h3>
        <p className="pl-lead">
          한 해 동안 어떤 과정이 언제 진행되는지 한눈에 보는 표입니다.
          테두리만 있는 칸은 수업 없이 과제로 진행되거나 병행되는 과정입니다.
        </p>

        <div className="pl-road">
          <div className="pl-road-in">
            <div className="pl-road-row" style={grid}>
              <div className="pl-road-cell" aria-hidden="true" />
              {doc.roadmap.months.map((m) => (
                <div className="pl-road-cell" key={m}>{m}</div>
              ))}
            </div>

            {doc.roadmap.rows.map((row) => {
              /* 달마다 무엇이 들어가는지 미리 칸을 채워 둡니다 */
              const slots: (null | { bar: (typeof row.bars)[number]; span: number })[] =
                Array(cols).fill(null);
              const skip = new Set<number>();
              row.bars.forEach((b) => {
                slots[b.from] = { bar: b, span: b.to - b.from + 1 };
                for (let i = b.from + 1; i <= b.to; i++) skip.add(i);
              });

              return (
                <div className="pl-road-row" style={grid} key={row.label}>
                  <div className="pl-road-label">{row.label}</div>
                  {Array.from({ length: cols }, (_, i) => {
                    if (skip.has(i)) return null;
                    const s = slots[i];
                    if (!s) return <div className="pl-road-cell" key={i} />;
                    return (
                      <div
                        className={`pl-road-bar${s.bar.tone === "line" ? " is-line" : ""}`}
                        style={{ gridColumn: `span ${s.span}` }}
                        key={i}
                      >
                        {s.bar.text}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <p className="pl-road-hint">※ 화면이 좁으면 표를 옆으로 밀어서 보실 수 있습니다.</p>
      </section>

      {/* ── 02 단계별 과정 ── */}
      <section className="pl-sec">
        <p className="pl-sec-no">02</p>
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
        <p className="pl-sec-no">03</p>
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
        <p className="pl-sec-no">04</p>
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

      {/* ── 05 안내 ── */}
      <section className="pl-sec">
        <p className="pl-sec-no">05</p>
        <h3 className="pl-h2">안내 사항</h3>
        <ul className="pl-notes">
          {doc.notes.map((n) => <li key={n}>{n}</li>)}
        </ul>
      </section>
    </div>
  );
}
