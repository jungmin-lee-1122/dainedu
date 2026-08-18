import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

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
