// ═══════════════════════════════════════════════════════════
//  셔틀 안내 — 노선 탭 전환
//  노선이 늘어나도 코드는 그대로 둬도 됩니다 (shuttleData.ts 만 수정).
// ═══════════════════════════════════════════════════════════
export const shuttleScript = `
(function(){
  var tabs = document.querySelectorAll("[data-route-tab]");
  var panels = document.querySelectorAll("[data-route-panel]");
  if(!tabs.length) return;

  function show(id){
    for(var i=0;i<tabs.length;i++){
      var on = tabs[i].getAttribute("data-route-tab") === id;
      tabs[i].classList.toggle("is-on", on);
      tabs[i].setAttribute("aria-selected", on ? "true" : "false");
    }
    for(var j=0;j<panels.length;j++){
      panels[j].hidden = panels[j].getAttribute("data-route-panel") !== id;
    }
  }

  for(var i=0;i<tabs.length;i++){
    (function(btn){
      btn.addEventListener("click", function(){
        show(btn.getAttribute("data-route-tab"));
      });
    })(tabs[i]);
  }
})();
`;
