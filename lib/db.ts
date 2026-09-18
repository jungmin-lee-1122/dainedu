// ═══════════════════════════════════════════════════════════
//  데이터베이스 (Neon Postgres — Vercel 마켓플레이스)
//
//  모든 관리자 콘텐츠를 contents 테이블 한 곳에 저장합니다.
//  resource 로 종류를 구분하고, 실제 내용은 data(JSON) 에 담습니다.
//  → 관리 항목이 늘어나도 테이블을 새로 만들 필요가 없습니다.
//
//  환경변수 DATABASE_URL 이 없으면 DB 를 쓰지 않고,
//  기존 *Data.ts 파일의 내용이 그대로 보입니다. (안전 장치)
// ═══════════════════════════════════════════════════════════
import { neon } from "@neondatabase/serverless";

export type ContentRow = {
  id: string;
  resource: string;
  sort: number;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

/** DB 연결이 설정되어 있는지 */
export function hasDb() {
  return Boolean(process.env.DATABASE_URL);
}

let sqlClient: ReturnType<typeof neon> | null = null;

function sql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL 이 설정되지 않았습니다.");
  }
  if (!sqlClient) sqlClient = neon(process.env.DATABASE_URL);
  return sqlClient;
}

let ready: Promise<void> | null = null;

/** 테이블이 없으면 만듭니다. 최초 1회만 실행됩니다. */
function ensureTable() {
  if (!ready) {
    ready = (async () => {
      const q = sql();
      await q`
        CREATE TABLE IF NOT EXISTS contents (
          id          TEXT PRIMARY KEY,
          resource    TEXT NOT NULL,
          sort        INTEGER NOT NULL DEFAULT 0,
          data        JSONB NOT NULL DEFAULT '{}'::jsonb,
          created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await q`CREATE INDEX IF NOT EXISTS contents_resource_sort ON contents (resource, sort)`;
    })().catch((e) => {
      ready = null;
      throw e;
    });
  }
  return ready;
}

function toRow(r: Record<string, unknown>): ContentRow {
  return {
    id: String(r.id),
    resource: String(r.resource),
    sort: Number(r.sort ?? 0),
    data: (r.data ?? {}) as Record<string, unknown>,
    createdAt: String(r.created_at ?? ""),
    updatedAt: String(r.updated_at ?? ""),
  };
}

/** 한 종류의 콘텐츠를 순서대로 모두 가져옵니다. */
export async function listContents(resource: string): Promise<ContentRow[]> {
  if (!hasDb()) return [];
  await ensureTable();
  const rows = (await sql()`
    SELECT * FROM contents WHERE resource = ${resource}
    ORDER BY sort ASC, created_at ASC
  `) as Record<string, unknown>[];
  return rows.map(toRow);
}

/** 하나만 가져옵니다. */
export async function getContent(resource: string, id: string): Promise<ContentRow | null> {
  if (!hasDb()) return null;
  await ensureTable();
  const rows = (await sql()`
    SELECT * FROM contents WHERE resource = ${resource} AND id = ${id} LIMIT 1
  `) as Record<string, unknown>[];
  return rows[0] ? toRow(rows[0]) : null;
}

/** 새로 만들거나, 같은 id 가 있으면 덮어씁니다. */
export async function saveContent(
  resource: string,
  id: string,
  data: Record<string, unknown>,
  sort: number
): Promise<ContentRow> {
  await ensureTable();
  const rows = (await sql()`
    INSERT INTO contents (id, resource, sort, data)
    VALUES (${id}, ${resource}, ${sort}, ${JSON.stringify(data)}::jsonb)
    ON CONFLICT (id) DO UPDATE
      SET data = EXCLUDED.data,
          sort = EXCLUDED.sort,
          updated_at = now()
    RETURNING *
  `) as Record<string, unknown>[];
  return toRow(rows[0]);
}

/** 삭제 */
export async function deleteContent(resource: string, id: string) {
  await ensureTable();
  await sql()`DELETE FROM contents WHERE resource = ${resource} AND id = ${id}`;
}

/** 순서 일괄 저장 (위/아래 이동용) */
export async function reorderContents(resource: string, ids: string[]) {
  await ensureTable();
  const q = sql();
  for (let i = 0; i < ids.length; i++) {
    await q`UPDATE contents SET sort = ${i}, updated_at = now()
            WHERE resource = ${resource} AND id = ${ids[i]}`;
  }
}

/** 새 id 만들기 — 예) teacher-1758... */
export function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
