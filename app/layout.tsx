import type { Metadata } from "next";
import "./globals.css";
import LegalModal from "./LegalModal";
import { Analytics } from "@vercel/analytics/next";
import VisitLogger from "./VisitLogger";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "다인에듀 동탄점",
  description:
    "다인에듀와 함께, 이제 동탄이 입시의 중심입니다. N수 · 고등 전 과정 운영 | 2027 윈터스쿨 모집 중",
  metadataBase: new URL("https://dainedu.co.kr"),
  openGraph: {
    type: "website",
    title: "다인에듀 동탄점",
    description:
      "180평 프리미엄 캠퍼스 · 포르타 고등전문관 / 클라비스 N수전문관 / 2027 윈터스쿨 모집 중",
    images: [
      "https://d8j0ntlcm91z4.cloudfront.net/user_3H245lb09Vz3JVPmrpcF7BEkl7M/hf_20260728_181140_b01a2213-8aeb-4f61-80e0-0b1a33235b09.png",
    ],
  },
  twitter: { card: "summary_large_image" },
  // 네이버 서치어드바이저 사이트 소유확인
  verification: {
    other: { "naver-site-verification": "9aa76a45bc6e12a7e4ea5296c334bf72db432932" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&family=Noto+Serif+KR:wght@600;700;800;900&display=swap"
        />
      </head>
      <body className="dn-page">
        {children}
        <LegalModal />
        {/* Vercel 방문자 통계 */}
        <Analytics />
        {/* 관리자용 방문 기록 (도시 · 페이지) */}
        <Suspense fallback={null}>
          <VisitLogger />
        </Suspense>
      </body>
    </html>
  );
}
