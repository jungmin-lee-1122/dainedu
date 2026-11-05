// ═══════════════════════════════════════════════════════════
//  /profile-lab/[id]  —  강사 프로필 "이력서형" 테스트
//
//  ※ 테스트 전용입니다. 실제 강사 상세페이지(/teachers/[id])는
//    그대로 두고, 틀만 바꿔 본 사본입니다.
//    · 상단   왼쪽에 인물 애니메이션, 오른쪽에 학력·약력 (이력서 느낌)
//    · 하단   연간 계획서 다섯 칸 (상세페이지와 같은 컴포넌트)
//    · globals.css 를 건드리지 않습니다. 이 폴더만 지우면 끝입니다.
//    · noindex 라 검색에 잡히지 않습니다.
//
//  지금은 송지승(영어) · 송문용(국어) 두 분만 있습니다.
//  (lib/planDoc.ts 에 등록된 선생님만 열립니다)
// ═══════════════════════════════════════════════════════════
import type { CSSProperties } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../SiteHeader";
import SiteFooter from "../../SiteFooter";
import PlanSection from "../../PlanSection";
import { getTeachers } from "@/lib/content";
import { photo, photoSet } from "@/lib/img";
import { facultyPose, facultyAnimDir, animPath, poseVars } from "@/lib/facultyAnim";
import { PLANS, findPlan } from "@/lib/planDoc";
import { planDocStyles } from "@/lib/planDocStyles";
import { resumeStyles } from "@/lib/resumeStyles";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "강사 프로필 이력서형 (테스트) — 다인에듀 동탄점",
  robots: { index: false, follow: false },
};

export default async function ProfileLabPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!PLANS.some((p) => p.id === id)) notFound();

  const doc = findPlan(id);

  /* 관리자에 등록된 강사 정보 — 사진·애니메이션·슬로건을 여기서 가져옵니다 */
  const teachers = await getTeachers();
  const teacher = teachers.find((t) => t.name.replace(/\s+/g, "") === doc.teacher);

  const hero = facultyPose(doc.teacher);
  const animDir = facultyAnimDir(doc.teacher);

  /* 학력·약력은 계획서 자료가 더 자세해서 그쪽을 먼저 씁니다 */
  const edu = doc.edu ?? [];
  const now = doc.careerNow.length ? doc.careerNow : (teacher?.career ?? []);
  const past = doc.careerPast ?? [];

  return (
    <main className="dn-body rs pl">
      <style dangerouslySetInnerHTML={{ __html: resumeStyles + planDocStyles }} />
      <SiteHeader />

      <div className="rs-wrap">
        {/* 선생님 바꾸기 — 테스트용 */}
        <nav className="rs-tabs" aria-label="강사 선택">
          {PLANS.map((p) => (
            <Link
              className={`rs-tab${p.id === doc.id ? " is-on" : ""}`}
              href={`/profile-lab/${p.id}`}
              key={p.id}
            >
              {p.tab}
            </Link>
          ))}
        </nav>

        {/* ── 상단: 이력서형 ── */}
        <section className="rs-hero">
          <div
            className="rs-figure"
            style={{ "--rs-zoom": doc.heroZoom ?? 1 } as CSSProperties}
          >
            {hero && (
              /* 인물 히어로 — 얼굴 크기·눈높이 보정은 globals 의 .hx-* 가 합니다.
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
                      loop={!hero.once}
                      playsInline
                      preload="auto"
                      aria-label={`${doc.teacher} 선생님`}
                      disablePictureInPicture
                      disableRemotePlayback
                    >
                      <source src={animPath(animDir, "anim.mov", hero.v)} type='video/quicktime; codecs="hvc1"' />
                      <source src={animPath(animDir, "anim.webm", hero.v)} type="video/webm" />
                    </video>
                  )}
                  <img
                    className="hx-still"
                    src={
                      animDir
                        ? animPath(animDir, "poster.webp", hero.v)
                        : photo(teacher?.photo, 600)
                    }
                    srcSet={animDir ? undefined : photoSet(teacher?.photo, 600)}
                    alt={`${doc.teacher} 선생님`}
                    decoding="async"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="rs-info">
            {teacher && teacher.tags.length > 0 && (
              <div className="rs-tags">
                {teacher.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            )}

            <p className="rs-subject">{doc.subject}</p>
            <h1 className="rs-name">
              {doc.teacher} <small>선생님</small>
            </h1>
            {teacher?.school && <p className="rs-school">{teacher.school}</p>}
            {(doc.tagline || teacher?.copy) && (
              <p className="rs-slogan">{doc.tagline || teacher?.copy}</p>
            )}

            <div className="rs-rule" aria-hidden="true" />

            <div className="rs-cols">
              {edu.length > 0 && (
                <div className="rs-col">
                  <h3>EDUCATION</h3>
                  <ul>
                    {edu.map((v) => <li key={v}>{v}</li>)}
                  </ul>
                </div>
              )}
              <div className="rs-col">
                <h3>CAREER</h3>
                <ul>
                  {now.map((v) => <li key={v}>{v}</li>)}
                </ul>
                {past.length > 0 && (
                  <>
                    <p className="rs-col-div">PREVIOUS</p>
                    <ul>
                      {past.map((v) => <li className="is-past" key={v}>{v}</li>)}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* 테스트에서는 비교용으로 기존 상세페이지로 보냅니다.
                실제 상세페이지에 적용할 때는 이 자리가 '단과시간표 보기' 가 됩니다. */}
            {teacher && (
              <>
                <Link className="rs-link" href={`/teachers/${teacher.id}`}>
                  기존 상세페이지로 보기 ↗
                </Link>
                <p className="rs-link-note">
                  ※ 실제 상세페이지에 적용되면 이 버튼은 <b>단과시간표 보기</b> 로 바뀝니다.
                </p>
              </>
            )}
          </div>
        </section>

        {/* ── 하단: 연간 계획서 다섯 칸 ── */}
        <div className="rs-plan">
          <PlanSection doc={doc} showTitle />
        </div>

        <p className="rs-foot">
          <b>테스트 페이지입니다.</b> 검색에 잡히지 않고 메뉴에도 없습니다.
          기존 강사 상세페이지(/teachers/…)는 그대로 살아 있습니다.
          <br />
          내용 수정은 <b>lib/planDoc.ts</b>, 상단 모양은 <b>lib/resumeStyles.ts</b> 에서 합니다.
        </p>
      </div>

      <SiteFooter />
    </main>
  );
}
