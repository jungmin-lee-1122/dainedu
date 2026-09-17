// ═══════════════════════════════════════════════════════════
//  단과시간표 데이터
//  실제 강좌가 확정되면 아래 예시 항목의 문구·일정·가격을 교체하세요.
// ═══════════════════════════════════════════════════════════

export type Course = {
  id: string;
  teacherId: string;
  subject: string;
  targets: string[];
  tags: string[];
  title: string;
  startDate: string;
  period: string;
  time: string;
  price: string;
  material: string;
  syllabus?: string;
};

export const scheduleTabs = [
  { label: "N수 · 고3 단과", targets: ["N수", "고3"] },
  { label: "고2 단과", targets: ["고2"] },
  { label: "고1 단과", targets: ["고1"] },
  { label: "중3 단과", targets: ["중3"] },
  { label: "특강", targets: ["특강"] },
];

/** 화면 구성을 확인하기 위한 예시 강좌 — 실제 편성 확정 후 교체 필수 */
export const courses: Course[] = [
  {
    id: "course-01",
    teacherId: "teacher-01",
    subject: "수학",
    targets: ["N수", "고3"],
    tags: ["수학", "수능"],
    title: "수능 수학 실전 완성",
    startDate: "일정 공개 예정",
    period: "8주 과정",
    time: "주 1회 · 3시간",
    price: "추후 안내",
    material: "자체 교재",
  },
  {
    id: "course-02",
    teacherId: "teacher-06",
    subject: "국어",
    targets: ["N수", "고3"],
    tags: ["국어", "독서"],
    title: "수능 독서 구조 독해",
    startDate: "일정 공개 예정",
    period: "8주 과정",
    time: "주 1회 · 3시간",
    price: "추후 안내",
    material: "자체 교재",
  },
  {
    id: "course-03",
    teacherId: "teacher-03",
    subject: "수학",
    targets: ["고2"],
    tags: ["수학", "내신"],
    title: "고2 수학 내신 집중반",
    startDate: "일정 공개 예정",
    period: "학교별 편성",
    time: "주 2회 · 2시간",
    price: "추후 안내",
    material: "학교별 교재",
  },
  {
    id: "course-04",
    teacherId: "teacher-07",
    subject: "국어",
    targets: ["고1"],
    tags: ["국어", "내신"],
    title: "고1 국어 기본 완성",
    startDate: "일정 공개 예정",
    period: "학교별 편성",
    time: "주 1회 · 3시간",
    price: "추후 안내",
    material: "학교별 교재",
  },
  {
    id: "course-05",
    teacherId: "teacher-09",
    subject: "통합과학",
    targets: ["중3"],
    tags: ["통합과학", "예비고1"],
    title: "예비고1 통합과학 선행",
    startDate: "일정 공개 예정",
    period: "6주 과정",
    time: "주 1회 · 2시간",
    price: "추후 안내",
    material: "자체 교재",
  },
  {
    id: "course-06",
    teacherId: "teacher-14",
    subject: "수리논술",
    targets: ["특강"],
    tags: ["수리논술", "파이널"],
    title: "대학별 수리논술 파이널",
    startDate: "일정 공개 예정",
    period: "대학별 편성",
    time: "주 1회 · 3시간",
    price: "추후 안내",
    material: "대학별 기출 교재",
  },
];
