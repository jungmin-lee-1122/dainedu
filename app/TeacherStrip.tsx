// ═══════════════════════════════════════════════════════════
//  선생님 띠 (포르타 · 클라비스 전용)
//
//  · 카드 모양은 강사진 소개 페이지(/teachers)와 똑같은 .tc-card 를 그대로 씁니다.
//  · 과목 탭을 누르면 해당 과목만 남고, 가만히 두면 천천히 자동으로 흘러갑니다.
//  · 동작은 app/teacherStripScript.ts 에 있습니다.
// ═══════════════════════════════════════════════════════════
import Link from "next/link";
import type { Teacher } from "./teachers/teachersData";
import { subjects } from "./teachers/teachersData";

export default function TeacherStrip({ teachers }: { teachers: Teacher[] }) {
  if (!teachers.length) return null;

  return (
    <section className="ts-sec" id="teachers">
      <div className="cv-wrap">
        <div className="ts-head">
          <h2 className="ts-title">선생님</h2>

          <div className="ts-tabs" role="tablist" aria-label="과목 선택">
            {subjects.map((s, i) => (
              <button
                className={`ts-tab${i === 0 ? " is-on" : ""}`}
                type="button"
                data-subject={s}
                role="tab"
                aria-selected={i === 0}
                key={s}
              >
                {s}
              </button>
            ))}
          </div>

          <Link className="ts-more" href="/teachers" aria-label="강사진 전체 보기">
            <span aria-hidden="true">+</span>
          </Link>
        </div>
      </div>

      <div className="ts-view" id="dnTeacherStrip">
        <div className="ts-track">
          {teachers.map((t) => (
            <div className="ts-item" data-subject={t.subject} key={t.id}>
              <Link
                className={`tc-card${t.revealed ? " is-open" : ""}`}
                href={`/teachers/${t.id}?subject=${encodeURIComponent(t.subject)}`}
              >
                <div className="tc-card-top">
                  <div className="tc-tags">
                    {t.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <span className="tc-open">{t.openAt}</span>
                </div>
                <p className="tc-card-subject">{t.subject}</p>
                <h3 className="tc-card-name">{t.name}</h3>

                <div className="tc-card-profile" aria-hidden={!t.revealed}>
                  {t.revealed && t.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.photo} alt={`${t.name} 선생님`} />
                  ) : (
                    <span>?</span>
                  )}
                </div>

                <div className="tc-card-overlay">
                  <small>PROFILE</small>
                  <strong>{t.school || t.copy}</strong>
                  <ul>
                    {t.career.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                  <span className="tc-card-more">상세보기 →</span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <button className="ts-arrow ts-arrow-prev" type="button" data-dir="prev" aria-label="이전 선생님">‹</button>
        <button className="ts-arrow ts-arrow-next" type="button" data-dir="next" aria-label="다음 선생님">›</button>
        <p className="ts-empty" hidden>해당 과목의 선생님이 아직 등록되지 않았습니다.</p>
      </div>
    </section>
  );
}
