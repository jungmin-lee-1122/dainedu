import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // ── 관리자에서 올린 사진 자동 최적화 ──
  // 원본은 1440px PNG 라도, 화면에 필요한 크기로 줄이고 webp 로 바꿔 내보냅니다.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
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
