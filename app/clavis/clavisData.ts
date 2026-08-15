// ═══════════════════════════════════════════════════════════
//  고등 클라비스 페이지 데이터
//  ※ 나중에 관리자 페이지(CMS)를 붙이면 이 파일 대신 API에서 받아오도록
//     교체하면 됩니다. 화면 구조는 그대로 두고 데이터만 바꾸면 돼요.
// ═══════════════════════════════════════════════════════════

/** 1) 메인 롤링 배너 (탭 + 자동재생) */
export const heroSlides = [
  { tab: "코스픽", img: "/clavis/hero-1.png", href: "#", alt: "코스픽" },
  { tab: "2027 파이널완성반", img: "/clavis/hero-2.png", href: "#", alt: "2027 파이널완성반" },
  { tab: "2027 윈터스쿨", img: "/clavis/hero-3.png", href: "#", alt: "2027 윈터스쿨" },
  { tab: "FAQ", img: "/clavis/hero-4.png", href: "#", alt: "FAQ" },
  { tab: "총 1억 장학금", img: "/clavis/hero-5.png", href: "#", alt: "총 1억 장학금" },
];

/** 2) 중간 프로모 배너 (여러 장 흐르는 슬라이더) */
export const promoBanners = [
  { img: "/clavis/promo-1.png", href: "#", alt: "이투스 구독권" },
  { img: "/clavis/promo-2.png", href: "#", alt: "모의고사 해설" },
  { img: "/clavis/promo-3.png", href: "#", alt: "2026 합격생" },
  { img: "/clavis/promo-4.png", href: "#", alt: "신규 장학" },
  { img: "/clavis/promo-5.png", href: "#", alt: "재원생 후기" },
  { img: "/clavis/promo-6.png", href: "#", alt: "성장 스토리" },
];

/** 3) 선생님 (과목 탭 + 카드 슬라이더) */
export const teacherTabs = ["국어", "수학", "영어", "탐구"];
export const teachers = [
  { subject: "국어", name: "김다인", grades: ["고1", "고2"], img: "/clavis/teacher-1.png", isNew: true },
  { subject: "국어", name: "이서준", grades: ["고2", "고3"], img: "/clavis/teacher-2.png", isNew: false },
  { subject: "수학", name: "박민재", grades: ["고1", "고2"], img: "/clavis/teacher-3.png", isNew: true },
  { subject: "수학", name: "최유진", grades: ["고3"], img: "/clavis/teacher-4.png", isNew: false },
  { subject: "영어", name: "정하늘", grades: ["고1", "고2"], img: "/clavis/teacher-5.png", isNew: false },
  { subject: "영어", name: "한소민", grades: ["고3"], img: "/clavis/teacher-6.png", isNew: true },
  { subject: "탐구", name: "오지훈", grades: ["고2", "고3"], img: "/clavis/teacher-7.png", isNew: false },
  { subject: "탐구", name: "윤채원", grades: ["고1"], img: "/clavis/teacher-8.png", isNew: false },
];

/** 4-1) 공지사항 — 관리자 페이지 연동 예정 */
export const notices = [
  { tag: "입시결과", title: "2026학년도 대입 합격 현황 / 성적 향상 현황", date: "2026.03.10", href: "#" },
  { tag: "모집안내", title: "2027 고등 클라비스 정규반 모집 안내", date: "2026.06.09", href: "#" },
  { tag: "모집안내", title: "재학생 내신 집중반 모집 안내", date: "2026.02.07", href: "#" },
  { tag: "안내", title: "2027 수시 합격예측 서비스 이용안내", date: "2026.08.07", href: "#" },
  { tag: "공개특강", title: "《고3》 9월 평가원 모의고사 대비 공개특강", date: "2026.08.11", href: "#" },
];

/** 4-2) 설명회·공개특강 — 관리자 페이지 연동 예정 */
export const lectures = [
  {
    badges: ["고3", "N수"],
    title: "9평 대비 영어 공개특강",
    date: "2026. 08. 28(금) 오후 2시",
    place: "다인교육 동탄점",
    status: "예약중",
    href: "#",
  },
  {
    badges: ["고1", "고2"],
    title: "2학기 내신 전략 설명회",
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
  { img: "/clavis/review-1.png", href: "#", alt: "서울대 경영" },
  { img: "/clavis/review-2.png", href: "#", alt: "연세대 의예" },
  { img: "/clavis/review-3.png", href: "#", alt: "고려대 전기전자" },
  { img: "/clavis/review-4.png", href: "#", alt: "성균관대 반도체" },
  { img: "/clavis/review-5.png", href: "#", alt: "한양대 기계" },
];

/** 5-2) 우측 사이드 배너 */
export const sideBanners = [
  { img: "/clavis/side-1.png", href: "/register", alt: "설명회 사전등록" },
  { img: "/clavis/side-2.png", href: "#", alt: "시설 둘러보기" },
  { img: "/clavis/side-3.png", href: "#", alt: "상담 예약하기" },
];

/** 상단 성과 띠 */
export const stats = [
  { label: "메이저 의예", value: "5", unit: "명" },
  { label: "전국 의약학계열", value: "61", unit: "명" },
  { label: "서울대", value: "16", unit: "명" },
  { label: "연세대·고려대", value: "56", unit: "명" },
];
