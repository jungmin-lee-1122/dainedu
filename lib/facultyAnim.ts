// ═══════════════════════════════════════════════════════════
//  강사 애니메이션 (배경이 투명한 5초 루프 영상)
//
//  · 파일은 public/faculty/anim/<영문폴더>/ 에 4개씩 들어 있습니다.
//      anim.mov    사파리·아이폰용 (투명)
//      anim.webm   크롬·엣지·파이어폭스용 (투명)
//      poster.webp 첫 장면 (가벼움, 목록·poster 속성용)
//      poster.png  첫 장면 (움직임 줄이기 설정일 때 대신 보여줌)
//
//  · face / eye / cx 는 "얼굴 크기와 눈높이를 6명 모두 똑같이 맞추기"
//    위한 값입니다. 제작사에서 1080x1080 원본을 직접 재서 준 수치라
//    임의로 바꾸면 사람마다 얼굴 크기가 들쭉날쭉해집니다.
//  · faceTo / eyeTo 는 예외 보정값입니다.
//      - 바닥 우선: 몸 아래 끝이 바닥에 닿도록 눈을 내림 (송지승·이승훈·양철훈)
//      - 팔짱 우선: 팔짱이 잘리지 않도록 얼굴을 조금 작게 (허진우)
//  · fadeR 은 양철훈 전용 — 원본에서 세로로 잘린 오른쪽 어깨선을
//    오른쪽 7%만 투명하게 흐려 줍니다.
//
//  새 강사가 추가되면 아래 표에 한 줄만 더하면 됩니다.
//  (관리자에서 이름을 바꾸면 이 표의 이름도 같이 고쳐 주세요)
// ═══════════════════════════════════════════════════════════

export type FacultyAnim = {
  /** public/faculty/anim/ 아래 폴더 이름 */
  dir: string;
  /** 1080 원본 기준 얼굴 높이 */
  face: number;
  /** 1080 원본 기준 두 눈 평균 높이 */
  eye: number;
  /** 1080 원본 기준 얼굴 가로 중심 */
  cx: number;
  /** 목표 얼굴 높이 (기본 290) — 예외인 강사만 */
  faceTo?: number;
  /** 목표 눈높이 (기본 353) — 예외인 강사만 */
  eyeTo?: number;
  /** 오른쪽 가장자리 흐리기 (양철훈만) */
  fadeR?: boolean;
};

const ANIM_BY_NAME: Record<string, FacultyAnim> = {
  정재홍: { dir: "jeongjaehong", face: 274, eye: 378, cx: 537 },
  김관우: { dir: "kimkwanwoo", face: 283, eye: 340, cx: 497 },
  송지승: { dir: "songjiseung", face: 312, eye: 338, cx: 542, eyeTo: 391 },
  이승훈: { dir: "leeseunghoon", face: 274, eye: 397, cx: 557, eyeTo: 358 },
  양철훈: { dir: "yangcheolhun", face: 419, eye: 445, cx: 518, faceTo: 333, eyeTo: 576, fadeR: true },
  허진우: { dir: "heojinwoo", face: 253, eye: 332, cx: 526, faceTo: 246 },
};

/** 해당 선생님의 애니메이션 정보 — 없으면 null */
export function facultyAnim(name?: string): FacultyAnim | null {
  if (!name) return null;
  return ANIM_BY_NAME[name.replace(/\s+/g, "")] ?? null;
}

/** 애니메이션 파일들이 들어 있는 폴더 주소 */
export function animPath(a: FacultyAnim, file: string) {
  return `/faculty/anim/${a.dir}/${file}`;
}

/** style 속성에 넣을 CSS 변수 문자열 */
export function animVars(a: FacultyAnim): Record<string, string> {
  const v: Record<string, string> = {
    "--face": String(a.face),
    "--eye": String(a.eye),
    "--cx": String(a.cx),
  };
  if (a.faceTo) v["--face-to"] = String(a.faceTo);
  if (a.eyeTo) v["--eye-to"] = String(a.eyeTo);
  return v;
}
