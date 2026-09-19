"use client";
// ═══════════════════════════════════════════════════════════
//  입력 항목 한 칸 — 종류에 따라 알맞은 입력창을 그립니다.
// ═══════════════════════════════════════════════════════════
import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import type { Field, CourseValue } from "./types";
import { EMPTY_COURSE } from "./types";

const MAX_IMAGE_BYTES = 25 * 1024 * 1024;

/* ─────────── 사진 업로드 ─────────── */
function ImageField({
  value,
  onChange,
  folder,
}: {
  value: string;
  onChange: (v: string) => void;
  folder: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState("");

  async function pick(file: File) {
    if (file.size > MAX_IMAGE_BYTES) {
      setErr("사진은 25MB 이하로 올려 주세요.");
      return;
    }

    setBusy(true);
    setProgress(0);
    setErr("");
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const key = `${folder}/${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const blob = await upload(key, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        multipart: true,
        onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage)),
      });
      onChange(blob.url);
    } catch (e) {
      const detail = e instanceof Error ? e.message : "";
      if (/unauthorized|로그인이 만료/i.test(detail)) {
        setErr("로그인이 만료되었습니다. 관리자 페이지에 다시 로그인해 주세요.");
      } else if (/content.?type|image/i.test(detail)) {
        setErr("JPG, PNG, WEBP, GIF, AVIF 이미지만 올릴 수 있습니다.");
      } else {
        setErr(detail ? `업로드에 실패했습니다. ${detail}` : "업로드 중 오류가 발생했습니다.");
      }
    } finally {
      setBusy(false);
      setProgress(0);
    }
  }

  return (
    <div className="ad-image">
      <div className="ad-image-preview">
        {value ? (
          // 외부 Blob 주소라 next/image 대신 img 를 씁니다.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" />
        ) : (
          <span className="ad-image-empty">사진 없음</span>
        )}
      </div>

      <div className="ad-image-act">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) pick(f);
            e.target.value = "";
          }}
        />
        <button type="button" className="ad-btn ad-btn-line" disabled={busy}
          onClick={() => fileRef.current?.click()}>
          {busy ? `올리는 중 ${progress}%` : value ? "사진 바꾸기" : "사진 올리기"}
        </button>
        {value && (
          <button type="button" className="ad-btn ad-btn-ghost" onClick={() => onChange("")}>
            지우기
          </button>
        )}
      </div>

      <input
        className="ad-input ad-input-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="또는 이미지 주소를 직접 입력"
      />
      {err && <p className="ad-err">{err}</p>}
    </div>
  );
}

/* ─────────── 개설 강좌 ─────────── */
function CoursesField({
  value,
  onChange,
  subjectHint,
}: {
  value: CourseValue[];
  onChange: (v: CourseValue[]) => void;
  subjectHint: string;
}) {
  const list = Array.isArray(value) ? value : [];

  function update(i: number, patch: Partial<CourseValue>) {
    const next = [...list];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  }

  return (
    <div className="ad-courses">
      {list.length === 0 && <p className="ad-empty-sm">등록된 강좌가 없습니다.</p>}

      {list.map((c, i) => (
        <div className="ad-course" key={c.id || i}>
          <div className="ad-course-head">
            <b>강좌 {i + 1}</b>
            <button type="button" className="ad-btn ad-btn-ghost ad-btn-xs"
              onClick={() => onChange(list.filter((_, k) => k !== i))}>
              삭제
            </button>
          </div>

          <div className="ad-course-grid">
            <label className="ad-sub">
              <span>강좌명</span>
              <input className="ad-input" value={c.title}
                onChange={(e) => update(i, { title: e.target.value })}
                placeholder="예) 수능 수학 실전 완성" />
            </label>
            <label className="ad-sub">
              <span>과목</span>
              <input className="ad-input" value={c.subject}
                onChange={(e) => update(i, { subject: e.target.value })}
                placeholder={subjectHint || "예) 수학"} />
            </label>
            <label className="ad-sub ad-sub-wide">
              <span>모집대상</span>
              <input className="ad-input"
                value={(c.targets || []).join(", ")}
                onChange={(e) =>
                  update(i, {
                    targets: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
                placeholder="N수, 고3  (쉼표로 구분)" />
            </label>
            <label className="ad-sub">
              <span>개강일</span>
              <input className="ad-input" value={c.startDate}
                onChange={(e) => update(i, { startDate: e.target.value })}
                placeholder="2026.12.01" />
            </label>
            <label className="ad-sub">
              <span>기간</span>
              <input className="ad-input" value={c.period}
                onChange={(e) => update(i, { period: e.target.value })}
                placeholder="8주 과정" />
            </label>
            <label className="ad-sub">
              <span>시간</span>
              <input className="ad-input" value={c.time}
                onChange={(e) => update(i, { time: e.target.value })}
                placeholder="주 1회 · 3시간" />
            </label>
            <label className="ad-sub">
              <span>수강료</span>
              <input className="ad-input" value={c.price}
                onChange={(e) => update(i, { price: e.target.value })}
                placeholder="추후 안내" />
            </label>
            <label className="ad-sub ad-sub-wide">
              <span>교재</span>
              <input className="ad-input" value={c.material}
                onChange={(e) => update(i, { material: e.target.value })}
                placeholder="자체 교재" />
            </label>
          </div>
        </div>
      ))}

      <button type="button" className="ad-btn ad-btn-line"
        onClick={() =>
          onChange([
            ...list,
            { ...EMPTY_COURSE, id: `c-${Date.now().toString(36)}`, subject: subjectHint },
          ])
        }>
        + 강좌 추가
      </button>
    </div>
  );
}

/* ─────────── 본체 ─────────── */
export default function FieldInput({
  field,
  value,
  onChange,
  folder,
  subjectHint,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
  folder: string;
  subjectHint?: string;
}) {
  if (field.type === "checkbox") {
    return (
      <label className="ad-check">
        <input type="checkbox" checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)} />
        <span>{field.label}</span>
        {field.help && <em className="ad-help">{field.help}</em>}
      </label>
    );
  }

  return (
    <div className="ad-field">
      <label className="ad-label" htmlFor={`f-${field.key}`}>
        {field.label}
        {field.maxLength && <i>최대 {field.maxLength}자</i>}
      </label>

      {field.type === "text" && (
        <input id={`f-${field.key}`} className="ad-input"
          value={String(value ?? "")} maxLength={field.maxLength}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder} />
      )}

      {field.type === "textarea" && (
        <textarea id={`f-${field.key}`} className="ad-input ad-textarea" rows={5}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder} />
      )}

      {field.type === "select" && (
        <select id={`f-${field.key}`} className="ad-input"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}>
          <option value="">선택해 주세요</option>
          {(field.options || []).map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      )}

      {field.type === "tags" && (
        <input id={`f-${field.key}`} className="ad-input"
          value={Array.isArray(value) ? value.join(", ") : String(value ?? "")}
          onChange={(e) =>
            onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))
          }
          placeholder={field.placeholder} />
      )}

      {field.type === "image" && (
        <ImageField value={String(value ?? "")} onChange={(v) => onChange(v)} folder={folder} />
      )}

      {field.type === "courses" && (
        <CoursesField
          value={(Array.isArray(value) ? value : []) as CourseValue[]}
          onChange={(v) => onChange(v)}
          subjectHint={subjectHint || ""}
        />
      )}

      {field.help && <p className="ad-help">{field.help}</p>}
    </div>
  );
}
