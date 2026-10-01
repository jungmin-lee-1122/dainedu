"use client";
// ═══════════════════════════════════════════════════════════
//  관리자 좌측 메뉴
//  메뉴를 늘리려면 아래 MENU 배열에 한 줄만 추가하면 됩니다.
// ═══════════════════════════════════════════════════════════
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { MENU } from "./menu";


export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      <button className="ad-mbtn" type="button" onClick={() => setOpen((v) => !v)}
        aria-label="관리 메뉴 열기">
        <span /><span /><span />
      </button>

      <aside className={`ad-side${open ? " is-open" : ""}`}>
        <Link className="ad-side-brand" href="/admin">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/dain-icon.png" alt="" className="ad-side-icon" />
          <span>
            <b>DAIN EDU</b>
            <em>관리자</em>
          </span>
        </Link>

        <nav className="ad-side-nav">
          {MENU.map((m) => {
            const on = m.href === "/admin" ? pathname === "/admin" : pathname.startsWith(m.href);
            return (
              <Link key={m.href} href={m.href} className={`ad-side-item${on ? " is-on" : ""}`}
                onClick={() => setOpen(false)}>
                <b>{m.label}</b>
                <em>{m.desc}</em>
              </Link>
            );
          })}
        </nav>

        <div className="ad-side-foot">
          <a className="ad-side-link" href="/" target="_blank" rel="noopener noreferrer">
            사이트 보기 ↗
          </a>
          <button className="ad-side-link ad-side-out" type="button" onClick={logout}>
            로그아웃
          </button>
        </div>
      </aside>

      {open && <div className="ad-side-dim" onClick={() => setOpen(false)} />}
    </>
  );
}
