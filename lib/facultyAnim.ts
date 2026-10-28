// ═══════════════════════════════════════════════════════════
//  강사 인물 — 얼굴 크기·눈높이 맞추기 + 투명 배경 애니메이션
//
//  【왜 필요한가】
//  사진마다 얼굴이 크게/작게, 높게/낮게 찍혀 있습니다. 그대로 늘어놓으면
//  얼굴 크기가 제각각이라 줄이 안 맞습니다. 아래 값으로 "눈높이"를 기준
//  삼아 모두 같은 크기·같은 높이로 맞춥니다.
//
//  【값의 뜻】 모두 1080x1080 원본 기준 픽셀
//    face  얼굴 높이      eye  두 눈 높이      cx  얼굴 가로 중심
//    faceTo / eyeTo  예외 보정 (아래 참고)
//    fadeR  오른쪽 가장자리 흐리기 (양철훈 전용)
//
//  【예외 보정】
//    · 바닥 우선 — 얼굴을 기준 크기로 줄이면 몸 아래가 바닥에서 뜨는 분은
//      눈을 조금 내려서 발이 바닥에 닿게 합니다.
//    · 팔짱 우선 — 허진우 선생님은 팔짱이 잘리지 않도록 얼굴을 조금 작게.
//
//  【값의 출처】
//    · 정재홍·김관우·송지승·이승훈·양철훈·허진우 → 제작사가 직접 잰 값
//    · 나머지 11명 → 프로필 사진(투명 PNG)을 분석해 같은 기준으로 환산한 값
//      (제작사 정답값 4명으로 검증: 눈높이 오차 0~15px, 얼굴 크기 ±6%)
//
//  사진을 바꾸면 그 분의 값도 다시 재야 합니다. 얼굴이 유독 크거나 작아
//  보이면 face 값을 ±20 정도 조정해 보세요 (값을 키우면 작게 보입니다).
// ═══════════════════════════════════════════════════════════

export type Pose = {
  face: number;
  eye: number;
  cx: number;
  faceTo?: number;
  eyeTo?: number;
  fadeR?: boolean;
};

/** 강사별 얼굴 위치값 — 17명 + 신규 2명 */
const POSE_BY_NAME: Record<string, Pose> = {
  /* ── 제작사 실측 (애니메이션 보유) ── */
  정재홍: { face: 274, eye: 378, cx: 537 },
  김관우: { face: 283, eye: 340, cx: 497 },
  송지승: { face: 312, eye: 338, cx: 542, eyeTo: 391 },
  이승훈: { face: 274, eye: 397, cx: 557, eyeTo: 358 },
  양철훈: { face: 419, eye: 445, cx: 518, faceTo: 333, eyeTo: 576, fadeR: true },
  허진우: { face: 253, eye: 332, cx: 526, faceTo: 246 },

  /* ── 사진 분석값 ── */
  최규백: { face: 240, eye: 360, cx: 550 },
  최나영: { face: 281, eye: 371, cx: 567 },
  조아람: { face: 280, eye: 375, cx: 564 },
  김민우: { face: 279, eye: 377, cx: 561 },
  임종희: { face: 285, eye: 361, cx: 558 },
  김은혁: { face: 295, eye: 336, cx: 575 },
  김도윤: { face: 227, eye: 298, cx: 506 },
  김기수: { face: 256, eye: 362, cx: 515 },
  김수진: { face: 267, eye: 330, cx: 582 },
  정희정: { face: 284, eye: 354, cx: 677 },
  정선혜: { face: 296, eye: 335, cx: 582 },
  이진주: { face: 277, eye: 381, cx: 482 },
  권지현: { face: 285, eye: 361, cx: 554 },
};

/** 배경이 투명한 애니메이션을 가진 강사 — 이름 → 폴더 */
const ANIM_DIR_BY_NAME: Record<string, string> = {
  정재홍: "jeongjaehong",
  김관우: "kimkwanwoo",
  송지승: "songjiseung",
  이승훈: "leeseunghoon",
  양철훈: "yangcheolhun",
  허진우: "heojinwoo",
};

function key(name?: string) {
  return name ? name.replace(/\s+/g, "") : "";
}

/** 얼굴 위치값 — 없으면 null (보정 없이 그대로 보여집니다) */
export function facultyPose(name?: string): Pose | null {
  return POSE_BY_NAME[key(name)] ?? null;
}

/** 애니메이션 폴더 — 없으면 null */
export function facultyAnimDir(name?: string): string | null {
  return ANIM_DIR_BY_NAME[key(name)] ?? null;
}

/** 애니메이션 파일 주소 */
export function animPath(dir: string, file: string) {
  return `/faculty/anim/${dir}/${file}`;
}

/** style 속성에 넣을 CSS 변수 */
export function poseVars(p: Pose): Record<string, string> {
  const v: Record<string, string> = {
    "--face": String(p.face),
    "--eye": String(p.eye),
    "--cx": String(p.cx),
  };
  if (p.faceTo) v["--face-to"] = String(p.faceTo);
  if (p.eyeTo) v["--eye-to"] = String(p.eyeTo);
  return v;
}
