// 윈터스쿨 페이지 스크립트 (스크롤 등장 · 시스템 단계 · 커리큘럼 탭 · 관리 목록 · FAQ)
export const winterScript = String.raw`
(function(){

/* ── 스크롤 등장 애니메이션 ── */
(function(){
  var els=document.querySelectorAll(".wt-reveal");
  if(!els.length) return;
  if(!("IntersectionObserver" in window)){
    for(var i=0;i<els.length;i++) els[i].classList.add("is-in");
    return;
  }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  },{threshold:0.12,rootMargin:"0px 0px -8% 0px"});
  for(var k=0;k<els.length;k++) io.observe(els[k]);
})();

/* ── 상단 내비: 스크롤 시 배경 ── */
(function(){
  var nav=document.querySelector(".wt-nav"); if(!nav) return;
  var on=function(){ nav.classList.toggle("is-solid",(window.scrollY||0)>60); };
  on(); window.addEventListener("scroll",on,{passive:true});
})();

/* ── 4) 시스템 4단계 (hover / click 활성) ── */
(function(){
  var box=document.getElementById("wtSteps"); if(!box) return;
  var steps=box.querySelectorAll(".wt-step");
  function on(idx){
    for(var i=0;i<steps.length;i++) steps[i].classList.toggle("is-on",i===idx);
  }
  for(var i=0;i<steps.length;i++){
    (function(el,idx){
      el.addEventListener("mouseenter",function(){ on(idx); });
      el.addEventListener("click",function(){ on(idx); });
      el.addEventListener("focus",function(){ on(idx); });
    })(steps[i],i);
  }
})();

/* ── 7-1) 관리 목록 활성 ── */
(function(){
  var list=document.getElementById("wtManage"); if(!list) return;
  var items=list.querySelectorAll("li");
  for(var i=0;i<items.length;i++){
    (function(el){
      el.addEventListener("mouseenter",function(){
        for(var k=0;k<items.length;k++) items[k].classList.remove("is-on");
        el.classList.add("is-on");
      });
    })(items[i]);
  }
})();

/* ── 7-2) 커리큘럼 과목 탭 ── */
(function(){
  var tabs=document.getElementById("wtCurTabs"); if(!tabs) return;
  var btns=tabs.querySelectorAll(".wt-cur-tab");
  var panels=document.querySelectorAll(".wt-cur-panel");
  for(var i=0;i<btns.length;i++){
    (function(btn){
      btn.addEventListener("click",function(){
        var subject=btn.getAttribute("data-subject");
        for(var k=0;k<btns.length;k++) btns[k].classList.remove("is-on");
        btn.classList.add("is-on");
        for(var p=0;p<panels.length;p++){
          panels[p].classList.toggle("is-on",panels[p].getAttribute("data-panel")===subject);
        }
      });
    })(btns[i]);
  }
})();

/* ── 9-3) FAQ 아코디언 ── */
(function(){
  var box=document.getElementById("wtFaq"); if(!box) return;
  var items=box.querySelectorAll(".wt-faq-item");
  for(var i=0;i<items.length;i++){
    (function(item){
      var q=item.querySelector(".wt-faq-q");
      q.addEventListener("click",function(){
        var open=item.classList.contains("is-open");
        for(var k=0;k<items.length;k++) items[k].classList.remove("is-open");
        if(!open) item.classList.add("is-open");
      });
    })(items[i]);
  }
})();

})();
`;
