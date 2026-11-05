// ═══════════════════════════════════════════════════════════
//  /plan-lab  —  연간 계획서 공통 서식 "미리보기" (테스트)
//
//  실제로 쓰이는 자리는 강사 상세페이지(/teachers/[id])의
//  큰 애니메이션 바로 아래입니다. 여기는 선생님을 바꿔 가며
//  서식만 빠르게 확인하려고 둔 경로입니다.
//  화면을 그리는 코드는 app/PlanSection.tsx 하나를 같이 씁니다.
// ═══════════════════════════════════════════════════════════
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import PlanSection from "../PlanSection";
import { PLANS, findPlan } from "@/lib/planDoc";
import { planDocStyles } from "@/lib/planDocStyles";

export const metadata: Metadata = {
  title: "연간 계획서 공통 서식 (테스트) — 다인에듀 동탄점",
  robots: { index: false, follow: false },
};

export default async function PlanLabPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const { t } = await searchParams;
  const doc = findPlan(t);

  return (
    <main className="dn-body pl">
      <style dangerouslySetInnerHTML={{ __html: planDocStyles }} />
      <SiteHeader />

      <header className="pl-head">
        <div className="pl-wrap">
          <p className="pl-kicker">ANNUAL PLAN · 공통 서식 미리보기</p>
          <h1 className="pl-title">
            {doc.year}<br />
            <em>{doc.subject}</em> 연간 계획서
          </h1>
          {doc.tagline && <p className="pl-sub">{doc.tagline}</p>}

          <div className="pl-meta">
            <span>{doc.target}</span>
            <span>{doc.subject}</span>
            <span>{doc.teacher} 선생님</span>
            <span>다인에듀 동탄점</span>
          </div>

          <nav className="pl-tabs" aria-label="강사 선택">
            {PLANS.map((p) => (
              <Link
                className={`pl-tab${p.id === doc.id ? " is-on" : ""}`}
                href={`/plan-lab?t=${p.id}`}
                key={p.id}
              >
                {p.tab}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="pl-wrap">
        <PlanSection doc={doc} />
      </div>

      <p className="pl-wrap pl-foot">
        <b>미리보기 전용입니다.</b> 실제 노출 위치는 강사 상세페이지의
        큰 애니메이션 아래입니다. 내용 수정은 <b>lib/planDoc.ts</b> 한 파일에서 합니다.
      </p>

      <SiteFooter />
    </main>
  );
}
