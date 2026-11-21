// ═══════════════════════════════════════════════════════════
//  포르타 · 클라비스 "입시설명회" 칸에 보여 줄 2건 고르기
//
//  규칙
//   1) 관리자(이벤트·설명회)의 순서를 기본으로 합니다.
//   2) 윈터 FINAL 설명회(학년별 3회차)는 묶음 카드 한 줄로 두 번째에 끼웁니다.
//      회차 3건 자체는 숨깁니다(lib/hiddenEvents.ts).
//   3) "마감" 인 설명회는 뒤로 보냅니다 — 접수 중인 것이 항상 먼저 보입니다.
//   4) first 로 지정한 설명회는(마감이 아니면) 맨 앞에 둡니다. (클라비스 = 정시 설명회)
// ═══════════════════════════════════════════════════════════
import type { DainEvent } from "@/app/event/eventData";
import { isHiddenEvent } from "@/lib/hiddenEvents";
import { WINTER_FINAL_LECTURE } from "@/lib/winterFinalLecture";

export type Lecture = DainEvent | typeof WINTER_FINAL_LECTURE;

export function pickLectures(events: DainEvent[], opts: { first?: string; count?: number } = {}): Lecture[] {
  const visible = events.filter((e) => !isHiddenEvent(e.id));
  const base: Lecture[] = [visible[0], WINTER_FINAL_LECTURE, ...visible.slice(1)].filter(
    (l): l is Lecture => Boolean(l)
  );

  const open = base.filter((l) => l.status !== "마감");
  const closed = base.filter((l) => l.status === "마감");
  let list = [...open, ...closed];

  if (opts.first) {
    const f = open.find((l) => l.id === opts.first);
    if (f) list = [f, ...list.filter((l) => l !== f)];
  }
  return list.slice(0, opts.count ?? 2);
}
