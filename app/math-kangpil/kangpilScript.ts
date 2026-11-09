// ═══════════════════════════════════════════════════════════
//  수학 특강 페이지 — 스크롤하면 요소가 은은하게 올라옵니다.
//
//  스크립트가 안 돌면 .is-in 이 안 붙어 안 보이는 사고가 납니다.
//  그래서 감추는 is-armed 를 스크립트가 직접 붙이고,
//  IntersectionObserver + 스크롤 + 안전장치로 3중으로 받습니다.
// ═══════════════════════════════════════════════════════════
export const kangpilScript = `
(function(){
  var els = Array.prototype.slice.call(document.querySelectorAll(".kp-up"));
  if(!els.length) return;

  var slow = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(slow){ els.forEach(function(e){ e.classList.add("is-in"); }); return; }

  function near(el){
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * 0.9 && r.bottom > 0;
  }
  function show(el){ el.classList.add("is-in"); }

  els.forEach(function(el){ if(near(el)) show(el); });

  var waiting = els.filter(function(el){ return !el.classList.contains("is-in"); });
  if(!waiting.length) return;

  function sweep(){
    waiting = waiting.filter(function(el){
      if(near(el)){ show(el); return false; }
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
    }, { threshold: 0.1 });
    waiting.forEach(function(el){ io.observe(el); });
  }
  window.addEventListener("scroll", sweep, true);
  window.addEventListener("resize", sweep);

  /* 끝내 신호가 안 오면 그냥 보여 줍니다 */
  setTimeout(function(){ els.forEach(show); }, 8000);
})();
`;
