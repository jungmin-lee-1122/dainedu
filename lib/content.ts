// ═══════════════════════════════════════════════════════════
//  관리자 입력 내용을 사이트 화면 형식으로 바꿔주는 곳
//
//  규칙: DB 에 내용이 있으면 그것을 쓰고, 없으면 기존 *Data.ts 를 그대로 씁니다.
//  → 관리자 페이지를 아직 안 쓰더라도 사이트는 지금과 똑같이 보입니다.
// ═══════════════════════════════════════════════════════════
import { listContents } from "./db";
import { subjects, teachers as seedTeachers, type Teacher } from "@/app/teachers/teachersData";
import { courses as seedCourses, scheduleTabs, type Course } from "@/app/schedule/scheduleData";
import { events as seedEvents, type DainEvent } from "@/app/event/eventData";

export { subjects, scheduleTabs };

/** 줄바꿈으로 나뉜 글을 배열로 */
function lines(v: unknown): string[] {
  return String(v ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function arr(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  return lines(v);
}

/* ───────────────── 강사진 ───────────────── */

export async function getTeachers(): Promise<Teacher[]> {
  const rows = await listContents("teachers").catch(() => []);
  if (rows.length === 0) return seedTeachers;

  return rows
    .filter((r) => !r.data.hidden)
    .map((r) => {
      const d = r.data;
      const revealed = Boolean(d.revealed);
      return {
        id: r.id,
        subject: String(d.subject ?? ""),
        tags: arr(d.tags),
        name: revealed ? String(d.name ?? "") : "Coming Soon",
        copy: String(d.copy ?? ""),
        school: String(d.school ?? "") || undefined,
        career: lines(d.career),
        openAt: String(d.openAt ?? ""),
        revealed,
        photo: revealed ? String(d.photo ?? "") || undefined : undefined,
        videoUrl: String(d.videoUrl ?? "") || undefined,
        introPoster: String(d.introPoster ?? "") || undefined,
      };
    });
}

/** 상세 페이지에서 숨김 강사까지 포함해 찾을 때 */
export async function findTeacher(id: string): Promise<Teacher | undefined> {
  const list = await getTeachers();
  return list.find((t) => t.id === id);
}

/* ───────────────── 단과 강좌 ───────────────── */
/** 강좌는 강사 아래에 입력되므로, 강사 목록을 펼쳐서 강좌 배열을 만듭니다. */

export async function getCourses(): Promise<Course[]> {
  const rows = await listContents("teachers").catch(() => []);
  if (rows.length === 0) return seedCourses;

  const out: Course[] = [];
  for (const r of rows) {
    const list = Array.isArray(r.data.courses) ? r.data.courses : [];
    for (const raw of list) {
      const c = raw as Record<string, unknown>;
      if (!c?.title) continue;
      out.push({
        id: String(c.id ?? `${r.id}-${out.length}`),
        teacherId: r.id,
        subject: String(c.subject ?? r.data.subject ?? ""),
        targets: arr(c.targets),
        tags: [String(c.subject ?? r.data.subject ?? "")].filter(Boolean),
        title: String(c.title ?? ""),
        startDate: String(c.startDate ?? "일정 공개 예정"),
        period: String(c.period ?? ""),
        time: String(c.time ?? ""),
        price: String(c.price ?? "추후 안내"),
        material: String(c.material ?? ""),
      });
    }
  }
  return out;
}

export async function findCourse(id: string): Promise<Course | undefined> {
  const list = await getCourses();
  return list.find((c) => c.id === id);
}

/* ───────────────── 이벤트 · 설명회 ───────────────── */

export async function getEvents(): Promise<DainEvent[]> {
  const rows = await listContents("events").catch(() => []);
  if (rows.length === 0) return seedEvents;

  return rows.map((r) => {
    const d = r.data;
    const status = String(d.status ?? "접수중");
    return {
      id: r.id,
      kind: (String(d.kind ?? "설명회") as DainEvent["kind"]),
      title: String(d.title ?? ""),
      lead: String(d.lead ?? ""),
      targets: arr(d.targets),
      date: String(d.date ?? ""),
      startAt: String(d.date ?? ""),
      place: String(d.place ?? ""),
      placeDetail: String(d.placeDetail ?? "") || undefined,
      capacity: String(d.capacity ?? ""),
      status: (status as DainEvent["status"]),
      body: lines(d.body),
      program: lines(d.program).map((line) => {
        const [time, ...rest] = line.split("|");
        return { time: time.trim(), desc: rest.join("|").trim() };
      }),
      notice: lines(d.notice),
      poster: String(d.poster ?? "") || undefined,
    };
  });
}

export async function findEventById(id: string): Promise<DainEvent | undefined> {
  const list = await getEvents();
  return list.find((e) => e.id === id);
}

/* ───────────────── 공지사항 ───────────────── */

export type Notice = { tag: string; title: string; date: string; href: string };

/** 공지사항 전체 (공지사항 페이지용) */
export type NoticeFull = {
  id: string;
  tag: string;
  title: string;
  date: string;
  hall: string;
  content: string[];
  image: string;
  /** 첨부 사진을 눌렀을 때 이동할 주소 (비우면 링크 없음) */
  imageHref: string;
  href: string;
  pinned: boolean;
};

function toNoticeFull(r: { id: string; data: Record<string, unknown> }): NoticeFull {
  return {
    id: r.id,
    tag: String(r.data.tag ?? "공지"),
    title: String(r.data.title ?? ""),
    date: String(r.data.date ?? ""),
    hall: String(r.data.hall ?? "둘 다"),
    content: lines(r.data.content),
    image: String(r.data.image ?? ""),
    imageHref: String(r.data.imageHref ?? ""),
    href: String(r.data.href ?? ""),
    pinned: Boolean(r.data.pinned),
  };
}

/** 고정 공지를 위로 올려 정렬 */
function sortNotices(list: NoticeFull[]) {
  return [...list].sort((a, b) => Number(b.pinned) - Number(a.pinned));
}

/** 공지사항 전체 목록 — /notices 페이지에서 씁니다. */
export async function getAllNotices(): Promise<NoticeFull[]> {
  const rows = await listContents("notices").catch(() => []);
  if (rows.length === 0) {
    // DB 가 비어 있으면 포르타 기본 공지를 보여줍니다.
    const { notices } = await import("@/app/porta/portaData");
    return sortNotices(
      notices.map((n, i) => ({
        id: `seed-${i + 1}`,
        tag: n.tag,
        title: n.title,
        date: n.date,
        hall: "둘 다",
        content: [],
        image: "",
        imageHref: "",
        href: n.href === "#" ? "" : n.href,
        pinned: false,
      }))
    );
  }
  return sortNotices(rows.map(toNoticeFull));
}

export async function findNotice(id: string): Promise<NoticeFull | undefined> {
  const list = await getAllNotices();
  return list.find((n) => n.id === id);
}

/** hall: "porta" | "clavis" — 해당 관에 표시할 공지만 */
export async function getNotices(hall: "porta" | "clavis", fallback: Notice[]): Promise<Notice[]> {
  const rows = await listContents("notices").catch(() => []);
  if (rows.length === 0) return fallback;

  const wanted = hall === "porta" ? "포르타 고등전문관" : "클라비스 N수전문관";

  return sortNotices(rows.map(toNoticeFull))
    .filter((n) => n.hall === "둘 다" || n.hall === wanted)
    .map((n) => ({
      tag: n.tag,
      title: n.title,
      date: n.date,
      // 외부 링크가 있으면 그쪽으로, 없으면 사이트 안 상세 페이지로
      href: n.href || `/notices/${n.id}`,
    }));
}

/* ───────────────── 사진 · 영상 ───────────────── */

export type Clip = { id: string; title: string };

/** 유튜브 주소나 ID 에서 영상 ID만 뽑아냅니다. */
export function youtubeId(input: string) {
  const s = String(input || "").trim();
  if (!s) return "";
  const m = s.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : s;
}

export async function getClips(fallback: Clip[]): Promise<Clip[]> {
  const rows = await listContents("media").catch(() => []);
  const clips = rows.filter(
    (r) => r.data.active !== false && String(r.data.kind ?? "") === "선생님 클립영상"
  );
  if (clips.length === 0) return fallback;

  return clips.map((r) => ({
    id: youtubeId(String(r.data.youtube ?? "")),
    title: String(r.data.title ?? "선생님 클립영상"),
  }));
}
