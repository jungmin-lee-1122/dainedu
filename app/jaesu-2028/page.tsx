// ═══════════════════════════════════════════════════════════
//  /jaesu-2028  —  2028 재수선행반
//
//  · 헤더(메뉴) · 헤더밴드 · 푸터는 사이트 공용 그대로입니다.
//  · 본문은 전달받은 시안을 그대로 옮겼습니다 (jaesuMarkup.ts).
//  · 모양은 jaesuStyles.ts, 움직임은 jaesuScript.ts.
//
//  ※ 개강일·수강료·강사진이 "확정 후 안내" 인 초안이라 검색에 잡히지 않게
//    해 두었습니다(시안도 같은 설정이었습니다). 공개할 때 IS_DRAFT 를 false 로.
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

/** 내용이 확정되어 공개할 때 false 로 바꾸세요 */
const IS_DRAFT = true;

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
