// ═══════════════════════════════════════════════════════════
//  Vortex 강사진 — 테스트 전용 스타일
//
//  원본(vortex-gallery)은 "원통"입니다.
//  카메라가 원통 안에 서서 맞은편 벽을 바라보고, 벽에 붙은 사진들이
//  위로 흐르면서 층마다 조금씩 다른 속도로 비틀립니다. 그래서 소용돌이.
//  여기서는 그 구조를 CSS 3D(perspective + rotateY)로 그대로 옮겼습니다.
//
//  ※ /winter 본 페이지와 globals.css 는 건드리지 않습니다.
//    이 폴더만 지우면 사이트는 원래대로 돌아갑니다.
// ═══════════════════════════════════════════════════════════
export const vortexStyles = `
.vxl{
  --vx-deep:#080D1A; --vx-navy:#111C36; --vx-gold:#C0994F; --vx-gold-l:#E4CD9A;
  --vx-mut:#6B7488;
  font-family:"Pretendard Variable",Pretendard,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;
  /* 페이지는 흰 바탕 그대로 둡니다.
     윈터 상세페이지의 "학원가가 증명한 강사진"은 흰 섹션이고 바로 뒤가
     딥네이비 섹션이라, 전체를 어둡게 하면 어두운 블록이 연달아 붙습니다.
     어두운 바탕은 둥근 무대 패널 "안쪽"에만 둡니다. */
  background:#fff;color:#14192B;letter-spacing:-.02em;overflow-x:clip
}

/* ── 머리말 (흰 섹션 위, 무대 패널 바깥) ── */
.vxl-head{position:relative;z-index:40;max-width:1208px;margin:0 auto;
  padding:clamp(28px,4vw,56px) 24px clamp(18px,2.4vw,26px)}
.vxl-tag{display:inline-block;margin:0 0 12px;padding:6px 14px;border-radius:999px;
  background:rgba(17,28,54,.07);color:var(--vx-navy);
  font-size:12px;font-weight:800;letter-spacing:.04em}
.vxl-h2{font-size:clamp(26px,3.6vw,44px);font-weight:800;line-height:1.3;
  margin:0;letter-spacing:-.035em;color:var(--vx-deep)}
.vxl-h2 em{font-style:normal;color:var(--vx-gold)}

/* ── 무대 ── */
.vx-stage{
  position:relative;overflow:hidden;
  height:clamp(500px,76vh,860px);
  max-width:1160px;margin:0 auto;
  border-radius:clamp(16px,2vw,26px);
  background:#0D1526;
  box-shadow:0 40px 90px -56px rgba(8,13,26,.8);
  cursor:grab;
  /* 위아래로 쓸면 갤러리가 돌고, 좌우는 브라우저에 맡깁니다 */
  touch-action:pan-x;
  user-select:none;-webkit-user-select:none}
.vx-stage.is-drag{cursor:grabbing}

/* 원통이 들어앉는 공간 — perspective 값은 스크립트가 화면 높이로 계산합니다 */
.vx-world{position:absolute;inset:0;z-index:2;transform-style:preserve-3d}

/* ══ 뒷배경 ══
   빛살(해바라기)이나 색색 번짐을 깔면 바로 촌스러워집니다.
   전시장처럼 "위에서 내려오는 조명 하나 + 가장자리 어둠"만 둡니다.
   움직이는 것은 transform 뿐이라 GPU 가 알아서 처리합니다. */
.vx-aura{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none}
.vx-aura span{position:absolute;display:block}

/* 위에서 내려오는 조명 — 아주 천천히 숨 쉽니다 */
.vx-glow1{left:50%;top:-30%;width:150vmax;height:120vmax;margin-left:-75vmax;
  background:radial-gradient(closest-side at 50% 36%,
    rgba(150,178,228,.17) 0%,
    rgba(120,150,205,.07) 36%,
    rgba(90,120,180,0) 68%);
  will-change:transform;
  animation:vxBreathe 22s ease-in-out infinite}

/* 가장자리 어둠 — 가운데로 시선을 모읍니다 */
.vx-glow2{inset:0;width:auto;height:auto;
  background:radial-gradient(120% 86% at 50% 44%,
    rgba(13,21,38,0) 38%, rgba(7,12,22,.55) 78%, rgba(5,9,17,.8) 100%)}

/* 바닥에 깔리는 아주 옅은 금빛 — 브랜드 색을 한 방울만 */
.vx-glow3{left:50%;bottom:-26%;width:110vmax;height:60vmax;margin-left:-55vmax;
  background:radial-gradient(closest-side,
    rgba(192,153,79,.085) 0%, rgba(192,153,79,.025) 44%, rgba(192,153,79,0) 72%)}

@keyframes vxBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}

/* 펼쳐지는 순간 한 번 터지는 빛 */
.vx-flare{position:absolute;z-index:1;left:50%;top:50%;
  width:120vmax;height:120vmax;margin:-60vmax 0 0 -60vmax;
  background:radial-gradient(closest-side,
    rgba(226,236,255,.6) 0%, rgba(176,198,238,.22) 30%,
    rgba(140,170,220,0) 64%);
  opacity:0;transform:scale(.18);pointer-events:none}
.vx-stage.is-intro .vx-flare{animation:vxFlare 1.9s cubic-bezier(.16,.84,.3,1) forwards}
@keyframes vxFlare{
  0%{opacity:0;transform:scale(.14)}
  14%{opacity:.6}
  100%{opacity:0;transform:scale(1.25)}
}

@media(prefers-reduced-motion:reduce){
  .vx-rays,.vx-glow1,.vx-glow2,.vx-glow3,.vx-flare{animation:none}
}

/* ── 벽에 붙은 사진 한 장 ── */
.vx-tile{
  position:absolute;left:50%;top:50%;
  display:block;overflow:hidden;border-radius:7px;
  /* 선생님 사진은 배경을 딴 누끼입니다. 타일에 밝은 바탕을 깔아야
     어두운 무대 위에서 인물이 카드에 올라선 것처럼 보입니다. */
  background:linear-gradient(176deg,#FAFBFD 0%,#EDF1F7 62%,#E2E8F2 100%);
  text-decoration:none;color:inherit;
  box-shadow:0 16px 30px -18px rgba(0,0,0,.65);
  transform-style:preserve-3d;
  will-change:transform}
.vx-tile.is-off{display:none}
.vx-tile img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block}

/* 타일의 투명도는 펼쳐지는 동안 스크립트가 직접 넣습니다.
   가운데 카드만 펼침이 끝날 때쯤 떠오르게 CSS 로 다룹니다. */
.vx-focus{opacity:0;transform-origin:50% 50%;
  transition:opacity .9s ease .55s}
.vx-stage.is-intro .vx-focus{opacity:1}

/* 타일 글씨 — 가운데 카드와 같은 모양(과목 / 이름) */
.vx-tile-txt{position:absolute;left:0;right:0;bottom:0;
  padding:32px 11px 10px;
  background:linear-gradient(180deg,rgba(8,13,26,0),rgba(8,13,26,.86) 58%,rgba(8,13,26,.95));
  color:#fff}
.vx-tile-txt i{display:block;margin-bottom:2px;font-style:normal;
  font-size:10px;font-weight:800;letter-spacing:.02em;color:var(--vx-gold-l)}
.vx-tile-txt b{display:block;font-size:15px;font-weight:900;
  letter-spacing:-.04em;line-height:1.15}

/* ── 한가운데 떠 있는 강사 카드 ── */
.vx-focus{
  position:absolute;left:50%;top:50%;
  overflow:hidden;border-radius:10px;
  background:linear-gradient(170deg,#fff,#F3F6FB);
  box-shadow:0 30px 80px -40px rgba(8,13,26,.75), 0 0 0 1px rgba(16,25,46,.07);
  text-decoration:none;color:inherit;
  transform-style:preserve-3d}
/* 선생님이 바뀔 때 깜박이지 않도록 겹쳐 두고 서서히 바꿉니다 */
.vx-focus-face{position:absolute;inset:0;opacity:0;pointer-events:none;
  transition:opacity 1s cubic-bezier(.4,0,.2,1)}
.vx-focus-face.is-on{opacity:1;pointer-events:auto}
.vx-focus-face>img{position:absolute;inset:0}
.vx-focus-face img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block}
.vx-focus-txt{position:absolute;left:0;right:0;bottom:0;z-index:2;
  padding:44px 16px 15px;
  background:linear-gradient(180deg,rgba(8,13,26,0),rgba(8,13,26,.9) 55%,rgba(8,13,26,.97));
  color:#fff}
.vx-focus-sub{display:block;margin-bottom:3px;font-size:11px;font-weight:800;
  letter-spacing:.02em;color:var(--vx-gold-l)}
.vx-focus-name{display:block;font-size:22px;font-weight:900;letter-spacing:-.04em;line-height:1.2}
.vx-focus-school{display:block;margin-top:5px;font-family:"Noto Serif KR",serif;
  font-size:10.5px;font-weight:600;line-height:1.45;color:rgba(255,255,255,.66);
  word-break:keep-all}

/* 가장자리를 바탕색으로 녹여 "끝"을 감춥니다 */
.vx-fade{position:absolute;inset:0;z-index:30;pointer-events:none;
  background:
    linear-gradient(180deg,#0D1526 0%,rgba(13,21,38,0) 15%,rgba(13,21,38,0) 88%,#0D1526 100%),
    linear-gradient(90deg,#0D1526 0%,rgba(13,21,38,0) 8%,rgba(13,21,38,0) 92%,#0D1526 100%)}

.vx-hint{position:absolute;z-index:31;left:50%;bottom:18px;transform:translateX(-50%);
  margin:0;padding:7px 15px;border-radius:999px;
  background:rgba(12,19,36,.34);
  -webkit-backdrop-filter:blur(14px) saturate(150%);backdrop-filter:blur(14px) saturate(150%);
  border:1px solid rgba(255,255,255,.14);
  font-size:11.5px;font-weight:700;color:rgba(255,255,255,.82);
  opacity:.75;transition:opacity .4s ease;pointer-events:none}
.vx-stage.is-drag .vx-hint{opacity:0}

.vxl-foot{max-width:1160px;margin:0 auto;padding:22px 24px 70px;
  font-size:12.5px;line-height:1.9;color:#8E95A4}
.vxl-foot b{color:var(--vx-navy)}

@media(max-width:900px){
  .vxl-head{padding-left:18px;padding-right:18px}
  .vx-stage{height:clamp(420px,62vh,560px);border-radius:16px;
    margin-left:18px;margin-right:18px}
  .vx-tile-txt{padding:22px 8px 7px}
  .vx-tile-txt i{font-size:8.5px;margin-bottom:1px}
  .vx-tile-txt b{font-size:12px}
  .vx-focus-txt{padding:34px 12px 11px}
  .vx-focus-name{font-size:17px}
  .vx-focus-sub{font-size:10px}
  .vx-focus-school{font-size:9.5px}
}
`;
