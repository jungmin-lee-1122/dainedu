import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { teachersScript } from "./teachersScript";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import PageBand from "../PageBand";
import { quickMenuMarkup } from "../quickMenu";
import { subjects } from "./teachersData";
import { getTeachers } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "강사진 소개 — 다인교육 동탄점",
  description:
    "대치·목동·분당·평촌에서 검증된 다인교육 동탄점의 과목별 강사진과 개설 강좌를 확인하세요.",
};

export default async function TeachersPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const { subject } = await searchParams;
  const teachers = await getTeachers();
  const activeSubject = subject && subjects.includes(subject) ? subject : "전체";
  const filtered = activeSubject === "전체"
    ? teachers
    : teachers.filter((teacher) => teacher.subject === activeSubject);

  return (
    <main className="dn-body tc-page">
      <SiteHeader />

      <PageBand
        eyebrow="Faculty"
        title="강사진 소개"
        sub={[
          "검증된 강의력과 학생을 끝까지 책임지는 선생님을 소개합니다.",
          "강사별 프로필과 개설 강좌를 한곳에서 확인하세요.",
        ]}
        crumb={[{ label: "강사진 소개" }]}
      >
        <span className="pb-chip">
          전체 <b>{teachers.length}</b>명
        </span>
      </PageBand>

      <section className="tc-sec">
        <div className="tc-wrap">
          <nav className="tc-filter" aria-label="강사진 과목 필터">
            {subjects.map((item) => {
              const on = item === activeSubject;
              const href = item === "전체" ? "/teachers" : `/teachers?subject=${encodeURIComponent(item)}`;
              return (
                <Link
                  className={`tc-filter-btn${on ? " is-on" : ""}`}
                  href={href}
                  aria-current={on ? "page" : undefined}
                  scroll={false}
                  key={item}
                >
                  {item}
                </Link>
              );
            })}
          </nav>

          <div className="tc-result-head">
            <p><b>{activeSubject}</b> 강사진</p>
            <span>총 {filtered.length}명</span>
          </div>

          {filtered.length > 0 ? (
            <ul className="tc-grid">
              {filtered.map((teacher, i) => (
                <li className="tc-grid-item" key={teacher.id}>
                  <Link
                    className={`tc-card tc-up${teacher.revealed ? " is-open" : ""}`}
                    href={`/teachers/${teacher.id}?subject=${encodeURIComponent(activeSubject)}`}
                    style={{ transitionDelay: `${(i % 4) * 70}ms` }}
                  >
                    <div className="tc-card-top">
                      <div className="tc-tags">
                        {teacher.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                      <span className="tc-open">{teacher.openAt}</span>
                    </div>
                    <p className="tc-card-subject">{teacher.subject}</p>
                    <h2 className="tc-card-name">{teacher.name}</h2>

                    <div className="tc-card-profile" aria-hidden={!teacher.revealed}>
                      {teacher.revealed && teacher.photo ? (
                        <img src={teacher.photo} alt={`${teacher.name} 선생님`} />
                      ) : (
                        <span>?</span>
                      )}
                    </div>

                    <div className="tc-card-overlay">
                      <small>PROFILE</small>
                      <strong>{teacher.school || teacher.copy}</strong>
                      <ul>
                        {teacher.career.map((career) => <li key={career}>{career}</li>)}
                      </ul>
                      <span className="tc-card-more">상세보기 →</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="tc-empty">등록된 {activeSubject} 강사진이 없습니다.</p>
          )}

          <p className="tc-note">※ 강사진 정보는 계약 및 출강 사실이 확인된 내용만 게시합니다.</p>
        </div>
      </section>

      <section className="tc-lineup">
        <div className="tc-wrap tc-lineup-in">
          <div>
            <p className="tc-eyebrow tc-eyebrow-inv">Line-up</p>
            <h2 className="tc-h2">과목별 라인업</h2>
            <p className="tc-lineup-desc">
              전 과목 정규 강사진을 자체 편성했습니다.<br />
              출강 이력과 담당 과정을 함께 공개합니다.
            </p>
          </div>
          <div className="tc-lineup-tags">
            {subjects.slice(1).map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="tc-cta">
        <div className="tc-wrap">
          <p className="tc-eyebrow">Class Schedule</p>
          <h2 className="tc-h2">선생님의 수업이 궁금하다면</h2>
          <p className="tc-cta-desc">모집 대상과 과목별로 현재 편성된 강좌를 확인하세요.</p>
          <a className="tc-cta-btn" href="/schedule">단과시간표 확인하기</a>
        </div>
      </section>

      <SiteFooter />
      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />
      <Script id="teachers-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: teachersScript }} />
    </main>
  );
}
