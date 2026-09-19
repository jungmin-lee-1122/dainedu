// ═══════════════════════════════════════════════════════════
//  2027 다인 윈터스쿨 — 페이지 데이터
//  문구·숫자·항목은 이 파일에서 수정하세요.
// ═══════════════════════════════════════════════════════════

/** 섹션 내비게이션 (스크롤 시 상단 고정) */
export const sectionNav = [
  { label: "입시 개편", href: "#reform" },
  { label: "선택 이유", href: "#result" },
  { label: "관리 기준", href: "#why" },
  { label: "강사진", href: "#faculty" },
  { label: "학습 공간", href: "#space" },
  { label: "관리 시스템", href: "#system" },
  { label: "모집 안내", href: "#admission" },
];

/** 1) 히어로 */
export const hero = {
  eyebrow: "2027 DAIN WINTER SCHOOL",
  title: ["기준이 바뀌는 겨울,", "준비도 바뀌어야 합니다"],
  sub: "2028 개편 입시를 준비하는 가장 결정적인 두 달",
  chips: ["예비 고1", "예비 고2", "예비 고3"],
};

/** 2) 등록 혜택 — 얼리버드 2단계 */
export const benefitTimeline = [
  {
    tag: "STEP 1",
    title: "윈터 얼리버드",
    rows: [
      { k: "교육 기간", v: "각 학교 방학일(12월) ~ 개학일(2월)" },
      { k: "접수 시작", v: "2026년 10월 1일(목)부터" },
      { k: "혜택 적용", v: "2026년 11월 30일(월)까지 2개월 결제 시" },
    ],
  },
  {
    tag: "STEP 2",
    title: "애프터 윈터",
    rows: [
      { k: "교육 기간", v: "개학일 이후 ~ 신학기 (2~3월)" },
      { k: "혜택 대상", v: "2027 윈터스쿨 수료생" },
      { k: "접수 마감", v: "2027년 2월 28일(일)까지 재등록 시" },
    ],
  },
];

export const benefitCards = [
  {
    badge: "#1 윈터 얼리버드",
    lead: "일찍 결정할수록, 더 커지는 혜택",
    when: "11월 30일(월)까지 2개월 사전 결제 시",
    percent: "20",
    notes: [
      "각 학교 방학일로부터 2일 이내 입학",
      "12월 1일 ~ 12월 24일 결제 시 최대 10% 할인",
      "과정별 할인율은 상이합니다",
    ],
  },
  {
    badge: "#2 애프터 윈터",
    lead: "끝나도 끝이 아닌, 이어지는 혜택",
    when: "윈터스쿨 수료 후 3개월 재등록 시",
    percent: "30",
    notes: [
      "2027 윈터스쿨 수료생 한정",
      "2개월 재등록 시 최대 20% 할인",
      "2027년 2월 28일까지 재등록 시 적용",
    ],
  },
];

/** 3) 2028 입시 개편
 *  art — 카드에 들어가는 일러스트 종류 (ReformArt.tsx 참고)
 *        "grade" 저울 · "exam" 답안지+연필 · "paper" 서류+화살표
 */
export const reforms = [
  {
    no: "Change 1.",
    from: "9등급",
    to: "5등급제",
    desc: "한 등급의 무게가 완전히 달라져,\n내신만으로는 변별이 어려워집니다.",
    art: "grade" as const,
  },
  {
    no: "Change 2.",
    from: "",
    to: "통합형 수능 첫 시행",
    desc: "선택과목이 사라지면서 학습 전략을\n처음부터 다시 설계해야 합니다.",
    art: "exam" as const,
  },
  {
    no: "Change 3.",
    from: "",
    to: "학종 · 논술 확대",
    desc: "내신 변별력 약화로 대학이\n수시 평가 요소를 강화하는 흐름입니다.",
    art: "paper" as const,
  },
];

/** 4) WHY DAIN — 개원 전이므로 '실적'이 아니라 '지키는 기준'을 씁니다.
 *  운영 방침이 바뀌면 이 값만 고치면 됩니다.
 */
export const whyStats = [
  { label: "1:1 수학 책임담임", value: "30", unit: "분" },
  { label: "담임 상담", value: "1", unit: "회/주" },
  { label: "하루 관리 시간", value: "14", unit: "h" },
];

/** 4-2) 왜 다인아카데미인가 */
export const whyReasons = [
  {
    no: "01",
    t: "학원가가 증명한 강사진",
    d: "대치 · 목동 · 분당 · 평촌에서 실력으로 검증된 강사가 전 과목에 직접 섭니다.",
  },
  {
    no: "02",
    t: "강의로 끝나지 않는 관리",
    d: "학습 · 입시 · 생활 · 규정까지, 수업이 끝난 이후의 시간을 4대 케어로 설계합니다.",
  },
  {
    no: "03",
    t: "기록으로 찾는 약점",
    d: "매일의 테스트와 오답, 질문 기록을 분석해 무엇을 보완할지 구체적으로 확인합니다.",
  },
  {
    no: "04",
    t: "몰입만 남기는 공간",
    d: "강의동과 자습동을 분리한 180평, 개인 지정석과 태블릿까지 학습 환경으로 채웠습니다.",
  },
];

export const resultBanner = {
  label: "2026학년도 고등 재학생 수시",
  percent: "38",
  text: "주요 대학 합격",
};

export const stories = [
  {
    title: "겨울방학 두 달로\n내신 1등급대 진입",
    univ: "예비 고2 · 수학 3등급 → 1등급",
    body: "개념이 비어 있던 단원을 겨울에 다시 세웠습니다. 매일 같은 시간에 앉는 습관이 학기 중에도 그대로 이어졌어요.",
    who: "동탄고 재학생 김OO",
  },
  {
    title: "선행이 아니라\n복구가 먼저였습니다",
    univ: "예비 고3 · 국어 4등급 → 2등급",
    body: "무작정 진도를 나가지 않고 약점부터 점검한 게 컸습니다. 주간 테스트로 매주 확인하니 불안이 줄었습니다.",
    who: "동탄중앙고 재학생 이OO",
  },
  {
    title: "중3 겨울,\n고등 수학의 방향을 잡다",
    univ: "예비 고1 · 고등수학 기초 완성",
    body: "고등학교 진도를 미리 겪어보니 3월이 두렵지 않았습니다. 담임 선생님과 매주 계획을 다시 짰습니다.",
    who: "동탄목동중 졸업생 박OO",
  },
  {
    title: "자습 시간이\n공부 시간이 되었습니다",
    univ: "예비 고3 · 주간 순공 42h 달성",
    body: "관리되는 자습이 무엇인지 처음 알았습니다. 휴대폰을 맡기고 나니 하루가 두 배로 길어졌어요.",
    who: "화성 반송고 재학생 정OO",
  },
];

/** 6) 학습 공간 — 실제 촬영 사진 — 모두 1200x900(4:3)으로 맞춰 두었습니다.
 *  사진을 바꿀 때도 같은 비율로 올려야 카드 크기가 흐트러지지 않습니다.
 *  등원 동선 순서(입구 → 강의실 → 자습실 → 휴게실)로 배치했습니다.
 */
export const spaces = [
  { name: "학생 입구", tags: ["#턴게이트 출입", "#등·하원 자동 기록", "#실시간 알림"], img: "/winter/space-gate.jpg" },
  { name: "강의실", tags: ["#실전 배치", "#학년별 분반", "#소수 정예"], img: "/winter/space-class.jpg" },
  { name: "자습실", tags: ["#1인 1지정석", "#상시 감독", "#집중 조명"], img: "/winter/space-hall.jpg" },
  { name: "자습실 (칸막이형)", tags: ["#개인 공간 보호", "#시야 차단", "#몰입 학습"], img: "/winter/space-study.jpg" },
  { name: "컨설팅룸", tags: ["#1:1 입시 상담", "#학습 전략 설계"], img: "/winter/space-suite.jpg" },
  { name: "휴게실", tags: ["#리프레시 공간", "#정수기·냉장고"], img: "/winter/space-lounge.jpg" },
];

/** 6-2) 학원가가 증명한 강사진
 *  photo: 단체 사진 경로 (public/winter/faculty.jpeg).
 *         사진을 잠시 감추고 싶으면 "" 로 비워두면 됩니다.
 */
export const faculty = {
  photo: "/winter/faculty.jpeg",
  lead: [
    "대치 · 목동 · 분당 · 평촌 — 대한민국 사교육을 이끌어온 네 학원가에서",
    "오랜 시간 실력으로 증명해온 강사진이, 이번 겨울 다인아카데미 교실에 직접 섭니다.",
  ],
  areas: [
    {
      name: "대치",
      desc: "대한민국 사교육의 심장부. 최상위권 학생들을 이끌어온 강사진의 강의 밀도가 오랜 시간 검증된 곳입니다.",
    },
    {
      name: "분당",
      desc: "수도권 남부를 대표하는 학원가. 체계적인 커리큘럼 설계와 운영으로 신뢰를 쌓아온 강사진이 자리하고 있습니다.",
    },
    {
      name: "목동",
      desc: "강서권 교육의 중심. 내신과 수능, 두 마리 토끼를 함께 잡는 지도력으로 이름을 알려온 학원가입니다.",
    },
    {
      name: "평촌",
      desc: "안양권을 대표하는 학원 특구. 학생 한 사람 한 사람을 세심히 살피는 관리형 수업으로 강점을 쌓아온 곳입니다.",
    },
  ],
  note: {
    title: "전과목 학원가 대표 강사 출강",
    lines: [
      "고1 · 고2 · 고3 전 과목에 걸쳐, 각 학원가를 대표하는 검증된 강사가 배정됩니다.",
      "과목별 담당 강사진은 시간표가 확정되는 대로 순차적으로 공개해 드립니다.",
    ],
  },
};

/** 7) 4대 밀착 케어 시스템
 *  d(설명)는 없어도 됩니다. 비워 두면 제목만 한 줄로 나옵니다.
 */
export type CareItem = { t: string; d?: string };
export const careLead = [
  "체계적인 학습 케어부터 입시 컨설팅, 몰입 · 생활 케어, 엄격한 규정 케어까지",
  "4대 밀착 관리로 완벽한 성적 향상과 명문대 합격 전략을 완성합니다.",
];
export const careCards: { no: string; name: string; en: string; lead: string; items: CareItem[] }[] = [
  {
    no: "01",
    name: "학습 케어",
    en: "LEARNING CARE",
    lead: "배운 내용을 실력으로",
    items: [
      { t: "1:1 멘토링 코칭 · 대면 질의응답" },
      { t: "1:1 수학 책임담임제" },
      { t: "학교별 기출 · 전과목 커리큘럼" },
    ],
  },
  {
    no: "02",
    name: "입시 컨설팅",
    en: "ADMISSION",
    lead: "명문대 합격을 위한 설계",
    items: [
      { t: "학생부 심층진단" },
      { t: "로드맵 포트폴리오" },
      { t: "시즌별 입시 전략 특강" },
    ],
  },
  {
    no: "03",
    name: "생활 케어",
    en: "DAILY CARE",
    lead: "공부에만 집중하는 환경",
    items: [
      { t: "학습 플래너 1:1 피드백" },
      { t: "스마트폰 세이브존" },
      { t: "개인별 11인치 태블릿" },
    ],
  },
  {
    no: "04",
    name: "몰입 규정",
    en: "RULE & FOCUS",
    lead: "분위기를 지키는 엄격한 규정",
    items: [
      { t: "벌점 패널티 시스템" },
      { t: "학습 외 사이트 차단" },
      { t: "원스트라이크 퇴원 규정" },
    ],
  },
];

/** 7-2) 관리 공식 (프리미엄 강의 + 프리미엄 관리) */
export const careFormula = { a: "프리미엄 강의", b: "프리미엄 관리", result: "완성에 이르는 겨울" };

/** 7-3) 보이지 않던 공부까지 관리합니다 */
export const recordLead = [
  "단순히 학원에 머문 시간을 확인하는 것이 아닙니다.",
  "학생의 하루 학습 흐름과 실제 공부의 밀도를 세밀하게 관리합니다.",
];
export const recordCards = [
  { no: "1", name: "출결 관리", en: "ATTENDANCE", desc: "등원과 하원 시간을 정확하게 기록하고, 지각과 출결 패턴까지 지속적으로 확인합니다." },
  { no: "2", name: "순공시간 관리", en: "STUDY TIME", desc: "자리에 앉아 있는 시간이 아닌, 실제로 공부한 시간을 기준으로 학습의 흐름을 점검합니다." },
  { no: "3", name: "데일리 플래너", en: "DAILY PLAN", desc: "오늘의 학습 계획을 세우고 완료 여부까지 점검하며 계획과 실행을 연결합니다." },
  { no: "4", name: "집중도 케어", en: "FOCUS CARE", desc: "집중력이 흐트러지는 순간을 확인하고, 필요한 경우 담당 선생님이 직접 개입합니다." },
];
export const recordChips = [
  { t: "데일리 TEST", d: "매일 학습이 자리 잡았는지 확인" },
  { t: "성적 Tracking", d: "과목별 성적 변화를 누적 관리" },
  { t: "오답 분석", d: "반복 오답으로 취약 영역 정리" },
  { t: "1:1 맞춤 케어", d: "기록을 바탕으로 보완 방향 제시" },
];
export const recordQuote = "오래 앉아 있는 공부보다, 밀도 높은 하루를 만듭니다.";

/** 7-4) AI가 분석하고, 선생님이 완성합니다
 *  photo: 태블릿 학습 사진 (public/winter/ai-tablet.jpg). 비워 두면 사진이 나오지 않습니다.
 */
export const aiLead = [
  "다인아카데미의 AI는 학생을 대신 판단하기 위한 기술이 아닙니다.",
  "질문 기록과 시험 오답, 학습 데이터에서 놓치기 쉬운 신호를 찾고,",
  "그 결과를 바탕으로 담당 선생님이 더 세밀한 관리를 이어갑니다.",
];
export const aiSteps = [
  { no: "01", t: "학습 정보 수집", d: "질문 기록, 시험 오답, 학습 데이터를 분석의 기초 자료로 수집" },
  { no: "02", t: "AI 학습 분석", d: "누적된 정보를 분석해 학생별 취약 영역과 학습 패턴을 진단" },
  { no: "03", t: "맞춤 방향 제안", d: "분석 결과를 바탕으로 개선 방향과 맞춤 학습법을 제시" },
  { no: "04", t: "상담 및 연계 관리", d: "결과에 맞춰 1:1 상담을 연계하고 후속 학습까지 관리" },
];
export const aiPhoto = "/winter/ai-tablet.jpg";
export const aiTablet = {
  title: "공부하는 순간까지, 세밀하게 관리합니다",
  lead: "개인 지정석의 다인에듀 태블릿으로 인강과 질문, 계획과 기록을 하나로 잇습니다.",
  items: [
    { t: "인강 시청 · AI 튜터", d: "지정석에서 바로 시청하고, 막히는 문제는 즉시 질문" },
    { t: "AI 학습태도 감지", d: "졸음 · 시선 이탈을 감지해 선생님 순회 관리와 연결" },
    { t: "학습 외 사이트 차단", d: "유해 사이트와 학습 외 콘텐츠 접속을 제한" },
    { t: "플래너 업로드 · 점검", d: "계획과 실천 내용을 기록해 매일 점검" },
  ],
  report: ["학습태도", "플래너 기록", "출결 사항", "전자기기 제출"],
};
export const aiQuote = "보이는 데이터 위에, 사람의 관리가 더해집니다.";

/** 7-B) 관리 시스템 — 탭 (현재는 위 4대 케어로 대체되어 화면에 나오지 않습니다) */
export const manageTabs = ["생활관리", "학습관리", "입시관리", "멘탈관리"];
export const manageGroups: Record<string, { lead: string; items: { no: string; title: string; lines: string[] }[] }> = {
  생활관리: {
    lead: "하루의 리듬부터 관리합니다",
    items: [
      { no: "01", title: "출결 관리", lines: ["교시제 운영", "등·하원 실시간 안내"] },
      { no: "02", title: "휴대폰 관리", lines: ["입실 시 의무 제출", "쉬는 시간에도 사용 제한"] },
      { no: "03", title: "졸음 관리", lines: ["담임 정기 순찰", "몰입 시간 확보"] },
      { no: "04", title: "소음 관리", lines: ["사담 금지", "상시 감독"] },
      { no: "05", title: "식사 관리", lines: ["검증된 식사 제휴", "정해진 시간 운영"] },
    ],
  },
  학습관리: {
    lead: "공부가 이어지게 만듭니다",
    items: [
      { no: "01", title: "학습 계획", lines: ["개인별 주간 플랜", "담임 확인 후 실행"] },
      { no: "02", title: "과제 점검", lines: ["매일 과제 확인", "미이행 즉시 보완"] },
      { no: "03", title: "주간 테스트", lines: ["과목별 성취도 확인", "오답 재점검"] },
      { no: "04", title: "클리닉", lines: ["취약 단원 보충", "질의응답 상시"] },
      { no: "05", title: "학습 리포트", lines: ["주간 리포트 발송", "학부모 공유"] },
    ],
  },
  입시관리: {
    lead: "겨울의 준비를 입시까지 잇습니다",
    items: [
      { no: "01", title: "학교별 분석", lines: ["재학 예정 학교 진도", "출제 경향 반영"] },
      { no: "02", title: "내신 설계", lines: ["학기 시험 역산 계획", "과목 우선순위 조정"] },
      { no: "03", title: "수능 로드맵", lines: ["학년별 목표 설정", "모의고사 대비"] },
      { no: "04", title: "정기 컨설팅", lines: ["입시 상담 연계", "학부모 상담 병행"] },
    ],
  },
  멘탈관리: {
    lead: "흔들릴 때 잡아 줍니다",
    items: [
      { no: "01", title: "담임 면담", lines: ["주 1회 정기 면담", "학습·생활 함께 점검"] },
      { no: "02", title: "동기 관리", lines: ["목표 재설정", "성취 기록 공유"] },
      { no: "03", title: "학부모 소통", lines: ["변화 지점 공유", "가정 연계 지도"] },
    ],
  },
};

/** 8) 커리큘럼 */
/** 8) 학년별 주당 수업 시수
 *  pick: true 면 '선택' 과목(옅은 배경), 없으면 '권장필수'
 *  블록 하나가 표 한 개입니다. 시수만 바꾸려면 hours 값만 고치세요.
 */
export type HourCol = { name: string; hours: string; pick?: boolean };
export type HourGroup = { group: string; cols: HourCol[] };

export const gradeTabs = ["예비 고1", "예비 고2", "예비 고3"];

export const gradeHours: Record<string, { lead: string; blocks: HourGroup[][] }> = {
  "예비 고1": {
    lead: "학생의 현재 수준에서 가장 필요한 학습을 설계합니다.",
    blocks: [
      [
        {
          group: "국어",
          cols: [
            { name: "문학", hours: "2T" },
            { name: "언어(문법)", hours: "2T" },
            { name: "독서와 작문", hours: "2T", pick: true },
          ],
        },
        {
          group: "수학",
          cols: [
            { name: "공통수학1", hours: "4T" },
            { name: "공통수학2", hours: "4T" },
            { name: "공통수학1\n문제풀이", hours: "2T", pick: true },
            { name: "대수", hours: "4T", pick: true },
            { name: "미적분Ⅰ", hours: "4T", pick: true },
          ],
        },
        {
          group: "영어",
          cols: [
            { name: "구문 어법", hours: "2T" },
            { name: "고등 독해", hours: "2T" },
            { name: "실전\n모의고사", hours: "2T", pick: true },
          ],
        },
      ],
      [
        {
          group: "탐구",
          cols: [
            { name: "통합과학", hours: "3T" },
            { name: "통합사회", hours: "3T" },
            { name: "과학탐구", hours: "3T", pick: true },
            { name: "사회탐구", hours: "3T", pick: true },
          ],
        },
        { group: "한국사", cols: [{ name: "수능 · 내신", hours: "2T", pick: true }] },
        {
          group: "TEST",
          cols: [
            { name: "Daily First-20\n국수영", hours: "1T" },
            { name: "영단어 · 국어\n개념어 TEST", hours: "1T" },
            { name: "Weekly Final-50\n국수영", hours: "3T" },
          ],
        },
        { group: "입시", cols: [{ name: "1:1 윈터\n입시전략 컨설팅", hours: "1T" }] },
        { group: "케어", cols: [{ name: "1:1 대면\n수학책임담임", hours: "0.5T" }] },
      ],
    ],
  },

  "예비 고2": {
    lead: "학생의 현재 수준에서 가장 필요한 학습을 설계합니다.",
    blocks: [
      [
        {
          group: "국어",
          cols: [
            { name: "문학", hours: "2T" },
            { name: "독서와 작문", hours: "2T" },
            { name: "화법과\n언어(문법)", hours: "2T", pick: true },
            { name: "실전\n모의고사", hours: "2T", pick: true },
          ],
        },
        {
          group: "수학",
          cols: [
            { name: "대수", hours: "4T" },
            { name: "미적분Ⅰ", hours: "4T" },
            { name: "대수\n내신 문풀", hours: "2T", pick: true },
            { name: "확률과 통계", hours: "4T", pick: true },
            { name: "미적분Ⅱ", hours: "4T", pick: true },
            { name: "기하", hours: "4T", pick: true },
          ],
        },
        {
          group: "영어",
          cols: [
            { name: "구문 문법", hours: "2T" },
            { name: "고등 독해", hours: "2T" },
            { name: "실전\n모의고사", hours: "2T", pick: true },
          ],
        },
      ],
      [
        {
          group: "탐구",
          cols: [
            { name: "사회/과학\n선택1", hours: "3T" },
            { name: "사회/과학\n선택2", hours: "3T" },
            { name: "수능\n통합과학", hours: "3T", pick: true },
            { name: "수능\n통합사회", hours: "3T", pick: true },
          ],
        },
        { group: "한국사", cols: [{ name: "수능", hours: "2T", pick: true }] },
        {
          group: "TEST",
          cols: [
            { name: "Daily First-20\n국수영", hours: "1T" },
            { name: "영단어 · 국어\n개념어 TEST", hours: "1T" },
            { name: "Weekly Final-50\n국수영", hours: "3T" },
          ],
        },
        { group: "입시", cols: [{ name: "1:1 윈터\n입시전략 컨설팅", hours: "1T" }] },
        { group: "케어", cols: [{ name: "1:1 대면\n수학책임담임", hours: "0.5T" }] },
      ],
    ],
  },

  "예비 고3": {
    lead: "학생의 현재 수준에서 가장 필요한 학습을 설계합니다.",
    blocks: [
      [
        {
          group: "국어",
          cols: [
            { name: "문학", hours: "2T" },
            { name: "독서와 작문", hours: "2T" },
            { name: "화법과\n언어(문법)", hours: "2T", pick: true },
            { name: "실전\n모의고사", hours: "2T", pick: true },
          ],
        },
        {
          group: "수학",
          cols: [
            { name: "대수", hours: "4T" },
            { name: "미적분Ⅰ", hours: "4T" },
            { name: "확률과 통계", hours: "4T", pick: true },
            { name: "미적분Ⅱ", hours: "4T", pick: true },
            { name: "미니\n모의고사", hours: "2T", pick: true },
            { name: "풀\n모의고사", hours: "2T", pick: true },
          ],
        },
        {
          group: "영어",
          cols: [
            { name: "구문 문법", hours: "2T" },
            { name: "수능 독해", hours: "2T" },
            { name: "실전\n모의고사", hours: "2T", pick: true },
          ],
        },
      ],
      [
        {
          group: "탐구",
          cols: [
            { name: "수능\n통합과학", hours: "3T" },
            { name: "수능\n통합사회", hours: "3T" },
          ],
        },
        {
          group: "논술",
          cols: [
            { name: "인문논술", hours: "2T", pick: true },
            { name: "수리논술", hours: "2T", pick: true },
          ],
        },
        { group: "한국사", cols: [{ name: "수능", hours: "2T", pick: true }] },
        {
          group: "TEST",
          cols: [
            { name: "Daily First-20\n국수영", hours: "1T" },
            { name: "영단어 · 국어\n개념어 TEST", hours: "1T" },
            { name: "Weekly Final-50\n국수영", hours: "3T" },
          ],
        },
        { group: "입시", cols: [{ name: "1:1 윈터\n입시전략 컨설팅", hours: "1T" }] },
        { group: "케어", cols: [{ name: "1:1 대면\n수학책임담임", hours: "0.5T" }] },
      ],
    ],
  },
};

export const gradeHoursNotes = [
  "탐구 선택 : 물리학, 화학, 생명과학, 지구과학, 사회와 문화, 현대사회와 윤리 중 선택 가능 (미개설 과목은 인강학습관리 프로그램으로 대체)",
  "모든 강좌는 신청자가 5인 이상일 때 개강됩니다.",
];

/** 8-B) 과목별 커리큘럼 — 현재 화면에는 나오지 않습니다 (학년별 시수표로 대체) */
export const curriculumTabs = ["국어", "수학", "영어", "탐구"];
export const curriculum: Record<
  string,
  { en: string; flow: string[]; grades: { grade: string; items: string[] }[] }
> = {
  국어: {
    en: "KOREAN",
    flow: ["개념", "유형", "심화", "실전"],
    grades: [
      { grade: "예비 고1", items: ["문학 개념 정리", "독서 기초", "고1 내신 선행"] },
      { grade: "예비 고2", items: ["문학·독서 심화", "학교별 내신 선행", "고난도 유형"] },
      { grade: "예비 고3", items: ["수능 핵심 개념", "기출 분석", "실전 문제풀이"] },
    ],
  },
  수학: {
    en: "MATHEMATICS",
    flow: ["개념", "유형", "심화", "실전"],
    grades: [
      { grade: "예비 고1", items: ["중등 개념 완성", "고등수학 기초", "고1 내신 선행"] },
      { grade: "예비 고2", items: ["수학Ⅰ / 수학Ⅱ 핵심", "학교별 내신 선행", "고난도 유형"] },
      { grade: "예비 고3", items: ["수능 핵심 개념", "기출 분석", "실전 문제풀이"] },
    ],
  },
  영어: {
    en: "ENGLISH",
    flow: ["어휘", "구문", "독해", "실전"],
    grades: [
      { grade: "예비 고1", items: ["필수 어휘·구문", "독해 기초", "고1 내신 선행"] },
      { grade: "예비 고2", items: ["구문 심화", "학교별 내신 대비", "빈칸·순서 훈련"] },
      { grade: "예비 고3", items: ["수능 유형 훈련", "기출 분석", "시간 관리 실전"] },
    ],
  },
  탐구: {
    en: "SCIENCE / SOCIAL",
    flow: ["개념", "정리", "문제", "실전"],
    grades: [
      { grade: "예비 고1", items: ["통합과학·사회 기초", "학습 습관 형성", "개념 정리"] },
      { grade: "예비 고2", items: ["선택과목 개념", "학교별 내신 대비", "단원 문제풀이"] },
      { grade: "예비 고3", items: ["수능 개념 완성", "기출 분석", "실전 모의고사"] },
    ],
  },
};

/** 9) 하루 일과 */
/** 하루 시간표
 *  cs = 가로로 합칠 칸 수 (colspan) · rs = 세로로 합칠 칸 수 (rowspan)
 *  tone: "meal" 식사 줄 · "pick" 선택 참여
 *  ※ 시간이나 내용만 바꾸려면 아래 값만 고치면 됩니다.
 */
export type DayCell = { t: string; cs?: number; rs?: number; tone?: "meal" | "pick" };
export type DayRow = { label: string; time: string; cells: DayCell[] };

export const dayTable: { head: string[]; rows: DayRow[] } = {
  head: ["구분", "시간", "월", "화", "수", "목", "금", "토", "일"],
  rows: [
    {
      label: "등원",
      time: "~07:50",
      cells: [
        { t: "등원", cs: 6 },
        { t: "일요일 · 공휴일\n~08:40 선택등원", rs: 2, tone: "pick" },
      ],
    },
    {
      label: "0교시",
      time: "07:50–08:30",
      cells: [{ t: "담임 조회 · Daily First-30", cs: 5 }, { t: "조회" }],
    },
    {
      label: "1교시",
      time: "08:40–09:30",
      cells: [
        { t: "수업 및 자기주도학습", cs: 5, rs: 4 },
        { t: "Weekly Final-50", rs: 2 },
        { t: "[선택]\n자기주도학습", rs: 4, tone: "pick" },
      ],
    },
    { label: "2교시", time: "09:40–10:30", cells: [] },
    { label: "3교시", time: "10:40–11:30", cells: [{ t: "국·수·영 주간테스트" }] },
    { label: "4교시", time: "11:40–12:30", cells: [{ t: "자습" }] },
    { label: "점심", time: "12:30–13:30", cells: [{ t: "중식", cs: 7, tone: "meal" }] },
    {
      label: "5교시",
      time: "13:30–14:20",
      cells: [
        { t: "수업 및 자기주도학습", cs: 5, rs: 3 },
        { t: "종례 · 자기주도학습", rs: 5 },
        { t: "[선택]\n자기주도학습", rs: 5, tone: "pick" },
      ],
    },
    { label: "6교시", time: "14:30–15:20", cells: [] },
    { label: "7교시", time: "15:30–16:20", cells: [] },
    { label: "종례", time: "16:30–16:50", cells: [{ t: "담임 종례", cs: 5 }] },
    { label: "8교시", time: "17:00–17:50", cells: [{ t: "수업 및 자기주도학습", cs: 5 }] },
    { label: "저녁", time: "17:50–19:00", cells: [{ t: "석식", cs: 7, tone: "meal" }] },
    {
      label: "9교시",
      time: "19:00–20:20",
      cells: [
        { t: "수업 및 자기주도학습", cs: 5, rs: 2 },
        { t: "[선택]\n자기주도학습", rs: 2, tone: "pick" },
        { t: "[선택]\n자기주도학습", rs: 2, tone: "pick" },
      ],
    },
    { label: "10교시", time: "20:30–22:00", cells: [] },
  ],
};

/** 10) 장학 */
export const scholarship = [
  { value: "2027", unit: "", label: "윈터 장학 신설" },
  { value: "5", unit: "종", label: "성적·출결·추천 등" },
  { value: "100", unit: "%", label: "최대 수강료 지원" },
];

/** 11) 모집 안내 */
export const admission = [
  { k: "개강일", v: "2027.01.04(월)" },
  { k: "교육 기간", v: "2027.01.04(월) ~ 2027.02.19(금)" },
  { k: "모집 대상", v: "예비 고1(현 중3) · 예비 고2(현 고1) · 예비 고3(현 고2)" },
  { k: "상담 문의", v: "1644-0224" },
];
/** 모집요강 아래 주석 */
export const admissionNote =
  "※ 1월 4일(월) ~ 1월 8일(금)은 방학 일정을 고려하여 저녁 수업 중심으로 변경될 수 있습니다.";

export const process = [
  { no: "01", t: "상담 신청" },
  { no: "02", t: "입학 상담" },
  { no: "03", t: "진단 · 반 배정" },
  { no: "04", t: "등록" },
  { no: "05", t: "WINTER START" },
];

/** 12) FAQ */
export const faqs = [
  {
    q: "윈터스쿨 대상 학년은 어떻게 되나요?",
    a: "예비 고1·고2·고3(현 중3·고1·고2) 학생을 대상으로 모집하며, 학년별로 반이 분리되어 운영됩니다.",
  },
  {
    q: "수업은 어떤 방식으로 진행되나요?",
    a: "과목별 정규 수업 후 관리되는 자기주도학습이 이어집니다. 담임이 매일 출결과 과제를 점검하고 주간 평가로 성취도를 확인합니다.",
  },
  {
    q: "학교별 내신 대비가 가능한가요?",
    a: "재학 예정 학교의 진도와 출제 경향을 분석해 반영합니다. 상담 시 학교를 알려주시면 자세히 안내드립니다.",
  },
  {
    q: "자습 시간에도 관리가 되나요?",
    a: "1인 1지정석에서 진행되며 휴대폰 제출·졸음·소음 관리가 함께 이뤄집니다. 질의응답과 클리닉 시간도 별도 운영됩니다.",
  },
  {
    q: "식사는 제공되나요?",
    a: "점심·저녁 식사 시간이 일과에 포함되어 있습니다. 세부 운영 방식은 상담 시 안내드립니다.",
  },
  {
    q: "윈터스쿨 이후에도 계속 수강할 수 있나요?",
    a: "윈터스쿨 종료 후 학년별 단과 커리큘럼과 연계되며, 고등부 종합반으로 이어서 수강할 수 있습니다.",
  },
];
