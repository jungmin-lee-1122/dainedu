import Script from "next/script";
import type { Metadata } from "next";
import { registerMarkup } from "./registerMarkup";
import { landingScript } from "../landingScript";

export const metadata: Metadata = {
  title: "설명회 사전등록 — 다인교육",
  description: "2026년 9월 19일(토) 다인교육 그랜드 오픈 설명회 좌석 사전등록.",
};

export default function RegisterPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: registerMarkup }} />
      <Script
        id="dain-register"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: landingScript }}
      />
    </>
  );
}
