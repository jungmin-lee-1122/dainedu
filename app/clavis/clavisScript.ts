// 고등 클라비스 페이지 스크립트 (슬라이더 엔진 + 시계 + D-day)
import { mobileMenuScript } from "../mobileMenu";
export const clavisScript = `
(function(){

/* ═══════ 공용: 페이드형 슬라이더 (메인 배너 / 사이드 배너) ═══════ */
function fadeSlider(opt){
  var root=document.getElementById(opt.id); if(!root) return null;
  var slides=root.querySelectorAll(opt.slide);
  var n=slides.length; if(!n) return null;
  var i=0, timer=null, playing=true;
  var tabs=opt.tabSel?root.querySelectorAll(opt.tabSel):[];
  var dotsBox=opt.dots?document.getElementById(opt.dots):null;
  var dots=[];
  if(dotsBox){
    for(var k=0;k<n;k++){
      var b=document.createElement("button");
      b.type="button"; b.className="cv-dot";
      b.setAttribute("aria-label",(k+1)+"번째 배너");
      (function(idx){b.addEventListener("click",function(){go(idx);restart();});})(k);
      dotsBox.appendChild(b); dots.push(b);
    }
  }
  var cur=root.querySelector(".cv-cur");
  function go(idx){
    i=(idx+n)%n;
    for(var k=0;k<n;k++) slides[k].classList.toggle("is-active",k===i);
    for(var t=0;t<tabs.length;t++) tabs[t].classList.toggle("is-active",t===i);
    for(var d=0;d<dots.length;d++) dots[d].classList.toggle("is-active",d===i);
    if(cur) cur.textContent=String(i+1);
  }
  function restart(){ if(timer) clearInterval(timer); if(playing) timer=setInterval(function(){go(i+1);}, opt.delay||5000); }
  for(var t=0;t<tabs.length;t++){
    (function(idx){tabs[idx].addEventListener("click",function(){go(idx);restart();});})(t);
  }
  var playBtn=opt.playSel?root.querySelector(opt.playSel):null;
  if(playBtn){
    playBtn.addEventListener("click",function(){
      playing=!playing;
      root.classList.toggle("is-paused",!playing);
      playBtn.setAttribute("aria-label",playing?"자동재생 정지":"자동재생 시작");
      restart();
    });
  }
  root.addEventListener("mouseenter",function(){ if(timer) clearInterval(timer); });
  root.addEventListener("mouseleave",function(){ restart(); });
  go(0); restart();
  return {go:go};
}

/* ═══════ 공용: 가로 이동형 슬라이더 (프로모 / 선생님 / 후기) ═══════ */
function trackSlider(opt){
  var root=document.getElementById(opt.id); if(!root) return null;
  var track=root.querySelector(opt.track); if(!track) return null;
  var pos=0;

  function items(){
    var all=track.children, out=[];
    for(var k=0;k<all.length;k++){ if(all[k].style.display!=="none") out.push(all[k]); }
    return out;
  }
  function step(){
    var it=items(); if(!it.length) return 0;
    var w=it[0].getBoundingClientRect().width;
    var gap=parseFloat(getComputedStyle(track).gap||"0")||0;
    return w+gap;
  }
  function maxPos(){
    var it=items(); if(!it.length) return 0;
    var visible=Math.max(1,Math.round(root.clientWidth/step()));
    return Math.max(0,it.length-visible);
  }
  function apply(){ track.style.transform="translateX("+(-pos*step())+"px)"; sync(); }
  function sync(){
    var m=maxPos();
    var prev=root.querySelector('[data-dir="prev"]'), next=root.querySelector('[data-dir="next"]');
    if(prev) prev.classList.toggle("is-disabled",pos<=0);
    if(next) next.classList.toggle("is-disabled",pos>=m);
    var dotsBox=opt.dots?document.getElementById(opt.dots):null;
    if(dotsBox){
      var need=m+1;
      while(dotsBox.children.length<need){
        var b=document.createElement("button"); b.type="button"; b.className="cv-dot";
        (function(idx){b.addEventListener("click",function(){pos=idx;apply();});})(dotsBox.children.length);
        dotsBox.appendChild(b);
      }
      while(dotsBox.children.length>need) dotsBox.removeChild(dotsBox.lastChild);
      for(var d=0;d<dotsBox.children.length;d++) dotsBox.children[d].classList.toggle("is-active",d===pos);
    }
  }
  function move(dir){ var m=maxPos(); pos=Math.min(m,Math.max(0,pos+dir)); apply(); }

  var btns=root.querySelectorAll(".cv-arrow");
  for(var b2=0;b2<btns.length;b2++){
    btns[b2].addEventListener("click",function(e){
      e.preventDefault();
      move(this.getAttribute("data-dir")==="next"?1:-1);
      if(opt.autoplay) restart();
    });
  }
  var timer=null;
  function restart(){
    if(!opt.autoplay) return;
    if(timer) clearInterval(timer);
    timer=setInterval(function(){
      var m=maxPos();
      pos = pos>=m ? 0 : pos+1;
      apply();
    }, opt.delay||3500);
  }
  root.addEventListener("mouseenter",function(){ if(timer) clearInterval(timer); });
  root.addEventListener("mouseleave",restart);
  window.addEventListener("resize",function(){ pos=Math.min(pos,maxPos()); apply(); });

  apply(); restart();
  return { reset:function(){ pos=0; apply(); } };
}

/* ═══════ 1) 메인 롤링 배너 ═══════ */
fadeSlider({ id:"cvHero", slide:".cv-hero-slide", tabSel:".cv-hero-tab", playSel:".cv-hero-play", delay:5000 });

/* ═══════ 3) 선생님 (과목 탭 + 슬라이드) ═══════ */
var teacher=trackSlider({ id:"cvTeacher", track:".cv-teacher-track" });
(function(){
  var tabsBox=document.getElementById("cvTeacherTabs"); if(!tabsBox) return;
  var tabs=tabsBox.querySelectorAll(".cv-tab");
  var cards=document.querySelectorAll("#cvTeacher .cv-teacher-card");
  function filter(subject){
    for(var c=0;c<cards.length;c++){
      cards[c].style.display = (cards[c].getAttribute("data-subject")===subject) ? "" : "none";
    }
    if(teacher) teacher.reset();
  }
  for(var t=0;t<tabs.length;t++){
    (function(el){
      el.addEventListener("click",function(){
        for(var k=0;k<tabs.length;k++) tabs[k].classList.remove("is-active");
        el.classList.add("is-active");
        filter(el.getAttribute("data-subject"));
      });
    })(tabs[t]);
  }
  if(tabs.length){ tabs[0].classList.add("is-active"); filter(tabs[0].getAttribute("data-subject")); }
})();

/* ═══════ 5-1) 성공수기 ═══════ */
trackSlider({ id:"cvReview", track:".cv-review-track", dots:"cvReviewDots" });

/* ═══════ 5-2) 우측 사이드 배너 ═══════ */
fadeSlider({ id:"cvSide", slide:".cv-side-slide", dots:"cvSideDots", playSel:".cv-side-play", delay:4000 });

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

/* ═══════ 수능 D-day (매년 날짜만 수정) ═══════ */
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
