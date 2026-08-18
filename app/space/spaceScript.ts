// 시설 안내 페이지 스크립트 (미리보기 탭 · 등장 · 공통)
import { mobileMenuScript } from "../mobileMenu";
export const spaceScript = `
(function(){

/* ── 공간 미리보기 탭 ── */
(function(){
  var box=document.getElementById("spTabs"); if(!box) return;
  var tabs=box.querySelectorAll(".sp-tab");
  var panels=document.querySelectorAll(".sp-panel");
  for(var i=0;i<tabs.length;i++){
    (function(btn){
      btn.addEventListener("click",function(){
        var k=btn.getAttribute("data-tab");
        for(var j=0;j<tabs.length;j++) tabs[j].classList.remove("is-on");
        btn.classList.add("is-on");
        for(var p=0;p<panels.length;p++){
          panels[p].classList.toggle("is-on",panels[p].getAttribute("data-panel")===k);
        }
      });
    })(tabs[i]);
  }
})();

/* ── 인사 영상: 화면에 들어오면 재생, 나가면 정지 ── */
(function(){
  var vids=document.querySelectorAll(".sp-video video");
  if(!vids.length||!("IntersectionObserver" in window)) return;
  var io=new IntersectionObserver(function(es){
    es.forEach(function(en){
      var v=en.target;
      if(en.isIntersecting){ v.play().catch(function(){}); }
      else { v.pause(); }
    });
  },{threshold:0.4});
  for(var i=0;i<vids.length;i++) io.observe(vids[i]);
})();

/* ── 소리 켜기/끄기 ── */
(function(){
  var btns=document.querySelectorAll(".sp-mute");
  for(var i=0;i<btns.length;i++){
    (function(btn){
      btn.addEventListener("click",function(){
        var wrap=btn.closest(".sp-video");
        var v=wrap?wrap.querySelector("video"):null;
        if(!v) return;
        v.muted=!v.muted;
        btn.classList.toggle("is-off",v.muted);
        btn.setAttribute("aria-label", v.muted?"소리 켜기":"소리 끄기");
        if(!v.muted) v.play().catch(function(){});
      });
    })(btns[i]);
  }
})();

/* ── 스크롤 등장 ── */
(function(){
  var els=document.querySelectorAll(".sp-up");
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
