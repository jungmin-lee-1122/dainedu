"use client";
// ═══════════════════════════════════════════════════════════
//  관리자 좌측 메뉴
//  메뉴를 늘리려면 아래 MENU 배열에 한 줄만 추가하면 됩니다.
// ═══════════════════════════════════════════════════════════
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const MENU = [
  { href: "/admin", label: "대시보드", desc: "전체 현황" },
  { href: "/admin/teachers", label: "강사진 · 개설강좌", desc: "강사 등록 시 단과시간표에 자동 반영" },
  { href: "/admin/events", label: "이벤트 · 설명회", desc: "설명회 일정과 예약 안내" },
  { href: "/admin/notices", label: "공지사항", desc: "포르타 · 클라비스 공지" },
  { href: "/admin/media", label: "사진 · 영상", desc: "시설 사진, 유튜브 클립" },
];

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
