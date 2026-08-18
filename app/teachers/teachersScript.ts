// 강사진 페이지 스크립트 (과목 필터 · 등장 · 시계 · D-day · 공통)
import { mobileMenuScript } from "../mobileMenu";
export const teachersScript = `
(function(){

/* ── 과목 필터 ── */
(function(){
  var box=document.getElementById("tcFilter"); if(!box) return;
  var btns=box.querySelectorAll(".tc-filter-btn");
  var cards=document.querySelectorAll("#tcGrid .tc-card");
  var count=document.getElementById("tcCount");
  function apply(subject){
    var shown=0;
    for(var i=0;i<cards.length;i++){
      var ok = subject==="전체" || cards[i].getAttribute("data-subject")===subject;
      cards[i].style.display = ok ? "" : "none";
      if(ok) shown++;
    }
    if(count) count.textContent=String(shown);
  }
  for(var k=0;k<btns.length;k++){
    (function(btn){
      btn.addEventListener("click",function(){
        for(var j=0;j<btns.length;j++) btns[j].classList.remove("is-on");
        btn.classList.add("is-on");
        apply(btn.getAttribute("data-subject"));
      });
    })(btns[k]);
  }
})();

/* ── 스크롤 등장 ── */
(function(){
  var els=document.querySelectorAll(".tc-up");
  if(!els.length) return;
  if(!("IntersectionObserver" in window)){
    for(var i=0;i<els.length;i++) els[i].classList.add("is-in");
    return;
  }
  var io=new IntersectionObserver(function(es){
    es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("is-in"); io.unobserve(en.target); } });
  },{threshold:0.12,rootMargin:"0px 0px -6% 0px"});
  for(var k=0;k<els.length;k++) io.observe(els[k]);
})();

/* ── 시계 · D-day · 푸터 드롭다운 · 맨 위로 ── */
(function(){
  var els=document.querySelectorAll(".js-clock");
  if(els.length){
    var p=function(x){return (x<10?"0":"")+x;};
    var tick=function(){
      var d=new Date(), t=p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds());
      for(var i=0;i<els.length;i++) els[i].textContent=t;
    };
    tick(); setInterval(tick,1000);
  }
  var num=document.getElementById("dnDdayNum");
  if(num){
    var cap=document.getElementById("dnDdayCap");
    var S=new Date(2026,10,19); S.setHours(0,0,0,0);
    var now=new Date(); now.setHours(0,0,0,0);
    var d=Math.round((S-now)/86400000);
    num.textContent = d>0 ? ("D-"+d) : (d===0?"D-DAY":("D+"+(-d)));
    if(cap) cap.textContent=(S.getFullYear()+1)+"학년도 수능";
  }
  var w=document.querySelector(".dn-foot-tel-wrap");
  if(w){
    var b=w.querySelector(".dn-foot-tel");
    b.addEventListener("click",function(e){ e.stopPropagation(); var o=w.classList.toggle("is-open"); b.setAttribute("aria-expanded",o?"true":"false"); });
    document.addEventListener("click",function(e){ if(!w.contains(e.target)){ w.classList.remove("is-open"); b.setAttribute("aria-expanded","false"); } });
  }
  var top=document.querySelector(".dn-quick-top");
  if(top) top.addEventListener("click",function(){ window.scrollTo({top:0,behavior:"smooth"}); });
})();

})();
${mobileMenuScript}
`;
