// ═══════════════════════════════════════════════════════════
//  2027 다인 윈터스쿨 상세 페이지 데이터
//  문구·항목은 이 파일에서 수정하세요.
// ═══════════════════════════════════════════════════════════

/** 상단 섹션 내비게이션 */
export const navItems = [
  { label: "WINTER SCHOOL", href: "#top" },
  { label: "PROGRAM", href: "#program" },
  { label: "CURRICULUM", href: "#curriculum" },
  { label: "SYSTEM", href: "#system" },
  { label: "SPACE", href: "#space" },
  { label: "ADMISSION", href: "#admission" },
];

/** 2) 바뀌는 입시 — 3가지 변화 */
export const changes = [
  {
    no: "01",
    title: "5등급 내신 체제",
    desc: "등급의 숫자는 줄고 한 번의 시험이 갖는 무게는 커집니다.",
  },
  {
    no: "02",
    title: "통합형 수능",
    desc: "선택과목 전략이 사라진 만큼 기본 실력과 학습 설계가 중요해집니다.",
  },
  {
    no: "03",
    title: "수시 평가의 변화",
    desc: "내신만 보는 준비에서 학생부·논술·수능까지 함께 설계해야 합니다.",
  },
];

/** 4) 운영 시스템 4단계 */
export const systemSteps = [
  {
    no: "01",
    en: "DIAGNOSIS",
    ko: "현재 위치 진단",
    desc: "정확한 진단이 모든 전략의 출발점입니다.",
  },
  {
    no: "02",
    en: "DESIGN",
    ko: "개인별 학습 전략 설계",
    desc: "학생별 목표와 수준에 맞춘 맞춤형 학습 전략을 설계합니다.",
  },
  {
    no: "03",
    en: "EXECUTION",
    ko: "수업 + 자기주도학습 실행",
    desc: "계획된 학습을 꾸준히 실행할 수 있도록 관리합니다.",
  },
  {
    no: "04",
    en: "FEEDBACK",
    ko: "성취도 점검 및 전략 보완",
    desc: "주기적인 점검과 피드백으로 전략을 보완하고 완성합니다.",
  },
];

/** 5) CLAVIS WINTER 프로그램 3종 */
export const programs = [
  {
    en: "FOUNDATION",
    ko: "개념을 다시 세우는 겨울",
    items: ["개념 점검", "취약 단원 보완", "신학기 필수 개념 선행"],
  },
  {
    en: "ADVANCE",
    ko: "한 학기 먼저 가는 겨울",
    items: ["학교별 진도 분석", "내신 선행", "고난도 문제 적응"],
  },
  {
    en: "PERFORMANCE",
    ko: "시험에 강해지는 겨울",
    items: ["주간 테스트", "누적 취약 관리", "오답 분석"],
  },
];

/** 6) 로드맵 6단계 */
export const roadmap = [
  { step: "STEP 01", title: "입학 진단", img: "/winter/step-1.png" },
  { step: "STEP 02", title: "개인 학습계획", img: "/winter/step-2.png" },
  { step: "STEP 03", title: "수업 · 과제 · 자습", img: "/winter/step-3.png" },
  { step: "STEP 04", title: "주간 평가", img: "/winter/step-4.png" },
  { step: "STEP 05", title: "학습 상담", img: "/winter/step-5.png" },
  { step: "STEP 06", title: "신학기 전략 완성", img: "/winter/step-6.png" },
];

/** 7-1) 관리 시스템 5종 */
export const manageItems = [
  "출결 관리",
  "학습 관리",
  "성취도 관리",
  "상담 관리",
  "입시 관리",
];

/** 7-2) 과목별 커리큘럼 (탭) */
export const curriculumTabs = ["국어", "수학", "영어", "탐구"];
export const curriculum: Record<
  string,
  { en: string; flow: string[]; grades: { grade: string; items: string[] }[] }
> = {
  국어: {
    en: "KOREAN",
    flow: ["개념", "유형", "심화", "실전"],
    grades: [
      { grade: "예비고1", items: ["문학 개념 정리", "독서 기초", "고1 내신 선행"] },
      { grade: "예비고2", items: ["문학·독서 심화", "학교별 내신 선행", "고난도 유형"] },
      { grade: "예비고3", items: ["수능 핵심 개념", "기출 분석", "실전 문제풀이"] },
    ],
  },
  수학: {
    en: "MATHEMATICS",
    flow: ["개념", "유형", "심화", "실전"],
    grades: [
      { grade: "예비고1", items: ["중등 개념 완성", "고등수학 기초", "고1 내신 선행"] },
      { grade: "예비고2", items: ["수학Ⅰ / 수학Ⅱ 핵심", "학교별 내신 선행", "고난도 유형"] },
      { grade: "예비고3", items: ["수능 핵심 개념", "기출 분석", "실전 문제풀이"] },
    ],
  },
  영어: {
    en: "ENGLISH",
    flow: ["어휘", "구문", "독해", "실전"],
    grades: [
      { grade: "예비고1", items: ["필수 어휘·구문", "독해 기초", "고1 내신 선행"] },
      { grade: "예비고2", items: ["구문 심화", "학교별 내신 대비", "빈칸·순서 훈련"] },
      { grade: "예비고3", items: ["수능 유형 훈련", "기출 분석", "시간 관리 실전"] },
    ],
  },
  탐구: {
    en: "SCIENCE / SOCIAL",
    flow: ["개념", "정리", "문제", "실전"],
    grades: [
      { grade: "예비고1", items: ["통합과학·사회 기초", "학습 습관 형성", "개념 정리"] },
      { grade: "예비고2", items: ["선택과목 개념", "학교별 내신 대비", "단원 문제풀이"] },
      { grade: "예비고3", items: ["수능 개념 완성", "기출 분석", "실전 모의고사"] },
    ],
  },
};

/** 8-1) 하루 일과 */
export const timetable = [
  { time: "08:30", what: "등원" },
  { time: "09:00", what: "1교시" },
  { time: "10:30", what: "2교시" },
  { time: "12:00", what: "점심" },
  { time: "13:00", what: "오후 수업" },
  { time: "16:00", what: "자기주도학습" },
  { time: "18:00", what: "저녁" },
  { time: "19:00", what: "질의응답 · 클리닉" },
  { time: "21:30", what: "학습 종료" },
];

/** 8-2) 공간 */
export const spaces = [
  { name: "CLASS ROOM", img: "/winter/space-1.png", big: true },
  { name: "SELF STUDY", img: "/winter/space-2.png", big: false },
  { name: "CONSULTING", img: "/winter/space-3.png", big: false },
  { name: "LOUNGE", img: "/winter/space-4.png", big: false },
  { name: "TEACHERS ROOM", img: "/winter/space-5.png", big: false },
];

/** 8-3) WHY DAIN */
export const whyDain = [
  { no: "01", text: "학생별 학습관리" },
  { no: "02", text: "학교별 내신 분석" },
  { no: "03", text: "주간 성취도 점검" },
  { no: "04", text: "입시 컨설팅 연계" },
];

/** 9-1) 모집 안내 */
export const admission = [
  { label: "모집 대상", value: "예비 고1 · 고2 · 고3" },
  { label: "교육 기간", value: "2027.01.XX ~ 2027.02.XX" },
  { label: "모집 기간", value: "2026.XX.XX ~ 선착순 마감" },
  { label: "교육 장소", value: "다인교육 동탄점" },
  { label: "상담 문의", value: "031-8003-0221" },
];

/** 9-2) 등록 절차 */
export const process = ["상담 신청", "입학 상담", "반 배정", "등록", "WINTER START"];

/** 9-3) FAQ */
export const faqs = [
  {
    q: "윈터스쿨 대상 학년은 어떻게 되나요?",
    a: "예비 고1·고2·고3(현 중3·고1·고2) 학생을 대상으로 모집합니다. 학년별로 반이 분리되어 운영됩니다.",
  },
  {
    q: "수업은 어떤 방식으로 진행되나요?",
    a: "과목별 정규 수업 후 자기주도학습 시간이 이어집니다. 담임이 출결과 과제 수행을 매일 점검하고, 주간 평가로 성취도를 확인합니다.",
  },
  {
    q: "자습 관리도 진행되나요?",
    a: "네. 지정석에서 관리되는 자습이 기본이며, 질의응답과 클리닉 시간이 별도로 운영됩니다.",
  },
  {
    q: "학교별 내신 대비가 가능한가요?",
    a: "재학 예정 학교의 진도와 출제 경향을 분석해 반영합니다. 상담 시 학교를 알려주시면 자세히 안내드립니다.",
  },
  {
    q: "식사는 제공되나요?",
    a: "점심·저녁 식사 시간이 일과에 포함되어 있습니다. 세부 운영 방식은 상담 시 안내드립니다.",
  },
  {
    q: "윈터스쿨 이후에도 계속 수강할 수 있나요?",
    a: "가능합니다. 윈터스쿨 수료생은 신학기 정규반 우선 배정 혜택이 있습니다.",
  },
];
