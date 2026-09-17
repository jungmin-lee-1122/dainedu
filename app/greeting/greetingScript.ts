// 인사말 페이지 스크립트 (등장 애니메이션 + 시계 + D-day + 공용 동작)
import { mobileMenuScript } from "../mobileMenu";

export const greetingScript = `
(function(){

/* ═══════ 스크롤 등장 ═══════ */
(function(){
  var els=document.querySelectorAll(".gr-up,.gr-hero-line");
  if(!els.length) return;
  if(!("IntersectionObserver" in window)){
    for(var i=0;i<els.length;i++) els[i].classList.add("is-in");
    return;
  }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  },{threshold:.15,rootMargin:"0px 0px -50px 0px"});
  for(var k=0;k<els.length;k++) io.observe(els[k]);
})();

/* ═══════ 시계 ═══════ */
(function(){
  var els=document.querySelectorAll(".js-clock"); if(!els.length) return;
  function p(x){return (x<10?"0":"")+x;}
  function tick(){
    var d=new Date(), t=p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds());
    for(var i=0;i<els.length;i++) els[i].textContent=t;
  }
  tick(); setInterval(tick,1000);
})();

/* ═══════ 수능 D-day ═══════ */
(function(){
  var num=document.getElementById("dnDdayNum"); if(!num) return;
  var cap=document.getElementById("dnDdayCap");
  var SUNEUNG=new Date(2026,10,19);
  SUNEUNG.setHours(0,0,0,0);
  var now=new Date(); now.setHours(0,0,0,0);
  var d=Math.round((SUNEUNG-now)/86400000);
  num.textContent = d>0 ? ("D-"+d) : (d===0?"D-DAY":("D+"+(-d)));
  if(cap) cap.textContent=(SUNEUNG.getFullYear()+1)+"학년도 수능";
})();

/* ═══════ 푸터 대표번호 드롭다운 ═══════ */
(function(){
  var w=document.querySelector(".dn-foot-tel-wrap"); if(!w) return;
  var btn=w.querySelector(".dn-foot-tel");
  btn.addEventListener("click",function(e){
    e.stopPropagation();
    var open=w.classList.toggle("is-open");
    btn.setAttribute("aria-expanded",open?"true":"false");
  });
  document.addEventListener("click",function(e){
    if(!w.contains(e.target)){ w.classList.remove("is-open"); btn.setAttribute("aria-expanded","false"); }
  });
})();

/* ═══════ 퀵메뉴 맨 위로 ═══════ */
(function(){
  var t=document.querySelector(".dn-quick-top"); if(!t) return;
  t.addEventListener("click",function(){ window.scrollTo({top:0,behavior:"smooth"}); });
})();

})();

${mobileMenuScript}
`;
