// ═══════════════════════════════════════════════════════════
//  /winter-faculty-lab  —  "학원가가 증명한 강사진" Vortex 실험실
//
//  ※ 테스트 전용 페이지입니다.
//    · 본 윈터 상세페이지(/winter)와 globals.css 는 건드리지 않습니다.
//    · 스타일은 vortexStyles.ts, 동작은 vortexScript.ts 안에만 있습니다.
//    · 검색에 잡히지 않도록 noindex 를 걸어 두었습니다.
//    · 마음에 안 들면 이 폴더(app/winter-faculty-lab)만 지우면 끝입니다.
//
//  구조는 원본 vortex-gallery 와 같습니다 —
//  반지름 6 원통 벽에 사진이 붙고, 카메라가 그 안에서 맞은편을 봅니다.
// ═══════════════════════════════════════════════════════════
import Script from "next/script";
import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import { getTeachers } from "@/lib/content";
import { shortSchool } from "@/lib/schoolLabel";
import { photo, photoSet } from "@/lib/img";
import { vortexStyles } from "./vortexStyles";
import { vortexScript } from "./vortexScript";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "강사진 Vortex 테스트 — 다인에듀 동탄점",
  robots: { index: false, follow: false },
};

/** 원통 한 층에 몇 장 / 몇 층 — 원본(15장 × 여러 층)과 같은 간격입니다 */
const PER_RING = 15;
const LEVELS = 5;
const TOTAL = PER_RING * LEVELS;

export default async function WinterFacultyLabPage() {
  const all = await getTeachers();
  const withPhoto = all.filter((t) => t.revealed && t.photo);
  const list = withPhoto.length >= 4 ? withPhoto : all;

  if (list.length === 0) {
    return (
      <main className="dn-body vxl">
        <SiteHeader />
        <div className="vxl-head">
          <h2 className="vxl-h2">등록된 강사가 없습니다</h2>
        </div>
        <p className="vxl-foot">관리자 → 강사진에서 선생님을 먼저 등록해 주세요.</p>
        <SiteFooter />
      </main>
    );
  }

  /* 원통 벽에 붙일 순서 — 무작위로 섞습니다.
     규칙적으로 건너뛰면 같은 선생님이 세로로 줄을 서 버립니다.
     한 바퀴(= 선생님 전원)를 섞어서 쓰고, 다 쓰면 다시 섞습니다.
     그래야 한 분만 자주 나오는 일 없이 고르게 퍼집니다. */
  const wall: typeof list = [];
  while (wall.length < TOTAL) {
    const bag = [...list];
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
    wall.push(...bag);
  }
  wall.length = TOTAL;

  /* 같은 층에서 바로 옆자리(= LEVELS 칸 차이)에 같은 분이 붙으면 한 칸 미룹니다 */
  for (let d = LEVELS; d < TOTAL; d++) {
    if (wall[d].id !== wall[d - LEVELS].id) continue;
    const swap = wall.findIndex(
      (t, k) => k > d && t.id !== wall[d - LEVELS].id,
    );
    if (swap > -1) [wall[d], wall[swap]] = [wall[swap], wall[d]];
  }

  return (
    <main className="dn-body vxl">
      <style dangerouslySetInnerHTML={{ __html: vortexStyles }} />
      <SiteHeader />

      <div className="vxl-head">
        <p className="vxl-tag">Faculty · TEST</p>
        <h2 className="vxl-h2">
          학원가가 증명한 <em>강사진</em>
        </h2>
      </div>

      <div className="vx-stage" id="vxStage" data-count={list.length}>
        {/* 뒷배경의 빛 — 느리게 도는 빛살 + 떠다니는 은은한 번짐 */}
        <div className="vx-aura" aria-hidden="true">
          <span className="vx-rays" />
          <span className="vx-glow1" />
          <span className="vx-glow2" />
          <span className="vx-glow3" />
        </div>
        <span className="vx-flare" aria-hidden="true" />

        <div className="vx-world" id="vxWorld">
          {wall.map((t, d) => (
            <a className="vx-tile" href={`/teachers/${t.id}`} key={d}>
              {t.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo(t.photo, 256)}
                  srcSet={photoSet(t.photo, 256)}
                  alt={`${t.name} 선생님`}
                  decoding="async"
                  draggable={false}
                />
              ) : null}
              <span className="vx-tile-txt">
                <i>{t.subject}</i>
                <b>{t.name}</b>
              </span>
            </a>
          ))}

          {/* 한가운데 크게 떠 있는 카드 — 흐름에 맞춰 선생님이 바뀝니다.
              선생님 수만큼 쌓아 두면 무거워서, 앞뒤 두 장만 두고
              스크립트가 번갈아 내용을 바꿔 끼웁니다. */}
          <div className="vx-focus" id="vxFocus">
            {[0, 1].map((slotIndex) => {
              const t = slotIndex === 0 ? list[0] : undefined;
              return (
                <div
                  className={`vx-focus-face${slotIndex === 0 ? " is-on" : ""}`}
                  key={slotIndex}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t?.photo ? photo(t.photo, 512) : ""}
                    alt={t ? `${t.name} 선생님` : ""}
                    decoding="async"
                    draggable={false}
                  />
                  <span className="vx-focus-txt">
                    <span className="vx-focus-sub">{t?.subject ?? ""}</span>
                    <span className="vx-focus-name">{t?.name ?? ""}</span>
                    <span className="vx-focus-school">
                      {t?.school ? shortSchool(t.school) : ""}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="vx-fade" aria-hidden="true" />
        <p className="vx-hint">휠을 굴리거나 위아래로 끌어 보세요</p>

        {/* 한가운데 카드가 바꿔 끼울 선생님 목록 */}
        <script
          type="application/json"
          id="vxData"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              list.map((t) => ({
                name: t.name,
                subject: t.subject,
                school: t.school ? shortSchool(t.school) : "",
                photo: t.photo ? photo(t.photo, 512) : "",
              })),
            ).replace(/</g, "\\u003c"),
          }}
        />
      </div>

      <p className="vxl-foot">
        <b>테스트 페이지입니다.</b> 검색에 안 잡히고 메뉴에도 없습니다.
        /winter 본 페이지와 globals.css 는 손대지 않았습니다.
        <br />
        세기 조절은 <b>vortexScript.ts</b> 맨 위 RADIUS(원통 반지름) ·
        PER_RING(한 층 장수) · AUTO(저절로 흐르는 속도) · TWIST(비틀림) 로 합니다.
      </p>

      <SiteFooter />

      <Script id="vortex-lab" strategy="afterInteractive">
        {vortexScript}
      </Script>
    </main>
  );
}
