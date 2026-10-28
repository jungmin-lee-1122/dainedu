// ═══════════════════════════════════════════════════════════
//  강사 상세 — 들어오자마자 인물 박스가 화면에 오도록 내려줍니다.
//
//  · 주소에 #tdProfile 이 있으면 브라우저가 알아서 내려가고,
//    주소를 직접 치고 들어온 경우를 위해 여기서 한 번 더 맞춥니다.
//  · 사용자가 이미 스크롤을 내린 상태면 건드리지 않습니다.
//  · "움직임 줄이기" 설정이면 부드러운 이동 없이 바로 이동합니다.
//  · 내려가는 높이는 globals.css 의 scroll-margin-top 으로 조절합니다.
// ═══════════════════════════════════════════════════════════
export const focusProfileScript = `
(function(){
  var box = document.getElementById("tdProfile");
  if(!box) return;

  function go(){
    /* 이미 읽고 있던 위치가 있으면 그대로 둡니다 */
    if(window.scrollY > 40) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try{
      box.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    }catch(e){
      box.scrollIntoView(true);
    }
  }

  /* 사진·영상이 자리를 잡은 뒤 내려가야 위치가 어긋나지 않습니다 */
  if(document.readyState === "complete") setTimeout(go, 60);
  else window.addEventListener("load", function(){ setTimeout(go, 60); });
})();
`;
