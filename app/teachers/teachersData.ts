// ═══════════════════════════════════════════════════════════
//  강사진 소개 페이지 데이터
//  강사가 공개되면 name / photo 를 채우고 revealed 를 true 로 바꾸세요.
// ═══════════════════════════════════════════════════════════

export type Teacher = {
  subject: string;
  name: string;        // 공개 전에는 "Coming Soon"
  copy: string;        // 한 줄 소개
  career: string[];    // 이력
  openAt: string;      // 공개 예정 시기
  revealed: boolean;   // true 면 실명·사진 공개
  photo?: string;
};

/** 과목 필터 순서 */
export const subjects = ["전체", "수학", "국어", "통합과학", "통합사회", "인문논술", "수리논술"];

export const teachers: Teacher[] = [
  {
    subject: "수학",
    name: "Coming Soon",
    copy: "개념을 세우고 실전으로 끝냅니다.",
    career: ["대치 대형학원 출강", "재수종합 정규 담당"],
    openAt: "9월 넷째 주 공개",
    revealed: false,
  },
  {
    subject: "수학",
    name: "Coming Soon",
    copy: "킬러 문항 앞에서 흔들리지 않게.",
    career: ["대치 대형학원 출강", "미적분 · 기하 전담"],
    openAt: "10월 첫째 주 공개",
    revealed: false,
  },
  {
    subject: "수학",
    name: "Coming Soon",
    copy: "풀이가 아니라 사고를 가르칩니다.",
    career: ["목동 대형학원 출강", "수학Ⅰ·Ⅱ 정규 담당"],
    openAt: "10월 첫째 주 공개",
    revealed: false,
  },
  {
    subject: "수학",
    name: "Coming Soon",
    copy: "실수를 구조적으로 없애 드립니다.",
    career: ["분당 대형학원 출강", "확률과 통계 전담"],
    openAt: "10월 둘째 주 공개",
    revealed: false,
  },
  {
    subject: "수학",
    name: "Coming Soon",
    copy: "학교 시험은 전략으로 이깁니다.",
    career: ["평촌 대형학원 출강", "고등 내신 수학 담당"],
    openAt: "설명회 현장 공개",
    revealed: false,
  },
  {
    subject: "국어",
    name: "Coming Soon",
    copy: "읽는 법이 바뀌면 점수가 바뀝니다.",
    career: ["목동 대형학원 출강", "고등종합 정규 담당"],
    openAt: "9월 넷째 주 공개",
    revealed: false,
  },
  {
    subject: "국어",
    name: "Coming Soon",
    copy: "문학은 감이 아니라 근거입니다.",
    career: ["대치 대형학원 출강", "문학 · 언매 전담"],
    openAt: "10월 첫째 주 공개",
    revealed: false,
  },
  {
    subject: "국어",
    name: "Coming Soon",
    copy: "지문이 아니라 구조를 읽습니다.",
    career: ["분당 대형학원 출강", "비문학 독해 전담"],
    openAt: "10월 둘째 주 공개",
    revealed: false,
  },
  {
    subject: "통합과학",
    name: "Coming Soon",
    copy: "개념 하나로 두 문제를 지웁니다.",
    career: ["대치 대형학원 출강", "통합과학 정규 담당"],
    openAt: "10월 첫째 주 공개",
    revealed: false,
  },
  {
    subject: "통합과학",
    name: "Coming Soon",
    copy: "과학은 암기가 아니라 이해입니다.",
    career: ["대형학원 출강", "물리 · 화학 전담"],
    openAt: "10월 둘째 주 공개",
    revealed: false,
  },
  {
    subject: "통합사회",
    name: "Coming Soon",
    copy: "표와 자료에서 답이 보이게.",
    career: ["대형학원 출강", "통합사회 정규 담당"],
    openAt: "10월 첫째 주 공개",
    revealed: false,
  },
  {
    subject: "통합사회",
    name: "Coming Soon",
    copy: "흐름을 잡으면 선지가 보입니다.",
    career: ["평촌 대형학원 출강", "윤리 · 사회문화 전담"],
    openAt: "10월 둘째 주 공개",
    revealed: false,
  },
  {
    subject: "인문논술",
    name: "Coming Soon",
    copy: "생각을 답안으로 완성합니다.",
    career: ["대치 논술학원 출강", "인문논술 전담"],
    openAt: "설명회 현장 공개",
    revealed: false,
  },
  {
    subject: "수리논술",
    name: "Coming Soon",
    copy: "증명의 흐름을 설계합니다.",
    career: ["대치 논술학원 출강", "수리논술 전담"],
    openAt: "설명회 현장 공개",
    revealed: false,
  },
];
