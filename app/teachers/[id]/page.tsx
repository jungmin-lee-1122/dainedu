import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../SiteHeader";
import SiteFooter from "../../SiteFooter";
import { quickMenuMarkup } from "../../quickMenu";
import { teachersScript } from "../teachersScript";
import { subjects } from "../teachersData";
import { getTeachers, getCourses } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const teachers = await getTeachers();
  const teacher = teachers.find((item) => item.id === id);
  return {
    title: teacher ? `${teacher.name} ${teacher.subject} 강사 — 다인교육 동탄점` : "강사진 — 다인교육 동탄점",
  };
}

export default async function TeacherDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ subject?: string; view?: string }>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const [teachers, courses] = await Promise.all([getTeachers(), getCourses()]);
  const current = teachers.find((teacher) => teacher.id === id);
  if (!current) notFound();

  const activeSubject = query.subject && subjects.includes(query.subject)
    ? query.subject
    : current.subject;
  const activeView = query.view === "courses" ? "courses" : "intro";
  const group = activeSubject === "전체"
    ? teachers
    : teachers.filter((teacher) => teacher.subject === activeSubject);
  const teacherCourses = courses.filter((course) => course.teacherId === current.id);

  return (
    <main className="dn-body td-page">
      <SiteHeader />

      <section className="td-head">
        <div className="tc-wrap">
          <Link className="td-back" href={`/teachers?subject=${encodeURIComponent(activeSubject)}`}>← 강사진 목록</Link>
          <p className="tc-eyebrow">Faculty Detail</p>
          <h1>강사 라인업</h1>
          <p>강사의 소개와 약력, 현재 개설된 강좌를 확인할 수 있습니다.</p>
        </div>
      </section>

      <section className="td-body">
        <div className="tc-wrap">
          <nav className="tc-filter td-subjects" aria-label="강사진 과목 필터">
            {subjects.map((subject) => {
              const target = subject === "전체"
                ? teachers[0]
                : teachers.find((teacher) => teacher.subject === subject);
              const href = target
                ? `/teachers/${target.id}?subject=${encodeURIComponent(subject)}`
                : `/teachers?subject=${encodeURIComponent(subject)}`;
              return (
                <Link className={`tc-filter-btn${subject === activeSubject ? " is-on" : ""}`} href={href} key={subject}>
                  {subject}
                </Link>
              );
            })}
          </nav>

          <div className="td-teacher-strip" aria-label={`${activeSubject} 강사 선택`}>
            {group.map((teacher) => (
              <Link
                className={`td-mini${teacher.id === current.id ? " is-on" : ""}`}
                href={`/teachers/${teacher.id}?subject=${encodeURIComponent(activeSubject)}`}
                key={teacher.id}
              >
                <span className="td-mini-face">
                  {teacher.revealed && teacher.photo
                    ? <img src={teacher.photo} alt="" />
                    : <b aria-hidden="true">?</b>}
                </span>
                <span>{teacher.name}</span>
              </Link>
            ))}
          </div>

          <article className="td-profile">
            <div className="td-profile-copy">
              <div className="tc-tags">
                {current.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <p className="td-subject">{current.subject}</p>
              <h2>{current.name} <small>선생님</small></h2>
              <p className="td-slogan">{current.copy}</p>
              <div className="td-rule" aria-hidden="true" />
              <ul className="td-career">
                {current.career.map((career) => <li key={career}>{career}</li>)}
              </ul>
              {current.videoUrl && (
                <a className="td-video-link" href={current.videoUrl} target="_blank" rel="noreferrer">소개 영상 보기 ↗</a>
              )}
            </div>

            <div className="td-profile-photo">
              <span className="td-photo-ring" aria-hidden="true" />
              {current.revealed && current.photo ? (
                <img src={current.photo} alt={`${current.name} 선생님`} />
              ) : (
                <div className="td-profile-placeholder">
                  <b>?</b>
                  <span>{current.openAt}</span>
                </div>
              )}
            </div>
          </article>

          <div className="td-tabs" role="navigation" aria-label="강사 상세 메뉴">
            <Link
              className={activeView === "intro" ? "is-on" : ""}
              href={`/teachers/${current.id}?subject=${encodeURIComponent(activeSubject)}&view=intro`}
              scroll={false}
            >
              강사 소개
            </Link>
            <Link
              className={activeView === "courses" ? "is-on" : ""}
              href={`/teachers/${current.id}?subject=${encodeURIComponent(activeSubject)}&view=courses`}
              scroll={false}
            >
              개설 강좌 <span>{teacherCourses.length}</span>
            </Link>
          </div>

          <div className="td-tab-panel">
            {activeView === "intro" ? (
              current.introPoster ? (
                <img className="td-intro-poster" src={current.introPoster} alt={`${current.name} 강사 소개`} />
              ) : (
                <div className="td-ready">
                  <b>강사 소개 준비 중</b>
                  <p>상세 프로필과 소개 자료는 강사진 공개 일정에 맞춰 업데이트됩니다.</p>
                </div>
              )
            ) : teacherCourses.length > 0 ? (
              <div className="td-course-list">
                {teacherCourses.map((course) => (
                  <Link href={`/schedule/${course.id}`} key={course.id}>
                    <div>
                      <span>{course.targets.join(" · ")}</span>
                      <strong>{course.title}</strong>
                    </div>
                    <p>{course.startDate}</p>
                    <p>{course.time}</p>
                    <i>→</i>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="td-ready">
                <b>개설 강좌 준비 중</b>
                <p>강좌 편성이 확정되는 대로 단과시간표와 함께 공개됩니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />
      <Script id="teacher-detail-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: teachersScript }} />
    </main>
  );
}
