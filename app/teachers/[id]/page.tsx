import type { CSSProperties } from "react";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../SiteHeader";
import SiteFooter from "../../SiteFooter";
import { quickMenuMarkup } from "../../quickMenu";
import { teachersScript } from "../teachersScript";
import { focusProfileScript } from "../focusProfileScript";
import { subjects } from "../teachersData";
import { getTeachers, getCourses } from "@/lib/content";
import { photo, photoSet } from "@/lib/img";
import { facultyVideo } from "@/lib/facultyVideo";
import { facultyPose, facultyAnimDir, animPath, poseVars } from "@/lib/facultyAnim";
import { teacherPlan, planPage } from "@/lib/teacherPlan";
import { planDocByName } from "@/lib/planDoc";
import { planDocStyles } from "@/lib/planDocStyles";
import { resumeStyles } from "@/lib/resumeStyles";
import PlanSection from "../../PlanSection";

// 60초마다 새로 만들어 둡니다. 관리자에서 고치면 즉시 반영됩니다.
export const revalidate = 60;

/** 수업 소개 · 개설 강좌 탭 — 내용이 준비되면 true 로 바꾸세요. */
const SHOW_TABS = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const teachers = await getTeachers();
  const teacher = teachers.find((item) => item.id === id);
  if (!teacher) return { title: "강사진 — 다인에듀 동탄점" };
  return {
    title: `${teacher.name} ${teacher.subject} 강사 — 다인에듀 동탄점`,
    description: `다인에듀 동탄점 ${teacher.subject} ${teacher.name} 선생님.${
      teacher.school ? ` ${teacher.school}.` : ""
    } 약력과 개설 강좌를 확인하세요.`,
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
  /* 연간 계획서
     planDoc   = 다인에듀 공통 서식으로 정리한 내용 (우선)
     planPages = 선생님이 주신 원본 PDF 를 쪽마다 이미지로 뜬 것 (접어 둡니다)
     둘 다 없으면 섹션이 통째로 빠집니다. */
  const planDoc = planDocByName(current.name);
  const plan = teacherPlan(current.name);
  const group = activeSubject === "전체"
    ? teachers
    : teachers.filter((teacher) => teacher.subject === activeSubject);
  const teacherCourses = courses.filter((course) => course.teacherId === current.id);
  const clipSrc = facultyVideo(current.name);
  /* 배경이 투명한 새 애니메이션이 있으면 그것을 우선으로 씁니다 */
  /* 얼굴 위치값은 17명 전원에게 있습니다. 영상은 6명만 있습니다. */
  const pose = current.revealed ? facultyPose(current.name) : null;
  const animDir = current.revealed ? facultyAnimDir(current.name) : null;
  /* 사진도 영상도 없으면 히어로를 쓰지 않습니다 */
  const hero = pose && (animDir || current.photo) ? pose : null;

  return (
    <main className="dn-body td-page rs pl">
      <style dangerouslySetInnerHTML={{ __html: resumeStyles + planDocStyles }} />
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
                href={`/teachers/${teacher.id}?subject=${encodeURIComponent(activeSubject)}#tdProfile`}
                key={teacher.id}
              >
                <span className="td-mini-face">
                  {teacher.revealed && teacher.photo
                    ? <img src={photo(teacher.photo, 96)} srcSet={photoSet(teacher.photo, 96)}
                           alt="" loading="lazy" decoding="async" />
                    : <b aria-hidden="true">?</b>}
                </span>
                <span>{teacher.name}</span>
              </Link>
            ))}
          </div>

          {/* ── 강사 프로필 (이력서형) ──
              왼쪽에 인물, 오른쪽에 학력·약력. 그 아래로 연간 계획서가 이어집니다.
              학력은 연간 계획서 자료가 있는 분만 나옵니다. */}
          <section className="rs-hero" id="tdProfile">
            <div
              className="rs-figure"
              style={{ "--rs-zoom": planDoc?.heroZoom ?? 1 } as CSSProperties}
            >
              {hero ? (
                /* 인물 히어로 — 얼굴 크기·눈높이를 맞춰 바닥에 세웁니다.
                   source 순서는 반드시 mov → webm (사파리가 webm 투명을 못 그립니다) */
                <div className="hx-stage">
                  <div
                    className={`hx-norm${hero.fadeR ? " hx-fade-r" : ""}`}
                    style={poseVars(hero) as CSSProperties}
                  >
                    {animDir && (
                      <video
                        className="hx-figure"
                        poster={animPath(animDir, "poster.webp", hero.v)}
                        autoPlay
                        muted
                        /* 옛 영상은 시작·끝 장면이 달라 반복하면 툭 튑니다 */
                        loop={!hero.once}
                        playsInline
                        preload="auto"
                        aria-label={`${current.name} 선생님`}
                        disablePictureInPicture
                        disableRemotePlayback
                      >
                        <source src={animPath(animDir, "anim.mov", hero.v)} type='video/quicktime; codecs="hvc1"' />
                        <source src={animPath(animDir, "anim.webm", hero.v)} type="video/webm" />
                      </video>
                    )}
                    <img
                      className="hx-still"
                      src={animDir ? animPath(animDir, "poster.webp", hero.v) : photo(current.photo!, 600)}
                      srcSet={animDir ? undefined : photoSet(current.photo!, 600)}
                      alt={`${current.name} 선생님`}
                      decoding="async"
                    />
                  </div>
                </div>
              ) : current.revealed && clipSrc ? (
                /* 소개 영상만 있는 분 */
                <div className="rs-clip">
                  <video
                    src={clipSrc}
                    poster={current.photo ? photo(current.photo, 440) : undefined}
                    autoPlay muted loop playsInline preload="metadata"
                    aria-label={`${current.name} 선생님 소개 영상`}
                  />
                </div>
              ) : current.revealed && current.photo ? (
                <div className="rs-clip">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo(current.photo, 600)} srcSet={photoSet(current.photo, 600)}
                       alt={`${current.name} 선생님`} decoding="async" />
                </div>
              ) : (
                /* 아직 공개 전 */
                <div className="rs-soon">
                  <b aria-hidden="true">?</b>
                  <span>{current.openAt}</span>
                </div>
              )}
            </div>

            <div className="rs-info">
              {current.tags.length > 0 && (
                <div className="rs-tags">
                  {current.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              )}

              <p className="rs-subject">{current.subject}</p>
              <h2 className="rs-name">
                {current.name} <small>선생님</small>
              </h2>
              {current.school && <p className="rs-school">{current.school}</p>}
              {current.copy && <p className="rs-slogan">{current.copy}</p>}

              <div className="rs-rule" aria-hidden="true" />

              <div className="rs-cols">
                {planDoc?.edu && planDoc.edu.length > 0 && (
                  <div className="rs-col">
                    <h3>EDUCATION</h3>
                    <ul>
                      {planDoc.edu.map((v) => <li key={v}>{v}</li>)}
                    </ul>
                  </div>
                )}
                {(planDoc?.careerNow?.length || current.career.length) > 0 && (
                  <div className="rs-col">
                    <h3>CAREER</h3>
                    <ul>
                      {(planDoc?.careerNow?.length ? planDoc.careerNow : current.career)
                        .map((v) => <li key={v}>{v}</li>)}
                    </ul>
                    {planDoc?.careerPast && planDoc.careerPast.length > 0 && (
                      <>
                        <p className="rs-col-div">PREVIOUS</p>
                        <ul>
                          {planDoc.careerPast.map((v) => (
                            <li className="is-past" key={v}>{v}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="rs-acts">
                <Link
                  className="rs-link"
                  href={`/schedule?subject=${encodeURIComponent(current.subject)}`}
                >
                  단과시간표 보기 ↗
                </Link>
                {current.videoUrl && (
                  <a className="rs-link is-ghost" href={current.videoUrl} target="_blank" rel="noreferrer">
                    소개 영상 보기 ↗
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* ── 연간 계획서 ── 큰 애니메이션 바로 아래에 붙습니다.
              공통 서식(HTML)을 먼저 보여 주고, 선생님이 주신 원본 PDF 이미지는
              아래에 접어 둡니다. 원하는 분만 펼쳐 보면 됩니다. */}
          {(planDoc || plan) && (
            <section className="td-plan pl" id="plan">
              <style dangerouslySetInnerHTML={{ __html: planDocStyles }} />

              {planDoc && <PlanSection doc={planDoc} showTitle />}

              {plan && (
                <details className="td-plan-raw">
                  <summary>
                    {planDoc ? "선생님이 주신 원본 계획서 보기" : plan.title}
                    <i aria-hidden="true">＋</i>
                  </summary>
                  <div className="td-plan-pages">
                    {Array.from({ length: plan.pages }, (_, i) => (
                      <a
                        className="td-plan-page"
                        href={planPage(plan.dir, i + 1)}
                        target="_blank"
                        rel="noreferrer"
                        key={i}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={planPage(plan.dir, i + 1)}
                          alt={`${current.name} 선생님 연간 계획서 ${i + 1}쪽`}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="td-plan-zoom" aria-hidden="true">
                          크게 보기 ↗
                        </span>
                      </a>
                    ))}
                  </div>
                </details>
              )}

              {!planDoc && plan && (
                <p className="td-plan-foot">
                  상기 일정은 학사 일정에 따라 변동될 수 있으며, 변동 시 사전에 안내해 드립니다.
                  <br />
                  과정별 교재 · 주간지 · 모의고사 비용은 교습비와 별도이며 자세한 내용은 학원으로 문의해 주세요.
                </p>
              )}
            </section>
          )}

          {SHOW_TABS && (<>
          <div className="td-tabs" role="navigation" aria-label="강사 상세 메뉴">
            <Link
              className={activeView === "intro" ? "is-on" : ""}
              href={`/teachers/${current.id}?subject=${encodeURIComponent(activeSubject)}&view=intro`}
              scroll={false}
            >
              수업 소개
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
                <img className="td-intro-poster" src={photo(current.introPoster, 1000)}
                     srcSet={photoSet(current.introPoster, 1000)}
                     alt={`${current.name} 수업 소개`} loading="lazy" decoding="async" />
              ) : (
                <div className="td-ready">
                  <b>수업 소개 준비 중</b>
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
          </>)}
        </div>
      </section>

      <SiteFooter />
      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />
      <Script id="teacher-detail-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: teachersScript }} />
      <Script id="teacher-focus-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: focusProfileScript }} />
    </main>
  );
}
