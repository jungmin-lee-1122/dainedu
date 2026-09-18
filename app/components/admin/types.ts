// ═══════════════════════════════════════════════════════════
//  관리자 화면 공통 타입
//  각 관리 페이지는 이 모양의 fields 배열만 넘기면 됩니다.
// ═══════════════════════════════════════════════════════════

export type FieldType =
  | "text"       // 한 줄 입력
  | "textarea"   // 여러 줄 입력
  | "tags"       // 쉼표로 구분하는 태그
  | "image"      // 사진 업로드
  | "checkbox"   // 켜기/끄기
  | "select"     // 정해진 값 중 고르기
  | "courses";   // 개설 강좌 (강사 전용)

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  help?: string;
  maxLength?: number;
  /** type: "select" 일 때 선택지 */
  options?: string[];
};

export type Item = Record<string, unknown> & { id?: string };

/** 강사에게 딸린 개설 강좌 */
export type CourseValue = {
  id: string;
  title: string;
  subject: string;
  targets: string[];
  startDate: string;
  period: string;
  time: string;
  price: string;
  material: string;
};

export const EMPTY_COURSE: Omit<CourseValue, "id"> = {
  title: "",
  subject: "",
  targets: [],
  startDate: "",
  period: "",
  time: "",
  price: "",
  material: "",
};
