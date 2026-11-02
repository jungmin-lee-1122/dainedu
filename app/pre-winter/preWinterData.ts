// ═══════════════════════════════════════════════════════════
//  PRE 윈터스쿨 — 페이지에 들어가는 모든 글과 숫자
//
//  이 파일만 고치면 페이지가 바뀝니다. page.tsx 는 건드릴 필요 없습니다.
//
//  ⚠️ "확인 필요" 표시가 붙은 값은 아직 확정 전입니다.
//     실제 숫자를 받으면 그 줄만 바꾸면 됩니다.
// ═══════════════════════════════════════════════════════════

/** 상단 큰 화면 */
export const hero = {
  eyebrow: "PRE WINTER SCHOOL",
  titleTop: "윈터스쿨보다 한 달 먼저,",
  titleBottom: "겨울의 속도를 당깁니다.",
  sub: "예비 고1은 고등 과정의 첫 단추를, 예비 고2·고3은 수능 실전 감각을. 학년에 맞춰 두 과정으로 나누어 운영합니다.",
  chips: ["예비 고1 (현 중3)", "예비 고2·고3 (현 고1·고2)", "12월 한 달"],
  /* 배경 사진 — public/winter/kv-room.jpg 를 함께 씁니다.
     전용 사진이 생기면 아래 경로만 바꾸세요. */
  image: "/winter/kv-room.jpg",
  imageMobile: "/winter/kv-room-m.jpg",
};

/** 왜 한 달 먼저 시작하는가 — 인트로 */
export const intro = {
  tag: "Why PRE",
  title: "겨울의 속도는",
  titleEm: "12월에 정해집니다.",
  lead:
    "1월에 시작하면 적응에만 2주가 걸립니다. 한 달 먼저 고등 과정을 만난 학생은 윈터스쿨 첫날부터 전력으로 달립니다.",
  points: [
    {
      no: "01",
      icon: "gap",
      t: "중등과 고등 사이의 공백을 없앱니다",
      d: "중3 2학기가 끝나고 윈터스쿨 개강까지 비는 한 달. 이 시간을 고등 과정의 출발선으로 바꿉니다.",
    },
    {
      no: "02",
      icon: "math",
      t: "공통수학 1·2 를 미리 통과합니다",
      d: "다항식·방정식과 부등식·경우의 수, 도형의 방정식·함수까지. 고1 1학기 내신의 뼈대를 먼저 세웁니다.",
    },
    {
      no: "03",
      icon: "science",
      t: "통합과학을 함께 시작합니다",
      d: "고1 내신에서 비중이 큰데도 준비 없이 맞닥뜨리는 과목입니다. 개념의 틀을 미리 잡아둡니다.",
    },
  ],
};

/** 윈터스쿨로 이어지는 흐름 — 중간 띠 */
export const warmup = {
  small: "WARM-UP FOR WINTER SCHOOL",
  big: "PRE 윈터스쿨은",
  bigEm: "윈터스쿨의 예열입니다.",
  desc: "12월에 고등 과정의 결을 익히고, 1월 윈터스쿨에서 전속력으로 달립니다.",
  steps: [
    { tag: "12월", title: "PRE 윈터스쿨", desc: "공통수학 1·2 · 통합과학 선행", now: true },
    { tag: "1월 ~ 2월", title: "2027 윈터스쿨", desc: "고1 1학기 내신 완성", href: "/winter" },
  ],
};

/** ═══ 과정 두 가지 ═══
 *  탭을 눌러 바뀌는 부분입니다. 과정이 늘면 아래 배열에 하나 더하면 됩니다.
 *  ⚠️ "확인 필요" 는 아직 확정 전인 값입니다. */
export type Track = {
  id: string;
  tab: string;
  target: string;
  title: string;
  titleEm: string;
  lead: string;
  chips: string[];
  facts: { k: string; v: string; sub?: string; accent?: boolean; wide?: boolean }[];
  timetable: { period: string; time: string; title: string; desc?: string }[];
  timetableCap: string;
  timetableNote: string[];
};

export const tracks: Track[] = [
  /* ───────── 예비 고1 ───────── */
  {
    id: "go1",
    tab: "예비 고1",
    target: "현 중3",
    title: "고등 수학과 과학의",
    titleEm: "첫 단추를 미리.",
    lead: "중3 2학기가 끝나고 윈터스쿨 개강까지 비는 한 달. 이 시간을 고등 과정의 출발선으로 바꿉니다.",
    chips: ["공통수학 1", "공통수학 2", "통합과학"],
    facts: [
      { k: "교육 기간", v: "2026. 12. 1(화) ~ 12. 31(목)", sub: "12. 25(금) 크리스마스 휴강", accent: true },
      { k: "수업 일시", v: "주 5일 (월~금) 18:00 ~ 22:00" },
      { k: "수강 대상", v: "예비 고1 (현 중3)" },
      { k: "교육 목표", v: "공통수학 1·2 와 통합과학 선행을 통한 고등 출발선 확보", wide: true },
      { k: "수강료", v: "확인 필요", sub: "교재비 및 컨텐츠비, 급식비 별도", accent: true },
      { k: "예약금", v: "확인 필요", sub: "예약금 납부자 최종 등록일 — 확인 필요" },
      { k: "접수 방법", v: "사전 예약제 · 정원 마감 시 조기 종료", wide: true },
    ],
    timetable: [
      { period: "석식", time: "17:30 - 18:00", title: "선택 급식", desc: "구내식당" },
      { period: "TEST", time: "18:00 - 18:30", title: "Daily Test", desc: "수업내용 복습 및 점검" },
      { period: "1교시", time: "18:30 - 20:10", title: "공통수학 1", desc: "다항식, 방정식과 부등식, 경우의 수" },
      { period: "2교시", time: "20:20 - 22:00", title: "공통수학 2", desc: "도형의 방정식, 함수" },
      { period: "—", time: "확인 필요", title: "통합과학", desc: "편성 방식 확인 필요" },
    ],
    timetableCap: "월요일 – 금요일",
    timetableNote: [
      "수업 및 자습시작 타종이 되면 10분간 이동금지입니다.",
      "모두가 함께하는 공간에서 공부하기 때문에, 공부에 집중하는 분위기를 만들기 위함입니다.",
    ],
  },

  /* ───────── 예비 고2·고3 ───────── */
  {
    id: "go23",
    tab: "예비 고2 · 고3",
    target: "현 고1 · 고2",
    title: "개념은 끝났다.",
    titleEm: "이제 수능 실전이다.",
    lead: "개념은 알겠는데 모의고사 문제에서 막히는 학생을 위한 과정. 대수·미적분 I 을 수능 관점에서 다시 세웁니다.",
    chips: ["대수", "미적분 I", "수능수학"],
    facts: [
      { k: "교육 기간", v: "2026. 12. 12(토) ~ 2027. 1. 2(토)", accent: true },
      { k: "수업 일시", v: "매주 토요일 · 총 4회", sub: "주차별 선택 가능" },
      { k: "수강 대상", v: "예비 고2(현 고1) · 예비 고3(현 고2)", sub: "대수 · 미적분 I 을 1회 이상 학습한 학생", wide: true },
      { k: "교육 목표", v: "수능 수학 이해 및 실전 개념 체화", wide: true },
      { k: "수강료", v: "확인 필요", sub: "교재비 별도", accent: true },
      { k: "접수 방법", v: "사전 예약제 · 정원 마감 시 조기 종료", wide: true },
    ],
    timetable: [
      { period: "1주차", time: "2026. 12. 12(토)", title: "확인 필요", desc: "주차별 주제 확인 필요" },
      { period: "2주차", time: "2026. 12. 19(토)", title: "확인 필요", desc: "주차별 주제 확인 필요" },
      { period: "3주차", time: "2026. 12. 26(토)", title: "확인 필요", desc: "주차별 주제 확인 필요" },
      { period: "4주차", time: "2027. 1. 2(토)", title: "확인 필요", desc: "주차별 주제 확인 필요" },
    ],
    timetableCap: "매주 토요일 · 총 4회",
    timetableNote: [
      "주차별 선택 수강이 가능합니다. 원하는 주차만 신청하셔도 됩니다.",
      "수업 시간은 확인 필요 — 확정되면 안내드립니다.",
    ],
  },
];

/** 환불 규정 — 두 과정 공통. 학원법 기준 문구입니다. 임의로 고치지 마세요. */
export const refund =
  "교습시작 전 전액 환불 · 교습기간 1/3 이내 2/3 환불 · 교습기간 1/2 이내 1/2 환불 · 교습기간 1/2 초과 시 환불 불가";

/** 수강 혜택 — 윈터스쿨 사전 등록생 대상 할인
 *  ⚠️ 조건 문구는 광고 표시 기준에 걸리는 부분이라 임의로 줄이지 마세요. */
export const benefit = {
  tag: "Benefit",
  title: "윈터스쿨 사전 등록생",
  titleEm: "수강 과목 수만큼 할인",
  lead:
    "2027 윈터스쿨에 사전 등록한 학생이 PRE 윈터스쿨을 함께 수강하면, 신청 과목 수에 따라 PRE 윈터스쿨 수강료가 할인됩니다. 두 과정 모두 적용됩니다.",
  tiers: [
    { count: "1과목", percent: 5 },
    { count: "2과목", percent: 10 },
    { count: "3과목", percent: 15 },
  ],
  notes: [
    "2027 윈터스쿨 사전 등록을 마친 학생에 한해 적용됩니다.",
    "할인은 PRE 윈터스쿨 수강료에 적용되며, 교재비·컨텐츠비·급식비는 제외됩니다.",
    "다른 할인과 중복 적용되지 않습니다.",
  ],
};

/** 하루 일과 — 월요일~금요일 */
export const dayPhotos: { no: string; img: string; cap: string }[] = [
  { no: "01", img: "/winter/day-1.jpg", cap: "등원" },
  { no: "02", img: "/winter/day-2.jpg", cap: "Daily Test" },
  { no: "03", img: "/winter/day-3.jpg", cap: "수업 및 자기주도학습" },
  { no: "04", img: "/winter/day-4.jpg", cap: "책임 담임제" },
];

/** 마무리 */
export const closing = {
  small: "2028학년도 처음 열리는 입시",
  big: "한 달 먼저 시작한 겨울이,",
  bigEm: "고1 1학기를 바꿉니다.",
};

/** 하단에 계속 붙어 있는 띠 */
export const fixedBar = {
  rows: [
    { k: "예비 고1", v: "12.01(화) 개강 · 주 5일" },
    { k: "예비 고2·고3", v: "12.12(토) 개강 · 매주 토요일" },
  ],
  cta: "사전 예약하기",
};
