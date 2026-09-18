// ═══════════════════════════════════════════════════════════
//  관리자 메뉴 목록
//  ※ 사이드바(브라우저용)와 대시보드(서버용) 양쪽에서 쓰기 때문에
//     "use client" 가 없는 별도 파일로 둡니다. 여기에 한 줄 추가하면
//     사이드바와 대시보드에 함께 반영됩니다.
// ═══════════════════════════════════════════════════════════

export type AdminMenu = { href: string; label: string; desc: string };

export const MENU: AdminMenu[] = [
  { href: "/admin", label: "대시보드", desc: "전체 현황" },
  { href: "/admin/teachers", label: "강사진 · 개설강좌", desc: "강사 등록 시 단과시간표에 자동 반영" },
  { href: "/admin/events", label: "이벤트 · 설명회", desc: "설명회 일정과 예약 안내" },
  { href: "/admin/notices", label: "공지사항", desc: "포르타 · 클라비스 공지" },
  { href: "/admin/media", label: "사진 · 영상", desc: "시설 사진, 유튜브 클립" },
];
