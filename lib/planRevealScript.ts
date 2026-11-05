// ═══════════════════════════════════════════════════════════
//  연간 로드맵 — 화면에 들어오면 띠가 차례로 차오릅니다.
//
//  【안 보이는 사고를 막는 3중 장치】
//   1) IntersectionObserver 로 봅니다 — 창 스크롤이든 안쪽 스크롤이든 다 잡힙니다.
//   2) 그래도 못 쓰는 환경이면 scroll 이벤트 + 위치 재기로 받습니다.
//   3) 그래도 신호가 안 오면 8초 뒤에는 무조건 보여 줍니다.
//  숨기는 is-armed 는 "보여 줄 방법이 확실할 때만" 붙입니다.
//  스크립트가 아예 안 돌면 is-armed 가 없어 처음부터 다 보입니다.
// ═══════════════════════════════════════════════════════════
export const planRevealScript = `
(function(){
  var frames = Array.prototype.slice.call(document.querySelectorAll(".pl-road-frame"));
  if(!frames.length) return;

  var slow = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(slow) return;   /* 움직임을 줄이는 설정이면 그냥 보여 줍니다 */

  function show(f){ f.classList.add("is-in"); }
  function armed(f){ f.classList.add("is-armed"); }

  /* 화면 안에 들어와 있나 */
  function near(f){
    var r = f.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * 0.88 && r.bottom > 0;
  }

  frames.forEach(function(f){
    if(near(f)){ armed(f); requestAnimationFrame(function(){ show(f); }); return; }
    armed(f);
  });

  var waiting = frames.filter(function(f){ return !f.classList.contains("is-in"); });
  if(!waiting.length) return;

  function sweep(){
    waiting = waiting.filter(function(f){
      if(near(f)){ show(f); return false; }
      return true;
    });
    if(!waiting.length){
      window.removeEventListener("scroll", sweep, true);
      window.removeEventListener("resize", sweep);
    }
  }

  if(window.IntersectionObserver){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ show(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    waiting.forEach(function(f){ io.observe(f); });
  }

  /* 스크롤은 캡처 단계로 받습니다 — 안쪽 상자가 스크롤돼도 잡힙니다 */
  window.addEventListener("scroll", sweep, true);
  window.addEventListener("resize", sweep);

  /* 마지막 안전장치 — 어떤 이유로든 신호가 끝내 안 오면 그냥 보여 줍니다.
     (너무 빨리 풀면 스크롤 효과가 사라지므로 넉넉히 둡니다) */
  setTimeout(function(){ frames.forEach(show); }, 8000);
})();
`;
