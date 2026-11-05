// ═══════════════════════════════════════════════════════════
//  강사 연간 계획서 (수업 커리큘럼 자료)
//
//  선생님이 주신 PDF 를 쪽마다 이미지로 바꿔
//  public/teachers/plan/<폴더>/01.jpg … 로 넣어 두고,
//  여기에 이름 → 폴더·쪽수만 적으면 상세 페이지에 붙습니다.
//
//  【새 선생님 자료를 받으면】
//   1) PDF 를 1500px 가로 JPG 로 쪽마다 저장
//      (터미널에서: pdftoppm -r 200 -png 파일.pdf p  →  리사이즈)
//   2) public/teachers/plan/<영문폴더>/01.jpg, 02.jpg … 로 넣기
//   3) 아래 목록에 한 줄 추가
//
//  ※ 자료에 적힌 연도·일정·비용은 올리기 전에 꼭 확인해 주세요.
//    (학원법상 교습비 외 징수 항목은 별도 게시 의무가 있습니다)
// ═══════════════════════════════════════════════════════════

export type TeacherPlan = {
  /** public/teachers/plan 아래 폴더 이름 */
  dir: string;
  /** 쪽수 — 01.jpg 부터 이 숫자까지 */
  pages: number;
  /** 섹션 제목 */
  title: string;
  /** 제목 아래 한 줄 설명 */
  desc?: string;
};

const PLAN_BY_NAME: Record<string, TeacherPlan> = {
  송지승: {
    dir: "songjiseung",
    pages: 6,
    title: "2027 수능 · 내신 연간 커리큘럼",
    desc: "Season #01~#04 월별 진행 과정과 주간 관리 시스템을 담았습니다.",
  },
};

function key(name?: string) {
  return name ? name.replace(/\s+/g, "") : "";
}

/** 연간 계획서 — 없으면 null */
export function teacherPlan(name?: string): TeacherPlan | null {
  return PLAN_BY_NAME[key(name)] ?? null;
}

/** 쪽 이미지 주소 (1부터) */
export function planPage(dir: string, n: number) {
  return `/teachers/plan/${dir}/${String(n).padStart(2, "0")}.jpg`;
}
