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
  /* 원본은 0.015 / 0.4 인데 우리 화면에서는 어지러워서 절반 이하로 낮췄습니다.
     더 느리게 하려면 AUTO 를, 비틀림을 줄이려면 TWIST 를 내리세요. */
  var AUTO     = 0.006;   /* 가만히 둘 때 저절로 흐르는 양(프레임당) */
  var TWIST    = 0.28;    /* 속도가 비틀림으로 바뀌는 비율 */
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

  /* ── 펼쳐지며 등장 ──
     스크롤해서 이 섹션이 보이면, 사진들이 한가운데에서 바깥으로
     차례차례 날아가 원통 벽에 붙습니다. */
  var IN_STAGGER = 1.25;  /* 첫 장과 마지막 장 사이의 시간차(초) */
  var IN_DUR     = 1.35;  /* 한 장이 제자리를 찾는 데 걸리는 시간(초) */
  var IN_SPIN    = 0.55;  /* 날아오면서 함께 돌아가는 각도(라디안) */
  var IN_FROM    = 0.34;  /* 처음 반지름 (1 = 제자리). 0 이면 한 점에 뭉쳐 어지럽습니다 */

  var intro = { armed:false, t0:0, done:false };

  /* 끝에서 아주 부드럽게 멎습니다. 튕기는 맛(backOut)을 쓰면
     90장이 동시에 출렁여서 정신이 없었습니다. */
  function easeOut(x){ var k = 1 - x; return 1 - k*k*k*k*k; }

  var H=0, W=0, P=0;
  var pos = { target:0, current:0, speedTarget:0, speedCurrent:0, dir:1 };
  var dragging=false, lastY=0, moved=0;

  /* ── 한가운데 카드 ──
     선생님 수만큼 사진을 겹쳐 두면(20장이면 20장) 전부 메모리에 올라가
     프레임이 끊깁니다. 앞뒤 두 장만 두고 번갈아 바꿔 끼웁니다.
     사진 주소는 타일과 같아서 이미 받아 둔 것을 다시 씁니다. */
  var people = [];
  try {
    var box = document.getElementById("vxData");
    if(box) people = JSON.parse(box.textContent || "[]");
  } catch(err) { people = []; }

  var faces = focus ? focus.querySelectorAll(".vx-focus-face") : [];
  var slot = 0, shownFocus = 0, lastSwap = 0;

  function swapFocus(i){
    var p = people[i];
    if(!p) return;
    shownFocus = i;
    var next = faces[1 - slot];
    var img = next.querySelector("img");
    if(img && img.getAttribute("src") !== p.photo){
      img.setAttribute("src", p.photo);
      img.setAttribute("alt", p.name + " 선생님");
    }
    next.querySelector(".vx-focus-sub").textContent = p.subject || "";
    next.querySelector(".vx-focus-name").textContent = p.name || "";
    next.querySelector(".vx-focus-school").textContent = p.school || "";
    next.classList.add("is-on");
    faces[slot].classList.remove("is-on");
    slot = 1 - slot;
  }

  function mod(a,b){ return ((a % b) + b) % b; }

  function measure(){
    var r = stage.getBoundingClientRect();
    H = r.height; W = r.width;
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

  function draw(now){
    var scrollY = pos.current;
    var twist   = pos.speedCurrent * TWIST;

    /* 펼쳐지는 중인가 — 0 이면 아직 안 보임, 1 이면 제자리 */
    var el = intro.armed ? (now - intro.t0) / 1000 : -1;

    for(var d=0; d<TOTAL; d++){
      var t = tiles[d];
      var L = d % LEVELS;

      /* 한 바퀴를 돌며 차례차례 날아가도록 순서대로 시간차를 둡니다 */
      var p = 1;
      if(!intro.done){
        p = (el - (d / TOTAL) * IN_STAGGER) / IN_DUR;
        p = p < 0 ? 0 : (p > 1 ? 1 : p);
        if(p <= 0){
          if(!t._off){ t.style.display = "none"; t._off = 1; }
          continue;
        }
      }
      var pe = easeOut(p);
      /* 한 점이 아니라 작은 고리에서 시작해 부드럽게 벌어집니다 */
      var radius = RADIUS * (IN_FROM + (1 - IN_FROM) * pe);

      /* 원본과 같은 나선 배치: 각도는 전체 개수로 고르게, 높이는 층으로 */
      var theta = (d / TOTAL) * Math.PI * 2 + twist * levelSpeed[L]
                + (1 - pe) * IN_SPIN;

      /* 위로 흐르다가 끝에서 되돌아옵니다 */
      var y0 = L * SPACING - ZRANGE/2;
      var wy = (mod(y0 + scrollY + ZRANGE/2, ZRANGE) - ZRANGE/2) * pe;

      var wx = Math.cos(theta) * radius;
      var wz = Math.sin(theta) * radius;

      /* 카메라에서 얼마나 멀리 있나 (카메라는 +Z 쪽 CAM_Z 에서 -Z 를 봅니다) */
      var dist = CAM_Z - wz;

      /* ── 안 보이는 것은 아예 그리지 않습니다 ──
         원통은 한 바퀴가 다 있지만, 실제로 화면에 걸리는 건 1/3 남짓입니다.
         나머지까지 매 프레임 그리면 끊깁니다. */
      var hide = dist < 1.2;
      if(!hide){
        var sx = wx * P / dist;                       /* 화면 중앙 기준 가로 위치 */
        var sy = -wy * P / dist;                      /* 세로 위치 */
        var hw = CARD_W * P / (2 * dist);             /* 화면에 찍히는 반쪽 너비 */
        var hh = (CARD_W / ASPECT) * P / (2 * dist);
        if(sx > W/2 + hw || sx < -W/2 - hw ||
           sy > H/2 + hh || sy < -H/2 - hh) hide = true;
      }
      if(hide){
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
        " rotateY(" + rot.toFixed(2) + "deg)" +
        (p < 1 ? " scale(" + (0.78 + 0.22*pe).toFixed(3) + ")" : "");

      if(p < 1){ t.style.opacity = pe.toFixed(3); }
      else if(t._fade !== 1){ t.style.opacity = "1"; t._fade = 1; }
    }

    /* 마지막 장까지 자리를 잡으면 펼침 계산을 멈춥니다 */
    if(intro.armed && !intro.done && el > IN_STAGGER + IN_DUR + 0.1){
      intro.done = true;
    }

    /* 한가운데 카드에 보일 선생님 바꾸기 */
    if(faces.length === 2 && people.length > 1){
      var idx = Math.abs(Math.floor(pos.speedTarget % people.length));
      /* 빠르게 끌면 번호가 마구 튀어 깜박거립니다 — 최소 간격을 둡니다 */
      if(idx !== shownFocus && now - lastSwap > 900){
        lastSwap = now;
        swapFocus(idx);
      }
    }
  }

  function tick(now){
    if(!intro.armed) checkInView();
    if(!reduce){
      pos.target      += AUTO * pos.dir;
      pos.speedTarget += AUTO * pos.dir;
    }
    pos.current      += (pos.target - pos.current) * EASE;
    pos.speedCurrent += (pos.speedTarget - pos.speedCurrent) * EASE;
    draw(now || 0);
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

  /* ── 펼침 시작 조건: 사진이 다 왔고 + 화면에 들어왔을 때 ──
     둘 중 하나라도 안 되면 기다립니다. 사진이 덜 온 채로 터지면
     빈 네모가 날아다니고, 화면 밖에서 터지면 아무도 못 봅니다. */
  var imagesReady = false, inView = false;

  function maybeStart(){
    if(intro.armed || !imagesReady || !inView) return;
    intro.armed = true;
    intro.t0 = performance.now();
    stage.classList.add("is-intro");
    if(reduce){ intro.done = true; }   /* 움직임을 줄이는 설정이면 바로 완성형 */
  }

  (function waitImages(){
    var imgs = stage.querySelectorAll("img");
    var left = imgs.length;
    if(!left){ imagesReady = true; maybeStart(); return; }
    var settled = false;
    function one(){
      if(--left > 0 || settled) return;
      settled = true; imagesReady = true; maybeStart();
    }
    for(var i=0;i<imgs.length;i++){
      if(imgs[i].complete){ one(); }
      else { imgs[i].addEventListener("load", one); imgs[i].addEventListener("error", one); }
    }
    /* 한 장이 끝내 안 오더라도 2.5초 뒤에는 시작합니다 */
    setTimeout(function(){
      if(settled) return;
      settled = true; imagesReady = true; maybeStart();
    }, 2500);
  })();

  /* 화면에 들어왔는지는 매 프레임 직접 재 봅니다.
     IntersectionObserver 는 iframe·미리보기 같은 환경에서 끝내 안 울리는
     경우가 있어, 그러면 화면이 영영 비어 있게 됩니다. */
  function checkInView(){
    if(inView) return;
    var r = stage.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if(r.top < vh * 0.8 && r.bottom > vh * 0.15){ inView = true; maybeStart(); }
  }
  window.addEventListener("scroll", checkInView, { passive:true });
  window.addEventListener("resize", checkInView);
  /* 그래도 안 되면 5초 뒤에는 무조건 보여 줍니다 */
  setTimeout(function(){ inView = true; imagesReady = true; maybeStart(); }, 5000);

  /* 탭을 숨겼다 돌아오면 그 사이 시간이 다 흘러 버려 펼침을 놓칩니다.
     돌아온 순간부터 다시 세어 줍니다. */
  document.addEventListener("visibilitychange", function(){
    if(!document.hidden && intro.armed && !intro.done){ intro.t0 = performance.now(); }
  });

  measure();
  checkInView();
  draw(performance.now());
  requestAnimationFrame(tick);
})();
`;
