"use client";
// ═══════════════════════════════════════════════════════════
//  입시자료 — 네이버 블로그 연동
//
//  글 작성·수정·삭제는 네이버 블로그에서 하시면 됩니다.
//  여기서는 "우리 홈페이지에만 안 보이게" 숨길 수 있습니다.
// ═══════════════════════════════════════════════════════════
import { useCallback, useEffect, useState } from "react";

type Item = {
  id: string;
  title: string;
  link: string;
  date: string;
  summary: string;
  image: string;
  category: string;
  hidden: boolean;
};

export default function BlogAdminPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [blogUrl, setBlogUrl] = useState("");
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState("");

  const load = useCallback(async () => {
    setState("loading");
    try {
      const r = await fetch("/api/admin/blog", { cache: "no-store" });
      const j = await r.json();
      if (!j.ok) throw new Error(j.message || "불러오지 못했습니다.");
      setItems(j.items ?? []);
      setBlogUrl(j.blogUrl ?? "");
      setState("ok");
      setMsg(j.items?.length ? "" : "블로그에서 글을 가져오지 못했습니다. 잠시 후 다시 시도해 주세요.");
    } catch (e) {
      setState("error");
      setMsg(e instanceof Error ? e.message : "오류가 발생했습니다.");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggle(it: Item) {
    setBusy(it.id);
    await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: it.id, title: it.title, hidden: !it.hidden }),
    }).catch(() => null);
    setItems((prev) => prev.map((p) => (p.id === it.id ? { ...p, hidden: !p.hidden } : p)));
    setBusy("");
  }

  async function refresh() {
    await fetch("/api/admin/blog", { method: "PATCH" }).catch(() => null);
    load();
  }

  const shown = items.filter((i) => !i.hidden);

  return (
    <div>
      <h1 className="ad-h1">입시자료 · 소식</h1>
      <p className="ad-desc">
        네이버 블로그에 글을 올리면 홈페이지 입시자료에 자동으로 나타납니다. 글쓰기·수정·삭제는 블로그에서
        하시고, 여기서는 <b>홈페이지에만 안 보이게</b> 숨길 수 있습니다. (네이버 원글은 그대로 남습니다)
      </p>

      <p className="ad-notice">
        입시자료 · 소식 페이지(<a href="/archive" target="_blank" rel="noopener noreferrer">/archive</a>)에
        숨기지 않은 글이 최신순으로 모두 표시됩니다. 현재 <b>{shown.length}개</b> 노출 중.
        {blogUrl && (
          <>
            {" "}
            <a href={blogUrl} target="_blank" rel="noopener noreferrer">
              블로그 열기 ↗
            </a>
          </>
        )}
      </p>

      <div className="bl-bar">
        <button className="ad-btn ad-btn-line" type="button" onClick={refresh}>
          블로그에서 다시 읽기
        </button>
        <span className="bl-bar-note">새 글이 바로 안 보이면 눌러 주세요.</span>
      </div>

      {state === "loading" && <p className="ad-empty">불러오는 중…</p>}
      {state === "error" && <p className="ad-err">{msg}</p>}
      {state === "ok" && msg && <p className="ad-empty">{msg}</p>}

      {state === "ok" && items.length > 0 && (
        <ul className="bl-list">
          {items.map((it, i) => {
            const onSite = !it.hidden;
            return (
              <li className={`bl-row${it.hidden ? " is-hidden" : ""}`} key={it.id}>
                <div className="bl-thumb">
                  {it.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.image} alt="" loading="lazy" decoding="async" />
                  ) : (
                    <span>글</span>
                  )}
                </div>

                <div className="bl-main">
                  <div className="bl-badges">
                    {onSite ? (
                      <b className="bl-on">홈페이지 노출</b>
                    ) : (
                      <b className="bl-off">숨김</b>
                    )}
                    {it.category && <span className="bl-cat">{it.category}</span>}
                    <span className="bl-date">{it.date}</span>
                  </div>
                  <a className="bl-title" href={it.link} target="_blank" rel="noopener noreferrer">
                    {it.title}
                  </a>
                  {it.summary && <p className="bl-sum">{it.summary}</p>}
                </div>

                <button
                  className={`ad-btn ad-btn-xs${it.hidden ? " ad-btn-fill" : ""}`}
                  type="button"
                  disabled={busy === it.id}
                  onClick={() => toggle(it)}
                >
                  {it.hidden ? "다시 보이기" : "숨기기"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
