// ═══════════════════════════════════════════════════════════
//  /winter-faculty-lab  —  "학원가가 증명한 강사진" Vortex 실험실
//
//  ※ 테스트 전용 페이지입니다.
//    · 본 윈터 상세페이지(/winter)와 globals.css 는 건드리지 않습니다.
//    · 스타일은 vortexStyles.ts, 동작은 vortexScript.ts 안에만 있습니다.
//    · 검색에 잡히지 않도록 noindex 를 걸어 두었습니다.
//    · 마음에 안 들면 이 폴더(app/winter-faculty-lab)만 지우면 끝입니다.
//
//  A안 = 강사진 소개(/teachers) 카드 그대로
//  B안 = 사진 + 이름만 있는 포스터 타일
//  화면 위 버튼으로 바꿔 가며 비교할 수 있습니다.
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

/** 깔아 둘 바둑판 크기 — 실제로 몇 칸을 쓸지는 화면 크기를 보고 스크립트가 정합니다 */
const COLS = 8;
const ROWS = 5;

export default async function WinterFacultyLabPage() {
  const all = await getTeachers();

  /* 사진이 있는 선생님을 앞에, 없는 분은 뒤에 둡니다 */
  const withPhoto = all.filter((t) => t.revealed && t.photo);
  const list = withPhoto.length >= 4 ? withPhoto : all;

  if (list.length === 0) {
    return (
      <main className="dn-body vxl">
        <SiteHeader />
        <div className="vxl-head">
          <h2 className="vxl-h2">등록된 강사가 없습니다</h2>
          <p className="vxl-lead">관리자 → 강사진에서 선생님을 먼저 등록해 주세요.</p>
        </div>
        <SiteFooter />
      </main>
    );
  }

  /* 바둑판 칸마다 선생님을 배정합니다.
     이웃한 칸에 같은 분이 겹치지 않도록 서로소인 수(7, 3)로 건너뜁니다. */
  const tiles: { i: number; j: number; t: (typeof list)[number] }[] = [];
  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      tiles.push({ i, j, t: list[(i * 7 + j * 3) % list.length] });
    }
  }

  return (
    <main className="dn-body vxl">
      <style dangerouslySetInnerHTML={{ __html: vortexStyles }} />
      <SiteHeader />

      <div className="vxl-head">
        <p className="vxl-tag">Faculty · TEST</p>
        <h2 className="vxl-h2">
          학원가가 증명한<br />
          <em>강사진</em>
        </h2>
        <p className="vxl-lead">
          끌어서 둘러보세요. 가운데로 올수록 선생님이 크게 다가옵니다.
        </p>
        <div className="vxl-modes" role="group" aria-label="보기 방식">
          <button className="vxl-mode is-on" type="button" data-mode="card">
            A안 · 강사진 카드
          </button>
          <button className="vxl-mode" type="button" data-mode="tile">
            B안 · 사진 타일
          </button>
        </div>
      </div>

      <div
        className="vx-stage is-card"
        id="vxStage"
        data-cols={COLS}
        data-rows={ROWS}
      >
        <div className="vx-plane" id="vxPlane">
          {tiles.map(({ i, j, t }) => (
            <a
              className="vx-tile"
              href={`/teachers/${t.id}`}
              data-i={i}
              data-j={j}
              key={`${i}-${j}`}
            >
              <div className="vx-tags">
                {t.tags.slice(0, 2).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <p className="vx-subject">{t.subject}</p>
              <h3 className="vx-name">{t.name}</h3>
              {t.school && <p className="vx-school">{shortSchool(t.school)}</p>}

              <span className="vx-figure">
                {t.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo(t.photo, 300)}
                    srcSet={photoSet(t.photo, 300)}
                    alt={`${t.name} 선생님`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                ) : (
                  <span aria-hidden="true">?</span>
                )}
              </span>

              <span className="vx-cap">
                <b>{t.name}</b>
                <i>{t.subject}</i>
              </span>
            </a>
          ))}
        </div>

        <div className="vx-fade" aria-hidden="true" />
        <p className="vx-hint">드래그해서 둘러보세요</p>
      </div>

      <p className="vxl-foot">
        <b>테스트 페이지입니다.</b> 검색에는 잡히지 않고, 메뉴에도 넣지 않았습니다.
        본 윈터 상세페이지(/winter)와 공용 스타일(globals.css)은 손대지 않았습니다.
        <br />
        움직임 세기는 <b>vortexScript.ts</b> 맨 위 BULGE(부푸는 정도) ·
        LENS(벌어지는 정도) · DRIFT(저절로 흐르는 속도) 세 숫자로 조절합니다.
      </p>

      <SiteFooter />

      <Script id="vortex-lab" strategy="afterInteractive">
        {vortexScript}
      </Script>
    </main>
  );
}
