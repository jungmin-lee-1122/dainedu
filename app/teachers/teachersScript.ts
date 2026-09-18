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

/* ── 스크롤 등장 ──
   과목 탭을 누르면 페이지를 새로 읽지 않고 카드만 바뀝니다.
   그래서 새로 생긴 카드도 자동으로 감시에 등록되도록 해야 합니다.
   (이 처리가 없으면 탭을 바꿨을 때 카드가 투명한 채로 안 보입니다) */
(function(){
  var SEL=".tc-up";

  if(!("IntersectionObserver" in window)){
    var all=document.querySelectorAll(SEL);
    for(var i=0;i<all.length;i++) all[i].classList.add("is-in");
    return;
  }

  var io=new IntersectionObserver(function(es){
    es.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  },{threshold:0.12,rootMargin:"0px 0px -6% 0px"});

  function watch(root){
    if(!root||root.nodeType!==1) return;
    if(root.matches && root.matches(SEL) && !root.classList.contains("is-in")) io.observe(root);
    var list=root.querySelectorAll?root.querySelectorAll(SEL):[];
    for(var k=0;k<list.length;k++){
      if(!list[k].classList.contains("is-in")) io.observe(list[k]);
    }
  }

  watch(document.body);

  /* 카드가 새로 그려지면 다시 등록 */
  if("MutationObserver" in window){
    new MutationObserver(function(muts){
      for(var m=0;m<muts.length;m++){
        var added=muts[m].addedNodes;
        for(var n=0;n<added.length;n++) watch(added[n]);
      }
    }).observe(document.body,{childList:true,subtree:true});
  }

  /* 혹시 감시가 늦게 걸려 빈 화면이 남는 경우를 대비한 안전장치 */
  setTimeout(function(){
    var left=document.querySelectorAll(SEL+":not(.is-in)");
    for(var q=0;q<left.length;q++){
      var r=left[q].getBoundingClientRect();
      if(r.top<window.innerHeight&&r.bottom>0) left[q].classList.add("is-in");
    }
  },1200);
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
