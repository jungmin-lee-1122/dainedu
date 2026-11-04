// ═══════════════════════════════════════════════════════════
//  포르타 · 클라비스 카드 — 마우스를 따라다니는 빛
//
//  · 카드 위에서 마우스가 움직이면 그 위치를 CSS 변수(--mx, --my)에
//    넣어 주고, 실제로 빛을 그리는 일은 CSS 가 합니다.
//  · 손가락으로 쓰는 기기에서는 동작하지 않습니다(마우스가 없으므로).
//  · 매 움직임마다 계산하지 않고 화면 그리는 주기에 맞춰 한 번만 반영합니다.
// ═══════════════════════════════════════════════════════════
export const hallGlowScript = `
(function(){
  var cards = document.querySelectorAll(".dn-hall-card");
  if(!cards.length) return;
  /* 마우스가 없는 기기(휴대폰·태블릿)에서는 켜지 않습니다 */
  if(window.matchMedia && !window.matchMedia("(hover: hover)").matches) return;
  if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  for(var i=0;i<cards.length;i++){
    (function(card){
      var pending = false, px = 0, py = 0;

      function paint(){
        pending = false;
        card.style.setProperty("--mx", px + "px");
        card.style.setProperty("--my", py + "px");
      }

      card.addEventListener("mousemove", function(e){
        var r = card.getBoundingClientRect();
        px = e.clientX - r.left;
        py = e.clientY - r.top;
        if(!pending){ pending = true; requestAnimationFrame(paint); }
      });

      card.addEventListener("mouseenter", function(){ card.classList.add("is-lit"); });
      card.addEventListener("mouseleave", function(){ card.classList.remove("is-lit"); });
    })(cards[i]);
  }
})();
`;
