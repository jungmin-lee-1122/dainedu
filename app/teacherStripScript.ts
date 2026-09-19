// 선생님 띠 — 과목 탭 + 끊김 없는 자동 슬라이드
// 마우스를 올리면 멈추고, 화살표로 한 장씩 넘길 수 있습니다.
export const teacherStripScript = String.raw`
(function(){
  var view=document.getElementById("dnTeacherStrip"); if(!view) return;
  var track=view.querySelector(".ts-track");
  var empty=view.querySelector(".ts-empty");
  var sec=view.closest(".ts-sec");
  var tabs=sec?sec.querySelectorAll(".ts-tab"):[];
  var arrows=view.querySelectorAll(".ts-arrow");
  if(!track) return;

  var origin=[].slice.call(track.children);   /* 원본 카드 */
  var cur="전체";
  var x=0, setW=0, paused=false, target=null, raf=0;

  function speed(){ return window.innerWidth<900 ? 0.30 : 0.42; }

  function build(){
    track.style.transform="translateX(0px)";
    x=0; target=null;
    while(track.firstChild) track.removeChild(track.firstChild);

    var list=origin.filter(function(n){
      return cur==="전체" || n.getAttribute("data-subject")===cur;
    });

    if(!list.length){
      if(empty) empty.hidden=false;
      view.classList.add("is-empty");
      setW=0;
      return;
    }
    if(empty) empty.hidden=true;
    view.classList.remove("is-empty");

    list.forEach(function(n){ track.appendChild(n); });
    setW=track.scrollWidth;                 /* 한 바퀴 길이 */

    /* 화면을 채우고도 남을 만큼 복제해 끊김 없이 이어지게 */
    var guard=0;
    while(track.scrollWidth < setW + view.clientWidth + 320 && guard<30){
      list.forEach(function(n){
        var c=n.cloneNode(true);
        c.setAttribute("aria-hidden","true");
        var link=c.querySelector("a"); if(link) link.setAttribute("tabindex","-1");
        track.appendChild(c);
      });
      guard++;
    }
  }

  function step(){
    if(setW>0){
      if(target!==null){
        var d=target-x;
        if(Math.abs(d)<0.6){ x=target; target=null; }
        else x+=d*0.14;
      }else if(!paused){
        x-=speed();
      }
      /* 한 바퀴를 넘어가면 자연스럽게 되감기 */
      if(x<=-setW){ x+=setW; if(target!==null) target+=setW; }
      if(x>0){ x-=setW; if(target!==null) target-=setW; }
      track.style.transform="translateX("+x+"px)";
    }
    raf=requestAnimationFrame(step);
  }

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
      });
    })(tabs[i]);
  }

  for(var a=0;a<arrows.length;a++){
    (function(btn){
      btn.addEventListener("click",function(){
        var card=track.querySelector(".ts-item");
        var stepW=card?card.getBoundingClientRect().width+18:280;
        var base=(target===null?x:target);
        target=base+(btn.getAttribute("data-dir")==="next"?-stepW:stepW);
      });
    })(arrows[a]);
  }

  view.addEventListener("mouseenter",function(){ paused=true; });
  view.addEventListener("mouseleave",function(){ paused=false; });
  view.addEventListener("focusin",function(){ paused=true; });
  view.addEventListener("focusout",function(){ paused=false; });
  document.addEventListener("visibilitychange",function(){ paused=document.hidden; });

  var rt;
  window.addEventListener("resize",function(){
    clearTimeout(rt); rt=setTimeout(build,200);
  });

  build();
  if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    paused=true;
  }
  raf=requestAnimationFrame(step);
})();
`;
