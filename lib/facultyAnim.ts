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
//    faceTo / eyeTo  예외 보정      fadeR  오른쪽 가장자리 흐리기(양철훈)
//
//  【예외 보정】
//    · 바닥 우선 — 얼굴을 기준 크기로 줄이면 몸 아래가 바닥에서 뜨는 분은
//      눈을 조금 내려서 발이 바닥에 닿게 합니다.
//    · 팔짱 우선 — 허진우 선생님은 팔짱이 잘리지 않도록 얼굴을 조금 작게.
//
//  【값의 출처】
//    · 전원 제작사 실측값입니다. 2026-10-28 2차 전달에서 얼굴 크기를
//      김관우 선생님 기준(290)으로 통일했습니다.
//      양철훈 선생님만 예외로 원본 배율을 그대로 씁니다(2026-10-28 요청).
//
//  사진을 바꾸면 그분 값도 다시 재야 합니다. 얼굴이 유독 크거나 작아
//  보이면 face 값을 ±20 정도 조정해 보세요 (값을 키우면 작게 보입니다).
// ═══════════════════════════════════════════════════════════

export type Pose = {
  face: number;
  eye: number;
  cx: number;
  faceTo?: number;
  eyeTo?: number;
  fadeR?: boolean;
  /** true 면 반복하지 않고 1회 재생 후 마지막 장면에서 멈춥니다.
   *  (옛 영상은 시작 장면과 끝 장면이 달라 반복하면 툭 튑니다) */
  once?: boolean;
};

/** 강사별 얼굴 위치값 — 현재 17명 + 신규 2명 */
const POSE_BY_NAME: Record<string, Pose> = {
  /* ── 제작사 실측 (애니메이션 보유) ── */
  정재홍: { face: 274, eye: 378, cx: 537 },
  김관우: { face: 283, eye: 340, cx: 497 },
  송지승: { face: 312, eye: 338, cx: 542, eyeTo: 391 },
  이승훈: { face: 274, eye: 397, cx: 557, eyeTo: 358 },
  /* 얼굴 290 통일의 유일한 예외 — 원본 배율 그대로 둡니다.
     face-to = face, eye-to = eye 라 크기·높이가 원본과 같아집니다. */
  양철훈: { face: 419, eye: 445, cx: 518, faceTo: 419, eyeTo: 445, fadeR: true },
  허진우: { face: 253, eye: 332, cx: 526 },

  /* ── 2차 패키지 실측 (2026-10-28, 14명) ── */
  /* 10/28 신규 7명 — 5초 무이음 루프 */
  최나영: { face: 250, eye: 402, cx: 517 },
  조아람: { face: 273, eye: 401, cx: 524, eyeTo: 359 },
  서지연: { face: 294, eye: 326, cx: 514 },
  정선혜: { face: 286, eye: 358, cx: 551 },
  이진주: { face: 284, eye: 398, cx: 492, eyeTo: 384 },
  정희정: { face: 263, eye: 362, cx: 619 },
  권지현: { face: 303, eye: 387, cx: 538, eyeTo: 417 },

  /* 옛 랜딩 영상 재사용 7명 — 1회 재생 후 정지 (once: true) */
  김도윤: { face: 273, eye: 524, cx: 530, eyeTo: 490, once: true },  /* 2026-10-28 옛 영상으로 교체 */
  최규백: { face: 258, eye: 424, cx: 540, once: true },
  김민우: { face: 259, eye: 391, cx: 539, once: true },
  임종희: { face: 279, eye: 383, cx: 520, eyeTo: 356, once: true },
  김은혁: { face: 266, eye: 396, cx: 528, once: true },
  김수진: { face: 299, eye: 418, cx: 542, eyeTo: 438, once: true },
  김기수: { face: 271, eye: 386, cx: 551, once: true },
};

/** 배경이 투명한 애니메이션을 가진 강사 — 이름 → 폴더 */
const ANIM_DIR_BY_NAME: Record<string, string> = {
  정재홍: "jeongjaehong",
  김관우: "kimkwanwoo",
  송지승: "songjiseung",
  이승훈: "leeseunghoon",
  양철훈: "yangcheolhun",
  허진우: "heojinwoo",

  /* ── 2차 패키지 (14명) ── */
  최규백: "choegyubaek",
  최나영: "choenayeong",
  조아람: "joaram",
  서지연: "seojiyeon",
  김민우: "kimminwoo",
  임종희: "imjonghui",
  김은혁: "kimeunhyeok",
  김도윤: "kimdoyun",
  김기수: "kimgisu",
  김수진: "kimsujin",
  정선혜: "jeongseonhye",
  이진주: "leejinju",
  정희정: "jeonghuijeong",
  권지현: "kwonjihyun",
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
