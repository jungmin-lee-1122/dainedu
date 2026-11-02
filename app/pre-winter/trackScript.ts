// ═══════════════════════════════════════════════════════════
//  PRE 윈터스쿨 — 대상(예비 고1 / 예비 고2·고3) 전환
//
//  · 탭을 누르면 해당 과정 내용만 보이고 나머지는 숨깁니다.
//  · 주소 뒤에 #go23 을 붙이면 그 과정이 바로 열립니다.
//    (광고나 문자에서 특정 학년만 바로 보여줄 때 씁니다)
// ═══════════════════════════════════════════════════════════
export const trackScript = `
(function(){
  var tabs = document.querySelectorAll("[data-track-tab]");
  var panels = document.querySelectorAll("[data-track-panel]");
  if(!tabs.length || !panels.length) return;

  function show(id){
    for(var i=0;i<tabs.length;i++){
      var on = tabs[i].getAttribute("data-track-tab") === id;
      tabs[i].classList.toggle("is-on", on);
      tabs[i].setAttribute("aria-selected", on ? "true" : "false");
    }
    for(var j=0;j<panels.length;j++){
      var mine = panels[j].getAttribute("data-track-panel") === id;
      panels[j].hidden = !mine;
      if(mine){
        /* 숨어 있던 동안 등장 효과가 지나갔을 수 있어 다시 보여 줍니다 */
        var ups = panels[j].querySelectorAll(".wt-up");
        for(var k=0;k<ups.length;k++) ups[k].classList.add("is-in");
      }
    }
  }

  for(var i=0;i<tabs.length;i++){
    (function(btn){
      btn.addEventListener("click", function(){
        var id = btn.getAttribute("data-track-tab");
        show(id);
        if(history.replaceState) history.replaceState(null, "", "#" + id);
      });
    })(tabs[i]);
  }

  /* 주소에 #go1 / #go23 이 있으면 그 과정으로 시작합니다 */
  var want = (location.hash || "").replace("#","");
  var found = false;
  for(var i=0;i<tabs.length;i++){
    if(tabs[i].getAttribute("data-track-tab") === want) found = true;
  }
  if(found) show(want);
})();
`;
