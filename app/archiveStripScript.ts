// ═══════════════════════════════════════════════════════════
//  입시자료 · 소식 — 모바일 자동 넘김
//
//  · 모바일(900px 이하)에서만 동작합니다. PC 는 목록이라 움직이지 않습니다.
//  · 5.5초마다 카드 한 장씩 부드럽게 넘어가고, 끝에 닿으면 처음으로 돌아옵니다.
//  · 손으로 밀면 잠시 멈췄다가 다시 흐릅니다.
//  · 화면에 보이지 않을 때는 멈춥니다.
// ═══════════════════════════════════════════════════════════
export const archiveStripScript = String.raw`
(function(){
  var list=document.querySelector(".cv-arc-list"); if(!list) return;
  var mobile=window.matchMedia("(max-width: 900px)");
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
  var STEP_MS=5500;
  var timer=0, holdUntil=0, visible=false;

  function stepW(){
    var card=list.querySelector("li");
    if(!card) return 0;
    var gap=parseFloat(getComputedStyle(list).columnGap||getComputedStyle(list).gap||"12")||12;
    return Math.round(card.getBoundingClientRect().width+gap);
  }
  function maxScroll(){ return Math.max(0, list.scrollWidth-list.clientWidth); }

  function tick(){
    if(!mobile.matches || document.hidden || !visible) return;
    if(Date.now()<holdUntil) return;
    var max=maxScroll(); if(max<=4) return;
    var w=stepW(); if(!w) return;
    var next=list.scrollLeft+w;
    if(next>max-2) next=0;              /* 끝에 닿으면 처음으로 */
    try{ list.scrollTo({left:next,behavior:"smooth"}); }
    catch(e){ list.scrollLeft=next; }
  }

  function hold(ms){ holdUntil=Date.now()+(ms||7000); }

  list.addEventListener("touchstart",function(){ hold(9000); },{passive:true});
  list.addEventListener("wheel",function(){ hold(7000); },{passive:true});
  list.addEventListener("pointerdown",function(){ hold(9000); },{passive:true});

  /* 화면에 들어왔을 때만 돌립니다 */
  try{
    var io=new IntersectionObserver(function(es){
      visible=es[0].isIntersecting;
    },{threshold:.25});
    io.observe(list);
  }catch(e){ visible=true; }

  if(!reduce.matches) timer=setInterval(tick, STEP_MS);
})();
`;
