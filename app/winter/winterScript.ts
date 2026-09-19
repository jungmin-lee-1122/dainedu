// 2027 윈터스쿨 페이지 스크립트
import { mobileMenuScript } from "../mobileMenu";
export const winterScript = `
(function(){

/* ── 시계 · D-day ── */
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
})();

/* ── 스크롤 등장 ── */
(function(){
  var els=document.querySelectorAll(".wt-up");
  if(!els.length) return;
  if(!("IntersectionObserver" in window)){
    for(var i=0;i<els.length;i++) els[i].classList.add("is-in");
    return;
  }
  var io=new IntersectionObserver(function(es){
    es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("is-in"); io.unobserve(en.target); } });
  },{threshold:0.15,rootMargin:"0px 0px -6% 0px"});
  for(var k=0;k<els.length;k++) io.observe(els[k]);
})();

/* ── 숫자 카운트업 ── */
(function(){
  var nums=document.querySelectorAll(".wt-num");
  if(!nums.length) return;
  function run(el){
    var target=parseFloat(el.getAttribute("data-num")||"0");
    var dec=(el.getAttribute("data-num")||"").indexOf(".")>-1?1:0;
    var start=null, dur=1100;
    function step(ts){
      if(!start) start=ts;
      var p=Math.min(1,(ts-start)/dur);
      var eased=1-Math.pow(1-p,3);
      el.textContent=(target*eased).toFixed(dec);
      if(p<1) requestAnimationFrame(step);
      else el.textContent=target.toFixed(dec);
    }
    requestAnimationFrame(step);
  }
  if(!("IntersectionObserver" in window)){
    for(var i=0;i<nums.length;i++) run(nums[i]);
    return;
  }
  var io=new IntersectionObserver(function(es){
    es.forEach(function(en){ if(en.isIntersecting){ run(en.target); io.unobserve(en.target); } });
  },{threshold:0.6});
  for(var k=0;k<nums.length;k++) io.observe(nums[k]);
})();

/* ── 섹션 내비 고정 + 현재 위치 표시 ── */
(function(){
  var nav=document.getElementById("wtSnav"); if(!nav) return;
  var hero=document.querySelector(".wt-kv");
  var links=nav.querySelectorAll("a");
  function onScroll(){
    var y=window.scrollY||0;
    var h=hero?hero.offsetHeight-70:400;
    nav.classList.toggle("is-stuck",y>h);
    var cur="";
    for(var i=0;i<links.length;i++){
      var id=links[i].getAttribute("href");
      var el=document.querySelector(id);
      if(el && el.getBoundingClientRect().top<=140) cur=id;
    }
    for(var k=0;k<links.length;k++){
      links[k].classList.toggle("is-on",links[k].getAttribute("href")===cur);
    }
  }
  onScroll();
  window.addEventListener("scroll",onScroll,{passive:true});
})();

/* ── 후기 슬라이더 ── */
(function(){
  var root=document.getElementById("wtStories"); if(!root) return;
  var track=root.querySelector(".wt-stories-track");
  var items=track.children, pos=0;
  function step(){
    if(!items.length) return 0;
    var w=items[0].getBoundingClientRect().width;
    var gap=parseFloat(getComputedStyle(track).gap||"0")||0;
    return w+gap;
  }
  function maxPos(){
    var vis=Math.max(1,Math.round(root.clientWidth/step()));
    return Math.max(0,items.length-vis);
  }
  function apply(){
    pos=Math.min(pos,maxPos());
    track.style.transform="translateX("+(-pos*step())+"px)";
    var p=root.querySelector('[data-dir="prev"]'), n=root.querySelector('[data-dir="next"]');
    if(p) p.classList.toggle("is-off",pos<=0);
    if(n) n.classList.toggle("is-off",pos>=maxPos());
  }
  var btns=root.querySelectorAll(".wt-arrow");
  for(var i=0;i<btns.length;i++){
    btns[i].addEventListener("click",function(){
      pos+= this.getAttribute("data-dir")==="next" ? 1 : -1;
      pos=Math.max(0,Math.min(pos,maxPos()));
      apply();
    });
  }
  window.addEventListener("resize",apply);
  apply();
})();

/* ── 관리 시스템 탭 ── */
(function(){
  var box=document.getElementById("wtManageTabs"); if(!box) return;
  var tabs=box.querySelectorAll(".wt-mtab");
  var panels=document.querySelectorAll(".wt-mpanel");
  for(var i=0;i<tabs.length;i++){
    (function(btn){
      btn.addEventListener("click",function(){
        var t=btn.getAttribute("data-tab");
        for(var k=0;k<tabs.length;k++) tabs[k].classList.remove("is-on");
        btn.classList.add("is-on");
        for(var p=0;p<panels.length;p++){
          panels[p].classList.toggle("is-on",panels[p].getAttribute("data-panel")===t);
        }
      });
    })(tabs[i]);
  }
})();

/* ── 커리큘럼 탭 ── */
(function(){
  /* 학년별 시수표 탭 */
  (function(){
    var gbox=document.getElementById("wtGradeTabs"); if(!gbox) return;
    var gtabs=gbox.querySelectorAll(".wt-gtab");
    var gpanels=document.querySelectorAll(".wt-gpanel");
    for(var g=0;g<gtabs.length;g++){
      (function(btn){
        btn.addEventListener("click",function(){
          var v=btn.getAttribute("data-grade");
          for(var k=0;k<gtabs.length;k++){
            gtabs[k].classList.remove("is-on");
            gtabs[k].setAttribute("aria-selected","false");
          }
          btn.classList.add("is-on");
          btn.setAttribute("aria-selected","true");
          for(var p=0;p<gpanels.length;p++){
            gpanels[p].classList.toggle("is-on",gpanels[p].getAttribute("data-panel")===v);
          }
        });
      })(gtabs[g]);
    }
  })();

  var box=document.getElementById("wtCurTabs"); if(!box) return;
  var tabs=box.querySelectorAll(".wt-ctab");
  var panels=document.querySelectorAll(".wt-cpanel");
  for(var i=0;i<tabs.length;i++){
    (function(btn){
      btn.addEventListener("click",function(){
        var s=btn.getAttribute("data-subject");
        for(var k=0;k<tabs.length;k++) tabs[k].classList.remove("is-on");
        btn.classList.add("is-on");
        for(var p=0;p<panels.length;p++){
          panels[p].classList.toggle("is-on",panels[p].getAttribute("data-panel")===s);
        }
      });
    })(tabs[i]);
  }
})();

/* ── FAQ ── */
(function(){
  var box=document.getElementById("wtFaq"); if(!box) return;
  var items=box.querySelectorAll(".wt-faq-item");
  for(var i=0;i<items.length;i++){
    (function(item){
      item.querySelector(".wt-faq-q").addEventListener("click",function(){
        var open=item.classList.contains("is-open");
        for(var k=0;k<items.length;k++) items[k].classList.remove("is-open");
        if(!open) item.classList.add("is-open");
      });
    })(items[i]);
  }
})();

/* ── 모바일 학습 공간 자동 슬라이드 ── */
(function(){
  var root=document.getElementById("wtSpace"); if(!root) return;
  var cards=root.querySelectorAll(".wt-space-card"); if(cards.length<2) return;
  var mobile=window.matchMedia("(max-width: 900px)");
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
  var pos=0, timer=0, resumeTimer=0, scrollTimer=0, visible=false;

  function active(){
    for(var i=0;i<cards.length;i++) cards[i].classList.toggle("is-active",i===pos);
  }
  function nearest(){
    var center=root.scrollLeft+(root.clientWidth/2), best=0, dist=Infinity;
    for(var i=0;i<cards.length;i++){
      var cardCenter=cards[i].offsetLeft+(cards[i].offsetWidth/2);
      var nextDist=Math.abs(cardCenter-center);
      if(nextDist<dist){dist=nextDist;best=i;}
    }
    pos=best; active();
  }
  function move(){
    if(!mobile.matches||document.hidden) return;
    pos=(pos+1)%cards.length;
    active();
    var left=cards[pos].offsetLeft-(root.clientWidth-cards[pos].offsetWidth)/2;
    root.scrollTo({left:left,behavior:"smooth"});
  }
  function stop(){
    if(timer){clearInterval(timer);timer=0;}
  }
  function start(){
    stop();
    if(!visible||!mobile.matches||reduce.matches) return;
    timer=setInterval(move,3400);
  }
  function pause(){
    stop();
    if(resumeTimer){clearTimeout(resumeTimer);resumeTimer=0;}
  }
  function resume(){
    if(resumeTimer) clearTimeout(resumeTimer);
    resumeTimer=setTimeout(start,4800);
  }
  function reset(){
    pos=0; active();
    if(!mobile.matches) root.scrollLeft=0;
    start();
  }

  root.addEventListener("touchstart",pause,{passive:true});
  root.addEventListener("touchend",resume,{passive:true});
  root.addEventListener("pointerenter",pause);
  root.addEventListener("pointerleave",resume);
  root.addEventListener("scroll",function(){
    if(scrollTimer) clearTimeout(scrollTimer);
    scrollTimer=setTimeout(nearest,120);
  },{passive:true});
  document.addEventListener("visibilitychange",function(){ if(document.hidden) stop(); else start(); });
  window.addEventListener("resize",reset);
  active();
  if("IntersectionObserver" in window){
    var observer=new IntersectionObserver(function(entries){
      visible=entries[0].isIntersecting;
      if(visible) start(); else stop();
    },{threshold:0.28});
    observer.observe(root);
  }else{
    visible=true; start();
  }
})();

/* ── 하단 고정 CTA (배너 지나면 등장) ── */
(function(){
  var bar=document.getElementById("wtFixed"); if(!bar) return;
  var hero=document.querySelector(".wt-kv");
  function onScroll(){
    var y=window.scrollY||0;
    var h=hero?hero.offsetHeight*0.7:300;
    bar.classList.toggle("is-on",y>h);
  }
  onScroll();
  window.addEventListener("scroll",onScroll,{passive:true});
})();


/* ── 고정 헤더 높이 측정 + 탭바 붙음 상태 ── */
(function(){
  var nav=document.querySelector(".dn-nav");
  var kvnav=document.querySelector(".wt-kvnav");
  var root=document.documentElement;
  function measure(){
    if(nav) root.style.setProperty("--wt-navh", nav.offsetHeight+"px");
  }
  function onScroll(){
    if(!kvnav||!nav) return;
    var navBottom=nav.getBoundingClientRect().bottom;
    var kvTop=kvnav.getBoundingClientRect().top;
    kvnav.classList.toggle("is-stuck", kvTop<=navBottom+1);
  }
  measure(); onScroll();
  window.addEventListener("resize",function(){ measure(); onScroll(); });
  window.addEventListener("scroll",onScroll,{passive:true});
  window.addEventListener("load",measure);
})();

})();
${mobileMenuScript}
`;
