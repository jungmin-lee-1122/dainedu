import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // ── 관리자에서 올린 사진 자동 최적화 ──
  // 원본은 1440px PNG 라도, 화면에 필요한 크기로 줄이고 webp 로 바꿔 내보냅니다.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "2o7ptnu7htga8hug.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  // ── /events/1 → 우리 설명회 상세 화면 ──
  // /event/1 은 홈페이지 앞단의 중계 서버가 가로채므로,
  // 복수형 주소로 들어오면 내부적으로 같은 화면을 보여줍니다.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/events/:id", destination: "/event/:id" }],
      afterFiles: [],
      fallback: [],
    };
  },

  // ── 예전 주소 자동 이동 ──
  // 개편 전에 공유된 링크(/aurum)로 들어와도 새 주소(/clavis)로 보내줍니다.
  async redirects() {
    return [
      { source: "/aurum", destination: "/clavis", permanent: true },
      { source: "/aurum/:path*", destination: "/clavis/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
