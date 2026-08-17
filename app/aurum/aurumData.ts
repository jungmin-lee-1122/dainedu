// ═══════════════════════════════════════════════════════════
//  N수 아우룸 페이지 데이터
//  ※ 나중에 관리자 페이지(CMS)를 붙이면 이 파일 대신 API에서 받아오도록
//     교체하면 됩니다. 화면 구조는 그대로 두고 데이터만 바꾸면 돼요.
// ═══════════════════════════════════════════════════════════

/** 1) 메인 롤링 배너 (탭 + 자동재생) */
export const heroSlides = [
  { tab: "재수종합반", img: "/aurum/hero-1.png", href: "#", alt: "재수종합반" },
  { tab: "독학재수관", img: "/aurum/hero-2.png", href: "#", alt: "독학재수관" },
  { tab: "2027 윈터스쿨", img: "/aurum/hero-3.png", href: "#", alt: "2027 윈터스쿨" },
  { tab: "의약학 집중반", img: "/aurum/hero-4.png", href: "#", alt: "의약학 집중반" },
  { tab: "총 1억 장학금", img: "/aurum/hero-5.png", href: "#", alt: "총 1억 장학금" },
];

/** 3) 선생님 (과목 탭 + 카드 슬라이더) */
export const teacherTabs = ["국어", "수학", "영어", "탐구"];
export const teachers = [
  { subject: "국어", name: "김서현", grades: ["N수"], img: "/aurum/teacher-1.png", isNew: true },
  { subject: "국어", name: "이준호", grades: ["N수", "고3"], img: "/aurum/teacher-2.png", isNew: false },
  { subject: "수학", name: "박태민", grades: ["N수"], img: "/aurum/teacher-3.png", isNew: true },
  { subject: "수학", name: "최윤아", grades: ["N수", "고3"], img: "/aurum/teacher-4.png", isNew: false },
  { subject: "영어", name: "정민석", grades: ["N수"], img: "/aurum/teacher-5.png", isNew: false },
  { subject: "영어", name: "한지우", grades: ["N수", "고3"], img: "/aurum/teacher-6.png", isNew: true },
  { subject: "탐구", name: "오세영", grades: ["N수"], img: "/aurum/teacher-7.png", isNew: false },
  { subject: "탐구", name: "윤도현", grades: ["N수"], img: "/aurum/teacher-8.png", isNew: false },
];

/** 4-1) 공지사항 — 관리자 페이지 연동 예정 */
export const notices = [
  { tag: "입시결과", title: "2026학년도 재수 성공 현황 / 성적 향상 리포트", date: "2026.03.10", href: "#" },
  { tag: "모집안내", title: "2027 재수종합반 / 독학재수관 모집 안내", date: "2026.06.09", href: "#" },
  { tag: "모집안내", title: "의약학 집중반 선발 전형 안내", date: "2026.02.07", href: "#" },
  { tag: "안내", title: "2027 정시 합격예측 서비스 이용안내", date: "2026.08.07", href: "#" },
  { tag: "공개특강", title: "《N수》 9월 평가원 모의고사 대비 공개특강", date: "2026.08.11", href: "#" },
];

/** 4-2) 설명회·공개특강 — 관리자 페이지 연동 예정 */
export const lectures = [
  {
    badges: ["N수"],
    title: "9평 대비 수학 공개특강",
    date: "2026. 08. 28(금) 오후 2시",
    place: "다인교육 동탄점",
    status: "예약중",
    href: "#",
  },
  {
    badges: ["N수", "학부모"],
    title: "재수 성공 전략 설명회",
    date: "2026. 08. 29(토) 오전 10시 30분",
    place: "다인교육 동탄점",
    status: "예약중",
    href: "#",
  },
  {
    badges: ["학부모"],
    title: "2027 대입 변화 학부모 설명회",
    date: "2026. 09. 19(토) 오후 1시",
    place: "CGV 동탄 4관",
    status: "접수중",
    href: "/register",
  },
];

/** 5-1) 성공수기 */
export const reviews = [
  { img: "/aurum/review-1.png", href: "#", alt: "서울대 의예" },
  { img: "/aurum/review-2.png", href: "#", alt: "연세대 치의예" },
  { img: "/aurum/review-3.png", href: "#", alt: "고려대 의과" },
  { img: "/aurum/review-4.png", href: "#", alt: "성균관대 의예" },
  { img: "/aurum/review-5.png", href: "#", alt: "한양대 의예" },
];

/** 5-2) 우측 사이드 배너 */
export const sideBanners = [
  { img: "/aurum/side-1.png", href: "/register", alt: "입학 상담 신청" },
  { img: "/aurum/side-2.png", href: "#", alt: "기숙 시설 안내" },
  { img: "/aurum/side-3.png", href: "#", alt: "윈터스쿨 접수" },
];
