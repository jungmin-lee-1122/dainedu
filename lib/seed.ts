// ═══════════════════════════════════════════════════════════
//  "현재 사이트 내용 불러오기"
//
//  코드에 들어 있는 기본 내용(*Data.ts)을 관리자 DB 형식으로 바꿔줍니다.
//  관리자 화면에서 버튼을 한 번 누르면 이 내용이 DB 로 옮겨가고,
//  그때부터는 관리자 페이지에서 직접 고칠 수 있습니다.
// ═══════════════════════════════════════════════════════════
import { teachers as seedTeachers } from "@/app/teachers/teachersData";
import { courses as seedCourses } from "@/app/schedule/scheduleData";
import { events as seedEvents } from "@/app/event/eventData";
import { notices as portaNotices, clips as portaClips } from "@/app/porta/portaData";
import { notices as clavisNotices } from "@/app/clavis/clavisData";

export type SeedRow = { id: string; data: Record<string, unknown> };

/** 강사진 — 각 강사에게 딸린 강좌까지 함께 넣습니다. */
function teacherRows(): SeedRow[] {
  return seedTeachers.map((t) => ({
    id: t.id,
    data: {
      name: t.name,
      subject: t.subject,
      tags: t.tags ?? [],
      photo: t.photo ?? "",
      copy: t.copy ?? "",
      school: t.school ?? "",
      career: (t.career ?? []).join("\n"),
      openAt: t.openAt ?? "",
      videoUrl: t.videoUrl ?? "",
      introPoster: t.introPoster ?? "",
      courses: seedCourses
        .filter((c) => c.teacherId === t.id)
        .map((c) => ({
          id: c.id,
          title: c.title,
          subject: c.subject,
          targets: c.targets ?? [],
          startDate: c.startDate ?? "",
          period: c.period ?? "",
          time: c.time ?? "",
          price: c.price ?? "",
          material: c.material ?? "",
        })),
      revealed: Boolean(t.revealed),
      hidden: false,
    },
  }));
}

/** 이벤트 · 설명회 */
function eventRows(): SeedRow[] {
  return seedEvents.map((e) => ({
    id: e.id,
    data: {
      title: e.title,
      kind: e.kind,
      status: e.status,
      lead: e.lead ?? "",
      targets: e.targets ?? [],
      date: e.date ?? "",
      place: e.place ?? "",
      placeDetail: e.placeDetail ?? "",
      capacity: e.capacity ?? "",
      body: (e.body ?? []).join("\n"),
      program: (e.program ?? []).map((p) => `${p.time} | ${p.desc}`).join("\n"),
      notice: (e.notice ?? []).join("\n"),
      poster: "",
    },
  }));
}

/** 공지사항 — 포르타·클라비스 양쪽을 합치고, 같은 제목은 "둘 다"로 묶습니다. */
function noticeRows(): SeedRow[] {
  const rows: SeedRow[] = [];
  const clavisTitles = new Set(clavisNotices.map((n) => n.title));
  let i = 0;

  for (const n of portaNotices) {
    rows.push({
      id: `notice-p${++i}`,
      data: {
        title: n.title,
        tag: n.tag,
        hall: clavisTitles.has(n.title) ? "둘 다" : "포르타 고등전문관",
        date: n.date,
        content: "",
        image: "",
        href: n.href === "#" ? "" : n.href,
        pinned: false,
      },
    });
  }
  for (const n of clavisNotices) {
    if (portaNotices.some((p) => p.title === n.title)) continue; // 이미 "둘 다"로 들어감
    rows.push({
      id: `notice-c${++i}`,
      data: {
        title: n.title,
        tag: n.tag,
        hall: "클라비스 N수전문관",
        date: n.date,
        content: "",
        image: "",
        href: n.href === "#" ? "" : n.href,
        pinned: false,
      },
    });
  }
  return rows;
}

/** 사진 · 영상 — 지금은 선생님 클립영상만 있습니다. */
function mediaRows(): SeedRow[] {
  return portaClips.map((c, i) => ({
    id: `media-${i + 1}`,
    data: {
      kind: "선생님 클립영상",
      title: c.title,
      image: "",
      youtube: c.id,
      caption: "",
      active: true,
    },
  }));
}

/** 종류별로 불러올 내용 */
export function seedFor(resource: string): SeedRow[] {
  switch (resource) {
    case "teachers":
      return teacherRows();
    case "events":
      return eventRows();
    case "notices":
      return noticeRows();
    case "media":
      return mediaRows();
    default:
      return [];
  }
}
