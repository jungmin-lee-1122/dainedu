// ═══════════════════════════════════════════════════════════
//  Vortex 강사진 — 끝없이 이어지는 바둑판 (테스트 전용)
//
//  【무엇을 하나】
//   · 강사 타일을 바둑판으로 깔고, 화면 밖으로 나간 타일을
//     반대편에 다시 붙여 "끝이 없게" 보이게 합니다.
//   · 가운데에 가까운 타일일수록 크게 부풀고 또렷해집니다(어안렌즈).
//   · 가만히 두면 천천히 흐르고, 마우스로 끌면 따라옵니다.
//
//  【three.js 를 쓰지 않은 이유】
//   원본(vortex-gallery)은 WebGL 셰이더입니다. 같은 느낌을 내려고
//   600KB 짜리 라이브러리를 들이면 페이지가 무거워집니다.
//   여기서는 CSS transform 만으로 같은 인상을 만듭니다.
//
//  【숫자 조절】 아래 BULGE / LENS / DRIFT 세 개만 만지면 됩니다.
// ═══════════════════════════════════════════════════════════
export const vortexScript = `
(function(){
  var stage = document.getElementById("vxStage");
  if(!stage) return;
  var plane = document.getElementById("vxPlane");
  var tiles = Array.prototype.slice.call(plane.querySelectorAll(".vx-tile"));
  if(!tiles.length) return;

  var MAXC = parseInt(stage.getAttribute("data-cols"), 10);   /* 깔아둔 열 수 */
  var MAXR = parseInt(stage.getAttribute("data-rows"), 10);   /* 깔아둔 행 수 */

  var BULGE = 0.92;    /* 가운데 타일이 얼마나 커지나 */
  var LENS  = 0.20;    /* 가운데를 얼마나 벌리나 (어안렌즈) */
  var DRIFT = 0.30;    /* 저절로 흐르는 속도(px/프레임) */

  var slow = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(slow) DRIFT = 0;

  var W=0, H=0, CW=0, CH=0, cols=0, rows=0, TW=0, TH=0, R=1;
  var ox=0, oy=0;                 /* 바둑판이 밀린 거리 */
  var vx=-DRIFT, vy=-DRIFT*0.55;  /* 지금 속도 */
  var dragging=false, px=0, py=0, moved=0, dx=0, dy=0;

  function num(name, fallback){
    var v = parseFloat(getComputedStyle(stage).getPropertyValue(name));
    return isNaN(v) ? fallback : v;
  }
  function mod(a,b){ return ((a % b) + b) % b; }

  /* ── 화면 크기에 맞춰 몇 칸을 쓸지 정합니다 ── */
  function measure(){
    var r = stage.getBoundingClientRect();
    W = r.width; H = r.height;
    R = Math.sqrt(W*W + H*H) / 2;

    var gap = num("--vxgap", 20);
    CW = num("--vxw", 252) + gap;
    CH = num("--vxh", 330) + gap;

    /* 화면을 덮고도 한 칸 남을 만큼만 씁니다 (남는 타일은 숨깁니다) */
    cols = Math.min(MAXC, Math.max(3, Math.ceil(W / CW) + 2));
    rows = Math.min(MAXR, Math.max(3, Math.ceil(H / CH) + 2));
    TW = cols * CW;
    TH = rows * CH;

    for(var i=0;i<tiles.length;i++){
      var t = tiles[i];
      var ci = +t.getAttribute("data-i"), rj = +t.getAttribute("data-j");
      t.classList.toggle("is-off", ci >= cols || rj >= rows);
    }
  }

  /* ── 한 프레임 그리기 ── */
  function draw(){
    var halfW = W/2, halfH = H/2;

    for(var i=0;i<tiles.length;i++){
      var t = tiles[i];
      if(t.classList.contains("is-off")) continue;

      var ci = +t.getAttribute("data-i"), rj = +t.getAttribute("data-j");

      /* 벽돌쌓기: 홀수 열을 반 칸 내려 격자 티를 없앱니다 */
      var bx = ci * CW;
      var by = rj * CH + (ci % 2) * CH * 0.5;

      /* 화면 밖으로 나가면 반대편에서 다시 들어옵니다 */
      var x = mod(bx + ox, TW) - (TW - W)/2;
      var y = mod(by + oy, TH) - (TH - H)/2;

      /* 가운데에서 얼마나 떨어져 있나 (0 = 한가운데, 1 = 모서리) */
      var cxp = x + CW/2 - halfW;
      var cyp = y + CH/2 - halfH;
      var d = Math.min(1, Math.sqrt(cxp*cxp + cyp*cyp) / R);

      var f = 1 - d*d;              /* 가운데일수록 1 */
      var scale = 1 + BULGE * f * f;
      var lens  = 1 + LENS * f;
      var op    = 0.26 + 0.74 * (1 - d*0.86);

      var tx = cxp * lens + halfW - CW/2;
      var ty = cyp * lens + halfH - CH/2;

      t.style.transform = "translate3d(" + tx.toFixed(1) + "px," + ty.toFixed(1) + "px,0) scale(" + scale.toFixed(3) + ")";
      t.style.opacity = op.toFixed(3);
      t.style.zIndex = String(Math.round(f * 100));
    }
  }

  /* ── 매 프레임 ── */
  function tick(){
    if(dragging){
      ox += dx; oy += dy;
      vx = dx; vy = dy;
      dx = 0; dy = 0;
    } else {
      /* 손을 떼면 관성으로 미끄러지다가 천천히 기본 흐름으로 돌아옵니다 */
      vx += (-DRIFT - vx) * 0.022;
      vy += (-DRIFT*0.55 - vy) * 0.022;
      ox += vx; oy += vy;
    }
    draw();
    requestAnimationFrame(tick);
  }

  /* ── 끌기 ── */
  function down(e){
    dragging = true; moved = 0;
    px = e.clientX; py = e.clientY;
    stage.classList.add("is-drag");
    if(stage.setPointerCapture && e.pointerId != null){
      try{ stage.setPointerCapture(e.pointerId); }catch(err){}
    }
  }
  function move(e){
    if(!dragging) return;
    var mx = e.clientX - px, my = e.clientY - py;
    px = e.clientX; py = e.clientY;
    dx += mx; dy += my;
    moved += Math.abs(mx) + Math.abs(my);
  }
  function up(){
    if(!dragging) return;
    dragging = false;
    stage.classList.remove("is-drag");
  }

  stage.addEventListener("pointerdown", down);
  stage.addEventListener("pointermove", move);
  stage.addEventListener("pointerup", up);
  stage.addEventListener("pointercancel", up);
  stage.addEventListener("pointerleave", up);

  /* 끌고 난 직후의 클릭은 "누른 것"이 아니므로 막습니다 */
  stage.addEventListener("click", function(e){
    if(moved > 8){ e.preventDefault(); e.stopPropagation(); }
  }, true);

  /* 마우스 휠로도 둘러볼 수 있게 (세로는 페이지 스크롤에 양보) */
  stage.addEventListener("wheel", function(e){
    if(Math.abs(e.deltaX) > Math.abs(e.deltaY)){
      e.preventDefault();
      ox -= e.deltaX;
    }
  }, { passive:false });

  /* ── A안 / B안 전환 ── */
  var modes = document.querySelectorAll(".vxl-mode");
  for(var m=0;m<modes.length;m++){
    modes[m].addEventListener("click", function(){
      var want = this.getAttribute("data-mode");
      stage.classList.toggle("is-card", want === "card");
      stage.classList.toggle("is-tile", want === "tile");
      for(var k=0;k<modes.length;k++){
        modes[k].classList.toggle("is-on", modes[k] === this);
      }
    });
  }

  var rt;
  window.addEventListener("resize", function(){
    clearTimeout(rt); rt = setTimeout(function(){ measure(); draw(); }, 120);
  });

  measure();
  draw();
  requestAnimationFrame(tick);
})();
`;
