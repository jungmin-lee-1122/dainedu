// 2027 윈터스쿨 페이지 스크립트
export const winterScript = String.raw`
(function(){

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
  var hero=document.querySelector(".wt-hero");
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

/* ── 하단 고정 CTA (히어로 지나면 등장) ── */
(function(){
  var bar=document.getElementById("wtFixed"); if(!bar) return;
  var hero=document.querySelector(".wt-hero");
  function onScroll(){
    var y=window.scrollY||0;
    var h=hero?hero.offsetHeight*0.7:300;
    bar.classList.toggle("is-on",y>h);
  }
  onScroll();
  window.addEventListener("scroll",onScroll,{passive:true});
})();

})();
`;
