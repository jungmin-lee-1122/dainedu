"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (!res.ok) {
      setError("비밀번호가 올바르지 않습니다.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="ad-login">
      <form className="ad-login-card" onSubmit={submit}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/dain-icon.png" alt="" className="ad-login-icon" />
        <h1 className="ad-login-title">다인교육 동탄점</h1>
        <p className="ad-login-sub">관리자 페이지</p>

        <label className="ad-label" htmlFor="pw">비밀번호</label>
        <input
          id="pw"
          type="password"
          className="ad-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          autoFocus
          autoComplete="current-password"
        />

        {error && <p className="ad-err">{error}</p>}

        <button type="submit" className="ad-btn ad-btn-fill ad-btn-full" disabled={busy}>
          {busy ? "확인 중…" : "로그인"}
        </button>

        <Link className="ad-login-back" href="/">← 사이트로 돌아가기</Link>
      </form>
    </div>
  );
}
