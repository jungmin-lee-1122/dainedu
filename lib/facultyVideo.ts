// ═══════════════════════════════════════════════════════════
//  강사 소개 영상 (AI 영상)
//
//  원본 131MB 를 웹용으로 줄여 public/faculty/ 에 넣어 두었습니다.
//  선생님 "이름" 으로 찾아 씁니다. 관리자에서 이름을 바꾸면
//  아래 표의 이름도 같이 고쳐 주세요.
//
//  영상을 교체할 때는 public/faculty/t01.mp4 처럼 같은 이름으로 덮어쓰면 됩니다.
// ═══════════════════════════════════════════════════════════

const VIDEO_BY_NAME: Record<string, string> = {
  최준호: "/faculty/t01.mp4",
  최나영: "/faculty/t02.mp4",
  김기수: "/faculty/t03.mp4",
  권지현: "/faculty/t04.mp4",
  최원용: "/faculty/t05.mp4",
  조아람: "/faculty/t06.mp4",
  정선혜: "/faculty/t07.mp4",
  김도윤: "/faculty/t08.mp4",
  이진주: "/faculty/t09.mp4",
  임종희: "/faculty/t10.mp4",
  김은혁: "/faculty/t11.mp4",
  최규백: "/faculty/t12.mp4",
  김민우: "/faculty/t13.mp4",
  김수진: "/faculty/t14.mp4",
};

/** 해당 선생님의 소개 영상 주소 — 없으면 빈 문자열 */
export function facultyVideo(name?: string): string {
  if (!name) return "";
  return VIDEO_BY_NAME[name.replace(/\s+/g, "")] ?? "";
}
