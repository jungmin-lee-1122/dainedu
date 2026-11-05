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
  background:#fff;color:#14192B;letter-spacing:-.02em;overflow-x:clip
}

/* ── 머리말 (무대 위에 겹쳐 올립니다) ── */
.vxl-head{position:relative;z-index:40;max-width:1160px;margin:0 auto;
  padding:clamp(22px,3vw,40px) 24px 0;pointer-events:none}
.vxl-tag{display:inline-block;margin:0 0 12px;padding:6px 14px;border-radius:999px;
  background:rgba(17,28,54,.07);color:var(--vx-navy);font-size:12px;font-weight:800}
.vxl-h2{font-size:clamp(26px,3.6vw,44px);font-weight:800;line-height:1.3;
  margin:0;letter-spacing:-.035em}
.vxl-h2 em{font-style:normal;color:var(--vx-gold)}

/* ── 무대 ── */
.vx-stage{
  position:relative;overflow:hidden;
  height:clamp(540px,84vh,980px);
  margin:calc(-1 * clamp(52px,7vw,92px)) auto 0;
  background:#fff;
  cursor:grab;
  /* 위아래로 쓸면 갤러리가 돌고, 좌우는 브라우저에 맡깁니다 */
  touch-action:pan-x;
  user-select:none;-webkit-user-select:none}
.vx-stage.is-drag{cursor:grabbing}

/* 원통이 들어앉는 공간 — perspective 값은 스크립트가 화면 높이로 계산합니다 */
.vx-world{position:absolute;inset:0;z-index:2;transform-style:preserve-3d}

/* ══ 뒷배경의 빛 ══
   흰 바탕을 지키면서 "뒤에서 은은하게 비친다" 정도만 냅니다.
   blur 필터 대신 radial-gradient 를 씁니다(필터는 매 프레임 비싸집니다).
   움직이는 것은 transform 뿐이라 GPU 가 알아서 처리합니다. */
.vx-aura{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none}
.vx-aura span{position:absolute;display:block;will-change:transform}

/* 뒤에서 아주 느리게 도는 빛살 — 중심은 비우고 바깥으로 갈수록 옅어집니다 */
.vx-rays{left:50%;top:50%;width:170vmax;height:170vmax;margin:-85vmax 0 0 -85vmax;
  background:repeating-conic-gradient(from 0deg,
    rgba(36,54,90,.020) 0deg 1.4deg,
    rgba(36,54,90,0) 1.4deg 24deg);
  -webkit-mask:radial-gradient(closest-side,transparent 14%,#000 40%,transparent 66%);
          mask:radial-gradient(closest-side,transparent 14%,#000 40%,transparent 66%);
  animation:vxSpin 180s linear infinite}
@keyframes vxSpin{to{transform:rotate(360deg)}}

.vx-glow1{left:50%;top:50%;width:100vmax;height:100vmax;margin:-50vmax 0 0 -50vmax;
  background:radial-gradient(closest-side,
    rgba(127,180,255,.10) 0%, rgba(127,180,255,.04) 40%, rgba(127,180,255,0) 70%);
  animation:vxBreathe 18s ease-in-out infinite}
.vx-glow2{left:6%;top:-16%;width:70vmax;height:70vmax;
  background:radial-gradient(closest-side,
    rgba(36,54,90,.085) 0%, rgba(36,54,90,.03) 46%, rgba(36,54,90,0) 72%);
  animation:vxFloatA 26s ease-in-out infinite}
.vx-glow3{right:0%;bottom:-22%;width:62vmax;height:62vmax;
  background:radial-gradient(closest-side,
    rgba(192,153,79,.085) 0%, rgba(192,153,79,.03) 48%, rgba(192,153,79,0) 74%);
  animation:vxFloatB 32s ease-in-out infinite}
@keyframes vxBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
@keyframes vxFloatA{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(6vw,4vh,0)}}
@keyframes vxFloatB{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(-7vw,-5vh,0)}}

/* 펼쳐지는 순간 한 번 터지는 빛 */
.vx-flare{position:absolute;z-index:1;left:50%;top:50%;
  width:120vmax;height:120vmax;margin:-60vmax 0 0 -60vmax;
  background:radial-gradient(closest-side,
    rgba(255,255,255,.95) 0%, rgba(228,205,154,.5) 22%,
    rgba(127,180,255,.22) 44%, rgba(255,255,255,0) 68%);
  opacity:0;transform:scale(.18);pointer-events:none}
.vx-stage.is-intro .vx-flare{animation:vxFlare 1.9s cubic-bezier(.16,.84,.3,1) forwards}
@keyframes vxFlare{
  0%{opacity:0;transform:scale(.14)}
  14%{opacity:.85}
  100%{opacity:0;transform:scale(1.25)}
}

@media(prefers-reduced-motion:reduce){
  .vx-rays,.vx-glow1,.vx-glow2,.vx-glow3,.vx-flare{animation:none}
}

/* ── 벽에 붙은 사진 한 장 ── */
.vx-tile{
  position:absolute;left:50%;top:50%;
  display:block;overflow:hidden;border-radius:4px;
  background:#EEF1F6;text-decoration:none;color:inherit;
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
.vx-focus-img{position:absolute;inset:0;opacity:0;pointer-events:none;
  transition:opacity 1s cubic-bezier(.4,0,.2,1)}
.vx-focus-img.is-on{opacity:1;pointer-events:auto}
.vx-focus-img img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block}
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

/* 가장자리를 하얗게 녹여 "끝"을 감춥니다 */
.vx-fade{position:absolute;inset:0;z-index:30;pointer-events:none;
  background:
    linear-gradient(180deg,#fff 0%,rgba(255,255,255,0) 17%,rgba(255,255,255,0) 86%,#fff 100%),
    linear-gradient(90deg,#fff 0%,rgba(255,255,255,0) 9%,rgba(255,255,255,0) 91%,#fff 100%)}

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
  .vx-stage{height:clamp(440px,68vh,620px)}
  .vx-tile-txt{padding:22px 8px 7px}
  .vx-tile-txt i{font-size:8.5px;margin-bottom:1px}
  .vx-tile-txt b{font-size:12px}
  .vx-focus-txt{padding:34px 12px 11px}
  .vx-focus-name{font-size:17px}
  .vx-focus-sub{font-size:10px}
  .vx-focus-school{font-size:9.5px}
}
`;
