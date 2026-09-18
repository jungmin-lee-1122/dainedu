"use client";
// ═══════════════════════════════════════════════════════════
//  콘텐츠 관리 공통 화면
//  관리 페이지는 이 컴포넌트에 설정만 넘기면 목록·추가·수정·삭제·순서변경이
//  모두 동작합니다. (참고 소스 pc5a 의 ResourceManager 와 같은 역할)
// ═══════════════════════════════════════════════════════════
import { useCallback, useEffect, useState } from "react";
import type { Field, Item } from "./types";
import FieldInput from "./FieldInput";

type Props = {
  title: string;
  description: string;
  /** 예) "teachers" → /api/admin/teachers */
  resource: string;
  fields: Field[];
  defaults: Item;
  /** 목록 한 줄에 보여줄 요약 */
  summary: (item: Item) => React.ReactNode;
  /** 목록 왼쪽 썸네일로 쓸 항목 이름 */
  thumbKey?: string;
};

export default function ResourceManager({
  title,
  description,
  resource,
  fields,
  defaults,
  summary,
  thumbKey,
}: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [editing, setEditing] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const endpoint = `/api/admin/${resource}`;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(endpoint, { cache: "no-store" });
      const json = await res.json().catch(() => ({}));
      if (json?.ok) {
        setItems(json.items || []);
        setMsg("");
      } else if (json?.error === "no_db") {
        setMsg("데이터베이스가 아직 연결되지 않았습니다. 환경변수 DATABASE_URL 을 설정해 주세요.");
      } else {
        setMsg("목록을 불러오지 못했습니다.");
      }
    } catch {
      setMsg("목록을 불러오지 못했습니다.");
    }
    setLoading(false);
  }, [endpoint]);

  useEffect(() => {
    load();
  }, [load]);

  async function save() {
    if (!editing) return;
    setBusy(true);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    const json = await res.json().catch(() => ({}));
    setBusy(false);
    if (json?.ok) {
      setEditing(null);
      load();
    } else {
      setMsg(json?.message || "저장하지 못했습니다.");
    }
  }

  async function remove(id: string) {
    if (!confirm("이 항목을 삭제할까요? 되돌릴 수 없습니다.")) return;
    setBusy(true);
    await fetch(`${endpoint}?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    setBusy(false);
    load();
  }

  async function move(index: number, dir: -1 | 1) {
    const next = [...items];
    const to = index + dir;
    if (to < 0 || to >= next.length) return;
    [next[index], next[to]] = [next[to], next[index]];
    setItems(next);
    await fetch(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: next.map((i) => i.id) }),
    });
  }

  const subjectHint = String(editing?.subject ?? "");

  return (
    <div className="ad-res">
      <header className="ad-res-head">
        <div>
          <h1 className="ad-h1">{title}</h1>
          <p className="ad-desc">{description}</p>
        </div>
        {!editing && (
          <button className="ad-btn ad-btn-fill" onClick={() => setEditing({ ...defaults })}>
            + 새로 추가
          </button>
        )}
      </header>

      {msg && <p className="ad-notice">{msg}</p>}

      {/* ── 편집 폼 ── */}
      {editing && (
        <section className="ad-form">
          <div className="ad-form-head">
            <b>{editing.id ? "내용 수정" : "새 항목 추가"}</b>
            <button className="ad-btn ad-btn-ghost ad-btn-xs" onClick={() => setEditing(null)}>
              닫기
            </button>
          </div>

          <div className="ad-form-body">
            {fields.map((f) => (
              <FieldInput
                key={f.key}
                field={f}
                value={editing[f.key]}
                folder={resource}
                subjectHint={subjectHint}
                onChange={(v) => setEditing({ ...editing, [f.key]: v })}
              />
            ))}
          </div>

          <div className="ad-form-foot">
            <button className="ad-btn ad-btn-fill" onClick={save} disabled={busy}>
              {busy ? "저장 중…" : "저장하기"}
            </button>
            <button className="ad-btn ad-btn-line" onClick={() => setEditing(null)}>
              취소
            </button>
          </div>
        </section>
      )}

      {/* ── 목록 ── */}
      <section className="ad-list">
        {loading && <p className="ad-empty">불러오는 중…</p>}
        {!loading && items.length === 0 && (
          <p className="ad-empty">아직 등록된 항목이 없습니다. 오른쪽 위 &lsquo;새로 추가&rsquo;를 눌러 주세요.</p>
        )}

        {items.map((item, i) => (
          <article className="ad-row" key={String(item.id)}>
            {thumbKey && (
              <div className="ad-row-thumb">
                {item[thumbKey] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={String(item[thumbKey])} alt="" />
                ) : (
                  <span />
                )}
              </div>
            )}

            <div className="ad-row-main">{summary(item)}</div>

            <div className="ad-row-act">
              <button className="ad-btn ad-btn-ghost ad-btn-xs" onClick={() => move(i, -1)}
                disabled={i === 0} aria-label="위로">↑</button>
              <button className="ad-btn ad-btn-ghost ad-btn-xs" onClick={() => move(i, 1)}
                disabled={i === items.length - 1} aria-label="아래로">↓</button>
              <button className="ad-btn ad-btn-line ad-btn-xs" onClick={() => setEditing({ ...item })}>
                수정
              </button>
              <button className="ad-btn ad-btn-danger ad-btn-xs" onClick={() => remove(String(item.id))}>
                삭제
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
