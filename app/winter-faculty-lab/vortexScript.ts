// ═══════════════════════════════════════════════════════════
//  Vortex 강사진 — 원본(vortex-gallery)을 그대로 옮긴 소용돌이
//
//  【원본 구조】 three.js 셰이더를 읽어 숫자를 그대로 가져왔습니다.
//    · 반지름 6 짜리 원통 벽에 사진이 붙어 있습니다.
//    · 카메라는 원통 "안"(중심에서 5만큼 앞)에 서서 맞은편 벽을 봅니다.
//    · 한 층에 15장, 층 간격 3, 위로 흐르다가 끝에서 다시 돌아옵니다.
//    · 층마다 도는 속도가 0.8~1.0 으로 조금씩 달라서 시간이 갈수록
//      줄이 비틀립니다 — 이게 "소용돌이(vortex)" 입니다.
//    · 한가운데에는 지금 차례인 한 장이 크게 떠 있습니다.
//
//  【three.js 를 안 쓴 이유】
//    원본은 WebGL 입니다. 같은 그림을 CSS 3D(perspective + rotateY)로
//    똑같이 그릴 수 있어서, 600KB 짜리 라이브러리를 들이지 않았습니다.
//    원근 계산식은 three.js 의 PerspectiveCamera(fov 50) 과 같습니다.
//
//  【숫자 조절】 아래 CFG 한 군데만 고치면 됩니다.
// ═══════════════════════════════════════════════════════════
export const vortexScript = `
(function(){
  var stage = document.getElementById("vxStage");
  if(!stage) return;
  var world = document.getElementById("vxWorld");
  var focus = document.getElementById("vxFocus");
  var tiles = Array.prototype.slice.call(world.querySelectorAll(".vx-tile"));
  if(!tiles.length) return;

  /* ── 원본에서 가져온 숫자 ── */
  var FOV      = 50;      /* 카메라 화각(도) */
  var CAM_Z    = 5;       /* 카메라가 원통 중심에서 떨어진 거리 */
  var RADIUS   = 6;       /* 원통 반지름 */
  var CARD_W   = 1.5;     /* 사진 가로(월드 단위) */
  var ASPECT   = 0.72;    /* 사진 가로/세로 */
  var PER_RING = 15;      /* 한 층에 몇 장 */
  var SPACING  = 3;       /* 층 간격 */
  var AUTO     = 0.015;   /* 가만히 둘 때 저절로 흐르는 양(프레임당) */
  var TWIST    = 0.4;     /* 속도가 비틀림으로 바뀌는 비율 */
  var EASE     = 0.1;     /* 따라오는 부드러움 */
  var FOCUS_W  = 1.7, FOCUS_H = 2.3;  /* 한가운데 카드 크기 */

  var LEVELS = Math.round(tiles.length / PER_RING);   /* 층 수 */
  var TOTAL  = tiles.length;
  var ZRANGE = LEVELS * SPACING;
  var U      = 100;       /* 월드 1 = 화면 100px (크기에는 영향 없음, 계산용) */
  var DEG    = 180 / Math.PI;

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 층마다 도는 속도가 조금씩 다릅니다 — 소용돌이의 핵심 */
  var levelSpeed = [];
  for(var L=0; L<LEVELS; L++) levelSpeed.push(0.8 + Math.random()*0.2);

  var H=0, P=0;
  var pos = { target:0, current:0, speedTarget:0, speedCurrent:0, dir:1 };
  var focusCount = parseInt(stage.getAttribute("data-count"), 10) || 1;
  var shownFocus = -1;
  var dragging=false, lastY=0, moved=0;

  function mod(a,b){ return ((a % b) + b) % b; }

  function measure(){
    var r = stage.getBoundingClientRect();
    H = r.height;
    /* three.js PerspectiveCamera 와 같은 원근: P = (화면높이/2) / tan(화각/2) */
    P = (H/2) / Math.tan(FOV/2 * Math.PI/180);
    stage.style.perspective = P.toFixed(1) + "px";
    stage.style.perspectiveOrigin = "50% 50%";

    var w = CARD_W * U, h = (CARD_W / ASPECT) * U;
    for(var i=0;i<tiles.length;i++){
      tiles[i].style.width  = w + "px";
      tiles[i].style.height = h + "px";
      tiles[i].style.marginLeft = (-w/2) + "px";
      tiles[i].style.marginTop  = (-h/2) + "px";
    }
    if(focus){
      var fw = FOCUS_W * U, fh = FOCUS_H * U;
      focus.style.width  = fw + "px";
      focus.style.height = fh + "px";
      focus.style.marginLeft = (-fw/2) + "px";
      focus.style.marginTop  = (-fh/2) + "px";
      /* 한가운데 카드는 원통 중심(월드 원점)에 세워 둡니다 */
      focus.style.transform = "translate3d(0px,0px," + (P - CAM_Z*U).toFixed(1) + "px)";
    }
  }

  function draw(){
    var scrollY = pos.current;
    var twist   = pos.speedCurrent * TWIST;

    for(var d=0; d<TOTAL; d++){
      var t = tiles[d];
      var L = d % LEVELS;

      /* 원본과 같은 나선 배치: 각도는 전체 개수로 고르게, 높이는 층으로 */
      var theta = (d / TOTAL) * Math.PI * 2 + twist * levelSpeed[L];

      /* 위로 흐르다가 끝에서 되돌아옵니다 */
      var y0 = L * SPACING - ZRANGE/2;
      var wy = mod(y0 + scrollY + ZRANGE/2, ZRANGE) - ZRANGE/2;

      var wx = Math.cos(theta) * RADIUS;
      var wz = Math.sin(theta) * RADIUS;

      /* 카메라에서 얼마나 멀리 있나 (카메라는 +Z 쪽 CAM_Z 에서 -Z 를 봅니다) */
      var dist = CAM_Z - wz;

      /* 카메라 뒤 또는 코앞은 그리지 않습니다 */
      if(dist < 1.2){
        if(!t._off){ t.style.display = "none"; t._off = 1; }
        continue;
      }
      if(t._off){ t.style.display = ""; t._off = 0; }

      var X = wx * U;
      var Y = -wy * U;
      var Z = P - dist * U;
      /* 사진은 원통 안쪽(카메라 쪽)을 바라보게 돌립니다 */
      var rot = -90 - theta * DEG;

      t.style.transform =
        "translate3d(" + X.toFixed(1) + "px," + Y.toFixed(1) + "px," + Z.toFixed(1) + "px)" +
        " rotateY(" + rot.toFixed(2) + "deg)";
    }

    /* 한가운데 카드에 보일 선생님 바꾸기 */
    if(focus && focusCount > 1){
      var idx = Math.abs(Math.floor(pos.speedTarget % focusCount));
      if(idx !== shownFocus){
        shownFocus = idx;
        var src = focus.querySelectorAll("[data-fi]");
        for(var k=0;k<src.length;k++){
          src[k].style.display = (+src[k].getAttribute("data-fi") === idx) ? "" : "none";
        }
      }
    }
  }

  function tick(){
    if(!reduce){
      pos.target      += AUTO * pos.dir;
      pos.speedTarget += AUTO * pos.dir;
    }
    pos.current      += (pos.target - pos.current) * EASE;
    pos.speedCurrent += (pos.speedTarget - pos.speedCurrent) * EASE;
    draw();
    requestAnimationFrame(tick);
  }

  /* ── 휠 ── */
  stage.addEventListener("wheel", function(e){
    e.preventDefault();
    var amount = e.deltaY / H * 6;          /* 화면 높이 기준으로 환산 */
    pos.dir = e.deltaY === 0 ? pos.dir : (e.deltaY > 0 ? 1 : -1);
    pos.target      += amount;
    pos.speedTarget += amount;
  }, { passive:false });

  /* ── 손가락·마우스로 끌기 ── */
  stage.addEventListener("pointerdown", function(e){
    dragging = true; moved = 0; lastY = e.clientY;
    stage.classList.add("is-drag");
    if(e.pointerId != null){ try{ stage.setPointerCapture(e.pointerId); }catch(err){} }
  });
  stage.addEventListener("pointermove", function(e){
    if(!dragging) return;
    var dy = e.clientY - lastY;
    lastY = e.clientY;
    moved += Math.abs(dy);
    var amount = -dy / H * 6;
    pos.dir = amount >= 0 ? 1 : -1;
    pos.target      += amount;
    pos.speedTarget += amount;
  });
  function up(){ dragging = false; stage.classList.remove("is-drag"); }
  stage.addEventListener("pointerup", up);
  stage.addEventListener("pointercancel", up);

  /* 끌고 난 직후의 클릭은 "누른 것"이 아닙니다 */
  stage.addEventListener("click", function(e){
    if(moved > 8){ e.preventDefault(); e.stopPropagation(); }
  }, true);

  var rt;
  window.addEventListener("resize", function(){
    clearTimeout(rt); rt = setTimeout(function(){ measure(); draw(); }, 120);
  });

  measure();
  draw();
  requestAnimationFrame(tick);
})();
`;
