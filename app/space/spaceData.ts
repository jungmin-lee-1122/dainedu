// ═══════════════════════════════════════════════════════════
//  시설 안내 페이지 데이터
//  영상 · 이미지는 public/space/ 폴더에서 같은 이름으로 교체하세요.
// ═══════════════════════════════════════════════════════════

/** 인사 영상 (다인 · 다온) */
export const intros = [
  { name: "다인", src: "/space/intro-dain.mp4" },
  { name: "다온", src: "/space/intro-daon.mp4" },
];

/** 한 층, 네 개의 관 */
export const halls = [
  { name: "재수종합관", desc: "정원을 제한한 정규 강의실과 담임 상담실" },
  { name: "독학재수관", desc: "1인 1지정석, 강의동과 분리된 정숙 자습 구역" },
  { name: "고등종합관", desc: "내신·수능 병행 수업을 위한 중형 강의실" },
  { name: "단과관", desc: "과목별 단과 수업 전용 강의실" },
];

/** 시설 구성 — 실제 촬영 사진, 표시 순서대로 facility-01~09를 사용합니다. */
export const facilityItems = [
  { en: "Reception", name: "안내데스크 & 라운지", img: "/space/facilities/facility-01.jpg" },
  { en: "Access Control", name: "보안 게이트 출입관리", img: "/space/facilities/facility-02.jpg" },
  { en: "Lecture Hall", name: "강의 집중형 강의실", img: "/space/facilities/facility-03.jpg" },
  { en: "Study Zone", name: "독립 자습 공간", img: "/space/facilities/facility-04.jpg" },
  { en: "Study Carrel", name: "1인 프리미엄 지정좌석", img: "/space/facilities/facility-05.jpg" },
  { en: "Personal Desk", name: "개인 책상 & 수납공간", img: "/space/facilities/facility-06.jpg" },
  { en: "Consulting Room", name: "1:1 컨설팅룸", img: "/space/facilities/facility-07.jpg" },
  { en: "Student Lounge", name: "휴게 공간 The Lounge", img: "/space/facilities/facility-08.jpg" },
  { en: "CCTV Monitoring", name: "전 구역 CCTV 관제", img: "/space/facilities/facility-09.jpg" },
];

/** 시설 차별점 */
export const facilityPoints = [
  {
    title: "몰입을 설계한 학습 공간",
    desc: "강의실과 자습 공간을 분리하고, 좌석 간 시선을 줄여 오롯이 학습에 집중하도록 설계했습니다.",
  },
  {
    title: "입실부터 퇴실까지 관리",
    desc: "출입 기록과 전 구역 CCTV 관제로 학생의 안전과 학습 시간을 빈틈없이 관리합니다.",
  },
  {
    title: "이동을 줄인 학습 동선",
    desc: "강의실·자습실·상담실·라운지를 한 층에 배치해 수업과 자습 사이의 이동 시간을 줄였습니다.",
  },
];

/** 공간 미리보기 (탭 + 이미지) */
export const renderings = [
  {
    tab: "전체 배치",
    title: "층 평면 배치도",
    desc: "180평 전체 배치입니다. 강의동과 자습동을 나눠 수업 소음이 자습 공간에 닿지 않도록 설계했습니다.",
    img: "/space/plan.jpg",
  },
  {
    tab: "조감",
    title: "캠퍼스 전경",
    desc: "강의동과 자습동이 한 층에서 어떻게 이어지는지 보여주는 조감입니다.",
    img: "/space/aerial.jpg",
  },
  {
    tab: "강의동",
    title: "강의관 · 자습관",
    desc: "정원을 제한한 정규 강의실과 그 옆에 배치된 대형 자습 구역입니다.",
    img: "/space/class.jpg",
  },
  {
    tab: "자습동",
    title: "독학재수관 전경",
    desc: "1인 1지정석이 열을 이루는 독학재수관 구역입니다.",
    img: "/space/study.jpg",
  },
  {
    tab: "공용",
    title: "상담 · 라운지 동선",
    desc: "상담실과 라운지, 사무 공간을 포함한 반대편 동선입니다.",
    img: "/space/lounge.jpg",
  },
];
