import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../SiteHeader";
import SiteFooter from "../../SiteFooter";
import { quickMenuMarkup } from "../../quickMenu";
import { teachersScript } from "../../teachers/teachersScript";
import { scheduleTabs } from "../scheduleData";
import { getTeachers, getCourses } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const courses = await getCourses();
  const course = courses.find((item) => item.id === id);
  return { title: course ? `${course.title} — 다인교육 동탄점` : "단과시간표 — 다인교육 동탄점" };
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [courses, teachers] = await Promise.all([getCourses(), getTeachers()]);
  const course = courses.find((item) => item.id === id);
  if (!course) notFound();

  const teacher = teachers.find((item) => item.id === course.teacherId);
  const activeTab = scheduleTabs.find((tab) => course.targets.some((target) => tab.targets.includes(target))) ?? scheduleTabs[0];

  return (
    <main className="dn-body sc-page">
      <SiteHeader />

      <section className="sc-detail-head">
        <div className="sc-wrap">
          <Link href={`/schedule?category=${encodeURIComponent(activeTab.label)}`}>← 단과시간표</Link>
          <p className="sc-eyebrow">Course Detail</p>
          <h1>강좌 상세</h1>
        </div>
      </section>

      <section className="sc-detail-body">
        <div className="sc-wrap sc-detail-wrap">
          <article className="sc-detail-card">
            <div className="sc-detail-teacher">
              {teacher?.revealed && teacher.photo ? (
                <img src={teacher.photo} alt={`${teacher.name} 선생님`} />
              ) : (
                <div className="sc-detail-placeholder">
                  <b>?</b>
                  <span>강사 공개 예정</span>
                </div>
              )}
            </div>

            <div className="sc-detail-info">
              <div className="sc-detail-tags">
                {course.targets.map((target) => <span key={target}>{target}</span>)}
                {course.tags.map((tag) => <i key={tag}>{tag}</i>)}
              </div>
              <h2>{course.title}</h2>
              {teacher && (
                <Link className="sc-detail-teacher-link" href={`/teachers/${teacher.id}?view=courses`}>
                  {teacher.subject} {teacher.name} 선생님 · 개설강좌 전체보기 →
                </Link>
              )}
              <dl className="sc-detail-rows">
                <InfoRow label="선생님" value={teacher?.name ?? "공개 예정"} />
                <InfoRow label="모집대상" value={course.targets.join(" · ")} />
                <InfoRow label="개강일" value={course.startDate} />
                <InfoRow label="수업기간" value={course.period} />
                <InfoRow label="수업시간" value={course.time} />
                <InfoRow label="수강료" value={course.price} />
                <InfoRow label="교재" value={course.material} />
              </dl>
            </div>
          </article>

          <section className="sc-syllabus">
            <p className="sc-eyebrow">Syllabus</p>
            <h2>강의 계획서</h2>
            {course.syllabus ? (
              <img src={course.syllabus} alt={`${course.title} 강의 계획서`} />
            ) : (
              <div className="sc-syllabus-ready">
                <span aria-hidden="true">D</span>
                <b>강의 계획서 준비 중</b>
                <p>세부 수업 계획은 강좌 편성 확정 후 업데이트됩니다.</p>
              </div>
            )}
          </section>
        </div>
      </section>

      <SiteFooter />
      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />
      <Script id="course-detail-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: teachersScript }} />
    </main>
  );
}
