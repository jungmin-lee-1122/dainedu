// ═══════════════════════════════════════════════════════════
//  Vortex 강사진 — 테스트 전용 스타일
//
//  ※ 이 파일은 /winter-faculty-lab 테스트 페이지에서만 씁니다.
//    globals.css 는 전혀 건드리지 않으므로, 이 폴더를 통째로 지우면
//    사이트는 원래대로 돌아갑니다.
//
//  타일 크기는 아래 CSS 변수로만 정합니다.
//  스크립트(vortexScript.ts)가 이 값을 읽어 바둑판을 계산합니다.
// ═══════════════════════════════════════════════════════════
export const vortexStyles = `
.vxl{
  --vx-deep:#080D1A; --vx-navy:#111C36; --vx-gold:#C0994F; --vx-gold-l:#E4CD9A;
  --vx-line:#E6E9F0; --vx-mut:#6B7488;
  font-family:"Pretendard Variable",Pretendard,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;
  background:#fff;color:#14192B;letter-spacing:-.02em;overflow-x:clip
}

/* ── 머리말 ── */
.vxl-head{max-width:1160px;margin:0 auto;padding:clamp(28px,4vw,52px) 24px 22px}
.vxl-tag{display:inline-block;margin:0 0 14px;padding:6px 14px;border-radius:999px;
  background:rgba(17,28,54,.07);color:var(--vx-navy);font-size:12px;font-weight:800}
.vxl-h2{font-size:clamp(26px,3.6vw,44px);font-weight:800;line-height:1.32;
  margin:0 0 14px;letter-spacing:-.035em}
.vxl-h2 em{font-style:normal;color:var(--vx-gold)}
.vxl-lead{margin:0 0 22px;font-size:14.5px;line-height:1.8;color:var(--vx-mut);word-break:keep-all}

/* A안 / B안 전환 */
.vxl-modes{display:inline-flex;gap:3px;padding:4px;border-radius:12px;background:rgba(17,28,54,.06)}
.vxl-mode{padding:9px 18px;border:0;border-radius:9px;background:transparent;cursor:pointer;
  font:inherit;font-size:13px;font-weight:700;color:var(--vx-mut);letter-spacing:-.01em;
  transition:background .22s ease,color .22s ease,box-shadow .22s ease}
.vxl-mode:hover{color:var(--vx-navy)}
.vxl-mode.is-on{background:var(--vx-navy);color:#fff;box-shadow:0 4px 12px -6px rgba(16,25,46,.7)}

/* ── 무대 ── */
.vx-stage{
  --vxw:252px; --vxh:330px; --vxgap:20px;
  position:relative;overflow:hidden;
  height:clamp(520px,74vh,860px);
  margin:0 auto;max-width:1600px;
  background:
    radial-gradient(120% 90% at 50% 42%, #FFFFFF 0%, #F7F9FC 46%, #EDF1F7 100%);
  cursor:grab;
  /* 세로 스크롤은 페이지에 양보하고, 가로로 끄는 것만 받습니다 */
  touch-action:pan-y;
  user-select:none;-webkit-user-select:none}
.vx-stage.is-drag{cursor:grabbing}
.vx-plane{position:absolute;inset:0;transform-style:preserve-3d}

/* 가장자리를 하얗게 녹여 "끝"이 보이지 않게 합니다 */
.vx-fade{position:absolute;inset:0;z-index:30;pointer-events:none;
  background:
    linear-gradient(90deg,#fff 0%,rgba(255,255,255,0) 14%,rgba(255,255,255,0) 86%,#fff 100%),
    linear-gradient(180deg,#fff 0%,rgba(255,255,255,0) 13%,rgba(255,255,255,0) 84%,#fff 100%)}

.vx-hint{position:absolute;z-index:31;left:50%;bottom:16px;transform:translateX(-50%);
  margin:0;padding:7px 15px;border-radius:999px;
  background:rgba(12,19,36,.34);
  -webkit-backdrop-filter:blur(14px) saturate(150%);backdrop-filter:blur(14px) saturate(150%);
  border:1px solid rgba(255,255,255,.14);
  font-size:11.5px;font-weight:700;letter-spacing:.02em;color:rgba(255,255,255,.82);
  opacity:.75;transition:opacity .4s ease;pointer-events:none}
.vx-stage.is-drag .vx-hint{opacity:0}

/* ── 타일 공통 ── */
.vx-tile{
  position:absolute;top:0;left:0;
  width:var(--vxw);height:var(--vxh);
  display:block;overflow:hidden;border-radius:16px;
  text-decoration:none;color:inherit;
  transform-origin:50% 50%;
  will-change:transform,opacity;
  backface-visibility:hidden}
.vx-tile.is-off{display:none}
.vx-figure{position:absolute;inset:0;display:block;overflow:hidden;background:#EEF1F6}
.vx-figure img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block}
.vx-figure>span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
  font-family:"Noto Serif KR",serif;font-size:72px;font-weight:900;color:rgba(36,54,90,.14)}

/* ── A안: 강사진 소개 카드 ── */
.vx-stage.is-card .vx-tile{
  background:linear-gradient(165deg,#fff,#F7F9FD);
  border:1px solid var(--vx-line);
  box-shadow:0 18px 40px -26px rgba(16,25,46,.5)}
.vx-stage.is-card .vx-figure{
  inset:auto 0 0 auto;width:84%;height:74%;background:none;border-radius:0}
.vx-stage.is-card .vx-figure img{object-fit:contain;object-position:right bottom}
.vx-tags{position:absolute;z-index:2;top:14px;left:14px;display:flex;flex-wrap:wrap;gap:4px}
.vx-tags span{display:inline-flex;padding:3px 7px;border:1px solid rgba(36,54,90,.14);
  border-radius:4px;font-size:9.5px;font-weight:700;color:#6D7788;background:rgba(255,255,255,.7)}
.vx-subject{position:absolute;z-index:2;top:44px;left:16px;margin:0;
  font-size:12px;font-weight:800;color:var(--vx-gold)}
.vx-name{position:absolute;z-index:2;top:60px;left:16px;margin:0;
  font-size:22px;font-weight:900;letter-spacing:-.035em;color:var(--vx-deep)}
.vx-school{position:absolute;z-index:2;top:14px;right:14px;max-width:48%;margin:0;
  font-family:"Noto Serif KR",serif;font-size:10px;font-weight:600;line-height:1.5;
  color:#9AA1AC;text-align:right;word-break:keep-all;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}

/* ── B안: 사진 + 이름 타일 ── */
.vx-cap{position:absolute;z-index:3;left:0;right:0;bottom:0;
  display:flex;align-items:baseline;gap:8px;padding:34px 15px 14px;
  background:linear-gradient(180deg,rgba(8,13,26,0),rgba(8,13,26,.82) 62%,rgba(8,13,26,.94));
  color:#fff}
.vx-cap b{font-size:17px;font-weight:900;letter-spacing:-.03em}
.vx-cap i{font-style:normal;font-size:11.5px;font-weight:700;color:var(--vx-gold-l)}
.vx-stage.is-card .vx-cap{display:none}
.vx-stage.is-tile .vx-tags,
.vx-stage.is-tile .vx-subject,
.vx-stage.is-tile .vx-name,
.vx-stage.is-tile .vx-school{display:none}
.vx-stage.is-tile .vx-tile{box-shadow:0 20px 44px -26px rgba(16,25,46,.6)}

/* ── 아래 안내 ── */
.vxl-foot{max-width:1160px;margin:0 auto;padding:26px 24px 70px;
  font-size:12.5px;line-height:1.9;color:#8E95A4}
.vxl-foot b{color:var(--vx-navy)}

@media(max-width:900px){
  .vx-stage{--vxw:168px;--vxh:224px;--vxgap:12px;height:clamp(420px,62vh,560px)}
  .vx-tile{border-radius:13px}
  .vx-subject{top:34px;left:12px;font-size:10.5px}
  .vx-name{top:48px;left:12px;font-size:17px}
  .vx-school{display:none}
  .vx-tags span{padding:2px 5px;font-size:8.5px}
  .vx-cap{padding:26px 11px 10px;gap:6px}
  .vx-cap b{font-size:14px}
  .vx-cap i{font-size:10px}
}
@media(prefers-reduced-motion:reduce){
  .vx-tile{transition:none}
}
`;
