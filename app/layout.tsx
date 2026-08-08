import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "다인교육 — 이제는 동탄이 입시의 중심",
  description:
    "동탄에서 끝내는 대치동급. 2026년 9월 19일(토) 다인교육 입시설명회 · 윈터스쿨 설명회 사전등록.",
  metadataBase: new URL("https://dain-edu.higgsfield.app"),
  openGraph: {
    type: "website",
    title: "다인교육 - 이제는 동탄이 입시의 중심",
    description:
      "180평 프리미엄 캠퍼스 · 재수종합/독학재수/고등종합/단과 · 9/19(토) 설명회 사전등록",
    images: [
      "https://d8j0ntlcm91z4.cloudfront.net/user_3H245lb09Vz3JVPmrpcF7BEkl7M/hf_20260728_181140_b01a2213-8aeb-4f61-80e0-0b1a33235b09.png",
    ],
  },
  twitter: { card: "summary_large_image" },
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
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600;700;900&display=swap"
        />
      </head>
      <body className="dn-page">{children}</body>
    </html>
  );
}
