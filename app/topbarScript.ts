// ═══════════════════════════════════════════════════════════
//  상단 안내 띠 높이 측정
//  띠가 화면에 실제로 보일 때만 그 높이만큼 내비게이션을 내립니다.
//  띠가 숨겨지면 높이가 0이 되어 상단 공백이 생기지 않습니다.
// ═══════════════════════════════════════════════════════════
export const topbarScript = String.raw`
(function(){
  var root=document.documentElement;

  function sync(){
    var tb=document.querySelector(".dn-topbar");
    var h=0;
    if(tb){
      var cs=getComputedStyle(tb);
      /* display:none · visibility:hidden 이면 높이를 0으로 봅니다 */
      if(cs.display!=="none" && cs.visibility!=="hidden" && cs.position==="fixed"){
        h=Math.round(tb.getBoundingClientRect().height);
      }
    }
    root.style.setProperty("--dn-topbarh", h+"px");
  }

  sync();
  window.addEventListener("load",sync);
  window.addEventListener("resize",sync);

  /* 띠가 나중에 숨겨지거나 지워져도 따라갑니다 */
  try{
    var mo=new MutationObserver(function(){ sync(); });
    mo.observe(document.documentElement,{childList:true,subtree:true,attributes:true,
      attributeFilter:["class","style","hidden"]});
    setTimeout(function(){ mo.disconnect(); sync(); },4000);
  }catch(e){}
})();
`;
