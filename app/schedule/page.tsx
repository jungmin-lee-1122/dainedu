import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import PageBand from "../PageBand";
import { quickMenuMarkup } from "../quickMenu";
import { teachersScript } from "../teachers/teachersScript";
import { subjects } from "../teachers/teachersData";
import { scheduleTabs } from "./scheduleData";
import { getTeachers, getCourses } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "단과시간표 — 다인교육 동탄점",
  description: "모집 대상과 과목별로 다인교육 동탄점의 단과 강좌를 확인하세요.",
};

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; subject?: string }>;
}) {
  const query = await searchParams;
  const teachers = await getTeachers();
  const courses = await getCourses();
  const activeTab = scheduleTabs.find((tab) => tab.label === query.category) ?? scheduleTabs[0];
  const activeSubject = query.subject && subjects.includes(query.subject) ? query.subject : "전체";
  const filtered = courses.filter((course) => {
    const categoryMatch = course.targets.some((target) => activeTab.targets.includes(target));
    const subjectMatch = activeSubject === "전체" || course.subject === activeSubject;
    return categoryMatch && subjectMatch;
  });

  return (
    <main className="dn-body sc-page">
      <SiteHeader />

      <PageBand
        eyebrow="Class Schedule"
        title="단과시간표"
        sub={["모집 대상과 과목으로 원하는 강좌를 찾아보세요."]}
        crumb={[{ label: "모집안내" }, { label: "단과시간표" }]}
      />

      <section className="sc-content">
        <div className="sc-wrap">
          <nav className="sc-category-tabs" aria-label="모집 대상 선택">
            {scheduleTabs.map((tab) => (
              <Link
                className={tab.label === activeTab.label ? "is-on" : ""}
                href={`/schedule?category=${encodeURIComponent(tab.label)}`}
                key={tab.label}
              >
                {tab.label}
              </Link>
            ))}
          </nav>

          <div className="sc-subject-filter">
            <span>과목</span>
            {subjects.map((subject) => {
              const href = subject === "전체"
                ? `/schedule?category=${encodeURIComponent(activeTab.label)}`
                : `/schedule?category=${encodeURIComponent(activeTab.label)}&subject=${encodeURIComponent(subject)}`;
              return (
                <Link className={subject === activeSubject ? "is-on" : ""} href={href} key={subject} scroll={false}>
                  {subject}
                </Link>
              );
            })}
          </div>

          <div className="sc-list-head">
            <p><b>{activeTab.label}</b> · {activeSubject}</p>
            <span>총 {filtered.length}건</span>
          </div>

          {filtered.length > 0 ? (
            <>
              <div className="sc-table-wrap">
                <table className="sc-table">
                  <thead>
                    <tr>
                      <th>강사</th>
                      <th>강좌명</th>
                      <th>개강일</th>
                      <th>기간</th>
                      <th>수업시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((course) => {
                      const teacher = teachers.find((item) => item.id === course.teacherId);
                      return (
                        <tr key={course.id}>
                          <td>
                            <Link className="sc-teacher" href={`/teachers/${course.teacherId}`}>
                              <span>
                                {teacher?.revealed && teacher.photo
                                  ? <img src={teacher.photo} alt="" />
                                  : <b aria-hidden="true">?</b>}
                              </span>
                              {teacher?.name ?? "강사 공개 예정"}
                            </Link>
                          </td>
                          <td>
                            <Link className="sc-course-title" href={`/schedule/${course.id}`}>
                              <span>{course.tags.map((tag) => <i key={tag}>{tag}</i>)}</span>
                              <strong>{course.title}</strong>
                            </Link>
                          </td>
                          <td>{course.startDate}</td>
                          <td>{course.period}</td>
                          <td>{course.time}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <ul className="sc-mobile-cards">
                {filtered.map((course) => {
                  const teacher = teachers.find((item) => item.id === course.teacherId);
                  return (
                    <li key={course.id}>
                      <Link href={`/schedule/${course.id}`}>
                        <div className="sc-mobile-top">
                          <span className="sc-mobile-face">
                            {teacher?.revealed && teacher.photo ? <img src={teacher.photo} alt="" /> : <b>?</b>}
                          </span>
                          <span>{teacher?.name ?? "강사 공개 예정"}</span>
                          <div>{course.tags.map((tag) => <i key={tag}>{tag}</i>)}</div>
                        </div>
                        <strong>{course.title}</strong>
                        <dl>
                          <div><dt>개강일</dt><dd>{course.startDate}</dd></div>
                          <div><dt>기간</dt><dd>{course.period}</dd></div>
                          <div><dt>수업시간</dt><dd>{course.time}</dd></div>
                        </dl>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <div className="sc-empty">해당 조건의 강좌가 없습니다.</div>
          )}

          <p className="sc-sample-note">※ 현재 시간표는 화면 구성을 위한 예시이며, 실제 강좌 편성 확정 후 교체됩니다.</p>
        </div>
      </section>

      <SiteFooter />
      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />
      <Script id="schedule-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: teachersScript }} />
    </main>
  );
}
