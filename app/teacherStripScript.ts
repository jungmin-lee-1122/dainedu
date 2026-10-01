// ═══════════════════════════════════════════════════════════
//  선생님 띠 — 과목 탭 + 가로 스크롤 슬라이드
//
//  · 3초마다 카드 한 장씩 부드럽게 넘어갑니다.
//  · 끝까지 가면 처음으로 되돌아옵니다.
//  · 좌우 화살표로 한 장씩 넘길 수 있고, 손가락/트랙패드로 밀어도 됩니다.
//  · 마우스를 올리거나 직접 스크롤하면 잠시 멈춥니다.
//  · 선생님이 적어 한 화면에 다 들어오면 아무것도 움직이지 않습니다.
// ═══════════════════════════════════════════════════════════
export const teacherStripScript = String.raw`
(function(){
  var view=document.getElementById("dnTeacherStrip"); if(!view) return;
  var scroller=view.querySelector(".ts-scroll");
  var track=view.querySelector(".ts-track");
  var empty=view.querySelector(".ts-empty");
  var sec=view.closest(".ts-sec");
  var tabs=sec?sec.querySelectorAll(".ts-tab"):[];
  var arrows=view.querySelectorAll(".ts-arrow");
  if(!scroller||!track) return;

  var origin=[].slice.call(track.children);   /* 원본 카드 */
  var cur="전체";
  var timer=null, holdUntil=0;
  var STEP_MS=3000;

  /* 카드 한 장 + 간격 */
  function stepW(){
    var card=track.querySelector(".ts-item");
    if(!card) return 0;
    var gap=parseFloat(getComputedStyle(track).columnGap||getComputedStyle(track).gap||"18")||18;
    return Math.round(card.getBoundingClientRect().width+gap);
  }
  function maxScroll(){ return Math.max(0, scroller.scrollWidth-scroller.clientWidth); }
  function go(left){
    try{ scroller.scrollTo({left:left,behavior:"smooth"}); }
    catch(e){ scroller.scrollLeft=left; }
  }

  function build(){
    while(track.firstChild) track.removeChild(track.firstChild);

    var list=origin.filter(function(n){
      return cur==="전체" || n.getAttribute("data-subject")===cur;
    });

    if(!list.length){
      if(empty) empty.hidden=false;
      view.classList.add("is-empty");
      return;
    }
    if(empty) empty.hidden=true;
    view.classList.remove("is-empty");

    list.forEach(function(n){ track.appendChild(n); });
    scroller.scrollLeft=0;
    sync();
  }

  /* 넘길 것이 없으면 화살표를 숨기고, 양 끝에서는 흐리게 */
  function sync(){
    var max=maxScroll();
    view.classList.toggle("is-static", max<=4);
    var x=scroller.scrollLeft;
    for(var k=0;k<arrows.length;k++){
      var isNext=arrows[k].getAttribute("data-dir")==="next";
      var end = isNext ? x>=max-2 : x<=2;
      arrows[k].classList.toggle("is-end", max>4 && end);
    }
  }

  function tick(){
    if(Date.now()<holdUntil) return;
    var max=maxScroll();
    if(max<=4) return;                       /* 한 화면에 다 들어옴 */
    var w=stepW(); if(!w) return;
    var next=scroller.scrollLeft+w;
    if(next>max-2) next=0;                   /* 끝에 닿으면 처음으로 */
    go(next);
  }

  function hold(ms){ holdUntil=Date.now()+(ms||4000); }

  /* 과목 탭 */
  for(var i=0;i<tabs.length;i++){
    (function(btn){
      btn.addEventListener("click",function(){
        for(var k=0;k<tabs.length;k++){
          tabs[k].classList.remove("is-on");
          tabs[k].setAttribute("aria-selected","false");
        }
        btn.classList.add("is-on");
        btn.setAttribute("aria-selected","true");
        cur=btn.getAttribute("data-subject")||"전체";
        build();
        hold(5000);
      });
    })(tabs[i]);
  }

  /* 좌우 화살표 */
  for(var a=0;a<arrows.length;a++){
    (function(btn){
      btn.addEventListener("click",function(){
        var w=stepW()||280, max=maxScroll();
        if(max<=4) return;
        /* 화살표는 한 칸씩만 움직이고, 끝에서는 멈춥니다.
           (끝에서 반대쪽으로 쭉 넘어가 버리지 않도록) */
        var next=scroller.scrollLeft+(btn.getAttribute("data-dir")==="next"?w:-w);
        if(next<0) next=0;
        if(next>max) next=max;
        go(next);
        hold(6000);
      });
    })(arrows[a]);
  }

  /* 사람이 보고 있으면 잠시 멈춤 */
  view.addEventListener("mouseenter",function(){ hold(1e9); });
  view.addEventListener("mouseleave",function(){ holdUntil=Date.now()+1200; });
  view.addEventListener("focusin",function(){ hold(1e9); });
  view.addEventListener("focusout",function(){ holdUntil=Date.now()+1200; });
  scroller.addEventListener("touchstart",function(){ hold(8000); },{passive:true});
  scroller.addEventListener("wheel",function(){ hold(6000); },{passive:true});

  var st;
  scroller.addEventListener("scroll",function(){ clearTimeout(st); st=setTimeout(sync,120); },{passive:true});

  var rt;
  window.addEventListener("resize",function(){ clearTimeout(rt); rt=setTimeout(sync,200); });
  document.addEventListener("visibilitychange",function(){ if(document.hidden) hold(1e9); else holdUntil=0; });

  build();
  if(!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)){
    timer=setInterval(tick,STEP_MS);
  }
})();
`;
