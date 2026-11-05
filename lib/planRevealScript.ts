// ═══════════════════════════════════════════════════════════
//  연간 로드맵 — 화면에 들어오면 띠가 차례로 차오릅니다.
//
//  · 먼저 is-armed 를 붙여 띠를 감춥니다(스크립트가 살아 있다는 표시).
//    스크립트가 안 돌면 is-armed 가 없어 그냥 다 보입니다 — 빈 표가 되지 않습니다.
//  · 화면에 들어오면 is-in 을 붙이고, 나머지는 CSS 가 합니다.
// ═══════════════════════════════════════════════════════════
export const planRevealScript = `
(function(){
  var frames = document.querySelectorAll(".pl-road-frame");
  if(!frames.length) return;

  var slow = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(slow) return;   /* 움직임을 줄이는 설정이면 그냥 보여 줍니다 */

  for(var i=0;i<frames.length;i++) frames[i].classList.add("is-armed");

  function show(el){ el.classList.add("is-in"); }

  function check(){
    var left = 0;
    for(var i=0;i<frames.length;i++){
      var f = frames[i];
      if(f.classList.contains("is-in")) continue;
      var r = f.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      if(r.top < vh * 0.86 && r.bottom > 0) show(f); else left++;
    }
    if(!left){ window.removeEventListener("scroll", check); }
  }

  window.addEventListener("scroll", check, { passive:true });
  window.addEventListener("resize", check);
  check();
  /* 혹시 스크롤 이벤트가 안 오는 환경이면 3초 뒤에는 보여 줍니다 */
  setTimeout(function(){ for(var i=0;i<frames.length;i++) show(frames[i]); }, 3000);
})();
`;
