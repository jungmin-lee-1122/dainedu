// ═══════════════════════════════════════════════════════════
//  /jaesu-2028  —  2028 재수선행반
//
//  · 헤더(메뉴) · 헤더밴드 · 푸터는 사이트 공용 그대로입니다.
//  · 본문은 전달받은 시안을 그대로 옮겼습니다 (jaesuMarkup.ts).
//  · 모양은 jaesuStyles.ts, 움직임은 jaesuScript.ts.
//
//  ※ 2026.11.19 공개 — 검색에 잡힙니다. 다시 감추려면 IS_DRAFT 를 true 로.
// ═══════════════════════════════════════════════════════════
import Script from "next/script";
import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import PageBand from "../PageBand";
import { quickMenuMarkup } from "../quickMenu";
import { jaesuMarkup } from "./jaesuMarkup";
import { jaesuStyles } from "./jaesuStyles";
import { jaesuScript } from "./jaesuScript";

/** true 로 바꾸면 검색에 잡히지 않습니다(초안 상태) */
const IS_DRAFT = false;

export const metadata: Metadata = {
  title: "2028 재수선행반 — 다인에듀 동탄점",
  description:
    "쌓아온 실력을 점검하고, 달라진 수능에 맞춰 준비합니다. 다인에듀 동탄 2028학년도 재수선행반 안내.",
  ...(IS_DRAFT ? { robots: { index: false, follow: false } } : {}),
};

export default function Jaesu2028Page() {
  return (
    <main className="dn-body jp-page">
      <style dangerouslySetInnerHTML={{ __html: jaesuStyles }} />
      <SiteHeader />

      <PageBand
        eyebrow="Early Start Program"
        title="2028 재수선행반"
        crumb={[{ label: "모집안내" }, { label: "2028 재수선행반" }]}
      />

      <div className="jp" id="jpRoot" dangerouslySetInnerHTML={{ __html: jaesuMarkup }} />

      <SiteFooter />
      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />

      <Script
        id="jaesu-2028-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: jaesuScript }}
      />
    </main>
  );
}
