// 공지사항 페이지 스크립트 (시계 · D-day · 푸터 드롭다운 · 퀵메뉴 · 등장)
import { mobileMenuScript } from "../mobileMenu";

export const noticeScript = `
(function(){

/* ═══════ 목록 등장 ═══════ */
(function(){
  var SEL=".nt-item";
  if(!("IntersectionObserver" in window)){
    var all=document.querySelectorAll(SEL);
    for(var i=0;i<all.length;i++) all[i].classList.add("is-in");
    return;
  }
  var io=new IntersectionObserver(function(es){
    es.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  },{threshold:.1,rootMargin:"0px 0px -30px 0px"});

  function watch(root){
    if(!root||root.nodeType!==1) return;
    if(root.matches&&root.matches(SEL)&&!root.classList.contains("is-in")) io.observe(root);
    var list=root.querySelectorAll?root.querySelectorAll(SEL):[];
    for(var k=0;k<list.length;k++){
      if(!list[k].classList.contains("is-in")) io.observe(list[k]);
    }
  }
  watch(document.body);

  if("MutationObserver" in window){
    new MutationObserver(function(muts){
      for(var m=0;m<muts.length;m++){
        var added=muts[m].addedNodes;
        for(var n=0;n<added.length;n++) watch(added[n]);
      }
    }).observe(document.body,{childList:true,subtree:true});
  }

  setTimeout(function(){
    var left=document.querySelectorAll(SEL+":not(.is-in)");
    for(var q=0;q<left.length;q++){
      var r=left[q].getBoundingClientRect();
      if(r.top<window.innerHeight&&r.bottom>0) left[q].classList.add("is-in");
    }
  },1200);
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
