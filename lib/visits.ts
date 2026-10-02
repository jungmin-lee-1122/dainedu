// ═══════════════════════════════════════════════════════════
//  방문 기록 (언제 · 어느 도시에서 · 어떤 페이지를 봤는지)
//
//  Vercel 이 요청 헤더에 넣어주는 지역 정보만 사용합니다.
//  IP 주소나 개인을 특정할 수 있는 정보는 저장하지 않습니다.
//
//  DATABASE_URL 이 없으면 아무 일도 하지 않습니다. (안전 장치)
// ═══════════════════════════════════════════════════════════
import { neon } from "@neondatabase/serverless";

export type Visit = {
  id: number;
  path: string;
  city: string;
  region: string;
  country: string;
  device: "모바일" | "PC";
  referrer: string;
  createdAt: string;
};

export function hasDb() {
  return Boolean(process.env.DATABASE_URL);
}

let client: ReturnType<typeof neon> | null = null;
function sql() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL 없음");
  if (!client) client = neon(process.env.DATABASE_URL);
  return client;
}

let ready: Promise<void> | null = null;
function ensureTable() {
  if (!ready) {
    ready = (async () => {
      const q = sql();
      await q`
        CREATE TABLE IF NOT EXISTS visits (
          id          BIGSERIAL PRIMARY KEY,
          path        TEXT NOT NULL DEFAULT '',
          city        TEXT NOT NULL DEFAULT '',
          region      TEXT NOT NULL DEFAULT '',
          country     TEXT NOT NULL DEFAULT '',
          device      TEXT NOT NULL DEFAULT '',
          referrer    TEXT NOT NULL DEFAULT '',
          created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await q`CREATE INDEX IF NOT EXISTS visits_created ON visits (created_at DESC)`;
    })().catch((e) => {
      ready = null;
      throw e;
    });
  }
  return ready;
}

/** 방문 한 건을 남깁니다. */
export async function logVisit(v: {
  path: string;
  city: string;
  region: string;
  country: string;
  device: string;
  referrer: string;
}) {
  if (!hasDb()) return;
  await ensureTable();
  await sql()`
    INSERT INTO visits (path, city, region, country, device, referrer)
    VALUES (${v.path}, ${v.city}, ${v.region}, ${v.country}, ${v.device}, ${v.referrer})
  `;
}

function toVisit(r: Record<string, unknown>): Visit {
  return {
    id: Number(r.id),
    path: String(r.path ?? ""),
    city: String(r.city ?? ""),
    region: String(r.region ?? ""),
    country: String(r.country ?? ""),
    device: String(r.device ?? "") === "모바일" ? "모바일" : "PC",
    referrer: String(r.referrer ?? ""),
    createdAt: String(r.created_at ?? ""),
  };
}

/** 최근 방문 목록 */
export async function listVisits(limit = 200): Promise<Visit[]> {
  if (!hasDb()) return [];
  await ensureTable();
  const rows = (await sql()`
    SELECT * FROM visits ORDER BY created_at DESC LIMIT ${limit}
  `) as Record<string, unknown>[];
  return rows.map(toVisit);
}

export type VisitSummary = {
  today: number;
  week: number;
  total: number;
  topCities: { name: string; region: string; count: number }[];
  topPaths: { name: string; count: number }[];
};

/** 요약 숫자 */
export async function visitSummary(): Promise<VisitSummary> {
  const empty: VisitSummary = { today: 0, week: 0, total: 0, topCities: [], topPaths: [] };
  if (!hasDb()) return empty;
  await ensureTable();
  const q = sql();

  const [counts, cities, paths] = await Promise.all([
    q`
      SELECT
        COUNT(*) FILTER (WHERE created_at >= date_trunc('day',  now() AT TIME ZONE 'Asia/Seoul')) AS today,
        COUNT(*) FILTER (WHERE created_at >= now() - interval '7 days')                           AS week,
        COUNT(*)                                                                                 AS total
      FROM visits
    ` as Promise<Record<string, unknown>[]>,
    q`
      SELECT COALESCE(NULLIF(city, ''), NULLIF(country, ''), '(알 수 없음)') AS name,
             COALESCE(NULLIF(region, ''), '') AS region,
             COUNT(*) AS count
      FROM visits GROUP BY 1, 2 ORDER BY count DESC LIMIT 10
    ` as Promise<Record<string, unknown>[]>,
    q`
      SELECT path AS name, COUNT(*) AS count
      FROM visits GROUP BY 1 ORDER BY count DESC LIMIT 10
    ` as Promise<Record<string, unknown>[]>,
  ]);

  const c = counts[0] ?? {};
  return {
    today: Number(c.today ?? 0),
    week: Number(c.week ?? 0),
    total: Number(c.total ?? 0),
    topCities: cities.map((r) => ({
      name: String(r.name),
      region: String(r.region ?? ""),
      count: Number(r.count),
    })),
    topPaths: paths.map((r) => ({ name: String(r.name), count: Number(r.count) })),
  };
}
